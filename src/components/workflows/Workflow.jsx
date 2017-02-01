import React, { Component, PropTypes } from 'react';
//import WorkflowStep from './WorkflowStep';
import WorkflowHeader from '../workflows/WorkflowHeader';

class Workflow extends Component {

  static propTypes = {
    startWorkflow: PropTypes.func,
  }

  static contextTypes = {
    router: PropTypes.any,
  }

  state = {
    workflow: {
      steps: []
    },
    completedSteps: [],
  }
  componentWillMount = () => {
    let steps = [
      {
        name: "askAdditionalCustomerData",
        label: "Demographics",
        link: "demographics",
        order: 1
      },
      {
        name: "askUWAnswers",
        label: "UnderWriting Q&A",
        order: 2,
        link: "underwriting",
      },
      {
        name: "customizeDefaultQuote",
        label: "Customize Quote",
        order: 3,
        link: "customize"
      },
      {
        name: "shareIt",
        label: "Share Quote",
        order: 4,
        link: "share"
      },
      {
        name: "billingInfo",
        label: "Billing Info",
        order: 5,
        link: "billing"
      },
      {
        name: "verifyWrite",
        label: "Verify & Write policy",
        order: 6,
        link: "verify"
      }];
    this.setState({workflow: {steps}});
  }
  updateCompletedSteps = (completedSteps) => {
    this.setState({ completedSteps });
  }
  render() {
    const { workflow } = this.state;
    console.log(workflow)
    return (
      <div className="workflow" role="article">
        <div className="fade-in">
          <WorkflowHeader steps={workflow.steps} completedSteps={this.state.completedSteps} />
        </div>
      </div>
    );
  }
}

export default Workflow;
