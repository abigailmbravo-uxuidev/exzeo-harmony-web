import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Form, propTypes } from 'redux-form';
import Footer from '../Common/Footer';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';
import { getInitialValues } from '../Customize/customizeHelpers';
import Loader from '../Common/Loader';
import AdditionalInterestModal from '../Common/AIPopup';
import SnackBar from '../Common/SnackBar';
import failedSubmission from '../Common/reduxFormFailSubmit';
import { MOCK_UI_QUESTIONS } from '../additionalInterests';
import { updateQuote } from '../../actions/quoteState.actions';

const userTasks = {
  addAdditionalAIs: 'addAdditionalAIs'
};

export const noAddAdditionalInterestSubmit = async (data, dispatch, props) => {
  props.actions.appStateActions.setAppState(props.appState.modelName, '', { ...props.appState.data, submitting: true });
  await props.updateQuote({ shouldUpdateAIs: 'No' }, props.quoteData.quoteNumber);
  props.actions.appStateActions.setAppState(props.appState.modelName, '', { ...props.appState.data, submitting: false });

  // props.actions.cgActions.completeTask(props.appState.modelName, workflowId, taskName, {});
  props.history.push('mailingBilling');

  // const workflowId = props.tasks[props.appState.modelName].data.modelInstanceId;
  // const taskName = userTasks.addAdditionalAIs;
  // const taskData = { shouldUpdateAIs: 'No' };
  // props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, { ...props.appState.data, submitting: true });
  // props.actions.cgActions.completeTask(props.appState.modelName, workflowId, taskName, taskData);
};

export const AddMortgagee = async (props) => {
  // const workflowId = props.tasks[props.appState.modelName].data.modelInstanceId;
  // const taskName = userTasks.addAdditionalAIs;
  // const taskData = { shouldUpdateAIs: 'mortgagee' };
  // props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, { ...props.appState.data, submitting: true });
  // props.actions.cgActions.completeTask(props.appState.modelName, workflowId, taskName, taskData);

  props.actions.appStateActions.setAppState(props.appState.modelName, '', { ...props.appState.data, submitting: true });
  await props.updateQuote({ shouldUpdateAIs: 'mortgagee' }, props.quoteData.quoteNumber);
  props.actions.appStateActions.setAppState(props.appState.modelName, '', { ...props.appState.data, submitting: false });

  // props.actions.cgActions.completeTask(props.appState.modelName, workflowId, taskName, {});
  props.history.push('askMortgagee');
};

export const AddPremiumFinance = (props) => {
  const workflowId = props.tasks[props.appState.modelName].data.modelInstanceId;
  const taskName = userTasks.addAdditionalAIs;
  const taskData = { shouldUpdateAIs: 'premiumFinance' };
  props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, { ...props.appState.data, submitting: true });
  props.actions.cgActions.completeTask(props.appState.modelName, workflowId, taskName, taskData);
};

export const AddAdditionalInsured = (props) => {
  const workflowId = props.tasks[props.appState.modelName].data.modelInstanceId;
  const taskName = userTasks.addAdditionalAIs;
  const taskData = { shouldUpdateAIs: 'additionalInsured' };
  props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, { ...props.appState.data, submitting: true });
  props.actions.cgActions.completeTask(props.appState.modelName, workflowId, taskName, taskData);
};

export const AddInterest = (props) => {
  const workflowId = props.tasks[props.appState.modelName].data.modelInstanceId;
  const taskName = userTasks.addAdditionalAIs;
  const taskData = { shouldUpdateAIs: 'additionalInterest' };
  props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, { ...props.appState.data, submitting: true });
  props.actions.cgActions.completeTask(props.appState.modelName, workflowId, taskName, taskData);
};

export const AddBillpayer = (props) => {
  const workflowId = props.tasks[props.appState.modelName].data.modelInstanceId;
  const taskName = userTasks.addAdditionalAIs;
  const taskData = { shouldUpdateAIs: 'billPayer' };
  props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, { ...props.appState.data, submitting: true });
  props.actions.cgActions.completeTask(props.appState.modelName, workflowId, taskName, taskData);
};

// const handleGetQuestions = (state) => {
//   const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;

//   MOCK_UI_QUESTIONS
//   .filter(question => question.name === 'mortgagee' || question.name === 'premiumFinance')
//   .forEach((q) => {
//     if (q && Array.isArray(q.answers)) {
//       q.answers.forEach((answer) => {
//         answer.displayText = `${answer.AIName1}, ${answer.AIAddress1}, ${answer.AICity} ${answer.AIState}, ${answer.AIZip}`;
//         return answer;
//       });
//     }
//     return q;
//   });
//   return MOCK_UI_QUESTIONS;
// };

const handleGetQuoteData = state => state.quoteState.quote || {}
  // const { cg, appState } = state;
  // const quoteData = _.find(cg[appState.modelName].data.model.variables, { name: 'getQuoteBeforeAIs' });
  // return (quoteData ? quoteData.value.result : undefined);
;

export const goToStep = (props, type) => {
  if (type === 'Mortgagee') AddMortgagee(props);
  else if (type === 'Bill Payer') AddBillpayer(props);
  else if (type === 'Premium Finance') AddPremiumFinance(props);
  else if (type === 'Additional Interest') AddInterest(props);
  else if (type === 'Additional Insured') AddAdditionalInsured(props);
};

export const returnTaskDataName = (type) => {
  if (type === 'Mortgagee') return 'mortgagee';
  else if (type === 'Bill Payer') return 'billPayer';
  else if (type === 'Premium Finance') return 'premiumFinance';
  else if (type === 'Additional Interest') return 'additionalInterest';
  else if (type === 'Additional Insured') return 'additionalInsured';
};

export const returnTaskName = (type) => {
  if (type === 'Mortgagee') return 'askMortgagee';
  else if (type === 'Bill Payer') return 'askBillPayer';
  else if (type === 'Premium Finance') return 'askPremiumFinance';
  else if (type === 'Additional Interest') return 'askAdditionalInterest';
  else if (type === 'Additional Insured') return 'askAdditionalInsured';
};

// const handleInitialize = state => ({});

export const openDeleteAdditionalInterest = (ai, props) => {
  props.actions.appStateActions.setAppState(props.appState.modelName, props.appState.instanceId,
      { ...props.appState.data, showAdditionalInterestModal: true, selectedAI: ai, addAdditionalInterestType: ai.type });
};

export const hideAdditionalInterestModal = (props) => {
  props.actions.appStateActions.setAppState(props.appState.modelName, props.appState.instanceId,
      { ...props.appState.data, showAdditionalInterestModal: false, showAdditionalInterestEditModal: false });
};

export const deleteAdditionalInterest = (selectedAdditionalInterest, props) => {
  const { appState, actions, quoteData } = props;
  const workflowId = appState.instanceId;
  actions.appStateActions.setAppState(appState.modelName,
      workflowId, {
        ...props.appState.data,
        submitting: true,
        showAdditionalInterestModal: false
      });

  let additionalInterests = quoteData.additionalInterests || [];

        // remove any existing items before submission
  const modifiedAIs = _.cloneDeep(additionalInterests);
    // remove any existing items before submission
    _.remove(modifiedAIs, ai => ai._id === selectedAdditionalInterest._id); // eslint-disable-line

  let order = 0;
  _.each(_.filter(modifiedAIs, ai => ai.type === selectedAdditionalInterest.type), (ai) => {
    ai.order = order; // eslint-disable-line
    order += 1;
  });

  const steps = [{ name: 'addAdditionalAIs', data: { shouldUpdateAIs: returnTaskDataName(selectedAdditionalInterest.type) } },
    {
      name: returnTaskName(selectedAdditionalInterest.type),
      data: { additionalInterests: modifiedAIs }
    }
  ];

  actions.cgActions.batchCompleteTask(appState.modelName, workflowId, steps)
      .then(() => {
        additionalInterests = modifiedAIs;
        props.actions.appStateActions.setAppState(props.appState.modelName,
          workflowId, { ...props.appState.data,
            submitting: false,
            showAdditionalInterestModal: false });
      });
};


export const AddAdditionalInterest = props => (
  <div className="route-content">
    <SnackBar
      {...props}
      show={props.appState.data.showSnackBar}
      timer={3000}
    ><p>Please correct errors.</p></SnackBar>
    {props.appState.data.submitting && <Loader />}
    <Form className={`${'styleName' || ''}`} id="AddAdditionalInterestPage" onSubmit={props.handleSubmit(noAddAdditionalInterestSubmit)} noValidate>
      <div className="scroll">
        <div className="form-group detail-wrapper">
          <p>Please select the type of Additional Interest that you would like to add for this policy. (If the policy premium bill needs to go to somewhere other than the policyholder or an additional interest, please select Bill Payer to enter the alternate address.)</p>
          <div className="button-group">
            <button className="btn btn-secondary" type="button" onClick={() => AddMortgagee(props)}><div><i className="fa fa-plus" /><span>Mortgagee</span></div></button>
            <button className="btn btn-secondary" type="button" onClick={() => AddAdditionalInsured(props)}><div><i className="fa fa-plus" /><span>Additional Insured</span></div></button>
            <button className="btn btn-secondary" type="button" onClick={() => AddInterest(props)}><div><i className="fa fa-plus" /><span>Additional Interest</span></div></button>
            <button disabled={_.filter(props.quoteData.additionalInterests, ai => ai.type === 'Bill Payer').length > 0} className="btn btn-secondary" type="button" onClick={() => AddPremiumFinance(props)}><div><i className="fa fa-plus" /><span>Premium Finance</span></div></button>
            <button disabled={_.filter(props.quoteData.additionalInterests, ai => ai.type === 'Premium Finance').length > 0} className="btn btn-secondary" type="button" onClick={() => AddBillpayer(props)}><div><i className="fa fa-plus" /><span>Bill Payer</span></div></button>
          </div>
          {/* list of additional interests*/}
          <div className="results-wrapper">
            <ul className="results result-cards">
              {props.quoteData && props.quoteData.additionalInterests && props.quoteData.additionalInterests.map((question, index) =>
                <li key={index}>
                  <div>
                    {/* add className based on type - i.e. mortgagee could have class of mortgagee*/}
                    <div className="card-icon"><i className={`fa fa-circle ${question.type}`} /><label>{question.type} {question.order + 1}</label></div>
                    <section>
                      <h4>{`${question.name1}`}</h4>
                      <h4>{`${question.name2}`}</h4>
                      <p className="address">
                        {`${question.mailingAddress.address1}`}
                        {question.mailingAddress.address2 ? `, ${question.mailingAddress.address2}` : ''}
                      </p>
                      <p>
                        {`${question.mailingAddress.city}, `}
                        {`${question.mailingAddress.state} `}
                        {` ${question.mailingAddress.zip}`}
                      </p>
                    </section>
                    <a className="remove" onClick={() => openDeleteAdditionalInterest(question, props)}>
                      <i className="fa fa-trash" />
                    </a>
                    <a className="edit" onClick={() => goToStep(props, question.type)}>
                      <i className="fa fa-pencil" />
                    </a>
                  </div>
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
    { props.appState.data.showAdditionalInterestModal && <AdditionalInterestModal {...props} selectedAI={props.appState.data.selectedAI} primaryButtonHandler={() => deleteAdditionalInterest(props.appState.data.selectedAI, props)} secondaryButtonHandler={() => hideAdditionalInterestModal(props)} /> }
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
  // initialValues: handleInitialize(state),
  // fieldQuestions: handleGetQuestions(state),
  quoteData: handleGetQuoteData(state)
});

const mapDispatchToProps = dispatch => ({
  updateQuote: bindActionCreators(updateQuote, dispatch),
  actions: {
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

// ------------------------------------------------
// wire up redux form with the redux connect
// ------------------------------------------------
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'AddAdditionalInterest',
  enableReinitialize: true,
  onSubmitFail: failedSubmission })(AddAdditionalInterest));
