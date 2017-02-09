import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import SearchBar from './SearchBar';


class Search extends Component {
  static propTypes = {
    options: PropTypes.shape({
      placeholder: PropTypes.string,
    }),
    completeStep: PropTypes.Object,
    data: PropTypes.Object,
    searchConfig: PropTypes.Object,
  }
  static contextTypes = {
    router: PropTypes.object,
  }
  state = {
    searchText: '',
  }

  handleChange = (event) => {
    if (event && event.preventDefault) event.preventDefault();
    this.setState({ searchText: event.target.value });
  }

  handleSubmit = (event) => {
    if (event && event.preventDefault) event.preventDefault();

    this.props.completeStep({
      variables: {
        input: {
          workflowId: localStorage.getItem('newWorkflowId'),
          stepName: 'askAddress',
          data: [
            {
              key: 'address',
              value: this.state.searchText,
            },
          ],
        },
      },
    }).then((updatedStep) => {
      const workflow = updatedStep.data.completeStep;
      if (workflow && workflow.link) {
        this.props.data.refetch().then(() => {
          this.context.router.push(`${workflow.link}/${this.state.searchText}`);
          this.setState({ searchText: '' });
        });
      }
    }).catch(error => console.log(error));
  }

  clearSearch = () => {
    this.setState({ searchText: '' });
  }

  render() {
    const { options } = this.props;
    const { searchText } = this.state;
    let placeholder = options ? options.placeholder : 'Search...';

    return (
      <div className="search">
        <SearchBar
          placeholder={placeholder}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          searchText={this.state.searchText}
          focus={this.props.searchConfig ? this.props.searchConfig.focus : false}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  searchConfig: state.search.get('config'),
});

export default connect(mapStateToProps)(
  graphql(gql`query GetActiveStep($workflowId:ID!) {
        steps(id: $workflowId) {
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
    }`,
    {
      options: { variables: { workflowId: localStorage.getItem('newWorkflowId') } },
    },
    { name: 'activeStep' },
)
( graphql(gql `mutation CompleteStep($input:CompleteStepInput) {
        completeStep(input:$input) {
            name
            type
            link
        }
    }`, { name: 'completeStep' })(Search)));
