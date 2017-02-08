import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import ErrorPage from '../common/ErrorPage';
import * as searchActions from '../../actions/searchActions';
import Survey from '../common/question/Survey';
import WorkflowDetails from './WorkflowDetails';
import Footer from '../common/Footer';

class UWQuestions extends Component {
  static propTypes = {
    data: PropTypes.any,
  }
  static contextTypes = {
    router: PropTypes.any,
  }
  state = {
    questions: {},
    details: [],
  }
  componentWillMount() {
  }
  componentWillReceiveProps(newProps) {
    // if ((!this.props.data.steps && newProps.data.steps) ||
    //   (!newProps.data.loading &&
    //     this.props.data.steps &&
    //     // newProps.data.steps &&
    //     this.props.data.steps.name !== newProps.data.steps.name
    //   )) {
    //   const { questions } = this.state;
    //   const { steps } = newProps.data;
    //
    //   if (steps.questions) {
    //     steps.questions.forEach((question) => {
    //       let value = '';
    //       if ('defaultValue' in question) {
    //         value = question.defaultValue;
    //       } else if (question.answerType === 'bool') {
    //         value = false;
    //       } else if (question.answerType === 'range') {
    //         value = 0;
    //       }
    //       questions[question.name] = {
    //         value,
    //         hidden: false,
    //         disabled: false,
    //       };
    //     });
    //     steps.questions.forEach((question) => {
    //       if (question.conditional && question.conditional.display) {
    //         questions[question.name].hidden = false;
    //         questions[question.name].disabled = false;
    //         const { display } = question.conditional;
    //       // console.log('WORKFLOW STEP DATA: ', display);
    //         display.forEach((condition) => {
    //         // console.log(condition);
    //         switch (condition.operator) { // eslint-disable-line
    //           case 'equal':
    //             if (!questions[question.name][condition.type]) {
    //               questions[question.name][condition.type] =
    //                 !(questions[condition.dependency].value === condition.trigger);
    //             }
    //             break;
    //           case 'notEqualTo':
    //             if (!questions[question.name][condition.type]) {
    //               questions[question.name][condition.type] =
    //                 (questions[condition.dependency].value === condition.trigger);
    //             }
    //             break;
    //           case 'greaterThan':
    //             const { details } = this.state;
    //             // console.log('CURRENT DEBUG:: ', details);
    //             if (details && details.find(d => d.name === condition.detail)) {
    //               const expected = details.find(d => d.name === condition.detail).value;
    //               // console.log(expected, condition.trigger);
    //               questions[question.name][condition.type] =
    //                 expected > condition.trigger;
    //             } else if (!questions[question.name][condition.type]) {
    //               questions[question.name][condition.type] =
    //                 !(questions[condition.dependency].value > condition.trigger);
    //             }
    //             break;
    //           case 'lessThan':
    //             if (!questions[question.name][condition.type]) {
    //               questions[question.name][condition.type] =
    //                 !(questions[condition.dependency].value < condition.trigger);
    //             }
    //             break;
    //         }
    //         });
    //       }
    //     });
    //   }
    //   this.setState({ questions });
    // }
  }

  handleChange = (event) => {
    const { questions } = this.state;
    const { steps } = this.props.data;
    // console.log(event.target.name, event.target.value);
    // questions[event.target.name] = Number(event.target.value) ?
    //  Number(event.target.value) : event.target.value;
    //  console.log(questions, 'state');
    questions[event.target.name].value = event.target.value;
    steps.questions.forEach((question) => {
      if (question.conditional && question.conditional.display) {
        questions[question.name].hidden = false;
        questions[question.name].disabled = false;
        const { display } = question.conditional;
        console.log(display);
        display.forEach((condition) => {
          switch (condition.operator) { // eslint-disable-line
            case 'equal':
              if (!questions[question.name][condition.type]) {
                questions[question.name][condition.type] =
                  !(questions[condition.dependency].value === condition.trigger);
              }
              break;
            case 'greaterThan':
              const { details } = this.state;
              if (details && details.find(d => d.name === condition.detail)) {
                const expected = details.find(d => d.name === condition.detail).value;
                console.log(expected, condition.trigger);
                questions[question.name][condition.type] =
                  expected > condition.trigger;
              } else if (!questions[question.name][condition.type]) {
                questions[question.name][condition.type] =
                  !(questions[condition.dependency].value > condition.trigger);
              }
              break;
            case 'lessThan':
              if (!questions[question.name][condition.type]) {
                questions[question.name][condition.type] =
                  !(questions[condition.dependency].value < condition.trigger);
              }
              break;
          }
        });
      }
    });
    this.setState({ questions });
  }

  handleOnSubmit = (event) => {
    alert('complete');
    if (event && event.preventDefault) event.preventDefault();

    this.props.completeStep({
      variables: {
        input: {
          workflowId: localStorage.getItem('newWorkflowId'),
          stepName: 'askUWAnswers',
          data: this.formatData(event),
        },
      },
    }).then((updatedModel) => {
      console.log('updatedModel', updatedModel);
      const activeLink = updatedModel.data.completeStep.link;
      this.context.router.push(`${activeLink}`);
    }).catch((error) => {
      // this.context.router.transitionTo('/error');
      console.log('errors from graphql', error); // eslint-disable-line
    });
  }

  formatData = (demographicAnswers) => {
    const answers = [];
    Object.keys(demographicAnswers).forEach((key) => {
      answers.push({ key, value: demographicAnswers[key] });
    });
    //answers.push({ key: 'shouldCustomizeQuote', value: 'No' });
    return answers;
  }

  render() {
    const { steps } = this.props.data;
    console.log('CURRENT STEP: ', this.props);
    console.log('CURRENT STEP TYPE: ', steps ? steps.type : null);
    if (steps && steps.data) {
      return (<Survey
        handleChange={this.handleChange}
        handleOnSubmit={this.handleOnSubmit}
        questions={steps && steps.questions && steps.questions.length > 0
          ? steps.questions
          : null} answers={this.state.questions} styleName={steps && steps.name
          ? steps.name
          : ''}
      />
      );
    }
    return null;
  }
}

UWQuestions.propTypes = {
  effectiveDate: PropTypes.string,
  handleChange: PropTypes.func,
};

export default (connect(null))(graphql(gql `
    query GetActiveStep($workflowId:ID!) {
        steps(id: $workflowId) {
            name
            details {
                name
                value
            }
            questions {
                name
                validations
                question
                answerType
                description
                minValue
                maxValue
                valueDefault
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
            type
            completedSteps
        }
    }`, { options: { variables: { workflowId: localStorage.getItem('newWorkflowId') } }},
        {name: 'activeStep'})
    (graphql(gql `
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
    `, { name: 'completeStep' })(UWQuestions)));
