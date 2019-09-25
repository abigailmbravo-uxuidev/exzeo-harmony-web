import React from 'react';
import { connect } from 'react-redux';
import { func, object, shape, string } from 'prop-types';
import classNames from 'classnames';
import { SideNavigation } from '@exzeo/core-ui/src/@Harmony';
import { date, Button } from '@exzeo/core-ui';

import { getNavLinks } from '../utilities/navigation';
import Header from './Header';
import CheckError from './Error/CheckError';

class AppWrapper extends React.Component {
  state = {
    activeSideNav: false
  };

  handleLogout = () => {
    window.persistor.purge();
    this.props.auth.logout();
  };

  toggleSideNav = () => {
    this.setState(state => ({ activeSideNav: !state.activeSideNav }));
  };

  render() {
    const {
      auth,
      agency,
      errorRedirectUrl,
      match,
      routeClassName
    } = this.props;

    const isInternal = auth && auth.isInternal;
    const status = agency && agency.status ? agency.status : null;
    const enableQuote = status === 'Active' || isInternal;
    const enableRetrieve =
      status === 'Active' || status === 'Pending' || isInternal;

    return (
      <div
        className={classNames('app-wrapper', {
          active: this.state.activeSideNav
        })}
      >
        <Header toggleSideNav={this.toggleSideNav} active={this.state.active} />
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
                  enableRetrieve
                )}
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
  auth: object.isRequired,
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

const mapStateToProps = state => ({
  agency: state.agencyState.agency
});

export default connect(mapStateToProps)(AppWrapper);
