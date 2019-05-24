import React from 'react';
import { fireEvent, wait } from 'react-testing-library';

import {
  renderWithReduxAndRouter,
  defaultInitialState,
  defaultProps,
  checkLabel,
  checkTextInput,
  checkSelect,
  checkError,
  submitForm,
  baseAiFields,
  personalFields,
  additionalInterest,
  verifyForm
} from '../../../test-utils';
import ConnectedQuoteWorkflow from '../QuoteWorkflow';

describe('Testing Additional Interests', () => {
  const props = {
    ...defaultProps,
    location: { pathname: '/quote/12-5162219-01/additionalInterests' }
  };

  const openAndCloseModal = async (getByText, modal) => {
    fireEvent.click(getByText(modal));
    await wait(() => document.querySelector(`card.AdditionalInterestModal.${modal}`).toBeInTheDocument());
    fireEvent.click(getByText('cancel'));
    await wait (() => expect(document.querySelector('form#AdditionalInterestModal')).toBeNull());
  };

  const baseRequiredFields = baseAiFields.filter(({ required }) => required);
  const personalRequiredFields = personalFields.filter(({ required }) => required);
  const stateField = baseAiFields.find(({ name }) => name === 'state');
  const zipField = baseAiFields.find(({ name }) => name === 'zip');

  it('POS:Checks Header and Buttons', () => {
    const { getByText } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />);
    const checkButtonTextIcon = text => expect(getByText(text).previousSibling.className).toEqual('fa fa-plus');

    checkButtonTextIcon('Mortgagee');
    checkButtonTextIcon('Additional Insured');
    checkButtonTextIcon('Additional Interest');
    checkButtonTextIcon('Premium Finance');
    checkButtonTextIcon('Bill Payer');
  });

  it('NEG:All Empty Mortgagee Testing', () => {
    const { getByText, getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />);
    fireEvent.click(getByText('Mortgagee'));

    submitForm(getByTestId, 'ai-modal-submit');
    baseRequiredFields.forEach(field => checkError(getByTestId, field));
  });

  it('NEG:Mortgagee Empty Testing', () => {
    const { getByText, getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />);
    fireEvent.click(getByText('Mortgagee'));

    baseRequiredFields.forEach(fieldToLeaveBlank => verifyForm(getByTestId, baseRequiredFields, [fieldToLeaveBlank], 'ai-modal-submit'));
  });

  it('NEG:Mortgagee Invalid Input Testing', () => {
    const { getByText, getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />);
    fireEvent.click(getByText('Mortgagee'));

    verifyForm(getByTestId, [{
      ...stateField, data: 'abc', error: 'Only 2 letters allowed'
    }], [], 'ai-modal-submit');
    verifyForm(getByTestId, [{
      ...zipField, data: '1234567890', error: 'Only 8 letters or numbers allowed'
    }], [], 'ai-modal-submit');
  });

  it('NEG:All Empty Additional Insured Testing', () => {
    const { getByText, getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />);
    fireEvent.click(getByText('Additional Insured'));

    submitForm(getByTestId, 'ai-modal-submit');
    personalRequiredFields.forEach(field => checkError(getByTestId, field));
  });

  it('NEG:Additional Insured Empty Testing', () => {
    const { getByText, getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />);
    fireEvent.click(getByText('Additional Insured'));

    personalRequiredFields.forEach(fieldToLeaveBlank => verifyForm(getByTestId, personalRequiredFields, [fieldToLeaveBlank], 'ai-modal-submit'));
  });

  it('NEG:Additional Insured Invalid Input Testing', () => {
    const { getByText, getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />);
    fireEvent.click(getByText('Additional Insured'));

    verifyForm(getByTestId, [{
      ...stateField, data: 'abc', error: 'Only 2 letters allowed'
    }], [], 'ai-modal-submit');
    verifyForm(getByTestId, [{
      ...zipField, data: '1234567890', error: 'Only 8 letters or numbers allowed'
    }], [], 'ai-modal-submit');
  });

  it('NEG:All Empty Additional Interest Testing', () => {
    const { getByText, getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />);
    fireEvent.click(getByText('Additional Interest'));

    submitForm(getByTestId, 'ai-modal-submit');
    personalRequiredFields.forEach(field => checkError(getByTestId, field));
  });

  it('NEG:Additional Interest Empty Testing', () => {
    const { getByText, getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />);
    fireEvent.click(getByText('Additional Interest'));

    personalRequiredFields.forEach(fieldToLeaveBlank => verifyForm(getByTestId, personalRequiredFields, [fieldToLeaveBlank], 'ai-modal-submit'));
  });

  it('NEG:Additional Interest Invalid Input Testing', () => {
    const { getByText, getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />);
    fireEvent.click(getByText('Additional Interest'));

    verifyForm(getByTestId, [{
      ...stateField, data: 'abc', error: 'Only 2 letters allowed'
    }], [], 'ai-modal-submit');
    verifyForm(getByTestId, [{
      ...zipField, data: '1234567890', error: 'Only 8 letters or numbers allowed'
    }], [], 'ai-modal-submit');
  });

  it('NEG:All Empty Premium Finance Testing', () => {
    const { getByText, getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />);
    fireEvent.click(getByText('Premium Finance'));

    submitForm(getByTestId, 'ai-modal-submit');
    baseRequiredFields.forEach(field => checkError(getByTestId, field));
  });

  it('NEG:Premium Finance Empty Testing', () => {
    const { getByText, getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />);
    fireEvent.click(getByText('Premium Finance'));

    baseRequiredFields.forEach(fieldToLeaveBlank => verifyForm(getByTestId, baseRequiredFields, [fieldToLeaveBlank], 'ai-modal-submit'));
  });

  it('NEG:Premium Finance Invalid Input Testing', () => {
    const { getByText, getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />);
    fireEvent.click(getByText('Premium Finance'));

    verifyForm(getByTestId, [{
      ...stateField, data: 'abc', error: 'Only 2 letters allowed'
    }], [], 'ai-modal-submit');
    verifyForm(getByTestId, [{
      ...zipField, data: '1234567890', error: 'Only 8 letters or numbers allowed'
    }], [], 'ai-modal-submit');
  });

  it('NEG:All Empty Bill Payer Testing', () => {
    const { getByText, getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />);
    fireEvent.click(getByText('Bill Payer'));

    submitForm(getByTestId, 'ai-modal-submit');
    personalRequiredFields.forEach(field => checkError(getByTestId, field));
  });

  it('NEG:Bill Payer Empty Testing', () => {
    const { getByText, getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />);
    fireEvent.click(getByText('Bill Payer'));

    personalRequiredFields.forEach(fieldToLeaveBlank => verifyForm(getByTestId, personalRequiredFields, [fieldToLeaveBlank], 'ai-modal-submit'));
  });

  it('NEG:Bill Payer Invalid Input Testing', () => {
    const { getByText, getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />);
    fireEvent.click(getByText('Bill Payer'));

    verifyForm(getByTestId, [{
      ...stateField, data: 'abc', error: 'Only 2 letters allowed'
    }], [], 'ai-modal-submit');
    verifyForm(getByTestId, [{
      ...zipField, data: '1234567890', error: 'Only 8 letters or numbers allowed'
    }], [], 'ai-modal-submit');
  });

  it('POS:Mortgagee Testing', () => {
    const { getByText, getAllByText, getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />);

    openAndCloseModal(getByText, 'Mortgagee');
    fireEvent.click(getByText('Mortgagee'));
    expect(getAllByText('Mortgagee')[1].firstChild.className).toEqual('fa Mortgagee');
    baseAiFields.forEach(field => {
      checkLabel(getByTestId, field);
      checkTextInput(getByTestId, field);
    });
    checkLabel(getByTestId, { name: 'mortgage', label: 'Top Mortgagees' });
    checkSelect(getByTestId, { name: 'order', type: 'select', values: ['0'] });
  });

  it('POS:Additional Insured Testing', () => {
    const { getByText, getAllByText, getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />);

    openAndCloseModal(getByText, 'Additional Insured');
    fireEvent.click(getByText('Additional Insured'));
    expect(getAllByText('Additional Insured')[1].firstChild.className).toEqual('fa Additional Insured');
    personalFields.forEach(field => {
      checkLabel(getByTestId, field);
      checkTextInput(getByTestId, field);
    });
  });

  it('POS:Additional Interest Testing', () => {
    const { getByText, getAllByText, getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />);

    openAndCloseModal(getByText, 'Additional Interest');
    fireEvent.click(getByText('Additional Interest'));
    expect(getAllByText('Additional Interest')[1].firstChild.className).toEqual('fa Additional Interest');
    personalFields.forEach(field => {
      checkLabel(getByTestId, field);
      checkTextInput(getByTestId, field);
    });
  });

  it('POS:Premium Finance Testing', () => {
    const { getByText, getAllByText, getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />);

    openAndCloseModal(getByText, 'Premium Finance');
    fireEvent.click(getByText('Premium Finance'));
    expect(getAllByText('Premium Finance')[1].firstChild.className).toEqual('fa Premium Finance');
    baseAiFields.forEach(field => {
      checkLabel(getByTestId, field);
      checkTextInput(getByTestId, field);
    });
    checkLabel(getByTestId, { name: 'premiumFinance', label: 'Top Premium Finance' });
  });

  it('POS:Bill Payer Testing', () => {
    const { getByText, getAllByText, getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />);

    openAndCloseModal(getByText, 'Bill Payer');
    fireEvent.click(getByText('Bill Payer'));
    expect(getAllByText('Bill Payer')[1].firstChild.className).toEqual('fa Bill Payer');
    personalFields.forEach(field => {
      checkLabel(getByTestId, field);
      checkTextInput(getByTestId, field);
    });
  });

  it('POS:Additional Interest Details', () => {
    const newState = {
      ...defaultInitialState,
      quoteState: {
        quote: {
          ...defaultInitialState.quoteState.quote,
          additionalInterests: [{ ...additionalInterest, _id: '1234', type: 'Mortgagee' }]
        }
      }
    };
    const { quoteState: { quote: { additionalInterests }}} = newState;
    const { getByText } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />, { state: newState });

    expect(getByText(`${additionalInterests[0].name1} ${additionalInterests[0].name2}`));
    expect(getByText(`${additionalInterests[0].mailingAddress.address1}, ${additionalInterests[0].mailingAddress.city}, ${additionalInterests[0].mailingAddress.state} ${additionalInterests[0].mailingAddress.zip}`));
    expect(getByText(`${additionalInterests[0].type} ${additionalInterests[0].order + 1}`));
    expect(document.querySelector('i.fa.fa-circle.Mortgagee')).toBeInTheDocument();
    expect(document.querySelector('a.remove i.fa.delete')).toBeInTheDocument();
    expect(document.querySelector('a.edit i.fa.fa.edit')).toBeInTheDocument();
  });

  it('POS:Additional Interest Details Renders with bad data', () => {
    const newState = {
      ...defaultInitialState,
      quoteState: {
        quote: {
          ...defaultInitialState.quoteState.quote,
          additionalInterests: [{
            _id: '', name1: '',
            mailingAddress: { address1: '', city: '', state: '', zip: '' },
            order: 0, type: 'Mortgagee'
          }]
        }
      }
    };
    const { quoteState: { quote: { additionalInterests } } } = newState;
    const { getByText, queryAllByText } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />, { state: newState });
    expect(getByText(`${additionalInterests[0].type} ${additionalInterests[0].order + 1}`));
    // Expect no text that says "undefined" in ui
    expect(queryAllByText(/undefined/).length).toBe(0);
  });

  it('POS:Confirm Additional Interests Show Up In Order and Disable Buttons [Premium Finance]', () => {
    const newState = {
      ...defaultInitialState,
      quoteState: {
        quote: {
          ...defaultInitialState.quoteState.quote,
          additionalInterests: [
            // Intentionally give a messed up order...
            { ...additionalInterest, order: 1, type: 'Additional Interest' },
            { ...additionalInterest, order: 2, type: 'Mortgagee' },
            { ...additionalInterest, order: 1, type: 'Additional Insured' },
            { ...additionalInterest, order: 0, type: 'Mortgagee' },
            { ...additionalInterest, order: 1, type: 'Mortgagee' },
            { ...additionalInterest, order: 0, type: 'Premium Finance' },
            { ...additionalInterest, order: 0, type: 'Additional Interest' },
            { ...additionalInterest, order: 0, type: 'Additional Insured' },
          ]
        }
      }
    };
    const expectedLabels = [
      'Mortgagee 1', 'Mortgagee 2', 'Mortgagee 3',
      'Additional Insured 1', 'Additional Insured 2',
      'Additional Interest 1', 'Additional Interest 2',
      'Premium Finance 1'
    ];
    const { getByText } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />, { state: newState });
    // ...so we know the UI will still organize and sort them correctly, in order
    const labelTexts = document.querySelectorAll('.results.result-cards li.card .card-icon label');
    labelTexts.forEach((label, i) => expect(label.textContent).toEqual(expectedLabels[i]));
    expect(getByText('Mortgagee')).toBeDisabled();
    expect(getByText('Additional Insured')).toBeDisabled();
    expect(getByText('Additional Interest')).toBeDisabled();
    expect(getByText('Premium Finance')).toBeDisabled();
    expect(getByText('Bill Payer')).toBeDisabled();
  });

  // Identical test to the one above except with a Bill Payer
  it('POS:Confirm Additional Interests Show Up In Order and Disable Buttons [Bill Payer]', () => {
    const newState = {
      ...defaultInitialState,
      quoteState: {
        quote: {
          ...defaultInitialState.quoteState.quote,
          additionalInterests: [
            { ...additionalInterest, order: 1, type: 'Additional Interest' },
            { ...additionalInterest, order: 2, type: 'Mortgagee' },
            { ...additionalInterest, order: 1, type: 'Additional Insured' },
            { ...additionalInterest, order: 0, type: 'Mortgagee' },
            { ...additionalInterest, order: 1, type: 'Mortgagee' },
            { ...additionalInterest, order: 0, type: 'Bill Payer' },
            { ...additionalInterest, order: 0, type: 'Additional Interest' },
            { ...additionalInterest, order: 0, type: 'Additional Insured' },
          ]
        }
      }
    };
    const expectedLabels = [
      'Mortgagee 1', 'Mortgagee 2', 'Mortgagee 3',
      'Additional Insured 1', 'Additional Insured 2',
      'Additional Interest 1', 'Additional Interest 2',
      'Bill Payer 1'
    ];
    const { getByText } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />, { state: newState });

    const labelTexts = document.querySelectorAll('.results.result-cards li.card .card-icon label');
    labelTexts.forEach((label, i) => expect(label.textContent).toEqual(expectedLabels[i]));
    expect(getByText('Mortgagee')).toBeDisabled();
    expect(getByText('Additional Insured')).toBeDisabled();
    expect(getByText('Additional Interest')).toBeDisabled();
    expect(getByText('Premium Finance')).toBeDisabled();
    expect(getByText('Bill Payer')).toBeDisabled();
  });
});
