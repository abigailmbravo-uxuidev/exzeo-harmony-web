import stubAllRoutes from "../../support/stubAllRoutes";

describe('Policy Search', () => {
  before('Login', () => {
    stubAllRoutes();
    cy.login();
  });

  // it('The search bar exists on Policy tab', () => {
  //   cy.get('.policy > span').click();
  //   cy.get('#PolicySearchBar').should('exist');
  // });
});
