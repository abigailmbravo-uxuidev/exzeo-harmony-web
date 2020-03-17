import React from 'react';
import {
  render,
  fireEvent,
  wait,
  within,
  mockServiceRunner,
  quoteSearchResult
} from '../../../test-utils';

import SearchQuote from '../@components/SearchQuote';

describe('SearchQuote testing', () => {
  const props = {
    userProfile: {
      resources: [
        {
          right: 'READ',
          uri: 'TTIC:FL:HO3:QuoteData:Quotes:*'
        }
      ]
    },
    history: {},
    retrieveQuote: x => x
  };

  test('POS: Form fields', () => {
    const { getByLabelText, getByTestId } = render(<SearchQuote {...props} />);

    // Make sure all fields are present, storing the state and product fields as variables for reuse
    getByLabelText('First Name');
    getByLabelText('Last Name');
    getByLabelText('Property Street Address');
    getByLabelText('Quote Number');
    const stateField = getByLabelText('State');
    const productField = getByLabelText('Product');

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

  test('POS: Search results', async () => {
    const { getByRole, getByTestId, getByText, queryByRole } = render(
      <SearchQuote {...props} />
    );
    // No results
    mockServiceRunner({
      ...quoteSearchResult,
      totalNumberOfRecords: 0,
      quotes: []
    });
    await wait(() => fireEvent.click(getByTestId('submit')));

    expect(queryByRole('listitem')).toBeNull();
    expect(getByText(/No Results Found/));
    expect(
      getByText(/There are no quotes found matching that search criteria/)
    );

    // Results found
    mockServiceRunner(quoteSearchResult);
    const quote = quoteSearchResult.quotes[0];
    const { physicalAddress } = quote.property;

    await wait(() => fireEvent.click(getByTestId('submit')));
    const card = getByRole('listitem');

    expect(card.querySelector('i.fa-user-circle')).toBeInTheDocument();
    expect(card.querySelector('i.fa-chevron-circle-right')).toBeInTheDocument();
    // This is an AF3 quote - make sure the card is displaying the "friendly" product
    expect(within(card).getByText('Flood'));
    expect(
      within(card).getByText(
        `${quote.policyHolders[0].firstName} ${quote.policyHolders[0].lastName}`
      )
    );
    expect(
      within(card).getByText(
        `${physicalAddress.address1} ${physicalAddress.city}, ${physicalAddress.state} ${physicalAddress.zip}`
      )
    );
  });
});
