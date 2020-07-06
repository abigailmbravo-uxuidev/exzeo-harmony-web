import React from 'react';
import {
  render,
  fireEvent,
  wait,
  mockServiceRunner,
  addressSearchResult
} from '../../../test-utils';

import SearchAddress from '../@components/SearchAddress';

describe('SearchAddress testing', () => {
  const props = {
    userProfile: {
      resources: [
        {
          right: 'INSERT',
          uri: 'TTIC:FL:HO3:QuoteData:Quotes:*'
        }
      ]
    },
    history: {},
    createQuote: x => x
  };

  it('NEG: Address field empty value', async () => {
    const { getByLabelText, getByTestId } = render(
      <SearchAddress {...props} />
    );

    const stateSelect = getByLabelText('Select State');
    const productSelect = getByLabelText('Select Product');
    const addressInput = getByLabelText('Property Street Address');

    // initially 'submit' button and 'product' field should be disabled
    expect(getByTestId('submit').disabled).toBe(true);
    expect(productSelect.disabled).toBe(true);

    // select state
    await wait(() =>
      fireEvent.change(stateSelect, {
        target: { value: 'FL' }
      })
    );
    expect(getByTestId('submit').disabled).toBe(true);

    await wait(() =>
      fireEvent.change(productSelect, {
        target: { value: 'HO3' }
      })
    );

    expect(getByTestId('submit').disabled).toBe(true);

    // Search with one bad search and some good ones, to confirm our handling of empty strings works as expected
    await wait(() =>
      fireEvent.change(addressInput, { target: { value: '     ' } })
    );
    expect(getByTestId('submit').disabled).toBe(true);

    await wait(() =>
      fireEvent.change(addressInput, { target: { value: '123 test address' } })
    );
    await wait(() => expect(getByTestId('submit').disabled).toBe(false));
  });

  it('NEG:Invalid address', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <SearchAddress {...props} />
    );
    const searchBar = getByPlaceholderText(/Search for Property Address/);

    await wait(() => {
      fireEvent.change(searchBar, {
        target: { value: '4131 TEST ADDRESS ≈ˆÎÍÒÍ' }
      });
      fireEvent.blur(searchBar);
    });

    // Expect to get the error when we search with invalid characters
    expect(document.getElementById('erroraddress')).toBeInTheDocument();
    expect(getByTestId('address_wrapper').className.includes('error')).toBe(
      true
    );
  });

  it('POS:Help text', () => {
    const { getByText } = render(<SearchAddress {...props} />);

    expect(getByText(/If you don't see your address/));
    expect(getByText(/If you still have problems finding an address/));
    expect(getByText(/call us/).parentNode).toHaveAttribute(
      'href',
      'tel:844-289-7968'
    );
  });

  it('POS:Search with and without results', async () => {
    const {
      getByText,
      getByTestId,
      getByRole,
      getByLabelText,
      queryByRole
    } = render(<SearchAddress {...props} />);
    // Assert existence of fields
    const stateSelect = getByLabelText('Select State');
    const productSelect = getByLabelText('Select Product');
    const addressInput = getByLabelText('Property Street Address');
    // Fill out search fiels
    await wait(() => {
      fireEvent.change(stateSelect, {
        target: { value: 'FL' }
      });
      fireEvent.change(productSelect, {
        target: { value: 'HO3' }
      });
      fireEvent.change(addressInput, { target: { value: '123 test address' } });
    });

    // No results
    mockServiceRunner({ IndexResult: [], TotalCount: 0 });
    await wait(() => getByTestId('submit').click());

    expect(queryByRole('listitem')).toBeNull();
    expect(getByText(/No Results Found/));
    expect(
      getByText(
        /We're sorry we couldn't find any results matching your search parameters/
      )
    );

    // Results found
    mockServiceRunner(addressSearchResult);
    await wait(() => getByTestId('submit').click());

    const { physicalAddress } = addressSearchResult.IndexResult[0];
    const card = getByRole('listitem');

    expect(card.querySelector('i.fa-map-marker')).toBeInTheDocument();
    expect(card.querySelector('i.fa-chevron-circle-right')).toBeInTheDocument();
    expect(getByText(`${physicalAddress.address1}`));
    expect(
      getByText(
        `${physicalAddress.city}, ${physicalAddress.state} ${physicalAddress.zip}`
      )
    );
  });
});
