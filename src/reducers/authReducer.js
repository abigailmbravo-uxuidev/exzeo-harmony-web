import * as types from './../actions/actionTypes';
import initialState from './initialState';

export default function authReducer(state = initialState.auth, action) {
  switch (action.type) {
    case types.AUTHENTICATED:
      return state.set('token', action.token);

    case types.AUTH_ME:
      return state.set('me', action.me);

    default:
      return state;
  }
}
