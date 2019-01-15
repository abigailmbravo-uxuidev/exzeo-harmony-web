describe('Search Policy test - no params', () => {
  before('Login', () => {
    cy.login();
  });

  it('The Search Bar Exists', () => {
    cy.url()
      .should('include', Cypress.env('REACT_APP_CYPRESS_URL'))
      .then(() => {
        cy.get('.policy > span').click();
        cy.get('#PolicySearchBar').should('exist');
      });
  });
});
