// src/routes.js
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';
import { Cookies } from 'react-cookie';

import Login from './containers/Login';
import Splash from './containers/Splash';
import Quote from './containers/Quote';
import AppError from './containers/AppError';
import NotFound from './containers/NotFound';

import * as userActions from './actions/userActions';

export const validateLogin = () => {
  const cookies = new Cookies();
  const token = cookies.get('harmony-id-token');
  if (token) {
    const user = { token, isAuthenticated: true, loggedOut: false };
    return true;
  }
  return false;
};

// A higher order component that allows for checking the routes authentication prefs.
function authHOC(NavComponent, redirectUrl, props) {
  return class AuthHOC extends React.Component { // eslint-disable-line
    render() {
      if (props.isAuthenticated) {
        return <NavComponent {...props} />;
      }
      return <Login redirectUrl={redirectUrl} />;
    }
  };
}

class Routes extends Component { // eslint-disable-line
  constructor(props) {
    super(props);
    this.props.actions.user.validateLogin();
  }
  render() {
    return (
      <Router>
        <div>
          <Helmet><title>Harmony Web - Agent HO3 Quote</title></Helmet>
          <Switch>
            <Route exact path="/" component={authHOC(Splash, `http://${window.location.host}/`, this.props)} />
            <Route exact path="/quote" component={authHOC(Quote, `http://${window.location.host}/quote`, this.props)} />
            <Route exact path="/quote/retrieve" component={authHOC(Quote, `http://${window.location.host}/quote/retrieve`, this.props)} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/error" component={AppError} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  isAuthenticated: validateLogin()
});

const mapDispatchToProps = dispatch => ({
  actions: {
    user: bindActionCreators(userActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
