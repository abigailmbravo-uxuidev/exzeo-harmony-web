import React from 'react';

import {
  render,
  fireEvent,
  wait,
  waitForElement,
  within,
  defaultQuoteWorkflowProps,
  additionalInterest,
  checkLabel,
  checkError,
  submitForm,
  verifyForm,
  checkButton,
  mockServiceRunner,
  mockQuestions
} from '../../../test-utils';
import { QuoteWorkflow } from '../QuoteWorkflow';

mockServiceRunner([]);
mockQuestions([]);

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

describe('Testing Additional Interests', () => {
  const props = {
    ...defaultQuoteWorkflowProps,
    location: { pathname: '/quote/12-345-67/additionalInterests' }
  };

  const baseRequiredFields = baseAiFields.filter(({ required }) => required);
  const stateField = baseAiFields.find(({ dataTest }) => dataTest === 'state');
  const zipField = baseAiFields.find(({ dataTest }) => dataTest === 'zip');

  it('POS:Checks Header and Buttons', async () => {
    const { getByText } = render(<QuoteWorkflow {...props} />);
    const checkButtonTextIcon = async text => {
      await wait(() =>
        expect(getByText(text).previousSibling.className).toEqual('fa fa-plus')
      );
    };

    await checkButtonTextIcon('Mortgagee');
    await checkButtonTextIcon('Additional Insured');
    await checkButtonTextIcon('Additional Interest');
    await checkButtonTextIcon('Premium Finance');
    await checkButtonTextIcon('Bill Payer');
  });

  it.each([
    ['Mortgagee'],
    ['Additional Insured'],
    ['Additional Interest'],
    ['Premium Finance'],
    ['Bill Payer']
  ])('NEG:All Empty %s Testing', async ai => {
    const { getByText, getByTestId } = render(<QuoteWorkflow {...props} />);
    fireEvent.click(getByText(ai));
    await wait(() => {
      getByTestId('modal');
    });

    submitForm(getByTestId, 'ai-modal-submit');
    baseRequiredFields.forEach(field => checkError(getByTestId, field));
  });

  it.each([
    ['Mortgagee'],
    ['Additional Insured'],
    ['Additional Interest'],
    ['Premium Finance'],
    ['Bill Payer']
  ])('NEG: %s Empty Testing', async ai => {
    const { getByText, getByTestId } = render(<QuoteWorkflow {...props} />);
    fireEvent.click(getByText(ai));

    await waitForElement(() => getByTestId('modal'));

    await verifyForm(
      getByTestId,
      baseRequiredFields,
      [baseRequiredFields[0]],
      'ai-modal-submit'
    );
  });

  it.each([
    ['Mortgagee'],
    ['Additional Insured'],
    ['Additional Interest'],
    ['Premium Finance'],
    ['Bill Payer']
  ])('NEG: %s Invalid Input Testing', async ai => {
    const { getByText, getByTestId } = render(<QuoteWorkflow {...props} />);
    fireEvent.click(getByText(ai));
    await waitForElement(() => getByTestId('modal'));

    await verifyForm(
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
    await verifyForm(
      getByTestId,
      [
        {
          ...zipField,
          value: '1234567890',
          error: 'Only 5 numbers allowed'
        }
      ],
      [],
      'ai-modal-submit'
    );
  });

  it.each([
    ['Mortgagee', 'mortgage', 'Top Mortgagees'],
    ['Additional Insured', '', ''],
    ['Additional Interest', '', ''],
    ['Premium Finance', 'premiumFinance', 'Top Premium Finance'],
    ['Bill Payer', '', '']
  ])('POS: %s Testing', async (ai, dataTest, label) => {
    const newProps = {
      ...props,
      options: {
        ...props.options,
        order: [{ answer: '0', label: 'First Mortgagee' }]
      }
    };
    const { getByText, getByTestId } = render(<QuoteWorkflow {...newProps} />);

    fireEvent.click(getByText(ai));

    await wait(() => {
      expect(document.querySelector('.modal')).toBeInTheDocument();
      expect(
        document.querySelector(`.card.AdditionalInterestModal`)
      ).toBeInTheDocument();
    });

    const modal = document.querySelector('.modal');
    const modalIcon = within(modal).getByText(ai).firstChild.className;
    expect(modalIcon).toEqual(`fa ${ai}`);

    // expect(getAllByText(ai)[1].firstChild.className).toEqual(`fa ${ai}`);

    if (dataTest && label) {
      checkLabel(getByTestId, { dataTest, label });
    }

    fireEvent.click(getByText('cancel'));
    await wait(() => expect(document.querySelector('.modal')).toBeNull());
  });

  it('POS:Additional Interest Details', async () => {
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
    const { getByText } = render(<QuoteWorkflow {...newProps} />);
    await waitForElement(() =>
      getByText(/Please select the type of Additional Interest/i)
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

  it('POS:Additional Interest Details Renders with bad data', async () => {
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
    const { getByText, queryAllByText } = render(
      <QuoteWorkflow {...newProps} />
    );
    await waitForElement(() =>
      getByText(/Please select the type of Additional Interest/i)
    );
    expect(
      getByText(
        `${additionalInterests[0].type} ${additionalInterests[0].order + 1}`
      )
    );
    // Expect no text that says "undefined" in ui
    expect(queryAllByText(/undefined/).length).toBe(0);
  });

  it('POS:Confirm Additional Interests Show Up In Order and Disable Buttons', async () => {
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
    const { getByText } = render(<QuoteWorkflow {...newProps} />);
    await waitForElement(() =>
      getByText(/Please select the type of Additional Interest/i)
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

  it('POS:Checks Submit Button', async () => {
    const { getByTestId, getByText } = render(<QuoteWorkflow {...props} />);
    await waitForElement(() =>
      getByText(/Please select the type of Additional Interest/i)
    );

    checkButton(getByTestId, { text: 'not applicable' });
  });
});
