describe('Search Policy test - 1 Policyholder', () => {
  beforeEach('Login', () => {
    cy.clearCookies();
    cy.login();
  });

  it('Search for Policy by Policyholder Name and partial address', () => {
    cy.url()
      .should('include', 'http://devagent.harmony-ins.com:8383/')
      .then(() => {
        cy.get('.policy > span').click();
        cy.get('input[name=firstName]').type('BATMAN');
        cy.get('input[name=lastName]').type('ROBIN A002');
        cy.get('input[name=address]').type('1917 TEST ADDRESS');
        cy.get('#PolicySearchBar').submit();
        cy.get('.results-wrapper > div.quote-list').should('exist')
          .then(() => {
            cy.server();
            cy.route({
              method: 'POST',
              url: '/svc',
              response: 'fixture:policySearchResultPolicy.json'
            }).as('policyData');

            cy.get('.quote-list > .card > section').first().click();
          });
      });
  });
});