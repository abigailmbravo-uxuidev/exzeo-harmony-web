import React from 'react';

import { mockServiceRunner, renderWithForm } from '../../../test-utils';

import ReportModal from '../ReportModal';
import { agencyActivityColumns } from '../utilities';

mockServiceRunner([]);

const defaultProps = {
  handleRefresh() {},
  handleCancel() {},
  handleDownload() {},
  report: {
    title: 'Book Of Business',
    columns: agencyActivityColumns
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

    const fromLabel = getByTestId('from_label');
    expect(fromLabel).toHaveTextContent('From');

    const toLabel = getByTestId('to_label');
    expect(toLabel).toHaveTextContent('To');

    const title = getByTestId('modal-title');
    expect(title).toHaveTextContent('Book Of Business');
  });
});
