import React from 'react';
import { waitForElement, getAllByText } from 'react-testing-library';

import { mockServiceRunner, renderWithForm } from '../../../test-utils';

import ReportModal from '../ReportModal';
import { agencyActivityColumns } from '../utilities';

mockServiceRunner([]);

const defaultProps = {
  handleRefresh() {},
  handleCancel() {},
  handleDownload() {},
  report: {
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
  });
});
