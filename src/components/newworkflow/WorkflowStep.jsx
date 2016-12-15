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
  state = {
    questions: {},
  }
  handleChange = (event) => {
    const { questions } = this.state;
    questions[event.target.name] = Number(event.target.value) ?
     Number(event.target.value) : event.target.value;
    this.setState({ questions });
  }
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.completeStep({ variables: { input: {
      workflowId: this.props.workflowId,
      stepName: this.props.data.steps.name,
      data: this.formatData(),
    } } })
      .then(() => {
        this.props.data.refetch();
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
    console.log(this);
    const { steps } = this.props.data;
    return (
      <div>
        <h2>Survey Component</h2>
        <hr />
        {
          steps ? steps.name : null
        }
        <hr />
        <Survey data={{ questions: steps ? steps.inputs : null }} />
        <br />
        <hr />
        {
          steps ? steps.name : null
        }
        <hr />
        <br />
        <h2>Hard Coded Form</h2>
        <form onSubmit={this.handleSubmit}>
          {
            steps ? steps.inputs.map((i, index) => (
              <div key={index}>
                <label htmlFor={i.question}>{i.question}</label>
                <input
                  id={i.question}
                  name={i.question}
                  value={this.state.questions[i.question] || ''}
                  onChange={this.handleChange}
                  type={i.answerType}
                />
              </div>
            )) : null
          }
          <button type="submit">Submit</button>
        </form>
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
    }
  }
`)(graphql(gql`
  mutation CompleteStep($input:CompleteStepInput) {
    completeStep(input:$input)
  }
`, { name: 'completeStep' })(WorkflowStep));
