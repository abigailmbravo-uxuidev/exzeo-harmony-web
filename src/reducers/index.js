/* eslint no-param-reassign:0 */
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import cg from './cgReducer';
import authState from './authReducer';
import appState from './appStateReducer';
import error from './errorReducer';
import service from './serviceReducer';
import completedTasks from './completedTasksReducer';

const rootReducer = combineReducers({
  form: formReducer,
  service,
  cg,
  appState,
  authState,
  error,
  completedTasks
});

export default rootReducer;
