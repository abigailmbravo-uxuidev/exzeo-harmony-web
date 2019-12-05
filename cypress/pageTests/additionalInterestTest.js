const ho3Headers = [
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
    value: '$ 314,000'
  }
];

const af3Headers = [
  { name: 'quoteNumberDetail', label: 'Quote Number', value: '12-' },
  {
    name: 'propertyAddressDetail',
    label: 'Address',
    value: '4131 TEST ADDRESS'
  },
  { name: 'yearBuiltDetail', label: 'Year Built', value: '1998' },
  { name: 'FEMAfloodZoneDetail', label: 'FEMA Flood Zone', value: 'X' },
  {
    name: 'coverageLimits.building.amountDetail',
    label: 'Coverage A',
    value: '$ 314,000'
  }
];

export default (product = 'HO3') => {
  cy.task('log', 'Test Additional Interest Page')
    .wait('@getQuestions')
    .then(({ request }) => {
      expect(request.body.step).to.equal('additionalInterestsCSR');
    });
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
  cy.wrap(product === 'HO3' ? ho3Headers : af3Headers).each(header =>
    cy.checkDetailHeader(header)
  );

  cy.clickSubmit('div.AdditionalInterestModal', 'ai-modal-submit');
  cy.wait('@updateQuote').then(({ request, response }) => {
    expect(
      request.body.data.quote.additionalInterests.length,
      'Additional Interests: '
    ).to.equal(1);
    expect(
      response.body.result.quoteInputState,
      'Quote Input State: '
    ).to.equal('AppStarted');
  });
  cy.get('ul.result-cards li')
    .should('have.length', 1)
    .within(() => cy.get('a.remove').click())
    .findDataTag('modal-confirm')
    .click();
  cy.wait('@updateQuote').then(({ request, response }) => {
    expect(
      request.body.data.quote.additionalInterests.length,
      'Additional Interests: '
    ).to.equal(0);
    expect(
      response.body.result.quoteInputState,
      'Quote Input State: '
    ).to.equal('Qualified');
  });
  cy.get('ul.result-cards li').should('have.length', 0);
  // move on to next page
  cy.clickSubmit('#QuoteWorkflow');
};
