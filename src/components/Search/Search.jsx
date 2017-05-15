import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { propTypes } from 'redux-form';

import Footer from '../Common/Footer';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import NoResultsConnect from './NoResults';
import QuoteError from '../Common/QuoteError';

const userTasks = {
  handleSelectAddress: 'chooseAddress',
  handleSelectQuote: 'chooseQuote'
};

const handleSelectAddress = (address, props) => {
  const workflowId = props.appState.instanceId;
  const taskName = userTasks.handleSelectAddress;
  const data = {
    igdId: address.id,
    stateCode: address.physicalAddress.state
  };
  props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, { submitting: true });
  props.actions.cgActions.completeTask(props.appState.modelName, workflowId, taskName, data);
};

const handleSelectQuote = (quote, props) => {
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

const Search = props => (
<div className="flex grow">
  <div className="search route-content">
    <SearchBar />
    <div className="survey-wrapper scroll">
      <div className="results-wrapper">
        <NoResultsConnect />
        <SearchResults handleSelectAddress={handleSelectAddress} handleSelectQuote={handleSelectQuote} />
      </div>
      <Footer />
    </div>
  </div>
  {props.appState.data.showQuoteErrors &&
    <QuoteError
      quote={props.appState.data.selectedQuote || {}}
      closeButtonHandler={() => closeQuoteError(props)}
    />}
</div>
);

Search.propTypes = {
  ...propTypes,
  appState: PropTypes.shape({
    modelName: PropTypes.string,
    instanceId: PropTypes.string,
    workflowData: PropTypes.func
  }),
  showQuoteErrors: PropTypes.bool
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
