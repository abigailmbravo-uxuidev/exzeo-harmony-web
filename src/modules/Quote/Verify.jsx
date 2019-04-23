import React from 'react';
import moment from 'moment';
import classNames from 'classnames';
import { Button, normalize } from '@exzeo/core-ui';
import Switch from '@exzeo/core-ui/src/@Harmony/Gandalf/@components/Switch';

import ScheduleDate from './ScheduleDate';


export class Verify extends React.Component {

  sendApplicationSubmit = async (data) => {
    const { customHandlers } = this.props;
    customHandlers.handleSubmit({ shouldSendApplication: true, ...data });
    customHandlers.setEmailPopup(false);
    customHandlers.history.replace('thankYou');

  };

  redirectToNewQuote = () => {
    this.props.customHandlers.history.replace('/');
  };

  render() {
    const {
      submitting,
      formValues,
      config,
      customHandlers: {
        setShowSendApplicationPopup,
        getState,
      },
    } = this.props;

    const { showSendApplicationPopup } = getState();

    const {productDescription, companyName } = config.extendedProperties;

    const { property, coverageLimits, coverageOptions, deductibles, policyHolders, policyHolderMailingAddress, additionalInterests } = formValues;

    const { phone } = normalize;

    const selectedAgent = {};

    return (
      <React.Fragment>
        <div className="scroll">
          <div className="detail-wrapper">
            <div className="detail-group property-details">
              <h3 className="section-group-header">
                <i className="fa fa-map-marker" /> Property Details
                {/* <span id="askAdditionalCustomerData" className="edit-btn" onClick={() => goToStep('askAdditionalCustomerData')}>
                  <i className="fa fa-pencil" /> Edit
                </span> */}
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
              <Switch customClass="verification" name="confirmProperyDetails" label="Verified"  />
            </div>
            <div className="detail-group quote-details">
              <h3 className="section-group-header">
                <i className="fa fa-list" /> Quote Details
                {/* <span className="edit-btn" onClick={() => goToStep('askToCustomizeDefaultQuote')}>
                  <i className="fa fa-pencil" /> Edit
                </span> */}
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
              <Switch customClass="verification" name="confirmQuoteDetails" label="Verified" />
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
            <hr className="section-divider" />
            <div className="detail-group mailing-address-details">
              <h3 className="section-group-header">
                <i className="fa fa-envelope" /> Mailing Address
                {/* <span className="edit-btn" onClick={() => goToStep('askAdditionalQuestions')}>
                  <i className="fa fa-pencil" /> Edit
                </span> */}
              </h3>
              <section className="display-element">
                <dl>
                  <div>
                    <dt>Street Address</dt>
                    <dd>{policyHolderMailingAddress.address1}</dd>
                    <dd>{policyHolderMailingAddress.address2}</dd>
                  </div>
                </dl>
                <dl>
                  <div>
                    <dt>City/State/Zip</dt>
                    <dd>{policyHolderMailingAddress.city}, {policyHolderMailingAddress.state} {policyHolderMailingAddress.zip}</dd>
                  </div>
                </dl>
                <dl>
                  <div>
                    <dt>Country</dt>
                    <dd>{policyHolderMailingAddress && policyHolderMailingAddress.country ? policyHolderMailingAddress.country.displayText : 'USA'}</dd>
                  </div>
                </dl>
              </section>
              <Switch customClass="verification" name="confirmPolicyHolderDetails" label="Verified"  />
            </div>
            <div className="detail-group additional-interests-details">
              <h3 className="section-group-header">
                <i className="fa fa-user-plus" /> Additional Parties
                {/* <span className="edit-btn" onClick={() => goToStep('addAdditionalAIs')}>
                  <i className="fa fa-pencil" /> Edit
                </span> */}
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
              <Switch customClass={classNames('verification')} name="confirmAdditionalInterestsDetails" label="Verified"  />
            </div>
          </div>
        </div>
        <div className="workflow-steps">
          <Button
            className={Button.constants.classNames.primary}
            onClick={setShowSendApplicationPopup}
            disabled={submitting}
                // disabled={!fieldValues.confirmProperyDetails || !fieldValues.confirmQuoteDetails ||
              // !fieldValues.confirmPolicyHolderDetails ||
              // !fieldValues.confirmAdditionalInterestsDetails || submitting}
            data-test="submit"
          >next</Button>
        </div>
         {showSendApplicationPopup &&
          <ScheduleDate
            entity={formValues}
            productDescription={productDescription}
            companyName={companyName}
            onSubmit={this.sendApplicationSubmit}
            redirectToNewQuote={this.redirectToNewQuote}
            handleCancel={() => setShowSendApplicationPopup(false)}
          />
         }
      </React.Fragment>
    );
  }
}

Verify.defaultProps = {
  submitting: false,
  quote: {},
  customHandlers: {}
};

export default Verify;
