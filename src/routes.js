/* eslint-disable no-multi-spaces */
/* eslint-disable max-len */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Modal from 'react-modal';
import { http as axios } from '@exzeo/core-ui';

import { clearAppError } from './state/actions/errorActions';
import { getAgency } from './state/actions/agency.actions';

import history from './history';
import QuoteModule from './modules/Quote';
import PolicyModule from './modules/Policy';
import QuoteSearch from './modules/Search/Quote';

import Login from './containers/Login';
import Splash from './containers/Splash';
import PolicySearch from './modules/Search/Policy';
import AppError from './containers/AppError';
import AccessDenied from './containers/AccessDenied';
import Callback from './containers/Callback';
import NotFound from './containers/NotFound';
import Training from './containers/Training';
import Contacts from './containers/Contacts';
import Reports from 'containers/Reports';

class Routes extends Component {
  componentDidMount() {
    const { agency, getAgency, userProfile } = this.props;
    if (
      !agency &&
      userProfile &&
      userProfile.entity &&
      userProfile.entity.agencyCode
    ) {
      const {
        entity: { agencyCode }
      } = userProfile;
      getAgency(agencyCode);
    }
  }

  clearError = () => {
    const { clearAppError } = this.props;
    clearAppError();
  };

  render() {
    const { auth, agency, error, userProfile } = this.props;
    auth.isInternal =
      userProfile && userProfile.userType
        ? userProfile.userType.toLowerCase() === 'internal'
        : false;

    return (
      <React.Fragment>
        <Modal
          isOpen={error && !!error.message}
          contentLabel="Error Modal"
          className="card"
          overlayClassName="modal root-modal"
          appElement={document.getElementById('root')}
        >
          <div className="card-header">
            <h4>
              <i className="fa fa-exclamation-circle" />
              &nbsp;Error
            </h4>
          </div>
          <div className="card-block">
            <p>{error.message}</p>
          </div>
          <div className="card-footer">
            <button className="btn-primary" onClick={this.clearError}>
              close
            </button>
          </div>
        </Modal>

        <Router>
          <React.Fragment>
            <Helmet>
              <title>Harmony Web - Agency Quote</title>
            </Helmet>
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <Splash auth={auth} agency={agency} {...props} />
                )}
              />
              <Route
                exact
                path="/policy"
                render={props => (
                  <PolicySearch auth={auth} agency={agency} {...props} />
                )}
              />
              <Route
                exact
                path="/login"
                render={props => <Login auth={auth} {...props} />}
              />
              <Route
                exact
                path="/error"
                render={props => <AppError {...props} error={error} />}
              />
              <Route
                exact
                path="/accessDenied"
                render={props => <AccessDenied auth={auth} {...props} />}
              />
              <Route
                exact
                path="/training"
                render={props => <Training auth={auth} {...props} />}
              />

              <Route
                path="/search"
                render={props => (
                  <QuoteSearch auth={auth} agency={agency} {...props} />
                )}
              />
              <Route
                path="/quote/:quoteNumber"
                render={props => (
                  <QuoteModule auth={auth} agency={agency} {...props} />
                )}
              />
              <Route
                path="/policy/:policyNumber"
                render={props => <PolicyModule auth={auth} {...props} />}
              />
              <Route
                exact
                path="/contacts"
                render={props => <Contacts auth={auth} {...props} />}
              />
              <Route
                exact
                path="/reports"
                render={props => <Reports auth={auth} {...props} />}
              />
              <Route
                exact
                path="/logout"
                render={() => {
                  auth.logout();
                  return <span />;
                }}
              />
              <Route exact path="/callback" render={() => <Callback />} />

              <Route
                path="*"
                render={props => <NotFound auth={auth} {...props} />}
              />
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
    userProfile: state.authState.userProfile,
    error: state.error
  };
};

export default connect(
  mapStateToProps,
  {
    clearAppError,
    getAgency
  }
)(Routes);
