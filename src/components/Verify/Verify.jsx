import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import _ from 'lodash';
import moment from 'moment';

import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';
import { updateQuote } from '../../actions/quoteState.actions';
import ScheduleDate from '../Common/ScheduleDate';
import Footer from '../Common/Footer';
import Loader from '../Common/Loader';
import PolicyHolderPopup from '../Common/PolicyHolderPopup';
import { CheckField } from '../Form/inputs';
import normalizePhone from '../Form/normalizePhone';
import PolicyHolderPopup from '../Common/PolicyHolderPopup';
import { updateQuote } from '../../actions/quoteState.actions';
import { goToStep } from '../../utilities/navigation';

const NO_AGENT_FOUND = { firstName: '', lastName: '' };

// ------------------------------------------------
// This allows the step to be completed in the CG,
//  make sure the data matches what the step needs.
// The appState id comes from props.appState.
// ------------------------------------------------
export const scheduleDateModal = (props, showModal) => {
  props.actions.appStateActions.setAppState(props.appState.modelName, props.appState.instanceId, { showScheduleDateModal: !!showModal });
};
const redirectToHome = (props) => {
  scheduleDateModal(props, false);
  window.location.href = '/';
};

// ------------------------------------------------
// This function add a primary or secondary title
// to the AI types. It uses the global component
// variable to keep track of the AI types.
// ------------------------------------------------

const handlePrimarySecondaryTitles = (type, order) => `${type} ${order + 1}`;

const showPolicyHolderModal = (props) => {
  props.actions.appStateActions.setAppState(props.appState.modelName, props.appState.instanceId, { showPolicyHolderModal: true });
};
const hidePolicyHolderModal = (props) => {
  props.actions.appStateActions.setAppState(props.appState.modelName, props.appState.instanceId, { showPolicyHolderModal: false });
};

export const handleFormSubmit = async (data, dispatch, props) => {
  // const workflowId = props.tasks[props.appState.modelName].data.modelInstanceId;
  // const taskName = userTasks.formSubmit;
  const taskData = { ...data, shouldEditVerify: 'false' };

  // props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, { ...props.appState.data, submitting: true });
  // const steps = [{
  //   name: 'editVerify',
  //   data: {
  //     shouldEditVerify: 'false'
  //   }
  // }, {
  //   name: taskName,
  //   data: taskData
  // }];

  // props.actions.cgActions.batchCompleteTask(props.appState.modelName, workflowId, steps)
  //   .then(() => {
  //     // now update the workflow details so the recalculated rate shows
  //     props.actions.appStateActions.setAppState(props.appState.modelName,
  //       workflowId, { ...props.appState.data, submitting: false });
  //   });
  props.actions.appStateActions.setAppState(props.appState.modelName, '', { ...props.appState.data, submitting: true });
  await props.updateQuote({ data: taskData, quoteNumber: props.quote.quoteNumber });
  props.actions.appStateActions.setAppState(props.appState.modelName, '', { ...props.appState.data, submitting: false });
  props.history.push('thankYou');
};

export const handlePolicyHolderUpdate = async (data, dispatch, props) => {
  // const workflowId = props.tasks[props.appState.modelName].data.modelInstanceId;
  const taskData = { ...data };

  if (!taskData.isAdditional) {
    taskData.pH2email = '';
    taskData.pH2FirstName = '';
    taskData.pH2LastName = '';
    taskData.pH2phone = '';
  }

  taskData.shouldEditVerify = 'PolicyHolder';

  props.actions.appStateActions.setAppState(props.appState.modelName, '', { ...props.appState.data, submitting: true });
  await props.updateQuote({ data: taskData, quoteNumber: props.quote.quoteNumber });
  props.actions.appStateActions.setAppState(props.appState.modelName, '', { ...props.appState.data, submitting: false, showPolicyHolderModal: false });

  // props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, { ...props.appState.data, submitting: true });
  // const steps = [{
  //   name: 'editVerify',
  //   data: {
  //     shouldEditVerify: 'PolicyHolder'
  //   }
  // }, {
  //   name: 'editPolicyHolder',
  //   data: taskData
  // }];

  // props.actions.cgActions.batchCompleteTask(props.appState.modelName, workflowId, steps)
  //   .then(() => {
  //     // now update the workflow details so the recalculated rate shows
  //     props.actions.appStateActions.setAppState(props.appState.modelName,
  //       workflowId, { ...props.appState.data, submitting: false, showPolicyHolderModal: false });
  //   });
};

export const Verify = (props) => {
  let property = {};
  let coverageLimits = {};
  let coverageOptions = {};
  let mailingAddress = {};
  let deductibles = {};

  const {
    fieldValues,
    appState,
    handleSubmit,
    submitting,
    agentList
  } = props;

  // const taskData = (tasks && appState && tasks[appState.modelName]) ? tasks[appState.modelName].data : {};

  const quoteData = props.quote;// _.find(taskData.model.variables, { name: 'getFinalQuote' }) ? _.find(taskData.model.variables, { name: 'getFinalQuote' }).value.result :
  // _.find(taskData.model.variables, { name: 'quote' }).value.result;

  // const agentList = _.find(taskData.model.variables, { name: 'getActiveAgents' }) ?
  // _.find(taskData.model.variables, { name: 'getActiveAgents' }).value.result : [];

  const selectedAgent = agentList.find(agent => agent.agentCode === quoteData.agentCode) || NO_AGENT_FOUND;

  if (quoteData) {
    property = quoteData.property;
    coverageLimits = quoteData.coverageLimits;
    coverageOptions = quoteData.coverageOptions;
    mailingAddress = quoteData.policyHolderMailingAddress || {};
    deductibles = quoteData.deductibles;
  }

  return (
    <div className="route-content verify">
      {props.appState.data.submitting && <Loader />}
      {quoteData && quoteData.quoteNumber &&
      <form id="Verify" onSubmit={handleSubmit(() => scheduleDateModal(props, true))}>
        <div className="scroll">
          <div className="detail-wrapper">
            <div className="detail-group property-details">
              <h3 className="section-group-header">
                <i className="fa fa-map-marker" /> Property Details
                <span id="askAdditionalCustomerData" className="edit-btn" onClick={() => goToStep(props, 'askAdditionalCustomerData')}>
                  <i className="fa fa-pencil" /> Edit
                </span>
              </h3>
              <section className="display-element">
                <dl className="quote-number">
                  <div>
                    <dt>Quote Number</dt>
                    <dd>{quoteData.quoteNumber}</dd>
                  </div>
                </dl>
                <dl className="property-information">
                  <div>
                    <dt>Property Address</dt>
                    <dd>{property.physicalAddress.address1}</dd>
                    <dd>{property.physicalAddress.address2}</dd>
                    <dd>{`${property.physicalAddress.city}, ${property.physicalAddress.state} ${
                      property.physicalAddress.zip}`}</dd>
                  </div>
                </dl>
                <dl className="property-information">
                  <div>
                    <dt>Year Built</dt>
                    <dd>{property.yearBuilt}</dd>
                  </div>
                </dl>
                {/* <dl className="property-information">
                    <div>
                      <dt>Flood Zone</dt>
                      <dd>{property.floodZone}</dd>
                    </div>
                  </dl>*/}
                <dl className="effective-date">
                  <div>
                    <dt>Effective Date</dt>
                    <dd>{moment.utc(quoteData.effectiveDate)
                      .format('MM/DD/YYYY')}</dd>
                  </div>
                </dl>
                <dl className="agent">
                  <div>
                    <dt>Agent</dt>
                    <dd>{`${selectedAgent.firstName} ${selectedAgent.lastName}`}</dd>
                  </div>
                </dl>
              </section>
              <CheckField styleName="verification" name="confirmProperyDetails" label="Verified" isSwitch />
            </div>
            <div className="detail-group quote-details">
              <h3 className="section-group-header"><i className="fa fa-list" /> Quote Details<span className="edit-btn" onClick={() => goToStep(props, 'askToCustomizeDefaultQuote')}><i
                className="fa fa-pencil"
              />  Edit</span></h3>
              <section className="display-element">
                <dl>
                  <div>
                    <dt>Yearly Premium</dt>
                    <dd>$ {quoteData.rating.totalPremium.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</dd>
                  </div>
                </dl>
                <dl>
                  <div>
                    <dt>A. Dwelling</dt>
                    <dd>$ {coverageLimits.dwelling.amount.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</dd>
                  </div>
                </dl>
                <dl>
                  <div>
                    <dt>B. Other Structures</dt>
                    <dd>$ {coverageLimits.otherStructures.amount.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</dd>
                  </div>
                </dl>
                <dl>
                  <div>
                    <dt>C. Personal Property</dt>
                    <dd>$ {coverageLimits.personalProperty.amount.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</dd>
                  </div>
                </dl>
                <dl>
                  <div>
                    <dt>D. Loss Of Use</dt>
                    <dd>$ {coverageLimits.lossOfUse.amount.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</dd>
                  </div>
                </dl>
                <dl>
                  <div>
                    <dt>E. Personal Liability</dt>
                    <dd>$ {coverageLimits.personalLiability.amount.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</dd>
                  </div>
                </dl>
                <dl>
                  <div>
                    <dt>F. Medical Payments</dt>
                    <dd>$ {coverageLimits.medicalPayments.amount.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</dd>
                  </div>
                </dl>
                <dl>
                  <div>
                    <dt>Personal Property Replacement Cost</dt>
                    <dd>{coverageOptions.personalPropertyReplacementCost.answer ? 'Yes' : 'No'}</dd>
                  </div>
                </dl>
                <dl>
                  <div>
                    <dt>Mold Property</dt>
                    <dd>$ {coverageLimits.moldProperty.amount.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</dd>
                  </div>
                </dl>
                <dl>
                  <div>
                    <dt>Mold Liability</dt>
                    <dd>$ {coverageLimits.moldLiability.amount.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</dd>
                  </div>
                </dl>
                <dl>
                  <div>
                    <dt>Ordinance or Law</dt>
                    <dd>$ {(coverageLimits.dwelling.amount *
                      (coverageLimits.ordinanceOrLaw.amount / 100)).toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</dd>
                  </div>
                </dl>
                <dl>
                  <div>
                    <dt>All Other Perils Deductible</dt>
                    <dd>$ {deductibles.allOtherPerils.amount.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</dd>
                  </div>
                </dl>
                <dl>
                  <div>
                    <dt>Hurricane Deductible</dt>
                    <dd>$ {deductibles.hurricane.calculatedAmount.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</dd>
                  </div>
                </dl>
                {deductibles.sinkhole &&
                <dl>
                  <div>
                    <dt>Sinkhole Deductible</dt>
                    <dd>$ {(coverageLimits.dwelling.amount * (deductibles.sinkhole.amount / 100)).toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</dd>
                  </div>
                </dl>
                }
              </section>
              <CheckField styleName="verification" name="confirmQuoteDetails" label="Verified" isSwitch />
            </div>
            <div className="detail-group policyholder-details">
              <h3 className="section-group-header"><i className="fa fa-vcard-o" /> Policyholder Details<span className="edit-btn" onClick={() => showPolicyHolderModal(props)}><i
                className="fa fa-pencil"
              />  Edit</span></h3>
              <section className="display-element">
                <p>Please be sure the information below is up to date and accurate. The final application will be sent to the e-mail addresses of the policyholder(s) provided, to obtain their
                  electronic signature required to bind the policy. Policyholder contact information will also be used to schedule the required property inspection. Failure to schedule property
                  inspection will results in failure to bind the policy.</p>
                <div className="contact-card-wrapper">
                  {(quoteData.policyHolders && quoteData.policyHolders.length > 0) ?
                    quoteData.policyHolders.map((policyHolder, index) => (_.trim(policyHolder.firstName).length > 0 &&
                      <div className="contact-card" key={`ph${index}`}>
                        <h4>{index === 0 ? 'Primary' : 'Secondary'} {'Policyholder'}</h4>
                        <dl>
                          <div className="contact-name">
                            <dt>Name</dt>
                            <dd>{`${policyHolder.firstName} ${policyHolder.lastName}`}</dd>
                          </div>
                          <div className="contact-phone">
                            <dt>Phone Number</dt>
                            <dd>{normalizePhone(policyHolder.primaryPhoneNumber)}</dd>
                          </div>
                          <div className="contact-email">
                            <dt>Email</dt>
                            <dd>{policyHolder.emailAddress}</dd>
                          </div>
                        </dl>
                      </div>)) : null}
                </div>
              </section>
            </div>
            <hr className="section-divider" />
            <div className="detail-group mailing-address-details">
              <h3 className="section-group-header"><i className="fa fa-envelope" /> Mailing Address<span className="edit-btn" onClick={() => goToStep(props, 'askAdditionalQuestions')}><i
                className="fa fa-pencil"
              />  Edit</span></h3>
              <section className="display-element">
                <dl>
                  <div>
                    <dt>Street Address</dt>
                    <dd>{mailingAddress.address1}</dd>
                    <dd>{mailingAddress.address2}</dd>
                  </div>
                </dl>
                <dl>
                  <div>
                    <dt>City/State/Zip</dt>
                    <dd>{mailingAddress.city}, {mailingAddress.state} {mailingAddress.zip}</dd>
                  </div>
                </dl>
                <dl>
                  <div>
                    <dt>Country</dt>
                    <dd>{mailingAddress && mailingAddress.country ? mailingAddress.country.displayText : 'USA'}</dd>
                  </div>
                </dl>
              </section>
              <CheckField styleName="verification" name="confirmPolicyHolderDetails" label="Verified" isSwitch />
            </div>
            <div className="detail-group additional-interests-details">
              <h3 className="section-group-header">
                <i className="fa fa-user-plus" /> Additional Parties<span className="edit-btn" onClick={() => goToStep(props, 'addAdditionalAIs')}><i className="fa fa-pencil" />  Edit</span></h3>
              <section className="display-element additional-interests">
                {(quoteData.additionalInterests && quoteData.additionalInterests.length > 0) ?
                  quoteData.additionalInterests.map((additionalInterest, index) => (_.trim(additionalInterest.name1).length > 0 &&
                    <div className="card" key={`ph${index}`}>
                      <div className="icon-wrapper">
                        <i className={`fa ${additionalInterest.type}`} />
                        <p>{handlePrimarySecondaryTitles(additionalInterest.type, additionalInterest.order)}</p>
                      </div>
                      <section>
                        <h4>{`${additionalInterest.name1}`}</h4>
                        <h4>{`${additionalInterest.name2}`}</h4>
                        <p>
                          {`${additionalInterest.mailingAddress.address1}`}
                          {additionalInterest.mailingAddress.address2 ? `, ${additionalInterest.mailingAddress.address2}` : ''}
                        </p>
                        <p>
                          {`${additionalInterest.mailingAddress.city}, `}
                          {`${additionalInterest.mailingAddress.state} `}
                          {`${additionalInterest.mailingAddress.zip}`}
                        </p>
                      </section>
                      <div className="ref-number">
                        <label htmlFor="ref-number">Reference Number</label>
                        <span>{`${additionalInterest.referenceNumber}`}</span>
                      </div>
                    </div>)) : null}
              </section>
              <CheckField styleName="verification" name="confirmAdditionalInterestsDetails" label="Verified" isSwitch />
            </div>
          </div>
          <div className="workflow-steps">
            <button
              form="Verify"
              disabled={!fieldValues.confirmProperyDetails || !fieldValues.confirmQuoteDetails ||
              !fieldValues.confirmPolicyHolderDetails ||
              !fieldValues.confirmAdditionalInterestsDetails || submitting}
              className="btn btn-primary" type="submit"
            >next
            </button>
          </div>
          <Footer />
        </div>

      </form>
      }
      {appState.data.showPolicyHolderModal &&
      <PolicyHolderPopup
        primaryButtonHandler={handlePolicyHolderUpdate}
        secondaryButtonHandler={() => hidePolicyHolderModal(props)}
        parentProps={props}
        showSnackBar={props.appState.data.showSnackBar}
      />
      }
      {appState.data.showScheduleDateModal &&
      <ScheduleDate
        {...props}
        selectedAgent={selectedAgent}
        quoteData={quoteData}
        verify={handleFormSubmit}
        secondaryButtonHandler={() => scheduleDateModal(props, false)}
        redirectToHome={() => redirectToHome(props)}
      />
      }
    </div>
  );
};

const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState,
  fieldValues: _.get(state.form, 'Verify.values', {}),
  agentList: state.service.agents || [],
  quote: state.quoteState.quote || {},
  workflowState: state.quoteState.state
});

const mapDispatchToProps = dispatch => ({
  updateQuote: bindActionCreators(updateQuote, dispatch),
  actions: {
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'Verify', enableReinitialize: true })(Verify));
