import userHO3 from '../fixtures/HO3/user.json';
import underwritingHO3 from '../fixtures/HO3/underwriting.json';
import customizeHO3 from '../fixtures/HO3/customizeFields';

// Functions which navigate through each page
export const navigateThroughLanding = () => cy.get('.btn[href="/search/address"]').click();

export const navigateThroughSearchAddress = ({ address = userHO3.address } = {}) =>
  cy.get('input[name=address]').type(address)
    .clickSubmit('#SearchBar')
    .findDataTag('search-results').find('li[tabindex=0]').click()
    .wait('@fetchAddresses');

export const navigateThroughPolicyholder = ({ customerInfo = userHO3.customerInfo, agentCode = userHO3.agentCode } = {}) => {
  Object.entries(customerInfo).forEach(([field, value]) =>
    cy.findDataTag(`${field}`).find('input').type(value)
  );
  cy.findDataTag('agentCode').select(agentCode)
    .clickSubmit('#QuoteWorkflow')
    .wait('@updateQuote');
};

export const navigateThroughUnderwriting = (data = underwritingHO3) => {
  Object.entries(data).forEach(([name, value]) =>
    cy.findDataTag(`underwritingAnswers.${name}.answer_${value}`).click()
  );
  cy.clickSubmit('#QuoteWorkflow').wait('@updateQuote');
};

export const navigateThroughCustomize = (data = customizeHO3) => {
  // We alter each input, reset, then recalculate before submitting
  data.forEach(({ path, value }) =>
    cy.findDataTag(`${path}-input`).type(`{selectall}{backspace}${value}`)
      .findDataTag('reset').should('contain', 'reset').click()
      .findDataTag(`${path}-input`).type(`{selectall}{backspace}${value}`)
      .findDataTag('submit').should('contain', 'recalculate').click()
      .wait('@updateQuote')
  );
  cy.clickSubmit('#QuoteWorkflow').wait('@updateQuote');
};

export const navigateThroughShare = () =>
  cy.findDataTag('share').click()
    .findDataTag('name').type('Bruce')
    .findDataTag('email').type('Batman@gmail.com')
    .clickSubmit('#SendEmail', 'modal-submit')
    .wait('@agencyEmailQuoteSummary')
    .clickSubmit('#QuoteWorkflow');

export const navigateThroughAssumptions = () => cy.findDataTag('confirm-assumptions').click()
    .clickSubmit('#QuoteWorkflow');

export const navigateThroughAdditionalInterests = () =>
  cy.clickSubmit('#QuoteWorkflow').wait('@getBillingOptions');

export const navigateThroughMailingBilling = () =>
  cy.findDataTag('sameAsPropertyAddress')
    // If the toggle is off, turn it on
    .then($div => {
      if (!$div.attr('data-value') || $div.attr('data-value') === 'false') {
        cy.findDataTag('sameAsPropertyAddress').click();
      };
    })
    // Get first non-disabled option and select that value
    .get('select[name="billToId"] > option:not([disabled])').eq(0)
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
