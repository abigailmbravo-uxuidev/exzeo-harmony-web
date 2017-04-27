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
  addAdditionalAIs: 'addAdditionalAIs'
};

const noAddAdditionalInterestSubmit = (data, dispatch, props) => {
  const workflowId = props.tasks[props.appState.modelName].data.modelInstanceId;
  const taskName = userTasks.addAdditionalAIs;
  const taskData = { shouldUpdateAIs: 'No' };
  props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, { ...props.appState.data, submitting: true });
  props.actions.cgActions.completeTask(props.appState.modelName, workflowId, taskName, taskData);
};

const AddMortgagee = (props) => {
  const workflowId = props.tasks[props.appState.modelName].data.modelInstanceId;
  const taskName = userTasks.addAdditionalAIs;
  const taskData = { shouldUpdateAIs: 'mortgagee' };
  props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, { ...props.appState.data, submitting: true });
  props.actions.cgActions.completeTask(props.appState.modelName, workflowId, taskName, taskData);
};

const AddLienholder = (props) => {
  const workflowId = props.tasks[props.appState.modelName].data.modelInstanceId;
  const taskName = userTasks.addAdditionalAIs;
  const taskData = { shouldUpdateAIs: 'lienholder' };
  props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, { ...props.appState.data, submitting: true });
  props.actions.cgActions.completeTask(props.appState.modelName, workflowId, taskName, taskData);
};

const AddAdditionalInsured = (props) => {
  const workflowId = props.tasks[props.appState.modelName].data.modelInstanceId;
  const taskName = userTasks.addAdditionalAIs;
  const taskData = { shouldUpdateAIs: 'additionalInsured' };
  props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, { ...props.appState.data, submitting: true });
  props.actions.cgActions.completeTask(props.appState.modelName, workflowId, taskName, taskData);
};

const AddInterest = (props) => {
  const workflowId = props.tasks[props.appState.modelName].data.modelInstanceId;
  const taskName = userTasks.addAdditionalAIs;
  const taskData = { shouldUpdateAIs: 'additionalInterest' };
  props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, { ...props.appState.data, submitting: true });
  props.actions.cgActions.completeTask(props.appState.modelName, workflowId, taskName, taskData);
};

const AddBillpayer = (props) => {
  const workflowId = props.tasks[props.appState.modelName].data.modelInstanceId;
  const taskName = userTasks.addAdditionalAIs;
  const taskData = { shouldUpdateAIs: 'billPayer' };
  props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, { ...props.appState.data, submitting: true });
  props.actions.cgActions.completeTask(props.appState.modelName, workflowId, taskName, taskData);
};

const handleGetQuestions = (state) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
  return taskData.uiQuestions;
};

const handleGetQuoteData = (state) => {
  const { cg, appState } = state;
  const quoteData = _.find(cg[appState.modelName].data.model.variables, { name: 'getQuoteBeforeAIs' });
  return (quoteData ? quoteData.value.result : undefined);
};

const goToStep = (props, type) => {
  if (type === 'Mortgagee') AddMortgagee(props);
  else if (type === 'Bill Payer') AddBillpayer(props);
  else if (type === 'Lienholder') AddLienholder(props);
  else if (type === 'Additional Interest') AddInterest(props);
  else if (type === ' Additional Insured') AddAdditionalInsured(props);
};

const handleInitialize = (state) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
//   const quoteData = taskData && taskData.previousTask && taskData.previousTask.value ? taskData.previousTask.value.result : {};

  const { cg, appState } = state;
  const quoteData = _.find(cg[appState.modelName].data.model.variables, { name: 'getQuoteBeforeAIs' });

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
          <p>To add additional interests ...</p>
          <div className="button-group">
            <button className="btn btn-secondary" type="button" onClick={() => AddMortgagee(props)}><div><i className="fa fa-plus" /><span>Mortgagee</span></div></button>
            <button className="btn btn-secondary" type="button" onClick={() => AddLienholder(props)}><div><i className="fa fa-plus" /><span>Lienholder</span></div></button>
            <button className="btn btn-secondary" type="button" onClick={() => AddAdditionalInsured(props)}><div><i className="fa fa-plus" /><span>Additional Insured</span></div></button>
            <button className="btn btn-secondary" type="button" onClick={() => AddInterest(props)}><div><i className="fa fa-plus" /><span>Additional Interest</span></div></button>
            <button className="btn btn-secondary" type="button" onClick={() => AddBillpayer(props)}><div><i className="fa fa-plus" /><span>Billpayer</span></div></button>
          </div>
          {/* list of additional interests*/}
          <div className="results-wrapper">
            <ul className="results result-cards">
              {props.quoteData && props.quoteData.additionalInterests && props.quoteData.additionalInterests.map((question, index) =>
                <li key={index}>
                  <a onClick={() => goToStep(props, question.type)}>
                    {/* add className based on type - i.e. mortgagee could have class of mortgagee*/}
                    <div className="card-icon"><i className={`fa fa-circle ${question.type}`} /><label>{question.type} {question.order + 1}</label></div>
                    <section><h4>{question.name1}</h4><p>{question.name2}</p><p className="address">{question.mailingAddress.address1},
                      {question.mailingAddress.address2}
                      {question.mailingAddress.city}, {question.mailingAddress.state} {question.mailingAddress.zip}</p></section>
                    <i className="fa fa-pencil" />
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="workflow-steps">
          {props.quoteData.additionalInterests && props.quoteData.additionalInterests.length === 0 &&
            <button className="btn btn-primary" type="submit" disabled={props.appState.data.submitting}>Not Applicable</button>
          }
          {props.quoteData.additionalInterests && props.quoteData.additionalInterests.length > 0 &&
          <button className="btn btn-primary" type="submit" disabled={props.appState.data.submitting}>next</button>
          }
        </div>
        <Footer />
      </div>
    </Form>
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
