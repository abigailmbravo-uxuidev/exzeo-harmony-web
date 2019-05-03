import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { DetailsHeader, Loader } from '@exzeo/core-ui';

import { getPolicyDetails } from '../../state/selectors/detailsHeader.selectors';
import { setAppModalError } from '../../state/actions/errorActions';
import {
  clearPolicyResults,
  clearPolicy,
  initializePolicyWorkflow,
} from '../../state/actions/serviceActions';
import DocumentsView from '../Policy/Documents';
import PolicyHolderView from '../Policy/PolicyHolder';
import PropertyView from '../Policy/Property';
import CoverageView from '../Policy/Coverage';
import BillingView from '../Policy/Billing';
import PolicyTabs from '../Common/PolicyTabs';
import Footer from '../Common/Footer';

export class PolicyWorkflow extends Component {
  componentDidMount() {
    const { match: { params: { policyNumber } }, initializePolicyWorkflow } = this.props;
    initializePolicyWorkflow(policyNumber);
  }

  componentWillUnmount() {
    this.props.clearPolicy();
  }

  render() {
    const {
      auth,
      details,
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
    const { product } = policy;

    const detailsFields = {
      HO3: {
        hideDetailSummary: true,
        showEffectiveDateButton: false,
        showReinstateButton: false,
        fields: [
          { value: 'policyHolder', component: 'Section', label: 'Policyholder' },
          { value: 'mailingAddress', component: 'Section' },
          { value: 'propertyAddress', component: 'Section' },
          { value: 'county', label: 'Property County' },
          { value: 'policyNumber' },
          { value: 'effectiveDate' },
        ]
      },
      AF3: {
        hideDetailSummary: true,
        showEffectiveDateButton: false,
        showReinstateButton: false,
        fields: [
          { value: 'policyHolder', component: 'Section', label: 'Policyholder' },
          { value: 'mailingAddress', component: 'Section' },
          { value: 'propertyAddress', component: 'Section' },
          { value: 'county', label: 'Property County' },
          { value: 'policyNumber' },
          { value: 'effectiveDate' },
        ]
      }
    };

    return (
      <div className="route policy-detail">
        <DetailsHeader
          context="policy"
          detailsFields={detailsFields[product]}
          headerDetails={details}
        />
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
  getAgentsByAgencyCode: PropTypes.func,
  setAppModalErrorAction: PropTypes.func,
  clearPolicy: PropTypes.func,
  policy: PropTypes.shape(),
  agents: PropTypes.array,
  policyDocuments: PropTypes.array,
};

const mapStateToProps = state => ({
  billing: state.service.getSummaryLedger,
  policy: state.service.latestPolicy,
  details: getPolicyDetails(state),
  agents: state.agencyState.agents,
  policyDocuments: state.service.policyDocuments || [],
  error: state.error,
});
export default connect(mapStateToProps, {
  setAppModalErrorAction: setAppModalError,
  clearPolicyResultsAction: clearPolicyResults,
  initializePolicyWorkflow,
  clearPolicy,
  })(PolicyWorkflow);
