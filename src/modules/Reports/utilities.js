const dateFormatter = cell => `${cell.substring(0, 10)}`;
const amountFormatter = amt =>
  amt ? `$ ${amt.toLocaleString('en', { minimumFractionDigits: 2 })}` : '';
3;

export const agencyActivityColumns = [
  { title: 'Agency Activity' },
  { title: 'Policy Number', isKey: true },
  { title: 'Product' },
  { title: 'Created Date', format: dateFormatter },
  { title: 'Effective Date', format: dateFormatter },
  { title: 'PolicyHolder' },
  { title: 'Address' }
];
export const bookOfBusinessColumns = [
  { title: 'textbox10' },
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
