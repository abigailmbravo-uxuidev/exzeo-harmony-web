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
  handleChange = (event) => {
    const { questions } = this.state;
    console.log(event.target.name, event.target.value);
    questions[event.target.name] = Number(event.target.value) ?
     Number(event.target.value) : event.target.value;
     console.log(questions, 'state');
    this.setState({ questions });
  }
  handleSubmit = (event) => {
    if (event && event.preventDefault) event.preventDefault();
    console.log('COMPLETE TASK');
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
        value: this.state.questions[key],
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
      }
      completedSteps
    }
  }
`)(graphql(gql`
  mutation CompleteStep($input:CompleteStepInput) {
    completeStep(input:$input)
  }
`, { name: 'completeStep' })(WorkflowStep));
