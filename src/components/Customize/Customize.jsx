import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Form } from 'redux-form';
import _ from 'lodash';
import { Redirect } from 'react-router';
import Footer from '../Common/Footer';
import { convertQuoteStringsToNumber, getInitialValues } from './customizeHelpers';
import FieldGenerator from '../Form/FieldGenerator';
import * as appStateActions from '../../actions/appStateActions';
import Loader from '../Common/Loader';
import SnackBar from '../Common/SnackBar';
import failedSubmission from '../Common/reduxFormFailSubmit';

import { updateQuote } from '../../actions/quoteState.actions';

export const handleFormSubmit = async (data, dispatch, props) => {
  dispatch(appStateActions.setAppState('modelName', 'workflowId', { ...props.appState.data, submitting: true }));

  const updatedQuote = convertQuoteStringsToNumber(data);
  updatedQuote.dwellingAmount = Math.round(updatedQuote.dwellingAmount / 1000) * 1000;
  const updatedQuoteResult = {
    ...updatedQuote,
    dwellingAmount: updatedQuote.dwellingAmount,
    otherStructuresAmount: Math.ceil(((updatedQuote.otherStructuresAmount / 100) * updatedQuote.dwellingAmount)),
    personalPropertyAmount: Math.ceil(((updatedQuote.personalPropertyAmount / 100) * updatedQuote.dwellingAmount)),
    personalPropertyReplacementCostCoverage: (updatedQuote.personalPropertyReplacementCostCoverage || false),
    propertyIncidentalOccupanciesMainDwelling: (updatedQuote.propertyIncidentalOccupancies === 'Main Dwelling'),
    propertyIncidentalOccupanciesOtherStructures: (updatedQuote.propertyIncidentalOccupancies === 'Other Structures'),
    lossOfUse: Math.ceil(((updatedQuote.lossOfUseAmount / 100) * updatedQuote.dwellingAmount)),
    liabilityIncidentalOccupancies: (updatedQuote.propertyIncidentalOccupancies !== 'None'),
    calculatedHurricane: Math.ceil(((updatedQuote.hurricane / 100.0) * updatedQuote.dwellingAmount)),
    recalc: !!props.appState.data.recalc
  };

  if (updatedQuoteResult.personalPropertyAmount === 0) {
    updatedQuoteResult.personalPropertyReplacementCostCoverage = false;
  }

  if (!updatedQuote.sinkholePerilCoverage) {
    delete updatedQuoteResult.sinkhole;
  }

  await props.updateQuote({ data: updatedQuoteResult, quoteNumber: props.quote.quoteNumber });

  if (!props.appState.data.recalc) {
    props.history.push('share');
  }

  props.actions.appStateActions.setAppState('', '', { recalc: false, submitting: false });
};

export const handleFormChange = props => (event, newValue, previousValue) => {
  if (previousValue !== newValue) {
    const workflowId = props.appState.instanceId;
    props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, { recalc: true, hideYoPremium: true });
  }
};

export const handleReset = (props) => {
  const workflowId = props.appState.instanceId;
  props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, { recalc: false, hideYoPremium: false });
};

const handleInitialize = (state) => {
  const quote = state.quoteState.quote;
  const questions = handleGetQuestions(state);
  const values = getInitialValues(questions, quote);

  values.sinkholePerilCoverage = values.sinkholePerilCoverage || false;
  values.fireAlarm = values.fireAlarm || false;
  values.burglarAlarm = values.burglarAlarm || false;
  values.otherStructuresAmount = values.otherStructuresAmount || 0;
  values.personalPropertyAmount = values.personalPropertyAmount || 0;

  return values;
};

const handleGetQuestions = state => (state.quoteState.state ? state.quoteState.state.uiQuestions : []);

export const Customize = (props) => {
  const {
    fieldQuestions,
    quote,
    handleSubmit,
    reset,
    fieldValues,
    isHardStop
  } = props;

  return (
    <div className="route-content">
      {isHardStop && <Redirect to={'error'} />}
      <SnackBar
        {...props}
        show={props.appState.data.showSnackBar}
        timer={3000}
      ><p>Please correct errors.</p></SnackBar>
      {props.appState.data.submitting && <Loader />}
      <Form
        className="fade-in"
        id="Customize"
        onSubmit={handleSubmit(handleFormSubmit)}
        noValidate
      >
        <div className="scroll">
          <div className="form-group survey-wrapper" role="group">
            {fieldQuestions && fieldQuestions.map((question, index) =>
              <FieldGenerator
                autoFocus={index === 1}
                data={quote}
                question={question}
                values={fieldValues || {}}
                onChange={handleFormChange(props)}
                key={index}
              />
            )}
          </div>
          <div className="workflow-steps">
            {props.appState.data.recalc &&
              <button
                tabIndex={'0'}
                className="btn btn-secondary"
                onClick={() => {
                  handleReset(props);
                  reset();
                }}
                type="button"
                disabled={props.appState.data.submitting}
              >
                Reset
              </button>
             }
            <button
              tabIndex={'0'}
              className="btn btn-primary"
              type="submit"
              form="Customize"
              disabled={props.appState.data.submitting}
            >
              {props.appState.data.recalc ? 'recalculate' : 'next'}
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
  fieldValues: _.get(state.form, 'Customize.values', {}),
  initialValues: handleInitialize(state),
  fieldQuestions: handleGetQuestions(state),
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
  form: 'Customize',
  enableReinitialize: true,
  onSubmitFail: failedSubmission
})(Customize));
