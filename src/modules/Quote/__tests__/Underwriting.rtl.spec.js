import React from 'react';
import 'jest-dom/extend-expect';
import { fireEvent } from 'react-testing-library';
import { defaultInitialState, renderWithReduxAndRouter, defaultProps, testHelpers } from 'test-utils';
import { quoteWorkflowState, underwritingList as list } from '../../../test-utils/quoteWorkflowState';

import QuoteWorkflowTest from '../QuoteWorkflow';

const fields = [
  {
    name: 'underwritingAnswers.rented.answer',
    required: true,
    type: 'radio',
    label: 'Is the home or any structures on the property ever rented?',
    values: ['Yes', 'Occasionally', 'Never'],
    data: 'Never'
  },
  {
    name: 'underwritingAnswers.previousClaims.answer',
    required: true,
    type: 'radio',
    label: 'When was the last claim filed?',
    values: ['No claims ever filed', 'Less than 3 Years', '3-5 Years', 'Over 5 Years', 'Unknown'],
    data: 'No claims ever filed'
  },
  {
    name: 'underwritingAnswers.monthsOccupied.answer',
    required: true,
    type: 'radio',
    label: 'How many months a year does the owner live in the home?',
    values: ['0-3', '4-6', '7-9', '10+'],
    data: '10+'

  },
  {
    name: 'underwritingAnswers.fourPointUpdates.answer',
    required: true,
    type: 'radio',
    label: 'Have the wiring, plumbing, and HVAC been updated in the last 35 years?',
    values: ['Yes', 'No', 'Unknown'],
    data: 'Yes'
  },
  {
    name: 'underwritingAnswers.business.answer',
    required: true,
    type: 'radio',
    label: 'Is a business conducted on the property?',
    values: ['Yes', 'No'],
    data: 'No'
  }
];

describe('Testing the QuoteWorkflow Underwriting Page', () => {
  const props = {
    ...defaultProps,
    location: {
      pathname: '/quote/12-5162219-01/underwriting'
    }
  };

  const state = {
    ...defaultInitialState,
    ...quoteWorkflowState,
    quoteState: { ...quoteWorkflowState.quoteState, state: { ...quoteWorkflowState.quoteState.state, activeTask: 'askUWAnswers' }},
    list
  };

  it('NEG:All Inputs Empty Value', () => {
    const { getByTestId } = renderWithReduxAndRouter(<QuoteWorkflowTest {...props} />, { state });
    testHelpers.submitForm(getByTestId);
    fields.forEach(({ name }) => testHelpers.checkError(getByTestId, { name }));
  });

  describe('NEG:"All questions empty value', () => {
    for (let i = 0; i < fields.length; i++) {
      it(`Checks that field ${i} errors on an empty value`, () => {
        const { getByTestId } = renderWithReduxAndRouter(<QuoteWorkflowTest {...props} />, { state });
        fields.filter(({ name }) => name !== fields[i].name)
          .forEach(({ name, data }) => fireEvent.click(getByTestId(`${name}_${data}`)));
        testHelpers.submitForm(getByTestId);
        testHelpers.checkError(getByTestId, fields[i]);
      })
    };
  });
  
  it('POS:Check All Questions  Text / Radio', () => {
    const { getByTestId } = renderWithReduxAndRouter(<QuoteWorkflowTest {...props} />, { state });
    fields.forEach(({ name, label, values }) => {
      testHelpers.checkLabel(getByTestId, { name, label });
      values.forEach(value => expect(getByTestId(`${name}_${value}`)).toHaveTextContent(value))
    });
  });
});
