import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import ClearErrorConnect from '../components/Error/ClearError';
import Footer from '../components/Footer';
import AppWrapper from '../components/AppWrapper';

import { date } from '@exzeo/core-ui';

const uniqueNum = date.formatToUTC();

const Splash = ({ agency, auth, match }) => {
  const status = agency && agency.status ? agency.status : null;
  const enableQuote = status === 'Active' || auth.isInternal;
  const enableRetrieve =
    status === 'Active' || status === 'Pending' || auth.isInternal;

  return (
    <AppWrapper
      auth={auth}
      match={match}
      status={status}
      routeClassName="dashboard"
      render={() => (
        <React.Fragment>
          <ClearErrorConnect />
          <div className="route">
            <div className="route-content">
              <div className="scroll">
                <div className="dashboard-message">
                  <div className="welcome-banner">
                    <h1>Hello &amp; Welcome</h1>
                    <h2>{agency && agency.displayName}</h2>
                  </div>
                  <p>
                    Getting a quote is always quick and simple with
                    <strong> TypTap Insurance</strong>. Start a quote using the
                    <strong> NEW QUOTE </strong>button. Find an existing quote
                    using the<strong> QUOTES </strong>button. Find an existing
                    policy using the<strong> POLICIES </strong>button.
                  </p>
                  <div className="launch-buttons">
                    <Link
                      to={enableQuote ? '/search/address' : '#'}
                      className={classNames('btn btn-secondary btn-block', {
                        disabled: !enableQuote
                      })}
                    >
                      <i className="fa fa-plus" />
                      New Quote
                    </Link>
                    <Link
                      to={enableRetrieve ? '/search/retrieve' : '#'}
                      className={classNames('btn btn-primary btn-block', {
                        disabled: !enableRetrieve
                      })}
                    >
                      <i className="fa fa-quote-left" />
                      Quotes
                    </Link>
                    <Link to="/policy" className="btn btn-action btn-block">
                      <i className="fa fa-file-text" />
                      Policies
                    </Link>
                  </div>
                  <div className="typtap-lg">
                    <img
                      src={`${process.env.REACT_APP_COMPANY_ASSETS_URL}/typtap/images/notification-lg.jpg?${uniqueNum}`}
                      alt="TypTap notification"
                    />
                  </div>
                  <div className="typtap-sm">
                    <img
                      src={`${process.env.REACT_APP_COMPANY_ASSETS_URL}/typtap/images/notification-sm.jpg?${uniqueNum}`}
                      alt="TypTap notification"
                    />
                  </div>
                </div>
                <Footer />
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    />
  );
};

export default Splash;
