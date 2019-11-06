import { userHO3 } from '../fixtures';

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

export default (product = 'HO3') =>
  cy
    .wrap(product === 'HO3' ? ho3Headers : af3Headers)
    .each(header => cy.checkDetailHeader(header))
    // Add all main ph fields
    .wrap(Object.entries(userHO3.customerInfo))
    .each(([field, value]) =>
      cy
        .findDataTag(field)
        .find('input')
        .type(`{selectall}{backspace}${value}`)
    )
    // If the secondary ph is not toggled, toggle it
    .findDataTag('additionalPolicyholder')
    .then(
      $div =>
        (!$div.attr('data-value') || $div.attr('data-value') === 'false') &&
        cy.wrap($div).click()
    )
    // Fill out secondary ph
    .wrap(Object.entries(userHO3.secondCustomerInfo))
    .each(([field, value]) =>
      cy
        .findDataTag(field)
        .find('input')
        .type(`{selectall}{backspace}${value}`)
    )

    // Detoggle the second policyholder fields
    .findDataTag('additionalPolicyholder')
    .click()
    .clickSubmit('#QuoteWorkflow')
    // Expect that there is only one policyholder submitted
    .wait('@updateQuote')
    .then(({ request }) =>
      expect(
        request.body.data.policyHolders.length,
        'Policyholders in request'
      ).to.equal(1)
    )
    // Navigate back to the page to leave app as close as we found it
    .findDataTag('tab-nav-1')
    .click();
