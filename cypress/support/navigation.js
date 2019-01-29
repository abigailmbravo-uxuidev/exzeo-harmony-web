export const _login = () => {
  cy.server();
  cy.route('POST', '/cg/complete').as('complete');
  cy.login();
};

export const _landing = () => cy.get('.btn[href="/search/address"]').click();

export const _searchAddress = address => {
  cy.get('input[name=address]').type(address);
  cy._submit('#SearchBar');
  cy.findDataTag('search-results').find('li[tabindex=0]').click();
  cy.wait('@complete');
};

export const _customerInfo = (customerInfo, agentCode) => {
  Object.entries(customerInfo).forEach(([field, value]) => {
    cy.findDataTag(`${field}-input`).type(value);
  });
  cy.findDataTag('agentCode-select').select(agentCode);
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
  cy.findDataTag('confirmAssumptions-switch').click();
  cy._submit('#Assumptions');
  cy.wait('@complete');
};

export const _additionalInterests = () => {
  cy._submit('#AddAdditionalInterestPage');
  cy.wait('@complete');
};

export const _mailingBilling = () => {
  cy.findDataTag('sameAsProperty-switch').click();
  cy._submit('#Billing');
  cy.wait('@complete');
};

export const _verify = () => {
  cy.findDataTag('confirmProperyDetails-switch').click();
  cy.findDataTag('confirmQuoteDetails-switch').click();
  cy.findDataTag('confirmPolicyHolderDetails-switch').click();
  cy.findDataTag('confirmAdditionalInterestsDetails-switch').click();
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