import auth0 from 'auth0-js';
import jwtDecode from 'jwt-decode';
import { http } from '@exzeo/core-ui/src/Utilities';

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

  renewInterval = !window.Cypress && setInterval(() => this.checkAuth(), 5000);

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
        history.replace(
          `/accessDenied?error=${
            err.errorDescription ? err.errorDescription : 'Access Denied'
          }`
        );
        return;
      }

      if (authResult && authResult.accessToken && authResult.idToken) {
        const payload = jwtDecode(authResult.idToken);
        return http
          .get(`${process.env.REACT_APP_API_URL}/mainUserProfile`, {
            headers: { authorization: `bearer ${authResult.idToken}` }
          })
          .then(profile => {
            console.log(profile);
            this.setSession(authResult, profile.data);
            history.replace('/');
          })
          .catch(error => {
            history.replace(`/accessDenied?error=${error}`);
          });
      } else {
        history.replace('/accessDenied?error=Not%20Authorized');
      }
    });
  };

  setSession = (authResult, userProfile) => {
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );

    localStorage.setItem('user_profile', JSON.stringify(userProfile));
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
    let userData = {};

    const storedProfile = localStorage.getItem('user_profile');
    try {
      userData = JSON.parse(storedProfile);
    } catch (error) {
      return null;
    }

    const { appMetadata, profile, userType } = userData;
    const group =
      profile.groups && profile.groups.isArray() ? profile.groups[0] : [];
    const { extendedProperties = {} } = group;

    let entity = {};

    if (userType.toLowerCase() === 'agency') {
      entity = {
        agencyCode: appMetadata.agencyCode,
        companyCode: appMetadata.companyCode,
        state: appMetadata.state
      };
    } else if (userType.toLowerCase() === 'internal') {
      entity = {
        agencyCode: extendedProperties.agencyCode,
        companyCode: extendedProperties.companyCode,
        state: extendedProperties.state
      };
    }

    this.isInternal = userType.toLowerCase() === 'internal';
    this.userProfile = {
      ...userData,
      entity
    };

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
