import React from 'react';

import {
  render,
  fireEvent,
  waitForElement,
  defaultQuoteWorkflowProps,
  mockServiceRunner,
  underwritingResult as result,
  submitForm,
  checkError,
  checkRadio,
  checkLabel,
  checkButton
} from '../../../test-utils';
import QuoteWorkflow from '../QuoteWorkflow';

const fields = [
  {
    dataTest: 'underwritingAnswers.rented.answer',
    required: true,
    type: 'radio',
    label: 'Is the home or any structures on the property ever rented?',
    values: ['Yes', 'Occasionally', 'Never'],
    data: 'Never'
  },
  {
    dataTest: 'underwritingAnswers.previousClaims.answer',
    required: true,
    type: 'radio',
    label: 'When was the last claim filed?',
    values: [
      'No claims ever filed',
      'Less than 3 Years',
      '3-5 Years',
      'Over 5 Years',
      'Unknown'
    ],
    data: 'No claims ever filed'
  },
  {
    dataTest: 'underwritingAnswers.monthsOccupied.answer',
    required: true,
    type: 'radio',
    label: 'How many months a year does the owner live in the home?',
    values: ['0-3', '4-6', '7-9', '10+'],
    data: '10+'
  },
  {
    dataTest: 'underwritingAnswers.fourPointUpdates.answer',
    required: true,
    type: 'radio',
    label:
      'Have the wiring, plumbing, and HVAC been updated in the last 35 years?',
    values: ['Yes', 'No', 'Unknown'],
    data: 'Yes'
  },
  {
    dataTest: 'underwritingAnswers.business.answer',
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
    ...defaultQuoteWorkflowProps,
    location: { pathname: '/quote/12-345-67/underwriting' },
    match: { params: { step: 'underwriting', quoteNumber: '12-345-67' } }
  };

  it('NEG:All Inputs Empty Value', async () => {
    const { getByTestId } = render(<QuoteWorkflow {...props} />);
    await waitForElement(() =>
      getByTestId('underwritingAnswers.rented.answer_label')
    );

    submitForm(getByTestId);
    await waitForElement(() =>
      getByTestId('underwritingAnswers.rented.answer_error')
    );
    fields.forEach(({ dataTest }) => checkError(getByTestId, { dataTest }));
  });

  describe('NEG:All questions empty value', () => {
    for (let i = 0; i < fields.length; i++) {
      it(`Checks that field ${fields[i].dataTest} errors on an empty value`, async () => {
        const { getByTestId } = render(<QuoteWorkflow {...props} />);
        await waitForElement(() =>
          getByTestId('underwritingAnswers.rented.answer_label')
        );

        // Select all fields except the one to leave blank
        fields
          .filter(({ dataTest }) => dataTest !== fields[i].dataTest)
          .forEach(({ dataTest, data }) =>
            fireEvent.click(getByTestId(`${dataTest}_${data}`))
          );
        submitForm(getByTestId);
        checkError(getByTestId, fields[i]);
      });
    }
  });

  it('POS:Check All Questions Text / Radio', async () => {
    const { getByTestId } = render(<QuoteWorkflow {...props} />);
    await waitForElement(() =>
      getByTestId('underwritingAnswers.rented.answer_label')
    );

    fields.forEach(({ dataTest, label, values }) => {
      checkRadio(getByTestId, { dataTest, values });
      checkLabel(getByTestId, { dataTest, label });
      values.forEach(value =>
        expect(getByTestId(`${dataTest}_${value}`)).toHaveTextContent(value)
      );
    });
  });

  it('POS:Checks Submit Button', async () => {
    const { getByTestId } = render(<QuoteWorkflow {...props} />);
    await waitForElement(() =>
      getByTestId('underwritingAnswers.rented.answer_label')
    );

    checkButton(getByTestId);
  });
});
