import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Footer from '../Common/Footer';

import * as appStateActions from '../../actions/appStateActions';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import NoResultsConnect from './NoResults';
import QuoteError from '../Common/QuoteError';
import { clearResults } from '../../actions/searchActions';
import { createQuote, getQuote, clearQuote } from '../../actions/quoteState.actions';
import { VALID_QUOTE_STATES } from './searchUtils';

const closeQuoteError = ({ actions }) => {
  actions.appStateActions.setAppState({ showQuoteErrors: false });
};

export class Search extends React.Component {
  componentWillMount() {
    const { actions, clearResults, clearQuote } = this.props;
    actions.appStateActions.setAppState({ submitting: false });
    clearResults();
    clearQuote();
  }

  handleSelectQuote = async (quoteData) => {
    const { actions, history } = this.props;
    actions.appStateActions.setAppState({ submitting: true });
    const quote = await this.props.getQuote(quoteData.quoteNumber, quoteData._id);
    actions.appStateActions.setAppState({ submitting: false });

    if (quote && VALID_QUOTE_STATES.includes(quote.quoteState)) {
      history.push(`/quote/${quote.quoteNumber}/customerInfo`);
    } else {
      actions.appStateActions.setAppState({ showQuoteErrors: true });
    }
  };

  handleSelectAddress = async (address) => {
    const { actions, history } = this.props;
    actions.appStateActions.setAppState({ submitting: true });
    const quote = await this.props.createQuote('0', address.id, address.physicalAddress.state);
    actions.appStateActions.setAppState({ submitting: false });

    if (quote) {
      history.push(`/quote/${quote.quoteNumber}/customerInfo`);
    }
  };

  render() {
    return (
      <div className="flex grow">
        <div className="search route-content">
          <SearchBar />
          <div className="survey-wrapper">
            <div className="results-wrapper">
              <NoResultsConnect />
              <SearchResults handleSelectAddress={this.handleSelectAddress} handleSelectQuote={this.handleSelectQuote} {...this.props} />
            </div>
            <Footer />
          </div>
        </div>
        {(this.props.appState.data && this.props.appState.data.showQuoteErrors) &&
          <QuoteError
            quote={this.props.quote || {}}
            closeButtonHandler={() => closeQuoteError(this.props)}
          />
        }
      </div>
    );
  }
}

Search.propTypes = {
  quote: PropTypes.shape({}),
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
  appState: state.appState,
  quote: state.quoteState.quote
});

const mapDispatchToProps = dispatch => ({
  createQuote: bindActionCreators(createQuote, dispatch),
  clearQuote: bindActionCreators(clearQuote, dispatch),
  getQuote: bindActionCreators(getQuote, dispatch),
  clearResults: bindActionCreators(clearResults, dispatch),
  actions: {

    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
