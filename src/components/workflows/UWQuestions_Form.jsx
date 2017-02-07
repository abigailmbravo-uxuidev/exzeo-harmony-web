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

  componentWillReceiveProps(newProps) {
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

  manualSubmit = (newProps, questions) => {
    const answers = [];
    Object.keys(questions).forEach((key) => {
      answers.push({ key, value: questions[key].value });
    });
    this.props.completeStep({
      variables: {
        input: {
          workflowId: 257738,
          stepName: 'askAdditionalCustomerData',
          data: this.formatData(event),
        },
      },
    }).then((updatedModel) => {
      console.log(updatedModel);
      const activeLink = updatedModel.data.completeStep.link;
      this.context.router.push(`${activeLink}`);
    }).catch((error) => {
      // this.context.router.transitionTo('/error');
      console.log('errors from graphql', error); // eslint-disable-line
    });
  }

  componentWillMount() {
    console.log(this.props.getActiveStep);
    // this.props.getActiveStep({
    //   variables: {
    //     workflowId: 257738,
    //   },
    // }).then((updatedModel) => {
    //   console.log('updatedModel', updatedModel); // eslint-disable-line
    // }).catch((error) => {
    //   // this.context.router.transitionTo('/error');
    //   console.log('errors from graphql', error); // eslint-disable-line
    // });
  }

  handleOnSubmit = (event) => {
    if (event && event.preventDefault) event.preventDefault();

    this.props.completeStep({
      variables: {
        input: {
          workflowId: 257738,
          stepName: 'askUWAnswers',
          data: this.formatData(event),
        },
      },
    }).then((updatedModel) => {
      console.log(updatedModel);
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
    return answers;
  }

  render() {
    const { steps } = this.props;
    // console.log('CURRENT STEP: ', this);
    // console.log('CURRENT STEP TYPE: ', steps ? steps.type : null);
    if (steps && steps.data) {
      return (
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
                ) :
                (steps.type === 'Error') ? <ErrorPage errorType={1} /> :
                <Survey
                  handleChange={this.handleChange}
                  handleOnSubmit={this.handleOnSubmit}
                  questions={steps && steps.questions && steps.questions.length > 0
                  ? steps.questions
                  : null} answers={this.state.questions} styleName={steps && steps.name
                  ? steps.namev
                  : ''}
                />
              }
          </section>
        </div>
      );
    }
    return null;
  }
}

UWQuestions.propTypes = {
  effectiveDate: PropTypes.string,
  handleChange: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  searchActions: bindActionCreators(searchActions, dispatch),
});

const workflowId = 257738;

export default graphql(gql `
  query {
    steps(id:257738) {
      name
      details {
        name
        value
      }
      showDetail
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
    }
  }
`, { name: 'getActiveStep' })(graphql(gql `
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
`, { name: 'completeStep' })(connect(null, mapDispatchToProps)(UWQuestions)));
