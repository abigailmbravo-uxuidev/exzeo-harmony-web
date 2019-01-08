describe('Search Policy test - by Policy Number', () => {
  beforeEach('Login', () => {
    cy.clearCookies();
    cy.login();
  });

  it('Searches for Policy Number ', () => {
    cy.url()
      .should('include', 'http://devagent.harmony-ins.com:8383/')
      .then(() => { 
        cy.get('.policy > span').click();
        cy.get('[data-test=policyNumber_input] > input').type('12-1010966-01');
      });
    });
});