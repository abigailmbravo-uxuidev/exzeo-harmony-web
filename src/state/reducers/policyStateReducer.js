import * as persistTypes from 'redux-persist/constants';
import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function policyStateReducer(
  state = initialState.policy,
  action
) {
  switch (action.type) {
    case types.SET_POLICY:
      return {
        ...state,
        policyNumber: action.policy.policyNumber,
        policy: action.policy,
        summaryLedger: action.summaryLedger
      };
    case types.RESET_POLICY:
      return {
        ...initialState.policy
      };
    case persistTypes.REHYDRATE:
      const { policy = {} } = action.payload;
      return {
        ...state,
        policyNumber: policy.policyNumber || initialState.policy.policyNumber,
        policy: policy.policy || initialState.policy.policy,
        summaryLedger: policy.summaryLedger || initialState.policy.summaryLedger
      };
    default:
      return state;
  }
}
