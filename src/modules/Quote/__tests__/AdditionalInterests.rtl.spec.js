import React from 'react';

import {
  render,
  fireEvent,
  wait,
  waitForElement,
  defaultQuoteWorkflowProps,
  checkButton,
  mockServiceRunner,
  mockQuestions
} from '../../../test-utils';
import QuoteWorkflow from '../QuoteWorkflow';

mockServiceRunner([]);
mockQuestions([]);

describe('Testing Additional Interests', () => {
  const props = {
    ...defaultQuoteWorkflowProps,
    location: { pathname: '/quote/12-345-67/additionalInterests' },
    match: { params: { step: 'additionalInterests', quoteNumber: '12-345-67' } }
  };

  it('POS:Checks Submit Button', async () => {
    const { getByTestId, getByText } = render(<QuoteWorkflow {...props} />);
    await waitForElement(() =>
      getByText(/Please select the type of Additional Interest/i)
    );

    checkButton(getByTestId, { text: 'not applicable' });
  });
});
