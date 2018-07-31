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
import Downloader from '../Common/Downloader';
import Loader from '../Common/Loader';
import PolicyTabs from '../Common/PolicyTabs';

export const dateFormatter = cell => `${moment.unix(cell).format('MM/DD/YYYY')}`;
export const nameFormatter = cell => `${String(cell.match(/^(.+?)-/g)).replace('-', '')}`;

export class Coverage extends Component {
  render() {
    const { policy, policyNumber } = this.props;
    if (!policy || !policy.policyID) {
      return (<Loader />);
    }

    return (
      <React.Fragment>
        <PolicyTabs activeTab="coverage" policyNumber={policyNumber} />
      </React.Fragment>);
  }
}

Coverage.contextTypes = {
  router: PropTypes.object
};

Coverage.propTypes = {
  policy: PropTypes.shape(),
  policyNumber: PropTypes.string
};

const mapStateToProps = state => ({
  policy: state.service.latestPolicy
});

export default connect(mapStateToProps, null)(Coverage);
