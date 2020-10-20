import React from 'react';

import {
  render,
  defaultPolicyWorkflowProps,
  getSummaryLedger,
  checkHeader
} from '../../../test-utils';
import PolicyWorkflow from '../PolicyWorkflow';

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
    ...defaultPolicyWorkflowProps,
    location: { pathname: '/policy/12-345-67/billing' },
    match: { params: { step: 'billing', policyNumber: '12-345-67' } },
    summaryLedger: getSummaryLedger
  };

  it('POS:Checks headers', () => {
    const { getByText } = render(<PolicyWorkflow {...props} />);

    pageHeaders.forEach(header => checkHeader(getByText, header.text, header));
  });

  it('POS:Premium Details', () => {
    const { getByText } = render(<PolicyWorkflow {...props} />);
    const sectionData = [
      { label: 'Current Premium', value: '$2,667.00' },
      { label: 'Initial Premium', value: '$2,667.00' },
      { label: 'Balance Due', value: '$3,337.00' }
    ];

    sectionData.forEach(({ label, value }) =>
      expect(getByText(label).nextSibling.textContent).toEqual(value)
    );
  });

  it('POS:Billing Information Details', () => {
    const { getByText } = render(<PolicyWorkflow {...props} />);
    const sectionData = [
      { label: 'Next Payment', value: '$2,667.00' },
      { label: 'Payment Due', value: '06/07/2019' },
      { label: 'Bill Plan', value: 'Annual' },
      { label: 'Bill To', value: 'Policyholder: BATMAN ROBIN' }
    ];

    sectionData.forEach(({ label, value }) =>
      expect(getByText(label).nextSibling.textContent).toEqual(value)
    );
  });

  // TODO this test has never worked, will need to come back and address in subsequent PR.
  // it('POS:Payments Details', async () => {
  //   const newProps = {
  //     ...props,
  //     billing: {
  //       ...props.billing,
  //       payments: [
  //         payment,
  //         {
  //           ...payment,
  //           date: '2019-06-01T08:00:00.000Z',
  //           type: 'AAA type',
  //           description: 'ZZZ description',
  //           amount: '40.00'
  //         }
  //       ]
  //     }
  //   };
  //   const payments = [
  //     {
  //       date: '2019-05-15',
  //       type: 'Paper Deposit',
  //       description: 'Duplicate Payment Applied in Error',
  //       amount: '$100.00'
  //     },
  //     {
  //       date: '2019-06-01',
  //       type: 'AAA type',
  //       description: 'ZZZ description',
  //       amount: '$40.00'
  //     }
  //   ];
  //
  //   const { getByText, getAllByText } = render(
  //     <PolicyWorkflow {...newProps} />
  //   );
  //
  //   const checkRows = () =>
  //     document.querySelectorAll('tbody tr').forEach(($row, i) => {
  //       const cols = $row.childNodes;
  //       expect(cols[0].textContent).toEqual(payments[i].date);
  //       expect(cols[1].textContent).toEqual(payments[i].type);
  //       expect(cols[2].textContent).toEqual(payments[i].description);
  //       expect(cols[3].textContent).toEqual(payments[i].amount);
  //     });
  //
  //   const flipAndCheckBothDirections = async header => {
  //     // Set the asc order on the header.
  //     if (header === 'Date') {
  //       fireEvent.click(getAllByText('Date')[1]);
  //     } else {
  //       fireEvent.click(getByText(header));
  //     }
  //     // Data is structured so this will reverse whatever was previously here, to confirm the sorting actually works.
  //     await wait(() => checkRows());
  //     // Set desc order.
  //     if (header === 'Date') {
  //       await fireEvent.click(getAllByText('Date')[1]);
  //     } else {
  //       await fireEvent.click(getByText(header));
  //     }
  //     // Reverse and check data again.
  //     payments.reverse();
  //     await wait(() => checkRows());
  //     // Reverse the answers again due to data structure so that the next time we call this function
  //     // we confirm that the sorting actually works.
  //     payments.reverse();
  //   };
  //
  //   // Check default ordering first.
  //   checkRows();
  //
  //   await flipAndCheckBothDirections('Date');
  //   await flipAndCheckBothDirections('Type');
  //   await flipAndCheckBothDirections('Description');
  //   await flipAndCheckBothDirections('Amount');
  //
  //   expect(getByText('Payments Received: $ 140.00'));
  // });

  it('POS:No Payments Received', () => {
    const emptyBillingProps = {
      ...props,
      summaryLedger: {
        ...props.summaryLedger,
        cashReceived: 0
      }
    };

    const { getByText } = render(<PolicyWorkflow {...emptyBillingProps} />);

    expect(getByText('There is no data to display'));
    expect(getByText('Payments Received: $0.00'));
  });
});
