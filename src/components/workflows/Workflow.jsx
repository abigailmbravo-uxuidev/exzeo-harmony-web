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
  handleSubmit = (data) => {
    console.log(this.state.activeStep, ': step'); // eslint-disable-line
    console.log('back to parent', data); // eslint-disable-line
    this.increaseStep();
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
          <div className="workflow-content">
            <aside>
              <div className="sidePanel" role="contentinfo">
                <section id="premium" className="premium">
                  <dl>
                    <dt>Annual premium</dt>
                    <dd>$1000.00</dd>
                  </dl>
                </section>
                <section id="quoteDetails" className="quoteDetails">
                  <dl>
                    <dt>Quote number</dt>
                    <dd>TT-HO3-1234567890</dd>
                  </dl>
                </section>
                <section id="propertyDetails" className="propertyDetails">
                  <dl>
                    <dt>Address</dt>
                    <dd>123 Main Street<small>Fort Lauderdale, FL, 12345</small></dd>

                    <dt>Year built</dt>
                    <dd>2000</dd>
                  </dl>
                </section>
                <section id="coverageDetails" className="coverageDetails">
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

export default graphql(mutation)(Workflow);
