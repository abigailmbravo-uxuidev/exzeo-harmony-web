import { user } from '../fixtures';

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

export default (product = 'HO3') =>
  cy
    .wrap(headers)
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
    .wrap(Object.entries(user.secondCustomerInfo))
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
        request.body.data.quote.policyHolders.length,
        'Policyholders in request'
      ).to.equal(1)
    )
    // Navigate back to the page to leave app as close as we found it
    .findDataTag('tab-nav-1')
    .click();
