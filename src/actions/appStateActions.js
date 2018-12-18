import * as types from './actionTypes';

// these actions are to allow the composite controls to communicate when their models are complete
// this communication allows the workflow to move to the next step

export const setAppState = (data) => {
  const newAppStateData = {
    data
  };
  const stateObj = {
    type: types.APPSTATE_SET,
    appState: newAppStateData
  };
  return stateObj;
};

export const setAppStateError = (error) => {
  const newAppStateData = {
    error
  };
  const stateObj = {
    type: types.APPSTATE_ERROR,
    appState: newAppStateData
  };
  return stateObj;
};

// thunk if needed
export const dispatchAppState = data => dispatch => dispatch(setAppState(data));
