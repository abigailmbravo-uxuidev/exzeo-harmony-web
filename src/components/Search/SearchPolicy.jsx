import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { propTypes } from 'redux-form';
import Footer from '../Common/Footer';

import * as appStateActions from '../../actions/appStateActions';
import PolicySearchBar from './PolicySearchBar';
import SearchResults from './SearchResults';

export const SearchPolicy = props => (
  <div className="flex grow">
    <div className="search route-content">
      <PolicySearchBar />
      <div className="survey-wrapper">
        <div className="results-wrapper">
          <SearchResults />
        </div>
        <Footer />
      </div>
    </div>
  </div>
);

SearchPolicy.propTypes = {
  ...propTypes,
  appState: PropTypes.shape({
    instanceId: PropTypes.string,
    modelName: PropTypes.string,
    data: PropTypes.shape({
      selectedQuote: PropTypes.object,
      showQuoteErrors: PropTypes.bool
    })
  })
};

const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState
});

const mapDispatchToProps = dispatch => ({
  actions: {
    
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPolicy);
