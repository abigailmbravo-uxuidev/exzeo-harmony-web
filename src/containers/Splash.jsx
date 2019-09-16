import React from 'react';
import { Link } from 'react-router-dom';

import ClearErrorConnect from '../components/Error/ClearError';
import Footer from '../components/Footer';
import AppWrapper from '../components/AppWrapper';

import { date } from '@exzeo/core-ui';

const uniqueNum = date.formatToUTC();

const Splash = ({ auth, match, userDisplayName }) => (
  <AppWrapper
    logout={auth.logout}
    match={match}
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
                  <h2>Name Here</h2>
                </div>
                <p>
                  Getting a quote is always quick and simple with
                  <strong> TypTap Insurance </strong>. Start a quote or find an
                  existing quote using the <strong>START NEW QUOTE</strong> and
                  <strong> RETRIEVE QUOTE </strong> buttons below. Find a policy
                  using the <strong> RETRIEVE POLICY </strong> button below.
                </p>
                <div className="launch-buttons">
                  <Link
                    to="/search/address"
                    className="btn btn-secondary btn-block"
                  >
                    <i className="fa fa-plus" />
                    New Quote
                  </Link>
                  <Link
                    to="/search/retrieve"
                    className="btn btn-primary btn-block"
                  >
                    <i className="fa fa-history" />
                    Retrieve Quote
                  </Link>
                  <Link to="/policy" className="btn btn-action btn-block">
                    <i className="fa fa-history" />
                    Retrieve Policy
                  </Link>
                </div>
              </div>

              <div className="survey-wrapper">
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

export default Splash;
