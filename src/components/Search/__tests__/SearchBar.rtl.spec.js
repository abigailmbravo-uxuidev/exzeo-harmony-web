import React from 'react';
import { reduxForm } from 'redux-form';

import { render, defaultProps } from '../../../test-utils';
import ConnectedSearchBar, { SearchBar } from '../SearchBar';

describe('Testing SearchBar Component', () => {
  const props = {
    ...defaultProps,
    userProfile: { entity: { state: {} } },
    searchType: 'address',
    agency: {
      status: 'Active'
    }
  };

  it('POS:Should show basic connected searchbar', () => {
    const { getByPlaceholderText, getByText } = render(
      <ConnectedSearchBar {...props} />
    );

    expect(getByPlaceholderText('Search for Property Address'));
    expect(getByText('Property Street Address'));
  });

  it('POS:Retrieve Quote Searchbar unit tests', () => {
    const newProps = {
      ...props,
      searchType: 'quote',
      agency: {
        status: 'Active',
        cspAnswers: {
          products: [
            { answer: 'HO3', label: 'HO3' },
            { answer: 'AF3', label: 'AF3' }
          ]
        }
      },
      answers: {
        products: [
          { answer: 'HO3', label: 'HO3' },
          { answer: 'AF3', label: 'AF3' }
        ]
      }
    };

    const { getByText, getByPlaceholderText } = render(
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
