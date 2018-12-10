import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Form, propTypes } from 'redux-form';
import Footer from '../Common/Footer';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';
import EmailPopup from '../Common/EmailPopup';
import ErrorPopup from '../Common/ErrorPopup';
import Loader from '../Common/Loader';
import { MOCK_QUOTE } from '../mockQuote';

const userTasks = {
  sendEmailOrContinue: 'sendEmailOrContinue',
  askEmail: 'askEmail',
  refreshOnUnderWritingReviewError: 'refreshOnUnderWritingReviewError'
};

const getUnderwritingExceptions = state => undefined
  // const { cg, appState } = state;
  // return ((cg[appState.modelName].data.previousTask.name === 'UnderWritingReviewError') ?
  //   cg[appState.modelName].data.previousTask.value : undefined);
;

const getQuoteData = state => MOCK_QUOTE
  // const { cg, appState } = state;
  // const quoteData = _.find(cg[appState.modelName].data.model.variables, { name: 'quote' });
  // return (quoteData ? quoteData.value.result : undefined);
;

export const noShareSubmit = (data, dispatch, props) => {
  window.location.href = '/quote/12-5151466-01/assumptions';

  // const workflowId = props.tasks[props.appState.modelName].data.modelInstanceId;
  // const taskName = userTasks.sendEmailOrContinue;
  // const taskData = { shouldSendEmail: 'No' };
  // props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, { ...props.appState.data, submitting: true });
  // props.actions.cgActions.completeTask(props.appState.modelName, workflowId, taskName, taskData);
};

export const shareQuoteSubmit = (data, dispatch, props) => {
  window.location.href = '/quote/12-5151466-01/assumptions';

  // props.actions.appStateActions.setAppState(props.appState.modelName, props.appState.instanceId, { submitting: true });
  // const workflowId = props.tasks[props.appState.modelName].data.modelInstanceId;
  // // we need to call a batch complete here
  // const steps = [{
  //   name: userTasks.sendEmailOrContinue,
  //   data: { shouldSendEmail: 'Yes' }
  // }, {
  //   name: userTasks.askEmail,
  //   data
  // }];
  // props.actions.cgActions.batchCompleteTask(props.appState.modelName, workflowId, steps).then(() => {
  //   props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, { showEmailPopup: false });
  // });
};

export const shareQuote = (props) => {
  props.actions.appStateActions.setAppState(props.appState.modelName, props.appState.instanceId, { submitting: true });
  props.actions.appStateActions.setAppState(props.appState.modelName, props.appState.instanceId, { showEmailPopup: true });
};

export const closeShareSubmit = (props) => {
  props.actions.appStateActions.setAppState(props.appState.modelName, props.appState.instanceId, { showEmailPopup: false });
};

export const refereshUWReviewError = (props) => {
  props.actions.appStateActions.setAppState(props.appState.modelName, props.appState.instanceId, { submitting: true });

  const workflowId = props.tasks[props.appState.modelName].data.modelInstanceId;
  const taskName = userTasks.refreshOnUnderWritingReviewError;
  const taskData = {
    refresh: 'Yes'
  };

  props.actions.cgActions.completeTask(props.appState.modelName, workflowId, taskName, taskData);
};

const redirectToNewQuote = (props) => {
  props.actions.appStateActions.setAppState(props.appState.modelName, props.appState.instanceId, { submitting: true });

  window.location.href = '/';
};

export const Share = props => (
  <div className="route-content">
    {props.appState.data.submitting && <Loader />}
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
    {!props.appState.data.submitting && _.filter(props.underwritingExceptions, { overridden: false }).length > 0 &&
      <ErrorPopup
        quote={props.quote}
        underwritingExceptions={_.filter(props.underwritingExceptions, { overridden: false })}
        refereshUWReviewError={() => refereshUWReviewError(props)}
        redirectToNewQuote={() => redirectToNewQuote(props)}
      />}
  </div>
);


Share.propTypes = {
  ...propTypes,
  tasks: PropTypes.shape({}),
  appState: PropTypes.shape({ modelName: PropTypes.string, data: PropTypes.object }),
  underwritingExceptions: PropTypes.arrayOf(PropTypes.shape())
};

// ------------------------------------------------
// redux mapping
// ------------------------------------------------
const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState,
  underwritingExceptions: state.quoteState.quote ? state.quoteState.quote.underwritingExceptions : [],
  quote: state.quoteState.quote
});

const mapDispatchToProps = dispatch => ({
  actions: {
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

// ------------------------------------------------
// wire up redux form with the redux connect
// ------------------------------------------------
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'Share' })(Share));
