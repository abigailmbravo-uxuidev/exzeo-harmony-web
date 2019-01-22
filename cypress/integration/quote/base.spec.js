describe('Agency Happy Path', () => {
  before('gets fixtures', function () {
    cy.fixture('defaultUser').as('user');
    cy.fixture('defaultUnderwriting').as('underwriting')
  });
<<<<<<< HEAD
  
  it('Navigates through the quote workflow', function () {
    const { underwriting, user } = this;
    cy.quoteWorkflow('', { user, underwriting });
  });
=======
>>>>>>> 1417ceb... Update test and lint
});
