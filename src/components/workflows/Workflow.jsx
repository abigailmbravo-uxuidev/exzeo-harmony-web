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
    this.context.router.transitionTo('/workflow');
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
            <dl>
              <div>
                <dt>Quote Number</dt>
                <dd>1234567890</dd>
              </div>
            </dl>
            <dl>
              <div>
                <dt>Address</dt>
                <dd>1234567890</dd>
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
