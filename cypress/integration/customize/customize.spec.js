describe('Customize Testing', () => {
  before('Go to customize page', () => {
    cy.quoteWorkflow('customize');
  });

  const type = amnt => cy.getData('dwellingAmount_input').type(`{selectall}{backspace}${amnt}`);
  const checkError = () => cy.getData('dwellingAmount').find('> span').should('contain', 'Not a valid range.');

  it('Dwelling Limit', () => {
    type('0');
    checkError();

    cy.getData('dwellingAmount_slider_wrapper').find('> span').last().then($el => {
      const max = $el.text().replace(/[^0-9]/g, '');
      type(parseInt(max) + 10000);
      checkError();
    });

    cy.getData('dwellingAmount_slider_wrapper').find('> span').first().then($el => {
      const min = $el.text().replace(/[^0-9]/g, '');
      type(parseInt(min) - 1000);
      checkError();
    });
  });
});