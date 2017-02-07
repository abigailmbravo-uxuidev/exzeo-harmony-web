import React, {Component, PropTypes} from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Workflow from '../workflows/Workflow';
import steps from './quoteSteps';

class Quote extends Component {

  static propTypes = {
    startWorkflow: PropTypes.func
  }

  static contextTypes = {
    router: PropTypes.any
  }

  state = {
    workflow: {
      steps: []
    },
    completedSteps: [],
    activeStep: "billing",
  }

  componentWillMount(){
    //console.log(this.context)
    const self = this;
    this.props.startWorkflow({ variables: { input: { name: 'quoteNoSearch', product: '', state: '' } } })
      .then(({ data }) => {
        this.setState({ workflow: data.startWorkflow });
        this.context.router.push('/quote/demographics');
      })
      .catch(error => console.log(error));

    //console.log(this.props)
  }
  render() {

    const {match} = this.props;

    return (
      <div>
        <Workflow steps={steps}/>
      </div>
    );
  }
};

export default graphql(gql`
    mutation StartWorkflow($input:WorkflowInput) {
        startWorkflow(input:$input) {
            id
            steps {
                name
                label
                icon
                type
                activeStep
            }
        }
    }
`, { name: 'startWorkflow' })(Quote);
//export default Quote;
