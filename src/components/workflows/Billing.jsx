/* eslint import/no-mutable-exports:0 jsx-a11y/label-has-for:0 */
/* eslint no-class-assign :0 */
import React, { Component, PropTypes } from 'react';
import { reduxForm, Form, change, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import _ from 'lodash';
import localStorage from 'localStorage';
// import _ from 'lodash';
import DependentQuestion from '../question/DependentQuestion';
import BoolInput from '../inputs/BoolInput';

// TODO: Put these questions into db, find where they are in the data passed in
const questionsMock = [
  {
    answerType: 'text',
    question: 'Address 1',
    styleName: 'address1',
    name: 'address1',
    defaultValueLocation: 'property.physicalAddress.address1',
    validations: ['required'],
  },
  {
    answerType: 'text',
    question: 'Address 2',
    styleName: 'address2',
    name: 'address2',
    defaultValueLocation: 'property.physicalAddress.address2',
  },
  {
    answerType: 'select',
    question: 'Country',
    validations: ['required'],
    name: 'country',
    value: 'USA',
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
    defaultValueLocation: 'property.physicalAddress.city',
  },
  {
    answerType: 'text',
    question: 'State',
    validations: ['required'],
    styleName: 'State',
    name: 'State',
    defaultValueLocation: 'property.physicalAddress.state',
  },
  {
    answerType: 'text',
    question: 'Zip',
    validations: ['required'],
    styleName: 'zip',
    name: 'zip',
    defaultValueLocation: 'property.physicalAddress.zip',
  }
];

class Billing extends Component {
  static propTypes = {
    completeStep: PropTypes.func,
    handleSubmit: PropTypes.func,
    styleName: PropTypes.string,
    dispatch: PropTypes.any, //eslint-disable-line
  }

  static contextTypes = {
    router: PropTypes.any
  }
  // TODO: push up data props into state
  state = {
    sameAsProperty: false,
    questions: questionsMock,
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
    // const questions = steps.questions;
    // const policyholderData = quoteTest;
    const questions = this.state.questions;

  //  console.log(state);

    questions.forEach((question) => {
      if (question.defaultValueLocation) {
        if (!this.state.sameAsProperty) {
          state[question.name] = _.get(policyholderData, question.defaultValueLocation);
          this.props.dispatch(change('Billing', question.name, _.get(policyholderData, question.defaultValueLocation)));
        } else {
          state[question.name] = '';
          this.props.dispatch(change('Billing', question.name, ''));
        }

      //  console.log(question.name, state[question.name],
      // _.get(policyholderData, question.defaultValueLocation));
      }
    });
    this.state.sameAsProperty = !this.state.sameAsProperty;
    this.setState(state);
  }

  handleOnSubmit = (event) => {
    if (event && event.preventDefault) event.preventDefault();
    this.props.completeStep({
      variables: {
        input: {
          workflowId: localStorage.getItem('newWorkflowId'),
          stepName: 'askAdditionalQuestions',
          data: this.state,
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

    let questions = [];
    let details = [];
    let annualPremium = 0;
    let semiAnnualPremium = 0;
    let quarterlyPremium = 0;

    let quote = null;
    if (this.props.data && this.props.data.steps) {
      console.log(this.props.data.steps.data);
      questions = _.sortBy(this.props.data.steps.questions, ['order']);
      details = this.props.data.steps.details;
      quote = this.props.data.steps.data[0];
    }

    annualPremium = _.find(details, { name: 'Annual Premium' }) ?
     _.find(details, { name: 'Annual Premium' }).value : 0;

    semiAnnualPremium = Math.ceil(annualPremium / 2);

    quarterlyPremium = Math.ceil(annualPremium / 4);


    return (
      <Form className={`fade-in ${styleName || ''}`} id="Billing" onSubmit={handleSubmit(this.handleOnSubmit)} noValidate>
        <div className="form-group survey-wrapper" role="group">
          <h3 className="section-group-header"><i className="fa fa-envelope-open" /> Mailing Address</h3>
          <BoolInput
            name={'sameAsProperty'}
            question={'Is the mailing address the same as the property address?'}
            handleChange={this.fillMailForm} value={this.state.sameAsProperty} isSwitch
          />
          {this.state.questions && this.state.questions.map((question, index) => (
            <DependentQuestion
              data={quote}
              question={question}
              answers={this.state}
              handleChange={this.handleChange}
              key={index}
            />
            ))}
          <h3 className="section-group-header"><i className="fa fa-dollar" /> Billing Information</h3>
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
                <label className="label-segmented"><input type="radio" value="A" name="billPlan" />
                  <span>Annual</span>
                </label>
              </div>
              <div className="radio-column-3">
                <label className="label-segmented"><input type="radio" value="S" name="billPlan" />
                  <span>Semi-Annual</span>
                </label>
              </div>
              <div className="radio-column-3">
                <label className="label-segmented"><input type="radio" value="Q" name="billPlan" />
                  <span>Quarterly </span>
                </label>
              </div>
            </div>
            <div className="installment-term">
              <dl className="column-3">
                <div>
                  <dt><span>Annual</span> Installment Plan</dt>
                  <dd>1st Installment: ${annualPremium}</dd>
                </div>
              </dl>
              <dl className="column-3">
                <div>
                  <dt><span>Semi-Annual</span> Installment Plan</dt>
                  <dd>1st Installment: ${semiAnnualPremium}</dd>
                  <dd>2nd Installment: ${semiAnnualPremium}</dd>
                </div>
              </dl>
              <dl className="column-3">
                <div>
                  <dt><span>Quarterly</span> Installment Plan</dt>
                  <dd>1st Installment: ${quarterlyPremium}</dd>
                  <dd>2nd Installment: ${quarterlyPremium}</dd>
                  <dd>3rd Installment: ${quarterlyPremium}</dd>
                  <dd>4th Installment: ${quarterlyPremium}</dd>
                </div>
              </dl>
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
                    city
                    state
                    zip
                  }
                }
              }
              ... on Property {
                physicalAddress {
                  address1
                  city
                  state
                  zip
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
