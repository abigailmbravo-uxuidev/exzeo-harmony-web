import { userHO3, underwritingHO3 } from '../fixtures';

// Functions which navigate through each page
export const navigateThroughLanding = () =>
  cy
    .task('log', 'Navigating through Landing')
    .get('.new-quote[href="/search/address"]')
    .click();

export const navigateThroughSearchAddress = ({
  address = userHO3.address
} = {}) =>
  cy
    .task('log', 'Navigating through Searching Address')
    .get('input[name=address]')
    .type(address)
    .clickSubmit('#SearchBar')
    .findDataTag('search-results')
    .find('li[tabindex=0]')
    .click()
    .wait('@fetchAddresses');

export const navigateThroughPolicyholder = ({
  customerInfo = userHO3.customerInfo,
  secondCustomerInfo = userHO3.secondCustomerInfo,
  agentCode = userHO3.agentCode
} = {}) =>
  cy
    .task('log', 'Navigating through Policyholder')
    .wrap(Object.entries(customerInfo))
    .each(([field, value]) =>
      cy
        .findDataTag(field)
        .find('input')
        .type(`{selectall}{backspace}${value}`)
    )
    // If the additional policyholder toggle is off, turn it on.
    .findDataTag('additionalPolicyholder')
    .then(
      $div =>
        (!$div.attr('data-value') || $div.attr('data-value') === 'false') &&
        cy.wrap($div).click()
    )
    // Add the secondary policyholder data.
    .wrap(Object.entries(secondCustomerInfo))
    .each(([field, value]) =>
      cy
        .findDataTag(field)
        .find('input')
        .type(`{selectall}{backspace}${value}`)
    )
    // Select agent.
    .findDataTag('agentCode')
    .select(agentCode)
    // Submit.
    .clickSubmit('#QuoteWorkflow')
    .wait('@updateQuote')
    // We expect to have two policyholders in the response.
    .then(({ response }) =>
      expect(
        response.body.result.policyHolders.length,
        'Policyholders in response'
      ).to.equal(2)
    );

export const navigateThroughUnderwriting = (data = underwritingHO3) =>
  cy
    .task('log', 'Navigating through Underwriting')
    .wrap(Object.entries(data))
    .each(([name, value]) =>
      cy.findDataTag(`underwritingAnswers.${name}.answer_${value}`).click()
    )
    .clickSubmit('#QuoteWorkflow')
    .wait('@updateQuote');

export const navigateThroughCustomize = () =>
  cy
    .task('log', 'Navigating through Customize')
    .clickSubmit('#QuoteWorkflow')
    .wait('@updateQuote');

export const navigateThroughShare = () =>
  cy.task('log', 'Navigating through Share').clickSubmit('#QuoteWorkflow');

export const navigateThroughAssumptions = () =>
  cy
    .task('log', 'Navigating through Confirm Assumptions')
    .findDataTag('confirm-assumptions')
    .click()
    .clickSubmit('#QuoteWorkflow');

export const navigateThroughAdditionalInterests = () =>
  cy
    .task('log', 'Navigating through Additional Interests')
    .clickSubmit('#QuoteWorkflow');

export const navigateThroughMailingBilling = () =>
  cy
    .task('log', 'Navigating through Mailing Billing')
    .wait('@getBillingOptions')
    .wait(500)
    .findDataTag('sameAsPropertyAddress')
    // If the toggle is off, turn it on
    .then(
      $div =>
        (!$div.attr('data-value') || $div.attr('data-value') === 'false') &&
        cy.findDataTag('sameAsPropertyAddress').click()
    )
    // Get first non-disabled option and select that value
    .get('select[name="billToId"] > option:not([disabled])')
    .first()
    .then($option => cy.get('select[name = "billToId"]').select($option.val()))
    .clickSubmit('#QuoteWorkflow')
    .wait('@updateQuote')
    .wait('@verifyQuote');

export const navigateThroughVerify = () =>
  cy
    .task('log', 'Navigating through Verify')
    .findDataTag('confirmProperty')
    .click()
    .findDataTag('confirmQuote')
    .click()
    .findDataTag('confirmPolicy')
    .click()
    .findDataTag('confirmAdditionalInterest')
    .click()
    .clickSubmit('#QuoteWorkflow', 'next');

export const navigateThroughScheduleDate = () =>
  cy
    .task('log', 'Navigating through Schedule Date')
    .clickSubmit('[data-test="schedule-date-modal"]', 'modal-submit');

export const navigateThroughThankYou = () =>
  cy
    .task('log', 'Navigating through Thank You')
    .get('#thanks a[href="/"]')
    .click()
    .get('div.dashboard-message')
    .should('exist');
