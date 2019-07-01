import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import { setSliderValue } from '.';
import { quote, userProfile, latestPolicy, zipCodeSettings } from '../test-utils';

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
  match: { params: {}}
};


export const defaultQuoteWorkflowProps = {
  ...defaultProps,
  history: { replace: x => x },
  location: { pathname: '' },
  isLoading: false,
  quote,
  quoteData: quote,
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

export const defaultPolicyWorkflowProps = {
  ...defaultProps,
  policy: latestPolicy,
  history: { replace: x => x },
  location: { pathname: '/policy' },
  getPolicyDocumentsAction: () => { },
  getSummaryLedgerAction: () => { },
  getLatestPolicyAction: () => { },
  getAgentsByAgencyCode: () => { },
  setAppModalErrorAction: () => { },
  clearPolicy: () => { },
  agents: [],
  policyDocuments: [],
  headerDetails: {},
  initializePolicyWorkflow: () => { }
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

  if (queryName.includes('ByTestId')) return query(field.dataTest);
  if (queryName.includes('ByText')) return query(field.text);
  if (queryName.includes('ByLabelText')) return query(field.label);
  if (queryName.includes('ByPlaceholderText')) return query(field.placeholderText);
  else return query(field.dataTest);
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
 * @param {Object} field [{ dataTest, error = 'Field Required', ...rest }] - The field object to find and test.
 */
export const checkError = (query, { dataTest, error = 'Field Required', ...rest } = {}) =>
  expect(parseQueryType(query, { ...rest, dataTest: `${dataTest}_error`, error })).toHaveTextContent(error);

/**
 * @param {Object} query - The function from react-testing-library to be used.
 * @param {Object} field { dataTest, label, ...rest } - The field object to find and test.
 */
export const checkLabel = (query, { dataTest, label, ...rest }) =>
  expect(parseQueryType(query, { ...rest, dataTest: `${dataTest}_label`, label })).toHaveTextContent(label);

/**
 * @param {Object} query - The function from react-testing-library to be used.
 * @param {Object} field - The field object to find and test.
 */
export const checkTextInput = (query, field) => {
  const input = parseQueryType(query, field);
  fireEvent.change(input, { target: { value: field.data }});
  expect(input.value).toBe(field.data);
};

/**
 * @param {Object} query - The function from react-testing-library to be used.
 * @param {Object} field - The field object to find and test.
 */
export const checkOutput = (query, { dataTest, value, ...rest }) => {
  const wrapper = parseQueryType(query, { ...rest, dataTest: `${dataTest}_wrapper` });
  expect(wrapper.querySelector('output').textContent).toEqual(value);
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
 * @param {Object} field { dataTest = '', text = '', label = '', values } - The field object to find and test.
 */
export const checkRadio = (query,
  { dataTest, values, defaultValue, format = x => x, outputValues = [], ...rest }
) =>
  values.forEach((value, i) => {
    // Get the option to select
    const selectedOption = parseQueryType(query, { ...rest, dataTest: `${dataTest}_${value}` });
    const unselectedClass = 'label-segmented';
    const selectedClass = 'label-segmented selected';

    // Expect the value of the text is equal to the formatted value
    expect(selectedOption.textContent).toEqual(format(value));
    // If this is the default value it should be checked already, otherwise it should not be
    value === defaultValue ?
      expect(selectedOption.parentNode.className).toEqual(selectedClass) :
      expect(selectedOption.parentNode.className).toEqual(unselectedClass);

    // Click the option
    fireEvent.click(selectedOption);
    // If there is an output field, check it now
    outputValues[i] && expect(parseQueryType(query, { dataTest: `${dataTest}_wrapper` }).querySelector('output').textContent).toEqual(outputValues[i]);
    // Expect the parent wrapper to be selected
    expect(selectedOption.parentNode.className).toEqual(selectedClass);
    // Expect all other values' parents to be unchecked
    values.filter(uncheckedValue => value !== uncheckedValue)
      .forEach(uncheckedValue => expect(parseQueryType(query, { ...rest, dataTest: `${dataTest}_${uncheckedValue}` }).parentNode.className).toEqual(unselectedClass));
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
 * @param {Object} field { dataTest, ...rest } - The field object to find and test.
 */
export const checkSlider = (query, { dataTest, ...rest }) => {
  // We check slider min and max value
  const slider = parseQueryType(query, { ...rest, dataTest: `${dataTest}-slider` });
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
 * @param {Object} field { dataTest, icon = false, text, ...rest } - The field object to find and test.
 */
export const checkHeader = (query, { dataTest, icon = false, text, ...rest }) => {
  const header = parseQueryType(query, { ...rest, dataTest, text });
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
  field.defaultValue && expect(select.getAttribute('data-selected')).toEqual(field.defaultValue);
  field.values && field.values.forEach(value => {
    fireEvent.change(select, { target: { value }});
    expect(select.getAttribute('data-selected')).toEqual(value);
  });
};

/**
 * @param {Object} query - The function from react-testing-library to be used.
 * @param {Object} field [field={ dataTest: 'submit' }] - The field object to find and test.
 */
export const checkButton = (query, field = { dataTest: 'submit', text: 'Submit' }) =>
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
