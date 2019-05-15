const ho3Headers = [
  { name: 'quoteNumberDetail', label: 'Quote Number', value: '12-' },
  { name: 'propertyAddressDetail', label: 'Address', value: '4131 TEST ADDRESS' },
  { name: 'yearBuiltDetail', label: 'Year Built', value: '1998' },
  { name: 'constructionTypeDetail', label: 'Construction Type', value: 'MASONRY' },
  { name: 'coverageLimits.dwelling.amountDetail', label: 'Coverage A', value: '$ 314,000' },
  { name: 'premium', 'label': 'Premium', value: '$ 2,667' }
];

const af3Headers = [
  { name: 'quoteNumberDetail', label: 'Quote Number', value: '12-' },
  { name: 'propertyAddressDetail', label: 'Address', value: '4131 TEST ADDRESS' },
  { name: 'yearBuiltDetail', label: 'Year Built', value: '1998' },
  { name: 'floodZoneDetail', label: 'Flood Zone', value: 'X' },
  { name: 'coverageLimits.building.amountDetail', label: 'Coverage A', value: '$ 314,000' },
  { name: 'premium', 'label': 'Premium', value: '$ 4,635' }
];

export default (product = 'H03') =>
  // Check headers first
  cy.wrap(product === 'H03' ? ho3Headers : af3Headers).each(header => cy.checkDetailHeader(header))
  // Add and remove an additional interest
    .findDataTag('mortgagee').click()
    .chooseReactSelectOption('mortgage_wrapper', 'bank of america')
    .findDataTag('name1').should('have.attr', 'value', 'BANK OF AMERICA, NA')
    .clickSubmit('div.Mortgagee', 'ai-modal-submit')
    .wait('@updateQuote')
    .get('ul.result-cards li').should('have.length', 1)
    .within(() => cy.get('a.remove').click())
    .findDataTag('modal-confirm').click()
    .wait('@updateQuote')
    .get('ul.result-cards li').should('have.length', 0);
