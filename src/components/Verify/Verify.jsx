import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import _ from 'lodash';
import moment from 'moment';

import ScheduleDate from '../Common/ScheduleDate';
import Footer from '../Common/Footer';
import PolicyHolderPopup from '../Common/PolicyHolderPopup';
import { CheckField } from '../Form/inputs';
import normalizePhone from '../Form/normalizePhone';

const NO_AGENT_FOUND = { firstName: '', lastName: '' };

export class Verify extends React.Component {
  state = {
    showPolicyHolderModal: false,
    showScheduleDateModal: false,
  };

  scheduleDateModal = (showModal) => {
    this.setState({ showScheduleDateModal: !!showModal });
  };

  redirectToHome = () => {
    this.scheduleDateModal(false);
    this.props.history.replace('/');
  };

  handlePrimarySecondaryTitles = (type, order) => `${type} ${order + 1}`;

  showPolicyHolderModal = () => {
    this.setState({ showPolicyHolderModal: true });
  };

  hidePolicyHolderModal = () => {
    this.setState({ showPolicyHolderModal: false });
  };

  handleFormSubmit = async (data) => {
    const { quote, history } = this.props;
    const taskData = { ...data, shouldEditVerify: 'false' };
    await this.props.updateQuote({ data: taskData, quoteNumber: quote.quoteNumber });
    history.replace('thankYou');
  };

  handlePolicyHolderUpdate = async (data) => {
    const { quote } = this.props;
    const taskData = { ...data };

    if (!taskData.isAdditional) {
      taskData.pH2email = '';
      taskData.pH2FirstName = '';
      taskData.pH2LastName = '';
      taskData.pH2phone = '';
    }

    taskData.shouldEditVerify = 'PolicyHolder';

    await this.props.updateQuote({ data: taskData, quoteNumber: quote.quoteNumber });
    this.setState({ showPolicyHolderModal: false });
  };

  render() {
    const {
      fieldValues,
      handleSubmit,
      submitting,
      agentList,
      goToStep,
      quote: quoteData,
    } = this.props;

    const {
      additionalInterests = [],
      property,
      coverageLimits,
      coverageOptions,
      policyHolders = [],
      policyHolderMailingAddress: mailingAddress = {},
      deductibles
    } = quoteData;

    const selectedAgent = agentList.find(agent => agent.agentCode === quoteData.agentCode) || NO_AGENT_FOUND;


    return (
      <div className="route-content verify" data-test="verify">
        {quoteData.quoteNumber &&
          <form id="Verify" onSubmit={handleSubmit(() => this.scheduleDateModal(true))}>
            <div className="scroll">
              <div className="detail-wrapper">
                <div className="detail-group property-details">
                  <h3 className="section-group-header">
                    <i className="fa fa-map-marker" /> Property Details
                    <span id="askAdditionalCustomerData" className="edit-btn" onClick={() => goToStep('askAdditionalCustomerData')}>
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
                    <dl className="effective-date">
                      <div>
                        <dt>Effective Date</dt>
                        <dd>{moment.utc(quoteData.effectiveDate).format('MM/DD/YYYY')}</dd>
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
                  <h3 className="section-group-header">
                    <i className="fa fa-list" /> Quote Details
                    <span className="edit-btn" onClick={() => goToStep('askToCustomizeDefaultQuote')}>
                      <i className="fa fa-pencil" /> Edit
                    </span>
                  </h3>
                  <section className="display-element">
                    <dl>
                      <div>
                        <dt>Yearly Premium</dt>
                        <dd>$ {quoteData.rating.totalPremium.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</dd>
                      </div>
                    </dl>
                    <dl>
                      <div>
                        <dt>A. Dwelling</dt>
                        <dd>$ {coverageLimits.dwelling.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</dd>
                      </div>
                    </dl>
                    <dl>
                      <div>
                        <dt>B. Other Structures</dt>
                        <dd>$ {coverageLimits.otherStructures.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</dd>
                      </div>
                    </dl>
                    <dl>
                      <div>
                        <dt>C. Personal Property</dt>
                        <dd>$ {coverageLimits.personalProperty.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</dd>
                      </div>
                    </dl>
                    <dl>
                      <div>
                        <dt>D. Loss Of Use</dt>
                        <dd>$ {coverageLimits.lossOfUse.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</dd>
                      </div>
                    </dl>
                    <dl>
                      <div>
                        <dt>E. Personal Liability</dt>
                        <dd>$ {coverageLimits.personalLiability.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</dd>
                      </div>
                    </dl>
                    <dl>
                      <div>
                        <dt>F. Medical Payments</dt>
                        <dd>$ {coverageLimits.medicalPayments.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</dd>
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
                        <dd>$ {coverageLimits.moldProperty.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</dd>
                      </div>
                    </dl>
                    <dl>
                      <div>
                        <dt>Mold Liability</dt>
                        <dd>$ {coverageLimits.moldLiability.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</dd>
                      </div>
                    </dl>
                    <dl>
                      <div>
                        <dt>Ordinance or Law</dt>
                        <dd>$ {coverageLimits.ordinanceOrLaw.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</dd>
                      </div>
                    </dl>
                    <dl>
                      <div>
                        <dt>All Other Perils Deductible</dt>
                        <dd>$ {deductibles.allOtherPerils.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</dd>
                      </div>
                    </dl>
                    <dl>
                      <div>
                        <dt>Hurricane Deductible</dt>
                        <dd>$ {deductibles.hurricane.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</dd>
                      </div>
                    </dl>
                    {deductibles.sinkhole &&
                      <dl>
                        <div>
                          <dt>Sinkhole Deductible</dt>
                          <dd>$ {deductibles.sinkhole.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</dd>
                        </div>
                      </dl>
                    }
                  </section>
                  <CheckField styleName="verification" name="confirmQuoteDetails" label="Verified" isSwitch />
                </div>
                <div className="detail-group policyholder-details">
                  <h3 className="section-group-header">
                    <i className="fa fa-vcard-o" /> Policyholder Details
                    <span className="edit-btn" onClick={() => this.showPolicyHolderModal()} data-test="edit-policyholder">
                      <i className="fa fa-pencil" /> Edit
                    </span>
                  </h3>
                  <section className="display-element">
                    <p>Please be sure the information below is up to date and accurate. The final application will be sent to the e-mail addresses of the policyholder(s) provided, to obtain their
                      electronic signature required to bind the policy. Policyholder contact information will also be used to schedule the required property inspection. Failure to schedule property
                      inspection will results in failure to bind the policy.</p>
                    <div className="contact-card-wrapper">
                      {policyHolders.map((policyHolder, index) => (_.trim(policyHolder.firstName).length > 0 &&
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
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
                <hr className="section-divider" />
                <div className="detail-group mailing-address-details">
                  <h3 className="section-group-header">
                    <i className="fa fa-envelope" /> Mailing Address
                    <span className="edit-btn" onClick={() => goToStep('askAdditionalQuestions')}>
                      <i className="fa fa-pencil" /> Edit
                    </span>
                  </h3>
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
                    <i className="fa fa-user-plus" /> Additional Parties
                    <span className="edit-btn" onClick={() => goToStep('addAdditionalAIs')}>
                      <i className="fa fa-pencil" /> Edit
                    </span>
                  </h3>
                  <section className="display-element additional-interests">
                    {additionalInterests.map((additionalInterest, index) => (_.trim(additionalInterest.name1).length > 0 &&
                      <div className="card" key={`ph${index}`}>
                        <div className="icon-wrapper">
                          <i className={`fa ${additionalInterest.type}`} />
                          <p>{this.handlePrimarySecondaryTitles(additionalInterest.type, additionalInterest.order)}</p>
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
                      </div>
                    ))}
                  </section>
                  <CheckField styleName="verification" name="confirmAdditionalInterestsDetails" label="Verified" isSwitch />
                </div>
              </div>
              <div className="workflow-steps">
                <button
                  form="Verify"
                  className="btn btn-primary"
                  type="submit"
                  disabled={!fieldValues.confirmProperyDetails || !fieldValues.confirmQuoteDetails ||
                  !fieldValues.confirmPolicyHolderDetails ||
                  !fieldValues.confirmAdditionalInterestsDetails || submitting}
                  data-test="submit"
                >next</button>
              </div>
              <Footer />
            </div>
          </form>
        }
        {this.state.showPolicyHolderModal &&
          <PolicyHolderPopup
            primaryButtonHandler={this.handlePolicyHolderUpdate}
            secondaryButtonHandler={() => this.hidePolicyHolderModal()}
            parentProps={this.props}
          />
        }
        {this.state.showScheduleDateModal &&
          <ScheduleDate
            {...this.props}
            selectedAgent={selectedAgent}
            quoteData={quoteData}
            verify={this.handleFormSubmit}
            secondaryButtonHandler={() => this.scheduleDateModal(false)}
            redirectToHome={() => this.redirectToHome()}
          />
        }
      </div>
    );
  }
}

Verify.defaultProps = {
  quote: {},
};

const mapStateToProps = state => ({
  showSnackBar: state.appState.showSnackBar,
  fieldValues: _.get(state.form, 'Verify.values', {}),
  agentList: state.agencyState.agents || [],
  quote: state.quoteState.quote || {},
  workflowState: state.quoteState.state
});

export default connect(mapStateToProps)(reduxForm({
  form: 'Verify',
  enableReinitialize: true
})(Verify));
