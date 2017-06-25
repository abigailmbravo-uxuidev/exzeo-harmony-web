import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import Loader from '../Common/Loader';
import * as cgActions from '../../actions/cgActions';

const runTask = (props) => {
  // if (props.appState.data.submitting) return;
  const workflowId = props.appState.instanceId;
  const taskName = props.taskName;
  const taskData = props.taskData;
  if (props.appState.data.isMoveTo) {
    const currentData = props.tasks && props.tasks[props.appState.modelName].data ? props.tasks[props.appState.modelName].data : {};
    props.actions.cgActions.moveToTask(props.appState.modelName, props.appState.instanceId, taskName, _.union(currentData.model.completedTasks, props.completedTasks));
    props.actions.appStateActions.setAppState(props.appState.modelName, props.appState.instanceId, { ...props.appState.data, submitting: true, showLoader: true, isMoveTo: false, taskName });
    console.log(props.appState);
  } else {
    props.actions.cgActions.completeTask(props.appState.modelName, workflowId, taskName, taskData);
  }
};

export const TaskRunner = (props) => {
  console.log('task runner is running:', props);
  runTask(props);
  // return something to make the react dom happy
  // this may be a loader in the future
  return <Loader />;
};

TaskRunner.propTypes = {
  taskName: PropTypes.string,
  taskData: PropTypes.shape({})
};

const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState
});

const mapDispatchToProps = dispatch => ({
  actions: {
    cgActions: bindActionCreators(cgActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskRunner);
