import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import EmailPopup from '../Common/EmailPopup';
import ErrorPopup from '../Common/ErrorPopup';

import { updateQuote } from '../../actions/quoteState.actions';

export class Share extends React.Component {
  noShareSubmit = async () => {
    const { customHandlers, updateQuote } = this.props;
    await updateQuote({ data: { shouldSendEmail: 'No' }, quoteNumber: this.props.quote.quoteNumber });

    customHandlers.history.replace('assumptions');
  };

  shareQuoteSubmit = async (data) => {
    const { customHandlers, updateQuote } = this.props;
    const submitData = { shouldSendEmail: 'Yes', ...data };
    await updateQuote({ data: submitData, quoteNumber: this.props.quote.quoteNumber });

    customHandlers.setEmailPopup(false);
  };

  refreshUWReviewError = async () => {
    const { customHandlers, updateQuote } = this.props;
    const data = { refresh: 'Yes' };
    await this.props.updateQuote({ data, quoteNumber: this.props.quote.quoteNumber });

    customHandlers.history.replace('customerInfo');
  };

  redirectToNewQuote = () => {
    this.props.customHandlers.history.replace('/');
  };

  render() {
    const {
      isHardStop,
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
      <div className="route-content">
        {isHardStop &&
          <Redirect to="error" />
        }
        <div id="SharePage" >
          <div className="scroll">
            <div className="form-group detail-wrapper">
              <section className="section-instructions" data-test="share-section-one">
                <h3 className="section-group-header"><i className="fa fa-share-alt" /> Share</h3>
                <p>To SHARE this quote as a PDF via email, click the <strong>SHARE</strong> button</p>
              </section>
              <section className="section-instructions" data-test="share-section-two">
                <h3 className="section-group-header"><i className="fa fa-arrow-circle-right" /> Continue</h3>
                <p>To CONTINUE the quote process, you will need the following</p>
                <ul>
                  <li>Mortgage information</li>
                  <li>Name and email address of additional owners</li>
                  <li>Name and address of any other additional insured to add to this policy</li>
                </ul>
                <p>When you are prepared to move forward, click the <strong>NEXT</strong> button</p>
              </section>
              <section className="section-instructions" data-test="share-section-three">
                <h3 className="section-group-header"><i className="fa fa-quote-left" /> New Quote</h3>
                <p>Your current quote is saved and can be retrieved at any time. To begin a NEW QUOTE, click the <i className="fa fa-dashboard" /> <strong>DASHBOARD</strong> tab</p>
              </section>
            </div>
            <div className="workflow-steps">
              <button className="btn btn-secondary" type="button" data-test="share" onClick={() => setEmailPopup(true)}>share</button>
              <button className="btn btn-primary" type="button" onClick={this.noShareSubmit} data-test="submit" disabled={isLoading}>next</button>
            </div>
          </div>
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

      </div>
    );
  }
}

Share.defaultProps = {
  isLoading: false,
  underwritingExceptions: [],
  quote: {},
  isHardStop: false
};

const mapStateToProps = state => ({
  isLoading: state.appState.isLoading,
  underwritingExceptions: state.quoteState.state && state.quoteState.state.underwritingExceptions ? state.quoteState.state.underwritingExceptions : [],
  quote: state.quoteState.quote,
  isHardStop: state.quoteState.state ? state.quoteState.state.isHardStop : false
});

export default connect(mapStateToProps, { updateQuote })(Share);
