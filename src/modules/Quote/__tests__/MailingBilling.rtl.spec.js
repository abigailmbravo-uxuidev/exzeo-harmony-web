import React from 'react';
import { fireEvent, waitForElement } from 'react-testing-library';

import {
  renderWithReduxAndRouter,
  defaultQuoteWorkflowProps,
  mockServiceRunner,
  mailingBillingResult as result,
  additionalInterest,
  policyHolder,
  submitForm,
  checkError,
  verifyForm,
  checkHeader,
  checkLabel,
  checkTextInput,
  checkRadio,
  checkSwitch,
  checkButton,
  checkSelect
} from '../../../test-utils';
import { QuoteWorkflow } from '../QuoteWorkflow';

const fields = [
  {
    dataTest: 'policyHolderMailingAddress.address1',
    error: 'Field Required',
    label: 'Address 1',
    type: 'text',
    required: true,
    data: '123 test address'
  },
  {
    dataTest: 'policyHolderMailingAddress.address2',
    label: 'Address 2',
    type: 'text',
    required: false,
    data: '123 test address'
  },
  {
    dataTest: 'policyHolderMailingAddress.city',
    error: 'Field Required',
    label: 'City',
    type: 'text',
    required: true,
    data: 'tampa'
  },
  {
    dataTest: 'policyHolderMailingAddress.state',
    error: 'Field Required',
    label: 'State',
    type: 'text',
    required: true,
    data: 'fl'
  },
  {
    dataTest: 'policyHolderMailingAddress.zip',
    error: 'Field Required',
    label: 'Zip',
    type: 'text',
    required: true,
    data: '00001'
  },
  {
    dataTest: 'billToId',
    type: 'select',
    error: 'Field Required',
    label: 'Bill To',
    defaultValue: { value: '', label: 'Please Select...' },
    values: [
      { value: '9876', label: 'Policyholder: Bruce Wayne' },
      { value: '1234', label: 'BANK OF AMERICA, NA ISAOA/ATIMA' }
    ],
    required: false
  },
  {
    dataTest: 'billPlan',
    type: 'radio',
    error: 'Field Required',
    label: 'Bill Plan',
    required: false,
    values: ['Annual', 'Semi-Annual', 'Quarterly'],
    defaultValue: 'Annual'
  },
  {
    dataTest: 'sameAsPropertyAddress',
    type: 'switch',
    label: 'Is the mailing address the same as the property address?',
    defaultValue: ''
  }
];

export const pageHeaders = [
  {
    dataTest: 'Mailing Address',
    text: 'Mailing Address',
    icon: 'fa fa-envelope'
  },
  {
    dataTest: 'Billing Information',
    text: 'Billing Information',
    icon: 'fa fa-dollar'
  }
];

describe('Testing the Mailing/Billing Page', () => {
  const props = {
    ...defaultQuoteWorkflowProps,
    quote: {
      ...defaultQuoteWorkflowProps.quote,
      policyHolders: [policyHolder],
      additionalInterests: [{ ...additionalInterest, _id: '1234', type: 'Mortgagee' }]
    },
    location: { pathname: '/quote/12-345-67/mailingBilling' }
  };

  const requiredFields = fields.filter(({ required }) => required);

  it('NEG:Tests all empty values', async () => {
    mockServiceRunner(result);
    const { getByTestId } = renderWithReduxAndRouter(<QuoteWorkflow {...props} />);
    await waitForElement(() => getByTestId('billPlan_label'));

    submitForm(getByTestId);
    requiredFields.forEach(field => checkError(getByTestId, field));
  });

  it('NEG:Tests Mailing Address empty values', async () => {
    mockServiceRunner(result);
    const { getByTestId } = renderWithReduxAndRouter(<QuoteWorkflow {...props} />);
    await waitForElement(() => expect(getByTestId('billPlan_Annual')));

    requiredFields.forEach(fieldToLeaveBlank => verifyForm(getByTestId, requiredFields, [fieldToLeaveBlank]));
  });

  it('NEG:Tests Invalid Input Values', async () => {
    mockServiceRunner(result);
    const { getByTestId } = renderWithReduxAndRouter(<QuoteWorkflow {...props} />);
    const state = fields.find(({ dataTest }) => dataTest === 'policyHolderMailingAddress.state');
    const zip = fields.find(({ dataTest }) => dataTest === 'policyHolderMailingAddress.zip');
    await waitForElement(() => getByTestId('billPlan_label'));

    verifyForm(getByTestId, [{
      ...state, data: 'foo', error: 'Only 2 letters allowed'
    }]);
    verifyForm(getByTestId, [{
      ...zip, data: '123456789', error: 'Only 8 letters or numbers allowed'
    }]);
  });

  it('POS:Checks all headers', async () => {
    mockServiceRunner(result);
    const { getByTestId } = renderWithReduxAndRouter(<QuoteWorkflow {...props} />);

    pageHeaders.forEach(header => checkHeader(getByTestId, header));
  });

  it('POS:Checks all labels', async () => {
    mockServiceRunner(result);
    const { getByTestId } = renderWithReduxAndRouter(<QuoteWorkflow {...props} />);
    await waitForElement(() => getByTestId('billPlan_label'));

    fields.forEach(field => checkLabel(getByTestId, field));
  });

  it('POS:Checks all inputs', async () => {
    mockServiceRunner(result);
    const { getByTestId } = renderWithReduxAndRouter(<QuoteWorkflow {...props} />);
    await waitForElement(() => getByTestId('billPlan_label'));

    fields.forEach(field => {
      if (field.type === 'text') checkTextInput(getByTestId, field);
      if (field.type === 'radio') checkRadio(getByTestId, field);
      if (field.type === 'switch') checkSwitch(getByTestId, field);
    });
  });

  it('POS:Checks Bill To Select', async () => {
    mockServiceRunner({
      ...result,
      options: [
        ...result.options,
        {
          additionalInterest: { ...additionalInterest, _id: '1234', type: 'Mortgagee' },
          billToId: '1234',
          billToType: 'Additional Interest',
          displayText: 'BANK OF AMERICA, NA ISAOA/ATIMA',
          payPlans: ['Annual']
        }
      ]
    });
    const { getByTestId } = renderWithReduxAndRouter(<QuoteWorkflow {...props} />);
    await waitForElement(() => getByTestId('billPlan_label'));
    // Should be nothing inside of the bill plan tag since no option is selected by default
    expect(document.getElementById('billPlan').innerHtml).toBeUndefined();

    fields.filter(({ type }) => type === 'select')
      .forEach(field => checkSelect(getByTestId, field));
  });

  it('POS:Checks toggle fills out data', async () => {
    mockServiceRunner(result);
    const { getByTestId } = renderWithReduxAndRouter(<QuoteWorkflow {...props} />);
    await waitForElement(() => getByTestId('billPlan_label'));

    fireEvent.click(getByTestId('sameAsPropertyAddress'));
    expect(getByTestId('policyHolderMailingAddress.address1').value).toBe('4131 TEST ADDRESS');
    expect(getByTestId('policyHolderMailingAddress.address2').value).toEqual('TEST SECOND ADDRESS');
    expect(getByTestId('policyHolderMailingAddress.city').value).toEqual('SARASOTA');
    expect(getByTestId('policyHolderMailingAddress.state').value).toEqual('FL');
    expect(getByTestId('policyHolderMailingAddress.zip').value).toEqual('00001');
  });

  it('POS:Checks installment text', async () => {
    mockServiceRunner(result);
    const { getByTestId } = renderWithReduxAndRouter(<QuoteWorkflow {...props} />);
    await waitForElement(() => getByTestId('billPlan_label'));

    expect(getByTestId('annual-plan')).toHaveTextContent('$ 2,667');
    expect(getByTestId('semi-annual-plan')).toHaveTextContent('$ 1,624');
    expect(getByTestId('semi-annual-plan')).toHaveTextContent('$ 1,059');
    expect(getByTestId('quarterly-plan')).toHaveTextContent('$ 1,096');
    expect(getByTestId('quarterly-plan')).toHaveTextContent('$ 531');
  });

  it('POS:Checks Submit Button', async () => {
    mockServiceRunner(result);
    const { getByTestId } = renderWithReduxAndRouter(<QuoteWorkflow {...props} />);
    await waitForElement(() => getByTestId('billPlan_label'));

    checkButton(getByTestId);
  });
});
