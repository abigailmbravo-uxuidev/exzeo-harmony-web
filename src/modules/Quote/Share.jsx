import React from 'react';
import { connect } from 'react-redux';
import { Button } from '@exzeo/core-ui';

import EmailPopup from './EmailPopup';
import ErrorPopup from '../../components/Common/ErrorPopup';

import { updateQuote } from '../../actions/quoteState.actions';

export class Share extends React.Component {
  noShareSubmit = async () => {
    const { customHandlers } = this.props;
    customHandlers.handleSubmit({ shouldSendEmail: 'No' });
  };

  shareQuoteSubmit = async (data) => {
    const { customHandlers } = this.props;
    customHandlers.handleSubmit({ shouldNav: 'false', shouldSendEmail: 'Yes', ...data });
    customHandlers.setEmailPopup(false);
  };

  refreshUWReviewError = async () => {
    const { customHandlers } = this.props;
    const data = { refresh: 'Yes' };
    await customHandlers.updateQuote({ data, quoteNumber: this.props.quote.quoteNumber });

    customHandlers.history.replace('customerInfo');
  };

  redirectToNewQuote = () => {
    this.props.customHandlers.history.replace('/');
  };

  render() {
    const {
      underwritingExceptions,
      isLoading,
      quote,
      customHandlers: {
        setEmailPopup,
        getState,
      },
    } = this.props;

    const { showEmailPopup } = getState();
    return (
      <React.Fragment>
        <section className="section-instructions">
          <div className="title" data-test="Share"><i className="fa fa-share-alt" /> Share</div>
          <p>To SHARE this quote as a PDF via email, click the <strong>SHARE</strong> button</p>
        </section>
        <section className="section-instructions" data-test="section-1">
          <div className="title" data-test="Continue"><i className="fa fa-arrow-circle-right" /> Continue</div>
          <p>To CONTINUE the quote process, you will need the following</p>
          <ul>
            <li>Mortgage information</li>
            <li>Name and email address of additional owners</li>
            <li>Name and address of any other additional insured to add to this policy</li>
          </ul>
          <p>When you are prepared to move forward, click the <strong>NEXT</strong> button</p>
        </section>
        <section className="section-instructions" data-test="section-2">
          <div className="title"><i className="fa fa-quote-left" /> New Quote</div>
          <p>Your current quote is saved and can be retrieved at any time. To begin a NEW QUOTE, click the <i className="fa fa-dashboard" /> <strong>DASHBOARD</strong> tab</p>
        </section>
        <div className="btn-group">
          <Button
            className={Button.constants.classNames.secondary}
            onClick={() => setEmailPopup(true)}
            disabled={isLoading}
            data-test="share"
          >share</Button>
          <Button
            className={Button.constants.classNames.primary}
            onClick={this.noShareSubmit}
            disabled={isLoading}
            data-test="submit"
          >next</Button>
        </div>


        {showEmailPopup &&
          <EmailPopup
            onSubmit={this.shareQuoteSubmit}
            handleCancel={() => setEmailPopup(false)}
          />
        }

        {(!isLoading && underwritingExceptions.length > 0) &&
          <ErrorPopup
            quote={quote}
            underwritingExceptions={underwritingExceptions}
            refereshUWReviewError={() => this.refreshUWReviewError()}
            redirectToNewQuote={() => this.redirectToNewQuote()}
          />
        }
      </React.Fragment>
    );
  }
}

Share.defaultProps = {
  isLoading: false,
  underwritingExceptions: [],
  quote: {},
  customHandlers: {}
};

const mapStateToProps = state => ({
  isLoading: state.appState.isLoading,
  underwritingExceptions: state.quoteState.state && state.quoteState.state.underwritingExceptions ? state.quoteState.state.underwritingExceptions : [],
  quote: state.quoteState.quote,
});

export default connect(mapStateToProps, { updateQuote })(Share);
