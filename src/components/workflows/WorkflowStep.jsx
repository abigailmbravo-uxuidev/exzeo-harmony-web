import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import * as searchActions from '../../actions/searchActions';
import Survey from '../common/question/Survey';
import WorkflowDetails from './WorkflowDetails';
import Footer from '../common/Footer';

class WorkflowStep extends Component {
  static propTypes = {
    data: PropTypes.shape({
      steps: PropTypes.shape({
        name: PropTypes.string,
        inputs: PropTypes.array,
        questions: PropTypes.array,
      }),
      refetch: PropTypes.func,
    }),
    workflowId: PropTypes.string,
    completeStep: PropTypes.func,
    searchActions: PropTypes.shape({
      clearSearchConfig: PropTypes.func,
      setSearchConfig: PropTypes.func,
    }),
    updateCompletedSteps: PropTypes.func,
  }
  static contextTypes = {
    router: PropTypes.any,
  }
  state = {
    questions: {},
    details: [],
  }
  componentWillReceiveProps(newProps) {
    if (newProps && newProps.data && newProps.data.steps && newProps.data.steps.type === 'Search' && newProps.location.query && newProps.location.query[newProps.data.steps.questions[0].name]) {
      const questions = this.state.questions;
      Object.keys(questions).forEach((q) => {
        questions[q].value = newProps.location.query[q];
      });
      this.setState({ questions });
      this.handleSubmit();
    }
    if ((!this.props.data.steps && newProps.data.steps) ||
      (!newProps.data.loading &&
        this.props.data.steps &&
        // newProps.data.steps &&
        this.props.data.steps.name !== newProps.data.steps.name
      )) {
      const { questions } = this.state;
      const { steps } = newProps.data;
      this.props.searchActions.clearSearchConfig();
      // console.log(steps);
      if (steps.type === 'Search') {
        this.props.searchActions.setSearchConfig({
          type: 'append',
          value: newProps.data.steps.questions[0].name,
          placeholder: newProps.data.steps.questions[0].question,
          focus: true,
          showLinks: false,
        });
      }
      steps.questions.forEach((question) => {
        let value = '';
        if ('defaultValue' in question) {
          value = question.defaultValue;
        } else if (question.answerType === 'bool') {
          value = false;
        } else if (question.answerType === 'range') {
          value = 0;
        }
        questions[question.name] = {
          value,
          hidden: false,
          disabled: false,
        };
      });
      steps.questions.forEach((question) => {
        if (question.conditional && question.conditional.display) {
          questions[question.name].hidden = false;
          questions[question.name].disabled = false;
          const { display } = question.conditional;
          // console.log('WORKFLOW STEP DATA: ', display);
          display.forEach((condition) => {
            // console.log(condition);
            switch (condition.operator) { // eslint-disable-line
              case 'equal':
                if (!questions[question.name][condition.type]) {
                  questions[question.name][condition.type] =
                    !(questions[condition.dependency].value === condition.trigger);
                }
                break;
              case 'notEqualTo':
                if (!questions[question.name][condition.type]) {
                  questions[question.name][condition.type] =
                    (questions[condition.dependency].value === condition.trigger);
                }
                break;
              case 'greaterThan':
                const { details } = this.state;
                console.log('CURRENT DEBUG:: ', details);
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
              console.log('CURRENT DEBUG:: ', details);
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
  handleSubmit = (event) => {
    if (event && event.preventDefault) event.preventDefault();
    console.log('COMPLETE TASK'); // eslint-disable-line
    this.props.completeStep({
      variables: {
        input: {
          workflowId: this.props.workflowId,
          stepName: this.props.data.steps.name,
          data: this.formatData(),
        },
      },
    }).then((updatedModel) => {
      // this.context.router.transitionTo(`/workflow/${updatedModel.data.completeStep.name}`);
      // this.props.updateCompletedSteps(updatedModel.data.completeStep.completedSteps);
      if (updatedModel.data.completeStep && updatedModel.data.completeStep.details) {
        this.setState({ details: updatedModel.data.completeStep.details });
      }
      console.log('DATA IN THE D: ', updatedModel);
      this.props.data.refetch().then(({ data }) => {
        console.log('ggggggg', data);
        this.context.router.transitionTo(`/workflow/${data.steps.name}`);
        this.props.updateCompletedSteps(data.steps.completedSteps);
      });
    }).catch((error) => {
      // Error catching for mutations can be found here
      // Not sure about queries
      this.context.router.transitionTo('/error');
      console.log('errors from graphql', error);
    });
  }
  formatData = () => {
    const answers = [];
    Object.keys(this.state.questions).forEach((key) => {
      answers.push({ key, value: this.state.questions[key].value });
    });
    return answers;
  }
  makeAddressSelection = (address) => {
    this.props.completeStep({
      variables: {
        input: {
          workflowId: this.props.workflowId,
          stepName: this.props.data.steps.name,
          data: [
            {
              key: 'stateCode',
              value: address.state,
            }, {
              key: 'igdId',
              value: address.id,
            },
          ],
        },
      },
    }).then(() => {
      this.props.data.refetch().then(({ data }) => {
        // console.log('ggggggg', data)
        this.context.router.transitionTo(`/workflow/${data.steps.name}`);
        this.props.updateCompletedSteps(data.steps.completedSteps);
      });
    }).catch(error => console.log(error));
  }
  render() {
    const { steps } = this.props.data;
    console.log('CURRENT STEP: ', this);
    if (steps && steps.data) {
      return (steps && steps.type !== 'Search')
        ? (
          <div className="workflow-content">
            {(steps.details && steps.showDetail) ? (
              <WorkflowDetails details={steps.details} />
            ) : null}
            <section>
              {steps.type === 'Selection'
                ? (
                  <div className="fade-in">
                    <div className="survey-wrapper">
                      <ul className="results result-cards">
                        {steps.data
                          ? steps.data.map((address, i) => (
                            <li
                              key={i}
                              onClick={() => {
                                this.makeAddressSelection(address);
                              }}
                            >
                              <a>
                                <i className="card-icon fa fa-map-marker" />
                                <section>
                                  <h4>{address.address1}</h4>
                                  <p>{address.city}, {address.state}
                                    {address.zip}</p>
                                </section>
                                <i className="fa fa-angle-right" />
                              </a>
                            </li>
                          ))
                          : null
}
                      </ul>
                    </div>
                    <Footer />
                  </div>
                )
                : (
                (steps && steps.name === 'customizeDefaultQuote') ? (
                  <div />
                  ) : (
                    <Survey
                      handleChange={this.handleChange}
                      handleSubmit={this.handleSubmit}
                      questions={steps && steps.questions && steps.questions.length > 0
                        ? steps.questions
                        : null} answers={this.state.questions} styleName={steps && steps.name
                        ? steps.namev
                        : ''}
                    />
                  )
                )
}

            </section>
          </div>
        )
        : (
          <div className="workflow-content">
            <section>
              <div className="fade-in">
                <div className="survey-wrapper">
                  <h4 className="step-title">Homeowner's insurance quote</h4>
                  <h3 className="step-sub-title">
                    {/* <i className="fa fa-search"/> Search for a {steps ? steps.name : null} */}
                    <i className="fa fa-search" /> Search for a property address.
                  </h3>
                  <p>To start a homeowner's insurance quote, enter the street address of the property to be insured in the search bar above.
                  You only need to enter the <strong>street number and name</strong> to return a list of possible matches.</p>
                </div>
              </div>
            </section>
          </div>
        );
    }
    return null;
  }
}

const mapDispatchToProps = dispatch => ({
  searchActions: bindActionCreators(searchActions, dispatch),
});

export default graphql(gql `
  query GetActiveStep($workflowId:ID!) {
    steps(id:$workflowId) {
      name
      details {
        name
        value
      }
      showDetail
      data {
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
        required
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
    }
  }
`)(graphql(gql `
  mutation CompleteStep($input:CompleteStepInput) {
    completeStep(input:$input) {
      name
      details {
        name
        value
      }
      data {
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
`, { name: 'completeStep' })(connect(null, mapDispatchToProps)(WorkflowStep)));
