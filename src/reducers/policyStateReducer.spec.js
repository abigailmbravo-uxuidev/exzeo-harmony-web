import * as persistTypes from 'redux-persist/constants';
import * as types from './../actions/actionTypes';
import initialState from './initialState';
import policyStateReducer from './policyStateReducer';

describe('policyState Reducer', () => {
  it('should call policyStateReducer GET_POLICY', () => {
    const state = initialState.policyState;
    const inputProps = {};
    const action = {
      type: types.GET_POLICY,
      policyState: {}
    };

    expect(policyStateReducer(state, action)).toEqual(inputProps);
  });

  it('should call policyStateReducer REHYDRATE', () => {
    const state = initialState.policyState;
    const inputProps = {};
    const action = {
      type: persistTypes.REHYDRATE,
      policyState: {}
    };

    expect(policyStateReducer(state, action)).toEqual(inputProps);
  });
});
