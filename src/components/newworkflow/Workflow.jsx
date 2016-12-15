import React, { Component, PropTypes } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import WorkflowStep from './WorkflowStep';
import WorkflowHeader from '../workflows/WorkflowHeader';

class Workflow extends Component {
  static propTypes = {
    startWorkflow: PropTypes.func,
  }
  state = {
    workflow: {},
    completedSteps: [],
  }
  componentWillMount = () => {
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
    // console.log('WORKFLOW: ', this);
    const { workflow } = this.state;
    return (
      <div className="workflow" role="article">
        <div className="fade-in">
          <WorkflowHeader
            steps={workflow.steps}
            completedSteps={this.state.completedSteps}
          />
          {
            workflow.id ? <WorkflowStep workflowId={workflow.id} updateCompletedSteps={this.updateCompletedSteps} /> : null
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
      }
    }
  }
`, { name: 'startWorkflow' })(Workflow);
