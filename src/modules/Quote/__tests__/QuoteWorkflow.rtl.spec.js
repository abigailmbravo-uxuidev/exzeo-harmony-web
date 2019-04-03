import React from 'react';
import 'jest-dom/extend-expect';
import { fireEvent } from 'react-testing-library';
import { renderWithReduxAndRouter, defaultInitialState, defaultProps } from 'test-utils';

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

describe('Testing Quote Component with react-testing-library', () => {
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

  it('POS:Primary Policyholder Label / Text', () => {
    const { getByTestId } = renderWithReduxAndRouter(<QuoteWorkflowTest {...props} />);
    ph1Fields.forEach(({ name, label, data }) => {
      expect(getByTestId(`${name}_wrapper`)).toHaveTextContent(label);
      fireEvent.change(getByTestId(name), { target: { value: data }});
      expect(getByTestId(name).value).toBe(data);
    });
  });

  it('POS:Primary Policyholder Label / Text', () => {
    const { getByTestId } = renderWithReduxAndRouter(<QuoteWorkflowTest {...props} />);
    toggleSecondUser();
    ph2Fields.forEach(({ name, label, data }) => {
      expect(getByTestId(`${name}_wrapper`)).toHaveTextContent(label);
      fireEvent.change(getByTestId(name), { target: { value: data } });
      expect(getByTestId(name).value).toBe(data);
    });
  });

  it('POS:Policy Details Text', () => {
    const { getByTestId } = renderWithReduxAndRouter(<QuoteWorkflowTest {...props} />);
    expect(getByTestId('effectiveDate_wrapper')).toHaveTextContent('Effective Date');
    expect(getByTestId('effectiveDate')).toHaveAttribute('type', 'date');
    expect(getByTestId('agentCode_wrapper')).toHaveTextContent('Agent');
  });
});

