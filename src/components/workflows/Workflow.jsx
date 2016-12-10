import React, { Component, PropTypes } from 'react';
import WorkflowHeader from './WorkflowHeader';
import './workflow.css';

class Workflow extends Component {
  static propTypes = {
    steps: PropTypes.arrayOf(PropTypes.shape({
      icon: PropTypes.string,
      complete: PropTypes.bool,
    })),
  }
  state = {
    activeStep: 0,
  }
  updateStep = (step) => {
    this.setState({ activeStep: step });
  }
  decreaseStep = () => {
    const activeStep = this.state.activeStep - 1;
    this.setState({ activeStep });
  }
  increaseStep = () => {
    const activeStep = this.state.activeStep + 1;
    this.setState({ activeStep });
  }
  render() {
    const { steps } = this.props;
    const { activeStep } = this.state;
    const ActiveStep = steps[activeStep].component;
    return (
      <div className="workflow">
        <WorkflowHeader
          steps={steps}
          activeStep={activeStep}
          updateStep={this.updateStep}
        />
        {ActiveStep}
        <div className="workflow-steps">
          <button onClick={this.decreaseStep}>prev</button>
          <button onClick={this.increaseStep}>next</button>
        </div>
      </div>
    );
  }
}

export default Workflow;
