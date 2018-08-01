import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearPolicyResults, getPolicyDocuments, getSummaryLedger, getLatestPolicy, getAgentsByAgency } from '../../actions/serviceActions';
import PolicyWorkFlowDetailsConnect from './PolicyWorkflowDetails';
import PolicyDocuments from '../Policy/PolicyDocuments';
import PolicyHolder from '../Policy/PolicyHolder';
import Property from '../Policy/Property';
import Coverage from '../Policy/Coverage';
import Loader from '../Common/Loader';

export class PolicyWorkflow extends Component {

  componentDidMount() {
    const { match: { params: { policyNumber } },
     getPolicyDocumentsAction,
     getSummaryLedgerAction,
     getLatestPolicyAction,
     getAgentsByAgencyAction
     } = this.props;
    clearPolicyResults();
    getPolicyDocumentsAction(policyNumber);
    getSummaryLedgerAction(policyNumber);
    getLatestPolicyAction(policyNumber).then((policy) => {
      getAgentsByAgencyAction(policy.companyCode, policy.state, policy.agencyCode);
    });
  }

  render() {
    const { auth, match: { params: { policyNumber }, url }, policy, agents, policyDocuments } = this.props;

    if (!policy || !policy.policyID) {
      return (<Loader />);
    }
    return (
      <div className="route policy-detail">
        <PolicyWorkFlowDetailsConnect policyNumber={policyNumber} />
        <div className="route-content">
          <div className="scroll">
            <div className="detail-wrapper">
              <Route exact path={`${url}/documents`} render={() => <PolicyDocuments auth={auth} policyNumber={policyNumber} policyDocuments={policyDocuments} />} />
              <Route exact path={`${url}/policyHolder`} render={() => <PolicyHolder auth={auth} policyNumber={policyNumber} policy={policy} agents={agents} />} />
              <Route exact path={`${url}/property`} render={() => <Property auth={auth} policyNumber={policyNumber} policy={policy} />} />
              <Route exact path={`${url}/coverage`} render={() => <Coverage auth={auth} policyNumber={policyNumber} policy={policy} />} />
            </div>
          </div>
        </div>
      </div>);
  }
}

PolicyWorkflow.contextTypes = {
  router: PropTypes.object
};

PolicyWorkflow.propTypes = {
  auth: PropTypes.shape(),
  match: PropTypes.shape(),
  getPolicyDocumentsAction: PropTypes.func,
  getSummaryLedgerAction: PropTypes.func,
  getLatestPolicyAction: PropTypes.func,
  getAgentsByAgencyAction: PropTypes.func
};

const mapStateToProps = state => ({
  policy: state.service.latestPolicy,
  agents: state.service.agents,
  policyDocuments: state.service.policyDocuments || []
});
export default connect(mapStateToProps,
  {
    clearPolicyResultsAction: clearPolicyResults,
    getPolicyDocumentsAction: getPolicyDocuments,
    getSummaryLedgerAction: getSummaryLedger,
    getLatestPolicyAction: getLatestPolicy,
    getAgentsByAgencyAction: getAgentsByAgency
  })(PolicyWorkflow);
