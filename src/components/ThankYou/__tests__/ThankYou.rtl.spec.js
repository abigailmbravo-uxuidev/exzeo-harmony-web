import React from 'react';

import { defaultProps, renderWithReduxAndRouter } from '../../../test-utils';

import ThankYou from '../ThankYou';

describe('Thank You Page Testing', () => {
  it('POS:Congragulations Page Testing', () => {
    const { getByText } = renderWithReduxAndRouter(
      <ThankYou {...defaultProps} />
    );
    expect(getByText('Congrats!'));
    expect(getByText(/A copy of the application/));
    expect(getByText(/Once all policyholders have signed/));
    expect(getByText(/Signatures on the application/));
    expect(getByText(/Once the policy is issued/));
    expect(getByText(/Thank you/));
    expect(getByText(/Return to Dashboard/));
  });
});
