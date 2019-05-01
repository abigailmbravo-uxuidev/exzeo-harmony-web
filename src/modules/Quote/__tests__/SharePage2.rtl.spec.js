import React from 'react';
import { fireEvent } from 'react-testing-library';

import {
  defaultInitialState,
  renderWithReduxAndRouter,
  defaultProps,
  checkLabel, checkSwitch, checkButton
} from '../../../test-utils';

import ConnectedQuoteWorkflow from '../QuoteWorkflow';

const fields = [
  {
    name: 'confirm-assumptions',
    type: 'switch',
    label: 'Confirmed',
    defaultValue: false
  }
];

describe('Testing Share Page 2', () => {
  const props = {
    ...defaultProps,
    location: {
      pathname: '/quote/12-5162219-01/assumptions'
    }
  };

  const state = {
    ...defaultInitialState,
    quoteState: {
      ...defaultInitialState.quoteState,
      state: {
        ...defaultInitialState.quoteState.state,
        activeTask: 'showAssumptions'
      }
    }
  };

  it('"Confirmed" Value Switch Defaults to "No"', () => {
    const { getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />, { state });
    fields.forEach(field => {
      checkLabel(getByTestId, field);
      if (field.type === 'switch') checkSwitch(getByTestId, field);
    });
    // Confirm the submit button is disabled by default and switches after clicking the switch
    expect(getByTestId('submit').disabled).toBe(true);
    fireEvent.click(getByTestId('confirm-assumptions'));
    expect(getByTestId('submit').disabled).toBe(false);
  });

  it('POS:Share Page 2 Text Testing', () => {
    const { getByText } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />, { state });
    // If we alter this programatically we can use some data structure for these strings
    expect(getByText(/All properties/));
    expect(getByText(/Please be aware/));
    expect(getByText(/Properties with pools/));
    expect(getByText(/Special Flood Hazard Areas/));
    expect(getByText(/Property is not in state of disrepair/));
    expect(getByText(/Roof covering does not exceed/));
    expect(getByText(/Roof cannot be over 20 years old/));
    expect(getByText(/Roof cannot be over 40 years old/));
  });

  it('POS:Checks Submit Button', () => {
    const { getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />, { state });

    checkButton(getByTestId);
  });
});
