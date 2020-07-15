import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { func, object, shape, string } from 'prop-types';
import classNames from 'classnames';
import { SideNavigation } from '@exzeo/core-ui/src/@Harmony';
import { date, Button } from '@exzeo/core-ui';

import { getNavLinks } from '../utilities/navigation';
import { useAuth0 } from '../context/auth-context';
import { useUser } from '../context/user-context';
import { userResources } from '../utilities/userResources';

import CheckError from './CheckError';
import Header from './Header';

function AppWrapper({
  agency,
  children,
  errorRedirectUrl,
  routeClassName = 'workflow'
}) {
  const [activeSideNav, setSideNav] = useState(false);
  const userProfile = useUser();
  const history = useHistory();
  const match = useRouteMatch();

  function handleLogout() {
    history.replace('/logout');
  }

  const { enableQuote, enableReports, enableRetrieve } = userResources(
    userProfile,
    agency
  );

  return (
    <div
      className={classNames('app-wrapper', {
        active: activeSideNav
      })}
    >
      <Header toggleSideNav={() => setSideNav(state => !state.activeSideNav)} />
      <div role="main">
        <aside className="content-panel-left">
          <div className="date-wrapper" data-test="date-wrapper">
            <label htmlFor="date">Date</label>
            <h5 className="date">
              <span>
                <div>{date.currentDay('ddd MM/DD/YYYY')}</div>
              </span>
            </h5>
          </div>
          <nav className="site-nav">
            <SideNavigation
              navLinks={getNavLinks(
                match.params,
                enableQuote,
                enableRetrieve,
                enableReports
              )}
            />
          </nav>
          <Button
            className={Button.constants.classNames.action}
            customClass="logout"
            onClick={handleLogout}
            data-test="logout"
          >
            <div>
              <i className="fa fa-sign-out" />
              <span>Logout</span>
            </div>
          </Button>
        </aside>

        {activeSideNav && (
          <div
            className="aside-modal active"
            onClick={() => setSideNav(state => !state.activeSideNav)}
          />
        )}

        <div className="content-wrapper">
          <div className={classNames(routeClassName)} role="article">
            {children}
          </div>
        </div>
      </div>

      <CheckError redirectUrl={errorRedirectUrl} />
    </div>
  );
}

AppWrapper.propTypes = {
  errorRedirectUrl: string,
  routeClassName: string
};

const mapStateToProps = state => ({
  agency: state.agencyState.agency
});

export default connect(mapStateToProps)(AppWrapper);
