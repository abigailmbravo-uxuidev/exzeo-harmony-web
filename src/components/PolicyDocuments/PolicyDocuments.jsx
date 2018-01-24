import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import localStorage from 'localStorage';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import PolicyConnect from '../../containers/Policy';
import * as policyStateActions from '../../actions/policyStateActions';
import * as serviceActions from '../../actions/serviceActions';

const dateFormatter = cell => `${moment.unix(cell).format('MM/DD/YYYY')}`;
const nameFormatter = cell => `${String(cell.match(/^(.+?)-/g)).replace('-', '')}`;


export class PolicyDocuments extends Component {

  componentDidMount() {
    const isNewTab = localStorage.getItem('isNewTab', true);
    if (isNewTab) {
      const policyNumber = localStorage.getItem('policyNumber');
      this.props.actions.policyStateActions.updatePolicy(true, policyNumber);
      localStorage.setItem('isNewTab', false);
      this.props.actions.serviceActions.getPolicyDocuments(policyNumber);
    } else if (this.props.policy && this.props.policy.policyNumber) {
      this.props.actions.policyStateActions.updatePolicy(true, this.props.policy.policyNumber);
      this.props.actions.serviceActions.getPolicyDocuments(this.props.policy.policyNumber);
    }
  }

  render() {
    return (
      <PolicyConnect {...this.props}>
        <BootstrapTable data={this.props.policyDocuments || []}>
          <TableHeaderColumn dataField="createdDate" dataFormat={dateFormatter}>Date</TableHeaderColumn>
          <TableHeaderColumn dataField="fileName" isKey dataFormat={nameFormatter}>Document Type</TableHeaderColumn>
          <TableHeaderColumn dataField="fileUrl">File URL</TableHeaderColumn>
        </BootstrapTable>
      </PolicyConnect>);
  }
}

PolicyDocuments.contextTypes = {
  router: PropTypes.object
};

PolicyDocuments.propTypes = {
  policy: PropTypes.shape(),
  actions: PropTypes.shape()
};

const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState,
  policyDocuments: state.service.policyDocuments
});

const mapDispatchToProps = dispatch => ({
  actions: {
    policyStateActions: bindActionCreators(policyStateActions, dispatch),
    serviceActions: bindActionCreators(serviceActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PolicyDocuments);
