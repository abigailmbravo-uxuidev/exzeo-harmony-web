import React from 'react';

import { renderWithReduxAndRouter, defaultProps } from '../../test-utils';
import Login from '../Login';

describe('Testing Login Component', () => {
  it('Checks the Login Component', () => {
    const { getByTestId } = renderWithReduxAndRouter(
      <Login {...defaultProps} />
    );

    expect(getByTestId('loader'));
    expect(defaultProps.auth.login).toHaveBeenCalled();
  });
});
