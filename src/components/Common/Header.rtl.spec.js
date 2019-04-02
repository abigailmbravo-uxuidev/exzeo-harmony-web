import React from 'react';
import 'jest-dom/extend-expect';
import { render, fireEvent, cleanup, configure } from 'react-testing-library';

import Header from './Header';

it('POS:Dashboard Banner', () => {
  configure({ testIdAttribute: 'data-test' });
  const props = {
    toggleSideNav: x => x,
  };

  const { getByAltText, getByText } = render(<Header {...props} />);
  expect(getByAltText('TypTap Insurance')).toBeVisible();
  expect(getByText(/844-289-7968/)).toHaveAttribute('href', 'tel:844-289-7968');
});
