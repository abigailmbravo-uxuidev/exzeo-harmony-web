import * as persistTypes from 'redux-persist/constants';
import * as types from './../actions/actionTypes';
import initialState from './initialState';

// we want this store to rehydrate so we add the rehydrate type to the reducer

export default function searchReducer(state = initialState.search, action) {
  let newState = {};
  switch (action.type) {
    case types.POLICY_SEARCH:
      newState = { ...state, ...action.search };
      return newState;
    case types.QUOTE_SEARCH:
      newState = { ...state, ...action.search };
      return newState;
    case persistTypes.REHYDRATE:
      newState = (action.payload && action.payload.search) ? action.payload.search : newState;
      return newState;
    default:
      return state;
  }
}
