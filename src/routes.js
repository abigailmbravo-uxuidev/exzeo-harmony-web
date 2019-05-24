/* eslint-disable no-multi-spaces */
/* eslint-disable max-len */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Modal from 'react-modal';
import { http as axios } from '@exzeo/core-ui';

import { setUserProfile } from './state/actions/authActions';
import { clearAppError } from './state/actions/errorActions';
import { getAgency } from './state/actions/agency.actions';

import history from './history';
import Auth from './Auth';
import QuoteModule from './modules/Quote';
import QuoteSearch from './modules/Search/Quote';

import Login from './containers/Login';
import Splash from './containers/Splash';
import PolicySearch from './modules/Search/Policy';
import AppError from './containers/AppError';
import AccessDenied from './containers/AccessDenied';
import Callback from './containers/Callback';
import NotFound from './containers/NotFound';
import Policy from './containers/Policy';
import Training from './containers/Training';
import Contacts from './containers/Contacts';

const auth = new Auth();

const handleAuthentication = (nextState) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
  else if (auth.isAuthenticated()) {
    history.replace('/');
  }
};

const checkPublicPath = (path) => {
  const publicPaths = ['/login', '/logout', '/error', '/accessDenied', '/callback'];
  return (publicPaths.indexOf(path) === -1);
};

class Routes extends Component {
  profile = null;

  componentWillMount() {
    const { isAuthenticated, userProfile, getProfile } = auth;
    if (isAuthenticated() && !userProfile && checkPublicPath(window.location.pathname)) {
      const idToken = localStorage.getItem('id_token');
      axios.defaults.headers.common['authorization'] = `bearer ${idToken}`; // eslint-disable-line
      this.profile = getProfile();
      this.props.setUserProfile(this.profile);
    } else if (!isAuthenticated() && checkPublicPath(window.location.pathname)) {
      history.replace('/login');
      axios.defaults.headers.common['authorization'] = undefined; // eslint-disable-line
    }
  }

  componentDidMount() {
    const { agency, getAgency } = this.props;
    if (!agency && this.profile && this.profile.entity && this.profile.entity.agencyCode) {
      const { entity: { agencyCode } } = this.profile;
      getAgency(agencyCode);
    }
  }

  clearError = () => {
    const { clearAppError } = this.props;
    clearAppError();
  };

  render() {
    const { error } = this.props;

    return (
      <React.Fragment>
        <Modal
          isOpen={(error && !!error.message)}
          contentLabel="Error Modal"
          className="card"
          overlayClassName="modal root-modal"
          appElement={document.getElementById('root')}>
          <div className="card-header"><h4><i className="fa fa-exclamation-circle" />&nbsp;Error</h4></div>
          <div className="card-block"><p>{error.message}</p></div>
          <div className="card-footer">
            <button className="btn-primary" onClick={this.clearError}>close</button>
          </div>
        </Modal>

        <Router>
          <React.Fragment>
            <Helmet><title>Harmony Web - Agent HO3 Quote</title></Helmet>
            <Switch>
              <Route exact path="/" render={props => <Splash auth={auth} {...props} />} />
              <Route exact path="/policy" render={props => <PolicySearch auth={auth} {...props} />} />
              <Route exact path="/login" render={props => <Login auth={auth} {...props} />} />
              <Route exact path="/error" render={props => <AppError {...props} />} />
              <Route exact path="/accessDenied" render={props => <AccessDenied auth={auth} {...props} />} />
              <Route exact path="/training" render={props => <Training auth={auth} {...props} />} />

              <Route path="/search" render={props => <QuoteSearch auth={auth} {...props} />} />
              <Route path="/quote/:quoteNumber" render={props => <QuoteModule auth={auth} {...props} />} />
              <Route path="/policy/:policyNumber" render={props => <Policy auth={auth} {...props} />} />
              <Route exact path="/contacts" render={props => <Contacts auth={auth} {...props} />} />
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
          </React.Fragment>
        </Router>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    agency: state.agencyState.agency,
    authState: state.authState,
    error: state.error,
  };
};

export default connect(mapStateToProps, {
  clearAppError,
  getAgency,
  setUserProfile,
})(Routes);
