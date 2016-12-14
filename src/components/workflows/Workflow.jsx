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
  handleSubmit = (data) => {
    console.log(this.state.activeStep, ': step'); // eslint-disable-line
    console.log('back to parent', data); // eslint-disable-line
    this.increaseStep();
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
            <aside>
                <div className="sidePanel" role="contentinfo">
                    <section id="premium" className="premium">
                                <dl>
                                        <dt>Annual premium</dt>
                                        <dd>$1000.00</dd>
                                </dl>
                        </section>
                        <section id="quoteDetails" class="quoteDetails">
                                <dl>
                                        <dt>Quote number</dt>
                                        <dd>TT-HO3-1234567890</dd>
                                </dl>
                        </section>
                        <section id="propertyDetails" class="propertyDetails">
                                <dl>
                                        <dt>Address</dt>
                                        <dd>123 Main Street<small>Fort Lauderdale, FL, 12345</small></dd>

                                        <dt>Year built</dt>
                                        <dd>2000</dd>
                                </dl>
                        </section>
                        <section id="coverageDetails" class="coverageDetails">
                                <dl>
                                        <dt>Coverage A</dt>
                                        <dd>$10,000.00</dd>

                                        <dt>Coverage B</dt>
                                        <dd>$10,000.00</dd>

                                        <dt>Coverage C</dt>
                                        <dd>$10,000.00</dd>
                                </dl>
                        </section>
                </div>
            </aside>
            <section>{React.cloneElement(
              ActiveStep,
              { handleSubmit: this.handleSubmit },
            )}
            </section>
          </div>
          <div className="workflow-steps">
            <button className="btn btn-link" onClick={this.decreaseStep}>prev</button>
            {activeStep !== 0 ?
              <button className="btn btn-primary" type="submit" form="survey">next</button> :
              <button className="btn btn-primary" onClick={this.increaseStep}>next</button>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Workflow;
