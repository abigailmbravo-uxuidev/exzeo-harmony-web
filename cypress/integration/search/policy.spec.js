describe('Search Policy test - no params', () => {
  before('Login', () => {
    cy.login();
  });

  beforeEach('Restore local storage', () => {
    cy.restoreLocalStorage();
  });

  afterEach('Save local storage', () => {
    cy.saveLocalStorage();
  });

  it('The URL is accurate after logging in', () => {
    cy.url()
      .should('include', Cypress.env('REACT_APP_CYPRESS_URL'));
  });

  it('The search bar exists after going to policy', () => {
    cy.get('.policy > span').click();
    cy.get('#PolicySearchBar').should('exist');
  });
});
