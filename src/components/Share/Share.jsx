import React from 'react';
import { Redirect } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Form } from 'redux-form';
import Footer from '../Common/Footer';
import * as appStateActions from '../../actions/appStateActions';
import EmailPopup from '../Common/EmailPopup';
import ErrorPopup from '../Common/ErrorPopup';
import Loader from '../Common/Loader';
import { updateQuote } from '../../actions/quoteState.actions';

export const noShareSubmit = async (data, dispatch, props) => {
  const submitData = { shouldSendEmail: 'No' };

  props.actions.appStateActions.setAppState(props.appState.modelName, '', { ...props.appState.data, submitting: true });
  await props.updateQuote({ data: submitData, quoteNumber: props.quote.quoteNumber });
  props.actions.appStateActions.setAppState(props.appState.modelName, '', { ...props.appState.data, submitting: false });

  props.history.push('assumptions');
};

export const shareQuoteSubmit = async (data, dispatch, props) => {
  const submitData = { shouldSendEmail: 'Yes', ...data };

  props.actions.appStateActions.setAppState(props.appState.modelName, '', { ...props.appState.data, submitting: true });
  await props.updateQuote({ data: submitData, quoteNumber: props.quote.quoteNumber});
  props.actions.appStateActions.setAppState(props.appState.modelName, '', { ...props.appState.data, submitting: false, showEmailPopup: false });
};

export const shareQuote = (props) => {
  props.actions.appStateActions.setAppState(props.appState.modelName, props.appState.instanceId, { submitting: true });
  props.actions.appStateActions.setAppState(props.appState.modelName, props.appState.instanceId, { showEmailPopup: true });
};

export const closeShareSubmit = (props) => {
  props.actions.appStateActions.setAppState(props.appState.modelName, props.appState.instanceId, { showEmailPopup: false });
};

export const refereshUWReviewError = async (props) => {
  const data = { refresh: 'Yes' };

  props.actions.appStateActions.setAppState(props.appState.modelName, props.appState.instanceId, { submitting: true });
  await props.updateQuote({ data, quoteNumber: props.quote.quoteNumber});
  props.actions.appStateActions.setAppState(props.appState.modelName, props.appState.instanceId, { submitting: false });

  props.history.push('customerInfo');
};

const redirectToNewQuote = (props) => {
  props.actions.appStateActions.setAppState(props.appState.modelName, props.appState.instanceId, { submitting: true });
  props.history.push('/');
};

export const Share = props => (
  <div className="route-content">
    {props.isHardStop &&
      <Redirect to="error" />
    }
    {props.appState.data.submitting &&
      <Loader />
    }
    <Form className={`${'styleName' || ''}`} id="SharePage" onSubmit={props.handleSubmit(noShareSubmit)} noValidate>
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
          <button className="btn btn-secondary" type="button" onClick={() => shareQuote(props)}>share</button>
          <button className="btn btn-primary" type="submit" disabled={props.appState.data.submitting}>next</button>
        </div>
        <Footer />
      </div>
    </Form>
    {props.appState.data.showEmailPopup &&
      <EmailPopup
        primaryButtonHandler={shareQuoteSubmit}
        secondaryButtonHandler={() => closeShareSubmit(props)}
      />}
    {(!props.appState.data.submitting && props.underwritingExceptions.length) &&
      <ErrorPopup
        quote={props.quote}
        underwritingExceptions={props.underwritingExceptions}
        refereshUWReviewError={() => refereshUWReviewError(props)}
        redirectToNewQuote={() => redirectToNewQuote(props)}
      />}
  </div>
);

const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState,
  underwritingExceptions: state.quoteState.state ? state.quoteState.state.underwritingExceptions : [],
  quote: state.quoteState.quote,
  isHardStop: state.quoteState.state ? state.quoteState.state.isHardStop : false
});

const mapDispatchToProps = dispatch => ({
  updateQuote: bindActionCreators(updateQuote, dispatch),
  actions: {
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'Share'
})(Share));
