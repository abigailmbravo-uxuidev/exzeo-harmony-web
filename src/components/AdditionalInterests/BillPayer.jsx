import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Form } from 'redux-form';
import _ from 'lodash';

import { setAppState } from '../../actions/appStateActions';
import { updateQuote } from '../../actions/quoteState.actions';
import Footer from '../Common/Footer';
import Loader from '../Common/Loader';
import SnackBar from '../Common/SnackBar';
import failedSubmission from '../Common/reduxFormFailSubmit';
import { getInitialValues } from '../Customize/customizeHelpers';
import FieldGenerator from '../Form/FieldGenerator';


export const handleFormSubmit = async (data, dispatch, props) => {
  const additionalInterests = props.quote.additionalInterests;
  const billPayer1 = _.find(additionalInterests, { order: 0, type: 'Bill Payer' }) || {};

  _.remove(additionalInterests, ai => ai.type === 'Bill Payer');

  if (data.isAdditional) {
    billPayer1.name1 = data.name1;
    billPayer1.name2 = data.name2;
    billPayer1.referenceNumber = data.referenceNumber;
    billPayer1.order = 0;
    billPayer1.active = true;
    billPayer1.type = 'Bill Payer';
    billPayer1.mailingAddress = {
      address1: data.mailingAddress1,
      address2: data.mailingAddress2,
      city: data.city,
      state: data.state,
      zip: data.zip,
      country: {
        code: 'USA',
        displayText: 'United States of America'
      }
    };

    additionalInterests.push(billPayer1);
  }

  props.setAppState({ ...props.appState.data, submitting: true });
  await props.updateQuote({ data: { additionalInterests }, quoteNumber: props.quote.quoteNumber });
  props.setAppState({ ...props.appState.data, submitting: false });

  props.history.push('additionalInterests');
};

export const closeAndSavePreviousAIs = async (props) => {
  const additionalInterests = props.quote.additionalInterests;

  props.setAppState({ ...props.appState.data, submitting: true });
  await props.updateQuote({ data: { additionalInterests }, quoteNumber: props.quote.quoteNumber });
  props.setAppState({ ...props.appState.data, submitting: false });

  props.history.push('additionalInterests');
};

const handleGetQuestions = state => (state.quoteState.state ? state.quoteState.state.uiQuestions : []);

const handleGetQuoteData = state => state.quoteState.quote || {};

export const handleInitialize = (state) => {
  const uiQuestions = handleGetQuestions(state);
  const quote = handleGetQuoteData(state);
  const values = getInitialValues(uiQuestions, { additionalInterests: _.filter(quote.additionalInterests, ai => ai.type === 'Bill Payer') });

  _.forEach(uiQuestions, (q) => {
    if (!values[q.name]) {
      values[q.name] = '';
    }
  });
  values.isAdditional = true;

  return values;
};

export const BillPayer = (props) => {
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
        show={props.appState.data.showSnackBar}
        timer={3000}
      ><p>Please correct errors.</p></SnackBar>
      { props.appState.data.submitting && <Loader /> }
      <Form id="BillPayer" onSubmit={handleSubmit(handleFormSubmit)} noValidate>
        <div className="scroll">
          <div className="form-group survey-wrapper" role="group">
            <h3 className="section-group-header"><i className="fa fa-money" /> Bill Payer</h3>
            {fieldQuestions && _.sortBy(fieldQuestions, 'sort').map((question, index) =>
              <FieldGenerator autoFocus={index === 1} tabIndex={index} data={quote} question={question} values={fieldValues} key={index} />)}
          </div>
          <div className="workflow-steps">
            <span className="button-label-wrap">
              <span className="button-info">Oops! There is no billpayer</span>
              <button className="btn btn-secondary" type="button" onClick={() => closeAndSavePreviousAIs(props)}>Go Back</button>
            </span>
            <button className="btn btn-primary" type="submit" form="BillPayer" disabled={props.appState.data.submitting}>Save</button>
          </div>
          <Footer />
        </div>
      </Form>
    </div>
  );
};

const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState,
  fieldValues: _.get(state.form, 'BillPayer.values', {}),
  initialValues: handleInitialize(state),
  fieldQuestions: handleGetQuestions(state),
  quote: handleGetQuoteData(state)
});


export default connect(mapStateToProps, { 
  updateQuote, 
  setAppState 
})(reduxForm({
  form: 'BillPayer',
  onSubmitFail: failedSubmission
})(BillPayer));
