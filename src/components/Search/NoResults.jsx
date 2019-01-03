import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


import * as appStateActions from '../../actions/appStateActions';

import { getSearchType } from './searchUtils';

export const NoResults = (props) => {
  if (props.hasSearched && props.results.length === 0) {
    return (
      <div className="survey-wrapper">
        <div className="card no-results">
          <div className="card-header"><h4>No Results Found</h4></div>
          <div className="card-block">
            {
              (props.searchType === 'quote' ?
                <p>There are no quotes found matching that search criteria. Please try to search again, or start a new quote.</p>
                :
                <p>We&#39;re sorry we couldn&#39;t find any results matching your search parameters. Please
                  check your spelling and try a new search. You can also try a
                  less specific search (such as street number and name).</p>
              )
            }
          </div>
        </div>
      </div>
    );
  }

  return <span />;
};

const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState,
  results: state.search.results,
  hasSearched: state.search.hasSearched,
  searchType: getSearchType()
});

const mapDispatchToProps = dispatch => ({
  actions: {

    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(NoResults);
