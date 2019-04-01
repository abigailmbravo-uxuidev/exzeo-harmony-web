import React from 'react';
import 'jest-dom/extend-expect';
import configureStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render, fireEvent, cleanup, configure } from 'react-testing-library';
// import { configure } from 'dom-testing-library'

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

  it('Works?', () => {
    const { getByTestId } = renderWithReduxAndRouter(<QuoteWorkflowTest {...props} />, { initialState });
    expect(getByTestId('effectiveDate_label')).toHaveTextContent('Effective Date');
  });

});

