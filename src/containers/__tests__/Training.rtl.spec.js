import React from 'react';

import { render, defaultProps, checkHeader } from '../../test-utils';
import Training, {
  externalLinksGeneric,
  externalLinksHome,
  externalLinksFlood
} from '../Training';

const pageHeaders = [{ text: 'Reference' }];

describe('Testing the Helpful Info (Training) Page', () => {
  it('POS:Helpful Info Header Testing', () => {
    const { getByText } = render(<Training {...defaultProps} />);

    pageHeaders.forEach(header => checkHeader(getByText, header.text, header));
  });

  it('POS:Reference Links Testing', () => {
    const { getByText } = render(<Training {...defaultProps} />);

    externalLinksGeneric.forEach(link => {
      expect(
        document.querySelector(`div.${link.productIcon}`)
      ).toBeInTheDocument();
      expect(getByText(link.title));
      expect(getByText(link.description));
      expect(document.querySelector(`.${link.linkIcon}`)).toBeInTheDocument();
      expect(
        document.querySelector(`a[href="${link.url}"]`)
      ).toBeInTheDocument();
    });

    externalLinksHome.forEach(link => {
      expect(
        document.querySelector(`div.${link.productIcon}`)
      ).toBeInTheDocument();
      expect(getByText(link.title));
      expect(getByText(link.description));
      expect(document.querySelector(`.${link.linkIcon}`)).toBeInTheDocument();
      expect(
        document.querySelector(`a[href="${link.url}"]`)
      ).toBeInTheDocument();
    });

    externalLinksFlood.forEach(link => {
      expect(
        document.querySelector(`div.${link.productIcon}`)
      ).toBeInTheDocument();
      expect(getByText(link.title));
      expect(getByText(link.description));
      expect(document.querySelector(`.${link.linkIcon}`)).toBeInTheDocument();
      expect(
        document.querySelector(`a[href="${link.url}"]`)
      ).toBeInTheDocument();
    });
  });
});
