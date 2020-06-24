import * as persistTypes from 'redux-persist/constants';
import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function serviceReducer(state = initialState.service, action) {
  switch (action.type) {
    case types.SERVICE_REQUEST:
      return action.data ? { ...state, ...action.data } : state;
    case persistTypes.REHYDRATE: {
      return {
        ...action.payload.service
      };
    }
    default:
      return state;
  }
}
