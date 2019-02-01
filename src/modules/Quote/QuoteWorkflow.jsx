import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
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
import { Gandalf } from '@exzeo/core-ui/src/@Harmony';
import { getQuoteSelector } from '../../selectors/quoteState.selectors';
import { getAgentsList } from '../../selectors/agencyState.selectors';
import { getAgentsByAgencyCode } from '../../actions/agency.actions';
import { getZipcodeSettings } from '../../actions/serviceActions';

export class QuoteWorkflow extends Component {
  state = {
    isRecalc: false,
  };

  componentDidMount(){
    const { quote } = this.props;

    if (quote && quote.property) {
      this.props.getAgentsByAgencyCode(quote.agencyCode);
      this.props.getZipcodeSettings(quote.companyCode, quote.state, quote.product, quote.property.physicalAddress.zip);
    }
  }

  setRecalc = (isRecalc) => {
    this.setState(() => ({ isRecalc }))
  };

  handlePremiumRecalc = () => {
    const { submitForm } = this.props;
    submitForm('Customize');
  };

  handleUpdateQuote = async ({data, quoteNumber}) => {
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
    const { zipCodeSettings, quote, history, updateQuote } = this.props;
    await updateQuote({  data: values, quoteNumber: quote.quoteNumber, options: { timezone: zipCodeSettings.timezone } });
    history.replace('underwriting');
  };

  render() {
    const { auth, history, isLoading, match, location, uiQuestions, quote, agentResults } = this.props;
    const { isRecalc } = this.state;

    return (
      <App
        errorRedirectUrl={location.pathname}
        logout={auth.logout}
        match={match}
        render={() => (
          <div className="route">
            {isLoading && <Loader />}

            <WorkflowNavigation handleRecalc={this.handlePremiumRecalc} history={history} goToStep={this.goToStep} isRecalc={isRecalc} />
            {/*{ Gandalf will be replacing most/all of these routes }*/}
            <Route exact path={`${match.url}/customerInfo`}          render={props => 
            <Gandalf
             /* passing needed data as options all the way to the Input component, I don't really like that but we can prob do something with state */
              options={{ agentResults }}
              className="survey-wrapper"
              path={location.pathname}
              initialValues={quote}
              handleSubmit={this.handleGandalfSubmit}
              renderFooter={({ submitting, pristine }) => (
                <React.Fragment>
                  <div className="btn-group">
                    <button type="submit" className="btn btn-primary" disabled={submitting}>Next</button>
                  </div>
                  <Footer />
                </React.Fragment>
              )}
            />} />
            <Route exact path={`${match.url}/underwriting`}          render={props => <Underwriting {...props} updateQuote={this.handleUpdateQuote} />} />
            <Route exact path={`${match.url}/customize`}             render={props => <Customize {...props} updateQuote={this.handleUpdateQuote} isRecalc={isRecalc} setRecalc={this.setRecalc} />} />
            <Route exact path={`${match.url}/share`}                 render={props => <Share {...props} updateQuote={this.handleUpdateQuote} />} />
            <Route exact path={`${match.url}/assumptions`}           render={props => <Assumptions {...props} updateQuote={this.handleUpdateQuote} />} />
            <Route exact path={`${match.url}/additionalInterests`}   render={props => <AddAdditionalInterest {...props} updateQuote={this.handleUpdateQuote} />} />
            <Route exact path={`${match.url}/askMortgagee`}          render={props => <Mortgagee {...props} updateQuote={this.handleUpdateQuote} />} />
            <Route exact path={`${match.url}/askAdditionalInterest`} render={props => <AdditionalInterest {...props} updateQuote={this.handleUpdateQuote} />} />
            <Route exact path={`${match.url}/askAdditionalInsured`}  render={props => <AdditionalInsured {...props} updateQuote={this.handleUpdateQuote} />} />
            <Route exact path={`${match.url}/askPremiumFinance`}     render={props => <PremiumFinance {...props} updateQuote={this.handleUpdateQuote} />} />
            <Route exact path={`${match.url}/askBillPayer`}          render={props => <BillPayer {...props} updateQuote={this.handleUpdateQuote} />} />
            <Route exact path={`${match.url}/mailingBilling`}        render={props => <Billing {...props} updateQuote={this.handleUpdateQuote} />} />
            <Route exact path={`${match.url}/verify`}                render={props => <Verify {...props} updateQuote={this.handleUpdateQuote} goToStep={this.goToStep} />} />
            <Route exact path={`${match.url}/thankYou`}              render={props => <ThankYou {...props} updateQuote={this.handleUpdateQuote} />} />
            <Route exact path={`${match.url}/error`}                 render={props => <Error {...props} updateQuote={this.handleUpdateQuote} />} />
            {/*{ ^^^ Gandalf will be replacing most/all of these routes ^^^ }*/}
          </div>
        )}
      />
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
  }
};

export default connect(mapStateToProps, {
  submitForm: submit,
  updateQuote,
  getAgentsByAgencyCode,
  getZipcodeSettings
})(QuoteWorkflow);
