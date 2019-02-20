import routes from "../../support/routes";

describe('Agency Happy Path', () => {
  before('gets fixtures', () => {
    cy.fixture('stockData/user').as('user');
    cy.fixture('stockData/underwriting').as('underwriting');
    routes(true)
    cy.login();
  });

  beforeEach(() => routes(true))
  
  it('Navigates through the quote workflow', function () {
    const { underwriting, user } = this;
    cy.quoteWorkflow(undefined, undefined, { user, underwriting });
  });
});
