import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { date } from '@exzeo/core-ui';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Downloader from '../Common/Downloader';

const { toLocaleDate } = date;

export class PolicyDocuments extends Component {
  render() {
    const { setAppModalErrorAction, policyDocuments } = this.props;

    const attachmentUrl = attachments => (
      <span>
        {attachments.map((attachment, i) => (
          <Downloader
            key={i}
            fileName={attachment.fileName}
            fileUrl={attachment.fileUrl}
            fileType={attachment.fileType}
            errorHandler={err => setAppModalErrorAction(err.message)}
          />
        ))}
      </span>
    );

    policyDocuments.forEach(doc => {
      doc.attachments = [];
      doc.attachments.push(doc);
      return doc;
    });

    return (
      <BootstrapTable
        className="table-responsive table-striped policy-documents"
        data={policyDocuments}
        options={{ sortName: 'createdDate', sortOrder: 'desc' }}
      >
        <TableHeaderColumn
          className="date"
          columnClassName="date"
          headerAlign="left"
          dataAlign="left"
          dataField="createdDate"
          dataFormat={x => toLocaleDate(x)}
          dataSort
        >
          Date
        </TableHeaderColumn>
        <TableHeaderColumn
          className="document-type"
          columnClassName="document-type"
          headerAlign="left"
          dataAlign="left"
          dataField="attachments"
          isKey
          dataFormat={attachmentUrl}
        >
          Document Type
        </TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

PolicyDocuments.defaultProps = {
  policyDocuments: []
};

PolicyDocuments.propTypes = {
  policyDocuments: PropTypes.array,
  setAppModalErrorAction: PropTypes.func
};

export default PolicyDocuments;
