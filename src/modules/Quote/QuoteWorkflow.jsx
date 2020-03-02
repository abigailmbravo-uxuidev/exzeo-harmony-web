import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { defaultMemoize } from 'reselect';
import {
  TriggerRecalc,
  Gandalf,
  getConfigForJsonTransform
} from '@exzeo/core-ui/src/@Harmony';
import { Button, Loader, FormSpy, remoteSubmit } from '@exzeo/core-ui';

import { updateQuote, getQuote } from '../../state/actions/quoteState.actions';
import { getAgentsByAgencyCode } from '../../state/actions/agency.actions';
import { getZipcodeSettings } from '../../state/actions/serviceActions';
import { getQuoteSelector } from '../../state/selectors/quoteState.selectors';
import { getQuoteDetails } from '../../state/selectors/detailsHeader.selectors';
import Footer from '../../components/Footer';
import Error from '../../components/Error';
import App from '../../components/AppWrapper';

import {
  NEXT_PAGE_ROUTING,
  PAGE_ROUTING,
  ROUTES_NOT_HANDLED_BY_GANDALF,
  ROUTES_NOT_USING_FOOTER,
  ROUTE_TO_STEP_NAME
} from './constants/workflowNavigation';
import { UW_EXCEPTION_QUOTE_STATES } from './constants/quote';
import Assumptions from './Assumptions';
import Share from './Share';
import ThankYou from './ThankYou';
import WorkflowNavigation from './WorkflowNavigation';
import Verify from './Verify';
import Warning from './Warning';

import TTICFLAF3 from '../../csp-templates/ttic-fl-af3-quote';
import TTICFLHO3 from '../../csp-templates/ttic-fl-ho3-quote';
import HCPCNJAF3 from '../../csp-templates/hcpc-nj-af3-quote';
import HCPCSCAF3 from '../../csp-templates/hcpc-sc-af3-quote';

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

const FORM_ID = 'QuoteWorkflow';
export class QuoteWorkflow extends Component {
  constructor(props) {
    super(props);

    this.customComponents = {
      $SHARE: Share,
      $ASSUMPTIONS: Assumptions,
      $VERIFY: Verify,
      $WARNING: Warning
    };

    this.state = {
      isRecalc: false,
      gandalfTemplate: null,
      stepNumber:
        PAGE_ROUTING[
          getCurrentStepAndPage(props.location.pathname).currentRouteName
        ]
    };

    this.formInstance = null;

    this.checkForExceptions = defaultMemoize(
      this.checkForExceptions.bind(this)
    );
  }

  getConfigForJsonTransform = defaultMemoize(getConfigForJsonTransform);

  componentDidMount() {
    const { quote } = this.props;

    if (quote && quote.property) {
      this.props.getAgentsByAgencyCode(quote.agencyCode, quote.state);
      this.props.getZipCodeSettings(quote);
    }
    this.getTemplate();
  }

  // Temp fix for quote not being in state when component mounts on refresh (mostly a development time problem)
  componentDidUpdate(prevProps) {
    const { quote } = this.props;
    const { quote: prevQuote } = prevProps;
    if ((quote || {}).product !== (prevQuote || {}).product) {
      this.getTemplate();
    }
  }

  checkForExceptions(exceptions = [], route, quoteState) {
    const fatalError = exceptions.some(ex => ex.action === 'Fatal Error');
    const editableRoutes = ['customerInfo', 'underwriting', 'customize'];

    if (!UW_EXCEPTION_QUOTE_STATES.includes(quoteState)) return false;

    if (fatalError && route !== 'customerInfo') return true;

    if (editableRoutes.includes(route)) return false;

    if (route === 'verify') {
      const currentExceptions = (exceptions || []).filter(ue => !ue.overridden);
      return currentExceptions.length > 0;
    }

    return (exceptions || []).some(
      ex => ex.action === 'Fatal Error' || ex.action === 'Underwriting Review'
    );
  }

  getTemplate = async () => {
    const { companyCode, state, product } = this.props.quote;
    const templateKey = `${companyCode}:${state}:${product}`;
    this.setState(() => ({ gandalfTemplate: TEMPLATES[templateKey] }));
  };

  goToStep = (step, override) => {
    const { history, isLoading } = this.props;
    const { stepNumber } = this.state;

    if ((isLoading || step >= stepNumber) && !override) return;

    this.formInstance.reset();
    history.replace(ROUTE_TO_STEP_NAME[step]);
    this.setCurrentStep(true, step);
  };

  setRecalc = isRecalc => {
    this.setState({ isRecalc });
  };

  handleGandalfSubmit = async ({ remainOnStep, noSubmit, ...values }) => {
    const { quote, history, updateQuote, location } = this.props;
    const { isRecalc, stepNumber } = this.state;
    const { currentRouteName } = getCurrentStepAndPage(location.pathname);

    try {
      if (!noSubmit) {
        const data = values.quoteNumber ? values : quote;
        await updateQuote({
          data,
          quoteNumber: quote.quoteNumber,
          options: {
            step: stepNumber,
            shouldVerifyQuote: NEXT_PAGE_ROUTING[currentRouteName] === 'verify'
          }
        });
      }
      // TODO: Figure out a routing solution

      if (!(isRecalc || remainOnStep)) {
        history.replace(NEXT_PAGE_ROUTING[currentRouteName]);
        this.setCurrentStep();
      }
    } catch (error) {
      // TODO figure out error handling here.
      if (process.env.NODE_ENV !== 'production') {
        console.error('GANDALF SUBMIT ERROR: ', error);
      }
    }
  };

  setCurrentStep = (moveTo, step) => {
    this.setState(prevState => ({
      stepNumber: moveTo ? step : prevState.stepNumber + 1
    }));
  };

  primaryClickHandler = () => {
    remoteSubmit(FORM_ID);
  };

  setFormInstance = formInstance => {
    this.formInstance = formInstance;
  };

  isSubmitDisabled = (submitting, values) => {
    const { location } = this.props;

    const { currentStepNumber } = getCurrentStepAndPage(location.pathname);

    if (currentStepNumber === PAGE_ROUTING.mailingBilling) {
      return submitting || !values.billToId;
    }

    return submitting;
  };

  render() {
    const {
      auth,
      history,
      isLoading,
      location,
      match,
      options,
      quote,
      headerDetails,
      getQuote,
      zipCodeSettings
    } = this.props;

    const { isRecalc, gandalfTemplate } = this.state;
    const { currentRouteName, currentStepNumber } = getCurrentStepAndPage(
      location.pathname
    );
    const shouldUseGandalf =
      gandalfTemplate &&
      ROUTES_NOT_HANDLED_BY_GANDALF.indexOf(currentRouteName) === -1;
    const shouldRenderFooter =
      ROUTES_NOT_USING_FOOTER.indexOf(currentRouteName) === -1;
    const transformConfig = this.getConfigForJsonTransform(gandalfTemplate);
    const customHandlers = {
      handleSubmit: this.handleGandalfSubmit,
      history: history,
      goToStep: this.goToStep,
      getQuote
    };

    const { underwritingExceptions } = quote;
    const quoteState = quote ? quote.quoteState : '';

    const quoteHasError = this.checkForExceptions(
      underwritingExceptions,
      currentRouteName,
      quoteState
    );

    return (
      <App auth={auth} errorRedirectUrl={location.pathname} match={match}>
        <div className="route">
          {isLoading && <Loader />}
          {quoteHasError && currentRouteName !== 'error' && (
            <Redirect
              to={{
                pathname: 'error',
                state: {
                  quote,
                  exceptions: underwritingExceptions
                }
              }}
            />
          )}

          {gandalfTemplate && gandalfTemplate.header && (
            <WorkflowNavigation
              header={gandalfTemplate.header}
              headerDetails={headerDetails}
              handleRecalc={this.primaryClickHandler}
              isRecalc={isRecalc}
              history={history}
              goToStep={this.goToStep}
              isLoading={isLoading}
              showNavigationTabs={
                !['thankYou', 'error'].includes(currentRouteName)
              }
              currentStep={currentStepNumber}
              quote={quote}
            />
          )}

          <div className="survey-wrapper">
            {shouldUseGandalf && (
              <React.Fragment>
                <Gandalf
                  formId={FORM_ID}
                  currentPage={currentStepNumber}
                  customComponents={this.customComponents}
                  customHandlers={customHandlers}
                  handleSubmit={this.handleGandalfSubmit}
                  initialValues={quote}
                  options={{ ...options, zipCodeSettings }} // enums for select/radio fields
                  path={location.pathname}
                  template={gandalfTemplate}
                  transformConfig={transformConfig}
                  renderFooter={
                    <FormSpy subscription={{ submitting: true, values: true }}>
                      {({ submitting, form, values }) => (
                        <React.Fragment>
                          {shouldRenderFooter && (
                            <div className="btn-group">
                              <Button
                                data-test="submit"
                                className={Button.constants.classNames.primary}
                                onClick={this.primaryClickHandler}
                                disabled={this.isSubmitDisabled(
                                  submitting,
                                  values
                                )}
                                label={
                                  this.state.isRecalc ? 'recalculate' : 'next'
                                }
                              />

                              {this.state.isRecalc && (
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
                        </React.Fragment>
                      )}
                    </FormSpy>
                  }
                  formListeners={
                    <React.Fragment>
                      <FormSpy subscription={{}}>
                        {({ form }) => {
                          this.setFormInstance(form);
                          return null;
                        }}
                      </FormSpy>

                      <FormSpy subscription={{ dirty: true }}>
                        {({ dirty }) => (
                          <TriggerRecalc
                            dirty={dirty}
                            isRecalc={isRecalc}
                            workflowPage={currentStepNumber}
                            recalcPage={2}
                            setRecalc={this.setRecalc}
                          />
                        )}
                      </FormSpy>
                    </React.Fragment>
                  }
                />

                <Footer />
              </React.Fragment>
            )}
          </div>

          <Route
            exact
            path={`${match.url}/thankYou`}
            render={props => (
              <ThankYou footer={<Footer />} product={quote.product} />
            )}
          />
          <Route
            exact
            path={`${match.url}/error`}
            render={props => <Error {...props} getQuote={getQuote} />}
          />
        </div>
      </App>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isLoading: state.appState.isLoading,
    quote: getQuoteSelector(state),
    headerDetails: getQuoteDetails(state, ownProps.location.pathname),
    zipCodeSettings: state.service.zipCodeSettings,
    options: state.list,
    userProfile: state.authState.userProfile
  };
};

export default connect(mapStateToProps, {
  updateQuote,
  getAgentsByAgencyCode,
  getZipCodeSettings: getZipcodeSettings,
  getQuote
})(QuoteWorkflow);
