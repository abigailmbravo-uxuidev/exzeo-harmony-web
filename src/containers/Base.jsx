import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import Header from '../components/Common/Header';
import SideNav from '../components/Common/SideNav';
import * as cgActions from '../actions/cgActions';
import * as userActions from '../actions/userActions';

const getAgencyModelName = 'getAgency';

const handleLogout = (props) => {
  window.persistor.purge(); // i hate this with my entire being...
  props.actions.user.logout();
};

const getAgencyName = (props) => {
  if (props.user && props.user.isAuthenticated) {
    const group = (props.user.profile.groups) ? _.filter(props.user.profile.groups, item => item.extendedProperties.isAgency) : null;
    if (group && group.length > 0) {
      const startModelData = {
        agencyCode: group[0].extendedProperties.agencyId,
        companyCode: group[0].extendedProperties.companyCode,
        state: group[0].extendedProperties.state
      };
      props.actions.cgActions.startWorkflow(getAgencyModelName, startModelData, false);
    }
  }
};

const populateAgencyName = (props) => {
  if (props.tasks && props.tasks.getAgency && props.tasks.getAgency.data &&
    props.tasks.getAgency.data.model && props.tasks.getAgency.data.model.variables) {
    const agencyValue = _.filter(props.tasks.getAgency.data.model.variables, item => item.name === 'getAgencyByCode');
    if (agencyValue.length > 0) {
      const data = agencyValue[0].value.result;
      return data.displayName;
    }
  }
  return (props.user.profile && props.user.profile.username) ? props.user.profile.username : '';
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
  componentWillMount() {
    getAgencyName(this.props);
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
          <aside activeClassName="active" className={this.state.headerActive ? 'content-panel-left active' : 'content-panel-left'}>
            <div className="user">
              <label htmlFor="user">Agency</label>
              <h5 className="user-name">
                <span><div>{ populateAgencyName(this.props) }</div></span>
                <i className="fa fa-gear" />
              </h5>
            </div>
            <SideNav />
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
        <form id="floodQuoteForm" name="floodQuoteForm" method="post" action={process.env.REACT_APP_AQA_SSO_URL} target="_blank">
          <input type="hidden" name="token" value={this.props.user.token} />
        </form>
      </div>);
  }
}

Base.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  user: PropTypes.shape({
    token: PropTypes.string
  })
};

const mapStateToProps = state => ({
  tasks: state.cg,
  user: state.user
});
const mapDispatchToProps = dispatch => ({
  actions: {
    cgActions: bindActionCreators(cgActions, dispatch),
    user: bindActionCreators(userActions, dispatch)
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(Base);
