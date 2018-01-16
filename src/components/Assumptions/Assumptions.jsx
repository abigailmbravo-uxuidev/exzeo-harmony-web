import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Form, propTypes } from 'redux-form';
import _ from 'lodash';
import Footer from '../Common/Footer';
// import { getInitialValues } from '../Customize/customizeHelpers';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';
import TaskRunnerConnect from '../Workflow/TaskRunner';

import { CheckField } from '../Form/inputs';

const userTasks = { formSubmit: 'showAssumptions' };

export const handleOnSubmit = (data, dispatch, props) => {
  const workflowId = props.tasks[props.appState.modelName].data.modelInstanceId;
  const taskName = userTasks.formSubmit;
  props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, { ...props.appState.data, submitting: true, showLoader: true, taskName });
  // props.actions.cgActions.completeTask(props.appState.modelName, workflowId, taskName, {});
};

export const Assumptions = (props) => {
  const { appState, handleSubmit, fieldValues } = props;
  return (
    <div className="route-content">
      {props.appState.data.showLoader && <TaskRunnerConnect taskName={props.appState.data.taskName} taskData={props.appState.data.taskData} />}
      <Form id="Assumptions" onSubmit={handleSubmit(handleOnSubmit)} noValidate>
        <div className="scroll">
          <div className="form-group survey-wrapper">
            <h3 className="section-group-header">All properties will be inspected within 30 days of the effective date.</h3>
            <p>Please be aware that assumptions to this property have been made in order to provide you this quote. If any of the below assumptions are not correct, please contact us before continuing.</p>
            <ul>
              <li>Properties with pools (or similar structures), are to be completely fenced, walled, or screened. There are no slides or diving boards.</li>
              <li>Properties located in Special Flood Hazard Areas, as defined by the National Flood Insurance Program maintain a separate flood policy.</li>
              <li>Property is not in state of disrepair or having existing unrepaired damage.</li>
              <li>Roof covering does not exceed the age as defined below
                <ul>
                  <li>Roof cannot be over 20 years old if Asphalt, Fiberglass, Composition/Wood Shake Shingles; Built-up Tar and Gravel; or other roof covering types not included below</li>
                  <li>Roof cannot be over 40 years old if Tile, Slate, Concrete, or Metal</li>
                </ul>
              </li>
            </ul>
            <CheckField styleName="confirm" name="confirmAssumptions" label="Confirmed" isSwitch autoFocus tabIndex={'0'} />
          </div>
          <div className="workflow-steps">
            <button className="btn btn-primary" type="submit" form="Assumptions" disabled={!fieldValues.confirmAssumptions || appState.data.submitting} tabIndex={'0'}>Next</button>
          </div>
          <Footer />
        </div>
      </Form>
    </div>
  );
};

Assumptions.propTypes = {
  ...propTypes,
  handleSubmit: PropTypes.func,
  appState: PropTypes.shape({
    modelName: PropTypes.string,
    data: PropTypes.shape({
      recalc: PropTypes.boolean,
      submitting: PropTypes.boolean
    })
  }),
    fieldValues: PropTypes.any, // eslint-disable-line
  actions: PropTypes.shape({
    cgActions: PropTypes.shape({ startWorkflow: PropTypes.func, activeTasks: PropTypes.func, completeTask: PropTypes.func }),
    workflowActions: PropTypes.shape({ workflowComplete: PropTypes.func, workflowError: PropTypes.func })
  }),
  tasks: PropTypes.shape()
};

const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState,
  fieldValues: _.get(state.form, 'Assumptions.values', {})
});

const mapDispatchToProps = dispatch => ({
  actions: {
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'Assumptions' })(Assumptions));
