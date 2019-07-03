import React from 'react';

import ConnectedError from '../Error';
import {
  renderWithReduxAndRouter,
  defaultInitialState,
  quote,
  underwritingException
} from '../../../test-utils';

describe('Error testing', () => {
  it('Renders and has a fatal error', () => {
    const state = {
      ...defaultInitialState,
      quoteState: {
        ...defaultInitialState.quoteState,
        quote: {
          ...quote,
          underwritingExceptions: [underwritingException]
        }
      }
    };

    const { getByText, queryByText } = renderWithReduxAndRouter(
      <ConnectedError />,
      { state }
    );
    expect(getByText('The following errors have occurred for this property:'));
    expect(getByText('Property does not qualify for automated quote'));
    expect(
      queryByText(
        'Please contact one of our representatives so they may further assist you in obtaining a HO3 insurance quote for this property.'
      )
    ).not.toBeInTheDocument();
    expect(
      getByText('Homes that are rented are not eligible for this program.')
    );
    expect(getByText('email us'));
    expect(getByText('(844) 289-7968'));
  });

  it('Has an underwriting review error', () => {
    const state = {
      ...defaultInitialState,
      quoteState: {
        ...defaultInitialState.quoteState,
        quote: {
          ...quote,
          underwritingExceptions: [
            { ...underwritingException, action: 'Underwriting Review' }
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
