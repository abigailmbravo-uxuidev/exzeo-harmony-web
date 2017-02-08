import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const Results = ({ addresses, handleClick }) => (
  <ul className="results result-cards">
    {
      addresses ? addresses.map((address, index) => (
        <li id={address.id} key={index}>
          <a onClick={() => handleClick(address)}>
            <i className="card-icon fa fa-map-marker" />
            <section>
              <h4>{address.address1}</h4>
              <p>{address.city}, {address.state} {address.zip}</p>
            </section>
            <i className="fa fa-chevron-circle-right" />
          </a>
        </li>
      )) : null
    }
  </ul>
);

class SearchResults extends Component {
  state = {
    workflowId: '',
    loading: '',
    results: []
  }

  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      steps: PropTypes.object,
    }).isRequired,
  };

  static contextTypes = {
    router: PropTypes.object,
  }

  componentWillReceiveProps(newProps){
    if(newProps !== this.props){
      this.setState({loading: newProps.data.loading, results: newProps.data.steps.data});
    }
  }
  componentWillMount(){
    this.setState({workflowId: localStorage.getItem('newWorkflowId')});
  }

  makeAddressSelection = (address) => {
    this.props.completeStep({
      variables: {
        input: {
          workflowId: localStorage.getItem('newWorkflowId'),
          stepName: this.props.data.steps.name,
          data: [
            {
              key: 'stateCode',
              value: address.state,
            }, {
              key: 'igdId',
              value: address.id,
            },
          ],
        },
      },
    }).then((updatedStep) => {
      let workflow = updatedStep.data.completeStep;
      if(workflow && workflow.link)
        this.props.data.refetch().then((data) => {
          this.context.router.push(`/quote/${workflow.link}`);
        });
    }).catch(error => console.log(error));
  }


  render() {
    const {results} = this.state;

    return (
      <div className="workflow">
        <div className="fade-in">
          <div className="workflow-content">
            <section>
              <div className="fade-in">
                <div className="survey-wrapper">
                  <Results addresses={results} handleClick={this.makeAddressSelection} />
                </div>
              </div>

            </section>
          </div>
        </div>
      </div>
    )
  }
};


export default connect(null)(graphql(gql`
    query GetActiveStep($workflowId:ID!){
        steps(id: $workflowId) {
            name
            details {
                name
                value
            }
            showDetail
            data {
                ... on Address {
                    address1
                    city
                    state
                    zip
                    id
                }
            }
            type
            completedSteps
        }
    }`,
    { options: { variables: { workflowId: localStorage.getItem('newWorkflowId') } }},
    {name: 'activeStep'})
(graphql(gql `
    mutation CompleteStep($input:CompleteStepInput) {
        completeStep(input:$input) {
            name
            type
            link
        }
    }
`, { name: 'completeStep' })(SearchResults)));

