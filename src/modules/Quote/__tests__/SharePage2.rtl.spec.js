import React from 'react';
import 'jest-dom/extend-expect';
import { fireEvent, waitForElement } from 'react-testing-library';

import * as serviceRunner from '../../../utilities/serviceRunner';

import {
  defaultInitialState,
  renderWithReduxAndRouter,
  defaultProps,
  assumptionsTemplate,
  testHelpers,
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

const { checkLabel, checkSwitch, checkButton } = testHelpers;
// Mock Gandalf's servicerunner call for templates
serviceRunner.callService = jest.fn(() => Promise.resolve({
  data: {
    result: {
      pages: [{ components: [] }, { components: [] }, { components: [] }, { components: [] }, assumptionsTemplate]
    }
  }
}));

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

  it('"Confirmed" Value Switch Defaults to "No"', async () => {
    const { getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />, { state });
    await waitForElement(() => getByTestId('assumptions-title'))
    fields.forEach(field => {
      checkLabel(getByTestId, field);
      if (field.type === 'switch') checkSwitch(getByTestId, field);
    });
    // Confirm the submit button is disabled by default and switches after clicking the switch
    expect(getByTestId('submit').disabled).toBe(true);
    fireEvent.click(getByTestId('confirm-assumptions'));
    expect(getByTestId('submit').disabled).toBe(false);
  });

  it('POS:Share Page 2 Text Testing', async () => {
    const { getByText, getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />, { state });
    await waitForElement(() => getByTestId('assumptions-title'))
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

  it('POS:Checks Submit Button', async () => {
    const { getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />, { state });
    await waitForElement(() => getByTestId('assumptions-title'))
    checkButton(getByTestId('submit'));
  });
});
