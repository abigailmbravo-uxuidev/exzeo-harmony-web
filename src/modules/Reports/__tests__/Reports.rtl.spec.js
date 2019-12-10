import React from 'react';
import { waitForElement, getAllByTestId } from 'react-testing-library';

import { renderWithForm, mockServiceRunner } from '../../../test-utils';

import Reports from '../Reports';

mockServiceRunner([]);

const defaultProps = {
  auth: {},
  match: {
    isExact: true,
    params: {},
    path: '/reports',
    url: '/reports'
  }
};

describe('Testing the Reports Page', () => {
  it('Reports Header Testing', async () => {
    const props = {
      ...defaultProps
    };
    const { getByText } = renderWithForm(<Reports {...props} />);
    const header = getByText('Reports');

    await waitForElement(() => header);

    const iconElement = Object.values(header.childNodes).find(
      node => node.tagName === 'I'
    );
    expect(iconElement.className).toEqual('fa fa-table');
  });

  it('Reports Section 1 Testing', async () => {
    const props = {
      ...defaultProps
    };
    const { getByTestId } = renderWithForm(<Reports {...props} />);
    expect(getByTestId('Agency_Activity_title')).toHaveTextContent(
      /Agency Activity/
    );
    expect(getByTestId('Agency_Activity_details')).toHaveTextContent(/\w/);
    expect(getByTestId('Agency_Activity_run_report')).toHaveTextContent(
      /RUN REPORT/
    );
  });
});
