import React from 'react';
import { render } from 'react-testing-library';
import AdditionalInterestDetails from '../AdditionalInterestDetails';

import { defaultProps, additionalInterest } from '../../../../test-utils';

describe('Additional Interest Details Card Testing', () => {
  it('Renders an ai card', () => {
    const props = {
      ...defaultProps,
      additionalInterests: [{ ...additionalInterest, _id: '1234' }]
    };
    const { getByText } = render(<AdditionalInterestDetails {...props} />);

    expect(getByText(additionalInterest.name1));
    expect(getByText(additionalInterest.name2));
    expect(getByText(additionalInterest.mailingAddress.address1));
    expect(getByText(`${additionalInterest.mailingAddress.city}, ${additionalInterest.mailingAddress.state} ${additionalInterest.mailingAddress.zip}`));
    expect(getByText(`${additionalInterest.type} ${additionalInterest.order + 1}`));
    expect(getByText('Reference Number'));
    expect(document.querySelector('.icon-wrapper i.fa.Mortgagee')).toBeInTheDocument();
  });

  it('Works even with bad data', () => {
    const props = {
      ...defaultProps,
      additionalInterests: [{
        _id: '', name1: '',
        mailingAddress: { address1: '', city: '', state: '', zip: '' },
        order: 0, type: 'Mortgagee'
      }]
    };
    const { getByText, queryAllByText } = render(<AdditionalInterestDetails {...props} />);

    expect(getByText('Mortgagee 1'));
    // Expect no text that says "undefined" in ui
    expect(queryAllByText(/undefined/).length).toBe(0);
  });
});
