import React from 'react';
import { fireEvent, waitForElement } from 'react-testing-library';

import {
  renderWithReduxAndRouter,
  defaultProps,
  quote,
  zipCodeSettings,
  underwritingList as list,
  userProfile,
  mockServiceRunner,
  underwritingResult as result,
  submitForm, checkError, checkRadio, checkLabel, checkButton
} from '../../../test-utils';
import ConnectedQuoteWorkflow, { QuoteWorkflow } from '../QuoteWorkflow';

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

mockServiceRunner(result);

describe('Testing the QuoteWorkflow Underwriting Page', () => {
  const props = {
    ...defaultProps,
    history: { replace: x => x },
    location: { pathname: '/quote/12-5162219-01/underwriting' },
    isLoading: false,
    quote,
    quoteData: quote,
    headerDetails: {},
    workflowState: {},
    zipCodeSettings,
    options: {
      agents: [], mortgagee: [], uiQuestions: {}, zipCodeSettings
    },
    userProfile,
    submitForm: () => { },
    updateQuote: () => Promise.resolve({}),
    getAgentsByAgencyCode: () => { },
    getZipcodeSettings: () => { },
    getEnumsForQuoteWorkflow: () => { },
    getBillingOptions: () => { },
    getQuote: () => { }
  };

  it('NEG:All Inputs Empty Value', async () => {
    const { getByTestId } = renderWithReduxAndRouter(<QuoteWorkflow {...props} />);
    await waitForElement(() => getByTestId('underwritingAnswers.rented.answer_label'));

    submitForm(getByTestId);
    await waitForElement(() => getByTestId('underwritingAnswers.rented.answer_error'));
    fields.forEach(({ name }) => checkError(getByTestId, { name }));
  });

  describe('NEG:All questions empty value', () => {
    for (let i = 0; i < fields.length; i++) {
      it(`Checks that field ${fields[i].name} errors on an empty value`, async () => {
        const { getByTestId } = renderWithReduxAndRouter(<QuoteWorkflow {...props} />);
        await waitForElement(() => getByTestId('underwritingAnswers.rented.answer_label'));

        // Select all fields except the one to leave blank
        fields.filter(({ name }) => name !== fields[i].name)
          .forEach(({ name, data }) => fireEvent.click(getByTestId(`${name}_${data}`)));
        submitForm(getByTestId);
        checkError(getByTestId, fields[i]);
      });
    };
  });

  it('POS:Check All Questions Text / Radio', async () => {
    const { getByTestId } = renderWithReduxAndRouter(<QuoteWorkflow {...props} />);
    await waitForElement(() => getByTestId('underwritingAnswers.rented.answer_label'));

    fields.forEach(({ name, label, values }) => {
      checkRadio(getByTestId, { name, values });
      checkLabel(getByTestId, { name, label });
      values.forEach(value => expect(getByTestId(`${name}_${value}`)).toHaveTextContent(value));
    });
  });

  it('POS:Checks Submit Button', async () => {
    const { getByTestId } = renderWithReduxAndRouter(<QuoteWorkflow {...props} />);
    await waitForElement(() => getByTestId('underwritingAnswers.rented.answer_label'));

    checkButton(getByTestId);
  });
});
