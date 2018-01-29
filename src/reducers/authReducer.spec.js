import * as types from './../actions/actionTypes';
import initialState from './initialState';
import authReducer from './authReducer';

describe('Auth Reducer', () => {
  it('should call authReducer', () => {
    const state = initialState.auth;
    const inputProps = { userProfile: null };
    const action = {
      type: types.AUTH,
      authState: inputProps
    };

    expect(authReducer(state, action)).toEqual(inputProps);
  });
});
