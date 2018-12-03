import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Form, propTypes } from 'redux-form';
import _ from 'lodash';
import Footer from '../Common/Footer';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';
import FieldGenerator from '../Form/FieldGenerator';
import Loader from '../Common/Loader';
import SnackBar from '../Common/SnackBar';
import failedSubmission from '../Common/reduxFormFailSubmit';

import { MOCK_QUOTE } from '../mockQuote';
import { MOCK_UI_QUESTIONS } from '../askUWAnswers';

const userTasks = { formSubmit: 'askUWAnswers' };

const handleFormSubmit = (data, dispatch, props) => {
  // const workflowId = props.tasks[props.appState.modelName].data.modelInstanceId;
  // const taskName = userTasks.formSubmit;
  // const taskData = { ...data };
  // props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, { ...props.appState.data, submitting: true });
  // props.actions.cgActions.completeTask(props.appState.modelName, workflowId, taskName, taskData);
  props.actions.appStateActions.setAppState(props.appState.modelName, 'workflowId', { currentControl: 'askToCustomizeDefaultQuote' });
};

const handleGetQuestions = state =>
  // const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
  // const uwQuestions = taskData && taskData.previousTask && taskData.previousTask.value ? taskData.previousTask.value.result : {};
   MOCK_UI_QUESTIONS;

const handleGetQuoteData = state => MOCK_QUOTE;// state.service.quote;

const handleInitialize = (state) => {
  const questions = handleGetQuestions(state);
  const data = handleGetQuoteData(state);
  const values = {};
  questions.forEach((question) => {
    const val = _.get(data, `underwritingAnswers.${question.name}.answer`);
    values[question.name] = val;

    const defaultAnswer = question && question.answers &&
    _.find(question.answers, { default: true }) ?
    _.find(question.answers, { default: true }).answer : null;

    if (defaultAnswer && question.hidden) {
      values[question.name] = defaultAnswer;
    }
  });

  return values;
};

export const Underwriting = (props) => {
  const { appState, handleSubmit, fieldValues, quoteData } = props;
  // const taskData = props.tasks[appState.modelName].data;
  const questions = MOCK_UI_QUESTIONS; // taskData.previousTask.value.result;

  return (
    <div className="route-content">
      <SnackBar
        {...props}
        show={props.appState.data.showSnackBar}
        timer={3000}
      ><p>Please correct errors.</p></SnackBar>
      {props.appState.data.submitting && <Loader />}
      <Form
        id="Underwriting"
        onSubmit={handleSubmit(handleFormSubmit)}
        noValidate
      >
        <div className="scroll">
          <div className="form-group survey-wrapper" role="group">
            {questions && _.sortBy(questions, ['order']).map((question, index) =>
              <FieldGenerator
                autoFocus={index === 0}
                data={quoteData}
                question={question}
                values={fieldValues}
                key={index}
              />
        )}
          </div>
          <div className="workflow-steps">
            <button
              tabIndex={0}
              className="btn btn-primary"
              type="submit"
              form="Underwriting"
              disabled={props.appState.data.submitting}
            >next</button>
          </div>
          <Footer />
        </div>
      </Form>
    </div>
  );
};

Underwriting.propTypes = {
  ...propTypes,
  tasks: PropTypes.shape(),
  appState: PropTypes.shape({
    modelName: PropTypes.string,
    instanceId: PropTypes.string,
    data: PropTypes.shape({
      submitting: PropTypes.boolean
    })
  }),
  quoteData: PropTypes.shape(),
  questions: PropTypes.arrayOf(PropTypes.shape())
};

/**
------------------------------------------------
redux mapping
------------------------------------------------
*/

const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState,
  fieldValues: _.get(state.form, 'Underwriting.values', {}),
  initialValues: handleInitialize(state),
  questions: handleGetQuestions(state),
  quoteData: handleGetQuoteData(state)
});

const mapDispatchToProps = dispatch => ({
  actions: {
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'Underwriting', onSubmitFail: failedSubmission
})(Underwriting));
