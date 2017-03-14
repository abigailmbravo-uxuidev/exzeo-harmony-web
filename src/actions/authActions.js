/* eslint no-undef:1 */
import Auth0 from 'auth0-js';
import localStorage from 'localStorage';
import * as types from './actionTypes';

const auth0 = new Auth0({
  domain: 'harmony.auth0.com',
  clientID: 'PplwmQlbI12PB0yYTgfOXMkMKnpPU3Zg',
  callbackURL: '/',
  callbackOnLocationHash: true,
  response: 'token'
});

export const authenticating = state => ({
  type: types.AUTHENTICATING,
  state
});

export const authenticated = token => ({
  type: types.AUTHENTICATED,
  token
});

export const authenticateError = error => ({
  type: types.TOGGLE_FEATURE,
  error
});

export const authenticatedMe = me => ({
  type: types.AUTH_ME,
  me
});

export const login = creds => (dispatch) => {
  auth0.login({
    connection: 'Username-Password-Authentication',
    username: creds.username,
    password: creds.password
  }, (err, results) => {
    console.log(`Error on Login:${err}`); // eslint-disable-line
    if (err) {
      dispatch(authenticateError(err));
    } else {
      localStorage.setItem('token', results.idToken);
      dispatch(authenticated(results.idToken));
    }
  });
  dispatch(authenticating('athenticating'));
};
