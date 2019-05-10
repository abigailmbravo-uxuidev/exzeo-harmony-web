import React from 'react';

import { renderWithReduxAndRouter, defaultProps } from '../../test-utils';
import Login from '../Login';

describe('Testing Login Component', () => {
  it('Checks the Login Component', () => {
    const { getByText } = renderWithReduxAndRouter(<Login {...defaultProps} />);

    expect(getByText(/Loading/));
    expect(defaultProps.auth.login).toHaveBeenCalled();
  });
});
