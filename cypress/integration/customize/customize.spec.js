describe('Customize Testing', () => {
  before('Go to customize page', () => {
    cy.quoteWorkflow('customize');
  });

  const type = amnt => cy.findDataTag('dwellingAmount_input').type(`{selectall}{backspace}${amnt}`);

  it('Dwelling Limit', () => {
    type('0');
    cy.checkError('dwellingAmount', 'Not a valid range.');

    type('124000');
    cy.checkError('dwellingAmount', 'Not a valid range.');

    type('2100000');
    cy.checkError('dwellingAmount', 'Not a valid range.');
  });
});
