import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { defaultMemoize } from 'reselect';
import {
  Gandalf,
  getConfigForJsonTransform
} from '@exzeo/core-ui/src/@Harmony';
import { Button, Loader, FormSpy, remoteSubmit } from '@exzeo/core-ui';

import { updateQuote, getQuote } from '../../state/actions/quoteState.actions';
import { getAgentsByAgencyCode } from '../../state/actions/agency.actions';
import { getZipcodeSettings } from '../../state/actions/serviceActions';
import { getEnumsForQuoteWorkflow } from '../../state/actions/list.actions';
import { getQuoteSelector } from '../../state/selectors/choreographer.selectors';
import { getQuoteDetails } from '../../state/selectors/detailsHeader.selectors';

import {
  NEXT_PAGE_ROUTING,
  PAGE_ROUTING,
  ROUTES_NOT_HANDLED_BY_GANDALF,
  ROUTES_NOT_USING_FOOTER,
  ROUTE_TO_STEP_NAME
} from './constants/workflowNavigation';

import ThankYou from '../../components/ThankYou/ThankYou';
import Footer from '../../components/Footer';
import Error from '../../components/Error/Error';
import App from '../../components/AppWrapper';

import Assumptions from './Assumptions';
import Share from './Share';
import WorkflowNavigation from './WorkflowNavigation';
import Verify from './Verify';

import AF3 from '../../mock-data/mockAF3';
import HO3 from '../../mock-data/mockHO3';
import TriggerRecalc from './TriggerRecalc';
import { UW_EXCEPTION_QUOTE_STATES } from './constants/quote';

const getCurrentStepAndPage = defaultMemoize(pathname => {
  const currentRouteName = pathname.split('/')[3];
  return {
    currentStepNumber: PAGE_ROUTING[currentRouteName],
    currentRouteName
  };
});

// Thin memoized wrapper around FormSpys to keep them from needlessly re-rendering.
const MemoizedFormListeners = React.memo(({ children }) => (
  <React.Fragment>{children}</React.Fragment>
));

const TEMPLATES = {
  AF3: AF3,
  HO3: HO3
};

const FORM_ID = 'QuoteWorkflow';
export class QuoteWorkflow extends Component {
  constructor(props) {
    super(props);

    this.customComponents = {
      $SHARE: Share,
      $ASSUMPTIONS: Assumptions,
      $VERIFY: Verify
    };

    this.state = {
      isRecalc: false,
      showEmailPopup: false,
      showSendApplicationPopup: false,
      gandalfTemplate: null,
      stepNumber:
        PAGE_ROUTING[
          getCurrentStepAndPage(props.location.pathname).currentRouteName
        ]
    };

    this.formInstance = null;

    this.checkForFatalExceptions = defaultMemoize(
      this.checkForFatalExceptions.bind(this)
    );
  }

  getConfigForJsonTransform = defaultMemoize(getConfigForJsonTransform);

  componentDidMount() {
    const { quote } = this.props;

    if (quote && quote.property) {
      this.props.getAgentsByAgencyCode(quote.agencyCode);
      this.props.getZipcodeSettings(
        quote.companyCode,
        quote.state,
        quote.product,
        quote.property.physicalAddress.zip
      );
      this.props.getEnumsForQuoteWorkflow({
        companyCode: quote.companyCode,
        state: quote.state,
        product: quote.product,
        property: quote.property
      });
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

  checkForFatalExceptions(
    underwritingExceptions,
    currentRouteName,
    quoteState
  ) {
    if (!UW_EXCEPTION_QUOTE_STATES.includes(quoteState)) return false;

    if (currentRouteName === 'verify') {
      const currentExceptions = (underwritingExceptions || []).filter(
        ue => !ue.overridden
      );
      return currentExceptions.length > 0;
    }

    return (underwritingExceptions || []).some(
      ex => ex.action === 'Fatal Error'
    );
  }

  getLocalState = () => {
    return this.state;
  };

  getTemplate = async () => {
    const {
      userProfile: {
        entity: { companyCode, state }
      },
      quote
    } = this.props;
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
    const { product } = quote;
    this.setState(() => ({ gandalfTemplate: TEMPLATES[product] }));
  };

  goToStep = step => {
    const { history, isLoading } = this.props;
    const { stepNumber } = this.state;

    if (isLoading || step >= stepNumber) return;

    this.formInstance.reset();
    history.replace(ROUTE_TO_STEP_NAME[step]);
    this.setCurrentStep(true, step);
  };

  setRecalc = isRecalc => {
    this.setState({ isRecalc });
  };

  handleGandalfSubmit = async ({
    remainOnStep,
    shouldSendEmail,
    shouldSendApplication,
    noSubmit,
    ...values
  }) => {
    const {
      zipCodeSettings,
      quote,
      history,
      updateQuote,
      location,
      options
    } = this.props;
    const { isRecalc, stepNumber } = this.state;
    const { currentRouteName } = getCurrentStepAndPage(location.pathname);

    try {
      if (!noSubmit) {
        const data = values.quoteNumber ? values : quote;
        await updateQuote({
          data,
          quoteNumber: quote.quoteNumber,
          options: {
            shouldSendEmail,
            shouldSendApplication,
            customValues: values,
            step: stepNumber,
            shouldReviewQuote: NEXT_PAGE_ROUTING[currentRouteName] === 'verify',
            timezone: (zipCodeSettings || {}).timezone || 'America/New_York',
            underwritingQuestions: options.underwritingQuestions
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

  setShowEmailPopup = showEmailPopup => {
    this.setState(() => ({ showEmailPopup }));
  };

  setShowSendApplicationPopup = showSendApplicationPopup => {
    this.setState(() => ({ showSendApplicationPopup }));
  };

  // ============= v NOT used by Gandalf v ============= //
  handleUpdateQuote = async ({ data, quoteNumber }) => {
    const { updateQuote } = this.props;
    const quote = await updateQuote({ data, quoteNumber });
    return quote;
  };

  // ============= ^ NOT used by Gandalf ^ ============= //

  render() {
    const {
      auth,
      history,
      isLoading,
      location,
      match,
      options,
      quote,
      quoteData,
      headerDetails,
      getQuote
    } = this.props;

    const { isRecalc, needsConfirmation, gandalfTemplate } = this.state;
    const { currentRouteName, currentStepNumber } = getCurrentStepAndPage(
      location.pathname
    );
    const shouldUseGandalf =
      gandalfTemplate &&
      ROUTES_NOT_HANDLED_BY_GANDALF.indexOf(currentRouteName) === -1;
    const shouldRenderFooter =
      ROUTES_NOT_USING_FOOTER.indexOf(currentRouteName) === -1;
    const transformConfig = this.getConfigForJsonTransform(gandalfTemplate);
    // TODO going to use Context to pass these directly to custom components,
    //  so Gandalf does not need to know about these.
    const customHandlers = {
      setEmailPopup: this.setShowEmailPopup,
      setShowSendApplicationPopup: this.setShowSendApplicationPopup,
      getState: this.getLocalState,
      handleSubmit: this.handleGandalfSubmit,
      history: history,
      updateQuote: this.handleUpdateQuote,
      goToStep: this.goToStep,
      getQuote
    };

    const { underwritingExceptions } = quote;
    const quoteHasFatalError = this.checkForFatalExceptions(
      underwritingExceptions,
      currentRouteName
    );

    return (
      <App
        errorRedirectUrl={location.pathname}
        logout={auth.logout}
        match={match}
      >
        <div className="route">
          {isLoading && <Loader />}
          {quoteHasFatalError && !(location.state || {}).fatalError && (
            <Redirect to={{ pathname: 'error', state: { fatalError: true } }} />
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
                !quoteHasFatalError && currentRouteName !== 'thankYou'
              }
              currentStep={currentStepNumber}
              quote={quoteData}
            />
          )}
          {/*{ Gandalf will be replacing most/all of these routes }*/}
          {shouldUseGandalf && (
            <React.Fragment>
              <Gandalf
                formId={FORM_ID}
                className="survey-wrapper"
                currentPage={currentStepNumber}
                customComponents={this.customComponents}
                customHandlers={customHandlers}
                handleSubmit={this.handleGandalfSubmit}
                initialValues={quote}
                options={options} // enums for select/radio fields
                path={location.pathname}
                template={gandalfTemplate}
                transformConfig={transformConfig}
                renderFooter={({ submitting, form }) => (
                  <React.Fragment>
                    {shouldRenderFooter && (
                      <div className="btn-group">
                        <Button
                          data-test="submit"
                          className={Button.constants.classNames.primary}
                          onClick={this.primaryClickHandler}
                          disabled={submitting || needsConfirmation}
                          label={this.state.isRecalc ? 'recalculate' : 'next'}
                        />

                        {this.state.isRecalc && (
                          <Button
                            data-test="reset"
                            className={Button.constants.classNames.secondary}
                            onClick={form.reset}
                            label="reset"
                          />
                        )}
                      </div>
                    )}
                  </React.Fragment>
                )}
                formListeners={() => (
                  <MemoizedFormListeners>
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
                          currentPage={currentStepNumber}
                          setRecalc={this.setRecalc}
                        />
                      )}
                    </FormSpy>
                  </MemoizedFormListeners>
                )}
              />

              <Footer />
            </React.Fragment>
          )}

          <Route
            exact
            path={`${match.url}/thankYou`}
            render={props => (
              <ThankYou {...props} updateQuote={this.handleUpdateQuote} />
            )}
          />
          <Route
            exact
            path={`${match.url}/error`}
            render={props => (
              <Error {...props} updateQuote={this.handleUpdateQuote} />
            )}
          />
        </div>
      </App>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isLoading: state.appState.isLoading,
    // duplication for now because we are transforming some of the quote values ahead of time to make CG happy.
    quote: getQuoteSelector(state),
    // actual quote values
    quoteData: state.quoteState.quote,
    headerDetails: getQuoteDetails(state, ownProps.location.pathname),
    workflowState: state.quoteState.state || {},
    zipCodeSettings: state.service.zipCodeSettings,
    options: state.list,
    userProfile: state.authState.userProfile
  };
};

export default connect(
  mapStateToProps,
  {
    updateQuote,
    getAgentsByAgencyCode,
    getZipcodeSettings,
    getEnumsForQuoteWorkflow,
    getQuote
  }
)(QuoteWorkflow);
