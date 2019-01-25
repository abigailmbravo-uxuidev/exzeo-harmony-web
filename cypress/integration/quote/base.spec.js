describe('Agency Happy Path', () => {
  before('gets fixtures', () => {
    cy.fixture('user').as('user');
    cy.fixture('underwriting').as('underwriting');
  });
  
  it('Navigates through the quote workflow', function () {
    const { underwriting, user } = this;
    cy.quoteWorkflow('', { user, underwriting });
  });
});
