import React from 'react';
import { fireEvent } from 'react-testing-library';

import {
  renderWithReduxAndRouter,
  defaultQuoteWorkflowProps,
  submitForm,
  checkError, verifyForm, checkLabel, checkTextInput, checkHeader, checkButton, checkPhoneInput, checkSelect
} from '../../../test-utils';
import { QuoteWorkflow } from '../QuoteWorkflow';

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
    label: 'Contact Phone',
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
    label: 'Contact Phone',
    type: 'phone',
    required: true,
    data: '1234567890'
  }
];


const detailsFields = [
  {
    dataTest: 'effectiveDate',
    label: 'Effective Date',
    type: 'text',
    data: '2010-01-02'
  },
  {
    dataTest: 'agentCode',
    label: 'Agent',
    type: 'select',
    defaultValue: '60000',
    values: ['60000', '1234']
  }
];

const pageHeaders = [
  {
    dataTest: 'Primary Policyholder',
    text: 'Primary Policyholder',
    icon: 'fa fa-user-circle'
  },
  {
    dataTest: 'Secondary Policyholder',
    text: 'Secondary Policyholder',
    icon: 'fa fa-user-circle'
  },
  {
    dataTest: 'Policy Details',
    text: 'Policy Details',
    icon: 'fa fa-file-text'
  }
];

describe('Testing QuoteWorkflow Policyholder Page', () => {
  const props = {
    ...defaultQuoteWorkflowProps,
    setPolicySearch: () => {}
  };

  const toggleSecondUser = (dir = 'on') => {
    const toggle = document.querySelector('[data-test="additionalPolicyholder"]');
    if ((!toggle.classList.contains('active') && dir === 'on') ||
    (toggle.classList.contains('active') && dir === 'off')) fireEvent.click(toggle);
  };

  it('NEG:All Inputs Empty Value', () => {
    const { getByTestId } = renderWithReduxAndRouter(<QuoteWorkflow {...props} />);
    submitForm(getByTestId);
    ph1Fields.forEach(field => checkError(getByTestId, field));
  });

  it('NEG:Primary Policyholder Empty Value', () => {
    const { getByTestId } = renderWithReduxAndRouter(<QuoteWorkflow {...props} />);
    ph1Fields.forEach(fieldToLeaveBlank => verifyForm(getByTestId, ph1Fields, [fieldToLeaveBlank]));
  });

  it('NEG:Secondary Policyholder Empty Value', () => {
    const { getByTestId } = renderWithReduxAndRouter(<QuoteWorkflow {...props} />);
    toggleSecondUser();
    submitForm(getByTestId);
    ph2Fields.forEach(field => checkError(getByTestId, field));
    ph2Fields.forEach(fieldToLeaveBlank => verifyForm(getByTestId, ph2Fields, [fieldToLeaveBlank]));
  });

  it('NEG:Primary / Secondary Policyholder Invalid Character', () => {
    const { getByTestId } = renderWithReduxAndRouter(<QuoteWorkflow {...props} />);
    toggleSecondUser();
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
    toggleSecondUser();
    [...ph1Fields, ...ph2Fields].filter(({ dataTest }) => dataTest.includes('email'))
      .forEach(({ dataTest }) => verifyForm(getByTestId, [{
        dataTest, data: 'invalidemail', error: 'Not a valid email address'
      }]));
  });

  it('NEG:Invalid Contact Phone', () => {
    const { getByTestId } = renderWithReduxAndRouter(<QuoteWorkflow {...props} />);
    toggleSecondUser();
    [...ph1Fields, ...ph2Fields].filter(({ dataTest }) => dataTest.includes('Phone'))
      .forEach(({ dataTest }) => verifyForm(getByTestId, [{
        dataTest, data: '123', error: 'Not a valid Phone Number'
      }]));
  });

  it('NEG:Invalid Effective Date', () => {
    const { getByTestId } = renderWithReduxAndRouter(<QuoteWorkflow {...props} />);
    submitForm(getByTestId);
    verifyForm(getByTestId, [{
      dataTest: 'effectiveDate', data: ''
    }]);
    verifyForm(getByTestId, [{
      dataTest: 'effectiveDate', data: '1900-01-01', error: 'Date must be at least 08/01/2017'
    }]);
  });

  it('POS:Checks Headers', () => {
    const { getByTestId } = renderWithReduxAndRouter(<QuoteWorkflow {...props} />);
    getByTestId('Primary Policyholder');
    toggleSecondUser();
    pageHeaders.forEach(header => checkHeader(getByTestId, header));
  });

  it('POS:Primary / Secondary Policyholder Label / Text', () => {
    const { getByTestId } = renderWithReduxAndRouter(<QuoteWorkflow {...props} />);

    toggleSecondUser();
    [...ph1Fields, ...ph2Fields].forEach(({ dataTest, label, data, type }) => {
      checkLabel(getByTestId, { dataTest, label });
      if (type === 'text') checkTextInput(getByTestId, { dataTest, data });
      if (type === 'phone') checkPhoneInput(getByTestId, { dataTest, data });
    });
  });

  it('POS:Policy Details Text', () => {
    const newProps = {
      ...props,
      options: {
        ...props.options,
        agents: [
          { label: '', answer: '60000' },
          { label: '', answer: '1234' }
        ]
      }
    };
    const { getByTestId } = renderWithReduxAndRouter(<QuoteWorkflow {...newProps} />);

    detailsFields.forEach(field => {
      checkLabel(getByTestId, field);
      if (field.type === 'text') checkTextInput(getByTestId, field);
      if (field.type === 'select') checkSelect(getByTestId, field);
    });
  });

  it('POS:Checks Submit Button', () => {
    const { getByTestId } = renderWithReduxAndRouter(<QuoteWorkflow {...props} />);
    checkButton(getByTestId);
  });
});
