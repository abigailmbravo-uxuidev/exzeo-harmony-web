import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Loader } from '@exzeo/core-ui';
import { setAppModalError } from '../../actions/errorActions';
import {
  clearPolicyResults,
  getPolicyDocuments,
  getSummaryLedger,
  getLatestPolicy,
  getAgentsByAgency,
  clearPolicy
} from '../../actions/serviceActions';
import PolicyWorkFlowDetailsConnect from './PolicyWorkflowDetails';
import DocumentsView from '../Policy/Documents';
import PolicyHolderView from '../Policy/PolicyHolder';
import PropertyView from '../Policy/Property';
import CoverageView from '../Policy/Coverage';
import BillingView from '../Policy/Billing';
import PolicyTabs from '../Common/PolicyTabs';
import Footer from '../Common/Footer';

export class PolicyWorkflow extends Component {
  componentDidMount() {
    const { match: { params: { policyNumber } },
      getPolicyDocumentsAction,
      getSummaryLedgerAction,
      getLatestPolicyAction,
      getAgentsByAgencyAction
    } = this.props;
    getPolicyDocumentsAction(policyNumber);
    getSummaryLedgerAction(policyNumber);
    getLatestPolicyAction(policyNumber).then((policy) => {
      getAgentsByAgencyAction(policy.companyCode, policy.state, policy.agencyCode);
    });
  }

  componentWillUnmount() {
    this.props.clearPolicyAction();
  }

  render() {
    const {
      auth,
      error,
      location,
      match: { params: { policyNumber }, url },
      billing,
      policy,
      agents,
      policyDocuments,
      setAppModalErrorAction
    } = this.props;

    if (!error.message && !policy.policyID) {
      return <Loader />;
    }

    const pathnameSplit = location.pathname.split('/');
    const activeTab = pathnameSplit[pathnameSplit.length - 1];

    return (
      <div className="route policy-detail">
        <PolicyWorkFlowDetailsConnect policyNumber={policyNumber} />
        <div className="route-content">
          <div className="scroll">
            <div className="detail-wrapper">
              <PolicyTabs activeTab={activeTab} policyNumber={policyNumber} />
              <Route exact path={`${url}/policyHolder`} render={() => <PolicyHolderView auth={auth} policy={policy} agents={agents} />} />
              <Route exact path={`${url}/property`} render={() => <PropertyView auth={auth} policy={policy} />} />
              <Route exact path={`${url}/coverage`} render={() => <CoverageView auth={auth} policy={policy} />} />
              <Route exact path={`${url}/billing`} render={() => <BillingView auth={auth} policy={policy} billing={billing} />} />
              <Route exact path={`${url}/documents`} render={() => <DocumentsView auth={auth} policyDocuments={policyDocuments} setAppModalErrorAction={setAppModalErrorAction} />} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

PolicyWorkflow.defaultProps = {
  policy: {}
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
  billing: state.service.getSummaryLedger,
  policy: state.service.latestPolicy,
  agents: state.service.agents,
  policyDocuments: state.service.policyDocuments || [],
  error: state.error
});

export default connect(mapStateToProps, {
  setAppModalErrorAction: setAppModalError,
  clearPolicyResultsAction: clearPolicyResults,
  getPolicyDocumentsAction: getPolicyDocuments,
  getSummaryLedgerAction: getSummaryLedger,
  getLatestPolicyAction: getLatestPolicy,
  getAgentsByAgencyAction: getAgentsByAgency,
  clearPolicyAction: clearPolicy,
})(PolicyWorkflow);
