import React from 'react';

import {
  render,
  defaultProps,
  checkHeader,
  userProfile,
  defaultAuth
} from '../../test-utils';
import Training, { GENERAL, HO3, AF3 } from '../Training';

const pageHeaders = [{ text: 'Reference' }];

describe('Testing the Helpful Info (Training) Page', () => {
  const authContext = {
    ...defaultAuth,
    userProfile: userProfile
  };

  it('POS:Helpful Info Header Testing', () => {
    const { getByText } = render(<Training {...defaultProps} />, {
      auth: authContext
    });

    pageHeaders.forEach(header => checkHeader(getByText, header.text, header));
  });

  it('POS:Reference Links Testing', async () => {
    const { getByText } = render(<Training {...defaultProps} />, {
      auth: authContext
    });

    GENERAL.forEach(link => {
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

    HO3.forEach(link => {
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

    AF3.forEach(link => {
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
