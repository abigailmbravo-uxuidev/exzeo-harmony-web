import { loginHO3 } from '../fixtures';

Cypress.Commands.add('login', (loginInfo = loginHO3) => {
  cy.visit('/logout');

  cy.get('.auth0-loading-screen')
    .should('not.exist')
    .get('input[name="username"]')
    .type(loginInfo.username, { force: true })
    .get('input[name="password"]')
    .type(loginInfo.password, { force: true })
    .get('.auth0-label-submit')
    .click({ force: true });
});
