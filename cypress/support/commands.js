// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import auth0 from 'auth0-js';

Cypress.Commands.add('login', (userType = 'CSR') => {
  const token = localStorage.getItem('id_token');
  const exp = localStorage.getItem('expires_at');
  const now = new Date().getTime();

  if (!token || !exp || now > exp) {
    const useMockAuth0 = Cypress.env('REACT_APP_AUTH0_DOMAIN').indexOf('mock-auth') >= 0;

    const auth = new auth0.WebAuth({
      audience: Cypress.env('REACT_APP_AUTH0_AUDIENCE'),
      domain: Cypress.env('REACT_APP_AUTH0_DOMAIN'),
      clientID: Cypress.env('REACT_APP_AUTH0_CLIENT_ID'),
      redirectUri: Cypress.env('REACT_APP_AUTH0_PRIMARY_URL'),
      responseType: 'token id_token',
      scope: 'openid email profile name username groups roles',
      sso: true
    });

    auth.login({ username: 'ttic-20000', password: 'Password1' }, () => { });

    if (useMockAuth0) {
      cy.log('failed');
      cy.visit('/');
      cy.get('#submit')
        .then(() => {
          cy.get('#userType').select(userType);
          cy.get('#submit').click();
        });
    } else {
      cy.visit('/');
      cy.get('.auth0-label-submit')
        .then(() => {
          cy.get('.auth0-lock-input-username > .auth0-lock-input-wrap > .auth0-lock-input').type('ttic-20000');
          cy.get('.auth0-lock-input-password > .auth0-lock-input-wrap > .auth0-lock-input').type('Password1');
          cy.get('.auth0-label-submit').click();
        });
    }
  }
});