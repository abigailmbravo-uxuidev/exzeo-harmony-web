import { noop } from '@exzeo/core-ui/src';
import { callService } from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';

const dateFormatter = cell => `${cell.substring(0, 10)}`;
const amountFormatter = amt =>
  amt ? `$ ${amt.toLocaleString('en', { minimumFractionDigits: 2 })}` : '';

export const REPORT_TYPES = {
  agencyActivity: 'Agency_Activity',
  bookOfBusiness: 'Book_Of_Business'
};

export const REPORT_LINK = {
  [REPORT_TYPES.agencyActivity]: noop, // Currently unavailable
  [REPORT_TYPES.bookOfBusiness]: getBookOfBusinessReport
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

// TODO: modify endpoint pass in the ID then return stream for specific report
async function getBookOfBusinessReport() {
  const config = {
    service: 'report',
    method: 'GET',
    path: `v1/getBookOfBusinessReport`,
    streamResult: true
  };
  await callService(config, 'getBookOfBusinessReport');
}
