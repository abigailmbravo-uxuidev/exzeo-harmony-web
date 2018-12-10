import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Footer from '../Common/Footer';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import NoResultsConnect from './NoResults';
import QuoteError from '../Common/QuoteError';
import Loader from '../Common/Loader';
import { clearResults } from '../../actions/searchActions';
import { createQuote, getQuote } from '../../actions/quoteState.actions';

const userTasks = {
  handleSelectAddress: 'chooseAddress',
  handleSelectQuote: 'chooseQuote'
};


const closeQuoteError = (props) => {
  props.actions.appStateActions.setAppState(props.appState.modelName, props.appState.instanceId, { showEmailPopup: false });
};

export class Search extends React.Component {


  componentWillMount() {
    this.props.actions.appStateActions.setAppState(this.props.appState.modelName, '', { submitting: false });
    this.props.clearResults();
  }

  handleSelectQuote = async (quoteData) => {
    // const workflowId = props.appState.instanceId;
    this.props.actions.appStateActions.setAppState(this.props.appState.modelName, '', { submitting: true });

    const quote = await this.props.getQuote(quoteData.quoteNumber, quoteData._id);
    this.props.actions.appStateActions.setAppState(this.props.appState.modelName, '', { submitting: false });

    if (quote) {
      this.props.history.push(`/quote/${quote.quoteNumber}/customerInfo`);
    }

    // if (quote.quoteState === 'Quote Started' || quote.quoteState === 'Application Started' || quote.quoteState === 'Quote Stopped') {
    //   const taskName = userTasks.handleSelectQuote;
    //   const data = {
    //     quoteId: quote._id
    //   };
    //   props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, { submitting: true });
    //   props.actions.cgActions.completeTask(props.appState.modelName, workflowId, taskName, data);
    // } else {
    //   props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, { showQuoteErrors: true, selectedQuote: quote });
    // }
  };

  handleSelectAddress = async (address) => {
    this.props.actions.appStateActions.setAppState(this.props.appState.modelName, '', { submitting: true });
    const quote = await this.props.createQuote('0', address.id, address.physicalAddress.state);
    this.props.actions.appStateActions.setAppState(this.props.appState.modelName, '', { submitting: false });

    if (quote) {
      this.props.history.push(`/quote/${quote.quoteNumber}/customerInfo`);
    }

    // const workflowId = props.appState.instanceId;
    // const taskName = userTasks.handleSelectAddress;
    // const data = {
    //   igdId: address.id,
    //   stateCode: address.physicalAddress.state
    // };
    // props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, { submitting: true });
    // props.actions.cgActions.completeTask(props.appState.modelName, workflowId, taskName, data);
  };

  render() {
    return (
      <div className="flex grow">
        {/* { props.appState.data && */}
        <div className="search route-content">
          <SearchBar />
          { this.props.appState.data && this.props.appState.data.submitting && <Loader /> }
          <div className="survey-wrapper">
            <div className="results-wrapper">
              <NoResultsConnect />
              <SearchResults handleSelectAddress={this.handleSelectAddress} handleSelectQuote={this.handleSelectQuote} {...this.props} />
            </div>
            <Footer />
          </div>
        </div>
        {this.props.appState.data && this.props.appState.data.showQuoteErrors &&
          <QuoteError
            quote={this.props.appState.data.selectedQuote || {}}
            closeButtonHandler={() => closeQuoteError(this.props)}
          />}
      </div>
    );
  }
  }

Search.propTypes = {
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
  createQuote: bindActionCreators(createQuote, dispatch),
  getQuote: bindActionCreators(getQuote, dispatch),
  clearResults: bindActionCreators(clearResults, dispatch),
  actions: {
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
