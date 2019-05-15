import { userHO3 } from '../fixtures';

const ho3Headers = [
  { name: 'quoteNumberDetail', label: 'Quote Number', value: '-' },
  { name: 'propertyAddressDetail', label: 'Address', value: '4131 TEST ADDRESS'},
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

export default (product = 'H03') =>
  cy.wrap(product === 'H03' ? ho3Headers : af3Headers).each(header => cy.checkDetailHeader(header))
    .wrap(Object.entries(userHO3.customerInfo)).each(([field, value]) =>
      cy.findDataTag(field).find('input').type(`{selectall}{backspace}${value}`)
    )
    .findDataTag('additionalPolicyholder').then($div => (!$div.attr('data-value') || $div.attr('data-value') === 'false') && cy.wrap($div).click())
    .wrap(Object.entries(userHO3.secondCustomerInfo)).each(([field, value]) => cy.findDataTag(field).find('input').type(`{selectall}{backspace}${value}`))
    .findDataTag('agentCode').select(userHO3.agentCode)
    .findDataTag('additionalPolicyholder').click()
    .clickSubmit('#QuoteWorkflow')
    .wait('@updateQuote').then(({ request }) => expect(request.body.data.policyHolders.length).to.equal(1))
    .findDataTag('tab-nav-1').click();
