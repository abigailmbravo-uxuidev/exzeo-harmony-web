const headers = [
  { name: 'quoteNumberDetail', label: 'Quote Number', value: '12-' },
  {
    name: 'propertyAddressDetail',
    label: 'Address',
    value: '4131 TEST ADDRESS'
  },
  { name: 'yearBuiltDetail', label: 'Year Built', value: '1998' },
  {
    name: 'constructionTypeDetail',
    label: 'Construction Type',
    value: 'MASONRY'
  },
  {
    name: 'coverageLimits.dwelling.amountDetail',
    label: 'Coverage A',
    value: '$284,000'
  }
];

export default () => {
  // Add and remove an additional interest
  cy.findDataTag('mortgagee')
    .click()
    .findDataTag('modal')
    .should('exist')
    .chooseReactSelectOption(
      'mortgage_wrapper',
      'bank of america',
      'input#mortgagee-search'
    )
    .findDataTag('name1')
    .should('have.attr', 'value', 'BANK OF AMERICA, NA');
  // Check header before submit
  cy.wrap(headers).each(header => cy.checkDetailHeader(header));

  cy.clickSubmit('div.AdditionalInterestModal', 'ai-modal-submit');
  cy.wait('@updateQuote').then(({ response }) => {
    expect(response.body.status).to.equal(200);
  });
  cy.task('log', 'Delete the mortgagee')
    .get('ul.result-cards li')
    .should('have.length', 1)
    .within(() => cy.get('a.remove').click())
    .findDataTag('modal-confirm')
    .click();
  cy.wait('@updateQuote').then(({ response }) => {
    expect(response.body.status).to.equal(200);
  });
  cy.get('ul.result-cards li').should('have.length', 0);
  //move on to next page
  cy.clickSubmit('#QuoteWorkflow');
};
