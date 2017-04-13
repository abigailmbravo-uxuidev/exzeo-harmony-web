import React, { PropTypes } from 'react';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Form, propTypes } from 'redux-form';
import Footer from '../Common/Footer';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';
import AIPopup from '../Common/AIPopup';
import { getInitialValues } from '../Customize/customizeHelpers';

const userTasks = {
  askMortgagee: 'askMortgagee',
  addAdditionalAIs: 'addAdditionalAIs'
};

const noAddAdditionalInterestSubmit = (data, dispatch, props) => {
  const workflowId = props.tasks[props.appState.modelName].data.modelInstanceId;
  const taskName = userTasks.addAdditionalAIs;
  const taskData = { shouldUpdateAIs: 'No' };
  props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, { ...props.appState.data, submitting: true });
  props.actions.cgActions.completeTask(props.appState.modelName, workflowId, taskName, taskData);
};

const addMortgageeSubmit = (data, dispatch, props) => {
  const workflowId = props.tasks[props.appState.modelName].data.modelInstanceId;
  const steps = [{
    name: userTasks.addAdditionalAIs,
    data: { shouldUpdateAIs: 'Yes' }
  }, {
    name: userTasks.askMortgagee,
    data
  }];
  props.actions.cgActions.batchCompleteTask(props.appState.modelName, workflowId, steps);
  props.actions.appStateActions.setAppState(props.appState.modelName, props.appState.instanceId, { showMortgageePopup: false });
};


const AddMortgagee = (props) => {
  props.actions.appStateActions.setAppState(props.appState.modelName, props.appState.instanceId, { submitting: true });
  props.actions.appStateActions.setAppState(props.appState.modelName, props.appState.instanceId, { showMortgageePopup: true });
};

const closeAddAdditionalInterestSubmit = (props) => {
  props.actions.appStateActions.setAppState(props.appState.modelName, props.appState.instanceId, { showMortgageePopup: false });
  // props.actions.appStateActions.setAppState(props.appState.modelName, props.appState.instanceId, { showMortgageePopup: false });
  // props.actions.appStateActions.setAppState(props.appState.modelName, props.appState.instanceId, { showMortgageePopup: false });
  // props.actions.appStateActions.setAppState(props.appState.modelName, props.appState.instanceId, { showMortgageePopup: false });
  // props.actions.appStateActions.setAppState(props.appState.modelName, props.appState.instanceId, { showMortgageePopup: false });
  // props.actions.appStateActions.setAppState(props.appState.modelName, props.appState.instanceId, { showMortgageePopup: false });
};

const handleGetQuestions = (state) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
  return taskData.uiQuestions;
};

const handleGetQuoteData = (state) => {
  const { cg, appState } = state;
  const quoteData = _.find(cg[appState.modelName].data.model.variables, { name: 'quote' });
  return (quoteData ? quoteData.value.result : undefined);
};

const handleInitialize = (state) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
//   const quoteData = taskData && taskData.previousTask && taskData.previousTask.value ? taskData.previousTask.value.result : {};

  const quoteData = taskData && taskData.model &&
   taskData.model.variables &&
   _.find(taskData.model.variables, { name: 'quote' }) &&
   _.find(taskData.model.variables, { name: 'quote' }).value ?
    _.find(taskData.model.variables, { name: 'quote' }).value.result : {};

  const values = getInitialValues(taskData.uiQuestions, quoteData);

  userTasks.formSubmit = taskData.activeTask.name;

  _.forEach(taskData.uiQuestions, (q) => {
    if (!values[q.name]) {
      values[q.name] = '';
    }
  });
  return values;
};


export const AddAdditionalInterest = props => (
  <div className="route-content">
    <Form className={`${'styleName' || ''}`} id="AddAdditionalInterestPage" onSubmit={props.handleSubmit(noAddAdditionalInterestSubmit)} noValidate>
      <div className="scroll">
        <div className="form-group detail-wrapper">
          <p>To add additional interests blah blah blah</p>
          <button className="btn btn-secondary" type="button" onClick={() => AddMortgagee(props)}><div><i className="fa fa-plus" /><span>Mortgagee</span></div></button>
          {/* <button className="btn btn-secondary" type="button" onClick={() => AddAdditionalInterestQuote(props)}><div><i className="fa fa-plus" /><span>Lienholder</span></div></button>
          <button className="btn btn-secondary" type="button" onClick={() => AddAdditionalInterestQuote(props)}><div><i className="fa fa-plus" /><span>Additional Insured</span></div></button>
          <button className="btn btn-secondary" type="button" onClick={() => AddAdditionalInterestQuote(props)}><div><i className="fa fa-plus" /><span>Additional Interest</span></div></button>
          <button className="btn btn-secondary" type="button" onClick={() => AddAdditionalInterestQuote(props)}><div><i className="fa fa-plus" /><span>Billpayer</span></div></button> */}
          {/* list of additional interests*/}
          <ul className="results result-cards">
            <li>
              {/* add className based on type - i.e. mortgagee could have class of mortgagee*/}
              <div className="card-icon"><i className="fa      dynamic-className-HERE       " /><label>Mortgagee 1</label></div>
              <section><h4>Mortgagee Name 1</h4><p>Mortgagee Name 2</p><p>Address 1, address 2, City, State Zip</p></section>
              <i className="fa fa-pencil" />
            </li>
          </ul>
        </div>
        <div className="workflow-steps">
          {/* show this button if there are no AIs added*/}
          <button className="btn btn-primary" type="submit" disabled={props.appState.data.submitting}>Not Applicable</button>
          {/* show this button if there is 1 or more AI added*/}
          <button className="btn btn-primary" type="submit" disabled={props.appState.data.submitting}>next</button>
        </div>
        <Footer />
      </div>
    </Form>
    {props.appState.data.showMortgageePopup &&
    <AIPopup
      questions={_.filter(props.fieldQuestions, q => _.includes(q.group, 'askMortgagee'))}
      primaryButtonHandler={addMortgageeSubmit}
      secondaryButtonHandler={() => closeAddAdditionalInterestSubmit(props)}
    />}
  </div>
);


AddAdditionalInterest.propTypes = {
  ...propTypes,
  tasks: PropTypes.shape({}),
  appState: PropTypes.shape({ modelName: PropTypes.string, data: PropTypes.object }),
  underwritingExceptions: PropTypes.arrayOf(PropTypes.shape())
};

// ------------------------------------------------
// redux mapping
// ------------------------------------------------
const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState,
  fieldValues: _.get(state.form, 'AddAdditionalInterestPage.values', {}),
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

// ------------------------------------------------
// wire up redux form with the redux connect
// ------------------------------------------------
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'AddAdditionalInterest' })(AddAdditionalInterest));
