import React, { Component } from 'react';
import { connect } from 'react-redux';

import { clearPolicyResults } from '../../state/actions/serviceActions';
import { setPolicySearch } from '../../state/actions/searchActions';
import AppWrapper from '../../components/AppWrapper';
import PolicySearchBar from '../../components/Search/PolicySearchBar';
import SearchResults from '../../components/Search/SearchResults';
import Footer from '../../components/Footer';

export class PolicySearch extends Component {
  componentDidMount() {
    this.props.setPolicySearch({ searchType: 'policy', address: '' });
  }

  componentWillUnmount() {
    this.props.clearPolicyResults();
  }
  render() {
    const { agency, auth, match } = this.props;
    return (
      <AppWrapper
        auth={auth}
        match={match}
        render={() => (
          <div className="route search">
            <div className="flex grow">
              <div className="search route-content">
                <PolicySearchBar
                  answers={(agency && agency.cspAnswers) || {}}
                />
                <div className="survey-wrapper">
                  <div className="results-wrapper">
                    <SearchResults />
                  </div>
                  <Footer />
                </div>
              </div>
            </div>
          </div>
        )}
      />
    );
  }
}

export default connect(
  null,
  {
    clearPolicyResults,
    setPolicySearch
  }
)(PolicySearch);
