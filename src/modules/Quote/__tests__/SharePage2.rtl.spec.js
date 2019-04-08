import React from 'react';
import 'jest-dom/extend-expect';
import { fireEvent } from 'react-testing-library';
import {
  defaultInitialState,
  renderWithReduxAndRouter,
  defaultProps,
  testHelpers,
  quoteWorkflowState,
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

const { checkLabel, checkSwitch } = testHelpers;

describe('Testing Share Page 2', () => {
  const props = {
    ...defaultProps,
    location: {
      pathname: '/quote/12-5162219-01/assumptions'
    }
  };

  const state = {
    ...defaultInitialState,
    ...quoteWorkflowState,
    quoteState: {
      ...quoteWorkflowState.quoteState,
      state: {
        ...quoteWorkflowState.quoteState.state,
        activeTask: 'showAssumptions'
      }
    }
  };

  it('renders and has stuff', () => {
    const { getByText, getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />, { state });
    // If we alter this programatically we can use some data structure for these strings
    expect(getByText(/All properties/));
    expect(getByText(/Please be aware/));
    expect(getByText(/Properties with pools/));
    expect(getByText(/Special Flood Hazard Areas/));
    expect(getByText(/Property is not in state of disrepair/));
    expect(getByText(/Roof covering does not exceed/));
    expect(getByText(/Roof cannot be over 20 years old/));
    expect(getByText(/Roof cannot be over 40 years old/));
    fields.forEach(field => {
      checkLabel(getByTestId, field);
      checkSwitch(getByTestId, field);
    });
    expect(getByTestId('submit').disabled).toBe(true);
    fireEvent.click(getByTestId('confirm-assumptions'));
    expect(getByTestId('submit').disabled).toBe(false);
  });
});
