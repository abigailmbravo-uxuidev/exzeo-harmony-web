import React, { Component, PropTypes } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import WorkflowHeader from './WorkflowHeader';

const mutation = gql`
mutation startWorkFlow($input:WorkflowInput) {
  startWorkflow(input: $input) {
    id
    steps {
      name
    }
  }
}
`;

class Workflow extends Component {
  static propTypes = {
    steps: PropTypes.object,
  }
  state = {
    workflowSteps: [],
    activeStep: 0,
  }
  componentWillMount = () => {
    this.props.mutate({ variables: { input: { name: 'quote', product: 'ho3', state: 'florida' } } })
      .then(({ data }) => {
        console.log(data.startWorkflow);
        const steps = this.props.steps;
        const workflowSteps = [];
        data.startWorkflow.steps.forEach((step) => {
          if (steps && steps[step.name]) {
            workflowSteps.push(steps[step.name]);
          }
        });
        this.setState({ workflowSteps });
      })
      .catch(x => console.log('err: ', x))
  }
  updateStep = (step) => {
    const { workflowSteps } = this.state;
    if (step >= 0 && step < workflowSteps.length) {
      this.setState({ activeStep: step });
    }
  }
  decreaseStep = () => {
    const { workflowSteps } = this.state;
    const activeStep = this.state.activeStep - 1;
    if (activeStep >= 0 && activeStep < workflowSteps.length) {
      this.setState({ activeStep });
    }
  }
  increaseStep = () => {
    const { workflowSteps } = this.state;
    const activeStep = this.state.activeStep + 1;
    if (activeStep >= 0 && activeStep < workflowSteps.length) {
      this.setState({ activeStep });
    }
  }
  render() {
    console.log('WORKFLOW: ', this.state);
    const { activeStep, workflowSteps } = this.state;
    const ActiveStep = workflowSteps && workflowSteps[activeStep] ?
      workflowSteps[activeStep].component : null;
    return (
      <div className="workflow" role="article">
        <div className="fade-in">
          <WorkflowHeader
            steps={workflowSteps}
            activeStep={activeStep}
            updateStep={this.updateStep}
          />
          {ActiveStep}
          <div className="workflow-steps">
            <button className="btn btn-link" onClick={this.decreaseStep}>prev</button>
            <button className="btn btn-primary" onClick={this.increaseStep}>next</button>
          </div>
        </div>
      </div>
    );
  }
}

export default graphql(mutation)(Workflow);
