import { toggleSnackbar } from '../../state/actions/appStateActions';

const failedSubmission = (errors, dispatch) => {
  dispatch(toggleSnackbar(true));
  const errorKeys = Object.keys(errors);
  const elem = document.querySelector(`#${errorKeys[0]}`);
  if (elem) elem.scrollIntoView({ block: 'end', behavior: 'smooth' });
  setTimeout(() => {
    dispatch(toggleSnackbar(false));
  }, 3000);
};

export default failedSubmission;
