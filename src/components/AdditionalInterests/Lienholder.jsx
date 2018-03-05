import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { connect } from 'react-redux';
import { reduxForm, Form, propTypes } from 'redux-form';
import Footer from '../Common/Footer';
// import localStorage from 'localStorage';

import { getInitialValues } from '../Customize/customizeHelpers';
import FieldGenerator from '../Form/FieldGenerator';
// import Footer from '../Common/Footer';
// import { setDetails } from '../../../actions/detailsActions';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';
import Loader from '../Common/Loader';
import SnackBar from '../Common/SnackBar';
import failedSubmission from '../Common/reduxFormFailSubmit';


const userTasks = {
  formSubmit: ''
};

export const handleFormSubmit = (data, dispatch, props) => {
  const workflowId = props.tasks[props.appState.modelName].data.modelInstanceId;
  const taskName = userTasks.formSubmit;
  const additionalInterests = props.quoteData.additionalInterests;

  const lienholder1 = _.find(additionalInterests, { order: 0, type: 'Lienholder' }) || {};
  const lienholder2 = _.find(additionalInterests, { order: 1, type: 'Lienholder' }) || {};

  _.remove(additionalInterests, ai => ai.type === 'Lienholder');

  if (data.isAdditional) {
    lienholder1.name1 = data.l1Name1;
    lienholder1.name2 = data.l1Name2;
    lienholder1.referenceNumber = data.l1ReferenceNumber;
    lienholder1.order = 0;
    lienholder1.active = true;
    lienholder1.type = 'Lienholder';
    lienholder1.mailingAddress = {
      address1: data.l1MailingAddress1,
      address2: data.l1MailingAddress2,
      city: data.l1City,
      state: data.l1State,
      zip: data.l1Zip,
      country: {
        code: 'USA',
        displayText: 'United States of America'
      }
    };

    additionalInterests.push(lienholder1);
  }
  if (data.isAdditional && data.isAdditional2) {
    lienholder2.name1 = data.l2Name1;
    lienholder2.name2 = data.l2Name2;
    lienholder2.referenceNumber = data.l2ReferenceNumber;
    lienholder2.order = 1;
    lienholder2.active = true;
    lienholder2.type = 'Lienholder';
    lienholder2.mailingAddress = {
      address1: data.l2MailingAddress1,
      address2: data.l2MailingAddress2,
      city: data.l2City,
      state: data.l2State,
      zip: data.l2Zip,
      country: {
        code: 'USA',
        displayText: 'United States of America'
      }
    };

    additionalInterests.push(lienholder2);
  }

  props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, { ...props.appState.data, submitting: true });
  props.actions.cgActions.completeTask(props.appState.modelName, workflowId, taskName, { additionalInterests });
};

export const closeAndSavePreviousAIs = (props) => {
  const workflowId = props.tasks[props.appState.modelName].data.modelInstanceId;
  const taskName = userTasks.formSubmit;
  const additionalInterests = props.quoteData.additionalInterests;
  props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, { ...props.appState.data, submitting: true });
  props.actions.cgActions.completeTask(props.appState.modelName, workflowId, taskName, { additionalInterests });
};

export const handleInitialize = (state) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
  const quoteData = taskData && taskData.model &&
 taskData.model.variables &&
 _.find(taskData.model.variables, { name: 'getQuoteBeforeAIs' }) &&
 _.find(taskData.model.variables, { name: 'getQuoteBeforeAIs' }).value ?
  _.find(taskData.model.variables, { name: 'getQuoteBeforeAIs' }).value.result : {};

  const values = getInitialValues(taskData.uiQuestions, { additionalInterests: _.filter(quoteData.additionalInterests, ai => ai.type === 'Lienholder') });

  userTasks.formSubmit = taskData.activeTask.name;

  _.forEach(taskData.uiQuestions, (q) => {
    if (!values[q.name]) {
      values[q.name] = '';
    }
  });

  if (_.trim(values.l2Name1)) {
    values.isAdditional2 = true;
  }

  values.isAdditional = true;


  return values;
};

export const handleGetQuestions = (state) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
  return taskData.uiQuestions;
};

export const handleGetQuoteData = (state) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
  const quoteData = taskData && taskData.model &&
 taskData.model.variables &&
 _.find(taskData.model.variables, { name: 'getQuoteBeforeAIs' }) &&
 _.find(taskData.model.variables, { name: 'getQuoteBeforeAIs' }).value ?
  _.find(taskData.model.variables, { name: 'getQuoteBeforeAIs' }).value.result : {};
  return quoteData;
};

export const Lienholder = (props) => {
  const {
    fieldQuestions,
    quoteData,
    handleSubmit,
    fieldValues
  } = props;
  return (
    <div className="route-content">
      <SnackBar
        {...props}
        show={props.appState.data.showSnackBar}
        timer={3000}
      ><p>Please see errors above</p></SnackBar>
      { props.appState.data.submitting && <Loader /> }
      <Form id="Lienholder" onSubmit={handleSubmit(handleFormSubmit)} noValidate>
        <div className="scroll">
          <div className="form-group survey-wrapper" role="group">
            <h3 className="section-group-header"><i className="fa fa-black-tie" /> Lienholder</h3>
            {fieldQuestions && _.sortBy(fieldQuestions, 'sort').map((question, index) => <FieldGenerator autoFocus={index === 1} data={quoteData} question={question} values={fieldValues} key={index} />)}
          </div>
          <div className="workflow-steps">
            <span className="button-label-wrap">
              <span className="button-info">Oops! There is no lienholder</span>
              <button className="btn btn-secondary" type="button" onClick={() => closeAndSavePreviousAIs(props)}>Go Back</button>
            </span>
            <button className="btn btn-primary" type="submit" form="Lienholder" disabled={props.appState.data.submitting}>Save</button>
          </div>
          <Footer />
        </div>
      </Form>
    </div>
  );
};

Lienholder.propTypes = {
  ...propTypes,
  handleSubmit: PropTypes.func,
  tasks: PropTypes.shape(),
  appState: PropTypes.shape({
    modelName: PropTypes.string,
    data: PropTypes.shape({
      recalc: PropTypes.boolean,
      submitting: PropTypes.boolean
    })
  }),
  fieldValues: PropTypes.any, // eslint-disable-line
  initialized: PropTypes.bool,
  initialize: PropTypes.func
};

const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState,
  fieldValues: _.get(state.form, 'Lienholder.values', {}),
  initialValues: handleInitialize(state),
  fieldQuestions: handleGetQuestions(state),
  quoteData: handleGetQuoteData(state)
});

const mapDispatchToProps = dispatch => ({
  actions: {
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'Lienholder',
  onSubmitFail: failedSubmission })(Lienholder));
