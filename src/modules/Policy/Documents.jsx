import React, { useEffect, useState } from 'react';
import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { date, SectionLoader } from '@exzeo/core-ui';

import Downloader from '../../components/Downloader';

function formatPolicyDocuments(documents) {
  return documents.map(({ attachments, ...rest }) => ({
    ...rest,
    attachments: [{ ...rest }]
  }));
}

function sortAttachments(a, b, order) {
  const aComesLater = a.attachments[0].fileName > b.attachments[0].fileName;
  return order === 'desc' ? (aComesLater ? -1 : 1) : aComesLater ? 1 : -1;
}

const Documents = ({ initialValues, customHandlers }) => {
  const [policyDocuments, setPolicyDocuments] = useState();
  useEffect(() => {
    async function fetchPolicyDocuments() {
      try {
        const config = {
          service: 'file-index',
          method: 'GET',
          path: `v1/fileindex/${initialValues.policyNumber}`
        };
        const response = await serviceRunner.callService(
          config,
          'getPolicyDocuments'
        );
        const documents = formatPolicyDocuments(response.data.result);
        setPolicyDocuments(documents);
      } catch (error) {
        customHandlers.setAppModalError(error);
      }
    }

    fetchPolicyDocuments();
  }, [initialValues.policyNumber, customHandlers]);

  const formatAttachmentUrl = attachments => (
    <span>
      {attachments.map((attachment, i) => (
        <Downloader
          key={i}
          fileName={attachment.fileName}
          fileUrl={attachment.fileUrl}
          fileType={attachment.fileType}
          errorHandler={err => customHandlers.setAppModalError(err.message)}
        />
      ))}
    </span>
  );

  if (!policyDocuments) {
    return <SectionLoader />;
  }

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
        dataFormat={x => date.toLocaleDate(x)}
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
        dataFormat={formatAttachmentUrl}
        dataSort
        sortFunc={sortAttachments}
      >
        Document Type
      </TableHeaderColumn>
    </BootstrapTable>
  );
};

export default Documents;
