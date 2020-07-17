import React from 'react';
import { Link } from 'react-router-dom';
import { date } from '@exzeo/core-ui';
import classNames from 'classnames';

import { useUser } from '../context/user-context';
import { userResources } from '../utilities/userResources';
import ClearError from './ClearError';
import Footer from './Footer';
import AppWrapper from './AppWrapper';

const uniqueNum = date.formatToUTC();

const Splash = ({ agency }) => {
  const userProfile = useUser();
  const { enableQuote, enableRetrieve } = userResources(userProfile, agency);
  return (
    <AppWrapper routeClassName="dashboard">
      <React.Fragment>
        <ClearError />
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
                  <Link
                    to="/search/policy"
                    className="btn btn-action btn-block"
                  >
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
    </AppWrapper>
  );
};

export default Splash;
