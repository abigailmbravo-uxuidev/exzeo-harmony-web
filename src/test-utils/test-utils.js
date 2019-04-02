import React from 'react';
import { render } from 'react-testing-library';
import configureStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

const mockStore = configureStore([]);

export const defaultInitialState = {
  agencyState: {},
  authState: {},
  service: {
    zipCodeSettings: {}
  },
  appState: {},
  error: {}
};

export const renderWithReduxAndRouter = (ui, { initialState = defaultInitialState, store = mockStore(initialState) } = {}) => {
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
