import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import { setSliderValue } from '.';

const mockStore = configureStore([thunk]);

export const defaultInitialState = {
  search: {},
  policy: {
    policyNumber: null,
    update: false
  },
  service: {
    zipCodeSettings: {},
    policyResults: {}
  },
  completedTasks: [],
  appState: {
    isLoading: false,
    isRecalc: false
  },
  error: {},
  authState: {
    userProfile: undefined
  },
  quoteState: {
    quote: null,
    state: {
      completedTasks: []
    }
  },
  agencyState: {
    agencies: [],
    agency: null,
    agents: []
  },
  list: {
    zipCodeSettings: {},
    uiQuestions: {},
    underwritingQuestions: [],
    agents: [],
    billingConfig: {
      billToConfig: {},
      billingOptions: [],
      defaultBillToId: '',
      paymentPlans: {},
    }
  }
};

export const renderWithReduxAndRouter = (ui, { state = defaultInitialState, store = mockStore(state) } = {}) => {
  return {
    ...render(<Router><Provider store={store}>{ui}</Provider></Router>),
    // Return our mock store, in case we want to do something with it in a test
    store,
    // Provide a function to recreate the internal wrapping of the render function
    // This is useful if we need to rerender within a test
    wrapUi: ui => <Router><Provider store={store}>{ui}</Provider></Router>
  };
};

export const defaultProps = {
  auth: {
    logout: () => {},
    isAuthenticated: () => {},
    login: jest.fn()
  },
  match: { params: {} }
};

export const testHelpers = {
  submitForm: (query, regex = /submit/) => fireEvent.click(query(regex)),
  checkError: (query, { name, error = 'Field Required' } = {}) =>
    expect(query(`${name}_error`)).toHaveTextContent(error),
  checkLabel: (query, { name, label }) => expect(query(`${name}_label`)).toHaveTextContent(label),
  checkTextInput: (query, { name, data }) => {
    const el = query(name);
    fireEvent.change(el, { target: { value: data }});
    expect(el.value).toBe(data);
  },
  checkRadio: (query, { name, values }) => {
    values.forEach(value => {
      // Get the option to select and click it
      const selectedOption = query(`${name}_${value}`);
      fireEvent.click(selectedOption);
      // Expect the parent wrapper to be selected
      expect(selectedOption.parentNode.className).toEqual('label-segmented selected');
      // Expect all other values' parents to be unchecked
      values.filter(uncheckedValue => value !== uncheckedValue)
        .forEach(uncheckedValue => expect(query(`${name}_${uncheckedValue}`).parentNode.className).toEqual('label-segmented'));
    });
  },
  checkSwitch: (query, { name, defaultValue }) => {
    const el = query(name);
    // Toggle switch twice, check value each time
    expect(el.getAttribute('data-value')).toEqual(`${defaultValue}`);
    fireEvent.click(el);
    expect(el.getAttribute('data-value')).toEqual(`${!defaultValue}`);
    fireEvent.click(el);
    expect(el.getAttribute('data-value')).toEqual(`${!!defaultValue}`);
  },
  checkSlider: (query, { name }) => {
    // We check slider min and max value
    const slider = query(`${name}-slider`);
    const min = slider.getAttribute('min');
    const max = slider.getAttribute('max');
    expect(slider);
    setSliderValue(slider, min);
    expect(slider.value).toEqual(min);
    setSliderValue(slider, max);
    expect(slider.value).toEqual(max);
  },
  checkHeader: (query, { name, text, icon = false }) => {
    // Check text content, and if an icon is present, we check that className
    expect(query(name)).toHaveTextContent(text);
    if (icon) expect(document.querySelector(`[data-test="${name}"] i`).className).toEqual(icon);
  },
  checkButton: el => {
    expect(el.getAttribute('type')).toEqual('button');
  },
  // This function is used to verify specific submit errors for one field as well
  verifyForm: (query, baseFields = [], fieldsLeftBlank = []) => {
    // Clears all text
    baseFields.forEach(({ name }) => fireEvent.change(query(name), { target: { value: '' } }));
    // Fills all fields out not in fieldsLeftBlank array based on 'data' key
    baseFields.filter(field => fieldsLeftBlank.indexOf(field) === -1)
      .forEach(({ name, data }) => fireEvent.change(query(name), { target: { value: data } }));
    // Submit form
    fireEvent.click(query(/submit/));
    // Expect errors to exist on blank fields
    // or if there are no blank fields, then we check for errors on base fields
    // which will generally not be 'Field Required' errors
    fieldsLeftBlank.length ?
    fieldsLeftBlank.forEach(({ name, error = 'Field Required' }) => expect(query(`${name}_error`)).toHaveTextContent(error))
    : baseFields.forEach(({ name, error = 'Field Required' }) => expect(query(`${name}_error`)).toHaveTextContent(error));
  }
};
