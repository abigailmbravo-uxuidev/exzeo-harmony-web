import React, { useEffect } from 'react';
import {
  Banner,
  DetailsHeader,
  Disclaimer,
  Gandalf,
  AdditionalInterests,
  AddressSection,
  DOM_COMPONENT_MAP
} from '@exzeo/core-ui/src/@Harmony';
import { Loader, noop } from '@exzeo/core-ui';
import { useWorkflowTemplate } from '../../hooks/workflowTemplates';
import { setAppError } from '../../state/actions/errorActions';
import { PAGE_ROUTING } from '../Policy/constants/workflowNavigation';
import TTICFLAF3 from '../../csp-templates/ttic-fl-af3-policy';
import TTICFLHO3 from '../../csp-templates/ttic-fl-ho3-policy';
import HCPCNJAF3 from '../../csp-templates/hcpc-nj-af3-policy';
import HCPCSCAF3 from '../../csp-templates/hcpc-sc-af3-policy';
import AppWrapper from '../../components/AppWrapper';
import Footer from '../../components/Footer';
import { PolicyWorkflowProvider } from './context';
import Billing from './Billing';
import Claims from './Claims';
import Documents from './Documents';
import Payments from './Payments';
import PolicyNavigation from './PolicyNavigation';

const TEMPLATES = {
  'TTIC:FL:AF3': TTICFLAF3,
  'TTIC:FL:HO3': TTICFLHO3,
  'HCPC:NJ:AF3': HCPCNJAF3,
  'HCPC:SC:AF3': HCPCSCAF3
};

const componentMap = {
  $POLICY_BILLING: Billing,
  $POLICY_PAYMENTS: Payments,
  $POLICY_DOCUMENTS: Documents,
  $POLICY_CLAIMS: Claims,
  $ADDITIONAL_INTERESTS: AdditionalInterests,
  $ADDRESS: AddressSection,
  ...DOM_COMPONENT_MAP
};

const FORM_ID = 'PolicyWorkflow';

const PolicyWorkflow = ({
  match,
  location,
  policy,
  headerDetails,
  summaryLedger,
  agents,
  getPolicy,
  setAppModalError,
  resetPolicy
}) => {
  const { step, policyNumber } = match.params;

  useEffect(() => {
    getPolicy(policyNumber);

    return () => resetPolicy();
  }, [policyNumber, getPolicy, resetPolicy]);

  const template = useWorkflowTemplate(
    policy,
    'policy',
    TEMPLATES,
    setAppError
  );
  const workflowPage = PAGE_ROUTING[step];

  return (
    <PolicyWorkflowProvider
      getPolicy={getPolicy}
      setAppModalError={setAppModalError}
    >
      <AppWrapper errorRedirectUrl={location.pathname}>
        <div className="route policy">
          {!template || !policy.policyNumber ? <Loader /> : null}
          {template && template.header && (
            <div className="nav-and-header-wrapper">
              {template.header.banner && (
                <Banner content={template.header.banner} />
              )}
              <DetailsHeader
                context="policy"
                detailsFields={template.header}
                headerDetails={headerDetails}
                currentStep={workflowPage}
              />
              <PolicyNavigation
                activeTab={step}
                policyNumber={policy.policyNumber}
              />
            </div>
          )}
          {template && (
            <>
              <Gandalf
                className="survey-wrapper"
                currentPage={workflowPage}
                componentMap={componentMap}
                formId={FORM_ID}
                handleSubmit={noop}
                manualSubmit={noop}
                initialValues={{ ...policy, summaryLedger }}
                options={{ agents }} // enums for select/radio fields
                path={location.pathname}
                template={template}
                formFooter={
                  <div className="form-footer">
                    {template.disclaimer && (
                      <Disclaimer content={template.disclaimer} />
                    )}
                  </div>
                }
              >
                <div id="modal-anchor" />
              </Gandalf>
              <Footer />
            </>
          )}
        </div>
      </AppWrapper>
    </PolicyWorkflowProvider>
  );
};

export default PolicyWorkflow;
