import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import PolicyConnect from '../../containers/Policy';
import * as policyStateActions from '../../actions/policyStateActions';
import * as serviceActions from '../../actions/serviceActions';
import * as errorActions from '../../actions/errorActions';
import Downloader from '../Common/Downloader';

const dateFormatter = cell => `${moment.unix(cell).format('MM/DD/YYYY')}`;
const nameFormatter = cell => `${String(cell.match(/^(.+?)-/g)).replace('-', '')}`;

export class PolicyDocuments extends Component {

  componentDidMount() {
    const policyNumber = _.get(this.props, 'location.state.policyNumber');
    if (policyNumber) {
      this.props.actions.policyStateActions.updatePolicy(true, policyNumber);
      this.props.actions.serviceActions.getPolicyDocuments(policyNumber);
    } else {
      window.location = '/';
    }
  }


  render() {
    const attachmentUrl = attachments => (
      <span>
        { attachments.map((attachment, i) =>
          <Downloader
            fileName={attachment.fileName}
            fileUrl={attachment.fileUrl}
            fileType={attachment.fileType}
            errorHandler={err => this.props.actions.errorActions.setAppModalError(err.message)}
            key={i}
          />
        )}
      </span>
    );


    const policyDocuments = _.map(this.props.policyDocuments, (doc) => {
      doc.attachments = [];
      doc.attachments.push(doc);
      return doc;
    });

    return (
      <PolicyConnect {...this.props}>

        <BootstrapTable className="table-responsive" data={policyDocuments}>
          <TableHeaderColumn dataField="createdDate" dataFormat={dateFormatter}>Date</TableHeaderColumn>
          <TableHeaderColumn dataField="fileName" isKey dataFormat={nameFormatter}>Document Type</TableHeaderColumn>
          <TableHeaderColumn className="attachments" columnClassName="attachments" dataField="attachments" dataFormat={attachmentUrl} dataSort >Attachments</TableHeaderColumn>
        </BootstrapTable>

      </PolicyConnect>);
  }
}

PolicyDocuments.contextTypes = {
  router: PropTypes.object
};

PolicyDocuments.propTypes = {
  location: PropTypes.shape(),
  policy: PropTypes.shape(),
  actions: PropTypes.shape()
};

const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState,
  policyDocuments: state.service.policyDocuments || []
});

const mapDispatchToProps = dispatch => ({
  actions: {
    errorActions: bindActionCreators(errorActions, dispatch),
    policyStateActions: bindActionCreators(policyStateActions, dispatch),
    serviceActions: bindActionCreators(serviceActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PolicyDocuments);
