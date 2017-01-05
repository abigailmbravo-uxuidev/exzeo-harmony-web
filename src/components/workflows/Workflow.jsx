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
    this.props.startWorkflow({ variables: { input: { name: 'quoteSandbox', product: '', state: '' } } })
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
