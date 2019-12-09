import React from 'react';
import { waitForElement } from 'react-testing-library';

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
    const { getByText, getAllByText } = renderWithForm(<Reports {...props} />);
    await waitForElement(() => getByText('Reports'));
    const header = getAllByText('Reports').pop();

    const iconElement = Object.values(header.childNodes).find(
      node => node.tagName === 'I'
    );
    expect(iconElement.className).toEqual('fa fa-table');
  });
});
