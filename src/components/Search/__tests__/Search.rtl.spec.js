import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { fireEvent, waitForDomChange, wait } from 'react-testing-library';
import thunk from 'redux-thunk';

import { renderWithReduxAndRouter, defaultProps, defaultInitialState } from '../../../test-utils';
import rootReducer from '../../../state/reducers';
import ConnectedSearch from '../Search';

describe('Testing Search Component', () => {
  const props = {
    ...defaultProps,
    searchType: 'address',
    clearResults: () => {},
    clearQuote: () => {}
  };

  const state = { ...defaultInitialState, form: {} };

  // Create a real store with our actual reducers so we have the formReducer
  const store = createStore(rootReducer, state, applyMiddleware(thunk));

  it('NEG:Property Address Search Bar Empty Value', () => {
    const { getByPlaceholderText, getByTestId } = renderWithReduxAndRouter(<ConnectedSearch {...props} />, { store });
    const typeAndCheckButton = (value, buttonDisabled = false) => {
      fireEvent.change(searchbar, { target: { value } });
      fireEvent.blur(searchbar);
      expect(getByTestId('submit').disabled).toBe(buttonDisabled);
    };

    const searchbar = getByPlaceholderText(/Search for Property Address/);
    expect(searchbar);
    // Search with one bad search and some good ones, to confirm spacing works
    typeAndCheckButton('    ', true);
    typeAndCheckButton('  4131 TEST ADDRESS');
    typeAndCheckButton('4131 TEST ADDRESS  ');
  });

  it('NEG:Test Invalid Addresses', () => {
    const { getByPlaceholderText, getByTestId } = renderWithReduxAndRouter(<ConnectedSearch {...props} />, { store });
    const searchbar = getByPlaceholderText(/Search for Property Address/);
    fireEvent.change(searchbar, { target: { value: '4131 TEST ADDRESS ≈ˆÎÍÒÍ' } });
    fireEvent.blur(searchbar);
    // Expect to get the error when we search with invalid characters
    expect(getByTestId('address_wrapper').className.includes('error')).toBe(true);
    expect(document.getElementById('erroraddress')).toBeInTheDocument();
  });

  it('POS:Property Search Text', () => {
    const { getByText } = renderWithReduxAndRouter(<ConnectedSearch {...props} />, { state });

    expect(getByText(/If you don't see your address/));
    expect(getByText(/If you still have problems finding an address/));
    expect(getByText(/call us/).parentNode).toHaveAttribute('href', 'tel:844-289-7968');
  });

  it('POS:Property Search Results Card', () => {
    const newState = { ...state,
      search: {
        totalPages: 1, totalRecords: 1, noResults: false, hasSearched: true,
        results: [{
          id: 'id1',
          source: 'casaclue',
          physicalAddress: {
            address1: '4131 TEST ADDRESS',
            address2: '',
            city: 'SARASOTA',
            state: 'FL',
            county: 'SARASOTA',
            zip: '00001',
            latitude: 27.27967,
            longitude: -82.47786
          }
        }]
      }
    };
    const { getByText } = renderWithReduxAndRouter(<ConnectedSearch {...props} />, { state: newState });
    const result = newState.search.results[0];
    const card = document.querySelector(`li#${result.id} a`);

    expect(card.querySelector('i.fa-map-marker'));
    expect(getByText(`${result.physicalAddress.address1}`));
    expect(getByText(`${result.physicalAddress.city}, ${result.physicalAddress.state} ${result.physicalAddress.zip}`));
    expect(card.querySelector('i.fa-chevron-circle-right'));
  });
});
