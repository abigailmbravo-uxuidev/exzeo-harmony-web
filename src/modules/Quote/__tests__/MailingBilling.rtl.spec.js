import React from 'react';
import { fireEvent } from 'react-testing-library';

import {
  defaultProps,
  defaultInitialState,
  renderWithReduxAndRouter,
  submitForm,
  checkError,
  verifyForm,
  checkHeader,
  checkLabel,
  checkTextInput,
  checkRadio,
  checkSwitch,
  checkButton,
  quote,
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

describe('Testing the Mailing/Billing Page', () => {
  const props = {
    ...defaultProps,
    location: {
      pathname: '/quote/12-5162219-01/mailingBilling'
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

  it('NEG:Tests all empty values',() => {
    const { getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />);
    submitForm(getByTestId);
    requiredFields.forEach(field => checkError(getByTestId, field));
  });

  it('NEG:Tests Mailing Address empty values',() => {
    const { getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />);
    requiredFields.forEach(fieldToLeaveBlank => verifyForm(getByTestId, requiredFields, [fieldToLeaveBlank]));
  });

  it('NEG:Tests Invalid Input Values',() => {
    const { getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />);
    const state = fields.find(({ name }) => name === 'policyHolderMailingAddress.state');
    const zip = fields.find(({ name }) => name === 'policyHolderMailingAddress.zip');
    verifyForm(getByTestId, [{
      ...state, data: 'foo', error: 'Only 2 letters allowed'
    }]);
    verifyForm(getByTestId, [{
      ...zip, data: '123456789', error: 'Only 8 letters or numbers allowed'
    }]);
  });

  it('POS:Checks all headers',() => {
    const { getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />, { state });

    pageHeaders.forEach(header => checkHeader(getByTestId, header));
  });

  it('POS:Checks all labels',() => {
    const { getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />);
    fields.forEach(field => checkLabel(getByTestId, field));
  });

  it('POS:Checks all inputs',() => {
    const { getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />, { state });
    fields.forEach(field => {
      if (field.type === 'text') checkTextInput(getByTestId, field);
      if (field.type === 'radio') checkRadio(getByTestId, field);
      if (field.type === 'switch') checkSwitch(getByTestId, field);
    });
  });

  it('POS:Checks toggle fills out data',() => {
    const { getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />, { state });
    fireEvent.click(getByTestId('sameAsPropertyAddress'));
    expect(getByTestId('policyHolderMailingAddress.address1').value).toBe('4131 TEST ADDRESS');
  });

  it('POS:Checks installment text',() => {
    const { getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />, { state });
    expect(getByTestId('annual-plan')).toHaveTextContent('$ 2,667');
    expect(getByTestId('semi-annual-plan')).toHaveTextContent('$ 1,624');
    expect(getByTestId('semi-annual-plan')).toHaveTextContent('$ 1,059');
    expect(getByTestId('quarterly-plan')).toHaveTextContent('$ 1,096');
    expect(getByTestId('quarterly-plan')).toHaveTextContent('$ 531');
  });

  it('POS:Checks Submit Button', () => {
    const { getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />, { state });
    checkButton(getByTestId);
  });
});
