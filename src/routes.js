/* eslint-disable no-multi-spaces */
/* eslint-disable max-len */
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
import Training from './containers/Training';
import QuoteModule from './modules/Quote';
import Search from './components/Search/Search';
import ThankYou from './components/ThankYou/ThankYou';

import * as authActions from './actions/authActions';
import * as errorActions from './actions/errorActions';

const auth = new Auth();

const handleAuthentication = (nextState) => {
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
      const profile = getProfile();
      this.props.actions.authActions.setUserProfile(profile);
    } else if (!isAuthenticated() && checkPublicPath(window.location.pathname)) {
      history.replace('/login');
      axios.defaults.headers.common['authorization'] = undefined; // eslint-disable-line
    }
  }

  clearError = () => {
    this.props.actions.errorActions.clearAppError();
  };

  render() {
    return (
      <div>
        <Modal
          isOpen={(this.props.error && !!this.props.error.message)}
          contentLabel="Error Modal"
          className="card"
          overlayClassName="modal root-modal"
          appElement={document.getElementById('root')} >
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
              <Route exact path="/"                                         render={props => <Splash auth={auth} {...props} />} />
              <Route exact path="/quote"                                    render={props => <Quote auth={auth} {...props} />} />
              <Route exact path="/quote/SearchAddress"                      render={props => <Quote auth={auth} {...props}><Search {...props} /></Quote>} />
              <Route exact path="/quote/retrieve"                           render={props => <Quote auth={auth} {...props}><Search {...props} /></Quote>} />

              <Route path="/quote/:quoteNumber"     render={props => <QuoteModule auth={auth} {...props}/> } />
              <Route path="/policy/:policyNumber"   render={props => <Policy auth={auth} {...props} />} />

              <Route exact path="/policy"         render={props => <PolicySearch auth={auth} {...props} />} />
              <Route exact path="/login"          render={props => <Login auth={auth} {...props} />} />
              <Route exact path="/error"          render={props => <AppError {...props} />} />
              <Route exact path="/accessDenied"   render={props => <AccessDenied auth={auth} {...props} />} />
              <Route exact path="/training"       render={props => <Training auth={auth} {...props} />} />
              <Route exact path="/thankYou"       render={props => <Quote auth={auth} {...props}><ThankYou {...props} /></Quote>} />

              {/* <!-- This path will be added in an upcoming sprint -->
              <Route exact path="/contacts"       render={props => <Contacts auth={auth} {...props} />} /> */}
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
                }}
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
