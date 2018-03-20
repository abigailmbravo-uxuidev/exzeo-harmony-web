import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { batchActions } from "redux-batched-actions";
import { reduxForm, Form, propTypes, change } from "redux-form";
import _ from "lodash";
import Footer from "../Common/Footer";
import { getInitialValues } from "../Customize/customizeHelpers";
import FieldGenerator from "../Form/FieldGenerator";
import * as cgActions from "../../actions/cgActions";
import * as appStateActions from "../../actions/appStateActions";
import Loader from "../Common/Loader";
import SnackBar from "../Common/SnackBar";
import failedSubmission from "../Common/reduxFormFailSubmit";
import ReactSelectField from "../Form/inputs/ReactSelectField";

const userTasks = {
  formSubmit: ""
};

export const handleFormSubmit = (data, dispatch, props) => {
  const workflowId = props.tasks[props.appState.modelName].data.modelInstanceId;
  const taskName = userTasks.formSubmit;
  const additionalInterests = props.quoteData.additionalInterests;

  const mortgagee1 =
    _.find(additionalInterests, { order: 0, type: "Mortgagee" }) || {};
  const mortgagee2 =
    _.find(additionalInterests, { order: 1, type: "Mortgagee" }) || {};

  _.remove(additionalInterests, ai => ai.type === "Mortgagee");

  if (data.isAdditional) {
    mortgagee1.name1 = data.m1Name1;
    mortgagee1.name2 = data.m1Name2;
    mortgagee1.referenceNumber = data.m1ReferenceNumber;
    mortgagee1.order = 0;
    mortgagee1.active = true;
    mortgagee1.type = "Mortgagee";
    mortgagee1.mailingAddress = {
      address1: data.m1MailingAddress1,
      address2: data.m1MailingAddress2,
      city: data.m1City,
      state: data.m1State,
      zip: data.m1Zip,
      country: {
        code: "USA",
        displayText: "United States of America"
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
    mortgagee2.type = "Mortgagee";
    mortgagee2.mailingAddress = {
      address1: data.m2MailingAddress1,
      address2: data.m2MailingAddress2,
      city: data.m2City,
      state: data.m2State,
      zip: data.m2Zip,
      country: {
        code: "USA",
        displayText: "United States of America"
      }
    };

    additionalInterests.push(mortgagee2);
  }

  props.actions.appStateActions.setAppState(
    props.appState.modelName,
    workflowId,
    { ...props.appState.data, submitting: true }
  );
  props.actions.cgActions.completeTask(
    props.appState.modelName,
    workflowId,
    taskName,
    { additionalInterests }
  );
};

export const closeAndSavePreviousAIs = props => {
  const workflowId = props.tasks[props.appState.modelName].data.modelInstanceId;
  const taskName = userTasks.formSubmit;
  const additionalInterests = props.quoteData.additionalInterests;
  props.actions.appStateActions.setAppState(
    props.appState.modelName,
    workflowId,
    { ...props.appState.data, submitting: true }
  );
  props.actions.cgActions.completeTask(
    props.appState.modelName,
    workflowId,
    taskName,
    { additionalInterests }
  );
};

export const handleInitialize = state => {
  const taskData =
    state.cg && state.appState && state.cg[state.appState.modelName]
      ? state.cg[state.appState.modelName].data
      : null;
  //   const quoteData = taskData && taskData.previousTask && taskData.previousTask.value ? taskData.previousTask.value.result : {};

  const quoteData =
    taskData &&
    taskData.model &&
    taskData.model.variables &&
    _.find(taskData.model.variables, { name: "getQuoteBeforeAIs" }) &&
    _.find(taskData.model.variables, { name: "getQuoteBeforeAIs" }).value
      ? _.find(taskData.model.variables, { name: "getQuoteBeforeAIs" }).value
          .result
      : {};

  const values = getInitialValues(taskData.uiQuestions, {
    additionalInterests: _.filter(
      quoteData.additionalInterests,
      ai => ai.type === "Mortgagee"
    )
  });

  userTasks.formSubmit = taskData.activeTask.name;

  _.forEach(taskData.uiQuestions, q => {
    if (!values[q.name]) {
      values[q.name] = "";
    }
  });

  if (_.trim(values.m2Name1)) {
    values.isAdditional2 = true;
  }
  values.isAdditional = true;

  return values;
};

export const handleGetQuestions = state => {
  const taskData =
    state.cg && state.appState && state.cg[state.appState.modelName]
      ? state.cg[state.appState.modelName].data
      : null;
  return taskData.uiQuestions;
};

export const handleGetQuoteData = state => {
  const taskData =
    state.cg && state.appState && state.cg[state.appState.modelName]
      ? state.cg[state.appState.modelName].data
      : null;
  const quoteData =
    taskData &&
    taskData.model &&
    taskData.model.variables &&
    _.find(taskData.model.variables, { name: "getQuoteBeforeAIs" }) &&
    _.find(taskData.model.variables, { name: "getQuoteBeforeAIs" }).value
      ? _.find(taskData.model.variables, { name: "getQuoteBeforeAIs" }).value
          .result
      : {};
  return quoteData;
};

const getAnswers = (name, questions) =>
  _.get(_.find(questions, { name }), "answers") || [];

export const setMortgageeValues = (val, props) => {
  props.actions.appStateActions.setAppState(
    props.appState.modelName,
    props.appState.instanceId,
    {
      ...props.appState.data,
      selectedMortgageeOption: val
    }
  );
  const selectedMortgagee = val;

  if (selectedMortgagee) {
    props.dispatch(
      batchActions([
        change("Mortgagee", "m1Name1", _.get(selectedMortgagee, "AIName1")),
        change("Mortgagee", "m1Name2", _.get(selectedMortgagee, "AIName2")),
        change(
          "Mortgagee",
          "m1MailingAddress1",
          _.get(selectedMortgagee, "AIAddress1")
        ),
        change("Mortgagee", "m1City", _.get(selectedMortgagee, "AICity")),
        change("Mortgagee", "m1State", _.get(selectedMortgagee, "AIState")),
        change("Mortgagee", "m1Zip", String(_.get(selectedMortgagee, "AIZip")))
      ])
    );
  } else {
    props.dispatch(
      batchActions([
        change("Mortgagee", "m1Name1", ""),
        change("Mortgagee", "m1Name2", ""),
        change("Mortgagee", "m1MailingAddress1", ""),
        change("Mortgagee", "m1City", ""),
        change("Mortgagee", "m1State", ""),
        change("Mortgagee", "m1Zip", "")
      ])
    );
  }
};

export const setMortgagee2Values = (val, props) => {
  props.actions.appStateActions.setAppState(
    props.appState.modelName,
    props.appState.instanceId,
    {
      ...props.appState.data,
      selectedMortgageeOption: val
    }
  );
  const selectedMortgagee = val;

  if (selectedMortgagee) {
    props.dispatch(
      batchActions([
        change("Mortgagee", "m2Name1", _.get(selectedMortgagee, "AIName1")),
        change("Mortgagee", "m2Name2", _.get(selectedMortgagee, "AIName2")),
        change(
          "Mortgagee",
          "m2MailingAddress1",
          _.get(selectedMortgagee, "AIAddress1")
        ),
        change("Mortgagee", "m2City", _.get(selectedMortgagee, "AICity")),
        change("Mortgagee", "m2State", _.get(selectedMortgagee, "AIState")),
        change("Mortgagee", "m2Zip", String(_.get(selectedMortgagee, "AIZip")))
      ])
    );
  } else {
    props.dispatch(
      batchActions([
        change("Mortgagee", "m2Name1", ""),
        change("Mortgagee", "m2Name2", ""),
        change("Mortgagee", "m2MailingAddress1", ""),
        change("Mortgagee", "m2City", ""),
        change("Mortgagee", "m2State", ""),
        change("Mortgagee", "m2Zip", "")
      ])
    );
  }
};

export const Mortgagee = props => {
  const { fieldQuestions, quoteData, handleSubmit, fieldValues } = props;

  return (
    <div className="route-content">
      <SnackBar {...props} show={props.appState.data.showSnackBar} timer={3000}>
        <p>Please see errors above</p>
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
                answers={getAnswers("mortgagee", fieldQuestions)}
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
                  answers={getAnswers("mortgagee", fieldQuestions)}
                  onChange={val => setMortgagee2Values(val, props)}
                />
              )}
            {fieldQuestions &&
              _.sortBy(
                _.filter(fieldQuestions, q => q.name !== "mortgagee"),
                "sort"
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
              <span className="button-info">Oops! There is no mortgagee</span>
              <button
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

Mortgagee.propTypes = {
  ...propTypes,
  handleSubmit: PropTypes.func,
  tasks: PropTypes.shape(),
  appState: PropTypes.shape({
    modelName: PropTypes.string,
    data: PropTypes.shape({
      recalc: PropTypes.boolean,
      submitting: PropTypes.boolean
    })
  }),
  fieldValues: PropTypes.any, // eslint-disable-line
  initialized: PropTypes.bool,
  initialize: PropTypes.func
};

const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState,
  fieldValues: _.get(state.form, "Mortgagee.values", {}),
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

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
    form: "Mortgagee",
    enableReinitialize: true,
    onSubmitFail: failedSubmission
  })(Mortgagee)
);
