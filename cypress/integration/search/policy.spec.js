import stubAllRoutes from "../../support/stubAllRoutes";

describe('Policy Search', () => {
  before('Login', () => {
    stubAllRoutes();
    cy.login();
  });

  it('The URL is accurate after logging in', () => {
    cy.url()
      .should('include', Cypress.config('baseUrl'));
  });

  it('The search bar exists on Policy tab', () => {
    cy.get('.policy > span').click();
    cy.get('#PolicySearchBar').should('exist');
  });
});
