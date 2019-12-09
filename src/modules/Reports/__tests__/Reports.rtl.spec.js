import React from 'react';
import { waitForElement } from 'react-testing-library';

import { renderWithForm, mockServiceRunner } from '../../../test-utils';

import Reports from '../Reports';

mockServiceRunner([]);

describe('Testing the Reports Page', () => {
  it('Reports Testing', async () => {
    const props = {
      match: {
        isExact: true,
        params: {},
        path: '/reports',
        url: '/reports'
      }
    };
    const { getByText } = renderWithForm(<Reports {...props} />);
    await waitForElement(() => getByText('Reports'));
    await waitForElement(() => getByText('Agency Activity'));
    await waitForElement(() => getByText('Book Of Business'));
  });
});
