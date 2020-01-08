import React from 'react';

import { mockServiceRunner, renderWithForm } from '../../../test-utils';

import ReportModal from '../ReportModal';
import { agencyActivityColumns, bookOfBusinessColumns } from '../utilities';

mockServiceRunner([]);

const defaultProps = {
  handleRefresh() {},
  handleCancel() {},
  handleDownload() {},
  report: {
    title: 'Agency Activity Report',
    columns: agencyActivityColumns,
    minDate: '01/01/2019',
    maxDate: '01/01/2020'
  },
  auth: {},
  match: {
    isExact: true,
    params: {},
    path: '/reports',
    url: '/reports'
  }
};

describe('Testing the Reports Modal', () => {
  it('Reports Modal Testing', async () => {
    const props = {
      ...defaultProps
    };
    const { getByTestId } = renderWithForm(<ReportModal {...props} />);
    const modalIcon = getByTestId('modal-icon');
    expect(modalIcon.className).toEqual('fa fa-calendar');

    const title = getByTestId('modal-title');
    expect(title).toHaveTextContent('Agency Activity Report');

    const fromLabel = getByTestId('from_label');
    expect(fromLabel).toHaveTextContent('From');

    const toLabel = getByTestId('to_label');
    expect(toLabel).toHaveTextContent('To');

    const minDate = getByTestId('from');
    expect(minDate.type).toEqual('date');

    const maxDate = getByTestId('to');
    expect(maxDate.type).toEqual('date');
  });

  it('Reports Modal Testing with min and max dates', async () => {
    const newProps = {
      ...defaultProps,
      report: {
        title: 'Book Of Business',
        columns: bookOfBusinessColumns
      }
    };

    const { getByTestId } = renderWithForm(<ReportModal {...newProps} />);
    const modalIcon = getByTestId('modal-icon');
    expect(modalIcon.className).toEqual('fa fa-calendar');

    const title = getByTestId('modal-title');
    expect(title).toHaveTextContent('Book Of Business');
  });
});
