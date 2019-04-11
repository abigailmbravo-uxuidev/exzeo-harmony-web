import React from 'react';
import 'jest-dom/extend-expect';

import { normalize } from '@exzeo/core-ui';

import { renderWithReduxAndRouter, defaultProps, testHelpers } from '../../test-utils';
import Contacts, { territoryManagerContacts, supportContacts } from '../Contacts';

const pageHeaders = [
  {
    text: 'Territory Managers',
    icon: 'fa fa-map-marker'
  },
  {
    text: 'Support',
    icon: 'fa fa-address-book'
  }
];

const { checkHeader } = testHelpers;

describe('Testing the Contacts Page', () => {
  it('POS:Contacts Header Testing', () => {
    const { getByText } = renderWithReduxAndRouter(<Contacts {...defaultProps} />);
    pageHeaders.forEach(header => checkHeader(getByText, header));
  });

  it('POS:Territory Managers Cards Testing', () => {
    const { getByText } = renderWithReduxAndRouter(<Contacts {...defaultProps} />);
    territoryManagerContacts.forEach(manager => {
      expect(document.querySelector(`div.${manager.icon}`));
      expect(getByText(manager.name));
      expect(getByText(`| ${manager.title}`));
      expect(getByText(normalize.phone(manager.phone)));
      manager.cell && expect(getByText(normalize.phone(manager.cell)));
      expect(getByText(manager.email));
    });
  });

  it('POS:Support Cards Testing', () => {
    const { getByText } = renderWithReduxAndRouter(<Contacts {...defaultProps} />);
    supportContacts.forEach(support => {
      expect(document.querySelector(`div.${support.icon}`));
      expect(getByText(support.name));
      expect(getByText(`${normalize.phone(support.phone)} ${support.extension}`));
      expect(getByText(support.email));
      support.message && expect(getByText(support.message));
      support.disclaimer && expect(getByText(support.disclaimer));
    });
  });
});
