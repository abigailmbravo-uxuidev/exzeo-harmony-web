/* eslint import/no-mutable-exports:0 jsx-a11y/label-has-for:0 */
/* eslint no-class-assign :0 */
import React, { Component, PropTypes } from 'react';
import { reduxForm, Form } from 'redux-form';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import localStorage from 'localStorage';
// import _ from 'lodash';

const CoverageDetails = () => (
  <div className="CoverageDetails detail-group">
    <h4>Coverages</h4>
    <section className="summary-section">
      <dl>
        <dt>
          <span>A</span>Dwelling</dt>
        <dd>$100,000</dd>
      </dl>
      <dl>
        <dt>
          <span>B</span>
          Other Structures</dt>
        <dd>$100,000</dd>
      </dl>
      <dl>
        <dt>
          <span>C</span>Personal Property</dt>
        <dd>$50000</dd>
      </dl>
      <dl>
        <dt>Personal Property Replacement Cost</dt>
        <dd>Yes</dd>
      </dl>
      <dl>
        <dt>Loss Of Use</dt>
        <dd>$10,000</dd>
      </dl>
      <dl>
        <dt>Personal Liability</dt>
        <dd>$100,000</dd>
      </dl>
      <dl>
        <dt>Medical Payments</dt>
        <dd>$2,000</dd>
      </dl>
    </section>
  </div>
);
const RatingDetails = () => (
  <div className="RatingDetails detail-group">
    <h4>Rating</h4>
    <section className="summary-section">
      <dl>
        <dt>Mold Property</dt>
        <dd>$10,000</dd>
      </dl>
      <dl>
        <dt>Mold Liability</dt>
        <dd>$50,000</dd>
      </dl>
      <dl>
        <dt>Ordinance or Law</dt>
        <dd>$25,000</dd>
      </dl>
      <dl>
        <dt>Property Incidental Occupancies</dt>
        <dd>Yes</dd>
      </dl>
      <dl>
        <dt>Hurricane</dt>
        <dd>$2,000</dd>
      </dl>
      <dl>
        <dt>Sinkhole Coverage</dt>
        <dd>Yes</dd>
      </dl>
      <dl>
        <dt>Sinkhole Deductible</dt>
        <dd>Yes</dd>
      </dl>
      <dl>
        <dt>All Other Perils</dt>
        <dd>$500</dd>
      </dl>
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
                    <dd>TTIC-HO3-12345</dd>
                  </dl>
                  <dl>
                    <dt>Address</dt>
                    <dd>123 Main Street</dd>
                    <dd>Fort lauderdale, FL 12345</dd>
                  </dl>
                  <dl>
                    <dt>Year Built</dt>
                    <dd>2000</dd>
                  </dl>
                </aside>
                <div className="detail-wrapper">
                  <CoverageDetails />
                  <RatingDetails />
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
          questions {
            name
            question
            answerType
            description
            answers {
              answer
              image
            }
            conditional {
              display {
                type
                operator
                trigger
                dependency
                detail
              }
              value {
                type
                parent
              }
            }
          }
          completedSteps
        }
      }
    `, { name: 'completeStep' })(SharePage)));


export default SharePage;
