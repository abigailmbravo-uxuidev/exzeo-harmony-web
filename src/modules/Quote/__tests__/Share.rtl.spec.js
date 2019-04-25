import React from 'react';
import { fireEvent } from 'react-testing-library';

import {
  renderWithReduxAndRouter,
  defaultProps,
  shareTemplate,
  checkHeader,
  checkLabel
} from '../../../test-utils';
import ConnectedShare from '../Share';

const modalFields = [
  {
    name: 'name',
    error: 'Field Required',
    label: 'Name',
    type: 'text',
    required: true,
    data: 'Bruce Wayne'
  },
  {
    name: 'email',
    error: 'Field Required',
    label: 'Email Address',
    type: 'text',
    required: true,
    data: 'Batman@gmail.com'
  }
];

const pageHeaders = [
  {
    name: 'Share',
    text: 'Share',
    icon: 'fa fa-share-alt'
  },
  {
    name: 'Continue',
    text: 'Continue',
    icon: 'fa fa-arrow-circle-right'
  },
  {
    name: 'NewQuote',
    text: 'New Quote',
    icon: 'fa fa-quote-left'
  }
];

describe('Testing the Share Page', () => {
  const props = {
    ...defaultProps,
    customHandlers: {
      getState: () => ({ showEmailPopup: false }),
      setEmailPopup: bool => bool,
      handleSubmit: jest.fn()
    }
  };

  it('NEG:All Inputs Empty Value', () => {
    const { queryByTestId, getByTestId, rerender, wrapUi } = renderWithReduxAndRouter(<ConnectedShare {...props} />);
    // Confirm share button exists and the modal does not
    // FIXME: This is an example of poorly-structured code causing tests to be overly complicated
    expect(getByTestId('share')).toHaveTextContent('share');
    expect(queryByTestId('Share Quote')).toBeNull();
    fireEvent.click(getByTestId('share'));
    rerender(wrapUi(
      <ConnectedShare
        {...props}
        customHandlers={{
          ...props.customHandlers, getState: () => ({ showEmailPopup: true }),
        }}
      />
    ));
    // Confirm modal fields
    expect(getByTestId('name'));
    expect(getByTestId('email'));
    fireEvent.focus(getByTestId('modal-submit'));
    fireEvent.blur(getByTestId('modal-submit'));
    // TODO: Once redux-form is out we need to test the validation for empty and invalid inputs
  });

  it('POS:Share Header / Text', () => {
    const { getByTestId } = renderWithReduxAndRouter(<ConnectedShare {...props} />);

    pageHeaders.forEach(header => checkHeader(getByTestId, header));
  });

  it('POS:Share Button / Share Modal', () => {
    const { queryByTestId, getByTestId } = renderWithReduxAndRouter(
      <ConnectedShare
        {...props}
        customHandlers={{
          ...props.customHandlers, getState: () => ({ showEmailPopup: true }),
        }}
      />
    );
    expect(queryByTestId('Share Quote'));
    modalFields.forEach(field => checkLabel(getByTestId, field));
  });

  it('POS:Next Button', () => {
    const { getByTestId } = renderWithReduxAndRouter(<ConnectedShare {...props} />);
    expect(getByTestId('submit')).toHaveTextContent('next');
  });
});
