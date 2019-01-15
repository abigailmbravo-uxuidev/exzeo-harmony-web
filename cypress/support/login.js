import defaultLogin from '../fixtures/defaultLogin.json';

Cypress.Commands.add('login', (userType = 'CSR', loginInfo = defaultLogin) => {
  const useMockAuth0 = Cypress.env('REACT_APP_USE_MOCK_AUTH0');

  cy.visit('/logout');
  cy.visit('/', {
    onBeforeLoad: win => {
      win.sessionStorage.clear();
      win.localStorage.clear();
    }
  });

  cy.clearCookies();
  cy.clearLocalStorage();

  if (useMockAuth0) {
    cy.get('#submit')
      .then(() => {
        cy.get('#userType').select(userType);
        cy.get('#submit').click();
      });
  } else {
    cy.get('.auth0-loading-screen').should('not.exist');
    cy.get('input[name="username"]').type(loginInfo.username, { force: true });
    cy.get('input[name="password"]').type(loginInfo.password);
    cy.get('.auth0-label-submit').click();
  }
});