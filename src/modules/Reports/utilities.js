import { callService } from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';
import { http } from '@exzeo/core-ui/src';

const dateFormatter = cell => `${cell.substring(0, 10)}`;
const amountFormatter = amt =>
  amt ? `$ ${amt.toLocaleString('en', { minimumFractionDigits: 2 })}` : '';

export const REPORT_TYPES = {
  agencyActivity: 'Agency_Activity',
  bookOfBusiness: 'Book_Of_Business'
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

//TODO : grab this data from the endpoint
export const REPORT_COLUMNS = {
  [REPORT_TYPES.agencyActivity]: agencyActivityColumns,
  [REPORT_TYPES.bookOfBusiness]: bookOfBusinessColumns
};

// TODO: modify endpoint to pass in the ID then return stream for specific report
export async function downloadReport() {
  // const config = {
  //   service: 'report-service',
  //   method: 'GET',
  //   path: `v1/getBookOfBusinessReport`,
  //   streamResult: true
  // };
  // await callService(config, 'getBookOfBusinessReport');

  const config = {
    method: 'POST',
    url: `${process.env.REACT_APP_API_URL}/svc`,
    data: {
      service: 'report-service',
      method: 'GET',
      path: `v1/getBookOfBusinessReport`
    },
    responseType: 'blob'
  };

  return http(config)
    .then(response => {
      console.log(response);
      const blobUrl = window.URL.createObjectURL(response.data);
      const link = window.document.createElement('a');
      link.href = blobUrl;
      link.download = 'bookOfBusinessReport.csv';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return true;
    })
    .catch(err => {
      console.log(err);
    });
}
