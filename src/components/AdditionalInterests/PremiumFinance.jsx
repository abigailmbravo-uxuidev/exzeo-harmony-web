import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { batchActions } from 'redux-batched-actions';
import { reduxForm, Form, change } from 'redux-form';
import _ from 'lodash';

import * as appStateActions from '../../actions/appStateActions';
import { updateQuote } from '../../actions/quoteState.actions';
import Footer from '../Common/Footer';
import Loader from '../Common/Loader';
import SnackBar from '../Common/SnackBar';
import failedSubmission from '../Common/reduxFormFailSubmit';
import { getInitialValues } from '../Customize/customizeHelpers';
import FieldGenerator from '../Form/FieldGenerator';
import ReactSelectField from '../Form/inputs/ReactSelectField';

export const handleFormSubmit = async (data, dispatch, props) => {
  const additionalInterests = props.quoteData.additionalInterests;
  const premiumFinance1 = _.find(additionalInterests, { order: 0, type: 'Premium Finance' }) || {};
  _.remove(additionalInterests, ai => ai.type === 'Premium Finance');

  if (data.isAdditional) {
    premiumFinance1.name1 = data.name1;
    premiumFinance1.name2 = data.name2;
    premiumFinance1.referenceNumber = data.referenceNumber;
    premiumFinance1.order = 0;
    premiumFinance1.active = true;
    premiumFinance1.type = 'Premium Finance';
    premiumFinance1.mailingAddress = {
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

    additionalInterests.push(premiumFinance1);
  }

  props.actions.appStateActions.setAppState(props.appState.modelName, '', { ...props.appState.data, submitting: true });
  await props.updateQuote({ data: { additionalInterests }, quoteNumber: props.quoteData.quoteNumber });
  props.actions.appStateActions.setAppState(props.appState.modelName, '', { ...props.appState.data, submitting: false });

  props.history.push('additionalInterests');
};

export const closeAndSavePreviousAIs = async (props) => {
  const additionalInterests = props.quoteData.additionalInterests;

  props.actions.appStateActions.setAppState(props.appState.modelName, '', { ...props.appState.data, submitting: true });
  await props.updateQuote({ data: { additionalInterests }, quoteNumber: props.quoteData.quoteNumber });
  props.actions.appStateActions.setAppState(props.appState.modelName, '', { ...props.appState.data, submitting: false });

  props.history.push('additionalInterests');
};

export const handleGetQuestions = (state) => {
  const questions = state.quoteState.state ? state.quoteState.state.uiQuestions : [];

  questions.filter(question => question.name === 'premiumFinance')
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

const handleGetQuoteData = state => state.quoteState.quote || {};

export const handleInitialize = (state) => {
  const uiQuestions = handleGetQuestions(state);
  const quoteData = handleGetQuoteData(state);
  const values = getInitialValues(uiQuestions, { additionalInterests: _.filter(quoteData.additionalInterests, ai => ai.type === 'Premium Finance') });
  _.forEach(uiQuestions, (q) => {
    if (!values[q.name]) {
      values[q.name] = '';
    }
  });
  values.isAdditional = true;

  return values;
};

const getAnswers = (name, questions) => _.get(_.find(questions, { name }), 'answers') || [];

export const setPremiumFinanceValues = (val, props) => {
  props.actions.appStateActions.setAppState(
    props.appState.modelName,
    props.appState.instanceId,
    {
      ...props.appState.data,
      selectedPremiumFinanceOption: val
    }
  );
  const selectedPremiumFinance = val;

  if (selectedPremiumFinance) {
    props.dispatch(
      batchActions([
        change('PremiumFinance', 'name1', _.get(selectedPremiumFinance, 'AIName1')),
        change('PremiumFinance', 'name2', _.get(selectedPremiumFinance, 'AIName2')),
        change(
          'PremiumFinance',
          'mailingAddress1',
          _.get(selectedPremiumFinance, 'AIAddress1')
        ),
        change('PremiumFinance', 'city', _.get(selectedPremiumFinance, 'AICity')),
        change('PremiumFinance', 'state', _.get(selectedPremiumFinance, 'AIState')),
        change('PremiumFinance', 'zip', String(_.get(selectedPremiumFinance, 'AIZip')))
      ])
    );
  } else {
    props.dispatch(
      batchActions([
        change('PremiumFinance', 'name1', ''),
        change('PremiumFinance', 'name2', ''),
        change('PremiumFinance', 'mailingAddress1', ''),
        change('PremiumFinance', 'city', ''),
        change('PremiumFinance', 'state', ''),
        change('PremiumFinance', 'zip', '')
      ])
    );
  }
};

export const PremiumFinance = (props) => {
  const {
    fieldQuestions,
    quoteData,
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
      <Form id="PremiumFinance" onSubmit={handleSubmit(handleFormSubmit)} noValidate>
        <div className="scroll">
          <div className="form-group survey-wrapper" role="group">
            <h3 className="section-group-header"><i className="fa fa-money" /> Premium Finance</h3>
            {fieldValues.isAdditional && (
              <ReactSelectField
                label="Top Premium Finance"
                name="premiumFinance"
                searchable
                labelKey="displayText"
                autoFocus
                value={props.appState.data.selectedPremiumFinanceOption}
                answers={getAnswers('premiumFinance', fieldQuestions)}
                onChange={val => setPremiumFinanceValues(val, props)}
              />
            )}
            {fieldQuestions &&
              _.sortBy(
                _.filter(fieldQuestions, q => q.name !== 'premiumFinance'),
                'sort'
              ).map((question, index) => (
                <FieldGenerator
                  autoFocus={index === 1}
                  data={quoteData}
                  question={question}
                  values={fieldValues}
                  key={index}
                />
              ))}
          </div>
          <div className="workflow-steps">
            <span className="button-label-wrap">
              <span className="button-info">Oops! There is no Premium Finance</span>
              <button className="btn btn-secondary" type="button" onClick={() => closeAndSavePreviousAIs(props)}>Go Back</button>
            </span>
            <button className="btn btn-primary" type="submit" form="PremiumFinance" disabled={props.appState.data.submitting}>Save</button>
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
  fieldValues: _.get(state.form, 'PremiumFinance.values', {}),
  initialValues: handleInitialize(state),
  fieldQuestions: handleGetQuestions(state),
  quoteData: handleGetQuoteData(state)
});

const mapDispatchToProps = dispatch => ({
  updateQuote: bindActionCreators(updateQuote, dispatch),
  actions: {
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'PremiumFinance',
  onSubmitFail: failedSubmission
})(PremiumFinance));
