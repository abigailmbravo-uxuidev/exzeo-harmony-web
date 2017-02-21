/* eslint import/no-mutable-exports:0 jsx-a11y/label-has-for:0 */
/* eslint no-class-assign :0 */
import React, { Component, PropTypes } from 'react';
import { reduxForm, Form } from 'redux-form';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import localStorage from 'localStorage';
// import _ from 'lodash';

const CoverageDetails = ({ data }) => (
  <div className="CoverageDetails detail-group">
    <h4>Coverages</h4>
    <section className="summary-section">
      <dl>
        <dt>
          <span>A</span> Dwelling</dt>
        <dd>${data.dwelling.amount}</dd>
      </dl>
      <dl>
        <dt>
          <span>B</span> Other Structures</dt>
        <dd>${data.otherStructures.amount}</dd>
      </dl>
      <dl>
        <dt>
          <span>C</span> Personal Property</dt>
        <dd>${data.personalProperty.amount}</dd>
      </dl>
      <dl>
        <dt>Personal Property Replacement Cost</dt>
        <dd>{data.personalProperty.amount > 0 ? 'Yes' : 'No'}</dd>
      </dl>
      <dl>
        <dt>Loss Of Use</dt>
        <dd>${data.lossOfUse.amount}</dd>
      </dl>
      <dl>
        <dt>Personal Liability</dt>
        <dd>${data.personalLiability.amount}</dd>
      </dl>
      <dl>
        <dt>Medical Payments</dt>
        <dd>${data.medicalPayments.amount}</dd>
      </dl>
      <dl>
        <dt>Mold Property</dt>
        <dd>${data.moldProperty.amount}</dd>
      </dl>
      <dl>
        <dt>Mold Liability</dt>
        <dd>${data.moldLiability.amount}</dd>
      </dl>
      <dl>
        <dt>Ordinance or Law</dt>
        <dd>${data.ordinanceOrLaw.amount}</dd>
      </dl>
    </section>
  </div>
);
//
// const CoverageOptionsDetails = ({ data }) => (
//   <div className="RatingDetails detail-group">
//     <h4>Coverage Options</h4>
//     <section className="summary-section">
//
//       <dl>
//         <dt>Personal Property Replacement Coverage</dt>
//         <dd>{`${data.personalPropertyReplacementCost.answer}`}</dd>
//       </dl>
//       <dl>
//         <dt>Sinkhole Peril Coverage</dt>
//         <dd>{data.sinkholePerilCoverage.answer}</dd>
//       </dl>
//       <dl>
//         <dt>Property Permitted Incidental Occupancies Main Dwelling</dt>
//         <dd>{data.propertyIncidentalOccupanciesMainDwelling.answer}</dd>
//       </dl>
//       <dl>
//         <dt>Property Permitted Incidental Occupancies Other Structures</dt>
//         <dd>{data.propertyIncidentalOccupanciesOtherStructures.answer}</dd>
//       </dl>
//       <dl>
//         <dt>Liability Permitted Incidental Occupancies</dt>
//         <dd>{data.liabilityIncidentalOccupancies.answer}</dd>
//       </dl>
//     </section>
//   </div>
//   );
//
// const DeductiblesDetails = ({ data }) => (
//   <div className="RatingDetails detail-group">
//     <h4>Deductibles</h4>
//     <section className="summary-section">
//
//       <dl>
//         <dt>Hurricane</dt>
//         <dd>{data.hurricane.amount} %</dd>
//       </dl>
//       <dl>
//         <dt>Sinkhole</dt>
//         <dd>{data.sinkhole.amount} %</dd>
//       </dl>
//       <dl>
//         <dt>All Other Perils</dt>
//         <dd>${data.allOtherPerils.amount}</dd>
//       </dl>
//     </section>
//   </div>
// );
//
// const RatingDetails = ({ data }) => (
//   <div className="RatingDetails detail-group">
//     <h4>Rating</h4>
//     <section className="summary-section">
//
//       <dl>
//         <dt>Net Premium</dt>
//         <dd>${data.netPremium}</dd>
//       </dl>
//       <dl>
//         <dt>Total Fees</dt>
//         <dd>${data.totalFees}</dd>
//       </dl>
//       <dl>
//         <dt>Total Premium</dt>
//         <dd>${data.totalPremium}</dd>
//       </dl>
//       {
//         data.windMitigationDiscount && <dl>
//           <dt>Wind Mitigation discount</dt>
//           <dd>{data.windMitigationDiscount}</dd>
//         </dl>
//      }
//     </section>
//   </div>
// );

class SharePage extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    styleName: PropTypes.string,
    completeStep: PropTypes.func,
  }

  static contextTypes = {
    router: PropTypes.any
  }
  // TODO: push up data props into state
  state = {
    quote: {}
  }

  componentWillMount() {
  }

  // componentWillReceiveProps(newProps) {
  //   if ((!this.props.data.steps && newProps.data.steps) ||
  //     (!newProps.data.loading &&
  //       this.props.data.steps &&
  //       // newProps.data.steps &&
  //       this.props.data.steps.name !== newProps.data.steps.name
  //     )) {
  //     const { steps } = newProps.data;
  //
  //     const { state } = this;
  //       // Set up default values
  //     const quoteData = steps.data[0];
  //
  //     this.setState({ quote: quoteData });
  //
  //     console.log('this.state', quoteData);
  //   }
  // }

  buildSubmission = (stepName, data) => ({
    variables: {
      input: {
        workflowId: localStorage.getItem('newWorkflowId'),
        stepName,
        data
      }
    }
  });

  submitWithShareOption = (shareIt) => {
    if (event && event.preventDefault) event.preventDefault();

    this.props.completeStep({
      variables: {
        input: {
          workflowId: localStorage.getItem('newWorkflowId'),
          stepName: 'showCustomizedQuoteAndContinue',
          data: {},
        },
      },
    }).then((updatedShowCustomizedQuoteAndContinue) => {
      this.props.completeStep({
        variables: {
          input: {
            workflowId: localStorage.getItem('newWorkflowId'),
            stepName: 'saveAndSendEmail',
            data: { shouldGeneratePdfAndEmail: shareIt ? 'Yes' : 'No' },
          },
        },
      }).then((updatedShouldGeneratePdfAndEmail) => {
        console.log('UPDATED MODEL : ', updatedShouldGeneratePdfAndEmail);
        const activeLink = updatedShouldGeneratePdfAndEmail.data.completeStep.link;
        this.context.router.push(`${activeLink}`);
      }).catch((error) => {
          // this.context.router.transitionTo('/error');
          console.log('errors from graphql', error); // eslint-disable-line
        this.context.router.push('error');
      });
    }).catch((error) => {
        // this.context.router.transitionTo('/error');
        console.log('errors from graphql', error); // eslint-disable-line
      this.context.router.push('error');
    });
  }

  shareQuote = (event) => {
    if (event && event.preventDefault) event.preventDefault();
    this.submitWithShareOption(true);
  }

  handleOnSubmit = (event) => {
    if (event && event.preventDefault) event.preventDefault();
    this.submitWithShareOption(false);
  }

  buildSubmission = (stepName, data) => ({
    variables: {
      input: {
        workflowId: localStorage.getItem('newWorkflowId'),
        stepName,
        data
      }
    }
  });

  render() {
    const {
      styleName,
      handleSubmit
    } = this.props;


    let quote = null;
    if (this.props.data && this.props.data.steps) {
      console.log('the quote -----------------', this.props.data.steps.data[0]);
      quote = this.props.data.steps.data[0];
    }
    //
    // if (quoteTest) {
    //   quote = quoteTest;
    // }

    return (
      <div className="workflow-content">
        <section className="">
          <div className="fade-in">
            <Form
              className={`fade-in ${styleName || ''}`} id="SharePage" onSubmit={handleSubmit(this.handleOnSubmit)}
              noValidate
            >
              <div className="form-group detail-wrapper">
                <h3 className="section-group-header">Your quote is saved</h3>
                <section className="section-instructions">
                  <h4><i className="fa fa-share-alt" /> To SHARE this quote as a PDF via email</h4>
                  <h5>Click the <a className="btn-link" href="">SHARE</a> button</h5>
                </section>
                <section className="section-instructions">
                  <h4><i className="fa fa-arrow-circle-right" />  To CONTINUE the quote process</h4>
                  <h5>You will need the following</h5>
                  <ul>
                    <li>Mortgage information</li>
                    <li>Name and email address of additional owners</li>
                    <li>Name and address of any other additional insured to add to this policy</li>
                  </ul>
                  <h5>Click the <a className="btn-link" href="">NEXT</a> button</h5>
                </section>
                <section className="section-instructions">
                  <h4><i className="fa fa-quote-left" />  To begin a NEW QUOTE</h4>
                  <h5>Click the <a className="btn-link" href="/"><i className="fa fa-th-large" /> Dasboard</a> tab</h5>
                </section>
              </div>
              <div className="workflow-steps">
                <button className="btn btn-secondary" type="button" onClick={this.shareQuote}>share</button>
                <button className="btn btn-primary" type="submit">next</button>
              </div>
            </Form>
          </div>
        </section>
      </div>
    );
  }
}

SharePage = reduxForm({
  form: 'SharePage', // a unique identifier for this form
})(SharePage);


SharePage = connect()(graphql(gql `
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
                agencyId
                agentId
                billToType
                billTold
                billPlan
                eligibilty
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
          workflowId: localStorage.getItem('newWorkflowId'),
        },
      },
    })(graphql(gql `
      mutation CompleteStep($input:CompleteStepInput) {
        completeStep(input:$input) {
          name
          link
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
          type
          completedSteps
        }
      }
    `, { name: 'completeStep' })(SharePage)));


export default SharePage;
