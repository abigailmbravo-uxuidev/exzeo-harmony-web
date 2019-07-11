import React from 'react';

import { defaultProps, renderWithReduxAndRouter } from '../../../test-utils';

import ThankYou from '../ThankYou';

describe('Thank You Page Testing', () => {
  it('POS:Congragulations Page Testing', () => {
    const { getByText } = renderWithReduxAndRouter(
      <ThankYou {...defaultProps} />
    );
    expect(getByText('Congrats!'));
    expect(getByText(/Policyholder 1 will be receiving an e-mail/));
    expect(
      getByText(
        /A copy of the application packet will also be sent to your e-mail/
      )
    );
    expect(getByText(/Once all policyholders have signed, the policy/));
    expect(
      getByText(/Signatures on the application must be complete within 10 days/)
    );
    expect(
      getByText(/Once the policy is issued, a copy of the full policy packet/)
    );
    expect(getByText(/Thank you for your business!/));
    expect(getByText(/Return to Dashboard/));
  });

  it('POS:Checks Submit Button', () => {
    const { getByText } = renderWithReduxAndRouter(
      <ThankYou {...defaultProps} />
    );

    expect(getByText('Return to Dashboard')).toHaveAttribute('href', '/');
  });
});
