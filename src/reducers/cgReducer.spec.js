import * as persistTypes from 'redux-persist/constants';
import * as types from './../actions/actionTypes';
import initialState from './initialState';
import cgReducer from './cgReducer';

describe('CG Reducer', () => {
  it('should call cgReducer CG_START', () => {
    const state = initialState.appState;
    const inputProps = { "data": { "submitting": false, "updateWorkflowDetails": false } };
    const action = [{
      type: types.CG_START,
      workflowData: inputProps
    }];

    expect(cgReducer(state, action)).toEqual(inputProps);
  });
  it('should call cgReducer CG_ACTIVE_TASK', () => {
    const state = initialState.appState;
    const inputProps = { "data": { "submitting": false, "updateWorkflowDetails": false } };
    const action = [{
      type: types.CG_ACTIVE_TASK,
      workflowData: inputProps
    }];

    expect(cgReducer(state, action)).toEqual(inputProps);
  });
  it('should call cgReducer CG_COMPLETE', () => {
    const state = initialState.appState;
    const inputProps = { "data": { "submitting": false, "updateWorkflowDetails": false } };
    const action = [{
      type: types.CG_COMPLETE,
      workflowData: inputProps
    }];

    expect(cgReducer(state, action)).toEqual(inputProps);
  });
  it('should call cgReducer CG_ERROR', () => {
    const state = initialState.appState;
    const inputProps = { "data": { "submitting": false, "updateWorkflowDetails": false } };
    const action = [{
      type: types.CG_ERROR,
      error: inputProps
    }];

    expect(cgReducer(state, action)).toEqual(inputProps);
  });
  it('should call cgReducer REHYDRATE', () => {
    const state = initialState.appState;
    const inputProps = { "data": { "submitting": false, "updateWorkflowDetails": false } };
    const action = [{
      type: types.REHYDRATE,
      payload: {
        cg: inputProps
      }
    }];

    expect(cgReducer(state, action)).toEqual(inputProps);
  });
});
