import React from 'react';
import { waitForElement } from 'react-testing-library';

import {
  renderWithReduxAndRouter,
  mockServiceRunner
} from '../../../test-utils';

import ReportsTable from '../ReportTable';
import { agencyActivityColumns, bookOfBusinessColumns } from '../utilities';

mockServiceRunner([]);

describe('Reports Table Testing: agencyActivityColumns', () => {
  const props = {
    reportData: [],
    columns: agencyActivityColumns
  };

  it('Check Columns', async () => {
    const { getByText } = renderWithReduxAndRouter(<ReportsTable {...props} />);
    agencyActivityColumns.forEach(col => expect(getByText(col.title)));
  });
});

describe('Reports Table Testing: bookOfBusinessColumns', () => {
  const props = {
    reportData: [],
    columns: bookOfBusinessColumns
  };

  it('Check Columns', async () => {
    const { getByText } = renderWithReduxAndRouter(<ReportsTable {...props} />);
    bookOfBusinessColumns.forEach(col => expect(getByText(col.title)));
  });
});
