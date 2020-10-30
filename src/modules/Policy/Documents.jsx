import React from 'react';
import PropTypes from 'prop-types';
import {
  date as dateUtils,
  SectionLoader,
  BootstrapTable
} from '@exzeo/core-ui';
import Downloader from '../../components/Downloader';
import { useFetchPolicyDocuments } from './hooks';
import { usePolicyWorkflow } from './context';

const Documents = ({ initialValues }) => {
  const { policyNumber, property } = initialValues;
  const { setAppModalError: setError } = usePolicyWorkflow();

  const { policyDocuments } = useFetchPolicyDocuments(policyNumber, setError);

  const formatAttachmentUrl = attachment => (
    <span>
      <Downloader
        key={attachment.fileUrl}
        fileName={attachment.fileName}
        fileUrl={attachment.fileUrl}
        fileType={attachment.fileType}
        errorHandler={err => setError(err.message)}
      />
    </span>
  );

  const formatDate = (val, row, rowIndex, timezone) =>
    dateUtils.formattedDate(
      dateUtils.moment.unix(val),
      dateUtils.FORMATS.PRIMARY_LOCALE,
      timezone
    );

  const timezone = property?.timezone ?? 'America/New_York';

  const columns = [
    {
      text: 'Date',
      headerClasses: 'date',
      columnClassName: 'date',
      align: 'left',
      headerAlign: 'left',
      dataField: 'createdDate',
      formatter: formatDate,
      formatExtraData: timezone,
      sort: true
    },
    {
      text: 'Document Type',
      headerClasses: 'document-type',
      columnClassName: 'document-type',
      align: 'left',
      headerAlign: 'left',
      dataField: 'fileName',
      formatter: (cell, row) => formatAttachmentUrl(row),
      sort: true
    }
  ];

  if (!policyDocuments) {
    return <SectionLoader />;
  }

  return (
    <BootstrapTable
      keyField="fileUrl"
      data={policyDocuments}
      columns={columns}
      defaultSorted={[{ dataField: 'createdDate', order: 'desc' }]}
      noDataIndication="There is no data to display"
      classes="table-responsive table-striped policy-documents"
      bordered={false}
      striped
      hover
    />
  );
};

Documents.propTypes = {
  initialValues: PropTypes.object
};

export default Documents;
