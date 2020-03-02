import React from 'react';
import {
  render,
  fireEvent,
  wait,
  within,
  mockServiceRunner,
  quoteSearchResult
} from '../../../test-utils';

import SearchPolicy from '../@components/SearchPolicy';

describe('SearchPolicy testing', () => {
  const props = {
    userProfile: {
      resources: [
        {
          right: 'READ',
          uri: 'TTIC:FL:HO3:PolicyData:Transactions:*'
        }
      ]
    },
    history: {},
    retrieveQuote: x => x
  };

  test('POS: Form fields', () => {
    const { getByLabelText, getByPlaceholderText, getByTestId } = render(
      <SearchPolicy {...props} />
    );

    // Make sure all fields are present, storing the state and product fields as variables for reuse
    getByLabelText('First Name');
    getByLabelText('Last Name');
    getByLabelText('Property Street Address');
    getByLabelText('Policy Number');
    const sortField = getByLabelText('Sort By');
    const stateField = getByLabelText('State');
    const productField = getByLabelText('Product');

    // Default sorting to 'policyNumber'
    expect(sortField).toHaveAttribute('data-selected', 'policyNumber');
    // no fields are required in this form
    expect(getByTestId('submit').disabled).toBe(false);
    // State field driven by user resources
    expect(stateField.getElementsByTagName('option').length).toBe(2);
    expect(stateField.getElementsByTagName('option')[0].textContent).toBe(
      'All'
    );
    expect(stateField.getElementsByTagName('option')[1].textContent).toBe('FL');
    // Product field driven by user resources
    expect(productField.getElementsByTagName('option').length).toBe(2);
    expect(productField.getElementsByTagName('option')[0].textContent).toBe(
      'All'
    );
    expect(productField.getElementsByTagName('option')[1].textContent).toBe(
      'HO3'
    );
  });
});
