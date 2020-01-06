import React from 'react';

import {
  renderWithReduxAndRouter,
  mockServiceRunner
} from '../../../test-utils';

import ReportsTable from '../ReportTable';
import {
  agencyActivityColumns,
  bookOfBusinessColumns,
  amountFormatter,
  dateFormatter
} from '../utilities';

mockServiceRunner([]);

describe('Reports Table Testing', () => {
  const testReport = {
    'Agent Name': 'WALLY WAGONER',
    'Billing Status': 'Payment Invoice Issued',
    'Cancel Date': '2020-02-05T05:00:00.000Z',
    'Effective Date': '2020-02-05T05:00:00.000Z',
    'Mailing Address': '3869 TEST ADDRESS DR SANIBEL, FL 00027',
    Policyholder: 'Batman Robin FL-S01',
    'Policy Number': '12-1015121-01',
    'Policy Status': '0',
    Product: 'AF3',
    'Property Address': '3869 TEST ADDRESS DR SANIBEL, FL 00027',
    'Total Premium': '5930'
  };

  describe('Reports Table Testing: agencyActivityColumns', () => {
    const props = {
      reportData: [testReport],
      columns: agencyActivityColumns
    };

    it('Check Columns', async () => {
      const { getByText } = renderWithReduxAndRouter(
        <ReportsTable {...props} />
      );
      agencyActivityColumns.forEach(col => expect(getByText(col.title)));
    });
  });

  describe('Reports Table Testing: bookOfBusinessColumns', () => {
    const props = {
      reportData: [testReport],
      columns: bookOfBusinessColumns
    };

    it('Check Columns', async () => {
      const { getByText } = renderWithReduxAndRouter(
        <ReportsTable {...props} />
      );
      bookOfBusinessColumns.forEach(col => expect(getByText(col.title)));
      expect(getByText(testReport['Agent Name']));
      expect(getByText(testReport['Billing Status']));
      expect(getByText(testReport['Mailing Address']));
      expect(getByText(testReport['Policy Number']));
      expect(getByText(testReport.Policyholder));
      expect(getByText(amountFormatter(testReport['Total Premium'])));
      expect(getByText(dateFormatter(testReport['Effective Date'])));
      expect(getByText(dateFormatter(testReport['Cancel Date'])));
    });
  });
});
