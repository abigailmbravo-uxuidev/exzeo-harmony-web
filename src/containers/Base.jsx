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
    props.tasks.getAgency.data.previousTask && props.tasks.getAgency.data.previousTask.value &&
    props.tasks.getAgency.data.previousTask.value.result) {
    const data = props.tasks.getAgency.data.previousTask.value.result;
    return data.displayName;
  }
  return (props.user.profile) ? props.user.profile.username : '';
};

export class Base extends Component {
  componentWillMount() {
    getAgencyName(this.props);
  }

  render() {
    return (
      <div className="app-wrapper">
        <Header />
        <main role="document">
          <aside className="content-panel-left">
            <div className="user">
              <label htmlFor="user">Agency</label>
              <h5 className="user-name">
                <span>{ populateAgencyName(this.props) }</span>
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
          <div className="content-wrapper">
            {this.props.children}
          </div>
        </main>
      </div>);
  }
}

Base.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

const mapStateToProps = state => ({
  tasks: state.cg,
  user: state.user,
  agencyName: getAgencyName(state.user)
});
const mapDispatchToProps = dispatch => ({
  actions: {
    cgActions: bindActionCreators(cgActions, dispatch),
    user: bindActionCreators(userActions, dispatch)
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(Base);
