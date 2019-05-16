import React from 'react';
import { render, fireEvent } from 'react-testing-library';

import { checkHeader, latestPolicy, getSummaryLedger } from '../../../test-utils';
import Billing from '../Billing';

const pageHeaders = [
  {
    text: 'Premium',
    icon: 'fa fa-area-chart'
  },
  {
    text: 'Billing Information',
    icon: 'fa fa-dollar'
  },
  {
    text: 'Payments',
    icon: 'fa fa-credit-card'
  }
];

describe('Policy Billing Page testing', () => {
  const props = {
    policy: latestPolicy,
    billing: getSummaryLedger
  };

  it('POS:Checks headers', () => {
    const { getByText } = render(<Billing {...props} />);

    pageHeaders.forEach(header => checkHeader(getByText, header));
  });

  it('POS:Premium Details Details', () => {
    const { getByText } = render(<Billing {...props} />);
    const sectionData = [
      { label: 'Current Premium', value: '$ 2,667.00' },
      { label: 'Initial Premium', value: '$ 2,667.00' },
      { label: 'Balance Due', value: '$ 3,337.00' }
    ];

    sectionData.forEach(({ label, value }) =>
      expect(getByText(label).nextSibling.textContent).toEqual(value)
    );
  });

  it('POS:Billing Information Details', () => {
    const { getByText } = render(<Billing {...props} />);
    const sectionData = [
      { label: 'Next Payment', value: '$ 2,667.00' },
      { label: 'Payment Due', value: '06/07/2019' },
      { label: 'Bill Plan', value: 'Annual' },
      { label: 'Bill To', value: 'Policyholder: BATMAN ROBIN' }
    ];

    sectionData.forEach(({ label, value }) =>
      expect(getByText(label).nextSibling.textContent).toEqual(value)
    );
  });
});
