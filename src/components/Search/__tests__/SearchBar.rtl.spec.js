import React from 'react';
import { reduxForm } from 'redux-form';

import { renderWithReduxAndRouter, defaultProps, defaultInitialState } from '../../../test-utils';
import ConnectedSearchBar, {
  SearchBar, handleSearchBarSubmit, changePageQuote
} from '../SearchBar';

describe('Testing SearchBar Component', () => {

  it('POS:Should test connected searchbar', () => {
    const { getByPlaceholderText, getByText } = renderWithReduxAndRouter(<ConnectedSearchBar {...defaultProps} />);
    expect(getByPlaceholderText(/Search for Property Address/));
    expect(getByText(/Property Address/));
  });

  it('POS:Should test submit', () => {
    const { store } = renderWithReduxAndRouter(<ConnectedSearchBar {...defaultProps} />);

    handleSearchBarSubmit({
      firstName: '',
      lastName: '',
      address: '',
      quoteNumber: '',
      policyNumber: '',
      zip: ''
    }, store.dispatch, defaultProps);
  });

  it('POS:Should test changing page quote', () => {
    const { store } = renderWithReduxAndRouter(<ConnectedSearchBar {...defaultProps} />);

    const props = {
      ...defaultProps,
      dispatch: store.dispatch
    };

    changePageQuote(props, false);
    changePageQuote(props, true);
  });

  it('POS:Should be able to be recreated', () => {
    const props = {
      ...defaultProps,
      ...defaultInitialState,
      handleSubmit: () => () => {},
      fieldValues: {},
      userProfile: { appMetadata: { beta: false } }
    };

    const SearchBarForm = reduxForm({
      form: 'SearchBar',
      enableReinitialize: true,
    })(SearchBar);
    const { getByPlaceholderText } = renderWithReduxAndRouter(<SearchBarForm {...props} />);
    expect(getByPlaceholderText(/Search for Property Address/));
  });
});
