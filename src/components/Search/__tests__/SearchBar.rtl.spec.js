import React from 'react';
import { reduxForm } from 'redux-form';

import { renderWithReduxAndRouter, defaultProps, defaultInitialState } from '../../../test-utils';
import ConnectedSearchBar, {
  SearchBar
} from '../SearchBar';

describe('Testing SearchBar Component', () => {

  it('POS:Should show basic connected searchbar', () => {
    const { getByPlaceholderText, getByText } = renderWithReduxAndRouter(<ConnectedSearchBar {...defaultProps} />);

    expect(getByPlaceholderText('Search for Property Address'));
    expect(getByText('Property Address'));
  });

  it('POS:Should be able to be recreated', () => {
    const props = {
      ...defaultProps,
      appState: { isLoading: false },
      handleSubmit: () => () => {},
      fieldValues: {},
      userProfile: { appMetadata: { beta: false } }
    };

    const SearchBarForm = reduxForm({
      form: 'SearchBar',
      enableReinitialize: true,
    })(SearchBar);
    const { getByText, getByPlaceholderText } = renderWithReduxAndRouter(<SearchBarForm {...props} />);

    expect(getByPlaceholderText('Search for Property Address'));
    expect(getByText('Property Address'));
  });

  it('POS:Retrieve Quote Searchbar unit tests', () => {
    const props = {
      ...defaultProps,
      searchType: 'quote'
    };
    const { getByText, getByPlaceholderText } = renderWithReduxAndRouter(<ConnectedSearchBar {...props} />)

    expect(getByText('First Name'));
    expect(getByPlaceholderText('First Name Search'));
    expect(getByText('Last Name'));
    expect(getByPlaceholderText('Last Name Search'));
    expect(getByText('Property Street Address'));
    expect(getByPlaceholderText('Property Street Address Search'));
    expect(getByText('Quote Number'));
    expect(getByPlaceholderText('Quote No Search'));
    expect(getByText('Search').previousSibling.className).toEqual('fa fa-search');
  });
});
