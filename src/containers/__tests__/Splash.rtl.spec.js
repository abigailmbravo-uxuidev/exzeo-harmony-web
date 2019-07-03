import React from 'react';

import { renderWithReduxAndRouter, defaultProps } from '../../test-utils';
import Splash from '../Splash';

const sideNavLinks = [
  { dataTest: 'nav-home', href: '/', text: 'DASHBOARD' },
  { dataTest: 'nav-searchAddress', href: '/search/address', text: 'QUOTE' },
  { dataTest: 'nav-policy', href: '/policy', text: 'POLICY' },
  { dataTest: 'nav-contacts', href: '/contacts', text: 'CONTACTS' },
  { dataTest: 'nav-training', href: '/training', text: 'HELPFUL INFO' }
];

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

  it('POS:Dashboard Banner', () => {
    const { getByAltText, getByText } = renderWithReduxAndRouter(
      <Splash {...props} />
    );

    expect(getByAltText('TypTap Insurance').parentNode).toHaveAttribute(
      'href',
      '/'
    );
    expect(getByText(/844-289-7968/)).toHaveAttribute(
      'href',
      'tel:844-289-7968'
    );
  });

  it('POS:Dashboard Detail Header', () => {
    const { getByTestId } = renderWithReduxAndRouter(<Splash {...props} />);

    expect(getByTestId('user-info').children.length).toEqual(2);
  });

  it('POS:Dashboard Side Navigation', () => {
    const { getByTestId, getByText } = renderWithReduxAndRouter(
      <Splash {...props} />
    );

    sideNavLinks.forEach(({ dataTest, text, href }) => {
      const link = getByTestId(dataTest).firstChild;
      expect(link.children.length).toEqual(2);
      expect(getByText(text));
      expect(link).toHaveAttribute('href', href);
    });
  });

  it('POS:Dashboard Footer', () => {
    const { getByText } = renderWithReduxAndRouter(<Splash {...props} />);

    expect(getByText(/TypTap Management Company/).className).toEqual(
      'copyright'
    );
  });

  it('POS:Dashboard Text', () => {
    const { getByText, container } = renderWithReduxAndRouter(
      <Splash {...props} />
    );

    expect(getByText('Agency App').className).toEqual('app-header');
    expect(getByText(/insurance for Florida properties/));
    expect(getByText(/Getting a quote is always quick and simple with/));
    expect(getByText(/Homeowners Insurance/).className).toEqual('product-name');
    expect(getByText(/TypTap currently offers/));
    expect(
      container.querySelector('.card-header.image.card-header-image-home')
    ).toBeInTheDocument();
  });

  it('POS:Dashboard Image', () => {
    const { container } = renderWithReduxAndRouter(<Splash {...props} />);

    expect(
      container.querySelector('div.card-header-image-home')
    ).toBeInTheDocument();
    expect(container.querySelector('div.exzeo')).toBeInTheDocument();
  });

  it('POS:Dashboard Button', () => {
    const { getByText } = renderWithReduxAndRouter(<Splash {...props} />);

    expect(getByText('New Quote')).toHaveAttribute('href', '/search/address');
    expect(getByText('Retrieve Quote')).toHaveAttribute(
      'href',
      '/search/retrieve'
    );
    expect(getByText('Retrieve Policy')).toHaveAttribute('href', '/policy');
  });
});
