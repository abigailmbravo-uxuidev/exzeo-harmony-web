import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Footer from '../Common/Footer';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import NoResultsConnect from './NoResults';
import { VALID_QUOTE_STATES } from './searchUtils';

import QuoteError from '../Common/QuoteError';
import { clearResults } from '../../actions/searchActions';
import { createQuote, getQuote, clearQuote } from '../../actions/quoteState.actions';

export class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showQuoteErrors: false
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

  handleSelectQuote = async (quoteData) => {
    const { history } = this.props;
    const quote = await this.props.getQuote(quoteData.quoteNumber, quoteData._id);

    if (quote && VALID_QUOTE_STATES.includes(quote.quoteState)) {
      history.replace(`/quote/${quote.quoteNumber}/customerInfo`);
    } else {
      this.setState({ showQuoteErrors: true });
    }
  };

  handleSelectAddress = async (address) => {
    const { history } = this.props;
    const quote = await this.props.createQuote('0', address.id, address.physicalAddress.state);

    if (quote) {
      history.replace(`/quote/${quote.quoteNumber}/customerInfo`);
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
        {this.state.showQuoteErrors &&
          <QuoteError
            quote={this.props.quote || {}}
            closeButtonHandler={() => this.closeQuoteError()}
          />
        }
      </div>
    );
  }
}

Search.propTypes = {
  quote: PropTypes.shape({})
};

const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState,
  quote: state.quoteState.quote
});

export default connect(mapStateToProps, { createQuote, clearQuote, getQuote, clearResults })(Search);
