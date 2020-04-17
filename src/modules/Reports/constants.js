import { dateFormatter, amountFormatter } from './utilities';

export const REPORT_TYPE = {
  agencyActivity: 'Agency_Activity',
  bookOfBusiness: 'Book_Of_Business',
  pendingNonPayment: 'Pending_Non_Payment_Cancellations_Report'
};

export const REPORT_ENDPOINT = {
  [REPORT_TYPE.bookOfBusiness]: 'getBookOfBusinessReport',
  [REPORT_TYPE.pendingNonPayment]: 'pendingNonPaymentIssuedReport'
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
  { title: 'Policy Number', isKey: true },
  { title: 'Product' },
  { title: 'Policyholder' },
  { title: 'Effective Date' },
  { title: 'Cancel Date' },
  { title: 'Policy Status' },
  { title: 'Billing Status' },
  { title: 'Mailing Address' },
  { title: 'Property Address' },
  { title: 'Premium', format: amountFormatter }
];

export const pendingNonPaymentIssuedColumns = [
  { title: 'Agent Name' },
  { title: 'Policy Number', isKey: true },
  { title: 'Product' },
  { title: 'Policyholder' },
  { title: 'Effective Date' },
  { title: 'Notice Date' },
  { title: 'Final Payment Due Date' },
  { title: 'Billing Status' },
  { title: 'Mailing Address' },
  { title: 'Property Address' },
  { title: 'Premium', format: amountFormatter }
];

//TODO : grab this data from the endpoint data when the csv is parsed on the client
export const REPORT_COLUMNS = {
  [REPORT_TYPE.agencyActivity]: agencyActivityColumns,
  [REPORT_TYPE.bookOfBusiness]: bookOfBusinessColumns,
  [REPORT_TYPE.pendingNonPayment]: pendingNonPaymentIssuedColumns
};
