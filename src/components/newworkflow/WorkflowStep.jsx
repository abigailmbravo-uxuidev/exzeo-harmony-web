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
    // console.log(event.target.name, event.target.value);
    questions[event.target.name] = Number(event.target.value) ?
     Number(event.target.value) : event.target.value;
    this.setState({ questions });
  }
  handleSubmit = (event) => {
    if (event && event.preventDefault) event.preventDefault();
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
        <section>
          <Survey
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            questions={steps ? steps.inputs : null}
            answers={this.state.questions}
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
      inputs {
        question
        answerType
      }
      completedSteps
    }
  }
`)(graphql(gql`
  mutation CompleteStep($input:CompleteStepInput) {
    completeStep(input:$input)
  }
`, { name: 'completeStep' })(WorkflowStep));
