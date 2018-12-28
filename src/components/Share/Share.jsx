import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { reduxForm, Form } from 'redux-form';
import Footer from '../Common/Footer';
import EmailPopup from '../Common/EmailPopup';
import ErrorPopup from '../Common/ErrorPopup';
import { updateQuote } from '../../actions/quoteState.actions';

export class Share extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showEmailPopup: false
    };
  }

noShareSubmit = async () => {
  const submitData = { shouldSendEmail: 'No' };
  await this.props.updateQuote({ data: submitData, quoteNumber: this.props.quote.quoteNumber });
  this.props.history.push('assumptions');
};

shareQuoteSubmit = async (data) => {
  const submitData = { shouldSendEmail: 'Yes', ...data };

  await this.props.updateQuote({ data: submitData, quoteNumber: this.props.quote.quoteNumber });
  this.setState({ showEmailPopup: false });
};

shareQuote() {
  this.setState({ showEmailPopup: true });
}

closeShareSubmit() {
  this.setState({ showEmailPopup: false });
}

refereshUWReviewError = async () => {
  const data = { refresh: 'Yes' };
  await this.props.updateQuote({ data, quoteNumber: this.props.quote.quoteNumber });
  this.props.history.push('customerInfo');
};

redirectToNewQuote() {
  this.props.history.push('/');
}


render() {
  return (<div className="route-content">
    {this.props.isHardStop &&
      <Redirect to="error" />
    }
    <Form className={`${'styleName' || ''}`} id="SharePage" onSubmit={this.props.handleSubmit(this.noShareSubmit)} noValidate>
      <div className="scroll">
        <div className="form-group detail-wrapper">
          <section className="section-instructions">
            <h3 className="section-group-header"><i className="fa fa-share-alt" /> Share</h3>
            <p>To SHARE this quote as a PDF via email, click the SHARE button</p>
          </section>
          <section className="section-instructions">
            <h3 className="section-group-header"><i className="fa fa-arrow-circle-right" /> Continue</h3>
            <p>To CONTINUE the quote process, you will need the following</p>
            <ul>
              <li>Mortgage information</li>
              <li>Name and email address of additional owners</li>
              <li>Name and address of any other additional insured to add to this policy</li>
            </ul>
            <p>When you are prepared to move forward, click the NEXT button</p>
          </section>
          <section className="section-instructions">
            <h3 className="section-group-header"><i className="fa fa-quote-left" /> New Quote</h3>
            <p>Your current quote is saved and can be retrieved at any time. To begin a NEW QUOTE, click the <i className="fa fa-th-large" /> DASHBOARD tab</p>
          </section>
        </div>
        <div className="workflow-steps">
          <button className="btn btn-secondary" type="button" onClick={() => this.shareQuote()}>share</button>
          <button className="btn btn-primary" type="submit" disabled={this.props.isLoading}>next</button>
        </div>
        <Footer />
      </div>
    </Form>
    {this.state.showEmailPopup &&
      <EmailPopup
        primaryButtonHandler={() => this.shareQuoteSubmit()}
        secondaryButtonHandler={() => this.closeShareSubmit()}
      />}
    {(!this.props.isLoading && this.props.underwritingExceptions.length) &&
      <ErrorPopup
        quote={this.props.quote}
        underwritingExceptions={this.props.underwritingExceptions}
        refereshUWReviewError={() => this.refereshUWReviewError()}
        redirectToNewQuote={() => this.redirectToNewQuote()}
      />}
  </div>
  );
}
}

const mapStateToProps = state => ({
  isLoading: state.appState.isLoading,
  appState: state.appState,
  underwritingExceptions: state.quoteState.state ? state.quoteState.state.underwritingReviewErrors : [],
  quote: state.quoteState.quote,
  isHardStop: state.quoteState.state ? state.quoteState.state.isHardStop : false
});

export default connect(mapStateToProps, { updateQuote })(reduxForm({
  form: 'Share'
})(Share));
