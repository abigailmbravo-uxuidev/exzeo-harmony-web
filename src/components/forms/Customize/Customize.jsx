import React, { Component, PropTypes } from 'react';
import { reduxForm, Form } from 'redux-form';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import localStorage from 'localStorage';
import _ from 'lodash';
import { quoteInfo, customizeQuestions } from './customizeMocks';
import Details from './Details';
import Footer from '../../common/Footer';
import DependentQuestion from '../../common/question/DependentQuestion';

class Customize extends Component {
  static propTypes = {
    completeStep: PropTypes.func,
    handleSubmit: PropTypes.func,
    styleName: PropTypes.string
  }

  static contextTypes = {
    router: PropTypes.any
  }

  state = {
    updated: false
  }

  componentWillMount() {
    const { state } = this;

    // Set up default values
    customizeQuestions.forEach((question) => {
      if (_.has(question, 'defaultValue')) {
        state[question.name] = question.defaultValue;
      } else if (question.defaultValueLocation) {
        state[question.name] = _.get(quoteInfo, question.defaultValueLocation);
      } else {
        state[question.name] = '';
      }
    });
    this.setState(state);
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

    const details = JSON.parse(localStorage.getItem('details'));

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
                {customizeQuestions && customizeQuestions.map((question, index) => (
                  <DependentQuestion
                    data={quoteInfo}
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
                hidden
                name
                validations
                question
                answerType
                description
                minValue
                maxValue
                defaultAnswer
                answers {
                    default
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
            }
          }
          completedSteps
        }
      }
    `, { name: 'completeStep' })(CustomizeQuote)));
