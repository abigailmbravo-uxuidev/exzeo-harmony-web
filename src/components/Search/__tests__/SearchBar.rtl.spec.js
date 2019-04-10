import React from 'react';
import 'jest-dom/extend-expect';
import { fireEvent } from 'react-testing-library';
import { reduxForm } from 'redux-form';

import { renderWithReduxAndRouter, defaultProps, defaultInitialState } from '../../../test-utils';
import ConnectedSearchBar, {
  SearchForm, handleSearchBarSubmit, validate, changePageQuote
} from '../SearchBar';

describe('Testing SearchBar Component', () => {

  it('POS:Should test connected searchbar', () => {
    const { getByPlaceholderText, getByText } = renderWithReduxAndRouter(<ConnectedSearchBar {...defaultProps} />);
    expect(getByPlaceholderText(/Search for Property Address/));
    expect(getByText(/Property Address/));
  });

  it('Should test submit', () => {
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

  it('Should check validation', () => {
    const values = {
      zip: '*^%$',
      firstName: '*^%$',
      lastName: '$#%$#%',
      policyNumber: '%^%$^$%',
      quoteNumber: '%^$%^$%^',
      address: '/'
    };
    const errors = validate(values);
    expect(errors.firstName).toEqual('Invalid characters');
    expect(errors.lastName).toEqual('Invalid characters');
    expect(errors.quoteNumber).toEqual('Only numbers and dashes allowed');
    expect(errors.zip).toEqual('Invalid characters');
    expect(errors.address).toEqual('Invalid characters');
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
      fieldValues: {}
    };

    const SearchBarForm = reduxForm({
      form: 'SearchBar',
      enableReinitialize: true,
      validate
    })(SearchForm);
    const { getByPlaceholderText } = renderWithReduxAndRouter(<SearchBarForm {...props} />);
    expect(getByPlaceholderText(/Search for Property Address/));
  });

  it('POS:Expects Search action to fire', () => {
    const { getByPlaceholderText, getByText, store } = renderWithReduxAndRouter(<ConnectedSearchBar {...defaultProps} />);
    const searchbar = getByPlaceholderText(/Search for Property Address/);
    fireEvent.change(searchbar, { target: { value: 'foo' }});
    expect(store.getActions().filter(action => action.type === '@@redux-form/CHANGE').length).toEqual(1);
    fireEvent.click(getByText(/Search/));
  });
});
