import React from 'react';

import { normalize } from '@exzeo/core-ui';

import { render, defaultProps, checkHeader } from '../../test-utils';
import Contacts, {
  territoryManagerContacts,
  supportContacts
} from '../Contacts';

const pageHeaders = [
  {
    text: 'Territory Managers',
    icon: 'fa fa-map-marker'
  },
  {
    text: 'All Departments',
    icon: 'fa fa-phone-square'
  }
];

describe('Testing the Contacts Page', () => {
  it('POS:Contacts Header Testing', () => {
    const { getByText } = render(<Contacts {...defaultProps} />);

    pageHeaders.forEach(header => checkHeader(getByText, header.text, header));
  });

  it('POS:Territory Managers Cards Testing', () => {
    const { getAllByText } = render(<Contacts {...defaultProps} />);

    territoryManagerContacts.forEach(manager => {
      expect(
        document.querySelector(`div.${manager.icon.split(' ')[0]}`)
      ).toBeInTheDocument();
      expect(getAllByText(manager.name));
      expect(getAllByText(manager.title));
      expect(getAllByText(normalize.phone(manager.phone)));
      manager.cell && expect(getAllByText(normalize.phone(manager.cell)));
      expect(getAllByText(manager.email));
    });
  });

  it('POS:Support Cards Testing', () => {
    const { getAllByText } = render(<Contacts {...defaultProps} />);

    supportContacts.forEach(support => {
      const extension = support.extension ? ` ${support.extension}` : '';
      expect(
        document.querySelector(`div.${support.icon.split(' ')[0]}`)
      ).toBeInTheDocument();
      expect(getAllByText(support.name));
      // expect(getByText(`${normalize.phone(support.phone)}${extension}`));
      expect(getAllByText(support.email));
      support.message && expect(getAllByText(support.message));
      support.disclaimer && expect(getAllByText(support.disclaimer));
    });
  });
});
