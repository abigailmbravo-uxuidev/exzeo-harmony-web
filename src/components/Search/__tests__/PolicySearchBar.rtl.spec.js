import React from 'react';

import { renderWithReduxAndRouter, defaultInitialState, policySearchResult } from '../../../test-utils';
import ConnectedPolicySearchBar from '../PolicySearchBar';

describe('Testing Policy Searchbar component', () => {
  const props = { handleSubmit: x => x };

  it('POS:Retrieve Policy Searchbar unit tests', () => {
    const { getByText, getByPlaceholderText } = renderWithReduxAndRouter(<ConnectedPolicySearchBar {...props} />);

    expect(getByText('First Name'));
    expect(getByPlaceholderText('First Name Search'));
    expect(getByText('Last Name'));
    expect(getByPlaceholderText('Last Name Search'));
    expect(getByText('Property Street Address'));
    expect(getByPlaceholderText('Property Street Address Search'));
    expect(getByText('Policy Number'));
    expect(getByPlaceholderText('Policy No Search'));
    expect(getByText('Search').previousSibling.className).toEqual('fa fa-search');
  });

  it('POS:Has Results and Pagination', () => {
    const state = {
      ...defaultInitialState,
      search: { pageSize: 25 },
      service: { policyResults: {
        pageSize: 25, sort: 'policyNumber', sortDirection: 'desc',
        policies: [policySearchResult]
      }}
    };
    const { getByTestId } = renderWithReduxAndRouter(<ConnectedPolicySearchBar {...props} />, { state });

    expect(getByTestId('page-back')).toBeInTheDocument();
    expect(getByTestId('page-forward')).toBeInTheDocument();
  });
});
