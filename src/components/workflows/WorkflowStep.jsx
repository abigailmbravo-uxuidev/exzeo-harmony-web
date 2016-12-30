import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import * as searchActions from '../../actions/searchActions';
import Survey from '../common/question/Survey';

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
  }
  static contextTypes = {
    router: PropTypes.any,
  }
  state = {
    questions: {},
  }
  componentWillReceiveProps(newProps) {
    if (newProps
      && newProps.data
      && newProps.data.steps
      && newProps.data.steps.type === 'Search'
      && newProps.location.query
      && newProps.location.query[newProps.data.steps.questions[0].name]) {
        const questions = this.state.questions;
        Object.keys(questions).forEach((q) => {
          questions[q].value = newProps.location.query[q];
        });
        this.setState({ questions });
        console.log(this.state);
        this.handleSubmit();
    }
    if (!this.props.data.steps || (!newProps.data.loading &&
      this.props.data.steps.name !== newProps.data.steps.name)) {
      const { questions } = this.state;
      const { steps } = newProps.data;
      this.props.searchActions.clearSearchConfig();
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
          display.forEach((condition) => {
            switch (condition.operator) { // eslint-disable-line
              case 'equal':
                if (!questions[question.name][condition.type]) {
                  questions[question.name][condition.type] =
                    !(questions[condition.dependency].value === condition.trigger);
                }
                break;
              case 'greaterThan':
                if (!questions[question.name][condition.type]) {
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
        display.forEach((condition) => {
          switch (condition.operator) { // eslint-disable-line
            case 'equal':
              if (!questions[question.name][condition.type]) {
                questions[question.name][condition.type] =
                  !(questions[condition.dependency].value === condition.trigger);
              }
              break;
            case 'greaterThan':
              if (!questions[question.name][condition.type]) {
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
    this.props.completeStep({ variables: { input: {
      workflowId: this.props.workflowId,
      stepName: this.props.data.steps.name,
      data: this.formatData(),
    } } })
      .then(() => {
        this.props.data.refetch()
          .then(({ data }) => {
            // console.log('ggggggg', data)
            this.context.router.transitionTo(`/workflow/${data.steps.name}`);
            this.props.updateCompletedSteps(data.steps.completedSteps);
          });
      })
      .catch(error => console.log(error));
  }
  formatData = () => {
    const answers = [];
    Object.keys(this.state.questions).forEach((key) => {
      answers.push({
        key,
        value: this.state.questions[key].value,
      });
    });
    return answers;
  }
  render() {
    const { steps } = this.props.data;
    if (steps && steps.data && steps.data.length > 0) console.log(steps.data);
    return (steps && steps.type !== 'Search') ? (
      <div className="workflow-content">
        <aside>
          <div className="side-panel" role="contentinfo">
            <section id="premium" className="premium">
              <dl>
                <div>
                  <dt>Annual premium</dt>
                  <dd>$1000.00</dd>
                </div>
              </dl>
            </section>
            <section id="quoteDetails" className="quoteDetails">
              <dl>
                <div>
                  <dt>Quote number</dt>
                  <dd>TTIC-HO3-1234567890</dd>
                </div>
              </dl>
            </section>
            <section id="propertyDetails" className="propertyDetails">
              <dl>
                <div>
                  <dt>Address</dt>
                  <dd>123 Main Street<small>Fort Lauderdale, FL, 12345</small></dd>
                </div>
                <div className="hide-for-phone-only">
                  <dt>Year built</dt>
                  <dd>2000</dd>
                </div>
              </dl>
            </section>
          </div>
        </aside>
        <section>
          <Survey
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            questions={steps && steps.questions && steps.questions.length > 0 ?
              steps.questions : null}
            answers={this.state.questions}
            styleName={steps && steps.name ? steps.name : ''}
          />
        </section>
      </div>
    ) : <div className="workflow-content">
        <section><div className="fade-in"><div className="survey-wrapper">
                <h3 className="step-title">Start a homeowner's insurance quote</h3>
                <h4 className="step-sub-title"><i className="fa fa-search"></i> Search for a {steps ? steps.name : null}</h4>
                <p>To start a homeowner's insurance quote, enter the street address of the property to be insured in the search bar above. You only need to enter the street number and name to return a list of possible matches.</p>
        </div></div></section></div>;
  }
}

const mapDispatchToProps = dispatch => ({
  searchActions: bindActionCreators(searchActions, dispatch),
});

export default graphql(gql`
  query GetActiveStep($workflowId:ID!) {
    steps(id:$workflowId) {
      name
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
        }
        conditional {
          display {
            type
            operator
            trigger
            dependency
          }
        }
      }
      completedSteps
    }
  }
`)(graphql(gql`
  mutation CompleteStep($input:CompleteStepInput) {
    completeStep(input:$input)
  }
`, { name: 'completeStep' })(connect(null, mapDispatchToProps)(WorkflowStep)));
