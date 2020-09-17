import React from 'react';

import {
  render,
  defaultProps,
  additionalInterest
} from '../../../../test-utils';
import AdditionalInterestDetails from '../AdditionalInterestDetails';

describe('Verify Page Additional Interest Details Card Testing', () => {
  it('Renders an ai card', () => {
    const props = {
      ...defaultProps,
      additionalInterests: [
        { ...additionalInterest, _id: '1234', type: 'Mortgagee' }
      ]
    };
    const { additionalInterests } = props;
    const { getByText } = render(<AdditionalInterestDetails {...props} />);

    expect(
      getByText(
        `${additionalInterests[0].name1} ${additionalInterests[0].name2}`
      )
    );
    expect(
      getByText(
        `${additionalInterests[0].mailingAddress.address1}, ${additionalInterests[0].mailingAddress.city}, ${additionalInterests[0].mailingAddress.state} ${additionalInterests[0].mailingAddress.zip}`
      )
    );
    expect(
      getByText(
        `${additionalInterests[0].type} ${additionalInterests[0].order + 1}`
      )
    );
    // expect(getByText('Reference Number'));
    expect(
      document.querySelector(`i.fa.fa-circle.${additionalInterests[0].type}`)
    ).toBeInTheDocument();
  });

  it('Works even with bad data', () => {
    const props = {
      ...defaultProps,
      additionalInterests: [
        {
          _id: '',
          name1: '',
          mailingAddress: { address1: '', city: '', state: '', zip: '' },
          order: 0,
          type: 'Mortgagee',
          active: true
        }
      ]
    };
    const { additionalInterests } = props;
    const { getByText, queryAllByText } = render(
      <AdditionalInterestDetails {...props} />
    );

    expect(
      getByText(
        `${additionalInterests[0].type} ${additionalInterests[0].order + 1}`
      )
    );
    // Expect no text that says "undefined" in ui
    expect(queryAllByText(/undefined/).length).toBe(0);
  });
});
