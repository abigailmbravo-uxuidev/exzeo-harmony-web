/* eslint no-param-reassign:0 */
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import cg from './cgReducer';
import user from './userReducer';
import appState from './appStateReducer';
import error from './errorReducer';
import completedTasks from './completedTasksReducer';

const rootReducer = combineReducers({
  form: formReducer,
  cg,
  user,
  appState,
  error,
  completedTasks
});

export default rootReducer;
