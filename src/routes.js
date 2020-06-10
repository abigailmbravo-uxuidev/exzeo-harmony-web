import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Modal from 'react-modal';

import { clearAppError, setAppModalError } from './state/actions/errorActions';
import { getAgency as getAgencyAction } from './state/actions/agency.actions';
import { createQuote, retrieveQuote } from './state/actions/quoteState.actions';

import QuoteModule from './modules/Quote';
import PolicyModule from './modules/Policy';
import Reports from './modules/Reports';
import Search from './modules/Search';

import Login from './containers/Login';
import Splash from './containers/Splash';
import AppError from './containers/AppError';
import AccessDenied from './containers/AccessDenied';
import Callback from './containers/Callback';
import NotFound from './containers/NotFound';
import Training from './containers/Training';
import Contacts from './containers/Contacts';
import { userResources } from './utilities/userResources';
import ReceiptHandler from '@exzeo/core-ui/src/@Harmony/OnlinePayments/@components/ReceiptHandler';

class Routes extends Component {
  componentDidMount() {
    const { agency, getAgency, userProfile = {} } = this.props;
    if (!agency && (userProfile.entity || {}).agencyCode) {
      getAgency(userProfile.entity.agencyCode);
    }
  }

  componentDidUpdate(prevProps) {
    const { agency, getAgency, userProfile = {} } = this.props;
    if (!prevProps.userProfile) {
      if (!agency && (userProfile.entity || {}).agencyCode) {
        getAgency(userProfile.entity.agencyCode);
      }
    }
  }

  clearError = () => {
    const { clearAppErrorAction } = this.props;
    clearAppErrorAction();
  };

  render() {
    const {
      auth,
      agency,
      createQuote,
      error,
      retrieveQuote,
      setAppModalError,
      userProfile
    } = this.props;
    const { enableReports } = userResources(userProfile, agency);

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

        <React.Fragment>
          <Helmet>
            <title>Harmony Web - Agency Quote</title>
          </Helmet>
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <Splash
                  auth={auth}
                  agency={agency}
                  userProfile={userProfile}
                  {...props}
                />
              )}
            />
            <Route
              path="/search"
              render={props => (
                <Search
                  auth={auth}
                  agency={agency}
                  userProfile={userProfile}
                  createQuote={createQuote}
                  retrieveQuote={retrieveQuote}
                  {...props}
                />
              )}
            />
            <Route
              path="/quote/:quoteNumber"
              render={props => <QuoteModule auth={auth} {...props} />}
            />
            <Route
              path="/policy/:policyNumber"
              render={props => <PolicyModule auth={auth} {...props} />}
            />
            <Route
              exact
              path="/training"
              render={props => <Training auth={auth} {...props} />}
            />
            <Route
              exact
              path="/contacts"
              render={props => <Contacts auth={auth} {...props} />}
            />
            <Route
              path="/receipt"
              render={props => <ReceiptHandler {...props} />}
            />
            {enableReports && (
              <Route
                exact
                path="/reports"
                render={props => (
                  <Reports
                    auth={auth}
                    errorHandler={setAppModalError}
                    {...props}
                  />
                )}
              />
            )}
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

export default connect(mapStateToProps, {
  createQuote,
  retrieveQuote,
  setAppModalError,
  clearAppErrorAction: clearAppError,
  getAgency: getAgencyAction
})(Routes);
