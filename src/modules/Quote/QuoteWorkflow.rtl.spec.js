import React from 'react';
import 'jest-dom/extend-expect';
import configureStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render, fireEvent, cleanup, configure } from 'react-testing-library';
import { ph1Fields, ph2Fields, policyDetailsFields, workflowSections, pageHeaders } from './policyholderFields';

import QuoteWorkflowTest from './QuoteWorkflow';
import quoteState from './quoteworkflowStore';

const mockStore = configureStore([]);

describe('Testing Quote Component with react-testing-library', () => {
  configure({ testIdAttribute: 'data-test' });
  afterEach(cleanup);

  const initialState = {
    agencyState: {},
    authState: {},
    service: {
      zipCodeSettings: {}
    },
    appState: {},
    error: {},
    quoteState
  };

  const props = {
    history: {},
    location: {
      pathname: ''
    },
    auth: {
      logout: x => x,
    },
    match: {
      params: {}
    },
    setPolicySearch() {}
  };

  const renderWithReduxAndRouter = (ui, { initialState, store = mockStore(initialState)} = {}) => {
    return { ...render(<Router><Provider store={store}>{ui}</Provider></Router>), store };
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

