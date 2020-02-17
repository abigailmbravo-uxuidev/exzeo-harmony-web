import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { fireEvent } from 'react-testing-library';
import thunk from 'redux-thunk';

import {
  renderWithReduxAndRouter,
  defaultProps,
  defaultInitialState,
  searchResult
} from '../../../test-utils';
import rootReducer from '../../../state/reducers';
import ConnectedSearch from '../Search';

describe('Testing Search Component', () => {
  const props = {
    ...defaultProps,
    searchType: 'address',
    agency: {
      status: 'Active',
      cspAnswers: {
        products: [
          { answer: 'HO3', label: 'HO3' },
          { answer: 'AF3', label: 'AF3' }
        ]
      }
    },
    clearResults: () => {},
    clearQuote: () => {}
  };

  const state = { ...defaultInitialState, form: {} };

  // Create a real store with our actual reducers so we have the formReducer
  const store = createStore(rootReducer, state, applyMiddleware(thunk));

  it('NEG:Property Address Search Bar Empty Value', async () => {
    const {
      getByLabelText,
      getByPlaceholderText,
      getByTestId
    } = renderWithReduxAndRouter(<ConnectedSearch {...props} />, { store });

    const productSelect = await getByLabelText('Select Product');
    expect(productSelect);
    const addressInput = getByPlaceholderText(/Search for Property Address/);
    expect(addressInput);

    expect(getByTestId('submit').disabled).toBe(true);
    fireEvent.change(getByLabelText('Select Product'), {
      target: { value: 'HO3' }
    });

    expect(getByTestId('submit').disabled).toBe(true);
    fireEvent.change(getByLabelText('Select State'), {
      target: { value: 'FL' }
    });

    // Search with one bad search and some good ones, to confirm spacing works
    fireEvent.change(addressInput, { target: { value: '     ' } });
    expect(getByTestId('submit').disabled).toBe(true);

    fireEvent.change(addressInput, { target: { value: '123 test address' } });
    expect(getByTestId('submit').disabled).toBe(false);
  });

  it('NEG:Test Invalid Addresses', () => {
    const { getByPlaceholderText, getByTestId } = renderWithReduxAndRouter(
      <ConnectedSearch {...props} />,
      { store }
    );
    const searchbar = getByPlaceholderText(/Search for Property Address/);
    fireEvent.change(searchbar, {
      target: { value: '4131 TEST ADDRESS ≈ˆÎÍÒÍ' }
    });
    fireEvent.blur(searchbar);
    // Expect to get the error when we search with invalid characters
    expect(getByTestId('address_wrapper').className.includes('error')).toBe(
      true
    );
    expect(document.getElementById('erroraddress')).toBeInTheDocument();
  });

  it('POS:Property Search Text', () => {
    const { getByText } = renderWithReduxAndRouter(
      <ConnectedSearch {...props} />,
      { state }
    );

    expect(getByText(/If you don't see your address/));
    expect(getByText(/If you still have problems finding an address/));
    expect(getByText(/call us/).parentNode).toHaveAttribute(
      'href',
      'tel:844-289-7968'
    );
  });

  it('POS:Property Search Results Card', () => {
    const newState = {
      ...state,
      search: {
        totalPages: 1,
        totalRecords: 1,
        noResults: false,
        hasSearched: true,
        results: [searchResult]
      }
    };
    const { getByText } = renderWithReduxAndRouter(
      <ConnectedSearch {...props} />,
      { state: newState }
    );
    const result = newState.search.results[0];
    const card = document.querySelector(`li#${result.id} a`);

    expect(card.querySelector('i.fa-map-marker')).toBeInTheDocument();
    expect(getByText(`${result.physicalAddress.address1}`));
    expect(
      getByText(
        `${result.physicalAddress.city}, ${result.physicalAddress.state} ${result.physicalAddress.zip}`
      )
    );
    expect(card.querySelector('i.fa-chevron-circle-right')).toBeInTheDocument();
  });
});
