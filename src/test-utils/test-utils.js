import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import { setSliderValue } from '.';
import { quote, userProfile, zipCodeSettings } from '../test-utils';

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
      coverageLimits: {
        dwelling: { amount: 0 }
      },
      quoteNumber: '1',
      effectiveDate: '2019-05-25',
      product: 'HO3',
      property: {
        physicalAddress: {}
      },
      rating: {
        netPremium: 0,
        worksheet: { fees: {}}
      },
      underwritingExceptions: []
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
    agents: [],
    order: []
  }
};

export const defaultProps = {
  auth: {
    logout: () => { },
    isAuthenticated: () => { },
    login: jest.fn()
  },
  match: { params: {} }
};


export const defaultQuoteWorkflowProps = {
  ...defaultProps,
  history: { replace: x => x },
  location: { pathname: '' },
  isLoading: false,
  quote: {
    ...quote,
    rating: { worksheet: { fees: {} } }
  },
  quoteData: {
    ...quote,
    rating: { worksheet: { fees: {} } }
  },
  headerDetails: {},
  workflowState: {},
  zipCodeSettings,
  options: {
    agents: [], mortgagee: [], uiQuestions: {}, zipCodeSettings
  },
  userProfile,
  submitForm: () => { },
  updateQuote: () => Promise.resolve({}),
  getAgentsByAgencyCode: () => { },
  getZipcodeSettings: () => { },
  getEnumsForQuoteWorkflow: () => { },
  getBillingOptions: () => { },
  getQuote: () => { }
};

/**
 * @param {Object} ui - React component to be Rendered
 * @param {Object} [{ state = defaultInitialState, store = mockStore(state) }={}] - The state and store, both optional, to be used.
 * If state is provided but store is not, store will be mocked from the given state.
 */
export const renderWithReduxAndRouter = (ui, { state = defaultInitialState, store = mockStore(state) } = {}) =>
  ({
    ...render(<Router><Provider store={store}>{ui}</Provider></Router>),
    // Return our mock store, in case we want to do something with it in a test
    store,
    // Provide a function to recreate the internal wrapping of the render function
    // This is useful if we need to rerender within a test
    wrapUi: ui => <Router><Provider store={store}>{ui}</Provider></Router>
  });

/**
 * A function to handle your query and your field and find the correct DOM element.
 * This way the check functions below can handle any query type from react-testing-library.
 * @param {Object} query - The function from react-testing-library to be used.
 * @param {Object} field - The field object to find and test.
 * @returns {Object} Node - The DOM node found via the query.
 */
const parseQueryType = (query, field) => {
  // We determine which field value to use based on query name
  const queryName = query.name.replace(/bound /g, '');

  if (queryName.includes('ByTestId')) return query(field.test || field.name);
  if (queryName.includes('ByText')) return query(field.text);
  if (queryName.includes('ByLabelText')) return query(field.label);
  else return query(field.name);
};

/**
 * @param {Object} query - The function from react-testing-library to be used.
 * @param {regex} [button=/submit/] - The regex used to find the button.
 */
export const submitForm = (query, button = /submit/) => fireEvent.click(query(button));

/**
 * @param {Object} query - The function from react-testing-library to be used.
 * @param {Object} field - The field object to find and test.
 */
export const clearText = (query, field) => fireEvent.change(parseQueryType(query, field), { target: { value: '' }});

/**
 * @param {Object} query - The function from react-testing-library to be used.
 * @param {Object} field [{ name = '', text = '', label = '', error = 'Field Required' }={}] - The field object to find and test.
 */
export const checkError = (query, { test = '', name = '', text = '', label = '', error = 'Field Required' } = {}) =>
  expect(parseQueryType(query, { name: `${test || name}_error`, text, label, error })).toHaveTextContent(error);

/**
 * @param {Object} query - The function from react-testing-library to be used.
 * @param {Object} field { name = '', text = '', label } - The field object to find and test.
 */
export const checkLabel = (query, { test= '', name = '', text = '', label }) => expect(parseQueryType(query, { name: `${test || name}_label`, text, label })).toHaveTextContent(label);

/**
 * @param {Object} query - The function from react-testing-library to be used.
 * @param {Object} field - The field object to find and test.
 */
export const checkTextInput = (query, field) => {
  const input = parseQueryType(query, field);
  fireEvent.change(input, { target: { value: field.data } });
  expect(input.value).toBe(field.data);
};

/**
 * @param {Object} query - The function from react-testing-library to be used.
 * @param {Object} field - The field object to find and test.
 */
export const checkPhoneInput = (query, field) => {
  const input = parseQueryType(query, field);
  fireEvent.change(input, { target: { value: field.data }});
  expect(input.value).toMatch(new RegExp(field.data.slice(0, 2)));
};

/**
 * @param {Object} query - The function from react-testing-library to be used.
 * @param {Object} field { name = '', text = '', label = '', values } - The field object to find and test.
 */
export const checkRadio = (query, { name = '', text = '', label = '', values }) =>
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

/**
* @param {Object} query - The function from react-testing-library to be used.
* @param {Object} field - The field object to find and test.
*/
export const checkSwitch = (query, field) => {
  const switchDiv = parseQueryType(query, field);
  // Toggle switch twice, check value each time
  expect(switchDiv.getAttribute('data-value')).toEqual(`${field.defaultValue}`);
  fireEvent.click(switchDiv);
  expect(switchDiv.getAttribute('data-value')).toEqual(`${!field.defaultValue}`);
  fireEvent.click(switchDiv);
  expect(switchDiv.getAttribute('data-value')).toEqual(`${!!field.defaultValue}`);
};

/**
 * @param {Object} query - The function from react-testing-library to be used.
 * @param {Object} field { name = '', text = '', label = '' } - The field object to find and test.
 */
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

/**
 * @param {Object} query - The function from react-testing-library to be used.
 * @param {Object} field { name = '', text, label = '', icon = false } - The field object to find and test.
 */
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

/**
 * @param {Object} query - The function from react-testing-library to be used.
 * @param {Object} field - The field object to find and test.
 */
export const checkSelect = (query, field) => {
  const select = parseQueryType(query, field);
  field.values && field.values.forEach(value => {
    fireEvent.change(select, { target: { value }});
    expect(select.getAttribute('data-selected')).toEqual(value);
  });
};

/**
 * @param {Object} query - The function from react-testing-library to be used.
 * @param {Object} field [field={ name: 'submit' }] - The field object to find and test.
 */
export const checkButton = (query, field = { name: 'submit' }) =>
  expect(parseQueryType(query, field).getAttribute('type')).toEqual('button');

/**
 * This function is used to verify specific submit errors for one field as well
 * @param {Object} query - The function from react-testing-library to be used.
 * @param {Array} [baseFields=[]] - Array of field objects to fill out.
 * @param {Array} [fieldsLeftBlank=[]] - Array of field objects to leave blank.
 * @param {regex|string} button - The regex/string used to find the button.
 */
export const verifyForm = (query, baseFields = [], fieldsLeftBlank = [], button) => {
  // Clears all text
  [...baseFields, ...fieldsLeftBlank].forEach(field => clearText(query, field));
  // Fills all fields out not in fieldsLeftBlank array based on 'data' key
  baseFields.filter(field => fieldsLeftBlank.indexOf(field) === -1)
    .forEach(field => fireEvent.change(parseQueryType(query, field), { target: { value: field.data }}));
  // Submit form
  submitForm(query, button);
  // Expect errors to exist on blank fields
  // or if there are no blank fields, then we check for errors on base fields
  // which will generally not be 'Field Required' errors
  fieldsLeftBlank.length ?
    fieldsLeftBlank.forEach(field => checkError(query, field)) : baseFields.forEach(field => checkError(query, field));
};
