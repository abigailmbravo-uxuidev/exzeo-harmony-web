import AddAdditionalInterest from '../../components/AdditionalInterests/AddAdditionalInterest';
import Mortgagee from '../../components/AdditionalInterests/Mortgagee';
import AdditionalInterest from '../../components/AdditionalInterests/AdditionalInterest';
import AdditionalInsured from '../../components/AdditionalInterests/AdditionalInsured';
import PremiumFinance from '../../components/AdditionalInterests/PremiumFinance';
import BillPayer from '../../components/AdditionalInterests/BillPayer';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { submit } from 'redux-form';
import { defaultMemoize } from 'reselect';
import { Gandalf } from '@exzeo/core-ui/src/@Harmony';
import { Button, Loader, date } from '@exzeo/core-ui';

import { updateQuote } from '../../state/actions/quoteState.actions';
import { getAgentsByAgencyCode } from '../../state/actions/agency.actions';
import { getZipcodeSettings } from '../../state/actions/serviceActions';
import { getQuoteSelector } from '../../state/selectors/choreographer.selectors';

import { NEXT_PAGE_ROUTING, PAGE_ROUTING, ROUTES_NOT_HANDLED_BY_GANDALF, ROUTES_NOT_USING_FOOTER } from './constants/workflowNavigation';
import { ROUTE_TO_STEP_NAME } from './constants/choreographer';

import Verify from '../../components/Verify/Verify';
import ThankYou from '../../components/ThankYou/ThankYou';
import Footer from '../../components/Common/Footer'
import Error from '../../components/Error/Error';
import App from '../../components/AppWrapper';
import * as serviceRunner from '../../utilities/serviceRunner';

import Assumptions from './Assumptions';
import Share from './Share';
import WorkflowNavigation from './WorkflowNavigation';

import AF3 from '../../mock-data/mockAF3';
const FORM_ID = 'QuoteWorkflow';

export class QuoteWorkflow extends Component {
  constructor(props) {
    super(props);

    this.customComponents = {
      $SHARE: Share,
      $ASSUMPTIONS: Assumptions,
    };

    this.state = {
      isRecalc: false,
      showEmailPopup: false,
      gandalfTemplate: AF3,
      currentStep: 0,
      availableSteps: [],
    };

    this.getConfigForJsonTransform = defaultMemoize(this.getConfigForJsonTransform.bind(this));
  }

  componentDidMount() {
    const { quote } = this.props;

    if (quote && quote.property) {
      this.props.getAgentsByAgencyCode(quote.agencyCode);
      this.props.getZipcodeSettings(quote.companyCode, quote.state, quote.product, quote.property.physicalAddress.zip);
    }
    this.getTemplate();
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

  getLocalState = () => {
    return this.state;
  };

  getTemplate = async () => {
    const { userProfile: { entity: { companyCode, state }}, quote } = this.props;

    const transferConfig = {
      exchangeName: 'harmony',
      routingKey:  'harmony.policy.retrieveDocumentTemplate',
      data: {
        companyCode,
        state,
        product: quote.product,
        application: 'agency',
        formName: 'quoteModel',
        version: date.formattedDate(undefined, date.FORMATS.SECONDARY)
      }
    };

    return transferConfig;
    // const response = await serviceRunner.callService(transferConfig, 'retrieveDocumentTemplate');
    // this.setState(() => ({ gandalfTemplate: response.data.result }));
  };

  goToStep = async (stepName) => {
    const { history, isLoading, quote, updateQuote, workflowState: { activeTask, completedTasks } } = this.props;
    if (isLoading || activeTask === stepName || !completedTasks.includes(stepName)) return;

    await updateQuote({ stepName, quoteNumber: quote.quoteNumber });
    history.replace(ROUTE_TO_STEP_NAME[stepName]);
  };

  handleDirtyForm = (isDirty, currentPage) => {
    this.setState({
      isRecalc: currentPage === 2 && isDirty,
    })
  };

  handleGandalfSubmit = async ({ shouldNav, ...values}) => {
    const { zipCodeSettings, quote, history, updateQuote, location, options } = this.props;
    const { isRecalc } = this.state;
    await updateQuote({
      data: { ...values, recalc: isRecalc },
      quoteNumber: quote.quoteNumber,
      options: { underwritingQuestions: options.underwritingQuestions, timezone: (zipCodeSettings|| {}).timezone || 'America/New_York' }
    });

        // TODO: Figure out a routing solution
    if(!(isRecalc || shouldNav === 'false')) {
      history.replace(NEXT_PAGE_ROUTING[location.pathname.split('/')[3]]);
    }
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

  setCurrentStep = () => {

  };

  setShowEmailPopup = (showEmailPopup) => {
    this.setState(() => ({ showEmailPopup }));
  };

  // ============= v NOT used by Gandalf v ============= //
  handleUpdateQuote = async ({ data, quoteNumber }) => {
    const { updateQuote } = this.props;
    const quote = await updateQuote({ data, quoteNumber });
    return quote;
  };

  // ============= ^ NOT used by Gandalf ^ ============= //

  render() {
    const { auth, history, isLoading, location, match, options, quote, quoteData, workflowState, } = this.props;

    const { isRecalc, needsConfirmation, gandalfTemplate } = this.state;
    const currentStep = location.pathname.split('/')[3];
    const currentPage = PAGE_ROUTING[currentStep];
    const shouldUseGandalf = gandalfTemplate && ROUTES_NOT_HANDLED_BY_GANDALF.indexOf(currentStep) === -1;
    const shouldRenderFooter = ROUTES_NOT_USING_FOOTER.indexOf(currentStep) === -1;
    const transformConfig = this.getConfigForJsonTransform(gandalfTemplate);
    // TODO going to use Context to pass these directly to custom components,
    //  so Gandalf does not need to know about these.
    const customHandlers = {
      onDirtyCallback: this.handleDirtyForm,
      setEmailPopup: this.setShowEmailPopup,
      getState: this.getLocalState,
      handleSubmit: this.handleGandalfSubmit,
      history: history,
      updateQuote: this.handleUpdateQuote
    };

    return (
      <App
        errorRedirectUrl={location.pathname}
        logout={auth.logout}
        match={match} >
          <div className="route">
            {isLoading && <Loader />}
            {workflowState.isHardStop && <Redirect to={'error'} />}

            <WorkflowNavigation
              handleRecalc={this.primaryClickHandler}
              isRecalc={isRecalc}
              history={history}
              goToStep={this.goToStep}
              isLoading={isLoading}
              showNavigationTabs={!workflowState.isHardStop && (currentStep !== 'thankYou')}
              currentStep={this.state.currentStep}
              availableSteps={this.state.availableSteps}
              quote={quoteData}
            />
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

            <Route exact path={`${match.url}/additionalInterests`} render={props => <AddAdditionalInterest {...props} updateQuote={this.handleUpdateQuote} />} />
            <Route exact path={`${match.url}/askMortgagee`} render={props => <Mortgagee {...props} updateQuote={this.handleUpdateQuote} />} />
            <Route exact path={`${match.url}/askAdditionalInterest`} render={props => <AdditionalInterest {...props} updateQuote={this.handleUpdateQuote} />} />
            <Route exact path={`${match.url}/askAdditionalInsured`} render={props => <AdditionalInsured {...props} updateQuote={this.handleUpdateQuote} />} />
            <Route exact path={`${match.url}/askPremiumFinance`} render={props => <PremiumFinance {...props} updateQuote={this.handleUpdateQuote} />} />
            <Route exact path={`${match.url}/askBillPayer`} render={props => <BillPayer {...props} updateQuote={this.handleUpdateQuote} />} />
            <Route exact path={`${match.url}/verify`} render={props => <Verify {...props} updateQuote={this.handleUpdateQuote} goToStep={this.goToStep} />} />
            <Route exact path={`${match.url}/thankYou`} render={props => <ThankYou {...props} updateQuote={this.handleUpdateQuote} />} />
            <Route exact path={`${match.url}/error`} render={props => <Error {...props} updateQuote={this.handleUpdateQuote} />} />
          </div>
      </App>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.appState.isLoading,
    // duplication for now because we are transforming some of the quote values ahead of time to make CG happy.
    quote: getQuoteSelector(state),
    // actual quote values
    quoteData: state.quoteState.quote,
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
  getZipcodeSettings
})(QuoteWorkflow);
