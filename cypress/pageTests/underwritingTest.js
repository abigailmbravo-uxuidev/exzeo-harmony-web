import { underwriting } from '../fixtures/HO3';

const headers = [
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

export default (data = underwriting) =>
  cy
    .wrap(Object.entries(data))
    .each(([name, value]) =>
      cy.findDataTag(`underwritingAnswers.${name}.answer_${value}`).click()
    )
    // Test headers before submit
    .wrap(headers)
    .each(header => cy.checkDetailHeader(header))
    // ----------------------------------------------
    .clickSubmit('#QuoteWorkflow')
    .wait('@updateQuote')
    .then(({ response }) => {
      expect(response.body.status).to.equal(200);
    });
