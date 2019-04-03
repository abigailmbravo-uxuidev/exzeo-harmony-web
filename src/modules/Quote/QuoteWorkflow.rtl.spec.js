import React from 'react';
import 'jest-dom/extend-expect';
import { fireEvent } from 'react-testing-library';
import { ph1Fields, ph2Fields, } from './policyholderFields';
import { renderWithReduxAndRouter, defaultInitialState, defaultProps } from 'test-utils';

import QuoteWorkflowTest from './QuoteWorkflow';
import quoteState from './quoteworkflowStore';

describe('Testing Quote Component with react-testing-library', () => {
  const initialState = {
    ...defaultInitialState,
    quoteState
  };

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
    const { getByTestId } = renderWithReduxAndRouter(<QuoteWorkflowTest {...props} />, { initialState });
    ph1Fields.forEach(({ name, label, data }) => {
      expect(getByTestId(`${name}_wrapper`)).toHaveTextContent(label);
      fireEvent.change(getByTestId(name), { target: { value: data }});
      expect(getByTestId(name).value).toBe(data);
    });
  });

  it('POS:Primary Policyholder Label / Text', () => {
    const { getByTestId } = renderWithReduxAndRouter(<QuoteWorkflowTest {...props} />, { initialState });
    toggleSecondUser();
    ph2Fields.forEach(({ name, label, data }) => {
      expect(getByTestId(`${name}_wrapper`)).toHaveTextContent(label);
      fireEvent.change(getByTestId(name), { target: { value: data } });
      expect(getByTestId(name).value).toBe(data);
    });
  });

  it('POS:Policy Details Text', () => {
    const { getByTestId } = renderWithReduxAndRouter(<QuoteWorkflowTest {...props} />, { initialState });
    expect(getByTestId('effectiveDate_wrapper')).toHaveTextContent('Effective Date');
    expect(getByTestId('effectiveDate')).toHaveAttribute('type', 'date');
    expect(getByTestId('agentCode_wrapper')).toHaveTextContent('Agent');
  });
});

