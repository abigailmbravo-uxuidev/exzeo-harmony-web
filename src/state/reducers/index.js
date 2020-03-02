/* eslint no-param-reassign:0 */
import { combineReducers } from 'redux';
import authState from './authReducer';
import appState from './appStateReducer';
import error from './errorReducer';
import service from './serviceReducer';
import policy from './policyStateReducer';
import quoteState from './quoteState.reducer';
import agencyState from './agency.reducer';

// New stuff
import list from './list.reducer';

const rootReducer = combineReducers({
  policy,
  service,
  appState,
  authState,
  error,
  quoteState,
  agencyState,
  list
});

export default rootReducer;
