import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  createQuote,
  reviewQuote,
  clearQuote
} from '../../state/actions/quoteState.actions';
import { clearResults } from '../../state/actions/searchActions';
import QuoteError from '../Common/QuoteError';
import Footer from '../Common/Footer';

import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import NoResultsConnect from './NoResults';
import { VALID_QUOTE_STATES } from './searchUtils';

export class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showQuoteErrors: false,
      error: ''
    };
  }

  componentWillMount() {
    const { clearResults, clearQuote } = this.props;
    clearResults();
    clearQuote();
  }

  closeQuoteError = () => {
    this.setState({ showQuoteErrors: false });
  };

  handleSelectQuote = async quoteData => {
    const { history } = this.props;
    const quote = await this.props.reviewQuote({
      quoteNumber: quoteData.quoteNumber
    });

    if (!quote) {
      this.setState({
        showQuoteErrors: true,
        error: 'No quote data available'
      });
      return;
    }

    if (VALID_QUOTE_STATES.includes(quote.quoteState)) {
      history.replace(`/quote/${quote.quoteNumber}/customerInfo`, {
        product: quote.product
      });
    } else {
      this.setState({ showQuoteErrors: true });
    }
  };

  handleSelectAddress = async address => {
    const { history, userProfile, search } = this.props;
    const quote = await this.props.createQuote(
      '0',
      address.id,
      address.physicalAddress.state,
      userProfile.entity.companyCode,
      search.product
    );

    if (quote) {
      history.replace(`/quote/${quote.quoteNumber}/customerInfo`, {
        product: quote.product
      });
    }
  };

  render() {
    const { searchType } = this.props;
    return (
      <div className="flex grow">
        <div className="search route-content">
          <SearchBar searchType={searchType} />
          <div className="survey-wrapper">
            <div className="results-wrapper">
              <NoResultsConnect />
              <SearchResults
                handleSelectAddress={this.handleSelectAddress}
                handleSelectQuote={this.handleSelectQuote}
                {...this.props}
              />
            </div>
            <Footer />
          </div>
        </div>
        {this.state.showQuoteErrors && (
          <QuoteError
            quote={this.props.quote || {}}
            noQuoteError={this.state.error}
            closeButtonHandler={() => this.closeQuoteError()}
          />
        )}
      </div>
    );
  }
}

Search.propTypes = {
  quote: PropTypes.shape({})
};

const mapStateToProps = state => ({
  appState: state.appState,
  quote: state.quoteState.quote,
  search: state.search,
  userProfile: state.authState.userProfile
});

export default connect(
  mapStateToProps,
  {
    createQuote,
    clearQuote,
    reviewQuote,
    clearResults
  }
)(Search);
