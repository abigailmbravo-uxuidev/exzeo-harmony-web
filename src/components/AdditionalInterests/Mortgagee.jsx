import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { batchActions } from 'redux-batched-actions';
import { reduxForm, Form, change } from 'redux-form';
import _ from 'lodash';

import { setAppState } from '../../actions/appStateActions';
import { updateQuote } from '../../actions/quoteState.actions';
import Footer from '../Common/Footer';
import Loader from '../Common/Loader';
import SnackBar from '../Common/SnackBar';
import failedSubmission from '../Common/reduxFormFailSubmit';
import { getInitialValues } from '../Customize/customizeHelpers';
import FieldGenerator from '../Form/FieldGenerator';
import ReactSelectField from '../Form/inputs/ReactSelectField';


export const handleFormSubmit = async (data, dispatch, props) => {
  const additionalInterests = props.quote.additionalInterests;

  const mortgagee1 = _.find(additionalInterests, { order: 0, type: 'Mortgagee' }) || {};
  const mortgagee2 = _.find(additionalInterests, { order: 1, type: 'Mortgagee' }) || {};
  const mortgagee3 = _.find(additionalInterests, { order: 2, type: 'Mortgagee' }) || {};

  _.remove(additionalInterests, ai => ai.type === 'Mortgagee');

  if (data.isAdditional) {
    mortgagee1.name1 = data.m1Name1;
    mortgagee1.name2 = data.m1Name2;
    mortgagee1.referenceNumber = data.m1ReferenceNumber;
    mortgagee1.order = 0;
    mortgagee1.active = true;
    mortgagee1.type = 'Mortgagee';
    mortgagee1.mailingAddress = {
      address1: data.m1MailingAddress1,
      address2: data.m1MailingAddress2,
      city: data.m1City,
      state: data.m1State,
      zip: data.m1Zip,
      country: {
        code: 'USA',
        displayText: 'United States of America'
      }
    };

    additionalInterests.push(mortgagee1);
  }
  if (data.isAdditional && data.isAdditional2) {
    mortgagee2.name1 = data.m2Name1;
    mortgagee2.name2 = data.m2Name2;
    mortgagee2.referenceNumber = data.m2ReferenceNumber;
    mortgagee2.order = 1;
    mortgagee2.active = true;
    mortgagee2.type = 'Mortgagee';
    mortgagee2.mailingAddress = {
      address1: data.m2MailingAddress1,
      address2: data.m2MailingAddress2,
      city: data.m2City,
      state: data.m2State,
      zip: data.m2Zip,
      country: {
        code: 'USA',
        displayText: 'United States of America'
      }
    };

    additionalInterests.push(mortgagee2);
  }

  if (data.isAdditional && data.isAdditional2 && data.isAdditional3) {
    mortgagee3.name1 = data.m3Name1;
    mortgagee3.name2 = data.m3Name2;
    mortgagee3.referenceNumber = data.m3ReferenceNumber;
    mortgagee3.order = 2;
    mortgagee3.active = true;
    mortgagee3.type = 'Mortgagee';
    mortgagee3.mailingAddress = {
      address1: data.m3MailingAddress1,
      address2: data.m3MailingAddress2,
      city: data.m3City,
      state: data.m3State,
      zip: data.m3Zip,
      country: {
        code: 'USA',
        displayText: 'United States of America'
      }
    };

    additionalInterests.push(mortgagee3);
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

export const handleInitialize = (state) => {
  const quote = handleGetQuoteData(state);
  const questions = handleGetQuestions(state);
  const values = getInitialValues(questions, {
    additionalInterests: _.filter(
      quote.additionalInterests,
      ai => ai.type === 'Mortgagee'
    )
  });

  _.forEach(questions, (q) => {
    if (!values[q.name]) {
      values[q.name] = '';
    }
  });

  if (_.trim(values.m2Name1)) { values.isAdditional2 = true; }
  if (_.trim(values.m3Name1)) { values.isAdditional3 = true; }
  values.isAdditional = true;

  return values;
};

export const handleGetQuestions = (state) => {
  const questions = state.quoteState.state ? state.quoteState.state.uiQuestions : [];

  questions.filter(question => question.name === 'mortgagee')
  .forEach((q) => {
    if (q && Array.isArray(q.answers)) {
      q.answers.forEach((answer) => {
        answer.displayText = `${answer.AIName1}, ${answer.AIAddress1}, ${answer.AICity} ${answer.AIState}, ${answer.AIZip}`;
        return answer;
      });
    }
    return q;
  });
  return questions;
};

export const handleGetQuoteData = state =>
   state.quoteState.quote || {};

const getAnswers = (name, questions) =>
  _.get(_.find(questions, { name }), 'answers') || [];

export const setMortgageeValues = (val, props) => {
  props.setAppState(
    {
      ...props.appState.data,
      selectedMortgageeOption: val
    }
  );
  const selectedMortgagee = val;

  if (selectedMortgagee) {
    props.dispatch(
      batchActions([
        change('Mortgagee', 'm1Name1', _.get(selectedMortgagee, 'AIName1')),
        change('Mortgagee', 'm1Name2', _.get(selectedMortgagee, 'AIName2')),
        change(
          'Mortgagee',
          'm1MailingAddress1',
          _.get(selectedMortgagee, 'AIAddress1')
        ),
        change('Mortgagee', 'm1City', _.get(selectedMortgagee, 'AICity')),
        change('Mortgagee', 'm1State', _.get(selectedMortgagee, 'AIState')),
        change('Mortgagee', 'm1Zip', String(_.get(selectedMortgagee, 'AIZip')))
      ])
    );
  } else {
    props.dispatch(
      batchActions([
        change('Mortgagee', 'm1Name1', ''),
        change('Mortgagee', 'm1Name2', ''),
        change('Mortgagee', 'm1MailingAddress1', ''),
        change('Mortgagee', 'm1City', ''),
        change('Mortgagee', 'm1State', ''),
        change('Mortgagee', 'm1Zip', '')
      ])
    );
  }
};

export const setMortgagee2Values = (val, props) => {
  props.setAppState(
    {
      ...props.appState.data,
      selectedMortgageeOption: val
    }
  );
  const selectedMortgagee = val;

  if (selectedMortgagee) {
    props.dispatch(
      batchActions([
        change('Mortgagee', 'm2Name1', _.get(selectedMortgagee, 'AIName1')),
        change('Mortgagee', 'm2Name2', _.get(selectedMortgagee, 'AIName2')),
        change(
          'Mortgagee',
          'm2MailingAddress1',
          _.get(selectedMortgagee, 'AIAddress1')
        ),
        change('Mortgagee', 'm2City', _.get(selectedMortgagee, 'AICity')),
        change('Mortgagee', 'm2State', _.get(selectedMortgagee, 'AIState')),
        change('Mortgagee', 'm2Zip', String(_.get(selectedMortgagee, 'AIZip')))
      ])
    );
  } else {
    props.dispatch(
      batchActions([
        change('Mortgagee', 'm2Name1', ''),
        change('Mortgagee', 'm2Name2', ''),
        change('Mortgagee', 'm2MailingAddress1', ''),
        change('Mortgagee', 'm2City', ''),
        change('Mortgagee', 'm2State', ''),
        change('Mortgagee', 'm2Zip', '')
      ])
    );
  }
};

export const setMortgagee3Values = (val, props) => {
  props.setAppState(
    {
      ...props.appState.data,
      selectedMortgageeOption: val
    }
  );
  const selectedMortgagee = val;

  if (selectedMortgagee) {
    props.dispatch(
      batchActions([
        change('Mortgagee', 'm3Name1', _.get(selectedMortgagee, 'AIName1')),
        change('Mortgagee', 'm3Name2', _.get(selectedMortgagee, 'AIName2')),
        change(
          'Mortgagee',
          'm3MailingAddress1',
          _.get(selectedMortgagee, 'AIAddress1')
        ),
        change('Mortgagee', 'm3City', _.get(selectedMortgagee, 'AICity')),
        change('Mortgagee', 'm3State', _.get(selectedMortgagee, 'AIState')),
        change('Mortgagee', 'm3Zip', String(_.get(selectedMortgagee, 'AIZip')))
      ])
    );
  } else {
    props.dispatch(
      batchActions([
        change('Mortgagee', 'm3Name1', ''),
        change('Mortgagee', 'm3Name2', ''),
        change('Mortgagee', 'm3MailingAddress1', ''),
        change('Mortgagee', 'm3City', ''),
        change('Mortgagee', 'm3State', ''),
        change('Mortgagee', 'm3Zip', '')
      ])
    );
  }
};

export const Mortgagee = (props) => {
  const { fieldQuestions, quote, handleSubmit, fieldValues } = props;

  return (
    <div className="route-content">
      <SnackBar {...props} show={props.appState.data.showSnackBar} timer={3000}>
        <p>Please correct errors.</p>
      </SnackBar>
      {props.appState.data.submitting && <Loader />}
      <Form id="Mortgagee" onSubmit={handleSubmit(handleFormSubmit)} noValidate>
        <div className="scroll">
          <div className="form-group survey-wrapper" role="group">
            <h3 className="section-group-header">
              <i className="fa fa-bank" /> Mortgagee
            </h3>
            {fieldValues.isAdditional && (
              <ReactSelectField
                label="Top Mortgagees (Mortgagee 1)"
                name="mortgage"
                searchable
                labelKey="displayText"
                autoFocus
                value={props.appState.data.selectedMortgageeOption}
                answers={getAnswers('mortgagee', fieldQuestions)}
                onChange={val => setMortgageeValues(val, props)}
              />
            )}
            {fieldValues.isAdditional2 &&
              fieldValues.isAdditional && (
                <ReactSelectField
                  label="Top Mortgagees (Mortgagee 2)"
                  name="mortgage2"
                  searchable
                  labelKey="displayText"
                  autoFocus
                  value={props.appState.data.selectedMortgageeOption}
                  answers={getAnswers('mortgagee', fieldQuestions)}
                  onChange={val => setMortgagee2Values(val, props)}
                />
              )}
            {fieldValues.isAdditional3 && fieldValues.isAdditional2 &&
                fieldValues.isAdditional && (
                  <ReactSelectField
                    label="Top Mortgagees (Mortgagee 3)"
                    name="mortgage3"
                    searchable
                    labelKey="displayText"
                    autoFocus
                    value={props.appState.data.selectedMortgageeOption}
                    answers={getAnswers('mortgagee', fieldQuestions)}
                    onChange={val => setMortgagee3Values(val, props)}
                  />
                )}
            {fieldQuestions &&
              _.sortBy(
                _.filter(fieldQuestions, q => q.name !== 'mortgagee'),
                'sort'
              ).map((question, index) => (
                <FieldGenerator
                  autoFocus={index === 1}
                  data={quote}
                  question={question}
                  values={fieldValues}
                  key={index}
                />
              ))}
          </div>
          <div className="workflow-steps">
            <span className="button-label-wrap">
              <span className="button-info">Oops! There is no mortgagee</span>
              <button
                id="goBack"
                className="btn btn-secondary"
                type="button"
                onClick={() => closeAndSavePreviousAIs(props)}
              >
                Go Back
              </button>
            </span>
            <button
              className="btn btn-primary"
              type="submit"
              form="Mortgagee"
              disabled={props.appState.data.submitting}
            >
              Save
            </button>
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
  fieldValues: _.get(state.form, 'Mortgagee.values', {}),
  initialValues: handleInitialize(state),
  fieldQuestions: handleGetQuestions(state),
  quote: handleGetQuoteData(state)
});

export default connect(mapStateToProps, {
  updateQuote,
  setAppState
})(reduxForm({
  form: 'Mortgagee',
  enableReinitialize: true,
  onSubmitFail: failedSubmission
})(Mortgagee));
