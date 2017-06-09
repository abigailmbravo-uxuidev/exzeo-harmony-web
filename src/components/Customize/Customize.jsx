import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Form, propTypes } from 'redux-form';
import _ from 'lodash';

import Footer from '../Common/Footer';
import { convertQuoteStringsToNumber, getInitialValues } from './customizeHelpers';
import FieldGenerator from '../Form/FieldGenerator';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';
import Loader from '../Common/Loader';

const userTasks = {
  formSubmit: 'askToCustomizeDefaultQuote',
  customizeDefaultQuote: 'customizeDefaultQuote'
};

const handleFormSubmit = (data, dispatch, props) => {
  const modelName = props.appState.modelName;
  const workflowId = props.tasks[props.appState.modelName].data.modelInstanceId;
  const taskName = userTasks.formSubmit;
  dispatch(appStateActions.setAppState(modelName, workflowId, { ...props.appState.data, submitting: true }));
  if (!props.appState.data.recalc) {
    // the form was not modified so we dont need to customize quote, we do need to run two tasks in batch
    props.actions.cgActions.completeTask(modelName, workflowId, taskName, {
      shouldCustomizeQuote: 'No'
    });
  } else {
    // the form was modified and now we need to recalc
    const updatedQuote = convertQuoteStringsToNumber(data);
    const updatedQuoteResult = {
      ...updatedQuote,
      dwellingAmount: updatedQuote.dwellingAmount,
      otherStructuresAmount: ((updatedQuote.otherStructuresAmount / 100) * updatedQuote.dwellingAmount),
      personalPropertyAmount: Math.round(((updatedQuote.personalPropertyAmount / 100) * updatedQuote.dwellingAmount)),
      personalPropertyReplacementCostCoverage: (updatedQuote.personalPropertyReplacementCostCoverage || false),
      propertyIncidentalOccupanciesMainDwelling: (updatedQuote.propertyIncidentalOccupancies === 'Main Dwelling'),
      propertyIncidentalOccupanciesOtherStructures: (updatedQuote.propertyIncidentalOccupancies === 'Other Structures'),
      lossOfUse: ((updatedQuote.lossOfUseAmount / 100) * updatedQuote.dwellingAmount),
      liabilityIncidentalOccupancies: (updatedQuote.propertyIncidentalOccupancies !== 'None'),
      calculatedHurricane: ((updatedQuote.hurricane / 100.0) * updatedQuote.dwellingAmount)
    };

    // Remove the sinkhole attribute from updatedQuoteResult
    // if sinkholePerilCoverage is false
    if (!updatedQuote.sinkholePerilCoverage) {
      delete updatedQuoteResult.sinkhole;
    }

    // we need to run two tasks in sequence so call batchComplete in the cg actions
    const steps = [{
      name: userTasks.formSubmit,
      data: {
        shouldCustomizeQuote: 'Yes'
      }
    }, {
      name: userTasks.customizeDefaultQuote,
      data: updatedQuoteResult
    }];

    props.actions.cgActions.batchCompleteTask(modelName, workflowId, steps)
      .then(() => {
        // now update the workflow details so the recalculated rate shows
        props.actions.appStateActions.setAppState(modelName,
          workflowId, { recalc: false, updateWorkflowDetails: true });
      });
  }
};

const handleFormChange = props => (event, newValue, previousValue) => {
  if (previousValue !== newValue) {
    const workflowId = props.appState.instanceId;
    props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, { recalc: true, hideYoPremium: true });
  }
};

const handleReset = (props) => {
  const workflowId = props.appState.instanceId;
  props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, { recalc: false, hideYoPremium: false });
};

const handleInitialize = (state) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
  const quoteData = _.find(taskData.model.variables, { name: 'updateQuoteWithUWDecision4' }) ? _.find(taskData.model.variables, { name: 'updateQuoteWithUWDecision4' }).value.result :
  _.find(taskData.model.variables, { name: 'getQuote' }).value.result;
  const values = getInitialValues(taskData.uiQuestions, quoteData);

  values.sinkholePerilCoverage = values.sinkholePerilCoverage || false;
  values.fireAlarm = values.fireAlarm || false;
  values.burglarAlarm = values.burglarAlarm || false;

  return values;
};

const handleGetQuestions = (state) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
  return taskData.uiQuestions;
};

const handleGetQuoteData = (state) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
  const quoteData = taskData && taskData.previousTask && taskData.previousTask.value ? taskData.previousTask.value.result : {};
  return quoteData;
};

export const Customize = (props) => {
  const {
    fieldQuestions,
    quoteData,
    handleSubmit,
    reset,
    fieldValues
  } = props;

  return (
    <div className="route-content">
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
                data={quoteData}
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

Customize.propTypes = {
  ...propTypes,
  tasks: PropTypes.shape(),
  appState: PropTypes.shape({
    modelName: PropTypes.string,
    data: PropTypes.shape({
      recalc: PropTypes.boolean,
      submitting: PropTypes.boolean
    }),
    instanceId: PropTypes.string
  })
};

const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState,
  fieldValues: _.get(state.form, 'Customize.values', {}),
  initialValues: handleInitialize(state),
  fieldQuestions: handleGetQuestions(state),
  quoteData: handleGetQuoteData(state)
});

const mapDispatchToProps = dispatch => ({
  actions: {
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

const reduxFormComponent = reduxForm({ form: 'Customize' })(Customize);

export default connect(mapStateToProps, mapDispatchToProps)(reduxFormComponent);
