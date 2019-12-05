import React from 'react';
import { waitForElement } from 'react-testing-library';

import { renderWithReduxAndRouter, defaultProps } from '../../test-utils';
import Splash from '../Splash';

const sideNavLinks = [
  { dataTest: 'nav-home', href: '/', text: 'DASHBOARD' },
  { dataTest: 'nav-searchAddress', href: '/search/address', text: 'NEW QUOTE' },
  { dataTest: 'nav-searchQuotes', href: '/search/address', text: 'QUOTES' },
  { dataTest: 'nav-policy', href: '/policy', text: 'POLICIES' },
  { dataTest: 'nav-contacts', href: '/contacts', text: 'CONTACTS' },
  { dataTest: 'nav-training', href: '/training', text: 'HELPFUL INFO' }
];

describe('Testing Splash component', () => {
  it('POS:Dashboard Banner', () => {
    const { getByAltText, getByText } = renderWithReduxAndRouter(
      <Splash {...defaultProps} />
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
    const { getByText } = renderWithReduxAndRouter(
      <Splash {...defaultProps} />
    );

    expect(getByText('Date'));
  });

  it('POS:Dashboard Side Navigation', () => {
    const { getByTestId, getByText, getAllByText } = renderWithReduxAndRouter(
      <Splash {...defaultProps} />
    );

    sideNavLinks.forEach(async ({ dataTest, text, href }) => {
      const link = await getByTestId(dataTest).firstChild;
      expect(link.children.length).toEqual(2);
      expect(getAllByText(text)[0]);
      //expect(link).toHaveAttribute('href', href);
    });
  });

  it('POS:Dashboard Footer', () => {
    const { getByText } = renderWithReduxAndRouter(
      <Splash {...defaultProps} />
    );

    expect(getByText(/TypTap Management Company/).className).toEqual(
      'copyright'
    );
  });

  it('POS:Dashboard Text', () => {
    const { getByText, container } = renderWithReduxAndRouter(
      <Splash {...defaultProps} agency={{ displayName: 'Test Agency' }} />
    );

    expect(getByText('Hello & Welcome'));
    expect(getByText('Test Agency'));
  });

  it('POS:Dashboard Image', () => {
    const { container } = renderWithReduxAndRouter(
      <Splash {...defaultProps} />
    );

    expect(container.querySelector('div.welcome-banner')).toBeInTheDocument();
    expect(container.querySelector('div.typtap-lg')).toBeInTheDocument();
    expect(container.querySelector('div.typtap-sm')).toBeInTheDocument();
  });

  it('POS:Dashboard Button', () => {
    const { getByText } = renderWithReduxAndRouter(
      <Splash {...defaultProps} agency={{ status: 'Active' }} />
    );

    expect(getByText('New Quote')).toHaveAttribute('href', '/search/address');
    expect(getByText('Quotes')).toHaveAttribute('href', '/search/retrieve');
    expect(getByText('Policies')).toHaveAttribute('href', '/policy');
  });
});
