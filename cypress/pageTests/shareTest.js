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
  cy.wrap(product === 'H03' ? ho3Headers : af3Headers).each(header => cy.checkDetailHeader(header))
    .findDataTag('share').click()
    .findDataTag('name').type('Bruce')
    .findDataTag('email').type('Batman@gmail.com')
    .clickSubmit('#SendEmail', 'modal-submit')
    .wait('@agencyEmailQuoteSummary');
