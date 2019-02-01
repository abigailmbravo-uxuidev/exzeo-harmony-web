import auth0 from 'auth0-js';
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

  renewInterval = setInterval(() => { this.checkAuth(); }, 5000);

  userProfile;

  login = () => {
    this.auth0.authorize();
  };

  checkAuth = () => {
    if (this.isAuthenticated()) {
      return;
    }

    this.logout();
  };

  handleAuthentication = () => {
    this.auth0.parseHash(window.location.hash, (err, authResult) => {
      if (err) {
        history.replace(`/accessDenied?error=${err.errorDescription ? err.errorDescription : 'Access Denied' }`);
        return;
      }

      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        history.replace('/');
      }
    });
  };

  setSession = (authResult) => {
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  };

  getIdToken = () => {
    const idToken = localStorage.getItem('id_token');
    if (!idToken) {
      throw new Error('No id token found');
    }
    return idToken;
  };

  getAccessToken = () => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('No access token found');
    }
    return accessToken;
  };

  getProfile = () => {
    const idToken = localStorage.getItem('id_token');
    if (!idToken) return null;

    const profile = jwtDecode(idToken);
    const groups = profile['https://heimdall.security/groups'];
    const roles = profile['https://heimdall.security/roles'];
    const username = profile['https://heimdall.security/username'];
    const appMetadata = profile['https://heimdall.security/app_metadata'];
    const legacyAgency = groups ? groups[0] : {};

    let agency;
    if (appMetadata && appMetadata.agencyCode) {
      agency = {
        agencyCode: appMetadata.agencyCode,
        companyCode: appMetadata.companyCode,
        state: appMetadata.state
      }
    } else if (legacyAgency.isAgency){
      agency = {
        agencyCode: legacyAgency.agencyCode,
        companyCode: legacyAgency.companyCode,
        state: legacyAgency.state
      }
    }

    this.userProfile = {
      ...profile,
      groups,
      roles,
      username,
      appMetadata,
      agency
    };

    delete this.userProfile['https://heimdall.security/groups'];
    delete this.userProfile['https://heimdall.security/roles'];
    delete this.userProfile['https://heimdall.security/username'];
    delete this.userProfile['https://heimdall.security/app_metadata'];

    return this.userProfile;
  };

  logout = () => {
    localStorage.clear();
    this.userProfile = undefined;
    this.auth0.logout({
      returnTo: process.env.REACT_APP_AUTH0_PRIMARY_URL,
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
      federated: true
    });
  };

  isAuthenticated = () => {
    const idToken = localStorage.getItem('id_token');
    if (!idToken) return false;

    const payload = jwtDecode(idToken);
    return Math.floor(Date.now() / 1000) < payload.exp;
  };
}
