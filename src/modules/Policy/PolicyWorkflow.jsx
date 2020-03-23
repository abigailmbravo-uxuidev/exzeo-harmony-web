import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { defaultMemoize } from 'reselect';
import {
  Gandalf,
  DetailsHeader,
  getConfigForJsonTransform
} from '@exzeo/core-ui/src/@Harmony';
import { Loader, emptyArray, emptyObject, noop } from '@exzeo/core-ui';

import { getPolicyDetails } from '../../state/selectors/detailsHeader.selectors';
import { setAppModalError } from '../../state/actions/errorActions';
import {
  initializePolicyWorkflow,
  clearPolicy
} from '../../state/actions/serviceActions';
import Footer from '../../components/Footer';
import App from '../../components/AppWrapper';

import PolicyNavigation from './PolicyNavigation';
import { PAGE_ROUTING } from './constants/workflowNavigation';
import Billing from './Billing';
import Payments from './Payments';
import Documents from './Documents';

import TTICFLAF3 from '../../csp-templates/ttic-fl-af3-policy';
import TTICFLHO3 from '../../csp-templates/ttic-fl-ho3-policy';
import HCPCNJAF3 from '../../csp-templates/hcpc-nj-af3-policy';
import HCPCSCAF3 from '../../csp-templates/hcpc-sc-af3-policy';
import WorkflowDisclaimer from '../../components/WorkflowDisclaimer';
import WorkflowBanner from '../../components/WorkflowBanner';

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
      $POLICY_DOCUMENTS: Documents
    };

    this.state = {
      gandalfTemplate: null,
      stepNumber:
        PAGE_ROUTING[
          getCurrentStepAndPage(props.location.pathname).currentRouteName
        ]
    };

    this.formInstance = null;
  }

  getConfigForJsonTransform = defaultMemoize(getConfigForJsonTransform);

  componentDidMount() {
    const { match, initializePolicyWorkflow } = this.props;
    initializePolicyWorkflow(match.params.policyNumber);

    this.getTemplate();
  }

  componentWillUnmount() {
    this.props.clearPolicy();
  }

  // Temp fix for quote not being in state when component mounts on refresh (mostly a development time problem)
  componentDidUpdate(prevProps) {
    const { policy } = this.props;
    const { policy: prevPolicy } = prevProps;
    if ((policy || {}).product !== (prevPolicy || {}).product) {
      this.getTemplate();
    }
  }

  getLocalState = () => {
    return this.state;
  };

  getTemplate = async () => {
    const { companyCode, state, product } = this.props.policy;
    const templateKey = `${companyCode}:${state}:${product}`;
    this.setState(() => ({ gandalfTemplate: TEMPLATES[templateKey] }));
  };

  render() {
    const {
      auth,
      history,
      isLoading,
      location,
      match,
      headerDetails,
      policy,
      agents,
      billing,
      policyDocuments,
      setAppModalError
    } = this.props;

    const { gandalfTemplate } = this.state;
    const { currentRouteName, currentStepNumber } = getCurrentStepAndPage(
      location.pathname
    );
    const transformConfig = this.getConfigForJsonTransform(gandalfTemplate);
    const customHandlers = {
      handleSubmit: x => x,
      history: history,
      setAppModalError: setAppModalError
    };

    return (
      <App errorRedirectUrl={location.pathname} auth={auth} match={match}>
        <div className="route policy">
          {!gandalfTemplate || !policy.policyNumber ? <Loader /> : null}
          {gandalfTemplate && gandalfTemplate.header && (
            <div className="nav-and-header-wrapper">
              <WorkflowBanner content={gandalfTemplate.header.banner} />
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
                customHandlers={customHandlers}
                formId={FORM_ID}
                handleSubmit={noop}
                initialValues={{ ...policy, billing }}
                options={{ agents, policyDocuments }} // enums for select/radio fields
                path={location.pathname}
                template={gandalfTemplate}
                transformConfig={transformConfig}
                formFooter={
                  <div className="form-footer">
                    {gandalfTemplate.disclaimer && (
                      <WorkflowDisclaimer
                        content={gandalfTemplate.disclaimer}
                      />
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
      </App>
    );
  }
}

PolicyWorkflow.propTypes = {
  auth: PropTypes.shape({}),
  match: PropTypes.shape({}),
  setAppModalError: PropTypes.func,
  initializePolicyWorkflow: PropTypes.func,
  policy: PropTypes.shape({}),
  agents: PropTypes.array,
  policyDocuments: PropTypes.array
};

const mapStateToProps = state => {
  return {
    agents: state.agencyState.agents,
    billing: state.service.getSummaryLedger,
    error: state.error,
    headerDetails: getPolicyDetails(state),
    policy: state.service.latestPolicy || emptyObject,
    policyDocuments: state.service.policyDocuments || emptyArray
  };
};

export default connect(mapStateToProps, {
  setAppModalError,
  initializePolicyWorkflow,
  clearPolicy
})(PolicyWorkflow);
