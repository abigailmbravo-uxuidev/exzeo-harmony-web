import React from 'react';
import PropTypes from 'prop-types';
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
import SnackBar from '../Common/SnackBar';
import failedSubmission from '../Common/reduxFormFailSubmit';

import { MOCK_QUOTE } from '../mockQuote';
import { MOCK_UI_QUESTIONS } from '../askToCustomizeDefaultQuote';

const userTasks = {
  formSubmit: 'askToCustomizeDefaultQuote',
  customizeDefaultQuote: 'customizeDefaultQuote'
};

export const handleFormSubmit = (data, dispatch, props) => {
  window.location.href = '/quote/12-5151466-01/share';

  // const modelName = props.appState.modelName;
  // const workflowId = props.tasks[props.appState.modelName].data.modelInstanceId;
  // const taskName = userTasks.formSubmit;
  // dispatch(appStateActions.setAppState(modelName, workflowId, { ...props.appState.data, submitting: true }));
  // if (!props.appState.data.recalc) {
  //   // the form was not modified so we dont need to customize quote, we do need to run two tasks in batch
  //   props.actions.cgActions.completeTask(modelName, workflowId, taskName, {
  //     shouldCustomizeQuote: 'No'
  //   });
  // } else {
  //   // the form was modified and now we need to recalc
  //   const updatedQuote = convertQuoteStringsToNumber(data);
  //   updatedQuote.dwellingAmount = Math.round(updatedQuote.dwellingAmount / 1000) * 1000;

  //   const updatedQuoteResult = {
  //     ...updatedQuote,
  //     dwellingAmount: updatedQuote.dwellingAmount,
  //     otherStructuresAmount: Math.ceil(((updatedQuote.otherStructuresAmount / 100) * updatedQuote.dwellingAmount)),
  //     personalPropertyAmount: Math.ceil(((updatedQuote.personalPropertyAmount / 100) * updatedQuote.dwellingAmount)),
  //     personalPropertyReplacementCostCoverage: (updatedQuote.personalPropertyReplacementCostCoverage || false),
  //     propertyIncidentalOccupanciesMainDwelling: (updatedQuote.propertyIncidentalOccupancies === 'Main Dwelling'),
  //     propertyIncidentalOccupanciesOtherStructures: (updatedQuote.propertyIncidentalOccupancies === 'Other Structures'),
  //     lossOfUse: Math.ceil(((updatedQuote.lossOfUseAmount / 100) * updatedQuote.dwellingAmount)),
  //     liabilityIncidentalOccupancies: (updatedQuote.propertyIncidentalOccupancies !== 'None'),
  //     calculatedHurricane: Math.ceil(((updatedQuote.hurricane / 100.0) * updatedQuote.dwellingAmount))
  //   };

  //   if (updatedQuoteResult.personalPropertyAmount === 0) {
  //     updatedQuoteResult.personalPropertyReplacementCostCoverage = false;
  //   }

  //   // Remove the sinkhole attribute from updatedQuoteResult
  //   // if sinkholePerilCoverage is false
  //   if (!updatedQuote.sinkholePerilCoverage) {
  //     delete updatedQuoteResult.sinkhole;
  //   }

  //   // we need to run two tasks in sequence so call batchComplete in the cg actions
  //   const steps = [{
  //     name: userTasks.formSubmit,
  //     data: {
  //       shouldCustomizeQuote: 'Yes'
  //     }
  //   }, {
  //     name: userTasks.customizeDefaultQuote,
  //     data: updatedQuoteResult
  //   }];

  //   props.actions.cgActions.batchCompleteTask(modelName, workflowId, steps)
  //     .then(() => {
  //       // now update the workflow details so the recalculated rate shows
  //       props.actions.appStateActions.setAppState(modelName,
  //         workflowId, { recalc: false, updateWorkflowDetails: true });
  //     });
  // }
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
  // const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
  // const quoteData = _.find(taskData.model.variables, { name: 'updateQuoteWithUWDecision4' }) ? _.find(taskData.model.variables, { name: 'updateQuoteWithUWDecision4' }).value.result :
  // _.find(taskData.model.variables, { name: 'updateQuoteWithUWDecision3' }).value.result;

  const values = getInitialValues(MOCK_UI_QUESTIONS, MOCK_QUOTE);

  values.sinkholePerilCoverage = values.sinkholePerilCoverage || false;
  values.fireAlarm = values.fireAlarm || false;
  values.burglarAlarm = values.burglarAlarm || false;
  values.otherStructuresAmount = values.otherStructuresAmount || 0;
  values.personalPropertyAmount = values.personalPropertyAmount || 0;

  return values;
};

const handleGetQuestions = state =>
 // const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
   MOCK_UI_QUESTIONS;

const handleGetQuoteData = state =>
  // const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
  // return _.find(taskData.model.variables, { name: 'updateQuoteWithUWDecision4' }) ? _.find(taskData.model.variables, { name: 'updateQuoteWithUWDecision4' }).value.result :
  // _.find(taskData.model.variables, { name: 'updateQuoteWithUWDecision3' }).value.result;
   MOCK_QUOTE;

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

const reduxFormComponent = reduxForm({ form: 'Customize',
  enableReinitialize: true,
  onSubmitFail: failedSubmission })(Customize);

export default connect(mapStateToProps, mapDispatchToProps)(reduxFormComponent);
