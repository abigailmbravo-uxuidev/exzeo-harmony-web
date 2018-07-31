import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import * as policyStateActions from '../../actions/policyStateActions';
import * as serviceActions from '../../actions/serviceActions';
import * as errorActions from '../../actions/errorActions';
import Loader from '../Common/Loader';
import PolicyTabs from '../Common/PolicyTabs';

export const dateFormatter = cell => `${moment.unix(cell).format('MM/DD/YYYY')}`;
export const nameFormatter = cell => `${String(cell.match(/^(.+?)-/g)).replace('-', '')}`;

export class Property extends Component {
  render() {
    const { policy, policyNumber } = this.props;
    if (!policy || !policy.policyID) {
      return (<Loader />);
    }

    return (
      <React.Fragment>
        <PolicyTabs activeTab="property" policyNumber={policyNumber} />
      </React.Fragment>);
  }
}

Property.contextTypes = {
  router: PropTypes.object
};

Property.propTypes = {
  policy: PropTypes.shape(),
  policyNumber: PropTypes.string
};

const mapStateToProps = state => ({
  policy: state.service.latestPolicy
});

export default connect(mapStateToProps, null)(Property);
