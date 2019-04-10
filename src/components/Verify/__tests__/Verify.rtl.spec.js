import React from 'react';
import 'jest-dom/extend-expect';
import { fireEvent } from 'react-testing-library';

import {
  defaultProps,
  defaultInitialState,
  renderWithReduxAndRouter,
  testHelpers,
  quote
} from '../../../test-utils';

import ConnectedVerify from '../Verify';

// TODO: Return to this test once Verify has been updated to use reusable component structure
describe('Verify Testing', () => {
  const props = {
    ...defaultProps,
    location: {
      pathname: '/quote/1/mailingBilling'
    }
  };

  const state = {
    ...defaultInitialState,
    quoteState: {
      ...defaultInitialState.quoteState,
      quote
    }
  };

  it('should render', () => {
    const { getByText } = renderWithReduxAndRouter(<ConnectedVerify {...props} />, { state });
    expect(getByText('Property Details'));
  });
});
