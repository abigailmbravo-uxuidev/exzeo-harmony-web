import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { date } from '@exzeo/core-ui';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Downloader from '../Common/Downloader';
import PolicyTabs from '../Common/PolicyTabs';

const { toLocaleDate } = date;

export class PolicyDocuments extends Component {
  render() {
    const { setAppModalErrorAction, policyNumber, policyDocuments } = this.props;

    const attachmentUrl = attachments => (
      <span>
        { attachments.map((attachment, i) =>
          <Downloader
            fileName={(attachment.fileName)}
            fileUrl={attachment.fileUrl}
            fileType={attachment.fileType}
            errorHandler={err => setAppModalErrorAction(err.message)}
            key={i}
          />
        )}
      </span>
    );

    policyDocuments.forEach((doc) => {
      doc.attachments = [];
      doc.attachments.push(doc);
      return doc;
    });

    return (
      <React.Fragment>
        <PolicyTabs activeTab="documents" policyNumber={policyNumber} />
        <BootstrapTable className="table-responsive table-striped policy-documents" data={policyDocuments} options={{ sortName: 'createdDate', sortOrder: 'desc' }}>
          <TableHeaderColumn className="date" columnClassName="date" headerAlign="left" dataAlign="left" dataField="createdDate" dataFormat={toLocaleDate} dataSort >Date</TableHeaderColumn>
          <TableHeaderColumn className="document-type" columnClassName="document-type" headerAlign="left" dataAlign="left" dataField="attachments" isKey dataFormat={attachmentUrl} >Document Type</TableHeaderColumn>
        </BootstrapTable>
      </React.Fragment>);
  }
}

PolicyDocuments.defaultProps = {
  policyDocuments: []
};

PolicyDocuments.propTypes = {
  policyDocuments: PropTypes.array,
  policyNumber: PropTypes.string,
  setAppModalErrorAction: PropTypes.func
};

export default PolicyDocuments;
