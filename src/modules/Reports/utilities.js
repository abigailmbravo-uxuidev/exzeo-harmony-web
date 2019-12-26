import { callService } from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';
import { http, date } from '@exzeo/core-ui/src';

const dateFormatter = cell => `${cell.substring(0, 10)}`;
const amountFormatter = amt =>
  amt ? `$ ${amt.toLocaleString('en', { minimumFractionDigits: 2 })}` : '';

export const REPORT_TYPES = {
  agencyActivity: 'Agency_Activity',
  bookOfBusiness: 'Book_Of_Business'
};

export const REPORT_ENDPOINTS = {
  [REPORT_TYPES.bookOfBusiness]: 'v1/getBookOfBusinessReport'
};

export const agencyActivityColumns = [
  { title: 'Agency Activity' },
  { title: 'Policy Number', isKey: true },
  { title: 'Product' },
  { title: 'Company Code' },
  { title: 'Effective Date', format: dateFormatter },
  { title: 'Created Date', format: dateFormatter },
  { title: 'PolicyHolder' },
  { title: 'Property Address' },
  { title: 'Mailing Address' },
  { title: 'Cancel Date', format: dateFormatter },
  { title: 'Total Premium', format: amountFormatter },
  { title: 'Cash Received', format: amountFormatter },
  { title: 'Agent Name', format: amountFormatter }
];

export const bookOfBusinessColumns = [
  { title: 'Agent Name' },
  { title: 'Policy Number', isKey: true },
  { title: 'PolicyHolder' },
  { title: 'Product' },
  { title: 'Mailing Address' },
  { title: 'Property Address' },
  { title: 'Effective Date', format: dateFormatter },
  { title: 'Cancel Date', format: dateFormatter },
  { title: 'Total Premium', format: amountFormatter },
  { title: 'Policy Status' },
  { title: 'Billing Status' }
];

//TODO : grab this data from the endpoint data when the csv is parsed on the client
export const REPORT_COLUMNS = {
  [REPORT_TYPES.agencyActivity]: agencyActivityColumns,
  [REPORT_TYPES.bookOfBusiness]: bookOfBusinessColumns
};

export async function downloadReport(reportId) {
  const config = {
    method: 'POST',
    url: `${process.env.REACT_APP_API_URL}/svc`,
    data: {
      service: 'report-service',
      method: 'GET',
      path: REPORT_ENDPOINTS[reportId],
      streamResult: true
    },
    responseType: 'blob'
  };

  return await http(config)
    .then(response => {
      const blobUrl = window.URL.createObjectURL(response.data);
      const link = window.document.createElement('a');
      link.href = blobUrl;
      link.download = `${reportId}-${date.formatToUTC()}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return true;
    })
    .catch(err => {
      console.log(err);
    });
}
