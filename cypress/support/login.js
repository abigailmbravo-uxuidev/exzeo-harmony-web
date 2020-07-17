import { login } from '../fixtures';

Cypress.Commands.add(
  'login',
  (loginInfo = login, appState = { targetUrl: '/' }) => {
    cy.log(`Logging in as ${loginInfo.username}`);
    const options = {
      method: 'POST',
      url: `https://${Cypress.env('AUTH0_URL')}/oauth/token`,
      body: {
        grant_type: 'password',
        username: loginInfo.username,
        password: loginInfo.password,
        audience: Cypress.env('AUTH0_AUDIENCE'),
        scope: 'openid profile email',
        client_id: Cypress.env('AUTH0_CLIENT_ID'),
        client_secret: Cypress.env('AUTH0_CLIENT_SECRET')
      }
    };
    cy.request(options).then(({ body }) => {
      const { access_token, expires_in, id_token } = body;

      cy.server();

      // intercept Auth0 request for token and return what we have
      cy.route({
        url: 'oauth/token',
        method: 'POST',
        response: {
          access_token: access_token,
          id_token: id_token,
          scope: 'openid profile email',
          expires_in: expires_in,
          token_type: 'Bearer'
        }
      });

      // Auth0 SPA SDK will check for value in cookie to get appState
      // and validate nonce (which has been removed for simplicity)
      const stateId = 'test';
      cy.setCookie(
        `a0.spajs.txs.${stateId}`,
        encodeURIComponent(
          JSON.stringify({
            appState: appState,
            scope: 'openid profile email',
            audience: 'default',
            redirect_uri: Cypress.env('BASE_URL')
          })
        )
      ).then(() => {
        cy.visit(`/?code=test-code&state=${stateId}`);
      });
    });
  }
);
