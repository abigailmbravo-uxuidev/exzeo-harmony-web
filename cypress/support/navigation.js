export const _landing = () => cy.get('.btn[href="/search/address"]').click();

export const _searchAddress = address => {
  cy.get('input[name=address]').type(address);
  cy._submit('#SearchBar');
  cy.findDataTag('search-results').find('li[tabindex=0]').click();
  cy.wait('@complete');
};

export const _customerInfo = (customerInfo, agentCode) => {
  Object.entries(customerInfo).forEach(([field, value]) => {
    cy.findDataTag(`${field}`).find('input').type(value);
  });
  cy.findDataTag('agentCode').find('select').select(agentCode);
  cy._submit('#CustomerInfo');
  cy.wait('@complete');
};

export const _underwriting = data => {
  Object.entries(data).forEach(([name, value]) => {
    cy.get(`input[name="${name}"][value="${value}"] + span`).click();
  });
  cy._submit('#Underwriting');
  cy.wait('@complete');
};

export const _customize = () => {
  cy._submit('#Customize');
  cy.wait('@complete');
};

export const _share = () => {
  cy._submit('#SharePage');
  cy.wait('@complete');
};

export const _assumptions = () => {
  cy.findDataTag('confirmAssumptions').find('.switch-div').click();
  cy._submit('#Assumptions');
  cy.wait('@complete');
};

export const _additionalInterests = () => {
  cy._submit('#AddAdditionalInterestPage');
  cy.wait('@complete');
};

export const _mailingBilling = () => {
  cy.findDataTag('sameAsProperty').find('.switch-div').click();
  cy._submit('#Billing');
  cy.wait('@complete');
};

export const _verify = () => {
  cy.findDataTag('confirmProperyDetails').find('.switch-div').click();
  cy.findDataTag('confirmQuoteDetails').find('.switch-div').click();
  cy.findDataTag('confirmPolicyHolderDetails').find('.switch-div').click();
  cy.findDataTag('confirmAdditionalInterestsDetails').find('.switch-div').click();
  cy._submit('#Verify');
};

export const _scheduleDate = () => {
  cy._submit('.modal');
  cy.wait('@complete');
};

export const _thankYou = () => {
  cy.get('#thanks a[href="/"]').click();
  cy.url().should('eq', `${Cypress.config().baseUrl}/`);
};