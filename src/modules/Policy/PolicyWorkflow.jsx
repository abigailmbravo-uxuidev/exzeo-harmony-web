import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { defaultMemoize } from 'reselect';
import {
  Gandalf,
  DetailsHeader,
  getConfigForJsonTransform,
  Banner,
  Disclaimer
} from '@exzeo/core-ui/src/@Harmony';

import { Loader, noop } from '@exzeo/core-ui';

import { getPolicyDetails } from '../../state/selectors/detailsHeader.selectors';
import { setAppModalError } from '../../state/actions/errorActions';
import {
  resetPolicy,
  getAllPolicyDocuments
} from '../../state/actions/policyStateActions';
import Footer from '../../components/Footer';
import AppWrapper from '../../components/AppWrapper';

import { PAGE_ROUTING } from './constants/workflowNavigation';
import PolicyNavigation from './PolicyNavigation';
import Billing from './Billing';
import Claims from './Claims';
import Payments from './Payments';
import Documents from './Documents';

import TTICFLAF3 from '../../csp-templates/ttic-fl-af3-policy';
import TTICFLHO3 from '../../csp-templates/ttic-fl-ho3-policy';
import HCPCNJAF3 from '../../csp-templates/hcpc-nj-af3-policy';
import HCPCSCAF3 from '../../csp-templates/hcpc-sc-af3-policy';

const getCurrentStepAndPage = defaultMemoize(pathname => {
  const currentRouteName = pathname.split('/')[3];
  return {
    currentStepNumber: PAGE_ROUTING[currentRouteName],
    currentRouteName
  };
});

const TEMPLATES = {
  'TTIC:FL:AF3': TTICFLAF3,
  'TTIC:FL:HO3': TTICFLHO3,
  'HCPC:NJ:AF3': HCPCNJAF3,
  'HCPC:SC:AF3': HCPCSCAF3
};

const FORM_ID = 'PolicyWorkflow';
export class PolicyWorkflow extends Component {
  constructor(props) {
    super(props);

    this.customComponents = {
      $POLICY_BILLING: Billing,
      $POLICY_PAYMENTS: Payments,
      $POLICY_DOCUMENTS: Documents,
      $POLICY_CLAIMS: Claims
    };

    this.state = {
      gandalfTemplate: null,
      stepNumber:
        PAGE_ROUTING[
          getCurrentStepAndPage(props.location.pathname).currentRouteName
        ]
    };

    this.formInstance = null;
    this.customHandlers = {};
  }

  getConfigForJsonTransform = defaultMemoize(getConfigForJsonTransform);

  componentDidMount() {
    const { match, getAllPolicyDocuments } = this.props;
    getAllPolicyDocuments(match.params.policyNumber);
    this.getTemplate();
  }

  componentWillUnmount() {
    this.props.resetPolicy();
  }

  // Temp fix for quote not being in state when component mounts on refresh (mostly a development time problem)
  componentDidUpdate(prevProps) {
    const { policy } = this.props;
    const { policy: prevPolicy } = prevProps;
    if ((policy || {}).product !== (prevPolicy || {}).product) {
      this.getTemplate();
    }
  }

  getTemplate = async () => {
    const { companyCode, state, product } = this.props.policy;
    const templateKey = `${companyCode}:${state}:${product}`;
    this.setState(() => ({ gandalfTemplate: TEMPLATES[templateKey] }));
  };

  render() {
    const {
      history,
      isLoading,
      location,
      headerDetails,
      policy,
      agents,
      summaryLedger,
      setAppModalError,
      getAllPolicyDocuments
    } = this.props;

    const { gandalfTemplate } = this.state;
    const { currentRouteName, currentStepNumber } = getCurrentStepAndPage(
      location.pathname
    );
    const transformConfig = this.getConfigForJsonTransform(gandalfTemplate);
    // This is how to replicate 'useRef' in a Class component - sets us up for refactoring this component to functional component
    this.customHandlers.handleSubmit = x => x;
    this.customHandlers.history = history;
    this.customHandlers.setAppModalError = setAppModalError;
    this.customHandlers.updatePolicy = getAllPolicyDocuments;

    return (
      <AppWrapper errorRedirectUrl={location.pathname}>
        <div className="route policy">
          {!gandalfTemplate || !policy.policyNumber ? <Loader /> : null}
          {gandalfTemplate && gandalfTemplate.header && (
            <div className="nav-and-header-wrapper">
              {gandalfTemplate.header.banner && (
                <Banner content={gandalfTemplate.header.banner} />
              )}
              <DetailsHeader
                context="policy"
                detailsFields={gandalfTemplate.header}
                headerDetails={headerDetails}
                isLoading={isLoading}
                currentStep={currentStepNumber}
              />
              <PolicyNavigation
                activeTab={currentRouteName}
                policyNumber={policy.policyNumber}
              />
            </div>
          )}
          {gandalfTemplate && (
            <React.Fragment>
              <Gandalf
                className="survey-wrapper"
                currentPage={currentStepNumber}
                customComponents={this.customComponents}
                customHandlers={this.customHandlers}
                formId={FORM_ID}
                handleSubmit={noop}
                initialValues={{ ...policy, summaryLedger }}
                options={{ agents }} // enums for select/radio fields
                path={location.pathname}
                template={gandalfTemplate}
                transformConfig={transformConfig}
                formFooter={
                  <div className="form-footer">
                    {gandalfTemplate.disclaimer && (
                      <Disclaimer content={gandalfTemplate.disclaimer} />
                    )}
                  </div>
                }
              >
                <div id="modal-anchor" />
              </Gandalf>
              <Footer />
            </React.Fragment>
          )}
        </div>
      </AppWrapper>
    );
  }
}

PolicyWorkflow.propTypes = {
  match: PropTypes.shape({}),
  setAppModalError: PropTypes.func,
  getAllPolicyDocuments: PropTypes.func,
  policy: PropTypes.shape({}),
  agents: PropTypes.array
};

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
  getAllPolicyDocuments,
  resetPolicy
})(PolicyWorkflow);
