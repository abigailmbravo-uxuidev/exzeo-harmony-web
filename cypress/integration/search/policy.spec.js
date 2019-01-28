describe('Policy Search', () => {
  before('Login', () => {
    cy.login();
  });

  it('The URL is accurate after logging in', () => {
    cy.url()
      .should('include', Cypress.env('REACT_APP_CYPRESS_URL'));
  });

  it('The search bar exists on Policy tab', () => {
    cy.get('.policy > span').click();
    cy.get('#PolicySearchBar').should('exist');
  });
});
