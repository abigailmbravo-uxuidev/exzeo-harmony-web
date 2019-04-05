import React from 'react';
import 'jest-dom/extend-expect';

import { renderWithReduxAndRouter, defaultProps } from '../../../test-utils';
import ConnectedSearch from '../Search';

describe('Testing Search Component', () => {
  const props = {
    ...defaultProps,
    clearResults: () => {},
    clearQuote: () => {}
  };

  it('Contains the basic text and searchbar', () => {
    const { getByText, getByPlaceholderText } = renderWithReduxAndRouter(<ConnectedSearch {...props} />);
    expect(getByText(/If you don't see your address/));
    expect(getByPlaceholderText(/Search for Property Address/));
  });
});
