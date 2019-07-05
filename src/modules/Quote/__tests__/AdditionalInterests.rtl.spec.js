import React from 'react';
import { fireEvent, wait } from 'react-testing-library';

import {
  renderWithReduxAndRouter,
  defaultQuoteWorkflowProps,
  additionalInterest,
  checkLabel,
  checkTextInput,
  checkSelect,
  checkError,
  submitForm,
  verifyForm,
  checkButton
} from '../../../test-utils';
import { QuoteWorkflow } from '../QuoteWorkflow';

const baseAiFields = [
  {
    dataTest: 'name1',
    type: 'text',
    required: true,
    label: 'Name 1',
    value: 'test last names'
  },
  {
    dataTest: 'name2',
    type: 'text',
    label: 'Name 2',
    value: 'test first name'
  },
  {
    dataTest: 'address1',
    type: 'text',
    required: true,
    label: 'Address 1',
    value: 'test adress 1'
  },
  {
    dataTest: 'address2',
    type: 'text',
    label: 'Address 2',
    value: 'test address 2'
  },
  {
    dataTest: 'city',
    type: 'text',
    required: true,
    label: 'City',
    value: 'test city'
  },
  {
    dataTest: 'state',
    type: 'text',
    required: true,
    label: 'State',
    value: 'FL'
  },
  {
    dataTest: 'zip',
    type: 'text',
    required: true,
    label: 'Zip Code',
    value: 'test name 1'
  },
  {
    dataTest: 'phoneNumber',
    type: 'text',
    label: 'Phone Number',
    value: '(123) 123-1231'
  },
  {
    dataTest: 'referenceNumber',
    type: 'text',
    label: 'Reference Number',
    value: '1`23'
  }
];

const personalFields = [
  {
    dataTest: 'name1',
    type: 'text',
    required: true,
    label: 'First Name',
    value: 'test last names'
  },
  {
    dataTest: 'name2',
    type: 'text',
    label: 'Last Name',
    value: 'test first name'
  },
  {
    dataTest: 'address1',
    type: 'text',
    required: true,
    label: 'Address 1',
    value: 'test adress 1'
  },
  {
    dataTest: 'address2',
    type: 'text',
    label: 'Address 2',
    value: 'test address 2'
  },
  {
    dataTest: 'city',
    type: 'text',
    required: true,
    label: 'City',
    value: 'test city'
  },
  {
    dataTest: 'state',
    type: 'text',
    required: true,
    label: 'State',
    value: 'FL'
  },
  {
    dataTest: 'zip',
    type: 'text',
    required: true,
    label: 'Zip Code',
    value: 'test name 1'
  },
  {
    dataTest: 'phoneNumber',
    type: 'text',
    label: 'Phone Number',
    value: '(123) 123-1231'
  },
  {
    dataTest: 'referenceNumber',
    type: 'text',
    label: 'Reference Number',
    value: '123'
  }
];

describe('Testing Additional Interests', () => {
  const props = {
    ...defaultQuoteWorkflowProps,
    location: { pathname: '/quote/12-345-67/additionalInterests' }
  };

  const openAndCloseModal = async (getByText, modal) => {
    fireEvent.click(getByText(modal));
    await wait(() =>
      document
        .querySelector(`card.AdditionalInterestModal.${modal}`)
        .toBeInTheDocument()
    );
    fireEvent.click(getByText('cancel'));
    await wait(() =>
      expect(document.querySelector('form#AdditionalInterestModal')).toBeNull()
    );
  };

  const baseRequiredFields = baseAiFields.filter(({ required }) => required);
  const personalRequiredFields = personalFields.filter(
    ({ required }) => required
  );
  const stateField = baseAiFields.find(({ dataTest }) => dataTest === 'state');
  const zipField = baseAiFields.find(({ dataTest }) => dataTest === 'zip');

  it('POS:Checks Header and Buttons', () => {
    const { getByText } = renderWithReduxAndRouter(
      <QuoteWorkflow {...props} />
    );
    const checkButtonTextIcon = text =>
      expect(getByText(text).previousSibling.className).toEqual('fa fa-plus');

    checkButtonTextIcon('Mortgagee');
    checkButtonTextIcon('Additional Insured');
    checkButtonTextIcon('Additional Interest');
    checkButtonTextIcon('Premium Finance');
    checkButtonTextIcon('Bill Payer');
  });

  it('NEG:All Empty Mortgagee Testing', () => {
    const { getByText, getByTestId } = renderWithReduxAndRouter(
      <QuoteWorkflow {...props} />
    );
    fireEvent.click(getByText('Mortgagee'));

    submitForm(getByTestId, 'ai-modal-submit');
    baseRequiredFields.forEach(field => checkError(getByTestId, field));
  });

  it('NEG:Mortgagee Empty Testing', () => {
    const { getByText, getByTestId } = renderWithReduxAndRouter(
      <QuoteWorkflow {...props} />
    );
    fireEvent.click(getByText('Mortgagee'));

    baseRequiredFields.forEach(fieldToLeaveBlank =>
      verifyForm(
        getByTestId,
        baseRequiredFields,
        [fieldToLeaveBlank],
        'ai-modal-submit'
      )
    );
  });

  it('NEG:Mortgagee Invalid Input Testing', () => {
    const { getByText, getByTestId } = renderWithReduxAndRouter(
      <QuoteWorkflow {...props} />
    );
    fireEvent.click(getByText('Mortgagee'));

    verifyForm(
      getByTestId,
      [
        {
          ...stateField,
          value: 'abc',
          error: 'Only 2 letters allowed'
        }
      ],
      [],
      'ai-modal-submit'
    );
    verifyForm(
      getByTestId,
      [
        {
          ...zipField,
          value: '1234567890',
          error: 'Only 8 letters or numbers allowed'
        }
      ],
      [],
      'ai-modal-submit'
    );
  });

  it('NEG:All Empty Additional Insured Testing', () => {
    const { getByText, getByTestId } = renderWithReduxAndRouter(
      <QuoteWorkflow {...props} />
    );
    fireEvent.click(getByText('Additional Insured'));

    submitForm(getByTestId, 'ai-modal-submit');
    personalRequiredFields.forEach(field => checkError(getByTestId, field));
  });

  it('NEG:Additional Insured Empty Testing', () => {
    const { getByText, getByTestId } = renderWithReduxAndRouter(
      <QuoteWorkflow {...props} />
    );
    fireEvent.click(getByText('Additional Insured'));

    personalRequiredFields.forEach(fieldToLeaveBlank =>
      verifyForm(
        getByTestId,
        personalRequiredFields,
        [fieldToLeaveBlank],
        'ai-modal-submit'
      )
    );
  });

  it('NEG:Additional Insured Invalid Input Testing', () => {
    const { getByText, getByTestId } = renderWithReduxAndRouter(
      <QuoteWorkflow {...props} />
    );
    fireEvent.click(getByText('Additional Insured'));

    verifyForm(
      getByTestId,
      [
        {
          ...stateField,
          value: 'abc',
          error: 'Only 2 letters allowed'
        }
      ],
      [],
      'ai-modal-submit'
    );
    verifyForm(
      getByTestId,
      [
        {
          ...zipField,
          value: '1234567890',
          error: 'Only 8 letters or numbers allowed'
        }
      ],
      [],
      'ai-modal-submit'
    );
  });

  it('NEG:All Empty Additional Interest Testing', () => {
    const { getByText, getByTestId } = renderWithReduxAndRouter(
      <QuoteWorkflow {...props} />
    );
    fireEvent.click(getByText('Additional Interest'));

    submitForm(getByTestId, 'ai-modal-submit');
    personalRequiredFields.forEach(field => checkError(getByTestId, field));
  });

  it('NEG:Additional Interest Empty Testing', () => {
    const { getByText, getByTestId } = renderWithReduxAndRouter(
      <QuoteWorkflow {...props} />
    );
    fireEvent.click(getByText('Additional Interest'));

    personalRequiredFields.forEach(fieldToLeaveBlank =>
      verifyForm(
        getByTestId,
        personalRequiredFields,
        [fieldToLeaveBlank],
        'ai-modal-submit'
      )
    );
  });

  it('NEG:Additional Interest Invalid Input Testing', () => {
    const { getByText, getByTestId } = renderWithReduxAndRouter(
      <QuoteWorkflow {...props} />
    );
    fireEvent.click(getByText('Additional Interest'));

    verifyForm(
      getByTestId,
      [
        {
          ...stateField,
          value: 'abc',
          error: 'Only 2 letters allowed'
        }
      ],
      [],
      'ai-modal-submit'
    );
    verifyForm(
      getByTestId,
      [
        {
          ...zipField,
          value: '1234567890',
          error: 'Only 8 letters or numbers allowed'
        }
      ],
      [],
      'ai-modal-submit'
    );
  });

  it('NEG:All Empty Premium Finance Testing', () => {
    const { getByText, getByTestId } = renderWithReduxAndRouter(
      <QuoteWorkflow {...props} />
    );
    fireEvent.click(getByText('Premium Finance'));

    submitForm(getByTestId, 'ai-modal-submit');
    baseRequiredFields.forEach(field => checkError(getByTestId, field));
  });

  it('NEG:Premium Finance Empty Testing', () => {
    const { getByText, getByTestId } = renderWithReduxAndRouter(
      <QuoteWorkflow {...props} />
    );
    fireEvent.click(getByText('Premium Finance'));

    baseRequiredFields.forEach(fieldToLeaveBlank =>
      verifyForm(
        getByTestId,
        baseRequiredFields,
        [fieldToLeaveBlank],
        'ai-modal-submit'
      )
    );
  });

  it('NEG:Premium Finance Invalid Input Testing', () => {
    const { getByText, getByTestId } = renderWithReduxAndRouter(
      <QuoteWorkflow {...props} />
    );
    fireEvent.click(getByText('Premium Finance'));

    verifyForm(
      getByTestId,
      [
        {
          ...stateField,
          value: 'abc',
          error: 'Only 2 letters allowed'
        }
      ],
      [],
      'ai-modal-submit'
    );
    verifyForm(
      getByTestId,
      [
        {
          ...zipField,
          value: '1234567890',
          error: 'Only 8 letters or numbers allowed'
        }
      ],
      [],
      'ai-modal-submit'
    );
  });

  it('NEG:All Empty Bill Payer Testing', () => {
    const { getByText, getByTestId } = renderWithReduxAndRouter(
      <QuoteWorkflow {...props} />
    );
    fireEvent.click(getByText('Bill Payer'));

    submitForm(getByTestId, 'ai-modal-submit');
    personalRequiredFields.forEach(field => checkError(getByTestId, field));
  });

  it('NEG:Bill Payer Empty Testing', () => {
    const { getByText, getByTestId } = renderWithReduxAndRouter(
      <QuoteWorkflow {...props} />
    );
    fireEvent.click(getByText('Bill Payer'));

    personalRequiredFields.forEach(fieldToLeaveBlank =>
      verifyForm(
        getByTestId,
        personalRequiredFields,
        [fieldToLeaveBlank],
        'ai-modal-submit'
      )
    );
  });

  it('NEG:Bill Payer Invalid Input Testing', () => {
    const { getByText, getByTestId } = renderWithReduxAndRouter(
      <QuoteWorkflow {...props} />
    );
    fireEvent.click(getByText('Bill Payer'));

    verifyForm(
      getByTestId,
      [
        {
          ...stateField,
          value: 'abc',
          error: 'Only 2 letters allowed'
        }
      ],
      [],
      'ai-modal-submit'
    );
    verifyForm(
      getByTestId,
      [
        {
          ...zipField,
          value: '1234567890',
          error: 'Only 8 letters or numbers allowed'
        }
      ],
      [],
      'ai-modal-submit'
    );
  });

  it('POS:Mortgagee Testing', () => {
    const newProps = {
      ...props,
      options: {
        ...props.options,
        order: [{ answer: '0', label: 'First Mortgagee' }]
      }
    };
    const { getByText, getAllByText, getByTestId } = renderWithReduxAndRouter(
      <QuoteWorkflow {...newProps} />
    );

    openAndCloseModal(getByText, 'Mortgagee');
    fireEvent.click(getByText('Mortgagee'));
    expect(getAllByText('Mortgagee')[1].firstChild.className).toEqual(
      'fa Mortgagee'
    );
    baseAiFields.forEach(field => {
      checkLabel(getByTestId, field);
      checkTextInput(getByTestId, field);
    });
    checkLabel(getByTestId, { dataTest: 'mortgage', label: 'Top Mortgagees' });
    checkSelect(getByTestId, {
      dataTest: 'order',
      type: 'select',
      values: [{ value: '0', label: 'First Mortgagee' }]
    });
  });

  it('POS:Additional Insured Testing', () => {
    const { getByText, getAllByText, getByTestId } = renderWithReduxAndRouter(
      <QuoteWorkflow {...props} />
    );

    openAndCloseModal(getByText, 'Additional Insured');
    fireEvent.click(getByText('Additional Insured'));
    expect(getAllByText('Additional Insured')[1].firstChild.className).toEqual(
      'fa Additional Insured'
    );
    personalFields.forEach(field => {
      checkLabel(getByTestId, field);
      checkTextInput(getByTestId, field);
    });
  });

  it('POS:Additional Interest Testing', () => {
    const { getByText, getAllByText, getByTestId } = renderWithReduxAndRouter(
      <QuoteWorkflow {...props} />
    );

    openAndCloseModal(getByText, 'Additional Interest');
    fireEvent.click(getByText('Additional Interest'));
    expect(getAllByText('Additional Interest')[1].firstChild.className).toEqual(
      'fa Additional Interest'
    );
    personalFields.forEach(field => {
      checkLabel(getByTestId, field);
      checkTextInput(getByTestId, field);
    });
  });

  it('POS:Premium Finance Testing', () => {
    const { getByText, getAllByText, getByTestId } = renderWithReduxAndRouter(
      <QuoteWorkflow {...props} />
    );

    openAndCloseModal(getByText, 'Premium Finance');
    fireEvent.click(getByText('Premium Finance'));
    expect(getAllByText('Premium Finance')[1].firstChild.className).toEqual(
      'fa Premium Finance'
    );
    baseAiFields.forEach(field => {
      checkLabel(getByTestId, field);
      checkTextInput(getByTestId, field);
    });
    checkLabel(getByTestId, {
      dataTest: 'premiumFinance',
      label: 'Top Premium Finance'
    });
  });

  it('POS:Bill Payer Testing', () => {
    const { getByText, getAllByText, getByTestId } = renderWithReduxAndRouter(
      <QuoteWorkflow {...props} />
    );

    openAndCloseModal(getByText, 'Bill Payer');
    fireEvent.click(getByText('Bill Payer'));
    expect(getAllByText('Bill Payer')[1].firstChild.className).toEqual(
      'fa Bill Payer'
    );
    personalFields.forEach(field => {
      checkLabel(getByTestId, field);
      checkTextInput(getByTestId, field);
    });
  });

  it('POS:Additional Interest Details', () => {
    const newProps = {
      ...props,
      quote: {
        ...props.quote,
        additionalInterests: [
          { ...additionalInterest, _id: '1234', type: 'Mortgagee' }
        ]
      }
    };
    const {
      quote: { additionalInterests }
    } = newProps;
    const { getByText } = renderWithReduxAndRouter(
      <QuoteWorkflow {...newProps} />
    );

    expect(
      getByText(
        `${additionalInterests[0].name1} ${additionalInterests[0].name2}`
      )
    );
    expect(
      getByText(
        `${additionalInterests[0].mailingAddress.address1}, ${additionalInterests[0].mailingAddress.city}, ${additionalInterests[0].mailingAddress.state} ${additionalInterests[0].mailingAddress.zip}`
      )
    );
    expect(
      getByText(
        `${additionalInterests[0].type} ${additionalInterests[0].order + 1}`
      )
    );
    expect(
      document.querySelector('i.fa.fa-circle.Mortgagee')
    ).toBeInTheDocument();
    expect(document.querySelector('a.remove i.fa.delete')).toBeInTheDocument();
    expect(document.querySelector('a.edit i.fa.fa.edit')).toBeInTheDocument();
  });

  it('POS:Additional Interest Details Renders with bad data', () => {
    const newProps = {
      ...props,
      quote: {
        ...props.quote,
        additionalInterests: [
          {
            _id: '',
            name1: '',
            mailingAddress: { address1: '', city: '', state: '', zip: '' },
            order: 0,
            type: 'Mortgagee'
          }
        ]
      }
    };
    const {
      quote: { additionalInterests }
    } = newProps;
    const { getByText, queryAllByText } = renderWithReduxAndRouter(
      <QuoteWorkflow {...newProps} />
    );
    expect(
      getByText(
        `${additionalInterests[0].type} ${additionalInterests[0].order + 1}`
      )
    );
    // Expect no text that says "undefined" in ui
    expect(queryAllByText(/undefined/).length).toBe(0);
  });

  it('POS:Confirm Additional Interests Show Up In Order and Disable Buttons [Premium Finance]', () => {
    const newProps = {
      ...props,
      quote: {
        ...props.quote,
        additionalInterests: [
          // Intentionally give a messed up order...
          { ...additionalInterest, order: 1, type: 'Additional Interest' },
          { ...additionalInterest, order: 2, type: 'Mortgagee' },
          { ...additionalInterest, order: 1, type: 'Additional Insured' },
          { ...additionalInterest, order: 0, type: 'Mortgagee' },
          { ...additionalInterest, order: 1, type: 'Mortgagee' },
          { ...additionalInterest, order: 0, type: 'Premium Finance' },
          { ...additionalInterest, order: 0, type: 'Additional Interest' },
          { ...additionalInterest, order: 0, type: 'Additional Insured' }
        ]
      }
    };
    const expectedLabels = [
      'Mortgagee 1',
      'Mortgagee 2',
      'Mortgagee 3',
      'Additional Insured 1',
      'Additional Insured 2',
      'Additional Interest 1',
      'Additional Interest 2',
      'Premium Finance 1'
    ];
    const { getByText } = renderWithReduxAndRouter(
      <QuoteWorkflow {...newProps} />
    );
    // ...so we know the UI will still organize and sort them correctly, in order
    const labelTexts = document.querySelectorAll(
      '.results.result-cards li.card .card-icon label'
    );
    labelTexts.forEach((label, i) =>
      expect(label.textContent).toEqual(expectedLabels[i])
    );
    expect(getByText('Mortgagee')).toBeDisabled();
    expect(getByText('Additional Insured')).toBeDisabled();
    expect(getByText('Additional Interest')).toBeDisabled();
    expect(getByText('Premium Finance')).toBeDisabled();
    expect(getByText('Bill Payer')).toBeDisabled();
  });

  // Identical test to the one above except with a Bill Payer
  it('POS:Confirm Additional Interests Show Up In Order and Disable Buttons [Bill Payer]', () => {
    const newProps = {
      ...props,
      quote: {
        ...props.quote,
        additionalInterests: [
          // Intentionally give a messed up order...
          { ...additionalInterest, order: 1, type: 'Additional Interest' },
          { ...additionalInterest, order: 2, type: 'Mortgagee' },
          { ...additionalInterest, order: 1, type: 'Additional Insured' },
          { ...additionalInterest, order: 0, type: 'Mortgagee' },
          { ...additionalInterest, order: 1, type: 'Mortgagee' },
          { ...additionalInterest, order: 0, type: 'Premium Finance' },
          { ...additionalInterest, order: 0, type: 'Additional Interest' },
          { ...additionalInterest, order: 0, type: 'Additional Insured' }
        ]
      }
    };
    const expectedLabels = [
      'Mortgagee 1',
      'Mortgagee 2',
      'Mortgagee 3',
      'Additional Insured 1',
      'Additional Insured 2',
      'Additional Interest 1',
      'Additional Interest 2',
      'Bill Payer 1'
    ];
    const { getByText } = renderWithReduxAndRouter(
      <QuoteWorkflow {...newProps} />
    );

    const labelTexts = document.querySelectorAll(
      '.results.result-cards li.card .card-icon label'
    );
    labelTexts.forEach((label, i) =>
      expect(label.textContent).toEqual(expectedLabels[i])
    );
    expect(getByText('Mortgagee')).toBeDisabled();
    expect(getByText('Additional Insured')).toBeDisabled();
    expect(getByText('Additional Interest')).toBeDisabled();
    expect(getByText('Premium Finance')).toBeDisabled();
    expect(getByText('Bill Payer')).toBeDisabled();
  });

  it('POS:Checks Submit Button', () => {
    const { getByTestId } = renderWithReduxAndRouter(
      <QuoteWorkflow {...props} />
    );

    checkButton(getByTestId, { text: 'not applicable' });
  });
});
