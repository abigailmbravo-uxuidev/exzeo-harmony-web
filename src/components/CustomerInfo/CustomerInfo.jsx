import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { reduxForm, Form, propTypes } from 'redux-form';
import Footer from '../Common/Footer';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';
import FieldGenerator from '../Form/FieldGenerator';
import { getInitialValues } from '../Customize/customizeHelpers';
import SelectFieldAgents from '../Form/inputs/SelectFieldAgents';
// ------------------------------------------------
// List the user tasks that directly tie to
//  the cg tasks.
// ------------------------------------------------
const userTasks = {
  formSubmit: 'askAdditionalCustomerData'
};

// ------------------------------------------------
// This allows the step to be completed in the CG,
//  make sure the data matches what the step needs.
// The workflow id comes from props.appState.
// ------------------------------------------------
const handleFormSubmit = (data, dispatch, props) => {
  const workflowId = props.appState.instanceId;
  const taskName = userTasks.formSubmit;
  const taskData = data;
  props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, { ...props.appState.data, submitting: true });
  props.actions.cgActions.completeTask(props.appState.modelName, workflowId, taskName, taskData);
};

const handleInitialize = (state) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
  const quoteData = _.find(taskData.model.variables, { name: 'updateQuoteWithCustomerData' }) ? _.find(taskData.model.variables, { name: 'updateQuoteWithCustomerData' }).value.result :
  _.find(taskData.model.variables, { name: 'quote' }).value.result;
  const values = getInitialValues(taskData.uiQuestions, quoteData);

  values.agentCode = _.get(quoteData, 'agentCode');

  return values;
};

const handleGetAgentsFromAgency = (state) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
  const paymentPlanResult = taskData && taskData.previousTask && taskData.previousTask.value ? taskData.previousTask.value.result : {};
  return paymentPlanResult;
};
// ------------------------------------------------
// The render is where all the data is being pulled
//  from the props.
// The quote data data comes from the previous task
//  which is createQuote / singleQuote. This might
//  not be the case in later calls, you may need
//  to pull it from another place in the model
// ------------------------------------------------
export const CustomerInfo = (props) => {
  const {
    appState,
    handleSubmit,
    fieldValues,
    agencyResults
  } = props;
  const taskData = props.tasks[appState.modelName].data;
  const questions = taskData.uiQuestions;
  const quoteData = taskData.previousTask.value.result;
  return (
    <div className="route-content">
      <Form
        id="CustomerInfo"
        onSubmit={handleSubmit(handleFormSubmit)}
        noValidate
      >
        <div className="scroll">
          <div className="form-group survey-wrapper" role="group">
            {questions.map((question, index) =>
              <FieldGenerator
                data={quoteData}
                question={question}
                values={fieldValues}
                key={index}
              />
        )}
            <div className="form-group agentID" role="group">
              <SelectFieldAgents
                name="agentCode"
                label="Agent"
                onChange={function () { }}
                validations={['required']}
                agents={agencyResults}
              />
            </div>
          </div>
          <div className="workflow-steps">
            <button
              className="btn btn-primary"
              type="submit"
              form="CustomerInfo"
              disabled={props.appState.data.submitting}
            >
          next
        </button>
          </div>
          <Footer />
        </div>
      </Form>
    </div>
  );
};

// ------------------------------------------------
// Property type definitions
// ------------------------------------------------
CustomerInfo.propTypes = {
  ...propTypes,
  tasks: PropTypes.shape(),
  appState: PropTypes.shape({
    modelName: PropTypes.string,
    instanceId: PropTypes.string,
    data: PropTypes.shape({
      submitting: PropTypes.boolean
    })
  })
};

// ------------------------------------------------
// redux mapping
// ------------------------------------------------
const mapStateToProps = state => (
  {
    tasks: state.cg,
    appState: state.appState,
    fieldValues: _.get(state.form, 'CustomerInfo.values', {}),
    initialValues: handleInitialize(state),
    agencyResults: handleGetAgentsFromAgency(state)
  });

const mapDispatchToProps = dispatch => ({
  actions: {
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

// ------------------------------------------------
// wire up redux form with the redux connect
// ------------------------------------------------
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'CustomerInfo'
})(CustomerInfo));
