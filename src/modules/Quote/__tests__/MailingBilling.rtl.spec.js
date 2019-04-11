import React from 'react';
import 'jest-dom/extend-expect';
import { fireEvent, waitForElement } from 'react-testing-library';

import * as serviceRunner from '../../../utilities/serviceRunner';

import {
  defaultProps,
  defaultInitialState,
  renderWithReduxAndRouter,
  testHelpers,
  quote,
  mailingBillingTemplate,
  mailingBillingUiQuestions as uiQuestions,
  mailingBillingList as list,
} from '../../../test-utils';
import ConnectedQuoteWorkflow from '../QuoteWorkflow';

const fields = [
  {
    name: 'policyHolderMailingAddress.address1',
    error: 'Field Required',
    label: 'Address 1',
    type: 'text',
    required: true,
    data: '123 test address'
  },
  {
    name: 'policyHolderMailingAddress.address2',
    label: 'Address 2',
    type: 'text',
    required: false,
    data: '123 test address'
  },
  {
    name: 'policyHolderMailingAddress.city',
    error: 'Field Required',
    label: 'City',
    type: 'text',
    required: true,
    data: 'tampa'
  },
  {
    name: 'policyHolderMailingAddress.state',
    error: 'Field Required',
    label: 'State',
    type: 'text',
    required: true,
    data: 'fl'
  },
  {
    name: 'policyHolderMailingAddress.zip',
    error: 'Field Required',
    label: 'Zip',
    type: 'text',
    required: true,
    data: '00001'
  },
  {
    name: 'billToId',
    type: 'select',
    error: 'Field Required',
    label: 'Bill To',
    required: false
  },
  {
    name: 'billPlan',
    type: 'radio',
    error: 'Field Required',
    label: 'Bill Plan',
    required: false,
    values: ['Annual', 'Semi-Annual', 'Quarterly']
  },
  {
    name: 'sameAsPropertyAddress',
    type: 'switch',
    label: 'Is the mailing address the same',
    defaultValue: false
  }
];

export const pageHeaders = [
  {
    name: 'Mailing Address',
    text: 'Mailing Address',
    icon: 'fa fa-envelope'
  },
  {
    name: 'Billing Information',
    text: 'Billing Information',
    icon: 'fa fa-dollar'
  }
];

const {
  submitForm,
  checkError,
  verifyForm,
  checkHeader,
  checkLabel,
  checkTextInput,
  checkRadio,
  checkSwitch,
  checkButton
} = testHelpers;

// Mock Gandalf's servicerunner call for templates
serviceRunner.callService = jest.fn(() => Promise.resolve({ data: { result: {
  pages: [{ components: [] }, { components: [] }, { components: [] }, { components: [] }, { components: [] }, { components: [] }, mailingBillingTemplate, { components: [] }]
}}}));

describe('Testing the Mailing/Billing Page', () => {
  const props = {
    ...defaultProps,
    location: {
      pathname: '/quote/1/mailingBilling'
    }
  };

  const state = {
    ...defaultInitialState,
    quoteState: {
      ...defaultInitialState.quoteState,
      quote,
      state: {
        ...defaultInitialState.quoteState.state,
        uiQuestions,
        activeTask: 'askAdditionalQuestions'
      }
    },
    list: {
      ...defaultInitialState.list,
      ...list
    }
  };

  const requiredFields = fields.filter(({ required }) => required);

  it('NEG:Tests all empty values', async () => {
    const { getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />);
    await waitForElement(() => getByTestId('Mailing Address'));
    submitForm(getByTestId);
    requiredFields.forEach(field => checkError(getByTestId, field));
  });

  it('NEG:Tests Mailing Address empty values', async () => {
    const { getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />);
    await waitForElement(() => getByTestId('Mailing Address'));
    requiredFields.forEach(fieldToLeaveBlank => verifyForm(getByTestId, requiredFields, [fieldToLeaveBlank]));
  });

  it('NEG:Tests Invalid Input Values', async () => {
    const { getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />);
    await waitForElement(() => getByTestId('Mailing Address'));
    const state = fields.find(({ name }) => name === 'policyHolderMailingAddress.state');
    const zip = fields.find(({ name }) => name === 'policyHolderMailingAddress.zip');
    verifyForm(getByTestId, [{
      ...state, data: 'foo', error: 'Only 2 letters allowed'
    }]);
    verifyForm(getByTestId, [{
      ...zip, data: '123456789', error: 'Only 8 letters or numbers allowed'
    }]);
  });

  it('POS:Checks all headers', async () => {
    const { getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />);
<<<<<<< HEAD
    await waitForElement(() => getByTestId('Mailing Address'));
    pageHeaders.forEach(field => checkHeader(getByTestId, field));
=======
    pageHeaders.forEach(header => checkHeader(getByTestId, header));
>>>>>>> a4a1b7a4... Update some naming
  });

  it('POS:Checks all labels', async () => {
    const { getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />);
    await waitForElement(() => getByTestId('Mailing Address'));
    fields.forEach(field => checkLabel(getByTestId, field));
  });

  it('POS:Checks all inputs', async () => {
    const { getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />, { state });
    await waitForElement(() => getByTestId('Mailing Address'));
    fields.forEach(field => {
      if (field.type === 'text') checkTextInput(getByTestId, field);
      if (field.type === 'radio') checkRadio(getByTestId, field);
      if (field.type === 'switch') checkSwitch(getByTestId, field);
    });
  });

  it('POS:Checks toggle fills out data', async () => {
    const { getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />, { state });
    await waitForElement(() => getByTestId('Mailing Address'));
    fireEvent.click(getByTestId('sameAsPropertyAddress'));
    expect(getByTestId('policyHolderMailingAddress.address1').value).toBe('4131 TEST ADDRESS');
  });

  it('POS:Checks installment text', async () => {
    const { getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />, { state });
    await waitForElement(() => getByTestId('Mailing Address'));
    expect(getByTestId('annual-plan')).toHaveTextContent('$ 2,667');
    expect(getByTestId('semi-annual-plan')).toHaveTextContent('$ 1,624');
    expect(getByTestId('semi-annual-plan')).toHaveTextContent('$ 1,059');
    expect(getByTestId('quarterly-plan')).toHaveTextContent('$ 1,096');
    expect(getByTestId('quarterly-plan')).toHaveTextContent('$ 531');
  });

  it('POS:Checks Submit Button', async () => {
    const { getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />, { state });
    await waitForElement(() => getByTestId('Mailing Address'));
    checkButton(getByTestId);
  });
});
