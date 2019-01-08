describe('Kitchen Sink Test', () => {
  it('Visits the kitchen sink', () => {
    cy.visit('https://example.cypress.io');
  });

  it('finds the content type', () => {
    cy.visit('https://example.cypress.io');

    cy.contains('type');
  });

  it('clicks the link type', () => {
    cy.visit('https://example.cypress.io').contains('type').click();
  });

  it('alternate non chain way to click link type', () => {
    cy.visit('https://example.cypress.io');

    cy.contains('type').click();
  });

  it('clicking type navigates to new url', () => {
    cy.visit('https://example.cypress.io');

    cy.contains('type').click();


    cy.url().should('include', '/commands/actions');
  });

  it('gets types and asserts', () => {
    cy.visit('https://example.cypress.io');

    cy.contains('type').click();

    cy.get('.action-email').type('fake@email.com').should('have.value', 'fake@email.com');
  });
});
