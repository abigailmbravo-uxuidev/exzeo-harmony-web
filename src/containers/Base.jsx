import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Header from '../components/Common/Header';
import SideNav from '../components/Common/SideNav';
import * as userActions from '../actions/userActions';

const handleLogout = (props) => {
  props.actions.user.logout();
};

class Base extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
      headerActive: false
    };
    this.toggleClass = this.toggleClass.bind(this);
    this.toggleClassHeader = this.toggleClassHeader.bind(this);
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
              <label htmlFor="user">User</label>
              <h5 className="user-name">
                <span>TTIC20000@typtap.com</span>
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
          <div className={this.state.headerActive ? 'aside-modal active' : 'aside-modal'} onClick={this.toggleClassHeader}></div>
          <div className="content-wrapper">
            {this.props.children}
          </div>
        </main>
      </div>
    );
  }
}


Base.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

const mapStateToProps = state => ({
  user: state.user
});
const mapDispatchToProps = dispatch => ({
  actions: {
    user: bindActionCreators(userActions, dispatch)
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(Base);
