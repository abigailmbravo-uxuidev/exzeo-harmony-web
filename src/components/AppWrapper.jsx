import React from 'react';
import classNames from 'classnames';
import { Button } from '@exzeo/core-ui';

import { getAgency } from '../actions/serviceActions';

import Header from './Common/Header';
import SideNav from './Common/SideNav';
import CheckError from './Error/CheckError';

class AppWrapper extends React.Component {
  state = {
    activeSideNav: false,
  };

  componentDidMount() {
    const { userProfile } = this.props;
    const { agency } = userProfile;
    if (agency) {
      getAgency(agency.companyCode, agency.state, agency.agencyCode);
    }
  };

  handleLogout = () => {
    window.persistor.purge();
    this.props.auth.logout();
  };

  getAgencyName = () => {
    const { agency, userProfile } = this.props;
    if (agency) {
      return agency.displayName;
    }
    return userProfile.name || '';
  };

  toggleSideNav = () => {
    this.setState(state => ({ activeSideNav: !state.activeSideNav }))
  };

  render() {
    const {
      errorRedirectUrl,
      match,
    } = this.props;

    return (
      <div className={classNames('app-wrapper', { 'active': this.state.activeSideNav })}>
        <Header
          toggleSideNav={this.toggleSideNav}
          active={this.state.active}
        />
        <main role="document">
          <aside className="content-panel-left">
            <div className="user">
              <label htmlFor="user">Agency</label>
              <h5 className="user-name">
                <span><div>{this.getAgencyName()}</div></span>
                <i className="fa fa-gear" />
              </h5>
            </div>
            <SideNav params={match.params} />
            <Button
              baseClass="action"
              customClass="logout"
              onClick={this.handleLogout}
              data-test="sidenav-logout">
              <div>
                <i className="fa fa-sign-out" />
                <span>Logout</span>
              </div>
            </Button>
          </aside>

          {this.state.activeSideNav &&
            <div className="aside-modal active" onClick={this.toggleSideNav} />
          }

          <div className="content-wrapper">
            {this.props.render()}
          </div>
        </main>

        <CheckError redirectUrl={errorRedirectUrl}/>
      </div>
    );
  }
}

AppWrapper.defaultProps = {
  userProfile: {}
};

export default AppWrapper;
