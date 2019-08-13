import React from 'react';
import { render, fireEvent } from 'react-testing-library';

import Error from '../Error';
import {
  defaultInitialState,
  quote,
  fatalUnderwritingException,
  reviewUnderwritingExcception
} from '../../../test-utils';

describe('Error testing', () => {
  it('Renders and has a fatal error', () => {
    const props = {
      getQuote: () => {},
      location: {
        state: {
          quote,
          exceptions: [fatalUnderwritingException]
        }
      },
      history: {
        replace: () => {}
      }
    };

    const { container, getByText, queryByText } = render(<Error {...props} />);

    expect(container.querySelector('i').className).toEqual(
      'fa fa-exclamation-triangle'
    );
    expect(getByText('Underwriting Error(s)'));
    expect(
      getByText("Unfortunately, we've encountered an error with your quote:")
    );
    expect(
      getByText('Homes that are rented are not eligible for this program.')
    );
    expect(getByText('email us').parentNode).toHaveAttribute(
      'href',
      'mailto:customerservice@typtap.com'
    );
    expect(getByText('(844) 289-7968').parentNode).toHaveAttribute(
      'href',
      'tel:8442897968'
    );
  });

  it('Has an underwriting review error', () => {
    const props = {
      getQuote: () => {},
      location: {
        state: {
          quote,
          exceptions: [reviewUnderwritingExcception]
        }
      },
      history: {
        replace: () => {}
      }
    };

    const { container, getByText, queryByText } = render(<Error {...props} />);

    expect(container.querySelector('i').className).toEqual(
      'fa fa-exclamation-triangle'
    );
    expect(getByText('Underwriting Error(s)'));
    expect(
      getByText(
        'The following underwriting error(s) have occurred for this quote:'
      )
    );
    expect(
      getByText(
        'Due to previous claims history, underwriting review is required prior to binding.'
      )
    );
    expect(
      getByText(
        'If you feel that you received this page in error and would like to edit the quote, please select Edit below.'
      )
    );
  });
});
