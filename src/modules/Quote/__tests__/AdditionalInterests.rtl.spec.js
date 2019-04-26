import React from 'react';
import { fireEvent } from 'react-testing-library';

import {
  renderWithReduxAndRouter,
  defaultInitialState,
  defaultProps,
  checkHeader,
  checkLabel,
  checkTextInput,
  checkSelect,
  baseAiFields,
  additionalInterest
} from '../../../test-utils';
import ConnectedQuoteWorkflow from '../QuoteWorkflow';

describe('Testing Additional Interests', () => {
  const props = {
    ...defaultProps,
    location: {
      pathname: '/quote/12-5162219-01/additionalInterests'
    }
  };

  const state = {
    ...defaultInitialState
  };

  const openAndCloseModal = (getByText, modal) => {
    fireEvent.click(getByText(modal));
    expect(document.querySelector(`card.AdditionalInterestModal.${modal}`));
    fireEvent.click(getByText('cancel'));
    expect(document.querySelector('form#AdditionalInterestModal')).toBeNull();
  };

  it('POS:Checks Header and Buttons', () => {
    const { getByText } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />, { state });

    const checkButtonTextIcon = text => expect(getByText(text).previousSibling.className).toEqual('fa fa-plus');

    checkButtonTextIcon('Mortgagee');
    checkButtonTextIcon('Additional Insured');
    checkButtonTextIcon('Additional Interest');
    checkButtonTextIcon('Premium Finance');
    checkButtonTextIcon('Bill Payer');
  });

  it('POS:Mortgagee Testing', () => {
    const { getByText, getAllByText, getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />, { state });

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
    const { getByText, getAllByText, getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />, { state });

    openAndCloseModal(getByText, 'Additional Insured');

    fireEvent.click(getByText('Additional Insured'));
    expect(getAllByText('Additional Insured')[1].firstChild.className).toEqual('fa Additional Insured');
    baseAiFields.forEach(field => {
      checkLabel(getByTestId, field);
      checkTextInput(getByTestId, field);
    });
  });

  it('POS:Additional Interest Testing', () => {
    const { getByText, getAllByText, getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />, { state });

    openAndCloseModal(getByText, 'Additional Interest');

    fireEvent.click(getByText('Additional Interest'));
    expect(getAllByText('Additional Interest')[1].firstChild.className).toEqual('fa Additional Interest');
    baseAiFields.forEach(field => {
      checkLabel(getByTestId, field);
      checkTextInput(getByTestId, field);
    });
  });

  it('POS:Premium Finance Testing', () => {
    const { getByText, getAllByText, getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />, { state });

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
    const { getByText, getAllByText, getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />, { state });

    openAndCloseModal(getByText, 'Bill Payer');

    fireEvent.click(getByText('Bill Payer'));
    expect(getAllByText('Bill Payer')[1].firstChild.className).toEqual('fa Bill Payer');
    baseAiFields.forEach(field => {
      checkLabel(getByTestId, field);
      checkTextInput(getByTestId, field);
    });
  });
  
  it('POS:Confirm Additional Interests Show Up In Order and Disable Buttons', () => {
    const newState = {
      ...state,
      quoteState: {
        quote: {
          ...state.quoteState.quote,
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

    const { getByText, getAllByText, getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />, { state: newState });
    // ...so we know the UI will still organize and sort them correctly, in order
    const labelTexts = document.querySelectorAll('.results.result-cards li.card .card-icon label');
    labelTexts.forEach((label, i) => expect(label.textContent).toEqual(expectedLabels[i]));

    expect(getByText('Mortgagee')).toBeDisabled();
    expect(getByText('Additional Insured')).toBeDisabled();
    expect(getByText('Additional Interest')).toBeDisabled();
    expect(getByText('Premium Finance')).toBeDisabled();
    expect(getByText('Bill Payer')).toBeDisabled();
  });
});