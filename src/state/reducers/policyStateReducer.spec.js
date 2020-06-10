import * as persistTypes from 'redux-persist/constants';
import * as types from '../actions/actionTypes';
import initialState from './initialState';
import policyStateReducer from './policyStateReducer';

describe('policyState Reducer', () => {
  it('should call policyStateReducer GET_POLICY', () => {
    const state = initialState.policy;
    const inputProps = {
      policyNumber: '123',
      policy: { policyNumber: '123' },
      summaryLedger: { foo: 'bar' }
    };
    const action = {
      type: types.SET_POLICY,
      policy: { policyNumber: '123' },
      summaryLedger: { foo: 'bar' }
    };

    expect(policyStateReducer(state, action)).toEqual(inputProps);
  });

  it('should call policyStateReducer REHYDRATE', () => {
    const state = initialState.policy;
    const inputProps = { policy: {}, summaryLedger: {}, policyNumber: '123' };
    const action = {
      type: persistTypes.REHYDRATE,
      payload: {
        policy: { policy: {}, summaryLedger: {}, policyNumber: '123' }
      }
    };

    expect(policyStateReducer(state, action)).toEqual(inputProps);
  });
});
