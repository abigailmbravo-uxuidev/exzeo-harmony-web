import React from 'react';

import {
  renderWithReduxAndRouter,
  defaultQuoteWorkflowProps,
  reviewUnderwritingExcception,
  checkButton
} from '../../../test-utils';
import { QuoteWorkflow } from '../QuoteWorkflow';

describe('Testing Non-Page Specific Quote Workflow', () => {
  const props = {
    ...defaultQuoteWorkflowProps,
    quote: {
      ...defaultQuoteWorkflowProps.quote,
      underwritingExceptions: [reviewUnderwritingExcception]
    }
  };

  it('POS:Error Popup on Share Page', () => {
    const newProps = {
      ...props,
      location: { pathname: '/quote/12-345-67/share' }
    };
    const { getByText, getByTestId } = renderWithReduxAndRouter(
      <QuoteWorkflow {...newProps} />
    );

    expect(
      getByText('Underwriting Error(s) - Please contact us').querySelector('i')
        .className
    ).toEqual('fa fa-exclamation-triangle');
    expect(
      getByText(
        'The following underwriting error(s) have occurred with this quote:'
      )
    );
    expect(
      getByText(
        'This quote sucks. Due to previous claims history, underwriting review is required prior to binding.'
      )
    );
    expect(getByText('Quote Number'));
    expect(getByText('12-345-67'));
    expect(getByText('Property Address'));
    expect(getByText('4131 TEST ADDRESS'));
    expect(getByText('TEST SECOND ADDRESS'));
    expect(getByText('SARASOTA, FL 00001'));
    expect(
      getByText(
        'Contact a TypTap customer service representative so we may further assist you in obtaining a quote.'
      )
    );
    expect(getByText('(844) 289-7968').querySelector('i').className).toEqual(
      'fa fa-phone'
    );
    expect(getByText('(844) 289-7968')).toHaveAttribute(
      'href',
      'tel:8442897968'
    );
    expect(getByText('email us').querySelector('i').className).toEqual(
      'fa fa-envelope'
    );
    expect(getByText('email us')).toHaveAttribute(
      'href',
      'mailto:customerservice@typtap.com'
    );
    expect(
      getByText(
        'A TypTap CSR may be able to correct your underwriting error(s) allowing you to refresh and continue.'
      )
    );
    expect(
      document
        .querySelector('.card-footer .btn-group [href="tel:8442897968"]')
        .querySelector('i').className
    ).toEqual('fa fa-phone');
    checkButton(getByTestId, { dataTest: 'modal-refresh', text: 'Refresh' });
    checkButton(getByTestId, {
      dataTest: 'modal-new-quote',
      text: 'New Quote'
    });
  });

  it('NEG:No Error Popup On Customize Page', () => {
    const newProps = {
      ...props,
      location: { pathname: '/quote/12-345-67/customize' }
    };
    const { queryByText } = renderWithReduxAndRouter(
      <QuoteWorkflow {...newProps} />
    );

    expect(queryByText('Underwriting Error(s) - Please contact us')).toBeNull();
  });
});
