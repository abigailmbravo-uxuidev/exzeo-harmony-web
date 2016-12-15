import React, { Component, PropTypes } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import WorkflowStep from './WorkflowStep';

class Workflow extends Component {
  static propTypes = {
    startWorkflow: PropTypes.func,
  }
  state = {
    workflow: {},
  }
  componentWillMount = () => {
    this.props.startWorkflow({ variables: { input: { name: 'quote', product: '', state: '' } } })
      .then(({ data }) => {
        this.setState({ workflow: data.startWorkflow });
      })
      .catch(error => console.log(error));
  }
  render() {
    // console.log('WORKFLOW: ', this.state);
    const { workflow } = this.state;
    return (
      <div>
        {
          workflow.id ? <WorkflowStep workflowId={workflow.id} /> : null
        }
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
