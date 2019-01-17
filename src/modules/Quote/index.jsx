import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { submit } from 'redux-form';

import { getAgency } from '../../actions/serviceActions';

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
import CheckError from '../../components/Error/CheckError';
import { WorkflowNavigation } from './WorkflowNavigation';


class Quote extends Component {
  componentDidMount() {
    // this.props.clearPolicyResults()
  }

  handlePremiumRecalc = () => {
    const { submitForm } = this.props;
    submitForm('Customize');
  };

  render() {
    const { agency, auth, authState = {}, error, isLoading, match, location } = this.props;

    return (
      <App
        agency={agency}
        auth={auth}
        match={match}
        userProfile={authState.userProfile}
        render={() => (
          <div className="workflow" role="article">
            <div className="route">
              {isLoading
                && <Loader />
              }

              <WorkflowNavigation handleRecalc={this.handlePremiumRecalc} />


              {/*{ Gandalf will be replacing most/all of these routes }*/}
              <Route exact path={`${match.url}/customerInfo`}          render={props => <CustomerInfo {...props} />} />
              <Route exact path={`${match.url}/underwriting`}          render={props => <Underwriting {...props} />} />
              <Route exact path={`${match.url}/customize`}             render={props => <Customize {...props} />} />
              <Route exact path={`${match.url}/share`}                 render={props => <Share {...props} />} />
              <Route exact path={`${match.url}/assumptions`}           render={props => <Assumptions {...props} />} />
              <Route exact path={`${match.url}/additionalInterests`}   render={props => <AddAdditionalInterest {...props} />} />
              <Route exact path={`${match.url}/askMortgagee`}          render={props => <Mortgagee {...props} />} />
              <Route exact path={`${match.url}/askAdditionalInterest`} render={props => <AdditionalInterest {...props} />} />
              <Route exact path={`${match.url}/askAdditionalInsured`}  render={props => <AdditionalInsured {...props} />} />
              <Route exact path={`${match.url}/askPremiumFinance`}     render={props => <PremiumFinance {...props} />} />
              <Route exact path={`${match.url}/askBillPayer`}          render={props => <BillPayer {...props} />} />
              <Route exact path={`${match.url}/mailingBilling`}        render={props => <Billing {...props} />} />
              <Route exact path={`${match.url}/verify`}                render={props => <Verify {...props} />} />
              <Route exact path={`${match.url}/thankYou`}              render={props => <ThankYou {...props} />} />
              <Route exact path={`${match.url}/error`}                 render={props => <Error {...props} />} />
              {/*{ ^^^ Gandalf will be replacing most/all of these routes ^^^ }*/}

              <CheckError error={error} redirectUrl={location.pathname}/>
            </div>
          </div>
        )}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authState: state.authState,
    agency: state.service.agency,
    appState: state.appState,
    error: state.error,
    isLoading: state.appState.isLoading
  }
};

export default connect(mapStateToProps, {
  getAgency,
  submitForm: submit,
})(Quote);
