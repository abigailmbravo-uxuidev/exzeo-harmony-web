import React from 'react';
import { fireEvent, waitForElement } from 'react-testing-library';

import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';

import {
  renderWithReduxAndRouter,
  defaultProps,
  submitForm, checkError, checkRadio, checkLabel, checkButton
} from '../../../test-utils';
import ConnectedQuoteWorkflow from '../QuoteWorkflow';

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

serviceRunner.callService = jest.fn(() => Promise.resolve({
  data: {
    result: [
      {
        active: true,
        answers: [
          { answer: 'Yes' },
          { answer: 'Occasionally' },
          { answer: 'Never' }
        ],
        hidden: false,
        name: 'rented',
        order: 1,
        question: 'Is the home or any structures on the property ever rented?',
        validations: ['required'],
        visible: true
      },
      {
        active: true,
        answers: [
          { answer: 'No claims ever filed' },
          { answer: 'Less than 3 Years' },
          { answer: '3-5 Years' },
          { answer: 'Over 5 Years' },
          { answer: 'Unknown' }
        ],
        hidden: false,
        name: 'previousClaims',
        order: 2,
        question: 'When was the last claim filed?',
        validations: ['required'],
        visible: true
      },
      {
        active: true,
        answers: [
          { answer: '0-3' },
          { answer: '4-6' },
          { answer: '7-9' },
          { answer: '10+' }
        ],
        hidden: false,
        name: 'monthsOccupied',
        order: 3,
        question: 'How many months a year does the owner live in the home?',
        validations: ['required'],
        visible: true
      },
      {
        active: true,
        ageOfHome: { max: 40 },
        answers: [
          { answer: 'Yes', default: true },
          { answer: 'No' },
          { answer: 'Unknown' }
        ],
        hidden: false,
        name: 'fourPointUpdates',
        order: 4,
        question: 'Have the wiring, plumbing, and HVAC been updated in the last 35 years?',
        validations: ['required'],
        visible: true
      },
      {
        active: true,
        answers: [
          { answer: 'Yes' },
          { answer: 'No' }
        ],
        hidden: false,
        name: 'business',
        order: 6,
        question: 'Is  a business conducted on the property?',
        validations: ['required'],
        visible: true
      }
    ]
  }
}));

describe('Testing the QuoteWorkflow Underwriting Page', () => {
  const props = {
    ...defaultProps,
    history: { replace: x => x },
    location: { pathname: '/quote/12-5162219-01/underwriting' }
  };

  it('NEG:All Inputs Empty Value', async () => {
    const { getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />);
    await waitForElement(() => getByTestId('underwritingAnswers.rented.answer_label'));

    submitForm(getByTestId);
    fields.forEach(({ name }) => checkError(getByTestId, { name }));
  });

  describe('NEG:All questions empty value', () => {
    for (let i = 0; i < fields.length; i++) {
      it(`Checks that field ${fields[i].name} errors on an empty value`, async () => {
        const { getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />);
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
    const { getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />);
    await waitForElement(() => getByTestId('underwritingAnswers.rented.answer_label'));

    fields.forEach(({ name, label, values }) => {
      checkRadio(getByTestId, { name, values });
      checkLabel(getByTestId, { name, label });
      values.forEach(value => expect(getByTestId(`${name}_${value}`)).toHaveTextContent(value));
    });
  });

  it('POS:Checks Submit Button', async () => {
    const { getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />);
    await waitForElement(() => getByTestId('underwritingAnswers.rented.answer_label'));

    checkButton(getByTestId);
  });
});
