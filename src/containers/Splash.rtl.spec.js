import React from 'react';
import 'jest-dom/extend-expect';
import { renderWithReduxAndRouter, defaultInitialState, defaultProps } from 'test-utils';

import Splash from './Splash';

describe('Testing Splash component', () => {
  const initialState = {
    ...defaultInitialState,
    cg: {
      bb: {
        data: {
          modelInstanceId: '123',
          model: {},
          uiQuestions: []
        }
      }
    }
  };

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
    const { getByAltText, getByText } = renderWithReduxAndRouter(<Splash {...props} />, { initialState });
    expect(getByAltText('TypTap Insurance')).toBeVisible();
    expect(getByText(/844-289-7968/)).toHaveAttribute('href', 'tel:844-289-7968');
  });
})
