import React from 'react';
import { fireEvent } from 'react-testing-library';

import {
  renderWithReduxAndRouter,
  defaultQuoteWorkflowProps,
  checkLabel,
  checkSwitch,
  checkButton
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
    const { getByTestId } = renderWithReduxAndRouter(
      <QuoteWorkflow {...props} />
    );
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
    const { getByText } = renderWithReduxAndRouter(
      <QuoteWorkflow {...props} />
    );
    // If we alter this programatically we can use some data structure for these strings
    expect(
      getByText(
        'All properties will be inspected within 30 days of the effective date.'
      )
    );
    expect(
      getByText(
        'Please be aware that assumptions to this property have been made in order to provide you this quote. If any of the below assumptions are not correct, please contact us before continuing.'
      )
    );
    expect(
      getByText(
        'Properties with pools (or similar structures), are to be completely fenced, walled, or screened. There are no slides or diving boards.'
      )
    );
    expect(
      getByText(
        'Properties located in Special Flood Hazard Areas, as defined by the National Flood Insurance Program maintain a separate flood policy.'
      )
    );
    expect(
      getByText(
        'Property is not in state of disrepair or having existing unrepaired damage.'
      )
    );
    expect(getByText('Roof covering does not exceed the age as defined below'));
    expect(
      getByText(
        'Roof cannot be over 20 years old if Asphalt, Fiberglass, Composition/Wood Shake Shingles; Built-up Tar and Gravel; or other roof covering types not included below'
      )
    );
    expect(
      getByText(
        'Roof cannot be over 40 years old if Tile, Slate, Concrete, or Metal'
      )
    );
  });

  it('POS:Checks Submit Button', () => {
    const { getByTestId } = renderWithReduxAndRouter(
      <QuoteWorkflow {...props} />
    );

    checkButton(getByTestId);
  });
});
