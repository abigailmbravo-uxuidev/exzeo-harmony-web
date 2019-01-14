describe('Search Policy test - no params', () => {
  before('Login', () => {
    cy.login();
  });

  it('Search policies with no input -- fails when on fixtures', () => {
    cy.url()
      .should('include', 'http://devagent.harmony-ins.com:8383/')
      .then(() => {
        cy.get('.policy > span').click();
        cy.get('#PolicySearchBar').should('exist');
    });
  });
});