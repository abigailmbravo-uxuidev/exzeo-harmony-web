import React from 'react';
import { createMemoryHistory } from 'history';
import { render, fireEvent, wait } from '@testing-library/react';
import thunk from 'redux-thunk';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Auth0Context } from '../context/auth-context';
import { UserContext } from '../context/user-context';

import rootReducer from '../state/reducers';

import { setSliderValue } from '.';
import {
  quote,
  userProfile,
  latestPolicy,
  zipCodeSettings
} from '../test-utils';

export const defaultAuth = {
  isAuthenticated: true,
  user: {},
  userProfile: {
    entity: {
      companyCode: 'TTIC',
      state: 'FL'
    },
    appMetadata: { beta: false }
  },
  loading: false,
  popupOpen: false,
  getIdTokenClaims: x => x,
  loginWithRedirect: x => x,
  getTokenSilently: x => x,
  getTokenWithPopup: x => x,
  logout: x => x
};

export const defaultInitialState = {
  policy: {
    policyNumber: null,
    policy: {},
    summaryLedger: {}
  },
  service: {
    zipCodeSettings: {}
  },
  appState: {
    isLoading: false
  },
  error: {},
  quoteState: {
    quote: {
      coverageLimits: {
        dwelling: { amount: 0 }
      },
      quoteNumber: '1',
      effectiveDate: '2019-05-25',
      policyHolders: [],
      product: 'HO3',
      property: {
        physicalAddress: {}
      },
      rating: {
        netPremium: 0,
        worksheet: { fees: {} }
      },
      underwritingExceptions: []
    }
  },
  agencyState: {
    agencies: [],
    agency: {
      status: 'Active',
      cspAnswers: {
        products: [
          { answer: 'HO3', label: 'HO3' },
          { answer: 'AF3', label: 'AF3' }
        ],
        states: [{ answer: 'FL', label: 'FL' }]
      },
      contracts: [
        {
          stateProducts: [
            {
              state: 'FL',
              product: 'HO3'
            },
            {
              state: 'FL',
              product: 'AF3'
            },
            {
              state: 'NJ',
              product: 'AF3'
            },
            {
              state: 'SC',
              product: 'AF3'
            }
          ],
          companyCode: 'TTIC',
          contractNumber: 'TT FL 01 19',
          addendum: 'TT 02 18'
        }
      ]
    },
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
    logout: () => {},
    isAuthenticated: () => {},
    login: jest.fn()
  },
  match: { params: {} },
  history: {
    replace: x => x
  }
};

export const defaultQuoteWorkflowProps = {
  ...defaultProps,
  history: { replace: x => x },
  location: { pathname: '' },
  isLoading: false,
  quote,
  headerDetails: {},
  workflowState: {},
  zipCodeSettings,
  options: {
    agents: [],
    mortgagee: [],
    order: [],
    uiQuestions: {},
    zipCodeSettings
  },
  userProfile,
  updateQuote: () => Promise.resolve({}),
  getAgentsByAgencyCode: () => {},
  getZipCodeSettings: () => {},
  getQuote: () => {}
};

export const defaultPolicyWorkflowProps = {
  ...defaultProps,
  userProfile,
  location: { pathname: '/policy' },
  history: { replace: x => x },
  policy: latestPolicy,
  agents: [],
  policyDocuments: [],
  headerDetails: {},
  getAgentsByAgencyCode: () => {},
  setAppModalError: () => {},
  resetPolicy: () => {},
  getAllPolicyDocuments: () => {}
};

/**
 * @param {Object} ui - React component to be Rendered
 * @param {Object} [{ state = defaultInitialState, store = mockStore(state) }={}] - The state and store, both optional, to be used.
 * If state is provided but store is not, store will be mocked from the given state.
 */
export const customRender = (
  ui,
  {
    auth = defaultAuth,
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
    state = defaultInitialState,
    store = createStore(rootReducer, state, applyMiddleware(thunk))
  } = {}
) => ({
  ...render(
    <Router history={history}>
      <Auth0Context.Provider value={auth}>
        <UserContext.Provider value={auth.userProfile}>
          <Provider store={store}>{ui}</Provider>
        </UserContext.Provider>
      </Auth0Context.Provider>
    </Router>
  ),
  // Return our mock store, in case we want to do something with it in a test
  store,
  // Provide a function to recreate the internal wrapping of the render function
  // This is useful if we need to rerender within a test
  wrapUi: ui => (
    <Router history={history}>
      <Provider store={store}>{ui}</Provider>
    </Router>
  )
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
  if (queryName.includes('ByPlaceholderText'))
    return query(field.placeholderText);
  else return query(field.dataTest);
};

/**
 * @param {Function} query - The function from react-testing-library to be used.
 * @param {RegExp} [button] - The regex used to find the button.
 */
export const submitForm = (query, button = /submit/) =>
  fireEvent.click(query(button));

/**
 * @param {Object} query - The function from react-testing-library to be used.
 * @param {Object} field - The field object to find and test.
 */
export const clearText = (query, field) =>
  fireEvent.change(parseQueryType(query, field), { target: { value: '' } });

/**
 * @param {Object} query - The function from react-testing-library to be used.
 * @param {Object} field [{ dataTest, error = 'Field Required', ...rest }] - The field object to find and test.
 */
export const checkError = (
  query,
  { dataTest, error = 'Field Required' } = {}
) => expect(query(`${dataTest}_error`)).toHaveTextContent(error);

/**
 * @param {Function} query - The function from react-testing-library to be used.
 * @param {Object} field { dataTest, label, ...rest } - The field object to find and test.
 */
export const checkLabel = (query, { dataTest, label }) =>
  expect(query(`${dataTest}_label`)).toHaveTextContent(label);

/**
 * @param {Object} query - The function from react-testing-library to be used.
 * @param {Object} field { defaultValue, value, ...rest } - The field object to find and test.
 */
export const checkTextInput = (query, { defaultValue, value, ...rest }) => {
  rest.label && checkLabel(query, { ...rest });

  const input = parseQueryType(query, { ...rest });
  defaultValue && expect(input.value).toBe(defaultValue);
};

/**
 * @param {Object} query - The function from react-testing-library to be used.
 * @param {Object} field - The field object to find and test.
 */
export const checkOutput = async (query, { dataTest, value, ...rest }) => {
  const wrapper = parseQueryType(query, {
    ...rest,
    dataTest: `${dataTest}_wrapper`
  });

  const comp = document.querySelector(
    '[data-test="coverageLimits.dwelling.value-input"]'
  ).value;
  await wait(
    expect(wrapper.querySelector('output').textContent).toEqual(value)
  );
};

/**
 * @param {Object} query - The function from react-testing-library to be used.
 * @param {Object} field { value, ...rest } - The field object to find and test.
 */
export const checkPhoneInput = (query, field) => {
  field.label && checkLabel(query, field);
  expect(parseQueryType(query, field));
};

/**
 * @param {Object} query - The function from react-testing-library to be used.
 * @param {Object} field { dataTest = '', text = '', label = '', values } - The field object to find and test.
 */
export const checkRadio = (
  query,
  { dataTest, values, defaultValue, format = x => x, outputValue, ...rest }
) => {
  rest.label && checkLabel(query, { dataTest, label: rest.label });

  values.forEach((value, i) => {
    // Get the option to select
    const selectedOption = parseQueryType(query, {
      ...rest,
      dataTest: `${dataTest}_${value}`
    });
    const unselectedClass = 'label-segmented';
    const selectedClass = 'label-segmented selected';

    // Expect the value of the text is equal to the formatted value
    expect(selectedOption.textContent).toEqual(format(value));
    // If this is the default value it should be checked already, otherwise it should not be
    if (value === defaultValue) {
      expect(selectedOption.parentNode.className).toEqual(selectedClass);
    } else {
      expect(selectedOption.parentNode.className).toEqual(unselectedClass);
    }
  });

  // Check the computed output
  if (outputValue) {
    expect(
      parseQueryType(query, {
        dataTest: `${dataTest}_wrapper`
      }).querySelector('output').textContent
    ).toEqual(outputValue);
  }
};

/**
 * @param {Object} query - The function from react-testing-library to be used.
 * @param {Object} field - The field object to find and test.
 */
export const checkSwitch = async (query, field) => {
  field.label && checkLabel(query, { ...field });

  const switchDiv = parseQueryType(query, field);
  // Toggle switch twice, check value each time
  expect(switchDiv.getAttribute('data-value')).toEqual(`${field.defaultValue}`);
  fireEvent.click(switchDiv);
  await wait(() =>
    expect(switchDiv.getAttribute('data-value')).toEqual(
      `${!field.defaultValue}`
    )
  );
  fireEvent.click(switchDiv);
  await wait(() =>
    expect(switchDiv.getAttribute('data-value')).toEqual(
      `${!!field.defaultValue}`
    )
  );
};

/**
 * @param {Object} query - The function from react-testing-library to be used.
 * @param {Object} field { dataTest, ...rest } - The field object to find and test.
 */
export const checkSlider = async (query, { dataTest, ...rest }) => {
  rest.label && checkLabel(query, { dataTest, ...rest });

  // We check slider min and max value
  const slider = parseQueryType(query, {
    ...rest,
    dataTest: `${dataTest}-slider`
  });
  const initialVal = slider.getAttribute('value');

  const min = slider.getAttribute('min');
  const max = slider.getAttribute('max');
  expect(slider);
  setSliderValue(slider, min);
  await wait(() => expect(slider.value).toEqual(min));
  setSliderValue(slider, max);
  await wait(() => expect(slider.value).toEqual(max));
  // reset slider
  setSliderValue(slider, initialVal);
  await wait(() => expect(slider.value).toEqual(initialVal));
};

/**
 * @param {Function} query - The function from react-testing-library to be used.
 * @param {string} queryString - String used in query
 * @param {Object} field { dataTest, icon = false, text, ...rest } - The field object to find and test.
 */
export const checkHeader = (
  query,
  queryString,
  { dataTest, icon = false, text, ...rest }
) => {
  const header = query(queryString);
  expect(header).toHaveTextContent(text);
  if (icon) {
    // find the first icon element and check that it's classname is the icon value in the field
    const iconElement = Object.values(header.childNodes).find(
      node => node.tagName === 'I'
    );
    expect(iconElement.className).toEqual(icon);
  }
};

/**
 * @param {Object} query - The function from react-testing-library to be used.
 * @param {Object} field { defaultValue, values = [], ...rest } - The field object to find and test.
 */
export const checkSelect = (query, { defaultValue, values = [], ...rest }) => {
  const select = parseQueryType(query, { ...rest });
  if (defaultValue) {
    expect(select.getAttribute('data-selected')).toEqual(defaultValue.value);
    expect(
      select.querySelector(`option[value="${defaultValue.value}"]`).textContent
    ).toEqual(defaultValue.label);
  }
  values.forEach(({ value, label = value }) => {
    expect(
      select.querySelector(`option[value="${value}"]`).textContent
    ).toEqual(label);
  });
};

/**
 * @param {Object} query - The function from react-testing-library to be used.
 * @param {Object} button { dataTest, text, type, ...rest } = {} - The button object to find and test.
 */
export const checkButton = (
  query,
  { dataTest = 'submit', text = 'next', type = 'button', ...rest } = {}
) => {
  const button = parseQueryType(query, { ...rest, dataTest, text });
  expect(button.getAttribute('type')).toEqual(type);
  expect(button.textContent).toEqual(text);
};

/**
 * This function is used to verify specific submit errors for one field as well
 * @param {Object} query - The function from react-testing-library to be used.
 * @param {Array} [baseFields=[]] - Array of field objects to fill out.
 * @param {Array} [fieldsLeftBlank=[]] - Array of field objects to leave blank.
 * @param {RegExp|String} [button] - The regex/string used to find the button.
 */
export const verifyForm = async (
  query,
  baseFields = [],
  fieldsLeftBlank = [],
  button
) => {
  // Clears all text
  [...baseFields, ...fieldsLeftBlank].forEach(field => clearText(query, field));
  // Fills all fields out not in fieldsLeftBlank array based on 'data' key
  baseFields
    .filter(field => fieldsLeftBlank.indexOf(field) === -1)
    .forEach(({ value, ...rest }) =>
      fireEvent.change(parseQueryType(query, { ...rest }), {
        target: { value }
      })
    );
  // Submit form
  submitForm(query, button);
  // Expect errors to exist on blank fields
  // or if there are no blank fields, then we check for errors on base fields
  // which will generally not be 'Field Required' errors
  await wait(() =>
    fieldsLeftBlank.length
      ? fieldsLeftBlank.forEach(field => checkError(query, field))
      : baseFields.forEach(field => checkError(query, field))
  );
};

export * from '@testing-library/react';
// override render method
export { customRender as render };
