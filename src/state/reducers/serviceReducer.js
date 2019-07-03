import * as persistTypes from 'redux-persist/constants';
import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function serviceReducer(state = initialState.service, action) {
  let newState = state;
  switch (action.type) {
    case types.SERVICE_REQUEST:
      newState = action.data ? { ...state, ...action.data } : newState;
      return newState;
    case persistTypes.REHYDRATE: {
      const service = action.service ? action.service : null;
      return (
        service ||
        (action.payload && action.payload.service
          ? action.payload.service
          : state)
      );
    }
    default:
      return state;
  }
}
