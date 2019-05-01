import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { submit } from 'redux-form';
import { defaultMemoize } from 'reselect';
import { Gandalf } from '@exzeo/core-ui/src/@Harmony';
import { Button, Loader } from '@exzeo/core-ui';

import { updateQuote } from '../../state/actions/quoteState.actions';
import { getAgentsByAgencyCode } from '../../state/actions/agency.actions';
import { getZipcodeSettings } from '../../state/actions/serviceActions';
import { getEnumsForQuoteWorkflow, getBillingOptions } from '../../state/actions/list.actions';
import { getQuoteSelector } from '../../state/selectors/choreographer.selectors';
import { getQuoteDetails } from '../../state/selectors/detailsHeader.selectors';

import {
  NEXT_PAGE_ROUTING,
  PAGE_ROUTING,
  ROUTES_NOT_HANDLED_BY_GANDALF,
  ROUTES_NOT_USING_FOOTER,
  STEP_NAMES,
  ROUTE_TO_STEP_NAME,
} from './constants/workflowNavigation';

import ThankYou from '../../components/ThankYou/ThankYou';
//import Verify from '../../components/Verify/Verify';
import Footer from '../../components/Common/Footer';
import Error from '../../components/Error/Error';
import App from '../../components/AppWrapper';

import Assumptions from './Assumptions';
import Share from './Share';
import WorkflowNavigation from './WorkflowNavigation';
import Verify from './Verify';


import AF3 from '../../mock-data/mockAF3';
import HO3 from '../../mock-data/mockHO3';

const TEMPLATES = {
  'AF3': AF3,
  'HO3': HO3,
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
      currentStep: STEP_NAMES.askAdditionalCustomerData,
    };

    this.getConfigForJsonTransform = defaultMemoize(this.getConfigForJsonTransform.bind(this));
  }

  componentDidMount() {
    const { quote } = this.props;

    if (quote && quote.property) {
      this.props.getAgentsByAgencyCode(quote.agencyCode);
      this.props.getZipcodeSettings(quote.companyCode, quote.state, quote.product, quote.property.physicalAddress.zip);
      this.props.getEnumsForQuoteWorkflow({ companyCode: quote.companyCode, state: quote.state, product: quote.product, property: quote.property})
    }
    this.getTemplate();
    this.setStepBasedOnRoute();
  }

  // Temp fix for quote not being in state when component mounts on refresh (mostly a development time problem)
  componentDidUpdate(prevProps) {
    const { quote } = this.props;
    const { quote: prevQuote } = prevProps;
    if ((quote || {}).product !== (prevQuote || {}).product) {
      this.getTemplate();
    }
  }

  getConfigForJsonTransform(gandalfTemplate) {
    if(!gandalfTemplate) return {};

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
      }
    }, {});
  };

  getBillingOptions = () => {
    const { quoteData } = this.props;
    this.props.getBillingOptions(quoteData);
  };

  getLocalState = () => {
    return this.state;
  };

  getTemplate = async () => {
    const { userProfile: { entity: { companyCode, state }}, quote } = this.props;
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

  goToStep = (step) => {
    const { history, isLoading } = this.props;
    const { currentStep } = this.state;

    if (isLoading || step >= currentStep) return;

    history.replace(ROUTE_TO_STEP_NAME[step]);
    this.setCurrentStep(true, step);
  };

  handleDirtyForm = (isDirty, currentPage) => {
    this.setState({
      isRecalc: currentPage === 2 && isDirty,
    })
  };

  handleGandalfSubmit = async ({ remainOnStep, shouldSendEmail,shouldSendApplication, noSubmit, ...values}) => {
    const { zipCodeSettings, quote, quoteData, history, updateQuote, location, options } = this.props;
    const { isRecalc, currentStep } = this.state;
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
            step: currentStep,
            timezone: (zipCodeSettings || {}).timezone || 'America/New_York',
            underwritingQuestions: options.underwritingQuestions,
          }
        });
      }

      // TODO: Figure out a routing solution
      if (!(isRecalc || remainOnStep)) {
        history.replace(NEXT_PAGE_ROUTING[location.pathname.split('/')[3]]);
        this.setCurrentStep();
      }
    } catch (error) {
      console.log(error);
    }

  };

  setCurrentStep = (moveTo, step) => {
    this.setState((prevState) => ({
      currentStep: moveTo ? step : prevState.currentStep + 1,
    }))
  };

  setStepBasedOnRoute = () => {
    const currentStep = this.props.location.pathname.split('/')[3];
    const currentPage = PAGE_ROUTING[currentStep];
    this.setCurrentStep(true, currentPage);
  };

  primaryClickHandler = () => {
    // ie11 does not handle customEvents the same way as other browsers. So here we have to check before creating
    // this custom submit event - this is being used to submit the form from outside of the form.
    const form = document.getElementById(FORM_ID);
    if (typeof(Event) === 'function') {
      form.dispatchEvent(new Event('submit', { cancelable: true }));
    } else {
      const event = document.createEvent('Event');
      event.initEvent('submit', true, true);
      form.dispatchEvent(event);
    }
  };

  setShowEmailPopup = (showEmailPopup) => {
    this.setState(() => ({ showEmailPopup }));
  };

  setShowSendApplicationPopup = (showSendApplicationPopup) => {
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
    const { auth, history, isLoading, location, match, options, quote, quoteData, headerDetails, workflowState } = this.props;

    const { isRecalc, needsConfirmation, gandalfTemplate } = this.state;
    const currentStep = location.pathname.split('/')[3];
    const currentPage = PAGE_ROUTING[currentStep];
    const shouldUseGandalf = (gandalfTemplate && ROUTES_NOT_HANDLED_BY_GANDALF.indexOf(currentStep) === -1);
    const shouldRenderFooter = ROUTES_NOT_USING_FOOTER.indexOf(currentStep) === -1;
    const transformConfig = this.getConfigForJsonTransform(gandalfTemplate);
    // TODO going to use Context to pass these directly to custom components,
    //  so Gandalf does not need to know about these.
    const customHandlers = {
      onDirtyCallback: this.handleDirtyForm,
      setEmailPopup: this.setShowEmailPopup,
      setShowSendApplicationPopup: this.setShowSendApplicationPopup,
      getState: this.getLocalState,
      handleSubmit: this.handleGandalfSubmit,
      history: history,
      updateQuote: this.handleUpdateQuote,
      goToStep: this.goToStep,
      getBillingOptions: this.getBillingOptions,
    };

    const { underwritingExceptions } = quote;
    const fatalError = underwritingExceptions
      ? underwritingExceptions.some(ex => ex.action === 'Fatal Error')
      : false;

    return (
      <App
        errorRedirectUrl={location.pathname}
        logout={auth.logout}
        match={match} >
          <div className="route">
            {isLoading && <Loader />}
            {fatalError && <Redirect to={'error'} />}

            { gandalfTemplate && gandalfTemplate.header &&
              <WorkflowNavigation
                header={gandalfTemplate.header}
                headerDetails={headerDetails}
                handleRecalc={this.primaryClickHandler}
                isRecalc={isRecalc}
                history={history}
                goToStep={this.goToStep}
                isLoading={isLoading}
                showNavigationTabs={!fatalError && (currentStep !== 'thankYou')}
                currentStep={this.state.currentStep}
                quote={quoteData}
              />
            }
            {/*{ Gandalf will be replacing most/all of these routes }*/}
            {shouldUseGandalf &&
              <React.Fragment>
                <Gandalf
                  formId={FORM_ID}
                  className="survey-wrapper"
                  currentPage={currentPage}
                  handleSubmit={this.handleGandalfSubmit}
                  initialValues={quote}
                  template={gandalfTemplate}
                  options={options}  // enums for select/radio fields
                  transformConfig={transformConfig}
                  path={location.pathname}
                  customHandlers={customHandlers}
                  customComponents={this.customComponents}
                  renderFooter={({ submitting, form }) => (
                    <React.Fragment>
                      {shouldRenderFooter &&
                        <div className="btn-group">
                          <Button
                            data-test="submit"
                            className={Button.constants.classNames.primary}
                            onClick={this.primaryClickHandler}
                            disabled={submitting || needsConfirmation}
                            label={this.state.isRecalc ? 'recalculate' : 'next'}
                          />

                          {this.state.isRecalc &&
                            <Button
                              data-test="reset"
                              className={Button.constants.classNames.secondary}
                              onClick={form.reset}
                              label="reset"
                            />
                          }
                        </div>
                      }
                    </React.Fragment>
                  )}
                />

                <Footer />
              </React.Fragment>
            }

            <Route exact path={`${match.url}/thankYou`} render={props => <ThankYou {...props} updateQuote={this.handleUpdateQuote} />} />
            <Route exact path={`${match.url}/error`} render={props => <Error {...props} updateQuote={this.handleUpdateQuote} />} />
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
  }
};

export default connect(mapStateToProps, {
  submitForm: submit,
  updateQuote,
  getAgentsByAgencyCode,
  getZipcodeSettings,
  getEnumsForQuoteWorkflow,
  getBillingOptions,
})(QuoteWorkflow);
