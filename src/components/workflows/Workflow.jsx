import React, { Component, PropTypes } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import WorkflowStep from './WorkflowStep';
import WorkflowHeader from '../workflows/WorkflowHeader';

class Workflow extends Component {
  static propTypes = {
    startWorkflow: PropTypes.func,
  }
  static contextTypes = {
    router: PropTypes.any,
  }
  state = {
    workflow: {},
    completedSteps: [],
  }
  componentWillMount = () => {
    if (!(this.props.location && this.props.location.query && this.props.location.query.address)) {
      this.context.router.transitionTo('/workflow');
    }
    this.props.startWorkflow({ variables: { input: { name: 'quote', product: '', state: '' } } })
      .then(({ data }) => {
        this.setState({ workflow: data.startWorkflow });
      })
      .catch(error => console.log(error));
  }
  updateCompletedSteps = (completedSteps) => {
    this.setState({ completedSteps });
  }
  render() {
    const { workflow } = this.state;
    return (
      <div className="workflow" role="article">
        <div className="fade-in">
          <div className="quote-details" role="contentinfo">
            <dl className="quoteID">
              <div>
                <dt>Quote Number</dt>
                <dd>TT-12345678-01</dd>
              </div>
            </dl>
            <dl className="address">
              <div>
                <dt>Address</dt>
                <dd>123 East Beachfront Avenue</dd>
                <dd>Osprey, FL 33333</dd>
              </div>
            </dl>
            <dl className="coverage">
              <div>
                <dt>Coverage</dt>
                <dd>A: $ --</dd>
                <dd>B: $ --</dd>
                <dd>C: $ --</dd>
              </div>
            </dl>
            <dl className="annualPremium">
              <div>
                <dt>Annual Premium</dt>
                <dd>$ --</dd>
              </div>
            </dl>
          </div>
          <WorkflowHeader
            steps={workflow.steps}
            completedSteps={this.state.completedSteps}
          />
          {
            workflow.id ? (
              <WorkflowStep
                workflowId={workflow.id}
                updateCompletedSteps={this.updateCompletedSteps}
                location={this.props.location}
              />
            ) : null
          }
        </div>
      </div>
    );
  }
}

export default graphql(gql`
  mutation StartWorkflow($input:WorkflowInput) {
    startWorkflow(input:$input) {
      id
      steps {
        name
        label
        icon
        type
      }
    }
  }
`, { name: 'startWorkflow' })(Workflow);
