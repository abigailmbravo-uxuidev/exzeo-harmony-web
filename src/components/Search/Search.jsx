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

const userTasks = {
  handleSelectAddress: 'chooseAddress',
  handleSelectQuote: 'chooseQuote'
};

export const handleSelectAddress = (address, props) => {
  const workflowId = props.appState.instanceId;
  const taskName = userTasks.handleSelectAddress;
  const data = {
    igdId: address.id,
    stateCode: address.physicalAddress.state
  };
  props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, { submitting: true });
  props.actions.cgActions.completeTask(props.appState.modelName, workflowId, taskName, data);
};

export const handleSelectQuote = (quote, props) => {
  const workflowId = props.appState.instanceId;

  if (quote.quoteState === 'Quote Started' || quote.quoteState === 'Application Started' || quote.quoteState === 'Quote Stopped') {
    const taskName = userTasks.handleSelectQuote;
    const data = {
      quoteId: quote._id
    };
    props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, { submitting: true });
    props.actions.cgActions.completeTask(props.appState.modelName, workflowId, taskName, data);
  } else {
    props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, { showQuoteErrors: true, selectedQuote: quote });
  }
};

const closeQuoteError = (props) => {
  props.actions.appStateActions.setAppState(props.appState.modelName, props.appState.instanceId, { showEmailPopup: false });
};

export const Search = props => (
  <div className="flex grow">
    { props.appState.data &&
      <div className="search route-content">
        <SearchBar />
        { props.appState.data.submitting && <Loader /> }
        <div className="survey-wrapper">
          <div className="results-wrapper">
            <NoResultsConnect />
            <SearchResults handleSelectAddress={handleSelectAddress} handleSelectQuote={handleSelectQuote} />
          </div>
          <Footer />
        </div>
      </div>
  }
    {props.appState.data && props.appState.data.showQuoteErrors &&
      <QuoteError
        quote={props.appState.data.selectedQuote || {}}
        closeButtonHandler={() => closeQuoteError(props)}
      />}
  </div>
);

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
  actions: {
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
