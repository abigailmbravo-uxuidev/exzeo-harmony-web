import { user } from '../fixtures';

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
    .wrap(headers)
    .each(header => cy.checkDetailHeader(header))
    .findDataTag('policyholder-details')
    .click()
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
    // toggle the second policyholder fields to remove 2nd
    .findDataTag('additionalPolicyholder')
    .click()
    .clickSubmit('.modal', 'modal-submit')
    //.wait('@updateQuote')
    // .then(({ request }) =>
    //   expect(
    //     request.body.data.quote.policyHolders.length,
    //     'Policyholders in request'
    //   ).to.equal(1)
    // )
    .wait('@updateQuote')
    .then(({ response }) => {
      expect(response.body.status).to.equal(200);
    })
    .get('.policyholder-details .contact-card-wrapper .contact-card')
    .should('have.length', 1);
