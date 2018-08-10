import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAppModalError } from '../../actions/errorActions';
import { clearPolicyResults, getPolicyDocuments, getSummaryLedger, getLatestPolicy, getAgentsByAgency } from '../../actions/serviceActions';
import PolicyWorkFlowDetailsConnect from './PolicyWorkflowDetails';
import DocumentsView from '../Policy/Documents';
import PolicyHolderView from '../Policy/PolicyHolder';
import PropertyView from '../Policy/Property';
import CoverageView from '../Policy/Coverage';
import Loader from '../Common/Loader';
import Footer from '../Common/Footer';

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
    const {
      auth,
      match: { params: { policyNumber }, url },
      policy,
      agents,
      policyDocuments,
      setAppModalErrorAction
    } = this.props;

    if (!(policy && policy.policyID)) {
      return (<Loader />);
    }
    return (
      <div className="route policy-detail">
        <PolicyWorkFlowDetailsConnect policyNumber={policyNumber} />
        <div className="route-content">
          <div className="scroll">
            <div className="detail-wrapper">
              <Route exact path={`${url}/documents`} render={() => <DocumentsView auth={auth} policyNumber={policyNumber} policyDocuments={policyDocuments} setAppModalErrorAction={setAppModalErrorAction} />} />
              <Route exact path={`${url}/policyHolder`} render={() => <PolicyHolderView auth={auth} policyNumber={policyNumber} policy={policy} agents={agents} />} />
              <Route exact path={`${url}/property`} render={() => <PropertyView auth={auth} policyNumber={policyNumber} policy={policy} />} />
              <Route exact path={`${url}/coverage`} render={() => <CoverageView auth={auth} policyNumber={policyNumber} policy={policy} />} />
            </div>
          </div>
        </div>
        <Footer />
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
  getAgentsByAgencyAction: PropTypes.func,
  setAppModalErrorAction: PropTypes.func,
  policy: PropTypes.shape(),
  agents: PropTypes.array,
  policyDocuments: PropTypes.array
};

const mapStateToProps = state => ({
  policy: state.service.latestPolicy,
  agents: state.service.agents,
  policyDocuments: state.service.policyDocuments || []
});
export default connect(mapStateToProps,
  {
    setAppModalErrorAction: setAppModalError,
    clearPolicyResultsAction: clearPolicyResults,
    getPolicyDocumentsAction: getPolicyDocuments,
    getSummaryLedgerAction: getSummaryLedger,
    getLatestPolicyAction: getLatestPolicy,
    getAgentsByAgencyAction: getAgentsByAgency
  })(PolicyWorkflow);
