import login from '../fixtures/stockData/login.json';

Cypress.Commands.add('login', (loginInfo = login) => {
  cy.visit('/logout')
    .visit('/', {
    onBeforeLoad: win => {
      win.sessionStorage.clear();
      win.localStorage.clear();
    }
  });

  if (Cypress.env('USE_MOCK_AUTH0')) {
    cy.get('#submit')
      .then(() => {
        cy.get('#userType').select(loginInfo.userType)
          .get('#submit').click();
      });
  } else {
    cy.get('.auth0-loading-screen').should('not.exist')
      .get('input[name="username"]').type(loginInfo.username, { force: true })
      .get('input[name="password"]').type(loginInfo.password, { force: true })
      .get('.auth0-label-submit').click({ force: true });
  }
});
