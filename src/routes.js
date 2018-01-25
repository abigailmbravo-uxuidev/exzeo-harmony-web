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
import Policy from './containers/Policy';
import PolicySearch from './containers/PolicySearch';
import AppError from './containers/AppError';
import AccessDenied from './containers/AccessDenied';
import Callback from './containers/Callback';
import NotFound from './containers/NotFound';
import PolicyDocuments from './components/PolicyDocuments/PolicyDocuments';
import * as authActions from './actions/authActions';
import * as errorActions from './actions/errorActions';

const auth = new Auth();

// logout the user if the server comesback with a 401
axios.interceptors.response.use(response => response,
  (error) => {
    if (error.response.status === 401) {
      auth.logout();
    }
    return Promise.reject(error);
  });

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
          isOpen={this.props.error.modalMessage !== undefined}
          contentLabel="Error Modal"
          className="card"
          overlayClassName="modal root-modal"
          appElement={document.getElementById('root')}
        >
          <div className="card-header"><h4><i className="fa fa-exclamation-circle" />&nbsp;Error</h4></div>
          <div className="card-block"><p>{ this.props.error.modalMessage }</p></div>
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
                path="/quote/retrieve"
                render={props => <Quote auth={auth} {...props} />}
              />
              <Route
                exact
                path="/policy"
                render={props => <PolicySearch auth={auth} {...props} />}
              />
              <Route
                exact
                path="/policy/documents"
                render={props => <PolicyDocuments auth={auth} {...props} />}
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
