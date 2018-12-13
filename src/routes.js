// src/routes.js
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import Modal from 'react-modal';
import history from './history';
import Auth from './Auth';
import Login from './containers/Login';
import Splash from './containers/Splash';
import Quote from './containers/Quote';
import PolicySearch from './containers/PolicySearch';
import AppError from './containers/AppError';
import AccessDenied from './containers/AccessDenied';
import Callback from './containers/Callback';
import NotFound from './containers/NotFound';
import Policy from './containers/Policy';
import * as authActions from './actions/authActions';
import * as errorActions from './actions/errorActions';

import CustomerInfo from './components/CustomerInfo/CustomerInfo';
import Search from './components/Search/Search';
import Underwriting from './components/Underwriting/Underwriting';
import Customize from './components/Customize/Customize';
import Share from './components/Share/Share';
import AddAdditionalInterest from './components/AdditionalInterests/AddAdditionalInterest';
import Assumptions from './components/Assumptions/Assumptions';
import Mortgagee from './components/AdditionalInterests/Mortgagee';

import BillPayer from './components/AdditionalInterests/BillPayer';
import PremiumFinance from './components/AdditionalInterests/PremiumFinance';
import AdditionalInsured from './components/AdditionalInterests/AdditionalInsured';
import AdditionalInterest from './components/AdditionalInterests/AdditionalInterest';

import Billing from './components/Billing/Billing';
import Verify from './components/Verify/Verify';
import ThankYou from './components/ThankYou/ThankYou';
import Error from './components/Error/Error';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
};

const checkPublicPath = (path) => {
  const publicPaths = ['/login', '/logout', '/error', '/accessDenied', '/callback'];
  return (publicPaths.indexOf(path) === -1);
};

class Routes extends Component { // eslint-disable-line
  componentWillMount() {
    const { isAuthenticated, userProfile, getProfile } = auth;
    if (isAuthenticated() && !userProfile && checkPublicPath(window.location.pathname)) {
      const idToken = localStorage.getItem('id_token');
      axios.defaults.headers.common['authorization'] = `bearer ${idToken}`; // eslint-disable-line
      getProfile((err, profile) => {
        this.props.actions.authActions.dispatchUserProfile(profile);
      });
    } else if (!isAuthenticated() && checkPublicPath(window.location.pathname)) {
      history.push('/login');
      axios.defaults.headers.common['authorization'] = undefined; // eslint-disable-line
    }
  }
  clearError = () => this.props.actions.errorActions.clearAppError();
  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.error && this.props.error.message}
          contentLabel="Error Modal"
          className="card"
          overlayClassName="modal root-modal"
          appElement={document.getElementById('root')}
        >
          <div className="card-header"><h4><i className="fa fa-exclamation-circle" />&nbsp;Error</h4></div>
          <div className="card-block"><p>{ this.props.error.message }</p></div>
          <div className="card-footer">
            <button className="btn-primary" onClick={this.clearError}>close</button>
          </div>
        </Modal>
        <Router>
          <div>
            <Helmet><title>Harmony Web - Agent HO3 Quote</title></Helmet>
            <Switch>
              <Route
                exact
                path="/"
                render={props => <Splash auth={auth} {...props} />}
              />
              <Route
                exact
                path="/quote"
                render={props => <Quote auth={auth} {...props} />}
              />
              <Route
                exact
                path="/quote/SearchAddress"
                render={props => <Quote auth={auth} {...props}><Search {...props} /></Quote>}
              />
              <Route
                exact
                path="/quote/retrieve"
                render={props => <Quote auth={auth} {...props}><Search {...props} /></Quote>}
              />
              <Route
                exact
                path="/quote/:quoteNumber/customerInfo"
                render={props => <Quote auth={auth} {...props}><CustomerInfo {...props} /></Quote>}
              />
              <Route
                exact
                path="/quote/:quoteNumber/underwriting"
                render={props => <Quote auth={auth} {...props}><Underwriting {...props} /></Quote>}
              />
              <Route
                exact
                path="/quote/:quoteNumber/customize"
                render={props => <Quote auth={auth} {...props}><Customize {...props} /></Quote>}
              />
              <Route
                exact
                path="/quote/:quoteNumber/share"
                render={props => <Quote auth={auth} {...props}><Share {...props} /></Quote>}
              />
              <Route
                exact
                path="/quote/:quoteNumber/assumptions"
                render={props => <Quote auth={auth} {...props}><Assumptions {...props} /></Quote>}
              />
              <Route
                exact
                path="/quote/:quoteNumber/additionalInterests"
                render={props => <Quote auth={auth} {...props}><AddAdditionalInterest {...props} /></Quote>}
              />
              <Route
                exact
                path="/quote/:quoteNumber/askMortgagee"
                render={props => <Quote auth={auth} {...props}><Mortgagee {...props} /></Quote>}
              />
              <Route
                exact
                path="/quote/:quoteNumber/askAdditionalInterest"
                render={props => <Quote auth={auth} {...props}><AdditionalInterest {...props} /></Quote>}
              />
              <Route
                exact
                path="/quote/:quoteNumber/askAdditionalInsured"
                render={props => <Quote auth={auth} {...props}><AdditionalInsured {...props} /></Quote>}
              />
              <Route
                exact
                path="/quote/:quoteNumber/askPremiumFinance"
                render={props => <Quote auth={auth} {...props}><PremiumFinance {...props} /></Quote>}
              />
              <Route
                exact
                path="/quote/:quoteNumber/askBillPayer"
                render={props => <Quote auth={auth} {...props}><BillPayer {...props} /></Quote>}
              />
              <Route
                exact
                path="/quote/:quoteNumber/mailingBilling"
                render={props => <Quote auth={auth} {...props}><Billing {...props} /></Quote>}
              />
              <Route
                exact
                path="/quote/:quoteNumber/verify"
                render={props => <Quote auth={auth} {...props}><Verify {...props} /></Quote>}
              />
              <Route
                exact
                path="/quote/:quoteNumber/thankYou"
                render={props => <Quote auth={auth} {...props}><ThankYou {...props} /></Quote>}
              />
              <Route
                exact
                path="/quote/:quoteNumber/error"
                render={props => <Quote auth={auth} {...props}><Error {...props} /></Quote>}
              />
              {/* <Route
                exact
                path="/quote/retrieve"
                render={props => <Quote auth={auth} {...props} />}
              /> */}
              <Route
                exact
                path="/policy"
                render={props => <PolicySearch auth={auth} {...props} />}
              />
              <Route
                path="/policy/:policyNumber"
                render={props => <Policy auth={auth} {...props} />}
              />
              <Route exact path="/login" render={props => <Login auth={auth} {...props} />} />
              <Route exact path="/error" component={AppError} />
              <Route exact path="/accessDenied" render={props => <AccessDenied auth={auth} {...props} />} />
              <Route
                exact
                path="/logout"
                render={() => {
                  auth.logout();
                  return <span />;
                }}
              />
              <Route
                exact
                path="/callback"
                render={(props) => {
                  handleAuthentication(props);
                  return <Callback {...props} />;
                }
            }
              />
              <Route path="*" render={props => <NotFound auth={auth} {...props} />} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: state.error
});

const mapDispatchToProps = dispatch => ({
  actions: {
    authActions: bindActionCreators(authActions, dispatch),
    errorActions: bindActionCreators(errorActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
