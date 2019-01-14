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

Cypress.Commands.add('login', (userType = 'CSR') => {
  cy.clearCookies();

  window.localStorage.setItem('relogin', 'true');
  const token = localStorage.getItem('id_token');
  const exp = localStorage.getItem('expires_at');
  const now = new Date().getTime();

  if (!token || !exp || now > exp) {
    const useMockAuth0 = Cypress.env('REACT_APP_USE_MOCK_AUTH0');

    if (useMockAuth0) {
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
