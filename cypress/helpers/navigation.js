import userHO3 from '../fixtures/HO3/user.json';
import underwritingH03 from '../fixtures/HO3/underwriting.json';

// Functions which navigate through each page
export const navigateThroughLanding = () => cy.get('.btn[href="/search/address"]').click();

export const navigateThroughSearchAddress = ({ address = userHO3.address } = {})  =>
  cy.get('input[name=address]').type(address)
    .clickSubmit('#SearchBar')
    .findDataTag('search-results').find('li[tabindex=0]').click()
    .wait('@fetchAddresses');

export const navigateThroughPolicyholder = ({ customerInfo = userHO3.customerInfo, agentCode = userHO3.agentCode } = {}) => {
  Object.entries(customerInfo).forEach(([field, value]) => {
    cy.findDataTag(`${field}`).find('input').type(value);
  });
  cy.findDataTag('agentCode').select(agentCode)
    .clickSubmit('#QuoteWorkflow')
    .wait('@getQuoteServiceRequest');
};

export const navigateThroughUnderwriting = (data = underwritingH03) => {
  Object.entries(data).forEach(([name, value]) => {
    cy.findDataTag(`underwritingAnswers.${name}.answer_${value}`).click();
  });
  cy.clickSubmit('#QuoteWorkflow').wait('@getQuoteServiceRequest');
};

export const navigateThroughCustomize = () =>
  // We alter the input, reset, then recalculate before submitting
  cy.findDataTag('coverageLimits.dwelling.amount-input').type('{selectall}{backspace}300000')
    .findDataTag('reset').should('contain', 'reset').click()
    .findDataTag('coverageLimits.dwelling.amount-input').type('{selectall}{backspace}300000')
    .findDataTag('submit').should('contain', 'recalculate').click()
    .wait('@askToCustomizeDefaultQuote')
    .clickSubmit('#QuoteWorkflow').wait('@getQuoteServiceRequest');

export const navigateThroughShare = () =>
  // TODO: Fill out and share
  cy.findDataTag('share').click()
    .findDataTag('name').type('Bruce')
    .findDataTag('emailAddr').type('Batman@gmail.com')
    .clickSubmit('#SendEmail', 'modal-submit').wait('@askEmail')
    .clickSubmit('#QuoteWorkflow').wait('@getQuoteServiceRequest');

export const navigateThroughAssumptions = () => cy.findDataTag('confirm-assumptions').click()
    .clickSubmit('#QuoteWorkflow').wait('@getQuoteServiceRequest');

export const navigateThroughAdditionalInterests = () =>
  cy.clickSubmit('#AddAdditionalInterestPage').wait('@getQuoteServiceRequest');

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
    .clickSubmit('#QuoteWorkflow').wait('@getQuoteServiceRequest');

export const navigateThroughVerify = () =>
  cy.findDataTag('confirmProperyDetails').find('.switch-div').click()
    .findDataTag('confirmQuoteDetails').find('.switch-div').click()
    .findDataTag('confirmPolicyHolderDetails').find('.switch-div').click()
    .findDataTag('confirmAdditionalInterestsDetails').find('.switch-div').click()
    .clickSubmit('#Verify');

export const navigateThroughScheduleDate = () => cy.clickSubmit('.schedule-date-modal');

export const navigateThroughThankYou = () =>
  cy.get('#thanks a[href="/"]').click()
    .get('div.dashboard-message').should('exist');
