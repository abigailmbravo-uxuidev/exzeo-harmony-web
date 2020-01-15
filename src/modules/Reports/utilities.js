import { http, date } from '@exzeo/core-ui/src';

export const dateFormatter = cell => (cell ? `${cell.substring(0, 10)}` : '');
export const amountFormatter = amt =>
  amt ? `$ ${amt.toLocaleString('en', { minimumFractionDigits: 2 })}` : '';

export const REPORT_TYPE = {
  agencyActivity: 'Agency_Activity',
  bookOfBusiness: 'Book_Of_Business'
};

export const REPORT_ENDPOINT = {
  [REPORT_TYPE.bookOfBusiness]: 'getBookOfBusinessReport'
};

export const agencyActivityColumns = [
  { title: 'Agency Activity' },
  { title: 'Policy Number', isKey: true },
  { title: 'Product' },
  { title: 'Company Code' },
  { title: 'Effective Date', format: dateFormatter },
  { title: 'Created Date', format: dateFormatter },
  { title: 'Policyholder' },
  { title: 'Property Address' },
  { title: 'Mailing Address' },
  { title: 'Cancel Date', format: dateFormatter },
  { title: 'Total Premium', format: amountFormatter },
  { title: 'Cash Received', format: amountFormatter },
  { title: 'Agent Name' }
];

export const bookOfBusinessColumns = [
  { title: 'Agent Name' },
  { title: 'Billing Status' },
  { title: 'Cancel Date', format: dateFormatter },
  { title: 'Effective Date', format: dateFormatter },
  { title: 'Mailing Address' },
  { title: 'Policyholder' },
  { title: 'Policy Number', isKey: true },
  { title: 'Policy Status' },
  { title: 'Product' },
  { title: 'Property Address' },
  { title: 'Total Premium', format: amountFormatter }
];

//TODO : grab this data from the endpoint data when the csv is parsed on the client
export const REPORT_COLUMNS = {
  [REPORT_TYPE.agencyActivity]: agencyActivityColumns,
  [REPORT_TYPE.bookOfBusiness]: bookOfBusinessColumns
};

export function downloadReport(reportId, blob) {
  const blobUrl = window.URL.createObjectURL(blob);
  const link = window.document.createElement('a');
  link.href = blobUrl;
  link.download = `${reportId}-${date.formatToUTC()}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export async function getReportById(
  reportId,
  minDate = '',
  maxDate = '',
  errorHandler,
  responseType
) {
  const config = {
    method: 'POST',
    url: `${process.env.REACT_APP_API_URL}/svc?getReportById`,
    data: {
      service: 'report-service',
      method: 'GET',
      path: `v1/${REPORT_ENDPOINT[reportId]}?minDate=${minDate}&maxDate=${maxDate}`,
      streamResult: true
    },
    responseType
  };

  const response = await http(config).catch(err => {
    errorHandler(err.message);
  });

  return response.data;
}
