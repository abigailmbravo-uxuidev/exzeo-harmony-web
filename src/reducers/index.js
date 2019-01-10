/* eslint no-param-reassign:0 */
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authState from './authReducer';
import appState from './appStateReducer';
import error from './errorReducer';
import service from './serviceReducer';
import completedTasks from './completedTasksReducer';
import search from './searchReducer';
import policy from './policyStateReducer';
import quoteState from './quoteState.reducer';
import agencyState from './agency.reducer';

const rootReducer = combineReducers({
  form: formReducer,
  policy,
  service,
  appState,
  authState,
  error,
  completedTasks,
  search,
  quoteState,
  agencyState
});

export default rootReducer;
