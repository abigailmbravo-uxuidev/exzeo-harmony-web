import React from 'react';

import {
  render,
  fireEvent,
  wait,
  waitForElement,
  within,
  defaultQuoteWorkflowProps,
  additionalInterest,
  policyHolder,
  rating,
  clearText,
  checkLabel,
  checkButton,
  checkError,
  submitForm,
  verifyForm,
  checkSwitch
} from '../../../test-utils';
import { QuoteWorkflow } from '../QuoteWorkflow';

const switchFields = [
  {
    dataTest: 'confirmProperty',
    type: 'switch',
    label: 'Verified',
    defaultValue: false
  },
  {
    dataTest: 'confirmQuote',
    type: 'switch',
    label: 'Verified',
    defaultValue: false
  },
  {
    dataTest: 'confirmPolicy',
    type: 'switch',
    label: 'Verified',
    defaultValue: false
  },
  {
    dataTest: 'confirmAdditionalInterest',
    type: 'switch',
    label: 'Verified',
    defaultValue: false
  }
];

const ph1Fields = [
  {
    dataTest: 'policyHolders[0].firstName',
    error: 'Field Required',
    label: 'First Name',
    type: 'text',
    required: true,
    value: 'Bruce'
  },
  {
    dataTest: 'policyHolders[0].lastName',
    error: 'Field Required',
    label: 'Last Name',
    type: 'text',
    required: true,
    value: 'Wayne'
  },
  {
    dataTest: 'policyHolders[0].emailAddress',
    error: 'Field Required',
    label: 'Email Address',
    type: 'text',
    required: true,
    value: 'Batman@gmail.com'
  },
  {
    dataTest: 'policyHolders[0].primaryPhoneNumber',
    error: 'Field Required',
    label: 'Primary Phone',
    type: 'phone',
    required: true,
    value: '1234567890'
  }
];

const ph2Fields = [
  {
    dataTest: 'policyHolders[1].firstName',
    error: 'Field Required',
    label: 'First Name',
    type: 'text',
    value: 'Dick'
  },
  {
    dataTest: 'policyHolders[1].lastName',
    error: 'Field Required',
    label: 'Last Name',
    type: 'text',
    value: 'Grayson'
  },
  {
    dataTest: 'policyHolders[1].emailAddress',
    error: 'Field Required',
    label: 'Email Address',
    type: 'text',
    value: 'Robin@hotmail.com'
  },
  {
    dataTest: 'policyHolders[1].primaryPhoneNumber',
    error: 'Field Required',
    label: 'Primary Phone',
    type: 'phone',
    value: '1234567890'
  }
];

const pageHeaders = [
  {
    text: 'Property Details',
    icon: 'fa fa-map-marker'
  },
  {
    text: 'Quote Details',
    icon: 'fa fa-list'
  },
  {
    text: 'Policyholder Details',
    icon: 'fa fa-vcard-o'
  },
  {
    text: 'Mailing Address',
    icon: 'fa fa-envelope'
  },
  {
    text: 'Additional Parties',
    icon: 'fa fa-user-plus'
  }
];

describe('Verify Testing', () => {
  const props = {
    ...defaultQuoteWorkflowProps,
    options: {
      ...defaultQuoteWorkflowProps.options,
      agents: [{ label: 'WILLIAM RIKER', answer: 60000 }]
    },
    quote: {
      ...defaultQuoteWorkflowProps.quote,
      agentCode: 60000,
      policyHolders: [policyHolder],
      policyHolderMailingAddress: {
        address1: '4131 TEST ADDRESS',
        address2: '',
        city: 'SARASOTA',
        country: {
          code: 'USA',
          displayText: 'United States of America'
        },
        zip: '00001',
        state: 'FL'
      },
      rating
    },
    location: { pathname: '/quote/1/verify' }
  };

  it('NEG:Primary Policyholder Empty Value', async () => {
    const { getByText, getByTestId } = render(<QuoteWorkflow {...props} />);
    // Toggle the ph modal
    fireEvent.click(getByTestId('policyholder-details'));

    await wait(() => {
      ph1Fields.forEach(field => checkLabel(getByTestId, field));
    });

    ph1Fields.forEach(field => clearText(getByTestId, field));
    await wait(() => {
      expect(
        getByTestId('policyHolders[0].primaryPhoneNumber')
      ).toHaveAttribute('value', '');
    });
    submitForm(getByText, 'Save');

    await wait(() => {
      ph1Fields.forEach(field => checkError(getByTestId, field));
    });
  });

  it('NEG:Secondary Policyholder Empty Value', async () => {
    const { getByText, getByTestId } = render(<QuoteWorkflow {...props} />);
    fireEvent.click(getByTestId('policyholder-details'));
    await wait(() => {
      expect(document.querySelector('.modal')).toBeInTheDocument();
    });

    fireEvent.click(getByTestId('additionalPolicyholder'));
    await wait(() => {
      ph2Fields.forEach(field => checkLabel(getByTestId, field));
    });

    submitForm(getByText, 'Save');
    await wait(() => {
      expect(document.querySelector('.modal')).not.toBeInTheDocument();
    });
  });

  it('NEG:Primary / Secondary Policyholder Invalid Character', async () => {
    const { getByTestId } = render(<QuoteWorkflow {...props} />);
    fireEvent.click(getByTestId('policyholder-details'));
    fireEvent.click(getByTestId('additionalPolicyholder'));

    await verifyForm(getByTestId, [
      {
        dataTest: 'policyHolders[0].firstName',
        value: '∂',
        error: 'Invalid characters'
      }
    ]);
  });

  it('NEG:Invalid Email Address', async () => {
    const { getByTestId } = render(<QuoteWorkflow {...props} />);
    fireEvent.click(getByTestId('policyholder-details'));
    fireEvent.click(getByTestId('additionalPolicyholder'));

    await verifyForm(getByTestId, [
      {
        dataTest: 'policyHolders[0].emailAddress',
        value: 'invalid testing email address',
        error: 'Not a valid email address'
      }
    ]);
  });

  // TODO unit-test: revisit this in subsequent PR
  // it('NEG:Invalid Contact Phone', () => {
  //   const { getByTestId } = renderWithReduxAndRouter(
  //     <QuoteWorkflow {...props} />
  //   );
  //   fireEvent.click(getByTestId('policyholder-details'));
  //   waitForElement(() => getByTestId('edit-policyHolder-modal'));
  //   fireEvent.click(getByTestId('additionalPolicyholder'));
  //
  //   wait(() => {
  //     [...ph1Fields, ...ph2Fields]
  //       .filter(({ dataTest }) => dataTest.includes('Phone'))
  //       .forEach(({ dataTest }) =>
  //         verifyForm(getByTestId, [
  //           {
  //             dataTest,
  //             value: '123',
  //             error: 'Not a valid Phone Number'
  //           }
  //         ])
  //       );
  //   });
  // });

  // TODO lets talk about this. We cover this in Cypress test.
  // it('NEG:Some "Verified" Values left at Default "No"', () => {
  //   const { getByTestId } = render(<QuoteWorkflow {...props} />);
  //
  //   switchFields.forEach(({ dataTest }) => {
  //     fireEvent.click(getByTestId(dataTest));
  //     expect(getByTestId('next')).toBeDisabled();
  //     fireEvent.click(getByTestId(dataTest));
  //   });
  // });

  it('POS:Checks all headers', () => {
    const { getAllByText } = render(<QuoteWorkflow {...props} />);
    pageHeaders.forEach(({ text, icon }) => {
      const header = getAllByText(text).pop();
      expect(header).toHaveTextContent(text);
      const iconElement = Object.values(header.childNodes).find(
        node => node.tagName === 'I'
      );
      expect(iconElement.className).toEqual(icon);
      const editButton = header.querySelector('span');
      expect(editButton.textContent).toEqual(' Edit');
      expect(editButton.querySelector('i').className).toEqual('fa fa-pencil');
    });
  });

  it('POS:Property Details Text', () => {
    const { getByText } = render(<QuoteWorkflow {...props} />);
    const sectionData = [
      { label: 'Quote Number', value: '12-345-67' },
      { label: 'Property Address', value: '4131 TEST ADDRESS' },
      { label: 'Year Built', value: '1998' },
      { label: 'Effective Date', value: '05/05/2019' },
      { label: 'Agent', value: 'WILLIAM RIKER' }
    ];

    getByText('Property Details').nextSibling.childNodes.forEach((node, i) => {
      expect(node).toHaveTextContent(sectionData[i].label);
      expect(node).toHaveTextContent(sectionData[i].value);
    });
  });

  it('POS:Quote Details', () => {
    const { getByText } = render(<QuoteWorkflow {...props} />);
    const sectionData = [
      { label: 'Yearly Premium', value: '$ 2,667' },
      { label: 'A. Dwelling', value: '$ 314,000' },
      { label: 'B. Other Structures', value: '$ 6,280' },
      { label: 'C. Personal Property', value: '$ 78,500' },
      { label: 'D. Loss Of Use', value: '$ 31,400' },
      { label: 'E. Personal Liability', value: '$ 300,000' },
      { label: 'F. Medical Payments', value: '$ 2,000' },
      { label: 'Personal Property Replacement Cost', value: 'Yes' },
      { label: 'Mold Property', value: '$ 10,000' },
      { label: 'Mold Liability', value: '$ 50,000' },
      { label: 'Ordinance or Law', value: '$ 78,500' },
      { label: 'All Other Perils Deductible', value: '$ 1,000' },
      { label: 'Hurricane Deductible', value: '$ 6,280' },
      { label: 'Sinkhole Deductible', value: '$ 31,400' }
    ];
    // Check each field in order
    getByText('Quote Details').nextSibling.childNodes.forEach((node, i) => {
      expect(node).toHaveTextContent(sectionData[i].label);
      expect(node).toHaveTextContent(sectionData[i].value);
    });
  });

  it('POS:Policyholder Details Text', () => {
    const { getByText } = render(<QuoteWorkflow {...props} />);

    expect(getByText(/Please be sure the information below/));
  });

  it('POS:Policyholder Details Primary / Secondary Policyholder', () => {
    const newProps = {
      ...props,
      quote: {
        ...props.quote,
        policyHolders: [policyHolder, policyHolder]
      }
    };
    const { getByText } = render(<QuoteWorkflow {...newProps} />);
    const sectionData = [
      { label: 'Name', value: 'Bruce Wayne' },
      { label: 'Phone Number', value: 'Phone Number(123) 123-1231' },
      { label: 'Email', value: 'Batman@gmail.com' }
    ];
    // Check each field in order
    getByText('Primary Policyholder').nextSibling.childNodes.forEach(
      (node, i) => {
        expect(node).toHaveTextContent(sectionData[i].label);
        expect(node).toHaveTextContent(sectionData[i].value);
      }
    );
    getByText('Secondary Policyholder').nextSibling.childNodes.forEach(
      (node, i) => {
        expect(node).toHaveTextContent(sectionData[i].label);
        expect(node).toHaveTextContent(sectionData[i].value);
      }
    );
  });

  it('POS:Policyholder Modal', async () => {
    const { getByTestId, queryByText } = render(<QuoteWorkflow {...props} />);
    // Open modal
    fireEvent.click(getByTestId('policyholder-details'));
    const modalElement = getByTestId('edit-policyHolder-modal');
    await waitForElement(() => modalElement);
    const { getByText } = within(modalElement);

    await wait(() => {
      expect(modalElement.querySelector('i.fa.fa-vcard')).toBeInTheDocument();
      expect(getByText('Edit Policyholder(s)'));
      expect(getByText('Primary Policyholder'));
      expect(getByText('Do you want to add an additional Policyholder?'));

      // Secondary policyholder text should not exist
      expect(queryByText('Secondary Policyholder')).not.toBeInTheDocument();
    });

    // Add secondary policyHolder
    fireEvent.click(getByTestId('additionalPolicyholder'));
    await wait(() => {
      expect(getByText('Primary Policyholder'));
      expect(getByText('Secondary Policyholder'));
    });
    // Close the modal and confirm
    fireEvent.click(getByText('Cancel'));
    await wait(() => {
      expect(queryByText('Edit Policyholder(s)')).not.toBeInTheDocument();
    });
  });

  it('POS:Mailing Address Text', () => {
    const { getByText } = render(<QuoteWorkflow {...props} />);
    const sectionData = [
      { label: 'Street Address', value: '4131 TEST ADDRESS' },
      { label: 'City/State/Zip', value: 'City/State/ZipSARASOTA, FL 00001' },
      { label: 'Country', value: 'United States of America' }
    ];
    // Check each field in order
    getByText('Mailing Address').nextSibling.childNodes.forEach((node, i) => {
      expect(node).toHaveTextContent(sectionData[i].label);
      expect(node).toHaveTextContent(sectionData[i].value);
    });
  });

  it.each([['Bill Payer'], ['Premium Finance']])(
    'POS:Verify Additional Interest Parties order and existence with %s',
    testAi => {
      const newProps = {
        ...props,
        quote: {
          ...props.quote,
          additionalInterests: [
            // Intentionally give a messed up order...
            {
              ...additionalInterest,
              order: 1,
              type: 'Additional Interest',
              _id: '1'
            },
            { ...additionalInterest, order: 1, type: 'Mortgagee', _id: '2' },
            {
              ...additionalInterest,
              order: 0,
              type: 'Additional Interest',
              _id: '3'
            },
            { ...additionalInterest, order: 2, type: 'Mortgagee', _id: '4' },
            {
              ...additionalInterest,
              order: 0,
              type: testAi,
              _id: '5'
            },
            {
              ...additionalInterest,
              order: 0,
              type: 'Additional Insured',
              _id: '6'
            },
            {
              ...additionalInterest,
              order: 1,
              type: 'Additional Insured',
              _id: '7'
            },
            { ...additionalInterest, order: 0, type: 'Mortgagee', _id: '8' }
          ]
        }
      };
      const expectedLabels = [
        'Mortgagee 1',
        'Mortgagee 2',
        'Mortgagee 3',
        'Additional Insured 1',
        'Additional Insured 2',
        'Additional Interest 1',
        'Additional Interest 2',
        `${testAi} 1`
      ];
      const { getByTestId } = render(<QuoteWorkflow {...newProps} />);

      const aiSection = getByTestId('additional-interests');
      const aiListItems = within(aiSection).getAllByRole('listitem');
      expect(aiListItems).toHaveLength(8);

      expectedLabels.forEach((label, i) => {
        const labelText = within(aiListItems[i]).getByText(label);
        expect(labelText).toBeInTheDocument();
      });
    }
  );

  it.each([
    ['confirmProperty', 'switch', 'Verified', false],
    ['confirmQuote', 'switch', 'Verified', false],
    ['confirmPolicy', 'switch', 'Verified', false],
    ['confirmAdditionalInterest', 'switch', 'Verified', false]
  ])('POS:Verify confirmation field %s', async (dataTest, type, label) => {
    const { getByTestId } = render(<QuoteWorkflow {...props} />);

    await checkSwitch(getByTestId, {
      dataTest,
      type,
      label,
      defaultValue: false
    });
  });

  it('POS:Confirms Next Button and Edit Button', async () => {
    const { getByTestId, queryByTestId } = render(<QuoteWorkflow {...props} />);

    switchFields.forEach(({ dataTest }) =>
      fireEvent.click(getByTestId(dataTest))
    );

    await wait(() => expect(getByTestId('next')).not.toBeDisabled());
    submitForm(getByTestId, 'next');
    await wait(() =>
      expect(getByTestId('schedule-date-modal')).toBeInTheDocument()
    );
    submitForm(getByTestId, 'modal-edit');
    await wait(() => expect(queryByTestId('schedule-date-modal')).toBeNull());
  });

  it('POS:Next Button', () => {
    const { getByTestId } = render(<QuoteWorkflow {...props} />);

    checkButton(getByTestId, { dataTest: 'next' });
  });
});
