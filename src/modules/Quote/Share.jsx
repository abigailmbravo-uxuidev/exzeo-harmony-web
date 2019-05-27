import React from 'react';
import { Button, ModalPortal, FormSpy } from '@exzeo/core-ui';

import EmailPopup from './EmailPopup';
import ErrorPopup from '../../components/Common/ErrorPopup';

import { STEP_NAMES } from './constants/workflowNavigation';
import { UNDERWRITING_ERROR_ACTIONS } from './constants/quote';

export class Share extends React.Component {
  noShareSubmit = async () => {
    const { customHandlers } = this.props;
    customHandlers.handleSubmit({ noSubmit: true });
  };

  shareQuoteSubmit = async (data) => {
    const { customHandlers } = this.props;
    customHandlers.handleSubmit({ remainOnStep: true, shouldSendEmail: true, ...data });
    customHandlers.setEmailPopup(false);
  };

  refreshUWReviewError = async () => {
    const { customHandlers, initialValues } = this.props;
    await customHandlers.getQuote(initialValues.quoteNumber, initialValues._id);
    customHandlers.goToStep(STEP_NAMES.askAdditionalCustomerData);

  };

  redirectToNewQuote = () => {
    this.props.customHandlers.history.replace('/');
  };

  render() {
    const {
      initialValues,
      customHandlers: {
        setEmailPopup,
        getState,
      },
    } = this.props;

    const { showEmailPopup } = getState();
    const { underwritingExceptions } = initialValues;
    const filteredUnderwritingExceptions = underwritingExceptions.filter(exception => exception.action === UNDERWRITING_ERROR_ACTIONS.UNDERWRITING_REVIEW && !exception.overridden);

    return (
      <React.Fragment>
        <section className="section-instructions" data-test="section-1">
          <div className="title" data-test="Share"><i className="fa fa-share-alt" /> Share</div>
          <p>To SHARE this quote as a PDF via email, click the <strong>SHARE</strong> button</p>
        </section>
        <section className="section-instructions" data-test="section-2">
          <div className="title" data-test="Continue"><i className="fa fa-arrow-circle-right" /> Continue</div>
          <p>To CONTINUE the quote process, you will need the following</p>
          <ul>
            <li>Mortgage information</li>
            <li>Name and email address of additional owners</li>
            <li>Name and address of any other additional insured to add to this policy</li>
          </ul>
          <p>When you are prepared to move forward, click the <strong>NEXT</strong> button</p>
        </section>
        <section className="section-instructions" data-test="section-3">
          <div className="title" data-test="NewQuote"><i className="fa fa-quote-left" /> New Quote</div>
          <p>Your current quote is saved and can be retrieved at any time. To begin a NEW QUOTE, click the <i className="fa fa-dashboard" /> <strong>DASHBOARD</strong> tab</p>
        </section>
        <FormSpy subscription={{ submitting: true }}>
        {({ submitting}) =>
          <React.Fragment>
          <div className="btn-group">
            <Button
              className={Button.constants.classNames.secondary}
              onClick={() => setEmailPopup(true)}
              disabled={submitting}
              data-test="share"
            >share</Button>
            <Button
              className={Button.constants.classNames.primary}
              onClick={this.noShareSubmit}
              disabled={submitting}
              data-test="submit"
            >next</Button>
          </div>

          {(!submitting && filteredUnderwritingExceptions.length > 0) &&
            <ErrorPopup
            quote={initialValues}
            underwritingExceptions={filteredUnderwritingExceptions}
            refereshUWReviewError={() => this.refreshUWReviewError()}
            redirectToNewQuote={() => this.redirectToNewQuote()}
            />
          }
          </React.Fragment>
        }
        </FormSpy>

        {showEmailPopup &&
          <ModalPortal>
            <EmailPopup
              onSubmit={this.shareQuoteSubmit}
              handleCancel={() => setEmailPopup(false)}
            />
          </ModalPortal>
        }
      </React.Fragment>
    );
  }
}

Share.defaultProps = {
  isLoading: false,
  quote: {},
  customHandlers: {}
};

export default Share;
