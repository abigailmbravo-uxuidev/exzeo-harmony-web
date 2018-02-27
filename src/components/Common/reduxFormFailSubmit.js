const failedSubmission = (errors, dispatch, submitError, props) => {
  const workflowId = props.appState.instanceId;
  props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, { ...props.appState.data, showSnackBar: true });
  setTimeout(() => {
    props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, { ...props.appState.data, showSnackBar: false });
  }, 3000);
};

export default failedSubmission;

