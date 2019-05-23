import React from 'react';

import { renderWithReduxAndRouter } from '../../../test-utils';
import ConnectedPolicySearchBar from '../PolicySearchBar';

describe('Testing Policy Searchbar component', () => {
  it('POS:Retrieve Policy Searchbar unit tests', () => {
    const props = { handleSubmit: x => x };
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
});
