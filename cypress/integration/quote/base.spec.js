describe('Agency Happy Path', () => {
  before('gets fixtures', () => {
    cy.fixture('stockData/user').as('user');
    cy.fixture('stockData/underwriting').as('underwriting');
  });
  
  it('Navigates through the quote workflow', function () {
    const { underwriting, user } = this;
    cy.quoteWorkflow(undefined, undefined, { user, underwriting });
  });
});
