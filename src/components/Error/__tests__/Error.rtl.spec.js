import React from 'react';

import ConnectedError from '../Error';
import {
  renderWithReduxAndRouter,
  defaultInitialState,
  quote,
  fatalUnderwritingException
} from '../../../test-utils';

describe('Error testing', () => {
  it('Renders and has a fatal error', () => {
    const state = {
      ...defaultInitialState,
      quoteState: {
        ...defaultInitialState.quoteState,
        quote: {
          ...quote,
          underwritingExceptions: [fatalUnderwritingException]
        }
      }
    };

    const { getByText, queryByText } = renderWithReduxAndRouter(
      <ConnectedError />,
      { state }
    );
    expect(
      getByText('Property does not qualify for automated quote').querySelector(
        'i'
      ).className
    ).toEqual('fa fa-exclamation-triangle');
    expect(getByText('The following errors have occurred for this property:'));
    expect(
      getByText('Homes that are rented are not eligible for this program.')
    );
    expect(
      queryByText(
        'Please contact one of our representatives so they may further assist you in obtaining a HO3 insurance quote for this property.'
      )
    ).not.toBeInTheDocument();
    expect(getByText('email us').parentNode).toHaveAttribute(
      'href',
      'mailto:customerservice@typtap.com'
    );
    expect(getByText('(844) 289-7968').parentNode).toHaveAttribute(
      'href',
      'tel:8442897968'
    );
  });

  it('Has an underwriting review error', () => {
    const state = {
      ...defaultInitialState,
      quoteState: {
        ...defaultInitialState.quoteState,
        quote: {
          ...quote,
          underwritingExceptions: [
            { ...fatalUnderwritingException, action: 'Underwriting Review' }
          ]
        }
      }
    };

    const { getByText } = renderWithReduxAndRouter(<ConnectedError />, {
      state
    });
    expect(
      getByText(
        'Please contact one of our representatives so they may further assist you in obtaining a HO3 insurance quote for this property.'
      )
    );
    expect(
      getByText('Homes that are rented are not eligible for this program.')
        .className
    ).toEqual('warning-li');
  });
});
