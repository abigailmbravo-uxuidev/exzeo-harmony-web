import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

export class PolicyDocuments extends Component {

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
  }

  render() {
    return (
      <div>
       Policy Documents
      </div>);
  }
}

PolicyDocuments.contextTypes = {
  router: PropTypes.object
};

PolicyDocuments.propTypes = {
};

const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState,
  selectedPolicy: state.selectedPolicy
});

const mapDispatchToProps = dispatch => ({
  actions: {
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PolicyDocuments);
