import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as serviceActions from '../../actions/serviceActions';
import PolicyWorkFlowDetailsConnect from './PolicyWorkflowDetails';
import PolicyDocuments from '../PolicyDocuments/PolicyDocuments';

export class PolicyWorkflow extends Component {

  componentDidMount() {
    this.props.actions.serviceActions.clearPolicyResults();
  }

  render() {
    const { auth, match: { params: { policyNumber }, url } } = this.props;
    return (
      <div className="route policy-detail">
        <PolicyWorkFlowDetailsConnect policyNumber={policyNumber} />
        <div className="route-content">
          <div className="scroll">
            <div className="detail-wrapper">
              <Route exact path={`${url}/documents`} render={() => <PolicyDocuments auth={auth} policyNumber={policyNumber} />} />
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
