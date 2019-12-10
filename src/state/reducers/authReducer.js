import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function authReducer(state = initialState.authState, action) {
  switch (action.type) {
    case types.AUTH:
      return {
        ...state,
        ...action.authState,
        userProfile: action.authState.userProfile
      };
    default:
      return state;
  }
}
