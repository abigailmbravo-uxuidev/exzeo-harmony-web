import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { Button, FormSpy, Loader } from '@exzeo/core-ui';
import {
  AdditionalInterests,
  AddressSection,
  DOM_COMPONENT_MAP,
  Gandalf,
  TriggerRecalc
} from '@exzeo/core-ui/src/@Harmony';
import TTICFLAF3 from '../../csp-templates/ttic-fl-af3-quote';
import TTICFLHO3 from '../../csp-templates/ttic-fl-ho3-quote';
import HCPCNJAF3 from '../../csp-templates/hcpc-nj-af3-quote';
import HCPCSCAF3 from '../../csp-templates/hcpc-sc-af3-quote';
import { UW_EXCEPTION_QUOTE_STATES } from './constants/quote';
import AppWrapper from '../../components/AppWrapper';
import WorkflowDisclaimer from '../../components/WorkflowDisclaimer';
import Footer from '../../components/Footer';
import Error from '../../components/Error';
import { useWorkflowTemplate } from '../../hooks/workflowTemplates';
import { setAppError } from '../../state/actions/errorActions';
import { QuoteWorkflowProvider } from './context';
import WorkflowNavigation from './WorkflowNavigation';
import Assumptions from './Assumptions';
import Billing from './Billing';
import Share from './Share';
import ThankYou from './ThankYou';
import Verify from './Verify';
import Warning from './Warning';
import {
  NEXT_PAGE_ROUTING,
  PAGE_ROUTING,
  ROUTES_NOT_HANDLED_BY_GANDALF,
  ROUTES_NOT_USING_FOOTER
} from './constants/workflowNavigation';

const TEMPLATES = {
  'TTIC:FL:AF3': TTICFLAF3,
  'TTIC:FL:HO3': TTICFLHO3,
  'HCPC:NJ:AF3': HCPCNJAF3,
  'HCPC:SC:AF3': HCPCSCAF3
};

const componentMap = {
  ...DOM_COMPONENT_MAP,
  $SHARE: Share,
  $ASSUMPTIONS: Assumptions,
  $VERIFY: Verify,
  $WARNING: Warning,
  $BILLING: Billing,
  $ADDITIONAL_INTERESTS: AdditionalInterests,
  $ADDRESS: AddressSection
};

const FORM_ID = 'QuoteWorkflow';

const QuoteWorkflow = ({
  history,
  match,
  location,
  isLoading,
  quote,
  headerDetails,
  options,
  zipCodeSettings,
  getQuote,
  getAgentsByAgencyCode,
  getZipCodeSettings,
  updateQuote
}) => {
  const { step } = match.params;
  const workflowPage = PAGE_ROUTING[step];
  const formInstance = useRef();
  const [recalc, setRecalc] = useState(false);
  const template = useWorkflowTemplate(quote, 'quote', TEMPLATES, setAppError);

  useEffect(() => {
    if (quote.quoteNumber) {
      getAgentsByAgencyCode(quote.agencyCode, quote.state);
      getZipCodeSettings(quote);
    }
  }, [quote, getZipCodeSettings, getAgentsByAgencyCode]);

  const handleSubmit = async ({ remainOnStep, noSubmit, ...values }) => {
    try {
      if (!noSubmit) {
        const data = values.quoteNumber ? values : quote;
        await updateQuote({
          data,
          quoteNumber: quote.quoteNumber,
          options: {
            step: workflowPage,
            // Make sure the next action after we submit is navigating to verify page
            shouldVerifyQuote:
              !remainOnStep && NEXT_PAGE_ROUTING[step] === 'verify'
          }
        });
      }

      if (!(recalc || remainOnStep)) {
        history.replace(NEXT_PAGE_ROUTING[step]);
      }
    } catch (error) {
      // TODO figure out error handling here.
      if (process.env.NODE_ENV !== 'production') {
        console.error('GANDALF SUBMIT ERROR: ', error);
      }
    }
  };

  const handleRecalc = e => formInstance.current?.submit(e);

  const checkForExceptions = () => {
    const exceptions = quote.underwritingExceptions;
    const fatalError = exceptions.some(ex => ex.action === 'Fatal Error');
    const editableRoutes = ['customerInfo', 'underwriting', 'customize'];

    if (!UW_EXCEPTION_QUOTE_STATES.includes(quote.quoteState)) return false;

    if (fatalError && step !== 'customerInfo') return true;

    if (editableRoutes.includes(step)) return false;

    if (step === 'verify') {
      const currentExceptions = (exceptions || []).filter(ue => !ue.overridden);
      return currentExceptions.length > 0;
    }

    return (exceptions || []).some(
      ex => ex.action === 'Fatal Error' || ex.action === 'Underwriting Review'
    );
  };

  const renderGandalf = ROUTES_NOT_HANDLED_BY_GANDALF.indexOf(step) === -1;
  const renderFooter = ROUTES_NOT_USING_FOOTER.indexOf(step) === -1;

  return (
    <QuoteWorkflowProvider
      formInstance={formInstance.current}
      getQuote={getQuote}
      handleSubmit={handleSubmit}
      history={history}
      isLoading={isLoading}
      step={match.params.step}
    >
      {(isLoading || !quote) && <Loader />}
      {template && (
        <AppWrapper errorRedirectUrl={location.pathname}>
          <div className="route">
            {checkForExceptions() &&
            step !== 'error' && ( // TODO turn into underwritingError component
                <Redirect
                  to={{
                    pathname: 'error',
                    state: {
                      quote,
                      exceptions: quote.underwritingExceptions
                    }
                  }}
                />
              )}

            <WorkflowNavigation
              currentStep={workflowPage}
              handleRecalc={handleRecalc}
              header={template.header}
              headerDetails={headerDetails}
              history={history}
              isLoading={isLoading}
              isRecalc={recalc}
              quote={quote}
              showNavigationTabs={!['thankYou', 'error'].includes(step)}
            />

            <div className="survey-wrapper">
              {renderGandalf && (
                <>
                  <Gandalf
                    currentPage={workflowPage}
                    componentMap={componentMap}
                    formId={FORM_ID}
                    handleSubmit={handleSubmit}
                    manualSubmit={handleSubmit}
                    initialValues={quote}
                    options={{ ...options, zipCodeSettings }} // enums for select/radio fields
                    path={location.pathname}
                    template={template}
                    formFooter={
                      <FormSpy
                        subscription={{ submitting: true, values: true }}
                      >
                        {({ submitting, form, values }) => (
                          <div className="form-footer">
                            {renderFooter && (
                              <div className="btn-group">
                                <Button
                                  data-test="submit"
                                  className={
                                    Button.constants.classNames.primary
                                  }
                                  onClick={form.submit}
                                  disabled={submitting}
                                  label={recalc ? 'recalculate' : 'next'}
                                />

                                {recalc && (
                                  <Button
                                    data-test="reset"
                                    className={
                                      Button.constants.classNames.secondary
                                    }
                                    onClick={form.reset}
                                    label="reset"
                                  />
                                )}
                              </div>
                            )}
                            {template.disclaimer && (
                              <WorkflowDisclaimer
                                content={template.disclaimer}
                              />
                            )}
                          </div>
                        )}
                      </FormSpy>
                    }
                  >
                    <FormSpy subscription={{}}>
                      {({ form }) => {
                        formInstance.current = form;
                        return null;
                      }}
                    </FormSpy>

                    <FormSpy subscription={{ dirty: true }}>
                      {({ dirty }) => (
                        <TriggerRecalc
                          dirty={dirty}
                          isRecalc={recalc}
                          workflowPage={workflowPage}
                          recalcPage={2}
                          setRecalc={setRecalc}
                        />
                      )}
                    </FormSpy>
                    <div id="modal-anchor" />
                  </Gandalf>
                  <Footer />
                </>
              )}
            </div>
            {step === 'thankYou' && (
              <ThankYou footer={<Footer />} product={quote.product} />
            )}
            {step === 'error' && (
              <Error
                location={location}
                history={history}
                getQuote={getQuote}
              />
            )}
          </div>
        </AppWrapper>
      )}
    </QuoteWorkflowProvider>
  );
};

export default QuoteWorkflow;
