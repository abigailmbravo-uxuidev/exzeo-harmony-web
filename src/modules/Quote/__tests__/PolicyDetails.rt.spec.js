import React from 'react';
import { fireEvent } from 'react-testing-library';

import {
  renderWithReduxAndRouter,
  defaultQuoteWorkflowProps,
  submitForm,
  checkError,
  verifyForm,
  checkLabel,
  checkTextInput,
  checkHeader,
  checkButton,
  checkPhoneInput,
  checkSelect,
  checkSwitch
} from '../../../test-utils';
import { QuoteWorkflow } from '../QuoteWorkflow';

const phFields = [
  {
    dataTest: 'policyHolders[0].firstName',
    error: 'Field Required',
    label: 'First Name',
    type: 'text',
    required: true,
    value: 'Bruce'
  },
  {
    dataTest: 'policyHolders[0].lastName',
    error: 'Field Required',
    label: 'Last Name',
    type: 'text',
    required: true,
    value: 'Wayne'
  }
];

const detailsFields = [
  {
    dataTest: 'effectiveDate',
    label: 'Effective Date',
    type: 'text',
    value: '2019-05-03',
    defaultValue: '2019-05-05'
  },
  {
    dataTest: 'agentCode',
    label: 'Agent',
    type: 'select',
    defaultValue: { value: '', label: 'Please Select...' },
    values: [
      { value: '60000', label: 'Geordi LaForge' },
      { value: '1234', label: 'Commander Data' }
    ]
  }
];

const pageHeaders = [
  {
    dataTest: 'Policy Details',
    text: 'Policy Details',
    icon: 'fa fa-file-text'
  }
];

describe('Testing QuoteWorkflow Policy Details Page', () => {
  const props = {
    ...defaultQuoteWorkflowProps,
    setPolicySearch: () => {}
  };

  it('NEG:All Inputs Empty Value', () => {
    const { getByTestId } = renderWithReduxAndRouter(
      <QuoteWorkflow {...props} />
    );
    submitForm(getByTestId);
    phFields.forEach(field => checkError(getByTestId, field));
  });

  it('NEG:Primary Policyholder Empty Value', () => {
    const { getByTestId } = renderWithReduxAndRouter(
      <QuoteWorkflow {...props} />
    );
    phFields.forEach(fieldToLeaveBlank =>
      verifyForm(getByTestId, phFields, [fieldToLeaveBlank])
    );
  });

  it('NEG:Primary / Secondary Policyholder Invalid Character', () => {
    const { getByTestId } = renderWithReduxAndRouter(
      <QuoteWorkflow {...props} />
    );
    [...phFields]
      .filter(({ dataTest }) => !dataTest.includes('Phone'))
      .forEach(({ dataTest }) =>
        verifyForm(getByTestId, [
          {
            dataTest,
            value: '∂',
            error: 'Invalid characters'
          }
        ])
      );
  });

  it('NEG:Invalid Effective Date', () => {
    const { getByTestId } = renderWithReduxAndRouter(
      <QuoteWorkflow {...props} />
    );
    submitForm(getByTestId);
    verifyForm(getByTestId, [
      {
        dataTest: 'effectiveDate',
        value: ''
      }
    ]);
    verifyForm(getByTestId, [
      {
        dataTest: 'effectiveDate',
        value: '1900-01-01',
        error: 'Date must be at least 08/01/2017'
      }
    ]);
  });

  it('POS:Checks Headers', () => {
    const { getByTestId } = renderWithReduxAndRouter(
      <QuoteWorkflow {...props} />
    );
    getByTestId('Policy Details');
    pageHeaders.forEach(header => checkHeader(getByTestId, header));
  });

  it('POS:Header Label / Text', () => {
    const { getByTestId } = renderWithReduxAndRouter(
      <QuoteWorkflow {...props} />
    );

    [...phFields].forEach(({ dataTest, label, value, type }) => {
      checkLabel(getByTestId, { dataTest, label });
      checkTextInput(getByTestId, { dataTest, value });
    });
  });

  it('POS:Details Text', () => {
    const newProps = {
      ...props,
      options: {
        ...props.options,
        agents: [
          { label: 'Geordi LaForge', answer: '60000' },
          { label: 'Commander Data', answer: '1234' }
        ]
      }
    };
    const { getByTestId, getByText } = renderWithReduxAndRouter(
      <QuoteWorkflow {...newProps} />
    );

    detailsFields.forEach(field => {
      checkLabel(getByTestId, field);
      if (field.type === 'text') checkTextInput(getByTestId, field);
      if (field.type === 'select') checkSelect(getByTestId, field);
    });
    expect(getByText('05/01/2019 - 08/01/2019'));
  });

  it('POS:Checks Submit Button', () => {
    const { getByTestId } = renderWithReduxAndRouter(
      <QuoteWorkflow {...props} />
    );

    checkButton(getByTestId);
  });
});
