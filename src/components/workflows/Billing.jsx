/* eslint import/no-mutable-exports:0 jsx-a11y/label-has-for:0 */
/* eslint no-class-assign :0 */
import React, { Component, PropTypes } from 'react';
import { reduxForm, Form } from 'redux-form';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import _ from 'lodash';
import localStorage from 'localStorage';
// import _ from 'lodash';
import MailingAddress from '../forms/MailingAddress/MailingAddress';

// TODO: Put these questions into db, find where they are in the data passed in
const questionsMock = [
  {
    answerType: 'text',
    question: 'Address 1',
    styleName: 'address1',
    name: 'address1',
    defaultValueLocation: '',
  }, {
    answerType: 'text',
    question: 'Address 2',
    styleName: 'address2',
    name: 'address2',
    defaultValueLocation: '',
  },
  {
    answerType: 'select',
    question: 'Country',
    validations: ['required'],
    name: 'country',
    answers: [{
      answer: 'USA',
    }, {
      answer: 'CANADA',
    }]
  },
  {
    answerType: 'text',
    question: 'City',
    validations: ['required'],
    styleName: 'city',
    name: 'city',
    defaultValueLocation: '',
  },
  {
    answerType: 'text',
    question: 'State',
    validations: ['required'],
    styleName: 'state',
    name: 'state',
    defaultValueLocation: '',
  },
  {
    answerType: 'tel',
    question: 'Zip',
    validations: ['required'],
    styleName: 'zip',
    name: 'zip',
    defaultValueLocation: '',
  }
];

class Billing extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    styleName: PropTypes.string
  }

  static contextTypes = {
    router: PropTypes.any
  }
  // TODO: push up data props into state
  state = {

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
      // const { steps } = newProps.data;
      // this.setState({ questions: steps.questions });
    }
  }
  // TODO: Hook up to checkbox in mailform
  fillMailForm = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const { state } = this;
    const { steps } = this.props.data; // eslint-disable-line
    const policyholderData = steps.data[0];
    const questions = steps.questions;

    questions.forEach((question) => {
      if (question.defaultValueLocation) {
        state[question.name] = _.get(policyholderData, question.defaultValueLocation);
      }
    });
    this.setState(state);
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
      this.context.router.push('/workflow/verify');
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
      <Form
        className={`fade-in ${styleName || ''}`} id="Billing" onSubmit={handleSubmit(this.handleOnSubmit)}
        noValidate
      >
        <div>
          <h3>Mailing Address</h3>
          <MailingAddress {...this.props} name={'policyHolderMailingddress'} />

          <div className="form-group  BillTo">
            <label>Bill To</label>
            <select name="BillTo" value="">
              <option value="ph1">Policy Holder1</option>
              <option value="mh1">Bank of America</option>
              <option value="mh2">Capital One</option>
            </select>
          </div>
          <div className="form-group segmented BillType  " role="group">
            <label className="group-label label-segmented">Bill Plan</label>
            <div className="segmented-answer-wrapper">
              <div className="radio-column-3">
                <label className="label-segmented"><input type="radio" value="A" name="Annual" />
                  <span>Annual <br />
                  $2,500</span>
                </label>
              </div>
              <div className="radio-column-3">
                <label className="label-segmented"><input type="radio" value="S" name="semiannual" />
                  <span>Semi-Annual <br />
                  1st Installment: $1,250 <br />
                  2nd Installment: $1,250</span>
                </label>
              </div>
              <div className="radio-column-3">
                <label className="label-segmented"><input type="radio" value="Q" name="quaterly" />
                  <span>Quaterly <br />
                  1st Installment: $625 <br />
                  2nd Installment: $625 <br />
                  3rd Installment: $625 <br />
                  4th Installment: $625</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="workflow-steps">
          <button className="btn btn-primary" type="submit" form="Billing">next</button>
        </div>
      </Form>
    );
  }
}

Billing = reduxForm({
  form: 'Billing', // a unique identifier for this form
})(Billing);


Billing = connect()(graphql(gql `
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
            questions {
                readOnlyValue
                defaultValueLocation
                order
                hidden
                name
                validations
                question
                answerType
                description
                minValue
                maxValue
                defaultAnswer
                step
                answers {
                    label
                    default
                    answer
                    image
                }
                conditional {
                  slider {
                    minLocation
                    maxLocation
                  }
                  display {
                    type
                    operator
                    trigger
                    dependency
                    detail
                    parent
                  }
                  value {
                    type
                    parent
                    value
                  }
                  dependency {
                    type
                    parent
                  }
                }
            }
            completedSteps
            type
            completedSteps
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
    `, { name: 'completeStep' })(Billing)));


export default Billing;
