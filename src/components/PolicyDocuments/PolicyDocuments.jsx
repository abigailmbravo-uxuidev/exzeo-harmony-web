import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import localStorage from 'localStorage';
import PolicyConnect from '../../containers/Policy';
import * as policyStateActions from '../../actions/policyStateActions';
import * as serviceActions from '../../actions/serviceActions';

export class PolicyDocuments extends Component {

  componentDidMount() {
    const isNewTab = localStorage.getItem('isNewTab', true);
    if (isNewTab) {
      const policyNumber = localStorage.getItem('policyNumber');
      this.props.actions.policyStateActions.updatePolicy(true, policyNumber);
      localStorage.setItem('isNewTab', false);
    }
  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    return (
      <PolicyConnect {...this.props}>
       Policy Documents
      </PolicyConnect>);
  }
}

PolicyDocuments.contextTypes = {
  router: PropTypes.object
};

PolicyDocuments.propTypes = {
  actions: PropTypes.shape()
};

const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState
});

const mapDispatchToProps = dispatch => ({
  actions: {
    policyStateActions: bindActionCreators(policyStateActions, dispatch),
    serviceActions: bindActionCreators(serviceActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PolicyDocuments);
