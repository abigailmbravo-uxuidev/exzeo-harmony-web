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
    isLoading: false
  },
  error: {},
  authState: {
    userProfile: {
      entity: {
        companyCode: 'TTIC',
        state: 'FL'
      },
      appMetadata: { beta: false }
    }
  },
  quoteState: {
    quote: {
      coverageLimits: {},
      quoteNumber: '1',
      effectiveDate: '2019-05-25',
      product: 'HO3',
      property: {
        physicalAddress: {}
      }
    },
    state: {
      completedTasks: []
    }
  },
  agencyState: {
    agencies: [],
    agency: {},
    agents: []
  },
  list: {
    zipCodeSettings: {},
    uiQuestions: {},
    underwritingQuestions: [],
    agents: [],
    order: [],
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

const parseQueryType = (query, field) => {
  // We determine which field value to use based on query name
  const queryName = query.name.replace(/bound /g, '');
  switch (queryName) {
    case 'getByTestId':
      return query(field.name);
    case 'getByText':
      return query(field.text);
    case 'getByLabel':
      return query(field.label);
    default:
      return query(field.name);
  };
};

export const submitForm = (query, regex = /submit/) => fireEvent.click(query(regex));

export const checkError = (query, { name = '', text = '', label = '', error = 'Field Required' } = {}) =>
  expect(parseQueryType(query, { name: `${name}_error`, text, label, error })).toHaveTextContent(error);

export const checkLabel = (query, { name = '', text = '', label }) => expect(parseQueryType(query, { name: `${name}_label`, text, label })).toHaveTextContent(label);

export const checkTextInput = (query, field) => {
  const input = parseQueryType(query, field);
  fireEvent.change(input, { target: { value: field.data } });
  expect(input.value).toBe(field.data);
};

export const checkPhoneInput = (query, field) => {
  const input = parseQueryType(query, field);
  fireEvent.change(input, { target: { value: field.data } });
  expect(input.value).toMatch(new RegExp(field.data.slice(0, 2)));
};

export const checkRadio = (query, { name = '', text = '', label = '', values }) => {
  values.forEach(value => {
    // Get the option to select and click it
    const selectedOption = parseQueryType(query, { name: `${name}_${value}`, text, label });
    fireEvent.click(selectedOption);
    // Expect the parent wrapper to be selected
    expect(selectedOption.parentNode.className).toEqual('label-segmented selected');
    // Expect all other values' parents to be unchecked
    values.filter(uncheckedValue => value !== uncheckedValue)
      .forEach(uncheckedValue => expect(parseQueryType(query, { name: `${name}_${uncheckedValue}`, text, label }).parentNode.className).toEqual('label-segmented'));
  });
};

export const checkSwitch = (query, field) => {
  const switchDiv = parseQueryType(query, field);
  // Toggle switch twice, check value each time
  expect(switchDiv.getAttribute('data-value')).toEqual(`${field.defaultValue}`);
  fireEvent.click(switchDiv);
  expect(switchDiv.getAttribute('data-value')).toEqual(`${!field.defaultValue}`);
  fireEvent.click(switchDiv);
  expect(switchDiv.getAttribute('data-value')).toEqual(`${!!field.defaultValue}`);
};

export const checkSlider = (query, { name = '', text = '', label = '' }) => {
  // We check slider min and max value
  const slider = parseQueryType(query, { name: `${name}-slider`, text, label });
  const min = slider.getAttribute('min');
  const max = slider.getAttribute('max');
  expect(slider);
  setSliderValue(slider, min);
  expect(slider.value).toEqual(min);
  setSliderValue(slider, max);
  expect(slider.value).toEqual(max);
};

export const checkHeader = (query, { name = '', text, label = '', icon = false }) => {
  // const header = query(name || text);
  const header = parseQueryType(query, { name, text, label });
  expect(header).toHaveTextContent(text);
  if (icon) {
    // find the first icon element and check that it's classname is the icon value in the field
    const iconElement = Object.values(header.childNodes).find(node => node.tagName === 'I');
    expect(iconElement.className).toEqual(icon);
  }
};

export const checkSelect = (query, field, queryOptions) => {
  const select = parseQueryType(query, field, queryOptions);
  field.values && field.values.forEach(value => {
    fireEvent.change(select, { target: { value } });
    expect(select.getAttribute('data-selected')).toEqual(value);
  });
};

export const checkButton = (query, field = { name: 'submit' }) =>
  expect(parseQueryType(query, field).getAttribute('type')).toEqual('button');

// This function is used to verify specific submit errors for one field as well
export const verifyForm = (query, baseFields = [], fieldsLeftBlank = []) => {
  // Clears all text
  baseFields.forEach(field => fireEvent.change(parseQueryType(query, field), { target: { value: '' } }));
  // Fills all fields out not in fieldsLeftBlank array based on 'data' key
  baseFields.filter(field => fieldsLeftBlank.indexOf(field) === -1)
    .forEach(field => fireEvent.change(parseQueryType(query, field), { target: { value: field.data } }));
  // Submit form
  submitForm(query);
  // Expect errors to exist on blank fields
  // or if there are no blank fields, then we check for errors on base fields
  // which will generally not be 'Field Required' errors
  fieldsLeftBlank.length ?
    fieldsLeftBlank.forEach(field => checkError(query, field)) : baseFields.forEach(field => checkError(query, field));
};
