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

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { submit } from 'redux-form';
import { defaultMemoize } from 'reselect';
import { Gandalf } from '@exzeo/core-ui/src/@Harmony';
import { Button } from '@exzeo/core-ui/src';

import MOCK_TEMPLATE from '../../mock-data/mockConfigurationPayload';

import { updateQuote } from '../../actions/quoteState.actions';
import { getAgentsByAgencyCode } from '../../actions/agency.actions';
import { getZipcodeSettings } from '../../actions/serviceActions';
import { getQuoteSelector } from '../../selectors/choreographer.selectors';
import App from '../../components/AppWrapper';

import { NEXT_PAGE_ROUTING, PAGE_ROUTING, ROUTES_NOT_HANDLED_BY_GANDALF, ROUTES_NOT_USING_FOOTER } from './constants/workflowNavigation';
import { ROUTE_TO_STEP_NAME } from './constants/choreographer';
import Share from './Share';
import Assumptions from './components/Assumptions';

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
    };

    this.getConfigForJsonTransform = defaultMemoize(this.getConfigForJsonTransform.bind(this));
  }

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

  setShowEmailPopup = (showEmailPopup) => {
    this.setState(() => ({ showEmailPopup }));
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

  primaryClickHandler = () => {
    // remote submit
    document
      .getElementById(FORM_ID)
      .dispatchEvent(new Event('submit', { cancelable: true }));
  };


  getConfigForJsonTransform() {
    // template will come from state/props
    return MOCK_TEMPLATE.pages.reduce((pageComponentsMap, page) => {

      const pageComponents = page.components.reduce((componentMap, component) => {
        if ((component.formData.metaData || {}).target) {
          componentMap[component.path] = component.formData.metaData.target;
        }
        return componentMap;
      }, {});

      return {
        ...pageComponentsMap,
        ...pageComponents
      }
    }, {});
  };

  handleDirtyForm = (isDirty) => {
    const { workflowState } = this.props;
    this.setState({
      isRecalc: workflowState.activeTask === 'askToCustomizeDefaultQuote' && isDirty,
    })
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
      workflowState,
    } = this.props;

    const { isRecalc, needsConfirmation } = this.state;
    const currentStep = location.pathname.split('/')[3];
    const currentPage = PAGE_ROUTING[currentStep];
    const shouldUseGandalf = ROUTES_NOT_HANDLED_BY_GANDALF.indexOf(currentStep) === -1;
    const shouldRenderFooter = ROUTES_NOT_USING_FOOTER.indexOf(currentStep) === -1;
    const transformConfig = this.getConfigForJsonTransform();
    // TODO going to use Context to pass these directly to custom components,
    //  so Gandalf does not need to know about these.
    const customHandlers = {
      onDirtyCallback: this.handleDirtyForm,
      setEmailPopup: this.setShowEmailPopup,
      getState: this.getLocalState,
      handleSubmit: this.handleGandalfSubmit,
      history: history,
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
            />
            {/*{ Gandalf will be replacing most/all of these routes }*/}
            {shouldUseGandalf &&
              <Route
                path={`${match.url}`}
                render={() => (
                  <React.Fragment>
                    <Gandalf
                      formId={FORM_ID}
                      className="survey-wrapper"
                      currentPage={currentPage}
                      path={location.pathname}
                      handleSubmit={this.handleGandalfSubmit}
                      initialValues={quote}
                      template={MOCK_TEMPLATE}
                      options={options}  // enums for select/radio fields
                      transformConfig={transformConfig}
                      customHandlers={customHandlers}
                      customComponents={this.customComponents}
                      renderFooter={({ submitting, reset }) => (
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
                                  onClick={reset}
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
                )} />
            }
            {/*<Route exact path={`${match.url}/underwriting`}          render={props => <Underwriting {...props} updateQuote={this.handleUpdateQuote} />} />*/}
            {/*<Route exact path={`${match.url}/customize`}             render={props => <Customize {...props} updateQuote={this.handleUpdateQuote} isRecalc={isRecalc} setRecalc={this.setRecalc} />} />*/}
            {/*<Route exact path={`${match.url}/share`} render={props => <Share {...props} updateQuote={this.handleUpdateQuote} />} />*/}
            {/*<Route exact path={`${match.url}/assumptions`} render={props => <Assumptions {...props} updateQuote={this.handleUpdateQuote} />} />*/}
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
  return {
    isLoading: state.appState.isLoading,
    quote: getQuoteSelector(state),
    workflowState: state.quoteState.state || {},
    zipCodeSettings: state.service.zipCodeSettings,
    options: state.list,
  }
};

export default connect(mapStateToProps, {
  submitForm: submit,
  updateQuote,
  getAgentsByAgencyCode,
  getZipcodeSettings
})(QuoteWorkflow);
