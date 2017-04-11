/* eslint no-undef:1 */
import axios from 'axios';
import * as types from './actionTypes';

export const authenticating = state => ({
  type: types.AUTHENTICATING,
  state
});

export const authenticated = user => ({
  type: types.AUTHENTICATED,
  user
});

export const authenticateError = user => ({
  type: types.AUTHENTICATE_ERROR,
  user
});

export const login = creds => (dispatch) => {
  const axiosOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    url: `${process.env.REACT_APP_API_URL}/auth`,
    data: {
      username: creds.username,
      password: creds.password
    }
  };
  dispatch(authenticating('athenticating'));
  return axios(axiosOptions)
  .then((response) => {
    const token = response.data.token.id_token;
    const user = { token, isAuthenticated: true, loggedOut: false };
    dispatch(authenticated(user));
  })
  .catch((error) => {
    const user = { error, isAuthenticated: false, loggedOut: false };
    dispatch(authenticateError(user));
  });
};

export const logout = () => (dispatch) => {
  const user = { token: undefined, isAuthenticated: false, loggedOut: true };
  dispatch(authenticated(user));
};
