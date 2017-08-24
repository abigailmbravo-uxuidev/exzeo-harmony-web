import auth0 from 'auth0-js';
import _ from 'lodash';
import jwtDecode from 'jwt-decode';

import history from './history';

export default class Auth {
  auth0 = new auth0.WebAuth({
    audience: process.env.REACT_APP_AUTH0_AUDIENCE,
    domain: process.env.REACT_APP_AUTH0_DOMAIN,
    clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
    redirectUri: `${process.env.REACT_APP_AUTH0_PRIMARY_URL}/callback`,
    responseType: 'token id_token',
    scope: 'openid email profile name username groups roles',
    sso: true
  });

  renewInterval;

  userProfile;

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.checkAuth = this.checkAuth.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getProfile = this.getProfile.bind(this);

    // check if the user is actually logged out from another sso site
    this.renewInterval = setInterval(() => { this.checkAuth(); }, 5000);
  }

  login() {
    this.auth0.authorize();
  }

  checkAuth() {
    if (this.isAuthenticated()) {
      return;
    }

    this.logout();
  }

  handleAuthentication() {
    this.auth0.parseHash(window.location.hash, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        history.replace('/');
      } else if (err) {
        history.replace(`/accessDenied?error=${err.errorDescription}`);
      }
    });
  }

  setSession = (authResult) => {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  getIdToken = () => {
    const idToken = localStorage.getItem('id_token');
    if (!idToken) {
      throw new Error('No id token found');
    }
    return idToken;
  }

  getAccessToken = () => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('No access token found');
    }
    return accessToken;
  }

  getProfile = (cb) => {
    const idToken = localStorage.getItem('id_token');
    if (!idToken) {
      cb('No Id Token');
    }
    const profile = jwtDecode(idToken);
    this.userProfile = profile;
    this.userProfile.groups = profile['https://heimdall.security/groups'];
    this.userProfile.roles = profile['https://heimdall.security/roles'];
    this.userProfile.username = profile['https://heimdall.security/username'];
    delete this.userProfile['https://heimdall.security/groups'];
    delete this.userProfile['https://heimdall.security/roles'];
    delete this.userProfile['https://heimdall.security/username'];
    cb(null, profile);
  }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.clear();
    this.userProfile = null;
    this.auth0.logout({ returnTo: process.env.REACT_APP_AUTH0_PRIMARY_URL, clientID: process.env.REACT_APP_AUTH0_CLIENT_ID, federated: true });
  }

  isAuthenticated = () => {
    const idToken = localStorage.getItem('id_token');
    if (!idToken) {
      return false;
    }
    const payload = jwtDecode(idToken);
    return Math.floor(Date.now() / 1000) < payload.exp;
  }

}
