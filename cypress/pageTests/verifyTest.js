import { userHO3 } from '../fixtures';

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
  { name: 'premium', 'label': 'Premium', value: '$ 657' }
];

export default (product = 'HO3') =>
  cy.wrap(product === 'HO3' ? ho3Headers : af3Headers).each(header => cy.checkDetailHeader(header))
    .findDataTag('policyholder-details').click()
    // If the secondary ph is not toggled, toggle it
    .findDataTag('additionalPolicyholder').then($div => (!$div.attr('data-value') || $div.attr('data-value') === 'false') && cy.wrap($div).click())
    // Fill out secondary ph
    .wrap(Object.entries(userHO3.secondCustomerInfo)).each(([field, value]) => cy.findDataTag(field).find('input').type(`{selectall}{backspace}${value}`))
    // Detoggle the second policyholder fields
    .findDataTag('additionalPolicyholder').click()
    .clickSubmit('.modal', 'modal-submit')
    .wait('@updateQuote').then(({ request }) => expect(request.body.data.policyHolders.length, 'Policyholders in request').to.equal(1))
    .get('.policyholder-details .contact-card-wrapper .contact-card').should('have.length', 1);
