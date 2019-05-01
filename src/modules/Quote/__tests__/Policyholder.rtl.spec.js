import React from 'react';
import { fireEvent } from 'react-testing-library';

import {
  renderWithReduxAndRouter,
  defaultProps,
  submitForm, checkError, verifyForm, checkLabel, checkTextInput, checkHeader, checkButton, checkPhoneInput,
  ph1Fields, ph2Fields
} from '../../../test-utils';
import ConnectedQuoteWorkflow from '../QuoteWorkflow';

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
    const { getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />);
    submitForm(getByTestId);
    ph1Fields.forEach(field => checkError(getByTestId, field));
  });

  it('NEG:Primary Policyholder Empty Value', () => {
    const { getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />);
    ph1Fields.forEach(fieldToLeaveBlank => verifyForm(getByTestId, ph1Fields, [fieldToLeaveBlank]));
  });

  it('NEG:Secondary Policyholder Empty Value', () => {
    const { getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />);
    toggleSecondUser();
    submitForm(getByTestId);
    ph2Fields.forEach(field => checkError(getByTestId, field));
    ph2Fields.forEach(fieldToLeaveBlank => verifyForm(getByTestId, ph2Fields, [fieldToLeaveBlank]));
  });

  it('NEG:Primary / Secondary Policyholder Invalid Character', () => {
    const { getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />);
    toggleSecondUser();
    // For all fields except phone, we fill out with invalid character data
    // If that field is an email, it will throw a different error
    [...ph1Fields, ...ph2Fields].filter(({ name }) => !name.includes('Phone'))
      .forEach(({ name }) => verifyForm(getByTestId, [{
        name, data: '∂',
        error: name.includes('email') ? 'Not a valid email address' : 'Invalid characters'
      }]));
  });

  it('NEG:Invalid Email Address', () => {
    const { getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />);
    toggleSecondUser();
    [...ph1Fields, ...ph2Fields].filter(({ name }) => name.includes('email'))
      .forEach(({ name }) => verifyForm(getByTestId, [{
        name, data: 'invalidemail', error: 'Not a valid email address'
      }]));
  });

  it('NEG:Invalid Contact Phone', () => {
    const { getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />);
    toggleSecondUser();
    [...ph1Fields, ...ph2Fields].filter(({ name }) => name.includes('Phone'))
      .forEach(({ name }) => verifyForm(getByTestId, [{
        name, data: '123', error: 'Not a valid Phone Number'
      }]));
  });

  it('NEG:Invalid Effective Date', () => {
    const { getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />);
    // submitForm(getByTestId);
    verifyForm(getByTestId, [{
      name: 'effectiveDate', data: ''
    }]);
    verifyForm(getByTestId, [{
      name: 'effectiveDate', data: '1900-01-01', error: 'Date must be at least 08/01/2017'
    }]);
  });

  it('POS:Checks Headers', () => {
    const { getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />);
    getByTestId('Primary Policyholder')
    toggleSecondUser();
    pageHeaders.forEach(header => checkHeader(getByTestId, header));
  });

  it('POS:Primary / Secondary Policyholder Label / Text', () => {
    const { getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />);

    toggleSecondUser();
    [...ph1Fields, ...ph2Fields].forEach(({ name, label, data, type }) => {
      checkLabel(getByTestId, { name, label });
      if (type === 'text') checkTextInput(getByTestId, { name, data });
      if (type === 'phone') checkPhoneInput(getByTestId, { name, data });
    });
  });

  it('POS:Policy Details Text', () => {
    const { getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />);
    
    expect(getByTestId('effectiveDate_wrapper')).toHaveTextContent('Effective Date');
    expect(getByTestId('effectiveDate')).toHaveAttribute('type', 'date');
    expect(getByTestId('agentCode_wrapper')).toHaveTextContent('Agent');
  });

  it('POS:Checks Submit Button', () => {
    const { getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />);
    checkButton(getByTestId);
  });
});
