import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const Results = ({ addresses, handleClick }) => (
  <ul className="results result-cards">
    {
      addresses ? addresses.map((address, index) => (
        <li id={address.id} key={index}>
          <a onClick={handleClick}>
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
    results: []
  }

  componentWillReceiveProps(newProps){
    //this.setState({results: newProps.activeStep});
  }
  componentWillMount(){
  }

  handleClick(event){

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
                  <Results addresses={results} handleClick={this.handleClick} />
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
    query {
        steps(id: 262478) {
            name
            details {
                name
                value
            }
            showDetail
            data {
                ... on Property {
                    physicalAddress {
                        address1
                    }
                }
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
    }`, {name: 'activeStep'})
(graphql(gql `
    mutation CompleteStep($input:CompleteStepInput) {
        completeStep(input:$input) {
            name
            type
            link
        }
    }
`, { name: 'completeStep' })(SearchResults)));

