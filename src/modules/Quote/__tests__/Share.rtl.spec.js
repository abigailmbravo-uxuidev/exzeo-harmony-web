import React from 'react';
import { fireEvent } from 'react-testing-library';

import {
  renderWithReduxAndRouter,
  defaultQuoteWorkflowProps,
  checkError,
  checkHeader,
  checkLabel,
  checkTextInput,
  verifyForm
} from '../../../test-utils';
import { QuoteWorkflow } from '../QuoteWorkflow';

const modalFields = [
  {
    dataTest: 'name',
    error: 'Field Required',
    label: 'Name',
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
    const { queryByTestId, getByTestId } = renderWithReduxAndRouter(<QuoteWorkflow {...props} />);

    expect(queryByTestId('Share Quote'));
    fireEvent.click(getByTestId('share'));
    modalFields.forEach(field => {
      checkLabel(getByTestId, field);
      checkTextInput(getByTestId, field);
    });
  });

  it('POS:Next Button', () => {
    const { getByTestId } = renderWithReduxAndRouter(<QuoteWorkflow {...props} />);
    expect(getByTestId('submit')).toHaveTextContent('next');
  });
});
