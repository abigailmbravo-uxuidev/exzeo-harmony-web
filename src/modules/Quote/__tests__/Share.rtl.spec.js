import React from 'react';
import { fireEvent } from 'react-testing-library';

import {
  renderWithReduxAndRouter,
  defaultQuoteWorkflowProps,
  checkError,
  checkHeader,
  checkLabel,
  checkTextInput,
  verifyForm,
  checkButton
} from '../../../test-utils';
import { QuoteWorkflow } from '../QuoteWorkflow';

const modalFields = [
  {
    dataTest: 'name',
    error: 'Field Required',
    label: 'Email To Name',
    type: 'text',
    required: true,
    value: 'Bruce Wayne'
  },
  {
    dataTest: 'email',
    error: 'Field Required',
    label: 'Email Address',
    type: 'text',
    required: true,
    value: 'Batman@gmail.com'
  }
];

const pageHeaders = [
  {
    dataTest: 'Share',
    text: 'Share',
    icon: 'fa fa-share-alt'
  },
  {
    dataTest: 'Continue',
    text: 'Continue',
    icon: 'fa fa-arrow-circle-right'
  },
  {
    dataTest: 'NewQuote',
    text: 'New Quote',
    icon: 'fa fa-quote-left'
  }
];

describe('Testing the Share Page', () => {
  const props = {
    ...defaultQuoteWorkflowProps,
    location: { pathname: '/quote/12-345-67/share' }
  };

  it('NEG:All Inputs Empty Value', () => {
    const { queryByTestId, getByTestId, getByText } = renderWithReduxAndRouter(<QuoteWorkflow {...props} />);
    // Confirm share button exists and the modal does not
    expect(getByTestId('share')).toHaveTextContent('share');
    expect(queryByTestId('Share Quote')).not.toBeInTheDocument();
    // Click the modal
    fireEvent.click(getByTestId('share'));
    // Confirm modal fields
    expect(getByTestId('name'));
    expect(getByTestId('email'));
    // Submit a blank form
    fireEvent.click(getByText('Send Email'));
    modalFields.forEach(field => checkError(getByTestId, field));
    // Submit with one blank field
    modalFields.forEach(fieldToLeaveBlank => verifyForm(getByTestId, modalFields, [fieldToLeaveBlank], 'modal-submit'));
    // Invalid inputs
    verifyForm(getByTestId, [{ ...modalFields[0], value: '∂ƒ©ƒ', error: 'Invalid characters' }], [], 'modal-submit');
    verifyForm(getByTestId, [{ ...modalFields[1], value: '∂ƒ©ƒ', error: 'Not a valid email address' }], [], 'modal-submit');
  });

  it('POS:Share Header / Text', () => {
    const { getByTestId } = renderWithReduxAndRouter(<QuoteWorkflow {...props} />);

    pageHeaders.forEach(header => checkHeader(getByTestId, header));
  });

  it('POS:Share Button / Share Modal', () => {
    const { getByText, queryByTestId, getByTestId } = renderWithReduxAndRouter(<QuoteWorkflow {...props} />);

    expect(queryByTestId('Share Quote'));
    fireEvent.click(getByTestId('share'));
    checkButton(getByTestId, { dataTest: 'modal-cancel', text: 'Cancel' });
    checkButton(getByTestId, { dataTest: 'modal-submit', text: 'Send Email', type: 'submit' });

    fireEvent.click(getByTestId('modal-cancel'));
    expect(queryByTestId('modal')).not.toBeInTheDocument();

    fireEvent.click(getByTestId('share'));
    expect(getByText('Share Quote'));
    modalFields.forEach(field => {
      checkLabel(getByTestId, field);
      checkTextInput(getByTestId, field);
    });
  });

  it('POS:Share Text', () => {
    const { getByText } = renderWithReduxAndRouter(<QuoteWorkflow {...props} />);

    expect(getByText(/To SHARE this quote/));
    expect(getByText(/To CONTINUE the quote process/));
    expect(getByText(/Mortgage information/));
    expect(getByText(/Name and email address of additional owners/));
    expect(getByText(/Name and address of any other additional insured to add to this policy/));
    expect(getByText(/When you are prepared to move forward/));
    expect(getByText(/Your current quote/));
  });

  it('POS:Next Button', () => {
    const { getByTestId } = renderWithReduxAndRouter(<QuoteWorkflow {...props} />);

    checkButton(getByTestId);
    checkButton(getByTestId, { dataTest: 'share', text: 'share' });
  });
});
