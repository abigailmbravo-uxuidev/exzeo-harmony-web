/* eslint import/no-mutable-exports:0 jsx-a11y/label-has-for:0 */
/* eslint no-class-assign :0 */
import React, { Component, PropTypes } from 'react';
import { reduxForm, Form } from 'redux-form';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import localStorage from 'localStorage';
// import _ from 'lodash';

const CoverageDetails = data => (
  <div className="CoverageDetails detail-group">
    <h4>Coverages</h4>
    <section className="summary-section">
      <dl>
        <dt>
          <span>A</span> Dwelling</dt>
        <dd>${data.dwelling}</dd>
      </dl>
      <dl>
        <dt>
          <span>B</span> Other Structures</dt>
        <dd>${data.otherStructures}</dd>
      </dl>
      <dl>
        <dt>
          <span>C</span> Personal Property</dt>
        <dd>${data.personalProperty}</dd>
      </dl>
      <dl>
        <dt>Personal Property Replacement Cost</dt>
        <dd>{data.personalProperty > 0 ? 'Yes' : 'No'}</dd>
      </dl>
      <dl>
        <dt>Loss Of Use</dt>
        <dd>${data.lossOfUse}</dd>
      </dl>
      <dl>
        <dt>Personal Liability</dt>
        <dd>${data.personalLiability}</dd>
      </dl>
      <dl>
        <dt>Medical Payments</dt>
        <dd>${data.medicalPayments}</dd>
      </dl>
      <dl>
        <dt>Mold Property</dt>
        <dd>${data.moldProperty}</dd>
      </dl>
      <dl>
        <dt>Mold Liability</dt>
        <dd>${data.moldLiability}</dd>
      </dl>
      <dl>
        <dt>Ordinance or Law</dt>
        <dd>${data.ordinanceOrLaw}</dd>
      </dl>
    </section>
  </div>
);

const CoverageOptionsDetails = data => (
  <div className="RatingDetails detail-group">
    <h4>Coverage Options</h4>
    <section className="summary-section">

      <dl>
        <dt>Personal Property Replacement Coverage</dt>
        <dd>{data.personalPropertyReplacementCost}</dd>
      </dl>
      <dl>
        <dt>Sinkhole Peril Coverage</dt>
        <dd>{data.sinkholePerilCoverage}</dd>
      </dl>
      <dl>
        <dt>Property Permitted Incidental Occupancies Main Dwelling</dt>
        <dd>{data.propertyIncidentalOccupanciesMainDwelling}</dd>
      </dl>
      <dl>
        <dt>Property Permitted Incidental Occupancies Other Structures</dt>
        <dd>{data.propertyIncidentalOccupanciesOtherStructures}</dd>
      </dl>
      <dl>
        <dt>Liability Permitted Incidental Occupancies</dt>
        <dd>{data.liabilityIncidentalOccupancies}</dd>
      </dl>
    </section>
  </div>
);

const DeductiblesDetails = data => (
  <div className="RatingDetails detail-group">
    <h4>Deductibles</h4>
    <section className="summary-section">

      <dl>
        <dt>Hurricane</dt>
        <dd>{data.hurricane} %</dd>
      </dl>
      <dl>
        <dt>Sinkhole</dt>
        <dd>{data.sinkhole} %</dd>
      </dl>
      <dl>
        <dt>All Other Perils</dt>
        <dd>${data.allOtherPerils}</dd>
      </dl>
    </section>
  </div>
);

const RatingDetails = data => (
  <div className="RatingDetails detail-group">
    <h4>Rating</h4>
    <section className="summary-section">

      <dl>
        <dt>Net Premium</dt>
        <dd>${data.netPremium}</dd>
      </dl>
      <dl>
        <dt>Total Fees</dt>
        <dd>${data.totalFees}</dd>
      </dl>
      <dl>
        <dt>Total Premium</dt>
        <dd>${data.totalPremium}</dd>
      </dl>
      {
        data.windMitigationDiscount && <dl>
          <dt>Wind Mitigation discount</dt>
          <dd>{data.windMitigationDiscount}</dd>
        </dl>
     }
    </section>
  </div>
);

class SharePage extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    styleName: PropTypes.string
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

  componentWillReceiveProps(newProps) {
    if ((!this.props.data.steps && newProps.data.steps) ||
      (!newProps.data.loading &&
        this.props.data.steps &&
        // newProps.data.steps &&
        this.props.data.steps.name !== newProps.data.steps.name
      )) {
      const { steps } = newProps.data;

      const { state } = this;
        // Set up default values
      const quote = steps.data[0];

      this.setState({ quote });
    }
  }

  handleOnSubmit = (event) => {
    if (event && event.preventDefault) event.preventDefault();
    const { state } = this;
    if (state.updated) {
      // Do two mutations
      state.updated = false;
      this.setState(state);
    } else {
      // Do one mutation
      this.context.router.push('/workflow/billing');
    }
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

    const quote = this.state.quote;

    return (
      <div className="workflow-content">
        <section className="">
          <div className="fade-in">
            <Form
              className={`fade-in ${styleName || ''}`} id="Billing" onSubmit={handleSubmit(this.handleOnSubmit)}
              noValidate
            >
              <div className="detail-content-wrapper ">
                <aside>
                  <dl>
                    <dt>Quote number</dt>
                    <dd>{quote.quoteNumber}</dd>
                  </dl>
                  <dl>
                    <dt>Address</dt>
                    <dd>{quote.property.physicalAddress.address1}</dd>
                    <dd>{quote.property.physicalAddress.address2}</dd>
                    <dd>{quote.property.physicalAddress.city},
                      {quote.property.physicalAddress.state}
                      {quote.property.physicalAddress.zip}</dd>
                  </dl>
                  <dl>
                    <dt>Year Built</dt>
                    <dd>{quote.property.yearBuilt}</dd>
                  </dl>
                </aside>
                <div className="detail-wrapper">
                  <CoverageDetails data={quote.coverageLimits} />
                  <CoverageOptionsDetails data={quote.coverageOptions} />
                  <DeductiblesDetails data={quote.deductibles} />
                  <RatingDetails data={quote.rating} />
                </div>
              </div>
              <div className="workflow-steps">
                <button className="btn btn-primary" type="button" form="Billing">share</button>
                <button className="btn btn-primary" type="submit" form="Billing">next</button>
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
