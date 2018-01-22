import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as cgActions from '../../actions/cgActions';
// import * as policyStateActions from '../../actions/policyStateActions';
import CheckErrorConnect from '../Error/CheckError';
import PolicyWorkFlowDetailsConnect from './PolicyWorkflowDetails';
import PolicyDocumentsConnect from '../PolicyDocuments/PolicyDocuments';


export class PolicyWorkflow extends Component {

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
  }

  render() {
    return (
      <div className={'route '}>
        <PolicyWorkFlowDetailsConnect />
      Policy
      </div>);
  }
}

PolicyWorkflow.contextTypes = {
  router: PropTypes.object
};

PolicyWorkflow.propTypes = {
  selectedPolicy: PropTypes.shape()
};

const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState,
  policyState: state.policyState
});

const mapDispatchToProps = dispatch => ({
  actions: {
    cgActions: bindActionCreators(cgActions, dispatch)
   // policyStateActions: bindActionCreators(policyStateActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PolicyWorkflow);
