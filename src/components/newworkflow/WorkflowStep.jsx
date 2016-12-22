import React, { Component, PropTypes } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
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
    if (!this.props.data.steps || (!newProps.data.loading &&
      this.props.data.steps.name !== newProps.data.steps.name)) {
      const { questions } = this.state;
      const { steps } = newProps.data;
      steps.questions.forEach((question) => {
        let value = '';
        if ('defaultValue' in question) {
          value = question.defaultValue;
        } else if (question.answerType === 'bool') {
          value = false;
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
    // console.log('STEPS: ', this);
    const { steps } = this.props.data;
    return (
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
    );
  }
}

export default graphql(gql`
  query GetActiveStep($workflowId:ID!) {
    steps(id:$workflowId) {
      name
      questions {
        name
        question
        answerType
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
`, { name: 'completeStep' })(WorkflowStep));
