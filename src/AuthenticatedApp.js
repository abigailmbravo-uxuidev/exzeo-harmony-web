/* eslint-disable no-multi-spaces */
/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Modal from 'react-modal';
import { Loader } from '@exzeo/core-ui';
import { ReceiptHandler } from '@exzeo/core-ui/src/@Harmony';

import { getAgency } from './state/actions/agency.actions';
import { clearAppError, setAppModalError } from './state/actions/errorActions';
import { createQuote, retrieveQuote } from './state/actions/quoteState.actions';

import Reports from './modules/Reports';
import Search from './modules/Search';

import { useAuth0 } from './context/auth-context';
import { useUser } from './context/user-context';
import { userResources } from './utilities/userResources';

import Splash from './components/Splash';
import AppError from './components/AppError';
import NotFound from './components/NotFound';
import Training from './components/Training';
import Contacts from './components/Contacts';

const QuoteModule = React.lazy(() => import('./modules/Quote'));
const PolicyModule = React.lazy(() => import('./modules/Policy'));

function AuthenticatedApp({
  agency,
  error,
  createQuote,
  retrieveQuote,
  clearAppErrorAction,
  getAgencyAction,
  setModalErrorAction
}) {
  const { logout } = useAuth0();
  const userProfile = useUser();
  const { enableReports } = userResources(userProfile, agency);

  useEffect(() => {
    if (!agency && (userProfile.entity || {}).agencyCode) {
      getAgencyAction(userProfile.entity.agencyCode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfile, agency]);

  return (
    <React.Suspense fallback={<Loader />}>
      <Helmet>
        <title>Harmony Web - Agency Quote</title>
      </Helmet>
      <Switch>
        <Route
          exact
          path="/"
          render={props => <Splash agency={agency} {...props} />}
        />
        <Route
          path="/search"
          render={props => (
            <Search
              agency={agency}
              createQuote={createQuote}
              retrieveQuote={retrieveQuote}
              {...props}
            />
          )}
        />
        <Route
          path="/quote/:quoteNumber"
          render={props => (
            <QuoteModule agency={agency} userProfile={userProfile} {...props} />
          )}
        />
        <Route
          path="/policy/:policyNumber"
          render={props => <PolicyModule {...props} />}
        />
        <Route
          exact
          path="/training"
          render={props => <Training {...props} />}
        />
        <Route
          exact
          path="/contacts"
          render={props => <Contacts {...props} />}
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
              <Reports {...props} errorHandler={setModalErrorAction} />
            )}
          />
        )}

        <Route
          exact
          path="/error"
          render={props => <AppError {...props} error={error} />}
        />

        <Route
          exact
          path="/logout"
          render={() => {
            window.persistor.purge();
            logout({ returnTo: window.location.origin });
            return null;
          }}
        />

        <Route exact path="/login" render={() => <Redirect to="/" />} />

        <Route path="*" render={props => <NotFound {...props} />} />
      </Switch>

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
          <button className="btn-primary" onClick={() => clearAppErrorAction()}>
            close
          </button>
        </div>
      </Modal>
    </React.Suspense>
  );
}

const mapStateToProps = state => {
  return {
    agency: state.agencyState.agency,
    error: state.error
  };
};

export default connect(mapStateToProps, {
  createQuote,
  retrieveQuote,
  clearAppErrorAction: clearAppError,
  getAgencyAction: getAgency,
  setModalErrorAction: setAppModalError
})(AuthenticatedApp);
