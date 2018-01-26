import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as serviceActions from '../../actions/serviceActions';
import PolicyWorkFlowDetailsConnect from './PolicyWorkflowDetails';


export class PolicyWorkflow extends Component {

  componentDidMount() {
    this.props.actions.serviceActions.clearPolicyResults();
  }

  componentWillReceiveProps(nextProps) {
  }

  render() {
    const { children } = this.props;
    return (
      <div className="route policy-detail">
        <PolicyWorkFlowDetailsConnect />
        <div className="route-content">
          <div className="scroll">
            <div className="detail-wrapper">
              <nav className="nav-tabs">
<<<<<<< HEAD
                <button className="btn btn-tab active"><i className="fa fa-file-text-o"></i>Documents</button>
=======
                <button className="btn btn-tab active"><i className="fa fa-file-text-o" />Documents</button>
                <button className="btn btn-tab"><i className="fa fa-circle" />Another Tab</button>
>>>>>>> 43b76810d4d67a9c488acfb37d84423169a12662
              </nav>
              {children}
            </div>
          </div>
        </div>
      </div>);
  }
}

PolicyWorkflow.contextTypes = {
  router: PropTypes.object
};

PolicyWorkflow.propTypes = {
  selectedPolicy: PropTypes.shape(),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState,
  policyState: state.policyState
});

const mapDispatchToProps = dispatch => ({
  actions: {
    serviceActions: bindActionCreators(serviceActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PolicyWorkflow);
