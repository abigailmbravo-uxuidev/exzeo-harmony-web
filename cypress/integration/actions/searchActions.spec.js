describe('Search Policy test - no params', () => {
  beforeEach('Login', () => {
    cy.clearCookies();
    cy.login();
  });

  it('Search policies with no input -- fails when on fixtures', () => {
    cy.url()
      .should('include', 'http://devagent.harmony-ins.com:8383/')
      .then(() => {
        cy.get('.policy > span').click();
        cy.get('#PolicySearchBar').submit();
        cy.wait(1000);
        cy.get('.results-wrapper > div.quote-list').should('exist')
          .then(($policyList) => {
            expect($policyList.children().length).to.be.gt(5);
          });
    });
  });
});