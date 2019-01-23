import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Form } from 'redux-form';
import _ from 'lodash';

import Footer from '../Common/Footer';
import SnackBar from '../Common/SnackBar';
import failedSubmission from '../Common/reduxFormFailSubmit';
import { getInitialValues } from '../Customize/customizeHelpers';
import FieldGenerator from '../Form/FieldGenerator';


export const handleFormSubmit = async (data, dispatch, props) => {
  const additionalInterests = props.quote.additionalInterests;
  const additionalInterest1 = _.find(additionalInterests, { order: 0, type: 'Additional Interest' }) || {};
  const additionalInterest2 = _.find(additionalInterests, { order: 1, type: 'Additional Interest' }) || {};

  _.remove(additionalInterests, ai => ai.type === 'Additional Interest');

  if (data.isAdditional) {
    additionalInterest1.name1 = data.ai1Name1;
    additionalInterest1.name2 = data.ai1Name2;
    additionalInterest1.referenceNumber = data.ai1ReferenceNumber;
    additionalInterest1.order = 0;
    additionalInterest1.active = true;
    additionalInterest1.type = 'Additional Interest';
    additionalInterest1.mailingAddress = {
      address1: data.ai1MailingAddress1,
      address2: data.ai1MailingAddress2,
      city: data.ai1City,
      state: data.ai1State,
      zip: data.ai1Zip,
      country: {
        code: 'USA',
        displayText: 'United States of America'
      }
    };

    additionalInterests.push(additionalInterest1);
  }
  if (data.isAdditional && data.isAdditional2) {
    additionalInterest2.name1 = data.ai2Name1;
    additionalInterest2.name2 = data.ai2Name2;
    additionalInterest2.referenceNumber = data.ai2ReferenceNumber;
    additionalInterest2.order = 1;
    additionalInterest2.active = true;
    additionalInterest2.type = 'Additional Interest';
    additionalInterest2.mailingAddress = {
      address1: data.ai2MailingAddress1,
      address2: data.ai2MailingAddress2,
      city: data.ai2City,
      state: data.ai2State,
      zip: data.ai2Zip,
      country: {
        code: 'USA',
        displayText: 'United States of America'
      }
    };

    additionalInterests.push(additionalInterest2);
  }

  await props.updateQuote({ data: { additionalInterests }, quoteNumber: props.quote.quoteNumber });
  props.history.replace('additionalInterests');
};

export const closeAndSavePreviousAIs = async (props) => {
  const additionalInterests = props.quote.additionalInterests;

  await props.updateQuote({ data: { additionalInterests }, quoteNumber: props.quote.quoteNumber });
  props.history.replace('additionalInterests');
};

export const handleInitialize = (state) => {
  const uiQuestions = handleGetQuestions(state);
  const quote = handleGetQuoteData(state);

  const values = getInitialValues(uiQuestions,
    { additionalInterests: _.filter(quote.additionalInterests, ai => ai.type === 'Additional Interest') });

  _.forEach(uiQuestions, (q) => {
    if (!values[q.name]) {
      values[q.name] = '';
    }
  });

  if (_.trim(values.ai2Name1)) {
    values.isAdditional2 = true;
  }

  values.isAdditional = true;
  return values;
};

const handleGetQuestions = state => (state.quoteState.state && Array.isArray(state.quoteState.state.uiQuestions) ? state.quoteState.state.uiQuestions: []);

const handleGetQuoteData = state => state.quoteState.quote || {};

export const AdditionalInterest = (props) => {
  const {
    fieldQuestions,
    quote,
    handleSubmit,
    fieldValues
  } = props;

  return (
    <div className="route-content">
      <SnackBar show={props.showSnackBar} timer={3000}>
        <p>Please correct errors.</p>
      </SnackBar>
      <Form id="AdditionalInterest" onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="scroll">
          <div className="form-group survey-wrapper" role="group">
            <h3 className="section-group-header"><i className="fa fa-handshake-o" /> Additional Interest</h3>
            {_.sortBy(fieldQuestions, 'sort').map((question, index) => (
              <FieldGenerator
                key={index}
                autoFocus={index === 1}
                tabIndex={index}
                data={quote}
                question={question}
                values={fieldValues}
              />
            ))}
          </div>
          <div className="workflow-steps">
            <span className="button-label-wrap">
              <span className="button-info">Oops! There is no additional interest</span>
              <button className="btn btn-secondary" type="button" onClick={() => closeAndSavePreviousAIs(props)}>Go Back</button>
            </span>
            <button className="btn btn-primary" type="submit" form="AdditionalInterest" disabled={props.isLoading}>Save</button>
          </div>
          <Footer />
        </div>
      </Form>
    </div>
  );
};

const mapStateToProps = state => ({
  isLoading: state.appState.isLoading,
  showSnackBar: state.appState.showSnackBar,
  fieldValues: _.get(state.form, 'AdditionalInterest.values', {}),
  initialValues: handleInitialize(state),
  fieldQuestions: handleGetQuestions(state),
  quote: handleGetQuoteData(state)
});

export default connect(mapStateToProps)(reduxForm({
  form: 'AdditionalInterest',
  onSubmitFail: failedSubmission
})(AdditionalInterest));
