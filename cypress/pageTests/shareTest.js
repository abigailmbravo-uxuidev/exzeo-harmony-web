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
    value: '$ 284,000'
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
    value: '$ 267,000'
  }
];

export default (product = 'HO3') =>
  cy
    .task('log', 'Test Share Page')
    .findDataTag('share')
    .click()
    .findDataTag('name')
    .type('Bruce')
    .findDataTag('email')
    .type('Batman@gmail.com')
    // check detail header before submit (this allows time for the 'premium' animation to finish)
    .wrap(product === 'HO3' ? ho3Headers : af3Headers)
    .each(header => cy.checkDetailHeader(header))

    .clickSubmit('#sendQuoteSummary', 'modal-submit')
    .wait('@sendQuoteSummary')
    .then(({ request }) => {
      expect(request.body.data.toEmail).to.equal('Batman@gmail.com');
    })
    .clickSubmit('#QuoteWorkflow');
// .wait('@updateQuote').then(({ response }) => {
//   expect(response.body.result.quoteInputState).to.equal('Qualified');
// });
