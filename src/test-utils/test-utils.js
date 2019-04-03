import React from 'react';
import { render } from 'react-testing-library';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

const mockStore = configureStore([thunk]);

export const defaultInitialState = {
  policy: {},
  service: {
    zipCodeSettings: {},
    policyResults: {}
  },
  appState: { isLoading: false },
  authState: {},
  error: {},
  completedTasks: [],
  search: {},
  quoteState: {
    quote: null,
    state: {}
  },
  agencyState: {},
  list: {}
};

export const renderWithReduxAndRouter = (ui, { state = defaultInitialState, store = mockStore(state) } = {}) => {
  return { ...render(<Router><Provider store={store}>{ui}</Provider></Router>), store };
};

export const defaultProps = {
  auth: {
    logout: jest.fn(),
    isAuthenticated: jest.fn(),
    login: jest.fn()
  },
  match: { params: {} }
};
