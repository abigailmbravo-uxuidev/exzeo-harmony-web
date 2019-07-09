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
import HO3 from '../../mock-data/mockPolicyHO3';
import AF3 from '../../mock-data/mockPolicyAF3';

import PolicyNavigation from './PolicyNavigation';
import { PAGE_ROUTING } from './constants/workflowNavigation';
import Billing from './Billing';
import Payments from './Payments';
import Documents from './Documents';

const getCurrentStepAndPage = defaultMemoize(pathname => {
  const currentRouteName = pathname.split('/')[3];
  return {
    currentStepNumber: PAGE_ROUTING[currentRouteName],
    currentRouteName
  };
});

const TEMPLATES = {
  HO3: HO3,
  AF3: AF3
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
    // const { userProfile: { entity: { companyCode, state }}, quote } = this.props;
    const { policy } = this.props;
    // const transferConfig = {
    //   exchangeName: 'harmony',
    //   routingKey:  'harmony.policy.retrieveDocumentTemplate',
    //   data: {
    //     companyCode,
    //     state,
    //     product: quote.product,
    //     application: 'agency',
    //     formName: 'quoteModel',
    //     version: date.formattedDate(undefined, date.FORMATS.SECONDARY)
    //   }
    // };

    // return transferConfig;
    // const response = await serviceRunner.callService(transferConfig, 'retrieveDocumentTemplate');
    const { product } = policy;
    if (product) {
      this.setState(() => ({ gandalfTemplate: TEMPLATES[product] }));
    }
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
    // TODO going to use Context to pass these directly to custom components,
    //  so Gandalf does not need to know about these.
    const customHandlers = {
      handleSubmit: x => x,
      history: history,
      setAppModalError: setAppModalError
    };

    console.log(policy.policyNumber);

    return (
      <App
        errorRedirectUrl={location.pathname}
        logout={auth.logout}
        match={match}
      >
        <div className="route policy">
          {!gandalfTemplate || !policy.policyNumber ? <Loader /> : null}
          {gandalfTemplate && gandalfTemplate.header && (
            <React.Fragment>
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
            </React.Fragment>
          )}
          {/*{ Gandalf will be replacing most/all of these routes }*/}
          {gandalfTemplate && (
            <React.Fragment>
              <Gandalf
                formId={FORM_ID}
                className="survey-wrapper"
                currentPage={currentStepNumber}
                customComponents={this.customComponents}
                customHandlers={customHandlers}
                handleSubmit={noop}
                initialValues={{ ...policy, billing }}
                options={{ agents, policyDocuments }} // enums for select/radio fields
                path={location.pathname}
                template={gandalfTemplate}
                transformConfig={transformConfig}
                renderFooter={noop}
              />
              <Footer />
            </React.Fragment>
          )}
        </div>
      </App>
    );
  }
}

PolicyWorkflow.propTypes = {
  auth: PropTypes.shape(),
  match: PropTypes.shape(),
  setAppModalError: PropTypes.func,
  initializePolicyWorkflow: PropTypes.func,
  policy: PropTypes.shape(),
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

export default connect(
  mapStateToProps,
  {
    setAppModalError,
    initializePolicyWorkflow,
    clearPolicy
  }
)(PolicyWorkflow);
