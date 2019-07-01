import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { defaultMemoize } from 'reselect';
import { date } from '@exzeo/core-ui';

import Downloader from '../../components/Common/Downloader';


const Documents = (props) => {
  const { options, customHandlers } = props;

  const getPolicyDocuments = defaultMemoize(policyDocuments =>
    policyDocuments.map(({ attachments, ...rest }) => ({
      ...rest,
      attachments: [{ ...rest }]
    })));

  const attachmentUrl = defaultMemoize(attachments => (
    <span>
      {attachments.map((attachment, i) =>
        <Downloader
          key={i}
          fileName={(attachment.fileName)}
          fileUrl={attachment.fileUrl}
          fileType={attachment.fileType}
          errorHandler={err => customHandlers.setAppModalError(err.message)}
        />
      )}
    </span>
  ));

  const policyDocs = getPolicyDocuments(options.policyDocuments);

  const sortAttachments = (a, b, order) => {
    const aComesLater = a.attachments[0].fileName > b.attachments[0].fileName;
    return order === 'desc' ?
      (aComesLater ? -1 : 1) :
      (aComesLater ? 1 : -1);
  };

  return (
    <BootstrapTable className="table-responsive table-striped policy-documents" data={policyDocs}
    options={{ sortName: 'createdDate', sortOrder: 'desc' }} 
    >
      <TableHeaderColumn className="date" columnClassName="date" headerAlign="left" dataAlign="left" dataField="createdDate" dataFormat={x => date.toLocaleDate(x)} dataSort >Date</TableHeaderColumn>
      <TableHeaderColumn className="document-type" columnClassName="document-type" headerAlign="left" dataAlign="left" dataField="attachments" isKey dataFormat={attachmentUrl} dataSort sortFunc={sortAttachments}>Document Type</TableHeaderColumn>
    </BootstrapTable>
  );
};

export default Documents;
