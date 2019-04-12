import React from 'react';
import 'jest-dom/extend-expect';
import { createStore, applyMiddleware } from 'redux';
import { fireEvent } from 'react-testing-library';
import thunk from 'redux-thunk';

import { renderWithReduxAndRouter, defaultProps, defaultInitialState } from '../../../test-utils';
import rootReducer from '../../../reducers/index';
import ConnectedSearch from '../Search';

describe('Testing Search Component', () => {
  const props = {
    ...defaultProps,
    clearResults: () => {},
    clearQuote: () => {}
  };

  const state = {
    ...defaultInitialState,
    form: {}
  };

  // Create a real store with our actual reducers so we have the formReducer
  const store = createStore(rootReducer, state, applyMiddleware(thunk));

  it('NEG:Property Address Search Bar Empty Value', () => {
    const { getByPlaceholderText, getByTestId } = renderWithReduxAndRouter(<ConnectedSearch {...props} />, { store });
    const typeAndCheckError = (value, errorExists = false) => {
      fireEvent.change(searchbar, { target: { value } });
      fireEvent.blur(searchbar);
      if (errorExists) expect(getByTestId('submit').disabled).toBeTruthy();
      expect(getByTestId('address_wrapper').className.includes('error')).toBe(errorExists);
    };

    const searchbar = getByPlaceholderText(/Search for Property Address/);
    expect(searchbar);
    // Search with one bad search and some good ones, to confirm spacing works
    typeAndCheckError('    ', true);
    typeAndCheckError('  4131 TEST ADDRESS');
    typeAndCheckError('4131 TEST ADDRESS  ');
  });

  it('NEG:Test Invalid Addresses', () => {
    const { getByPlaceholderText, getByTestId } = renderWithReduxAndRouter(<ConnectedSearch {...props} />, { store });
    const searchbar = getByPlaceholderText(/Search for Property Address/);
    fireEvent.change(searchbar, { target: { value: '4131 TEST ADDRESS ≈ˆÎÍÒÍ' }});
    fireEvent.blur(searchbar);
    // Expect to get the error when we search with invalid characters
    expect(getByTestId('address_wrapper').className.includes('error')).toBe(true);
    const errorIcon = document.querySelector('i[data-for="erroraddress"]');
    fireEvent.mouseOver(errorIcon);
    expect(document.querySelector('div[data-id="tooltip"]'));
  });

  it('POS:Property Search', () => {
    const { getByText } = renderWithReduxAndRouter(<ConnectedSearch {...props} />, { store });
    expect(getByText(/If you don't see your address/));
    expect(getByText(/If you still have problems finding an address/));
    expect(getByText(/call us/).parentNode).toHaveAttribute('href', 'tel:844-289-7968');
  });
});
