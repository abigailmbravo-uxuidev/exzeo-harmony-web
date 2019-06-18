import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { defaultMemoize } from 'reselect';
import { Gandalf, DetailsHeader } from '@exzeo/core-ui/src/@Harmony';
import { Loader, noop } from '@exzeo/core-ui';

import { getPolicyDetails } from '../../state/selectors/detailsHeader.selectors';
import { setAppModalError } from '../../state/actions/errorActions';
import {
  clearPolicyResults,
  clearPolicy,
  initializePolicyWorkflow,
} from '../../state/actions/serviceActions';

import Footer from '../../components/Common/Footer';
import App from '../../components/AppWrapper';
import HO3 from '../../mock-data/mockPolicyHO3';

import PolicyNavigation from './PolicyNavigation';
import {
  PAGE_ROUTING
} from './constants/workflowNavigation';
import Billing from './Billing';

const getCurrentStepAndPage = defaultMemoize((pathname) => {
  const currentRouteName = pathname.split('/')[3];
  return {
    currentStepNumber: PAGE_ROUTING[currentRouteName],
    currentRouteName,
  };
});

const TEMPLATES = {
  'HO3': HO3,
};

const FORM_ID = 'PolicyWorkflow';
export class PolicyWorkflow extends Component {
  constructor(props) {
    super(props);

    this.customComponents = {
      $POLICY_BILLING: Billing
    };

    this.state = {
      gandalfTemplate: null,
      stepNumber: PAGE_ROUTING[getCurrentStepAndPage(props.location.pathname).currentRouteName],
    };

    this.formInstance = null;
    this.getConfigForJsonTransform = defaultMemoize(this.getConfigForJsonTransform.bind(this));
  }

  componentDidMount() {
    const { match: { params: { policyNumber } }, initializePolicyWorkflow } = this.props;
    initializePolicyWorkflow(policyNumber);

    this.getTemplate();
  }

  // Temp fix for quote not being in state when component mounts on refresh (mostly a development time problem)
  componentDidUpdate(prevProps) {
    const { policy } = this.props;
    const { policy: prevPolicy } = prevProps;
    if ((policy || {}).product !== (prevPolicy || {}).product) {
      this.getTemplate();
    }
  }

  getConfigForJsonTransform(gandalfTemplate) {
    if(!gandalfTemplate) return {};
    console.log(gandalfTemplate)

    return gandalfTemplate.pages.reduce((pageComponentsMap, page) => {

      const pageComponents = page.components.reduce((componentMap, component) => {
        if ((component.formData.metaData || {}).target || (component.data.extendedProperties || {}).target) {
          componentMap[component.path] = (component.formData.metaData || {}).target || (component.data.extendedProperties || {}).target;
        }
        return componentMap;
      }, {});

      return {
        ...pageComponentsMap,
        ...pageComponents
      };
    }, {});
  };

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
    if(product){
    this.setState(() => ({ gandalfTemplate: TEMPLATES[product] }));
    }
  };

  render() {
    const { auth, history, isLoading, location, match, headerDetails, policy, agents, billing } = this.props;

    console.log({ ...policy, billing })

    const { gandalfTemplate } = this.state;
    const { currentRouteName, currentStepNumber } = getCurrentStepAndPage(location.pathname);
    const transformConfig = this.getConfigForJsonTransform(gandalfTemplate);
    // TODO going to use Context to pass these directly to custom components,
    //  so Gandalf does not need to know about these.
    const customHandlers = {
      handleSubmit: x => x,
      history: history
    };

    return (
      <App
        errorRedirectUrl={location.pathname}
        logout={auth.logout}
        match={match} >
          <div className="route">
            {!gandalfTemplate && <Loader />}
            {gandalfTemplate && gandalfTemplate.header &&
            <React.Fragment>
                <DetailsHeader
                  context="policy"
                  detailsFields={gandalfTemplate.header}
                  headerDetails={headerDetails}
                  isLoading={isLoading}
                  currentStep={currentStepNumber}
                />
              <PolicyNavigation activeTab={currentRouteName} policyNumber={policy.policyNumber} />
            </React.Fragment>
            }
            {/*{ Gandalf will be replacing most/all of these routes }*/}
            {gandalfTemplate && <React.Fragment>
                  <Gandalf
                  formId={FORM_ID}
                  className="survey-wrapper"
                  currentPage={currentStepNumber}
                  customComponents={this.customComponents}
                  customHandlers={customHandlers}
                  handleSubmit={noop}
                  initialValues={{ ...policy, billing }}
                  options={{agents}}  // enums for select/radio fields
                  path={location.pathname}
                  template={gandalfTemplate}
                  transformConfig={transformConfig}
                  renderFooter={noop}
                />
                <Footer />
              </React.Fragment>}
          </div>
      </App>
    );
  }
}

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
  policy: state.service.latestPolicy || {},
  headerDetails: getPolicyDetails(state),
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
