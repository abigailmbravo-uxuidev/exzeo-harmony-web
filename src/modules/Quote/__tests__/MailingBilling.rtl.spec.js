import React from 'react';
import { fireEvent, waitForElement, render } from 'react-testing-library';

import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import {
  renderWithReduxAndRouter,
  defaultProps,
  defaultInitialState,
  quote,
  zipCodeSettings,
  mailingBillingList as list,
  userProfile,
  mockServiceRunner,
  mailingBillingResult as result,
  submitForm,
  checkError,
  verifyForm,
  checkHeader,
  checkLabel,
  checkTextInput,
  checkRadio,
  checkSwitch,
  checkButton
} from '../../../test-utils';
import { QuoteWorkflow } from '../QuoteWorkflow';

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
    defaultValue: ''
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

mockServiceRunner(result);

describe('Testing the Mailing/Billing Page', () => {
  const props = {
    ...defaultProps,
    location: { pathname: '/quote/12-5162219-01/mailingBilling' },
    isLoading: false,
    quote: {
      ...quote,
      rating: { worksheet: { fees: {} } }
    },
    quoteData: {
      ...quote,
      rating: { worksheet: { fees: {} } }
    },
    headerDetails: {},
    workflowState: {},
    zipCodeSettings,
    options: list,
    userProfile,
    submitForm: () => { },
    updateQuote: () => { },
    getAgentsByAgencyCode: () => { },
    getZipcodeSettings: () => { },
    getEnumsForQuoteWorkflow: () => { },
    getBillingOptions: () => { },
    getQuote: () => { }
  };

  const state = {
    ...defaultInitialState,
    quoteState: {
      ...defaultInitialState.quoteState,
      quote: {
        ...quote,
        rating: { worksheet: { fees: {}}}
      }
    }
  };

  const requiredFields = fields.filter(({ required }) => required);

  it('NEG:Tests all empty values', async () => {
    const { getByTestId } = renderWithReduxAndRouter(<QuoteWorkflow {...props} />);
    await waitForElement(() => getByTestId('billPlan_label'));

    submitForm(getByTestId);
    requiredFields.forEach(field => checkError(getByTestId, field));
  });

  it('NEG:Tests Mailing Address empty values', async () => {
    const { getByTestId } = renderWithReduxAndRouter(<QuoteWorkflow {...props} />);
    await waitForElement(() => expect(getByTestId('billPlan_Annual')));

    requiredFields.forEach(fieldToLeaveBlank => verifyForm(getByTestId, requiredFields, [fieldToLeaveBlank]));
  });

  it('NEG:Tests Invalid Input Values', async () => {
    const { getByTestId } = renderWithReduxAndRouter(<QuoteWorkflow {...props} />);
    const state = fields.find(({ name }) => name === 'policyHolderMailingAddress.state');
    const zip = fields.find(({ name }) => name === 'policyHolderMailingAddress.zip');
    await waitForElement(() => getByTestId('billPlan_label'));

    verifyForm(getByTestId, [{
      ...state, data: 'foo', error: 'Only 2 letters allowed'
    }]);
    verifyForm(getByTestId, [{
      ...zip, data: '123456789', error: 'Only 8 letters or numbers allowed'
    }]);
  });

  it('POS:Checks all headers', async () => {
    const { getByTestId } = renderWithReduxAndRouter(<QuoteWorkflow {...props} />, { state });

    pageHeaders.forEach(header => checkHeader(getByTestId, header));
  });

  it('POS:Checks all labels', async () => {
    const { getByTestId } = renderWithReduxAndRouter(<QuoteWorkflow {...props} />);
    await waitForElement(() => getByTestId('billPlan_label'));

    fields.forEach(field => checkLabel(getByTestId, field));
  });

  it('POS:Checks all inputs', async () => {
    const { getByTestId } = renderWithReduxAndRouter(<QuoteWorkflow {...props} />, { state });
    await waitForElement(() => getByTestId('billPlan_label'));

    fields.forEach(field => {
      if (field.type === 'text') checkTextInput(getByTestId, field);
      if (field.type === 'radio') checkRadio(getByTestId, field);
      if (field.type === 'switch') checkSwitch(getByTestId, field);
    });
  });

  it('POS:Checks toggle fills out data', async () => {
    const { getByTestId } = renderWithReduxAndRouter(<QuoteWorkflow {...props} />, { state });
    await waitForElement(() => getByTestId('billPlan_label'));

    fireEvent.click(getByTestId('sameAsPropertyAddress'));
    expect(getByTestId('policyHolderMailingAddress.address1').value).toBe('4131 TEST ADDRESS');
  });

  it('POS:Checks installment text', async () => {
    const { getByTestId } = renderWithReduxAndRouter(<QuoteWorkflow {...props} />, { state });
    await waitForElement(() => getByTestId('billPlan_label'));

    expect(getByTestId('annual-plan')).toHaveTextContent('$ 2,667');
    expect(getByTestId('semi-annual-plan')).toHaveTextContent('$ 1,624');
    expect(getByTestId('semi-annual-plan')).toHaveTextContent('$ 1,059');
    expect(getByTestId('quarterly-plan')).toHaveTextContent('$ 1,096');
    expect(getByTestId('quarterly-plan')).toHaveTextContent('$ 531');
  });

  it('POS:Checks Submit Button', async () => {
    const { getByTestId } = renderWithReduxAndRouter(<QuoteWorkflow {...props} />, { state });
    await waitForElement(() => getByTestId('billPlan_label'));

    checkButton(getByTestId);
  });
});
