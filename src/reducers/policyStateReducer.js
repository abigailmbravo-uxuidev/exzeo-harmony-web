import * as persistTypes from 'redux-persist/constants';
import * as types from './../actions/actionTypes';
import initialState from './initialState';

export default function policyStateReducer(state = initialState.policy, action) {
  let newState = state;
  switch (action.type) {
    case types.GET_POLICY:
      newState = (action.policyState) ? action.policyState : newState;
      return newState;
    case persistTypes.REHYDRATE:
      const policy = (action.policy) ? action.policy : null;
      newState = policy || ((action.payload && action.payload.policy) ? action.payload.policy : newState);
      return newState;
    default:
      return state;
  }
}

