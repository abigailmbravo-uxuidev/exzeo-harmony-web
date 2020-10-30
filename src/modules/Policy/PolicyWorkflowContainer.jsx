import { connect } from 'react-redux';
import {
  getAllPolicyDocuments,
  resetPolicy
} from '../../state/actions/policyStateActions';
import { setAppModalError } from '../../state/actions/errorActions';
import { getPolicyDetails } from '../../state/selectors/detailsHeader.selectors';
import PolicyWorkflow from './PolicyWorkflow';

const mapStateToProps = state => {
  return {
    agents: state.agencyState.agents,
    error: state.error,
    headerDetails: getPolicyDetails(state),
    policy: state.policy.policy,
    summaryLedger: state.policy.summaryLedger
  };
};

export default connect(mapStateToProps, {
  setAppModalError,
  getPolicy: getAllPolicyDocuments,
  resetPolicy
})(PolicyWorkflow);
