import React, { Component, PropTypes } from 'react';
import WorkflowHeader from './WorkflowHeader';

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
    const { steps } = this.props;
    if (step >= 0 && step < steps.length) {
      this.setState({ activeStep: step });
    }
  }
  decreaseStep = () => {
    const { steps } = this.props;
    const activeStep = this.state.activeStep - 1;
    if (activeStep >= 0 && activeStep < steps.length) {
      this.setState({ activeStep });
    }
  }
  increaseStep = () => {
    const { steps } = this.props;
    const activeStep = this.state.activeStep + 1;
    if (activeStep >= 0 && activeStep < steps.length) {
      this.setState({ activeStep });
    }
  }
  render() {
    const { steps } = this.props;
    const { activeStep } = this.state;
    const ActiveStep = steps[activeStep].component;
    return (

        <div className="workflow" role="article">
                <div className="fade-in">
                        <WorkflowHeader
                        steps={steps}
                        activeStep={activeStep}
                        updateStep={this.updateStep}
                        />
                <div className="workflow-content">
                        <aside></aside>
                        <section>{ActiveStep}</section>
                </div>
                <div className="workflow-steps">
                        <button className="btn btn-link" onClick={this.decreaseStep}>prev</button>
                        <button className="btn btn-primary" onClick={this.increaseStep}>next</button>
                </div>
                </div>
        </div>
    );
  }
}

export default Workflow;
