import React from 'react';
import 'jest-dom/extend-expect';

import { renderWithReduxAndRouter, defaultProps } from '../../test-utils';
import Splash from '../Splash';

describe('Testing Splash component', () => {
  const props = {
    ...defaultProps,
    fieldQuestions: [],
    quoteData: {},
    appState: {
      data: {
        submitting: false
      }
    }
  };

  it('POS:Dashboard Button', () => {
    const { getByText } = renderWithReduxAndRouter(<Splash {...props} />);
    expect(getByText('New Quote')).toHaveAttribute('href', '/search/address');
    expect(getByText('Retrieve Quote')).toHaveAttribute('href', '/search/retrieve');
    expect(getByText('Retrieve Policy')).toHaveAttribute('href', '/policy');
  });

  it('POS:Dashboard Banner', () => {
    const { getByAltText, getByText } = renderWithReduxAndRouter(<Splash {...props} />);
    expect(getByAltText('TypTap Insurance').parentNode).toHaveAttribute('href', '/');
    expect(getByText(/844-289-7968/)).toHaveAttribute('href', 'tel:844-289-7968');
  });

  it('POS:Dashboard Detail Header', () => {
    const { getByTestId } = renderWithReduxAndRouter(<Splash {...props} />);
    expect(getByTestId('user-info').children.length).toEqual(2);
  });

  it('POS:Dashboard Side Navigation', () => {
    const { getByTestId } = renderWithReduxAndRouter(<Splash {...props} />);
    ['nav-home', 'nav-searchAddress', 'nav-policy', 'nav-contacts', 'nav-training'].forEach(tag => {
      expect(getByTestId(tag).firstChild.children.length).toEqual(2);
    });
  });

  it('POS:Dashboard Footer', () => {
    const { getByText } = renderWithReduxAndRouter(<Splash {...props} />);
    expect(getByText(/TypTap Management Company/).className).toEqual('copyright');
  });

  it('POS:Dashboard Text', () => {
    const { getByText, container } = renderWithReduxAndRouter(<Splash {...props} />);
    expect(getByText('Agency App').className).toEqual('app-header');
    expect(getByText(/insurance for Florida properties/));
    expect(getByText(/Getting a quote is always quick and simple with/));
    expect(getByText(/Homeowners Insurance/).className).toEqual('product-name');
    expect(getByText(/TypTap currently offers/));
    expect(container.querySelector('.card-header.image.card-header-image-home')).not.toEqual(null);
  });
});
