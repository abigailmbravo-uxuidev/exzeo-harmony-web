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
    value: '$ 284,000'
  }
];
export default () =>
  cy
    .task('log', 'Test Share Page')
    .findDataTag('share')
    .click()
    .findDataTag('name')
    .type('Bruce')
    .findDataTag('email')
    .type('Batman@gmail.com')
    // check detail header before submit (this allows time for the 'premium' animation to finish)
    .wrap(headers)
    .each(header => cy.checkDetailHeader(header))

    .clickSubmit('#sendQuoteSummary', 'modal-submit')
    .wait('@sendQuoteSummary')
    .then(({ response }) => {
      expect(response.body.status).to.equal(200);
      ////expect(request.body.data.toEmail).to.equal('Batman@gmail.com');
    })
    .clickSubmit('#QuoteWorkflow');
//// .wait('@updateQuote').then(({ response }) => {
////   expect(response.body.result.quoteInputState).to.equal('Qualified');
//// });
