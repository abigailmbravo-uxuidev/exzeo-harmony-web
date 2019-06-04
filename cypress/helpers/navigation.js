import { userHO3, underwritingHO3 } from '../fixtures';

// Functions which navigate through each page
export const navigateThroughLanding = () => cy.get('.btn[href="/search/address"]').click();

export const navigateThroughSearchAddress = ({ address = userHO3.address } = {}) =>
  cy.get('input[name=address]').type(address)
    .clickSubmit('#SearchBar')
    .findDataTag('search-results').find('li[tabindex=0]').click()
    .wait('@fetchAddresses');

export const navigateThroughPolicyholder = ({ customerInfo = userHO3.customerInfo, secondCustomerInfo = userHO3.secondCustomerInfo, agentCode = userHO3.agentCode } = {}) =>
  cy.wrap(Object.entries(customerInfo)).each(([field, value]) => cy.findDataTag(field).find('input').type(`{selectall}{backspace}${value}`))
    // If the additional policyholder toggle is off, turn it on.
    .findDataTag('additionalPolicyholder').then($div => (!$div.attr('data-value') || $div.attr('data-value') === 'false') && cy.wrap($div).click())
    // Add the secondary policyholder data.
    .wrap(Object.entries(secondCustomerInfo)).each(([field, value]) => cy.findDataTag(field).find('input').type(`{selectall}{backspace}${value}`))
    // Select agent.
    .findDataTag('agentCode').select(agentCode)
    // Submit.
    .clickSubmit('#QuoteWorkflow').wait('@updateQuote')
    // We expect to have two policyholders in the response.
    .then(({ response }) => expect(response.body.result.policyHolders.length, 'Policyholders in response').to.equal(2));

export const navigateThroughUnderwriting = (data = underwritingHO3) =>
  cy.wrap(Object.entries(data)).each(([name, value]) => cy.findDataTag(`underwritingAnswers.${name}.answer_${value}`).click())
    .clickSubmit('#QuoteWorkflow').wait('@updateQuote');

export const navigateThroughCustomize = () =>
  cy.clickSubmit('#QuoteWorkflow').wait('@updateQuote');

export const navigateThroughShare = () => cy.clickSubmit('#QuoteWorkflow');

export const navigateThroughAssumptions = () => cy.findDataTag('confirm-assumptions').click()
    .clickSubmit('#QuoteWorkflow');

export const navigateThroughAdditionalInterests = () =>
  cy.clickSubmit('#QuoteWorkflow');

export const navigateThroughMailingBilling = () =>
  cy.wait('@getBillingOptions')
    .findDataTag('sameAsPropertyAddress')
    // If the toggle is off, turn it on
    .then($div => ((!$div.attr('data-value') || $div.attr('data-value') === 'false')) && cy.findDataTag('sameAsPropertyAddress').click())
    // Get first non-disabled option and select that value
    .get('select[name="billToId"] > option:not([disabled])').first()
    .then($option => cy.get('select[name = "billToId"]').select($option.val()))
    .clickSubmit('#QuoteWorkflow').wait('@updateQuote');

export const navigateThroughVerify = () =>
  cy.findDataTag('confirmProperty').click()
    .findDataTag('confirmQuote').click()
    .findDataTag('confirmPolicy').click()
    .findDataTag('confirmAdditionalInterest').click()
    .clickSubmit('#QuoteWorkflow', 'next');

export const navigateThroughScheduleDate = () => cy.clickSubmit('[data-test="schedule-date-modal"]', 'modal-submit');

export const navigateThroughThankYou = () =>
  cy.get('#thanks a[href="/"]').click()
    .get('div.dashboard-message').should('exist');
