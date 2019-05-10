export default () =>
  // Add and remove an additional interest
  cy.findDataTag('mortgagee').click()
    .chooseReactSelectOption('mortgage_wrapper', 'america\'s servicing')
    .findDataTag('name1').should('have.attr', 'value', 'AMERICA\'S SERVICING')
    .clickSubmit('div.Mortgagee', 'ai-modal-submit')
    .wait('@updateQuote')
    .get('ul.result-cards li').should('have.length', 1)
    .within(() => cy.get('a.remove').click())
    .findDataTag('modal-confirm').click()
    .wait('@updateQuote')
    .get('ul.result-cards li').should('have.length', 0);
