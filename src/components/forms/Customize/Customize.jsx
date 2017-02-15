import React, { Component, PropTypes } from 'react';
import { reduxForm, Form } from 'redux-form';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import localStorage from 'localStorage';
import _ from 'lodash';
// import { quoteInfo, customizeQuestions } from './customizeMocks';
import Details from './Details';
import Footer from '../../common/Footer';
import DependentQuestion from '../../question/DependentQuestion';

class Customize extends Component {
  static propTypes = {
    data: PropTypes.any, // eslint-disable-line
    completeStep: PropTypes.func,
    handleSubmit: PropTypes.func,
    styleName: PropTypes.string
  }

  static contextTypes = {
    router: PropTypes.any
  }
  // TODO: push up data props into state
  state = {
    updated: false
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
      const questions = steps.questions;
      const realQuote = steps.data[0];

      questions.forEach((question) => {
        if (question.readOnlyValue) {
          state[question.name] = question.readOnlyValue;
        } else if (question.defaultValueLocation) {
          const val = _.get(realQuote, question.defaultValueLocation);
          state[question.name] = String(val) ?
            String(val) : val;
        } else {
          state[question.name] = '';
        }
      });

      state.quoteInfo = realQuote;

      // Go through and check if percent or currency is provided as initial
      questions.forEach((question) => {
        if (question.conditional && question.conditional.dependency &&
          question.answers && question.answers.length > 0) {
          const exists = question.answers.find(a => a.answer == state[question.name]); // eslint-disable-line
          if (!exists) {
            const { dependency } = question.conditional;
            const parentValue = _.get(state, dependency.parent);

            const stateValue = Number(state[question.name]) ?
               Number(state[question.name]) : state[question.name];
            // const calculatedValue = parentValue / 100;
            const newValue = question.answers.find(a =>
              (dependency.type === 'percent' ? (parentValue * a.answer) / 100 : parentValue * a.answer) === stateValue);
            if (newValue) {
              state[question.name] = newValue.answer;
            }
          }
        }
      });


      console.log('state', state); // eslint-disable-line
      this.setState(state);
    }
  }

  handleChange = (event) => {
    const { state } = this;
    state[event.target.name] = event.target.value;
    state.updated = true;
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
      this.context.router.push('/workflow/share');
    }
  }

  formatData = (data) => {
    const answers = [];
    Object.keys(data).forEach((key) => {
      answers.push({ key, value: data[key] });
    });
    return answers;
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

  update = async () => {
    // const { completeStep } = this.props;
    try {
      // let data = await completeStep(this.buildSubmission('askToCustomizeDefaultQuote', [
      //   {
      //     key: 'shouldCustomizeQuote',
      //     value: 'Yes',
      //   },
      // ]));
      // await completeStep(
      //  this.buildSubmission('customizeDefaultQuote', this.formatData(this.state))
      // );
      const { state } = this;
      state.updated = false;
      this.setState(state);
    } catch (error) {
      console.log('Error: ', error); // eslint-disable-line
      this.context.router.push('error');
    }
  }

  save = async () => {
    const { completeStep } = this.props;
    try {
      let data = await completeStep(this.buildSubmission('askToCustomizeDefaultQuote', [
        {
          key: 'shouldCustomizeQuote',
          value: 'No'
        },
      ]));
      console.log('ask to customize no', data); // eslint-disable-line

      data = await completeStep(this.buildSubmission('showCustomizedQuoteAndContinue', []));
      console.log('show customize', data); // eslint-disable-line

      data = await completeStep(this.buildSubmission('saveAndSendEmail', [
        {
          key: 'shouldGeneratePdfAndEmail',
          value: 'No'
        },
      ]));
      console.log('save and send email', data); // eslint-disable-line

      data = await completeStep(this.buildSubmission('askAdditionalQuestions', []));
      console.log('ask additional questions', data); // eslint-disable-line

      data = await completeStep(this.buildSubmission('askScheduleInspectionDates', []));
      console.log('ask to inspection', data); // eslint-disable-line

      this.context.router.push('thankyou');
    } catch (error) {
      console.log('Error: ', error); // eslint-disable-line
      this.context.router.push('error');
    }
  }

  submit = (event) => {
    if (event && event.preventDefault) event.preventDefault();
    this.state.updated ? this.update() : this.save();
  }

  render() {
    const {
      styleName,
      handleSubmit
    } = this.props;
    let questions = [];
    let details = [];

    if (this.props.data && this.props.data.steps) {
      console.log(this.props.data.steps.data);
      questions = _.sortBy(this.props.data.steps.questions, ['order']);
      details = this.props.data.steps.details;
    }
    return (
      <div className="workflow-content">
        <aside><Details details={details} /></aside>
        <section className="">
          <div className="fade-in">
            <Form
              className={`fade-in ${styleName || ''}`}
              id="Customize"
              onSubmit={handleSubmit(this.submit)}
              noValidate
            >
              <div className="form-group survey-wrapper" role="group">
                {questions && questions.map((question, index) => (
                  <DependentQuestion
                    data={this.state.quoteInfo}
                    question={question}
                    answers={this.state}
                    handleChange={this.handleChange}
                    key={index}
                  />
                ))}

              </div>
              <div className="workflow-steps">
                <button
                  className="btn btn-primary"
                  type="submit"
                  form="Customize"
                >
                  {this.state.updated ? 'update' : 'save'}
                </button>
              </div>
              <Footer />
            </Form>
          </div>
        </section>
      </div>
    );
  }
}

const CustomizeQuote = reduxForm({
  form: 'Customize',
})(Customize);

// const selector = formValueSelector('Customize'); // <-- same as form name

export default (graphql(gql `
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
    `, { name: 'completeStep' })(CustomizeQuote)));
