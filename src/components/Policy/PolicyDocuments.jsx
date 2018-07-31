import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { setAppModalError } from '../../actions/errorActions';
import Downloader from '../Common/Downloader';
import PolicyTabs from '../Common/PolicyTabs';

export const dateFormatter = cell => `${moment.unix(cell).format('MM/DD/YYYY')}`;
export const nameFormatter = cell => `${String(cell.match(/^(.+?)-/g)).replace('-', '')}`;

export class PolicyDocuments extends Component {
  render() {
    const { setAppModalErrorAction } = this.props;
    const attachmentUrl = attachments => (
      <span>
        { attachments.map((attachment, i) =>
          <Downloader
            fileName={nameFormatter(attachment.fileName)}
            fileUrl={attachment.fileUrl}
            fileType={attachment.fileType}
            errorHandler={err => setAppModalErrorAction(err.message)}
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

    const { policyNumber } = this.props;
    return (
      <React.Fragment>
        <PolicyTabs activeTab="documents" policyNumber={policyNumber} />
        <BootstrapTable className="table-responsive table-striped" data={policyDocuments}>
          <TableHeaderColumn className="created-date" columnClassName="created-date" dataField="createdDate" dataFormat={dateFormatter}>Date</TableHeaderColumn>
          <TableHeaderColumn className="attachments" columnClassName="attachments" dataField="attachments" isKey dataFormat={attachmentUrl} >Document Type</TableHeaderColumn>
        </BootstrapTable>
      </React.Fragment>);
  }
}

PolicyDocuments.propTypes = {
  policyDocuments: PropTypes.shape(),
  policyNumber: PropTypes.string,
  setAppModalErrorAction: PropTypes.func
};

export default connect(null, { setAppModalErrorAction: setAppModalError })(PolicyDocuments);
