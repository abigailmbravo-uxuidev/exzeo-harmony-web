/*
eslint no-class-assign:0
*/
import React, { Component, PropTypes } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import localStorage from 'localStorage';
import _ from 'lodash';
import { connect } from 'react-redux';
import { reduxForm, Form, formValueSelector, change } from 'redux-form';
import moment from 'moment';
import BoolInput from '../../inputs/BoolInput';
import EffectiveDateForm from '../../forms/EffectiveDate/EffectiveDateForm';
import PolicyHolderUpdateForm from '../../forms/policyHolder/PolicyHolderUpdateForm';
// import AdditionalInterestUpdateForm
// from '../../forms/AdditionalInterests/AdditionalInterestUpdateForm';
import MailingAddressForm from '../../forms/MailingAddress/MailingAddressForm';
import Footer from '../../common/Footer';

class Verify extends Component {
  static contextTypes = {
    router: PropTypes.object
  }
  componentWillMount() {

  }

  handleChange = () => {
    // const { state } = this;
    // state[event.target.name] = event.target.value;
    // state.updated = true;
    // this.setState(state);
  }

  updateQuote() {
    this.props.dispatch(change('Verify', 'editProperty', false));
    this.props.dispatch(change('Verify', 'editConfirmPolicyHolder', false));
    this.props.dispatch(change('Verify', 'editMailingAddress', false));
    this.props.dispatch(change('Verify', 'editConfirmAdditionalInterests', false));
    // Object.assign({}, state, { whatever: action.value });
    alert('quote updated');
  }

  handleOnSubmit = (event) => {
    if (event && event.preventDefault) event.preventDefault();

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
      this.context.router.push('thankyou');
    }).catch((error) => {
        // this.context.router.transitionTo('/error');
        console.log('errors from graphql', error); // eslint-disable-line
      this.context.router.push('error');
    });
  }

  render() {
    const {
      handleSubmit,
      initialValues,
      state,
      styleName,
      effectiveDate,
//      editConfirmAdditionalInterests,
      editConfirmPolicyHolder,
      editProperty,
      editMailingAddress,
      confirmProperyDetails,
      confirmQuoteDetails,
      confirmPolicyHolderDetails
  //    confirmAdditionalInterestsDetails
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
      quoteData && <div className="workflow-content">
        <div className="detail-wrapper">
          {!editProperty && <div className="detail-group property-details">
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
            <BoolInput styleName="verification" disabled={editProperty} name={'confirmProperyDetails'} question={'Verified'} handleChange={function () {}} value={false} isSwitch />
          </div>}
          {editProperty && <div className="detail-group property-details edit">
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
                <EffectiveDateForm handleOnSubmit={this.updateQuote} effectiveDate={moment(effectiveDate).format('MM/DD/YYYY')} />
              </div>
            </section>
          </div>}

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
            <BoolInput styleName="verification" name={'confirmQuoteDetails'} question={'Verified'} handleChange={function () {}} value={confirmQuoteDetails} isSwitch />
          </div>

          {!editConfirmPolicyHolder && <div className="detail-group policyholder-details">
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
          </div>}
          {editConfirmPolicyHolder && <div className="detail-group policyholder-details edit">
            <h3 className="section-group-header"><i className="fa fa-vcard-o" /> Policyholder Details</h3>
            <div className="editing"><i className="fa fa-pencil" /> Editing</div>
            <section className="display-element">
              <PolicyHolderUpdateForm handleOnSubmit={this.updateQuote} state={state} />
            </section>
          </div>}

          {!editMailingAddress && <div className="detail-group mailing-address-details">
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
            <BoolInput styleName="verification" name={'confirmPolicyHolderDetails'} question={'Verified'} handleChange={function () {}} value={confirmPolicyHolderDetails} isSwitch />
          </div>}
          {editMailingAddress && <div className="detail-group mailing-address-details edit">
            <h3 className="section-group-header"><i className="fa fa-envelope-open-o" /> Mailing Address</h3>
            <div className="editing"><i className="fa fa-pencil" /> Editing</div>
            <section className="display-element">
              <MailingAddressForm name={'policyHolderMailingAddress'} handleOnSubmit={this.updateQuote} />
            </section>
          </div>}

          {/* {!editConfirmAdditionalInterests &&
            <div className="detail-group additional-interests-details">
            <h3 className="section-group-header">
            <i className="fa fa-bank" /> Additional Interests</h3>
            <section className="display-element">

              {(quoteData.additionalInterests && quoteData.additionalInterests.length > 0) ?
                 quoteData.additionalInterests.map((additionalInterests, index) => (
                   <dl key={`ai${index}`}>
                     <div>
                       <dt>Name</dt>
                       <dd>{`${additionalInterests.name1} ${additionalInterests.name2}`}</dd>
                       <dt>Address</dt>
                       <dd>{additionalInterests.mailingAddress.address1}</dd>
                       <dd>{additionalInterests.mailingAddress.address2}</dd>
                       <dt>City/State/Zip</dt>
                       <dd>{additionalInterests.mailingAddress.city},
                      {additionalInterests.mailingAddress.state}
                         {additionalInterests.mailingAddress.zip}
                       </dd>
                     </div>
                   </dl>
                    )) : null}
            </section>
            <BoolInput styleName="verification"
            name={'confirmAdditionalInterestsDetails'} question={'Verified'}
            handleChange={function () {}} value={confirmAdditionalInterestsDetails} isSwitch />
          </div>}
          {editConfirmAdditionalInterests &&
          <div className="detail-group additional-interests-details edit">
            <h4 className="section-group-header"><i className="fa fa-bank" />
            Additional Interests</h4>
            <div className="editing"><i className="fa fa-pencil" /> Editing</div>
            <section className="display-element">
              <AdditionalInterestUpdateForm
                additionalInterests={quoteData.additionalInterests}
                handleOnSubmit={this.updateQuote}
              />
            </section>
          </div>} */}

          <section>
            <Form className={`fade-in ${styleName || ''}`} id="survey" onSubmit={handleSubmit(this.handleOnSubmit)} noValidate>
              <div className="workflow-steps">
                <button disabled={!confirmProperyDetails || !confirmQuoteDetails || !confirmPolicyHolderDetails} className="btn btn-primary" type="submit" form="survey">next</button>
              </div>
            </Form>
          </section>

        </div>
        <Footer />
      </div>
    );
  }
}

Verify.propTypes = {
  data: {},
  completeStep: PropTypes.func,
  state: PropTypes.any, //eslint-disable-line
  dispatch: PropTypes.any, //eslint-disable-line
  initialValues: PropTypes.any, //eslint-disable-line
  editMailingAddress: PropTypes.bool,
  effectiveDate: PropTypes.string,
//  editConfirmAdditionalInterests: PropTypes.bool,
  editConfirmPolicyHolder: PropTypes.bool,
  editProperty: PropTypes.bool,
  confirmProperyDetails: PropTypes.bool,
  confirmQuoteDetails: PropTypes.bool,
  confirmPolicyHolderDetails: PropTypes.bool,
//  confirmAdditionalInterestsDetails: PropTypes.bool,
  handleSubmit: PropTypes.func,
  quote: PropTypes.object, //eslint-disable-line
  styleName: PropTypes.string
};

Verify = reduxForm({
  form: 'Verify' // a unique identifier for this form
})(Verify);

const selector = formValueSelector('Verify'); // <-- same as form name

Verify = connect((state) => {
  // can select values individually
  const editConfirmAdditionalInterests = selector(state, 'editConfirmAdditionalInterests');
  const editConfirmPolicyHolder = selector(state, 'editConfirmPolicyHolder');
  const editMailingAddress = selector(state, 'editMailingAddress');
  const editProperty = selector(state, 'editProperty');
  const confirmProperyDetails = selector(state, 'confirmProperyDetails');
  const confirmQuoteDetails = selector(state, 'confirmQuoteDetails');
  const confirmPolicyHolderDetails = selector(state, 'confirmPolicyHolderDetails');
  const confirmAdditionalInterestsDetails = selector(state, 'confirmAdditionalInterestsDetails');

  const effectiveDate = selector(state, 'effectiveDate');

  return {
    initialValues: {
      policyHolderMailingAddress: {},
      additionalInterests: [],
      policyHolders: []
    },
    state,
    effectiveDate,
    editConfirmAdditionalInterests,
    editConfirmPolicyHolder,
    editProperty,
    editMailingAddress,
    confirmProperyDetails,
    confirmQuoteDetails,
    confirmPolicyHolderDetails,
    confirmAdditionalInterestsDetails
  };
})(Verify);

Verify = connect()(graphql(gql `
    query GetActiveStep($workflowId:ID!) {
        steps(id: $workflowId) {
            name
            details {
                name
                value
            }
            data {
              ... on Quote {
                companyCode
                state
                product
                quoteNumber
                effectiveDate
                endDate


                billToType
                billTold
                billPlan
                eligibilty
                policyHolders{
                  order
                  entityType
                  companyName
                  firstName
                  lastName
                  primaryPhoneNumber
                  secondaryPhoneNumber
                  emailAddress
                }
                policyHolderMailingAddress{
                  address1
                  address2
                  city
                  state
                  zip
                }
                coverageLimits {
                  dwelling {
                    maxAmount
                    minAmount
                    amount
                    format
                  }
                  otherStructures {
                    amount
                    format
                  }
                  personalProperty {
                    amount
                    format
                  }
                  lossOfUse {
                    amount
                    format
                  }
                  personalLiability {
                    amount
                    format
                  }
                  medicalPayments {
                    amount
                    format
                  }
                  ordinanceOrLaw {
                    amount
                    format
                  }
                  moldProperty {
                    amount
                    format
                  }
                  moldLiability {
                    amount
                    format
                  }
                }
                coverageOptions {
                  personalPropertyReplacementCost {
                    answer
                  }
                  sinkholePerilCoverage {
                    answer
                  }
                  propertyIncidentalOccupanciesMainDwelling {
                    answer
                  }
                  propertyIncidentalOccupanciesOtherStructures {
                    answer
                  }
                  liabilityIncidentalOccupancies {
                    answer
                  }
                }
                deductibles {
                  hurricane {
                    amount
                    format
                  }
                  sinkhole {
                    amount
                    format
                  }
                  allOtherPerils {
                    amount
                    format
                  }
                }
                property {
                  yearBuilt
                  floodZone
                  residenceType
                  constructionType
                  territory
                  physicalAddress {
                    address1
                    address2
                    city
                    state
                    zip
                    id
                  }
                }
              }
              ... on Property {
                physicalAddress {
                  address1
                }
              }
              ... on Address {
                address1
                city
                state
                zip
                id
              }
            }
            completedSteps
            type
        }
    }`, {
      options: {
        variables: {
          workflowId: localStorage.getItem('newWorkflowId')
        }
      }
    })(graphql(gql `
      mutation CompleteStep($input:CompleteStepInput) {
        completeStep(input:$input) {
          name

          details {
            name
            value
          }
          data {
            ... on Quote {
              coverageLimits {
                dwelling {
                  maxAmount
                  minAmount
                  amount
                  format
                }
                otherStructures {
                  amount
                  format
                }
                personalProperty {
                  amount
                  format
                }
                lossOfUse {
                  amount
                  format
                }
                personalLiability {
                  amount
                  format
                }
                medicalPayments {
                  amount
                  format
                }
                ordinanceOrLaw {
                  amount
                  format
                }
                moldProperty {
                  amount
                  format
                }
                moldLiability {
                  amount
                  format
                }
              }
              coverageOptions {
                personalPropertyReplacementCost {
                  answer
                }
                sinkholePerilCoverage {
                  answer
                }
                propertyIncidentalOccupanciesMainDwelling {
                  answer
                }
                propertyIncidentalOccupanciesOtherStructures {
                  answer
                }
                liabilityIncidentalOccupancies {
                  answer
                }
              }
              deductibles {
                hurricane {
                  amount
                  format
                }
                sinkhole {
                  amount
                  format
                }
                allOtherPerils {
                  amount
                  format
                }
              }
              property {
                physicalAddress {
                  address1
                }
              }
            }
            ... on Property {
              physicalAddress {
                address1
                address2
                city
                state
                zip
              }
            }
            ... on Address {
              address1
              address2
              city
              state
              zip
              id
            }
          }
          type
          completedSteps
        }
      }
    `, { name: 'completeStep' })(Verify)));


export default Verify;
