import React, { useState } from 'react';
import { Button, ModalPortal, FormSpy } from '@exzeo/core-ui';
import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';
import { defaultMemoize } from 'reselect';

import EmailPopup from './EmailPopup';
import ErrorPopup from '../../components/Common/ErrorPopup';

import { STEP_NAMES } from './constants/workflowNavigation';
import { UNDERWRITING_ERROR_ACTIONS } from './constants/quote';

const getFilteredUnderwritingExceptions = defaultMemoize((underwritingExceptions) => {
  return underwritingExceptions.filter(exception =>
    exception.action === UNDERWRITING_ERROR_ACTIONS.UNDERWRITING_REVIEW && !exception.overridden
  );
});

const Share = ({ customHandlers, initialValues }) => {
  const [showPopup, setPopup] = useState(false);
  const filteredUnderwritingExceptions = getFilteredUnderwritingExceptions(initialValues.underwritingExceptions);

  async function noShareSubmit() {
    customHandlers.handleSubmit({ noSubmit: true })
  }

  async function shareQuote(data) {
    try {
      const config = {
        exchangeName: 'harmony',
        routingKey: 'harmony.quote.sendQuoteSummary',
        data: {
          quoteNumber: initialValues.quoteNumber,
          summaryType: 'agency',
          toName: data.toName,
          toEmail: data.toEmail,
        }
      };

      await serviceRunner.callService(config, 'sendQuoteSummary');
    } catch (error) {
      console.error('Error sending quote summary!')
    }
    setPopup(false);
  }

  async function refreshUWReviewError() {
    await customHandlers.getQuote(initialValues.quoteNumber, initialValues._id);
    customHandlers.goToStep(STEP_NAMES.askAdditionalCustomerData);
  }

  function redirectToNewQuote() {
    customHandlers.history.replace('/');
  }

  return (
    <React.Fragment>
      <section className="section-instructions" data-test="section-1">
        <div className="title" data-test="Share"><i className="fa fa-share-alt"/> Share</div>
        <p>To SHARE this quote as a PDF via email, click the <strong>SHARE</strong> button</p>
      </section>
      <section className="section-instructions" data-test="section-2">
        <div className="title" data-test="Continue"><i className="fa fa-arrow-circle-right"/> Continue</div>
        <p>To CONTINUE the quote process, you will need the following</p>
        <ul>
          <li>Mortgage information</li>
          <li>Name and email address of additional owners</li>
          <li>Name and address of any other additional insured to add to this policy</li>
        </ul>
        <p>When you are prepared to move forward, click the <strong>NEXT</strong> button</p>
      </section>
      <section className="section-instructions" data-test="section-3">
        <div className="title" data-test="NewQuote"><i className="fa fa-quote-left"/> New Quote</div>
        <p>Your current quote is saved and can be retrieved at any time. To begin a NEW QUOTE, click the <i
          className="fa fa-dashboard"/> <strong>DASHBOARD</strong> tab</p>
      </section>
      <FormSpy subscription={{ submitting: true }}>
        {({ submitting }) =>
          <React.Fragment>
            <div className="btn-group">
              <Button
                className={Button.constants.classNames.secondary}
                onClick={() => setPopup(true)}
                disabled={submitting}
                data-test="share"
              >share</Button>
              <Button
                className={Button.constants.classNames.primary}
                onClick={noShareSubmit}
                disabled={submitting}
                data-test="submit"
              >next</Button>
            </div>

            {(!submitting && filteredUnderwritingExceptions.length > 0) &&
            <ErrorPopup
              quote={initialValues}
              underwritingExceptions={filteredUnderwritingExceptions}
              refereshUWReviewError={() => refreshUWReviewError()}
              redirectToNewQuote={() => redirectToNewQuote()}
            />
            }
          </React.Fragment>
        }
      </FormSpy>

      {showPopup &&
      <ModalPortal>
        <EmailPopup
          onSubmit={shareQuote}
          handleCancel={() => setPopup(false)}
        />
      </ModalPortal>
      }
    </React.Fragment>
  );
};

Share.defaultProps = {
  isLoading: false,
  quote: {},
  customHandlers: {}
};

export default Share;
