import React from 'react';
import 'jest-dom/extend-expect';
import { fireEvent } from 'react-testing-library';
import { renderWithReduxAndRouter, defaultProps, testHelpers } from '../../../test-utils';

import QuoteWorkflowTest from '../QuoteWorkflow';

const ph1Fields = [
  {
    name: 'policyHolders[0].firstName',
    error: 'Field Required',
    label: 'First Name',
    type: 'text',
    required: true,
    data: 'Bruce'
  },
  {
    name: 'policyHolders[0].lastName',
    error: 'Field Required',
    label: 'Last Name',
    type: 'text',
    required: true,
    data: 'Wayne'
  },
  {
    name: 'policyHolders[0].emailAddress',
    error: 'Field Required',
    label: 'Email Address',
    type: 'text',
    required: true,
    data: 'Batman@gmail.com'
  },
  {
    name: 'policyHolders[0].primaryPhoneNumber',
    error: 'Field Required',
    label: 'Contact Phone',
    type: 'text',
    required: true,
    data: '(123) 456-7890'
  }
];

const ph2Fields = [
  {
    name: 'policyHolders[1].firstName',
    error: 'Field Required',
    label: 'First Name',
    type: 'text',
    required: true,
    data: 'Dick'
  },
  {
    name: 'policyHolders[1].lastName',
    error: 'Field Required',
    label: 'Last Name',
    type: 'text',
    required: true,
    data: 'Grayson'
  },
  {
    name: 'policyHolders[1].emailAddress',
    error: 'Field Required',
    label: 'Email Address',
    type: 'text',
    required: true,
    data: 'Robin@hotmail.com'
  },
  {
    name: 'policyHolders[1].primaryPhoneNumber',
    error: 'Field Required',
    label: 'Contact Phone',
    type: 'text',
    required: true,
    data: '(123) 456-7890'
  }
];

export const policyDetailsFields = [
  {
    name: 'effectiveDate',
    error: 'Field Required',
    label: 'Effective Date',
    type: 'text',
    required: true
  },
  {
    name: 'agentCode',
    error: '',
    label: 'Agent',
    type: 'select',
    required: true
  }
];

describe('Testing QuoteWorkflow Policyholder Page', () => {
  const props = {
    ...defaultProps,
    history: {},
    location: {
      pathname: ''
    },
    setPolicySearch: () => {}
  };

  const toggleSecondUser = (dir = 'on') => {
    const toggle = document.querySelector('[data-test="additionalPolicyholder"]');
    if ((!toggle.classList.contains('active') && dir === 'on') || (toggle.classList.contains('active') && dir === 'off')) {
      fireEvent.click(toggle);
    };
  };

  it('NEG:All Inputs Empty Value', () => {
    const { getByTestId } = renderWithReduxAndRouter(<QuoteWorkflowTest {...props} />);
    testHelpers.submitForm(getByTestId);
    ph1Fields.forEach(({ name, error }) => testHelpers.checkError(getByTestId, { name, error }));
  });

  it('NEG:Primary Policyholder Empty Value', () => {
    const { getByTestId } = renderWithReduxAndRouter(<QuoteWorkflowTest {...props} />);
    ph1Fields.forEach(fieldToLeaveBlank => testHelpers.verifyForm(getByTestId, ph1Fields, [fieldToLeaveBlank]));
  });

  it('NEG:Secondary Policyholder Empty Value', () => {
    const { getByTestId } = renderWithReduxAndRouter(<QuoteWorkflowTest {...props} />);
    toggleSecondUser();
    testHelpers.submitForm(getByTestId);
    ph2Fields.forEach(({ name, error }) => testHelpers.checkError(getByTestId, { name, error }));
    ph2Fields.forEach(fieldToLeaveBlank => testHelpers.verifyForm(getByTestId, ph2Fields, [fieldToLeaveBlank]));
  });

  it('NEG:Primary / Secondary Policyholder Invalid Character', () => {
    const { getByTestId } = renderWithReduxAndRouter(<QuoteWorkflowTest {...props} />);
    toggleSecondUser();
    // For all fields except name, we fill out with invalid character data
    // If that field is an email, it will throw a different error
    [...ph1Fields, ...ph2Fields].filter(({ name }) => !name.includes('Phone'))
      .forEach(({ name }) => testHelpers.verifyForm(getByTestId, [{
        name, data: '∂',
        error: name.includes('email') ? 'Not a valid email address' : 'Invalid characters'
      }]));
  });

  it('NEG:Invalid Email Address', () => {
    const { getByTestId } = renderWithReduxAndRouter(<QuoteWorkflowTest {...props} />);
    toggleSecondUser();
    [...ph1Fields, ...ph2Fields].filter(({ name }) => name.includes('email'))
      .forEach(({ name }) => testHelpers.verifyForm(getByTestId, [{
        name, data: 'invalidemail', error: 'Not a valid email address'
      }]));
  });

  it('NEG:Invalid Contact Phone', () => {
    const { getByTestId } = renderWithReduxAndRouter(<QuoteWorkflowTest {...props} />);
    toggleSecondUser();
    [...ph1Fields, ...ph2Fields].filter(({ name }) => name.includes('Phone'))
      .forEach(({ name }) => testHelpers.verifyForm(getByTestId, [{
        name, data: '123', error: 'Not a valid Phone Number'
      }]));
  });

  it('NEG:Invalid Effective Date', () => {
    const { getByTestId } = renderWithReduxAndRouter(<QuoteWorkflowTest {...props} />);
    testHelpers.submitForm(getByTestId);
    testHelpers.checkError(getByTestId, { name: 'effectiveDate' });
    testHelpers.verifyForm(getByTestId, [{
      name: 'effectiveDate', data: '1900-01-01', error: 'Date must be at least 08/01/2017'
    }]);
  });

  it('POS:Primary / Secondary Policyholder Label / Text', () => {
    const { getByTestId } = renderWithReduxAndRouter(<QuoteWorkflowTest {...props} />);
    toggleSecondUser();
    [...ph1Fields, ...ph2Fields].forEach(({ name, label, data }) => {
      testHelpers.checkLabel(getByTestId, { name, label });
      testHelpers.checkTextInput(getByTestId, { name, data });
    });
  });

  it('POS:Policy Details Text', () => {
    const { getByTestId } = renderWithReduxAndRouter(<QuoteWorkflowTest {...props} />);
    expect(getByTestId('effectiveDate_wrapper')).toHaveTextContent('Effective Date');
    expect(getByTestId('effectiveDate')).toHaveAttribute('type', 'date');
    expect(getByTestId('agentCode_wrapper')).toHaveTextContent('Agent');
  });
});
