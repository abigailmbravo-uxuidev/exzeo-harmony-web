describe('Customize Testing', () => {
  before('Go to customize page', () => {
    cy.quoteWorkflow('customize');
  });

  const type = amnt => cy.findDataTag('dwellingAmount_input').type(`{selectall}{backspace}${amnt}`);
  const checkError = () => cy.findDataTag('dwellingAmount').find('> span').should('contain', 'Not a valid range.');

  it('Dwelling Limit', () => {
    type('0');
    checkError();

    type('124000');
    checkError();

    type('2100000');
    checkError();
  });
});
