
const ho3Headers = [
  { name: 'quoteNumberDetail', label: 'Quote Number', value: '-' },
  { name: 'propertyAddressDetail', label: 'Address', value: '4131 TEST ADDRESS' },
  { name: 'yearBuiltDetail', label: 'Year Built', value: '1998' },
  { name: 'constructionTypeDetail', label: 'Construction Type', value: 'MASONRY' },
  { name: 'coverageLimits.dwelling.amountDetail', label: 'Coverage A', value: '$ --' },
  { name: 'premium', 'label': 'Premium', value: '$ --' }
];

const af3Headers = [
  { name: 'quoteNumberDetail', label: 'Quote Number', value: '-' },
  { name: 'propertyAddressDetail', label: 'Address', value: '4131 TEST ADDRESS' },
  { name: 'yearBuiltDetail', label: 'Year Built', value: '1998' },
  { name: 'floodZoneDetail', label: 'Flood Zone', value: 'X' },
  { name: 'coverageLimits.building.amountDetail', label: 'Coverage A', value: '$ --' },
  { name: 'premium', 'label': 'Premium', value: '$ --' }
];

export default (product = 'HO3') =>
  cy.wrap(product === 'HO3' ? ho3Headers : af3Headers).each(header => cy.checkDetailHeader(header));
