import React from 'react';
import { render, fireEvent } from 'react-testing-library';

import {
  checkHeader,
  latestPolicy,
  getSummaryLedger,
  payment
} from '../../../test-utils';
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

  it('POS:Payments Details', () => {
    const newProps = {
      ...props,
      billing: {
        ...props.billing,
        payments: [
          payment,
          {
            ...payment,
            date: '2019-06-01T08:00:00.000Z',
            type: 'AAA type',
            description: 'ZZZ description',
            amount: { $numberDecimal: '40.00' }
          }
        ]
      }
    };

    const { getByText } = render(<Billing {...newProps} />);
    const payments = [
      {
        date: '2019-05-15',
        type: 'Paper Deposit',
        description: 'Duplicate Payment Applied in Error',
        amount: '$ 100.00'
      },
      {
        date: '2019-06-01',
        type: 'AAA type',
        description: 'ZZZ description',
        amount: '$ 40.00'
      }
    ];
    const checkRows = () =>
      document.querySelectorAll('tbody tr').forEach(($row, i) => {
        const cols = $row.childNodes;
        expect(cols[0].textContent).toEqual(payments[i].date);
        expect(cols[1].textContent).toEqual(payments[i].type);
        expect(cols[2].textContent).toEqual(payments[i].description);
        expect(cols[3].textContent).toEqual(payments[i].amount);
      });

    checkRows();

    // In order to confirm that each sorter works, we have to reverse the sort each time
    // -- otherwise, we might simply be not sorting anything and leaving everything in place.
    fireEvent.click(getByText('Date'));
    payments.reverse();
    checkRows();

    fireEvent.click(getByText('Type'));
    payments.reverse();
    checkRows();

    fireEvent.click(getByText('Description'));
    payments.reverse();
    checkRows();

    fireEvent.click(getByText('Amount'));
    payments.reverse();
    checkRows();

    expect(getByText('Payments Received: $ 140.00'));
  });
});
