import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Header from '../components/Common/Header';
import SideNav from '../components/Common/SideNav';
import * as serviceActions from '../actions/serviceActions';

const handleLogout = (props) => {
  window.persistor.purge();
  props.auth.logout();
};

const populateAgencyName = (props) => {
  const { userProfile } = props.authState;
  const { currentAgency } = props;
  if (currentAgency) {
    return `${currentAgency.displayName}`;
  }
  return (userProfile && userProfile.name) ? userProfile.name : '';
};

export class Base extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      headerActive: false
    };
    this.toggleClass = this.toggleClass.bind(this);
    this.toggleClassHeader = this.toggleClassHeader.bind(this);
  }

  componentDidMount() {
    this.props.auth.getProfile((err, result) => {
      const agency = result.agency;

      if (agency) {
        this.props.actions.serviceActions.getAgency(agency.companyCode, agency.state, agency.agencyCode);
      }
    });
  }

  toggleClass() {
    const currentState = this.state.active;
    this.setState({ headerActive: false, active: !currentState });
  }

  toggleClassHeader() {
    const currentStateHeader = this.state.headerActive;
    this.setState({ headerActive: !currentStateHeader, active: false });
  }

  render() {
    return (
      <div className={this.state.headerActive ? 'app-wrapper blur' : 'app-wrapper'} >
        <Header toggleHeader={this.toggleClassHeader} toggle={this.toggleClass} active={this.state.active} />
        <main role="document">
          <aside  className={this.state.headerActive ? 'content-panel-left active' : 'content-panel-left'}>
            <div className="user" data-test="user-info">
              <label htmlFor="user">Agency</label>
              <h5 className="user-name">
                <span><div>{ populateAgencyName(this.props) }</div></span>
                <i className="fa fa-gear" />
              </h5>
            </div>
            <SideNav params={this.props.match.params} />
            <button className="btn logout btn-action" type="button" onClick={() => handleLogout(this.props)}>
              <div>
                <i className="fa fa-sign-out" />
                <span>Logout</span>
              </div>
            </button>
          </aside>
          {this.state.headerActive ? <div className="aside-modal active" onClick={this.toggleClassHeader} /> : null}
          <div className="content-wrapper">
            {this.props.children}
          </div>
        </main>
      </div>
    );
  }
}

Base.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  auth: PropTypes.shape({ getIdToken: PropTypes.func, isAuthenticated: PropTypes.func, getProfile: PropTypes.func, userProfile: PropTypes.object }),
  actions: PropTypes.shape({
    serviceActions: PropTypes.objectOf(PropTypes.func)
  })
};

const mapStateToProps = state => ({
  tasks: state.cg,
  authState: state.authState,
  currentAgency: state.service.agency
});
const mapDispatchToProps = dispatch => ({
  actions: {
    serviceActions: bindActionCreators(serviceActions, dispatch),
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Base);
