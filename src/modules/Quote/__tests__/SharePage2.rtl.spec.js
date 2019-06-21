import React from 'react';
import { fireEvent } from 'react-testing-library';

import {
  renderWithReduxAndRouter,
  defaultQuoteWorkflowProps,
  checkLabel, checkSwitch, checkButton
} from '../../../test-utils';

import QuoteWorkflow from '../QuoteWorkflow';

const fields = [
  {
    dataTest: 'confirm-assumptions',
    type: 'switch',
    label: 'Confirmed',
    defaultValue: false
  }
];

describe('Testing Share Page 2', () => {
  const props = {
    ...defaultQuoteWorkflowProps,
    location: { pathname: '/quote/12-345-67/assumptions' }
  };

  it('"Confirmed" Value Switch Defaults to "No"', () => {
    const { getByTestId } = renderWithReduxAndRouter(<QuoteWorkflow {...props} />);
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
    const { getByText } = renderWithReduxAndRouter(<QuoteWorkflow {...props} />);
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
    const { getByTestId } = renderWithReduxAndRouter(<QuoteWorkflow {...props} />);

    checkButton(getByTestId);
  });
});
