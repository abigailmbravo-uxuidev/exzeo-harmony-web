import React from 'react';
import moment from 'moment';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Button, Switch, normalize, noop } from '@exzeo/core-ui';

import ScheduleDate from './ScheduleDate';
import { STEP_NAMES } from './constants/workflowNavigation';

export class Verify extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      submitting: false,
      confirmPropertyDetails: false,
      confirmQuoteDetails: false,
      confirmPolicyHolderDetails: false,
      confirmAdditionalInterestsDetails: false
    };
  }

  sendApplicationSubmit = async (data) => {
    const { customHandlers } = this.props;
    this.setState(() => ({ submitting: true }));
    await customHandlers.handleSubmit({ shouldSendApplication: true, ...data });
    customHandlers.setShowSendApplicationPopup(false);
    customHandlers.history.replace('thankYou');
  };

  redirectToHome = () => {
    this.props.customHandlers.history.replace('/');
  };

  setConfirmPropertyDetails = (value) => {
    this.setState(() => ({ confirmPropertyDetails: value}))
    return value;
  }

  setConfirmQuoteDetails = (value) => {
    this.setState(() => ({ confirmQuoteDetails: value}))
    return value;
  }

  setConfirmPolicyHolderDetails = (value) => {
    this.setState(() => ({ confirmPolicyHolderDetails: value}))
    return value;
  }

  setConfirmAdditionalInterestsDetails = (value) => {
    this.setState(() => ({ confirmAdditionalInterestsDetails: value}))
    return value;
  }

  closeScheduleDatePopup = () => {
    const { customHandlers } = this.props;
    customHandlers.setShowSendApplicationPopup(false);
    this.setState(() => ({       
      confirmPropertyDetails: false,
      confirmQuoteDetails: false,
      confirmPolicyHolderDetails: false,
      confirmAdditionalInterestsDetails: false
    }))

  }

  render() {
    const {
      formValues,
      config,
      agents,
      customHandlers: {
        goToStep,
        setShowSendApplicationPopup,
        getState,
      },
    } = this.props;

    const { submitting } = this.state;
    const { showSendApplicationPopup } = getState();
    const {productDescription, companyName } = config.extendedProperties;
    const { property, coverageLimits, coverageOptions, deductibles, policyHolders, policyHolderMailingAddress, additionalInterests } = formValues;
    const { phone } = normalize;

    const selectedAgent = agents.find(agent => agent.agentCode === formValues.agentCode) || {};
    return (
      <React.Fragment>
        <div className="verify">
        <div className="detail-group property-details">
          <h3 className="section-group-header">
            <i className="fa fa-map-marker" /> Property Details
            <span id="askAdditionalCustomerData" className="edit-btn" onClick={() => goToStep(STEP_NAMES.askAdditionalCustomerData)}>
              <i className="fa fa-pencil" /> Edit
            </span>
          </h3>
          <section className="display-element">
            <dl className="quote-number">
              <div>
                <dt>Quote Number</dt>
                <dd>{formValues.quoteNumber}</dd>
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
                <dd>{moment.utc(formValues.effectiveDate).format('MM/DD/YYYY')}</dd>
              </div>
            </dl>
            <dl className="agent">
              <div>
                <dt>Agent</dt>
                <dd>{`${selectedAgent.firstName} ${selectedAgent.lastName}`}</dd>
              </div>
            </dl>
          </section>
          <Switch 
          input={{
            name: 'confirmPropertyDetails',
            value: this.state.confirmPropertyDetails,
            onChange: (value) => this.setConfirmPropertyDetails(value),
            onFocus: noop,
            onBlur: noop,
          }}
          styleName="switch"
          customClass="verification"
          label="Verified" 
            />
        </div>
        <div className="detail-group quote-details">
          <h3 className="section-group-header">
            <i className="fa fa-list" /> Quote Details
            <span className="edit-btn" onClick={() => goToStep(STEP_NAMES.askToCustomizeDefaultQuote)}>
              <i className="fa fa-pencil" /> Edit
            </span>
          </h3>
          <section className="display-element">
            <dl>
              <div>
                <dt>Yearly Premium</dt>
                <dd>$ {formValues.rating.totalPremium.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</dd>
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
          <Switch 
            input={{
              name: 'confirmQuoteDetails',
              value: this.state.confirmQuoteDetails,
              onChange: (value) => this.setConfirmQuoteDetails(value),
              onFocus: noop,
              onBlur: noop,
            }}
            styleName="switch"
            customClass="verification"
            label="Verified"
             />
        </div>
        <div className="detail-group policyholder-details">
          <h3 className="section-group-header">
            <i className="fa fa-vcard-o" /> Policyholder Details
            <span className="edit-btn" onClick={() => goToStep(STEP_NAMES.askAdditionalCustomerData)} data-test="edit-policyholder">
              <i className="fa fa-pencil" /> Edit
            </span>
          </h3>
          <section className="display-element">
            <p>Please be sure the information below is up to date and accurate. The final application will be sent to the e-mail addresses of the policyholder(s) provided, to obtain their
              electronic signature required to bind the policy. Policyholder contact information will also be used to schedule the required property inspection. Failure to schedule property
              inspection will results in failure to bind the policy.</p>
            <div className="contact-card-wrapper">
              {policyHolders.map((policyHolder, index) => (String(policyHolder.firstName).trim().length > 0 &&
                <div className="contact-card" key={`ph${index}`}>
                  <h4>{index === 0 ? 'Primary' : 'Secondary'} {'Policyholder'}</h4>
                  <dl>
                    <div className="contact-name">
                      <dt>Name</dt>
                      <dd>{`${policyHolder.firstName} ${policyHolder.lastName}`}</dd>
                    </div>
                    <div className="contact-phone">
                      <dt>Phone Number</dt>
                      <dd>{phone(policyHolder.primaryPhoneNumber)}</dd>
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
        <div className="detail-group mailing-address-details">
          <h3 className="section-group-header">
            <i className="fa fa-envelope" /> Mailing Address
            <span className="edit-btn" onClick={() => goToStep(STEP_NAMES.askAdditionalQuestions)}>
              <i className="fa fa-pencil" /> Edit
            </span>
          </h3>
          <section className="display-element">
            <dl>
              <div className="mailing-street-address">
                <dt>Street Address</dt>
                <dd>{policyHolderMailingAddress.address1}</dd>
                <dd>{policyHolderMailingAddress.address2}</dd>
              </div>
              <div className="mailing-zip-code">
                <dt>City/State/Zip</dt>
                <dd>{policyHolderMailingAddress.city}, {policyHolderMailingAddress.state} {policyHolderMailingAddress.zip}</dd>
              </div>
              <div className="mailing-country">
                <dt>Country</dt>
                <dd>{policyHolderMailingAddress && policyHolderMailingAddress.country ? policyHolderMailingAddress.country.displayText : 'USA'}</dd>
              </div>
            </dl>
          </section>
          <Switch 
            input={{
              name: 'confirmPolicyHolderDetails',
              value: this.state.confirmPolicyHolderDetails,
              onChange: (value) => this.setConfirmPolicyHolderDetails(value),
              onFocus: noop,
              onBlur: noop,
            }}
            styleName="switch"
            customClass="verification"
            label="Verified"
             />
        </div>
        <div className="detail-group additional-interests-details">
            <h3 className="section-group-header">
              <i className="fa fa-user-plus" /> Additional Parties
              <span className="edit-btn" onClick={() => goToStep(STEP_NAMES.addAdditionalAIs)}>
                <i className="fa fa-pencil" /> Edit
              </span>
            </h3>
            <section className="display-element additional-interests">
              {additionalInterests.map((additionalInterest, index) => (String(additionalInterest.name1).trim().length > 0 &&
                <div className="card" key={`ph${index}`}>
                  <div className="icon-wrapper">
                    <i className={`fa ${additionalInterest.type}`} />
                    <p>{this.handlePrimarySecondaryTitles(additionalInterest.type, additionalInterest.order)}</p>
                  </div>
                  <section>
                    <h4>{`${additionalInterest.name1}`}</h4>
                    <h4>{`${additionalInterest.name2}`}</h4>
                    <p>
                      {`${additionalInterest.policyHolderMailingAddress.address1}`}
                      {additionalInterest.policyHolderMailingAddress.address2 ? `, ${additionalInterest.policyHolderMailingAddress.address2}` : ''}
                    </p>
                    <p>
                      {`${additionalInterest.policyHolderMailingAddress.city}, `}
                      {`${additionalInterest.policyHolderMailingAddress.state} `}
                      {`${additionalInterest.policyHolderMailingAddress.zip}`}
                    </p>
                  </section>
                  <div className="ref-number">
                    <label htmlFor="ref-number">Reference Number</label>
                    <span>{`${additionalInterest.referenceNumber}`}</span>
                  </div>
                </div>
              ))}
            </section>
            <Switch 
            input={{
              name: 'confirmAdditionalInterestsDetails',
              value: this.state.confirmAdditionalInterestsDetails,
              onChange: (value) => this.setConfirmAdditionalInterestsDetails(value),
              onFocus: noop,
              onBlur: noop,
            }}
            styleName="switch"
            customClass="verification"
            label="Verified"
             />
          </div>
        <div className="workflow-steps">
          <Button
            className={Button.constants.classNames.primary}
            onClick={setShowSendApplicationPopup}
              disabled={!this.state.confirmPropertyDetails || !this.state.confirmQuoteDetails ||
              !this.state.confirmPolicyHolderDetails ||
              !this.state.confirmAdditionalInterestsDetails || submitting}
            data-test="next"
          >next</Button>
        </div>
         {showSendApplicationPopup &&
          <ScheduleDate
            selectedAgent={selectedAgent}
            submitting={submitting}
            entity={formValues}
            productDescription={productDescription}
            companyName={companyName}
            handleSubmit={this.sendApplicationSubmit}
            redirectToHome={this.redirectToHome}
            handleCancel={this.closeScheduleDatePopup}
          />
         }
         </div>
      </React.Fragment>
    );
  }
}

Verify.defaultProps = {
  submitting: false,
  quote: {},
  customHandlers: {},
  agents: []
};

const mapStateToProps = state => ({
  agents: state.agencyState.agents,
});

export default connect(mapStateToProps)(Verify);
