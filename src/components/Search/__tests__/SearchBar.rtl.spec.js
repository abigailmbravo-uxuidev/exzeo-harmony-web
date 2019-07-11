import React from 'react';
import { reduxForm } from 'redux-form';

import { renderWithReduxAndRouter, defaultProps } from '../../../test-utils';
import ConnectedSearchBar, { SearchBar } from '../SearchBar';

describe('Testing SearchBar Component', () => {
  const props = {
    ...defaultProps,
    userProfile: { entity: { state: {} } }
  };
  it('POS:Should show basic connected searchbar', () => {
    const { getByPlaceholderText, getByText } = renderWithReduxAndRouter(
      <ConnectedSearchBar {...props} />
    );
    expect(getByPlaceholderText('Search for Property Address'));
    expect(getByText('Property Address'));
  });

  it('POS:Should be able to be recreated', () => {
    const newProps = {
      ...props,
      appState: { isLoading: false },
      handleSubmit: () => {},
      fieldValues: {},
      userProfile: { appMetadata: { beta: false }, entity: { state: {} } }
    };

    const SearchBarForm = reduxForm({
      form: 'SearchBar',
      enableReinitialize: true
    })(SearchBar);
    const { getByText, getByPlaceholderText } = renderWithReduxAndRouter(
      <SearchBarForm {...newProps} />
    );

    expect(getByPlaceholderText('Search for Property Address'));
    expect(getByText('Property Address'));
  });

  it('POS:Retrieve Quote Searchbar unit tests', () => {
    const newProps = {
      ...props,
      searchType: 'quote'
    };
    const { getByText, getByPlaceholderText } = renderWithReduxAndRouter(
      <ConnectedSearchBar {...newProps} />
    );

    expect(getByText('First Name'));
    expect(getByPlaceholderText('First Name Search'));
    expect(getByText('Last Name'));
    expect(getByPlaceholderText('Last Name Search'));
    expect(getByText('Property Street Address'));
    expect(getByPlaceholderText('Property Street Address Search'));
    expect(getByText('Quote Number'));
    expect(getByPlaceholderText('Quote No Search'));
    expect(getByText('Search').previousSibling.className).toEqual(
      'fa fa-search'
    );
  });
});
