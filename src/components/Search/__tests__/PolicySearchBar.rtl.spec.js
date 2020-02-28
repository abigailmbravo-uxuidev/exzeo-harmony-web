import React from 'react';

import {
  render,
  defaultInitialState,
  policySearchResult
} from '../../../test-utils';
import ConnectedPolicySearchBar from '../PolicySearchBar';

describe('Testing Policy Searchbar component', () => {
  const props = {
    handleSubmit: x => x,
    answers: {
      products: [
        { answer: 'HO3', label: 'HO3' },
        { answer: 'AF3', label: 'AF3' }
      ],
      states: [{ answer: 'FL', label: 'FL' }]
    }
  };

  it('POS:Retrieve Policy Searchbar unit tests', () => {
    const { getByText, getByLabelText, getByPlaceholderText } = render(
      <ConnectedPolicySearchBar {...props} />
    );

    expect(getByLabelText('First Name'));
    expect(getByPlaceholderText('First Name Search'));
    expect(getByLabelText('Last Name'));
    expect(getByPlaceholderText('Last Name Search'));
    expect(getByLabelText('Property Street Address'));
    expect(getByPlaceholderText('Property Street Address Search'));
    expect(getByLabelText('Policy Number'));
    expect(getByPlaceholderText('Policy No Search'));
    expect(getByText('Search').previousSibling.className).toEqual(
      'fa fa-search'
    );
  });

  it('POS:Has Results and Pagination', () => {
    const state = {
      ...defaultInitialState,
      search: { pageSize: 25 },
      service: {
        policyResults: {
          pageSize: 25,
          sort: 'policyNumber',
          sortDirection: 'desc',
          policies: [policySearchResult]
        }
      }
    };
    const { getByTestId } = render(<ConnectedPolicySearchBar {...props} />, {
      state
    });

    expect(getByTestId('page-back')).toBeInTheDocument();
    expect(getByTestId('page-forward')).toBeInTheDocument();
  });
});
