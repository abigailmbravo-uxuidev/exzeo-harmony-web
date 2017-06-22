// src/routes.js
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import history from './history';
import Auth from './Auth';

import Login from './containers/Login';
import Splash from './containers/Splash';
import Quote from './containers/Quote';
import AppError from './containers/AppError';
import AccessDenied from './containers/AccessDenied';
import Callback from './containers/Callback';
import NotFound from './containers/NotFound';

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

export default class Routes extends Component { // eslint-disable-line
  componentWillMount() {
    const { isAuthenticated, userProfile, getProfile } = auth;
    if (isAuthenticated() && !userProfile && checkPublicPath(window.location.pathname)) {
      getProfile((err, profile) => {
        const idToken = localStorage.getItem('id_token');
        axios.defaults.headers.common['authorization'] = `bearer ${idToken}`; // eslint-disable-line
        if (!auth.checkIfCSRGroup()) {
          history.push('/accessDenied?error=Please login with the proper credentials.');
        }
      });
    } else if (!isAuthenticated() && checkPublicPath(window.location.pathname)) {
      history.push('/login');
      axios.defaults.headers.common['authorization'] = undefined; // eslint-disable-line
    }
  }
  render() {
    return (
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
    );
  }
}
