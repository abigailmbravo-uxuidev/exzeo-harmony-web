import React from 'react';
import { fireEvent } from 'react-testing-library';

import {
  renderWithReduxAndRouter,
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
    data: 'Bruce'
  },
  {
    dataTest: 'policyHolders[0].lastName',
    error: 'Field Required',
    label: 'Last Name',
    type: 'text',
    required: true,
    data: 'Wayne'
  },
  {
    dataTest: 'policyHolders[0].emailAddress',
    error: 'Field Required',
    label: 'Email Address',
    type: 'text',
    required: true,
    data: 'Batman@gmail.com'
  },
  {
    dataTest: 'policyHolders[0].primaryPhoneNumber',
    error: 'Field Required',
    label: 'Primary Phone',
    type: 'phone',
    required: true,
    data: '1234567890'
  }
];

const ph2Fields = [
  {
    dataTest: 'policyHolders[1].firstName',
    error: 'Field Required',
    label: 'First Name',
    type: 'text',
    required: true,
    data: 'Dick'
  },
  {
    dataTest: 'policyHolders[1].lastName',
    error: 'Field Required',
    label: 'Last Name',
    type: 'text',
    required: true,
    data: 'Grayson'
  },
  {
    dataTest: 'policyHolders[1].emailAddress',
    error: 'Field Required',
    label: 'Email Address',
    type: 'text',
    required: true,
    data: 'Robin@hotmail.com'
  },
  {
    dataTest: 'policyHolders[1].primaryPhoneNumber',
    error: 'Field Required',
    label: 'Primary Phone',
    type: 'phone',
    required: true,
    data: '1234567890'
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
    icon : 'fa fa-vcard-o'
  },
  {
    text: 'Mailing Address',
    icon: 'fa fa-envelope'
  },
  {
    text: 'Additional Parties',
    icon: 'fa fa-user-plus'
  }
]


describe('Verify Testing', () => {
  const props = {
    ...defaultQuoteWorkflowProps,
    options: {
      ...defaultQuoteWorkflowProps.options,
      agents: [
        { label: 'WILLIAM RIKER', answer: 60000 }
      ]
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

  it('NEG:Primary Policyholder Empty Value', () => {
    const { getByText, getByTestId } = renderWithReduxAndRouter(<QuoteWorkflow {...props} />);
    // Toggle the ph modal
    fireEvent.click(getByTestId('policyholder-details'));

    ph1Fields.forEach(field => checkLabel(getByTestId, field));
    ph1Fields.forEach(field => clearText(getByTestId, field));
    submitForm(getByText, 'Save');
    ph1Fields.forEach(field => checkError(getByTestId, field));
    ph1Fields.forEach(fieldToLeaveBlank => verifyForm(getByTestId, ph1Fields, [fieldToLeaveBlank]));
  });

  it('NEG:Secondary Policyholder Empty Value', () => {
    const { getByText, getByTestId } = renderWithReduxAndRouter(<QuoteWorkflow {...props} />);
    // Click the modal and add a second ph
    fireEvent.click(getByTestId('policyholder-details'));
    fireEvent.click(getByTestId('additionalPolicyholder'));

    ph2Fields.forEach(field => checkLabel(getByTestId, field));
    submitForm(getByText, 'Save');
    ph2Fields.forEach(field => checkError(getByTestId, field));
    ph2Fields.forEach(fieldToLeaveBlank => verifyForm(getByTestId, ph1Fields, [fieldToLeaveBlank]));
  });

  it('NEG:Primary / Secondary Policyholder Invalid Character', () => {
    const { getByTestId } = renderWithReduxAndRouter(<QuoteWorkflow {...props} />);
    fireEvent.click(getByTestId('policyholder-details'));
    fireEvent.click(getByTestId('additionalPolicyholder'));

    // For all fields except phone, we fill out with invalid character data
    // If that field is an email, it will throw a different error
    [...ph1Fields, ...ph2Fields].filter(({ dataTest }) => !dataTest.includes('Phone'))
      .forEach(({ dataTest }) => verifyForm(getByTestId, [{
        dataTest, data: '∂',
        error: dataTest.includes('email') ? 'Not a valid email address' : 'Invalid characters'
      }]));
  });

  it('NEG:Invalid Email Address', () => {
    const { getByTestId } = renderWithReduxAndRouter(<QuoteWorkflow {...props} />);
    fireEvent.click(getByTestId('policyholder-details'));
    fireEvent.click(getByTestId('additionalPolicyholder'));

    [...ph1Fields, ...ph2Fields].filter(({ dataTest }) => dataTest.includes('email'))
      .forEach(({ dataTest }) => verifyForm(getByTestId, [{
        dataTest, data: 'invalid testing email address', error: 'Not a valid email address'
      }]));
  });

  it('NEG:Invalid Contact Phone', () => {
    const { getByTestId } = renderWithReduxAndRouter(<QuoteWorkflow {...props} />);
    fireEvent.click(getByTestId('policyholder-details'));
    fireEvent.click(getByTestId('additionalPolicyholder'));

    [...ph1Fields, ...ph2Fields].filter(({ dataTest }) => dataTest.includes('Phone'))
      .forEach(({ dataTest }) => verifyForm(getByTestId, [{
        dataTest, data: '123', error: 'Not a valid Phone Number'
      }]));
  });

  it('NEG:Some "Verified" Values left at Default "No"', () => {
    const { getByTestId } = renderWithReduxAndRouter(<QuoteWorkflow {...props} />);

    switchFields.forEach(({ dataTest }) => {
      fireEvent.click(getByTestId(dataTest));
      expect(getByTestId('next')).toBeDisabled();
      fireEvent.click(getByTestId(dataTest));
    });
  });

  it('POS:Checks all headers', () => {
    const { getAllByText } = renderWithReduxAndRouter(<QuoteWorkflow {...props} />);
    pageHeaders.forEach(({ text, icon }) => {
      const header = getAllByText(text).pop();
      expect(header).toHaveTextContent(text);
      const iconElement = Object.values(header.childNodes).find(node => node.tagName === 'I');
      expect(iconElement.className).toEqual(icon);
      const editButton = header.querySelector('span');
      expect(editButton.textContent).toEqual(' Edit');
      expect(editButton.querySelector('i').className).toEqual('fa fa-pencil');
    });
  });

  it('POS:Property Details Text', () => {
    const { getByText } = renderWithReduxAndRouter(<QuoteWorkflow {...props} />);
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
    const { getByText } = renderWithReduxAndRouter(<QuoteWorkflow {...props} />);
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
      { label: 'Sinkhole Deductible', value: '$ 31,400' },
    ];
    // Check each field in order
    getByText('Quote Details').nextSibling.childNodes.forEach((node, i) => {
      expect(node).toHaveTextContent(sectionData[i].label);
      expect(node).toHaveTextContent(sectionData[i].value);
    });
  });

  it('POS:Policyholder Details Text', () => {
    const { getByText } = renderWithReduxAndRouter(<QuoteWorkflow {...props} />);

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
    const { getByText } = renderWithReduxAndRouter(<QuoteWorkflow {...newProps} />);
    const sectionData = [
      { label: 'Name', value: 'Bruce Wayne' },
      { label: 'Phone Number', value: 'Phone Number(123) 123-1231' },
      { label: 'Email', value: 'Batman@gmail.com' }
    ];
    // Check each field in order
    getByText('Primary Policyholder').nextSibling.childNodes.forEach((node, i) => {
      expect(node).toHaveTextContent(sectionData[i].label);
      expect(node).toHaveTextContent(sectionData[i].value);
    });
    getByText('Secondary Policyholder').nextSibling.childNodes.forEach((node, i) => {
      expect(node).toHaveTextContent(sectionData[i].label);
      expect(node).toHaveTextContent(sectionData[i].value);
    });
  });

  it('POS:Policyholder Modal', () => {
    const { getByText, getByTestId, queryByText } = renderWithReduxAndRouter(<QuoteWorkflow {...props} />);
    // Open modal
    fireEvent.click(getByTestId('policyholder-details'));
    // Close the modal and confirm
    fireEvent.click(getByText('Cancel'));
    expect(queryByText('Edit Policyholder(s)')).not.toBeInTheDocument();
    // Open it back up
    fireEvent.click(getByTestId('policyholder-details'));
    expect(document.querySelector('i.fa-vcard')).toBeInTheDocument();
    expect(getByText('Edit Policyholder(s)'));
    // Secondary policyholder text should not exist
    expect(queryByText('Secondary Policyholder')).not.toBeInTheDocument();
    expect(getByText('Do you want to add an additional Policyholder?'));
    fireEvent.click(getByTestId('additionalPolicyholder'));
    expect(getByText('Primary Policyholder'));
    // until after we've clicked on the toggle.
    expect(getByText('Secondary Policyholder'));
  });

  it('POS:Mailing Address Text', () => {
    const { getByText } = renderWithReduxAndRouter(<QuoteWorkflow {...props} />);
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

  it('POS:Verify Additional Interest Parties [Premium Finance]', () => {
    const newProps = {
      ...props,
      quote: {
        ...props.quote,
        additionalInterests: [
          // Intentionally give a messed up order...
          { ...additionalInterest, order: 1, type: 'Additional Interest', _id: '1' },
          { ...additionalInterest, order: 1, type: 'Mortgagee', _id: '2' },
          { ...additionalInterest, order: 0, type: 'Additional Interest', _id: '3' },
          { ...additionalInterest, order: 2, type: 'Mortgagee', _id: '4' },
          { ...additionalInterest, order: 0, type: 'Premium Finance', _id: '5' },
          { ...additionalInterest, order: 0, type: 'Additional Insured', _id: '6' },
          { ...additionalInterest, order: 1, type: 'Additional Insured', _id: '7' },
          { ...additionalInterest, order: 0, type: 'Mortgagee', _id: '8' },
        ]
      }
    };
    const expectedLabels = [
      'Mortgagee 1', 'Mortgagee 2', 'Mortgagee 3',
      'Additional Insured 1', 'Additional Insured 2',
      'Additional Interest 1', 'Additional Interest 2',
      'Premium Finance 1'
    ];
    renderWithReduxAndRouter(<QuoteWorkflow {...newProps} />);

    const labelTexts = document.querySelectorAll('section.additional-interests .card .icon-wrapper p');
    labelTexts.forEach((label, i) => expect(label.textContent).toEqual(expectedLabels[i]));
  });

  it('POS:Verify Additional Interest Parties [Bill Payer]', () => {
    const newProps = {
      ...props,
      quote: {
        ...props.quote,
        additionalInterests: [
          // Intentionally give a messed up order...
          { ...additionalInterest, order: 1, type: 'Additional Interest', _id: '1' },
          { ...additionalInterest, order: 1, type: 'Mortgagee', _id: '2' },
          { ...additionalInterest, order: 0, type: 'Additional Interest', _id: '3' },
          { ...additionalInterest, order: 2, type: 'Mortgagee', _id: '4' },
          { ...additionalInterest, order: 0, type: 'Premium Finance', _id: '5' },
          { ...additionalInterest, order: 0, type: 'Additional Insured', _id: '6' },
          { ...additionalInterest, order: 1, type: 'Additional Insured', _id: '7' },
          { ...additionalInterest, order: 0, type: 'Mortgagee', _id: '8' },
        ]
      }
    };
    const expectedLabels = [
      'Mortgagee 1', 'Mortgagee 2', 'Mortgagee 3',
      'Additional Insured 1', 'Additional Insured 2',
      'Additional Interest 1', 'Additional Interest 2',
      'Bill Payer 1'
    ];
    renderWithReduxAndRouter(<QuoteWorkflow {...newProps} />);

    const labelTexts = document.querySelectorAll('section.additional-interests .card .icon-wrapper p');
    labelTexts.forEach((label, i) => expect(label.textContent).toEqual(expectedLabels[i]));
  });

  it('POS:Verify Toggle Labels and Switch Fields', () => {
    const { getByTestId } = renderWithReduxAndRouter(<QuoteWorkflow {...props} />);

    switchFields.forEach(field => {
      checkLabel(getByTestId, field);
      checkSwitch(getByTestId, field);
    });
  });

  it('POS:Next Button', () => {
    const { getByTestId } = renderWithReduxAndRouter(<QuoteWorkflow {...props} />);

    expect(getByTestId('next').getAttribute('type')).toEqual('button');
    checkButton(getByTestId, { dataTest: 'next' });
  });
});
