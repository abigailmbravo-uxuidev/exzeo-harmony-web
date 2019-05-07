import React from 'react';

import { renderWithReduxAndRouter, defaultProps, checkHeader } from '../../test-utils';
import Training, { externalLinks } from '../Training';

const pageHeaders = [{ text: 'Reference' }];

describe('Testing the Helpful Info (Training) Page', () => {
  it('POS:Helpful Info Header Testing', () => {
    const { getByText } = renderWithReduxAndRouter(<Training { ...defaultProps } />);
  
    pageHeaders.forEach(header => checkHeader(getByText, header));
  });

  it('POS:Reference Links Testing', () => {
    const { getByText } = renderWithReduxAndRouter(<Training {...defaultProps} />);

    externalLinks.forEach(link => {
      expect(document.querySelector(`div.${link.productIcon}`));
      expect(getByText(link.title));
      expect(getByText(link.description));
      expect(document.querySelector(`div.${link.linkIcon}`));
      expect(document.querySelector(`a[href="${link.url}"]`));
    });
  });
});
