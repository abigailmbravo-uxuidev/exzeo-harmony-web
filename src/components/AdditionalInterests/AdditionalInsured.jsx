import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Form } from 'redux-form';
import _ from 'lodash';
import { updateQuote } from '../../actions/quoteState.actions';
import Footer from '../Common/Footer';
import SnackBar from '../Common/SnackBar';
import failedSubmission from '../Common/reduxFormFailSubmit';
import { getInitialValues } from '../Customize/customizeHelpers';
import FieldGenerator from '../Form/FieldGenerator';

const handleGetQuestions = state => (state.quoteState.state && Array.isArray(state.quoteState.state.uiQuestions) ? state.quoteState.state.uiQuestions: []);

const handleGetQuoteData = state => state.quoteState.quote || {};

export const handleFormSubmit = async (data, dispatch, props) => {
  const additionalInterests = props.quote.additionalInterests;
  const additionalInsured1 = _.find(additionalInterests, { order: 0, type: 'Additional Insured' }) || {};
  const additionalInsured2 = _.find(additionalInterests, { order: 1, type: 'Additional Insured' }) || {};

  _.remove(additionalInterests, ai => ai.type === 'Additional Insured');

  if (data.isAdditional) {
    additionalInsured1.name1 = data.ains1Name1;
    additionalInsured1.name2 = data.ains1Name2;
    additionalInsured1.referenceNumber = data.ains1ReferenceNumber;
    additionalInsured1.order = 0;
    additionalInsured1.active = true;
    additionalInsured1.type = 'Additional Insured';
    additionalInsured1.mailingAddress = {
      address1: data.ains1MailingAddress1,
      address2: data.ains1MailingAddress2,
      city: data.ains1City,
      state: data.ains1State,
      zip: data.ains1Zip,
      country: {
        code: 'USA',
        displayText: 'United States of America'
      }
    };
    additionalInterests.push(additionalInsured1);
  }
  if (data.isAdditional && data.isAdditional2) {
    additionalInsured2.name1 = data.ains2Name1;
    additionalInsured2.name2 = data.ains2Name2;
    additionalInsured2.referenceNumber = data.ains2ReferenceNumber;
    additionalInsured2.order = 1;
    additionalInsured2.active = true;
    additionalInsured2.type = 'Additional Insured';
    additionalInsured2.mailingAddress = {
      address1: data.ains2MailingAddress1,
      address2: data.ains2MailingAddress2,
      city: data.ains2City,
      state: data.ains2State,
      zip: data.ains2Zip,
      country: {
        code: 'USA',
        displayText: 'United States of America'
      }
    };
    additionalInterests.push(additionalInsured2);
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
    { additionalInterests: _.filter(quote.additionalInterests, ai => ai.type === 'Additional Insured') });

  _.forEach(uiQuestions, (q) => {
    if (!values[q.name]) values[q.name] = '';
  });

  if (_.trim(values.ains2Name1)) values.isAdditional2 = true;
  values.isAdditional = true;

  return values;
};

export const AdditionalInsured = (props) => {
  const {
    fieldQuestions,
    quote,
    handleSubmit,
    fieldValues
  } = props;

  return (
    <div className="route-content">
      <SnackBar
        {...props}
        show={props.showSnackBar}
        timer={3000}
      ><p>Please correct errors.</p></SnackBar>
      <Form id="AdditionalInsured" onSubmit={handleSubmit(handleFormSubmit)} noValidate>
        <div className="scroll">
          <div className="form-group survey-wrapper" role="group">
            <h3 className="section-group-header"><i className="fa fa-user-plus" /> Additional Insured</h3>
            {fieldQuestions && _.sortBy(fieldQuestions, 'sort').map((question, index) => <FieldGenerator autoFocus={index === 1} tabIndex={index} data={quote} question={question} values={fieldValues} key={index} />)}
          </div>
          <div className="workflow-steps">
            <span className="button-label-wrap">
              <span className="button-info">Oops! There is no additional insured</span>
              <button className="btn btn-secondary" type="button" onClick={() => closeAndSavePreviousAIs(props)}>Go Back</button>
            </span>
            <button className="btn btn-primary" type="submit" form="AdditionalInsured" disabled={props.isLoading}>Save</button>
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
  appState: state.appState,
  fieldValues: _.get(state.form, 'AdditionalInsured.values', {}),
  initialValues: handleInitialize(state),
  fieldQuestions: handleGetQuestions(state),
  quote: handleGetQuoteData(state)
});


export default connect(mapStateToProps, {
  updateQuote
})(reduxForm({
  form: 'AdditionalInsured',
  onSubmitFail: failedSubmission
})(AdditionalInsured));
