import React, { Component, PropTypes } from 'react';
import localStorage from 'localStorage';
import { Form } from 'redux-form';
import moment from 'moment';
import _ from 'lodash';
import EffectiveDate from '../EffectiveDate/EffectiveDate';
import PolicyHolderUpdateForm from '../policyHolder/PolicyHolderUpdateForm';
import MailingAddress from '../MailingAddress/MailingAddress';
import { CheckField } from '../../form/inputs';
import Footer from '../../common/Footer';

class VerifyForm extends Component {
  static propTypes = {
    initialize: PropTypes.func,
    completeStep: PropTypes.func,
    data: PropTypes.any, // eslint-disable-line
    handleSubmit: PropTypes.func,
    initialValues: PropTypes.any, // eslint-disable-line
    push: PropTypes.func,
    state: PropTypes.any, // eslint-disable-line
    effectiveDate: PropTypes.string,
    editConfirmPolicyHolder: PropTypes.bool,
    editProperty: PropTypes.bool,
    editMailingAddress: PropTypes.bool,
    confirmProperyDetails: PropTypes.bool,
    confirmQuoteDetails: PropTypes.bool,
    confirmPolicyHolderDetails: PropTypes.bool
  }

  updateQuote() {
    const initialValues = {
      editProperty: false,
      editConfirmPolicyHolder: false,
      editMailingAddress: false,
      editConfirmAdditionalInterests: false
    };
    this.props.initialize(initialValues);
    alert('quote updated'); // eslint-disable-line
  }

  handleOnSubmit = () => {
    this.props.completeStep({
      variables: {
        input: {
          workflowId: localStorage.getItem('newWorkflowId'),
          stepName: 'askScheduleInspectionDates',
          data: {}
        }
      }
    }).then(() => {
      // console.log('UPDATED MODEL : ', updatedShouldGeneratePdfAndEmail);
      // const activeLink = updatedShouldGeneratePdfAndEmail.data.completeStep.link;
      this.props.push('thankyou');
    }).catch((error) => {
      // this.context.router.transitionTo('/error');
      console.log('errors from graphql', error); // eslint-disable-line
      this.props.push('error');
    });
  }

  render() {
    const {
      handleSubmit,
      initialValues,
      state,
      effectiveDate,
      editConfirmPolicyHolder,
      editProperty,
      editMailingAddress,
      confirmProperyDetails,
      confirmQuoteDetails,
      confirmPolicyHolderDetails
    } = this.props;

    let property = {};
    let coverageLimits = {};
    let coverageOptions = {};
    let mailingAddress = {};

    let details = {};

    let quoteData = null;
    if (this.props.data && this.props.data.steps) {
      quoteData = this.props.data.steps.data[0];
      property = quoteData.property;
      coverageLimits = quoteData.coverageLimits;
      coverageOptions = quoteData.coverageOptions;
      mailingAddress = quoteData.policyHolderMailingAddress || {};
      initialValues.effectiveDate = moment(quoteData.effectiveDate).format('YYYY-MM-DD');
      details = this.props.data.steps.details;
    }
    return (
      <div className="workflow-content">
        {quoteData &&
          <div className="detail-wrapper">
            {!editProperty &&
              <div className="detail-group property-details">
                <h3 className="section-group-header"><i className="fa fa-map-marker" /> Property Details</h3>
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
                      <dt>Year Built</dt>
                      <dd>{property.yearBuilt}</dd>
                      <dt>Flood Zone</dt>
                      <dd>{property.floodZone}</dd>
                    </div>
                  </dl>
                  <dl className="effective-date">
                    <div>
                      <dt>Effective Date</dt>
                      <dd>{moment(quoteData.effectiveDate).format('MM/DD/YYYY')}</dd>
                    </div>
                  </dl>
                </section>
                <CheckField
                  styleName="verification"
                  disabled={editProperty}
                  name="confirmProperyDetails"
                  label="Verified"
                  isSwitch
                />
              </div>
            }
            {editProperty &&
              <div className="detail-group property-details edit">
                <h3 className="section-group-header"><i className="fa fa-map-marker" /> Property Details</h3>
                <div className="editing"><i className="fa fa-pencil" /> Editing</div>
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
                      <dt>Year Built</dt>
                      <dd>{property.yearBuilt}</dd>
                      <dt>Flood Zone</dt>
                      <dd>{property.protectionClass}</dd>
                    </div>
                  </dl>
                  <div className="effective-date">
                    <EffectiveDate handleOnSubmit={this.updateQuote} effectiveDate={moment(effectiveDate).format('MM/DD/YYYY')} />
                  </div>
                </section>
              </div>
            }

            <div className="detail-group quote-details">
              <h3 className="section-group-header"><i className="fa fa-list" /> Quote Details</h3>
              <section className="display-element">
                <dl>
                  <div>
                    <dt>Yearly Premium</dt>
                    <dd>${_.find(details, { name: 'Annual Premium' }).value}</dd>
                  </div>
                </dl>
                <dl>
                  <div>
                    <dt>A. Dwelling</dt>
                    <dd>${coverageLimits.dwelling.amount}</dd>
                  </div>
                </dl>
                <dl>
                  <div>
                    <dt>B. Other Structures</dt>
                    <dd>${coverageLimits.otherStructures.amount}</dd>
                  </div>
                </dl>
                <dl>
                  <div>
                    <dt>C. Personal Property</dt>
                    <dd>${coverageLimits.personalProperty.amount}</dd>
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
                    <dt>Loss Of Use</dt>
                    <dd>${coverageLimits.lossOfUse.amount}</dd>
                  </div>
                </dl>
                <dl>
                  <div>
                    <dt>Personal Liability</dt>
                    <dd>${coverageLimits.personalLiability.amount}</dd>
                  </div>
                </dl>
                <dl>
                  <div>
                    <dt>Medical Payments</dt>
                    <dd>${coverageLimits.medicalPayments.amount}</dd>
                  </div>
                </dl>
                <dl>
                  <div>
                    <dt>Mold Property</dt>
                    <dd>${coverageLimits.moldProperty.amount}</dd>
                  </div>
                </dl>
                <dl>
                  <div>
                    <dt>Mold Liability</dt>
                    <dd>${coverageLimits.moldLiability.amount}</dd>
                  </div>
                </dl>
                <dl>
                  <div>
                    <dt>Ordinance or Law</dt>
                    <dd>${coverageLimits.dwelling.amount *
                       (coverageLimits.ordinanceOrLaw.amount / 100)}</dd>
                  </div>
                </dl>
              </section>
              <CheckField
                styleName="verification"
                name="confirmQuoteDetails"
                label="Verified"
                isSwitch
              />
            </div>

            {!editConfirmPolicyHolder &&
              <div className="detail-group policyholder-details">
                <h3 className="section-group-header"><i className="fa fa-vcard-o" /> Policyholder Details</h3>
                <section className="display-element">
                  {(quoteData.policyHolders && quoteData.policyHolders.length > 0) ?
                     quoteData.policyHolders.map((policyHolder, index) => (
                       <dl key={`ph${index}`}>
                         <h5>{index === 0 ? 'Primary' : 'Secondary'} {'Policyholder'}</h5>
                         <div>
                           <dt>Name</dt>
                           <dd>{`${policyHolder.firstName} ${policyHolder.lastName}`}</dd>
                           <dt>Phone Number</dt>
                           <dd>{policyHolder.primaryPhoneNumber}</dd>
                           <dt>Email</dt>
                           <dd>{policyHolder.emailAddress}</dd>
                         </div>
                       </dl>
                        )) : null}
                </section>
              </div>
            }
            {editConfirmPolicyHolder &&
              <div className="detail-group policyholder-details edit">
                <h3 className="section-group-header"><i className="fa fa-vcard-o" /> Policyholder Details</h3>
                <div className="editing"><i className="fa fa-pencil" /> Editing</div>
                <section className="display-element">
                  <PolicyHolderUpdateForm handleOnSubmit={this.updateQuote} state={state} />
                </section>
              </div>
            }

            {!editMailingAddress &&
              <div className="detail-group mailing-address-details">
                <h3 className="section-group-header"><i className="fa fa-envelope-open" /> Mailing Address</h3>
                <section className="display-element">
                  <dl>
                    <div>
                      <dt>Address</dt>
                      <dd>{mailingAddress.address1}</dd>
                      <dd>{mailingAddress.address2}</dd>
                      <dt>City/State/Zip</dt>
                      <dd>{mailingAddress.city}, {mailingAddress.state} {mailingAddress.zip}</dd>
                      <dt>Country</dt>
                      <dd>{ mailingAddress && mailingAddress.country ? mailingAddress.country.displayText : 'USA'}</dd>
                    </div>
                  </dl>
                  <dl />
                </section>
                <CheckField
                  styleName="verification"
                  name="confirmPolicyHolderDetails"
                  label="Verify"
                  isSwitch
                />
              </div>
            }
            {editMailingAddress &&
              <div className="detail-group mailing-address-details edit">
                <h3 className="section-group-header"><i className="fa fa-envelope-open-o" /> Mailing Address</h3>
                <div className="editing"><i className="fa fa-pencil" /> Editing</div>
                <section className="display-element">
                  <MailingAddress name={'policyHolderMailingAddress'} handleOnSubmit={this.updateQuote} />
                </section>
              </div>
            }
            <section>
              <Form
                className="fade-in"
                id="Verify"
                onSubmit={handleSubmit(this.handleOnSubmit)}
                noValidate
              >
                <div className="workflow-steps">
                  <button
                    disabled={
                      !confirmProperyDetails || !confirmQuoteDetails || !confirmPolicyHolderDetails
                    }
                    className="btn btn-primary"
                    type="submit"
                    form="Verify"
                  >
                    next
                  </button>
                </div>
              </Form>
            </section>
          </div>
        }
        <Footer />
      </div>
    );
  }
}

export default VerifyForm;
