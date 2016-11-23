/* eslint no-undef:1 */
import Auth0 from 'auth0-js';
import * as types from './actionTypes';

const auth0 = new Auth0({
  domain: 'harmony.auth0.com',
  clientID: 'Xhs1oIytMrij0k3ixyLalsPEz7d2K1ME',
  callbackURL: '/',
  callbackOnLocationHash: true,
  response: 'token',
});

export const authenticating = state => ({
  type: types.AUTHENTICATING,
  state,
});

export const authenticated = token => ({
  type: types.AUTHENTICATED,
  token,
});

export const authenticateError = error => ({
  type: types.TOGGLE_FEATURE,
  error,
});

export const authenticatedMe = me => ({
  type: types.AUTH_ME,
  me,
});

export const login = creds => (dispatch) => {
  auth0.login({
    connection: 'Harmony',
    username: creds.username,
    password: creds.password,
  }, (err, results) => {
    if (err) {
      dispatch(authenticateError(err));
    } else {
      localStorage.setItem('access_token', results.idToken);
      dispatch(authenticated(results.idToken));
    }
  });
  dispatch(authenticating('athenticating'));
};
