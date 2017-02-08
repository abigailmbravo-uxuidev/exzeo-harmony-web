import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SearchBar from './SearchBar';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


class Search extends Component {
  static propTypes = {
    options: PropTypes.shape({
      placeholder: PropTypes.string,
    }),
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
          workflowId: localStorage.getItem('workflowId'),
          stepName: "askAddress",
          data: [
            {
              key: 'address',
              value: this.state.searchText,
            }
          ],
        },
      },
    }).then((updatedStep) => {
      //console.log(data)
      let workflow = updatedStep.data.completeStep;
      console.log(workflow)
      if(workflow && workflow.link)
        this.context.router.push(`${workflow.link}/${this.state.searchText}`);

      this.setState({ searchText: '' });
    }).catch(error => console.log(error));

  }

  clearSearch = () => {
    this.setState({ searchText: '' });
  }

  render() {
    const {options} = this.props;
    const { searchText } = this.state;
    let placeholder = options ? options.placeholder : "Search...";

    return (
      <div>
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

export default connect(mapStateToProps)(graphql(gql`
    query {
        steps(id: 260871) {
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
`, { name: 'completeStep' })(Search)));

