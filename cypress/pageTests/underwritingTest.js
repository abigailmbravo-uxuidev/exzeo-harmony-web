import { underwritingHO3 } from '../fixtures/HO3';

const ho3Headers = [
  { name: 'quoteNumberDetail', label: 'Quote Number', value: '-' },
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
    value: '$ --'
  },
  { name: 'premium', label: 'Premium', value: '$ --' }
];

const af3Headers = [
  { name: 'quoteNumberDetail', label: 'Quote Number', value: '-' },
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
    value: '$ --'
  },
  { name: 'premium', label: 'Premium', value: '$ --' }
];

export default (product = 'HO3', underwriting = underwritingHO3) =>
  cy
    .task('log', 'Test Underwriting Page')
    .wrap(Object.entries(underwriting))
    .each(([name, value]) =>
      cy.findDataTag(`underwritingAnswers.${name}.answer_${value}`).click()
    )
    // Test headers before submit
    .wrap(product === 'HO3' ? ho3Headers : af3Headers)
    .each(header => cy.checkDetailHeader(header))
    // ----------------------------------------------
    .clickSubmit('#QuoteWorkflow')
    .wait('@updateQuote')
    .then(({ response }) => {
      expect(response.body.result.quoteInputState).to.equal('Qualified');
    });
