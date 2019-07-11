import React from 'react';
import { func, shape, string } from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { SideNavigation } from '@exzeo/core-ui/src/@Harmony';
import { Button } from '@exzeo/core-ui';

import { getNavLinks } from '../utilities/navigation';

import Header from './Header';
import CheckError from './Error/CheckError';

class AppWrapper extends React.Component {
  state = {
    activeSideNav: false
  };

  handleLogout = () => {
    window.persistor.purge();
    this.props.logout();
  };

  toggleSideNav = () => {
    this.setState(state => ({ activeSideNav: !state.activeSideNav }));
  };

  render() {
    const {
      errorRedirectUrl,
      match,
      routeClassName,
      userDisplayName
    } = this.props;

    return (
      <div
        className={classNames('app-wrapper', {
          active: this.state.activeSideNav
        })}
      >
        <Header toggleSideNav={this.toggleSideNav} active={this.state.active} />
        <div role="main">
          <aside className="content-panel-left">
            <div className="user" data-test="user-info">
              <label htmlFor="user">Agency</label>
              <h5 className="user-name">
                <span>
                  <div>{userDisplayName}</div>
                </span>
                <i className="fa fa-gear" />
              </h5>
            </div>

            <nav className="site-nav">
              <SideNavigation
                navLinks={getNavLinks({ params: match.params })}
              />
            </nav>

            <Button
              className={Button.constants.classNames.action}
              customClass="logout"
              onClick={this.handleLogout}
              data-test="sidenav-logout"
            >
              <div>
                <i className="fa fa-sign-out" />
                <span>Logout</span>
              </div>
            </Button>
          </aside>

          {this.state.activeSideNav && (
            <div className="aside-modal active" onClick={this.toggleSideNav} />
          )}

          <div className="content-wrapper">
            <div className={classNames(routeClassName)} role="article">
              {this.props.children || this.props.render()}
            </div>
          </div>
        </div>

        <CheckError redirectUrl={errorRedirectUrl} />
      </div>
    );
  }
}

AppWrapper.propTypes = {
  logout: func.isRequired,
  match: shape({
    params: shape({})
  }).isRequired,
  displayName: string,
  errorRedirectUrl: string,
  render: func,
  routeClassName: string
};

AppWrapper.defaultProps = {
  displayName: '',
  errorRedirectUrl: undefined,
  routeClassName: 'workflow'
};

const mapStateToProps = state => {
  const userDisplayName =
    (state.agencyState.agency || {}).displayName ||
    (state.authState.userProfile || {}).name;
  return {
    userDisplayName
  };
};

export default connect(mapStateToProps)(AppWrapper);
