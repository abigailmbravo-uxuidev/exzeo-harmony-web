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

import { ROUTE_TO_STEP_NAME } from './constants/choreographer';

export class QuoteWorkflow extends Component {
  state = {
    isRecalc: false,
  };

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

  render() {
    const { auth, history, isLoading, match, location, uiQuestions } = this.props;
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
            <Route exact path={`${match.url}/customerInfo`}          render={props => <CustomerInfo {...props} uiQuestions={uiQuestions} updateQuote={this.handleUpdateQuote} />} />
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
    quote: state.quoteState.quote || {},
    workflowState: state.quoteState.state || {},
    uiQuestions,
  }
};

export default connect(mapStateToProps, {
  submitForm: submit,
  updateQuote,
})(QuoteWorkflow);
