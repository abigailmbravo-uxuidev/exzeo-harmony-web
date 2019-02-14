import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { submit } from 'redux-form';
import { updateQuote } from '../../actions/quoteState.actions';

import App from '../../components/AppWrapper';
import CustomerInfo from '../../components/CustomerInfo/CustomerInfo';
import Underwriting from '../../components/Underwriting/Underwriting';
import Customize from '../../components/Customize/Customize';
import Share from '../../components/Share/Share';
import Assumptions from '../../components/Assumptions/Assumptions';
import AddAdditionalInterest from '../../components/AdditionalInterests/AddAdditionalInterest';
import Mortgagee from '../../components/AdditionalInterests/Mortgagee';
import AdditionalInterest from '../../components/AdditionalInterests/AdditionalInterest';
import AdditionalInsured from '../../components/AdditionalInterests/AdditionalInsured';
import PremiumFinance from '../../components/AdditionalInterests/PremiumFinance';
import BillPayer from '../../components/AdditionalInterests/BillPayer';
import Billing from '../../components/Billing/Billing';
import Verify from '../../components/Verify/Verify';
import ThankYou from '../../components/ThankYou/ThankYou';
import Error from '../../components/Error/Error';
import Loader from '../../components/Common/Loader';
import WorkflowNavigation from './WorkflowNavigation';
import Footer from '../../components/Common/Footer'

import { ROUTE_TO_STEP_NAME } from './constants/choreographer';
import { NEXT_PAGE_ROUTING, PAGE_ROUTING, ROUTES_NOT_HANDLED_BY_GANDALF, ROUTES_NOT_USING_FOOTER } from './constants/workflowNavigation';
import { Gandalf } from '@exzeo/core-ui/src/@Harmony';
import { getQuoteSelector } from '../../selectors/choreographer.selectors';
import { getAgentsList } from '../../selectors/agencyState.selectors';
import { getAgentsByAgencyCode } from '../../actions/agency.actions';
import { getZipcodeSettings } from '../../actions/serviceActions';

import MOCK_TEMPLATE from '../../mock-data/mockTemplate';

const FORM_ID = 'QuoteWorkflow';

export class QuoteWorkflow extends Component {
  customComponents = {
    $SHARE: Share,
  };

  state = {
    isRecalc: false,
    showEmailPopup: false,
  };

  componentDidMount() {
    const { quote } = this.props;

    if (quote && quote.property) {
      this.props.getAgentsByAgencyCode(quote.agencyCode);
      this.props.getZipcodeSettings(quote.companyCode, quote.state, quote.product, quote.property.physicalAddress.zip);
    }
  }

  getLocalState = () => {
    return this.state;
  };

  setRecalc = (isRecalc) => {
    this.setState(() => ({ isRecalc }))
  };

  setShowEmailPopup = (showEmailPopup) => {
    this.setState(() => ({ showEmailPopup }));
  };

  handlePremiumRecalc = () => {
    document
      .getElementById(FORM_ID)
      .dispatchEvent(new Event("submit", { cancelable: true }))
  };

  handleUpdateQuote = async ({ data, quoteNumber }) => {
    const { updateQuote } = this.props;
    const quote = await updateQuote({ data, quoteNumber });

    return quote;
  };

  goToStep = async (stepName) => {
    const { history, isLoading, quote, updateQuote, workflowState: { activeTask, completedTasks } } = this.props;

    if (isLoading || activeTask === stepName || !completedTasks.includes(stepName)) return;

    await updateQuote({ stepName, quoteNumber: quote.quoteNumber });
    history.replace(ROUTE_TO_STEP_NAME[stepName]);
  };

  handleGandalfSubmit = async (values) => {
    const { zipCodeSettings, quote, history, updateQuote, location, workflowState } = this.props;
    const { isRecalc } = this.state;
    await updateQuote({ data: { ...values, recalc: isRecalc }, quoteNumber: quote.quoteNumber, options: { timezone: (zipCodeSettings|| {}).timezone || 'America/New_York' } });
        // TODO: Figure out a routing solution
    if(!(isRecalc || workflowState.isHardStop)) history.replace(NEXT_PAGE_ROUTING[location.pathname.split('/')[3]]);
  };

  getConfigForJsonTransform = () => {
    return MOCK_TEMPLATE.pages.reduce((pageComponentsMap, page) => {

      const pageComponents = page.components.reduce((componentMap, component) => {
        if ((component.data.extendedProperties || {}).transformConfig) {
          componentMap[component.data.path] = component.data.extendedProperties.transformConfig.value;
        }
        return componentMap;
      }, {});

      return {
        ...pageComponentsMap,
        ...pageComponents
      }
    }, {});
  };

  render() {
    const { auth, history, isLoading, match, location, options, quote, workflowState } = this.props;
    const { isRecalc } = this.state;
    const currentStep = location.pathname.split('/')[3];
    const shouldUseGandalf = ROUTES_NOT_HANDLED_BY_GANDALF.indexOf(currentStep) === -1;
    const shouldRenderFooter = ROUTES_NOT_USING_FOOTER.indexOf(currentStep) === -1;
    const shouldPassCallback = PAGE_ROUTING[currentStep] === 2;
    const customHandlers = {
      onDirtyCallback: shouldPassCallback ? this.setRecalc : undefined,
      setEmailPopup: this.setShowEmailPopup,
      getState: this.getLocalState,
      history: history,
    };

    return (
      <App
        errorRedirectUrl={location.pathname}
        logout={auth.logout}
        match={match}
      >
          <div className="route">
            {isLoading && <Loader />}
            {workflowState.isHardStop && <Redirect to={'error'} />}

            <WorkflowNavigation handleRecalc={this.handlePremiumRecalc} isRecalc={isRecalc} history={history} goToStep={this.goToStep} isLoading={isLoading} isThankYou={currentStep === 'thankYou'} />
            {/*{ Gandalf will be replacing most/all of these routes }*/}
            {shouldUseGandalf &&
              <Route
                path={`${match.url}`}
                render={props => (
                  <React.Fragment>
                    <Gandalf
                      formId={FORM_ID}
                      className="survey-wrapper"
                      currentPage={PAGE_ROUTING[currentStep]}
                      path={location.pathname}
                      handleSubmit={this.handleGandalfSubmit}
                      initialValues={quote}
                      template={MOCK_TEMPLATE}
                      /* passing needed data as options all the way to the Input component, I don't really like that but we can prob do something with state */
                      options={options}
                      transformConfig={this.getConfigForJsonTransform()}
                      customHandlers={customHandlers}
                      customComponents={this.customComponents}
                      renderFooter={({ submitting }) => (
                        <React.Fragment>
                          {shouldRenderFooter &&
                            <div className="btn-group">
                              <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={submitting}>{this.state.isRecalc ? 'recalculate' : 'next'}</button>
                            </div>
                          }
                        </React.Fragment>
                      )}
                    />

                    <Footer />
                  </React.Fragment>
                )} />
            }
            {/*<Route exact path={`${match.url}/underwriting`}          render={props => <Underwriting {...props} updateQuote={this.handleUpdateQuote} />} />*/}
            {/*<Route exact path={`${match.url}/customize`}             render={props => <Customize {...props} updateQuote={this.handleUpdateQuote} isRecalc={isRecalc} setRecalc={this.setRecalc} />} />*/}
            {/*<Route exact path={`${match.url}/share`} render={props => <Share {...props} updateQuote={this.handleUpdateQuote} />} />*/}
            <Route exact path={`${match.url}/assumptions`} render={props => <Assumptions {...props} updateQuote={this.handleUpdateQuote} />} />
            <Route exact path={`${match.url}/additionalInterests`} render={props => <AddAdditionalInterest {...props} updateQuote={this.handleUpdateQuote} />} />
            <Route exact path={`${match.url}/askMortgagee`} render={props => <Mortgagee {...props} updateQuote={this.handleUpdateQuote} />} />
            <Route exact path={`${match.url}/askAdditionalInterest`} render={props => <AdditionalInterest {...props} updateQuote={this.handleUpdateQuote} />} />
            <Route exact path={`${match.url}/askAdditionalInsured`} render={props => <AdditionalInsured {...props} updateQuote={this.handleUpdateQuote} />} />
            <Route exact path={`${match.url}/askPremiumFinance`} render={props => <PremiumFinance {...props} updateQuote={this.handleUpdateQuote} />} />
            <Route exact path={`${match.url}/askBillPayer`} render={props => <BillPayer {...props} updateQuote={this.handleUpdateQuote} />} />
            <Route exact path={`${match.url}/mailingBilling`} render={props => <Billing {...props} updateQuote={this.handleUpdateQuote} />} />
            <Route exact path={`${match.url}/verify`} render={props => <Verify {...props} updateQuote={this.handleUpdateQuote} goToStep={this.goToStep} />} />
            <Route exact path={`${match.url}/thankYou`} render={props => <ThankYou {...props} updateQuote={this.handleUpdateQuote} />} />
            <Route exact path={`${match.url}/error`} render={props => <Error {...props} updateQuote={this.handleUpdateQuote} />} />
            {/*{ ^^^ Gandalf will be replacing most/all of these routes ^^^ }*/}
          </div>
      </App>
    );
  }
}

const mapStateToProps = (state) => {
  const uiQuestions = state.quoteState.state && Array.isArray(state.quoteState.state.uiQuestions)
    ? state.quoteState.state.uiQuestions
    : [];

  return {
    isLoading: state.appState.isLoading,
    quote: getQuoteSelector(state),
    workflowState: state.quoteState.state || {},
    uiQuestions,
    zipCodeSettings: state.service.zipCodeSettings,
    agentResults: getAgentsList(state),
    options: state.list,
  }
};

export default connect(mapStateToProps, {
  submitForm: submit,
  updateQuote,
  getAgentsByAgencyCode,
  getZipcodeSettings
})(QuoteWorkflow);
