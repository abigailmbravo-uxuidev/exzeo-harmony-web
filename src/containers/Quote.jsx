import React, { Component, PropTypes } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import localStorage from 'localStorage';
import Workflow from '../components/workflows/Workflow';

class Quote extends Component {

  static propTypes = {
    startWorkflow: PropTypes.func,
    match: PropTypes.any,// eslint-disable-line
  }

  static contextTypes = {
    router: PropTypes.any,
  }

  state = {
    workflow: {
      id: '',
      steps: [],
      activeStep: '',
      completedSteps: [],
    },
  }

  componentWillMount() {
    const { match } = this.props;
    if (!match.params.activeStep) {
      this.props.startWorkflow({ variables: { input: { name: 'quote', product: '', state: '' } } })
        .then(({ data }) => {
          console.log('workflow started:', data);
          const workflow = data.startWorkflow;
          localStorage.setItem('newWorkflowId', workflow.id);
          const activeLink = workflow.steps.find(s => s.name === workflow.activeStep).link;
          window.location.href = `/quote/${activeLink}`;
        })
        .catch(error => console.log(error));
    }


    // console.log(this.props)
  }
  render() {
    // const { match } = this.props;

    return (
      <div>
        <Workflow />
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
                link
                icon
                type
            },
            activeStep
        }
    }
`, { name: 'startWorkflow' })(Quote);
