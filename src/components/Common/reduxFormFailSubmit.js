const failedSubmission = (errors, dispatch, submitError, props) => {
  props.setAppState({ ...props.appState.data, showSnackBar: true });
  const errorKeys = Object.keys(errors);
  const elem = document.querySelector(`#${errorKeys[0]}`);
  if (elem) elem.scrollIntoView({ block: 'end', behavior: 'smooth' });
  setTimeout(() => {
    props.setAppState({ ...props.appState.data, showSnackBar: false });
  }, 3000);
};

export default failedSubmission;
