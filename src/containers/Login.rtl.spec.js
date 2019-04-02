import React from 'react';
import 'jest-dom/extend-expect';
import { renderWithReduxAndRouter, defaultProps } from 'test-utils';

import Login from './Login';

describe('Testing Login Component', () => {
  it('tests', () => {
    const { getByText } = renderWithReduxAndRouter(<Login {...defaultProps} />);
    expect(getByText(/Loading/));
    expect(defaultProps.auth.login).toHaveBeenCalled();
  });
});
