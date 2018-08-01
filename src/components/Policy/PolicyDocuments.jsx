import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { format } from '@exzeo/core-ui/lib/InputLifecycle/index';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { setAppModalError } from '../../actions/errorActions';
import Downloader from '../Common/Downloader';
import PolicyTabs from '../Common/PolicyTabs';

export class PolicyDocuments extends Component {
  render() {
    const { setAppModalErrorAction } = this.props;
    const { fileNameFormatter, dateFormatter } = format;

    const attachmentUrl = attachments => (
      <span>
        { attachments.map((attachment, i) =>
          <Downloader
            fileName={fileNameFormatter(attachment.fileName)}
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
          <TableHeaderColumn width="50%" headerAlign="left" dataAlign="left" dataField="createdDate" dataFormat={dateFormatter}>Date</TableHeaderColumn>
          <TableHeaderColumn width="50%" headerAlign="left" dataAlign="left" dataField="attachments" isKey dataFormat={attachmentUrl} >Document Type</TableHeaderColumn>
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
