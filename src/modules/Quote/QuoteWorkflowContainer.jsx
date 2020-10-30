import { connect } from 'react-redux';
import { updateQuote, getQuote } from '../../state/actions/quoteState.actions';
import { getAgentsByAgencyCode } from '../../state/actions/agency.actions';
import { getZipcodeSettings } from '../../state/actions/serviceActions';
import { getQuoteSelector } from '../../state/selectors/quoteState.selectors';
import { getQuoteDetails } from '../../state/selectors/detailsHeader.selectors';
import QuoteWorkflow from './QuoteWorkflow';

const mapStateToProps = (state, ownProps) => {
  return {
    isLoading: state.appState.isLoading,
    quote: getQuoteSelector(state),
    headerDetails: getQuoteDetails(state, ownProps.location.pathname),
    zipCodeSettings: state.service.zipCodeSettings,
    options: state.list
  };
};

export default connect(mapStateToProps, {
  updateQuote,
  getAgentsByAgencyCode,
  getZipCodeSettings: getZipcodeSettings,
  getQuote
})(QuoteWorkflow);
