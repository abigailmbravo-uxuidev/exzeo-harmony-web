import React from 'react';
import 'jest-dom/extend-expect';
import { fireEvent, waitForElement } from 'react-testing-library';

import * as serviceRunner from '../../../utilities/serviceRunner';

import {
  renderWithReduxAndRouter,
  defaultProps,
  customerInfoTemplate,
  submitForm, checkError, verifyForm, checkLabel, checkTextInput, checkHeader, checkButton
} from '../../../test-utils';
import ConnectedQuoteWorkflow from '../QuoteWorkflow';

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

const pageHeaders = [
  {
    name: 'Primary Policyholder',
    text: 'Primary Policyholder',
    icon: 'fa fa-user-circle'
  },
  {
    name: 'Secondary Policyholder',
    text: 'Secondary Policyholder',
    icon: 'fa fa-user-circle'
  },
  {
    name: 'Policy Details',
    text: 'Policy Details',
    icon: 'fa fa-file-text'
  }
];

// Mock Gandalf's servicerunner call for templates
serviceRunner.callService = jest.fn(() => Promise.resolve({
  data: {
    result: {
      pages: [customerInfoTemplate]
    }
  }
}));

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

  it('NEG:All Inputs Empty Value', async () => {
    const { getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />);
    await waitForElement(() => getByTestId('Primary Policyholder'));
    submitForm(getByTestId);
    ph1Fields.forEach(({ name, error }) => checkError(getByTestId, { name, error }));
  });

  it('NEG:Primary Policyholder Empty Value', async () => {
    const { getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />);
    await waitForElement(() => getByTestId('Primary Policyholder'));
    ph1Fields.forEach(fieldToLeaveBlank => verifyForm(getByTestId, ph1Fields, [fieldToLeaveBlank]));
  });

  it('NEG:Secondary Policyholder Empty Value', async () => {
    const { getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />);
    await waitForElement(() => getByTestId('Primary Policyholder'));
    toggleSecondUser();
    submitForm(getByTestId);
    ph2Fields.forEach(({ name, error }) => checkError(getByTestId, { name, error }));
    ph2Fields.forEach(fieldToLeaveBlank => verifyForm(getByTestId, ph2Fields, [fieldToLeaveBlank]));
  });

  it('NEG:Primary / Secondary Policyholder Invalid Character', async () => {
    const { getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />);
    await waitForElement(() => getByTestId('Primary Policyholder'));
    toggleSecondUser();
    // For all fields except phone, we fill out with invalid character data
    // If that field is an email, it will throw a different error
    [...ph1Fields, ...ph2Fields].filter(({ name }) => !name.includes('Phone'))
      .forEach(({ name }) => verifyForm(getByTestId, [{
        name, data: '∂',
        error: name.includes('email') ? 'Not a valid email address' : 'Invalid characters'
      }]));
  });

  it('NEG:Invalid Email Address', async () => {
    const { getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />);
    await waitForElement(() => getByTestId('Primary Policyholder'));
    toggleSecondUser();
    [...ph1Fields, ...ph2Fields].filter(({ name }) => name.includes('email'))
      .forEach(({ name }) => verifyForm(getByTestId, [{
        name, data: 'invalidemail', error: 'Not a valid email address'
      }]));
  });

  it('NEG:Invalid Contact Phone', async () => {
    const { getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />);
    await waitForElement(() => getByTestId('Primary Policyholder'));
    toggleSecondUser();
    [...ph1Fields, ...ph2Fields].filter(({ name }) => name.includes('Phone'))
      .forEach(({ name }) => verifyForm(getByTestId, [{
        name, data: '123', error: 'Not a valid Phone Number'
      }]));
  });

  it('NEG:Invalid Effective Date', async () => {
    const { getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />);
    await waitForElement(() => getByTestId('Primary Policyholder'));
    submitForm(getByTestId);
    checkError(getByTestId, { name: 'effectiveDate' });
    verifyForm(getByTestId, [{
      name: 'effectiveDate', data: '1900-01-01', error: 'Date must be at least 08/01/2017'
    }]);
  });

  it('POS:Checks Headers', async () => {
    const { getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />);
    await waitForElement(() => getByTestId('Primary Policyholder'));
    toggleSecondUser();
    pageHeaders.forEach(header => checkHeader(getByTestId, header));
  });

  it('POS:Primary / Secondary Policyholder Label / Text', async () => {
    const { getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />);
    await waitForElement(() => getByTestId('Primary Policyholder'));
    toggleSecondUser();
    [...ph1Fields, ...ph2Fields].forEach(({ name, label, data }) => {
      checkLabel(getByTestId, { name, label });
      checkTextInput(getByTestId, { name, data });
    });
  });

  it('POS:Policy Details Text', async () => {
    const { getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />);
    await waitForElement(() => getByTestId('Primary Policyholder'));
    expect(getByTestId('effectiveDate_wrapper')).toHaveTextContent('Effective Date');
    expect(getByTestId('effectiveDate')).toHaveAttribute('type', 'date');
    expect(getByTestId('agentCode_wrapper')).toHaveTextContent('Agent');
  });

  it('POS:Checks Submit Button', async () => {
    const { getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />);
    await waitForElement(() => getByTestId('Primary Policyholder'));
    checkButton(getByTestId);
  });
});
