import React from 'react';
import { render, fireEvent, wait } from 'react-testing-library';

import Error from '../Error';
import {
  defaultInitialState,
  quote,
  fatalUnderwritingException,
  reviewUnderwritingExcception
} from '../../test-utils';

jest.mock('../../state/actions/quoteState.actions');

describe('Error testing', () => {
  it('Renders and has a fatal error', async () => {
    const props = {
      getQuote: jest.fn(),
      location: {
        state: {
          quote,
          exceptions: [fatalUnderwritingException]
        }
      },
      history: {
        replace: jest.fn()
      }
    };

    const { getByText, queryByText } = render(<Error {...props} />);

    expect(
      getByText('Underwriting Error(s)').querySelector('i').className
    ).toEqual('fa fa-exclamation-triangle');

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

    expect(queryByText('Edit', { exact: true })).toBeNull();

    expect(getByText('Start New Quote'));

    await wait(() => fireEvent.click(getByText('Start New Quote')));

    expect(props.getQuote).toHaveBeenCalledTimes(0);
    expect(props.history.replace).toHaveBeenCalledTimes(1);
  });

  it('Has an underwriting review error', async () => {
    const props = {
      getQuote: jest.fn(),
      location: {
        state: {
          quote,
          exceptions: [reviewUnderwritingExcception]
        }
      },
      history: {
        replace: jest.fn()
      }
    };

    const { container, getByText } = render(<Error {...props} />);

    expect(
      getByText('Underwriting Error(s)').querySelector('i').className
    ).toEqual('fa fa-exclamation-triangle');

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

    expect(getByText('Edit', { exact: true }));

    expect(getByText('Start New Quote', { exact: true }));

    await wait(() => fireEvent.click(getByText('Edit', { exact: true })));

    expect(props.getQuote).toHaveBeenCalledTimes(1);
    expect(props.history.replace).toHaveBeenCalledTimes(1);
  });
});
