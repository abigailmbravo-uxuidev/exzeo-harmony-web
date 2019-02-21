import _ from 'lodash';

import { stub } from '.';
import user from '../fixtures/stockData/user.json';
import underwriting from '../fixtures/stockData/underwriting.json';
import serviceFx from '../fixtures/stubs/getQuoteServiceRequest.json';

const stubGetServiceRequest = (fixture, result, useConfig = false) => {
  _.merge(fixture, { result });
  cy.server().route('POST', '/svc?getQuoteServiceRequest', useConfig ? stub(fixture) : fixture).as('getQuoteServiceRequest');
};

export const navLanding = () => cy.get('.btn[href="/search/address"]').click();

export const navSearchAddress = (address = user.address)  =>
  cy.get('input[name=address]').type(address)
    .clickSubmit('#SearchBar')
    .findDataTag('search-results').find('li[tabindex=0]').click()
    .wait('@fetchAddresses');

export const navCustomerInfo = (customerInfo = user.customerInfo, agentCode = user.agentCode) => {
  Object.entries(customerInfo).forEach(([field, value]) => {
    cy.findDataTag(`${field}`).find('input').type(value);
  });
  cy.findDataTag('agentCode').find('select').select(agentCode)
    .clickSubmit('#CustomerInfo')
    .log('customerinfo')
    .wait('@getQuoteServiceRequest');
};

export const navUnderwriting = (data = underwriting, fixture, updates, useConfig) => {
  if (!fixture) { fixture = _.cloneDeep(serviceFx); };
  if (!updates) {
    updates = {
      underwritingAnswers: { business: { answer: "No" } },
      rating: { netPremium: 2640, totalPremium: 2667}
    };
  };
  stubGetServiceRequest(fixture, updates, useConfig);
  Object.entries(data).forEach(([name, value]) => {
    cy.get(`input[name="${name}"][value="${value}"] + span`).click();
  });
  cy.clickSubmit('#Underwriting').wait('@getQuoteServiceRequest');
};

export const navCustomize = () => cy.clickSubmit('#Customize').wait('@getQuoteServiceRequest');

export const navShare = () => cy.clickSubmit('#SharePage').wait('@getQuoteServiceRequest');

export const navAssumptions = () =>
  cy.findDataTag('confirmAssumptions').find('.switch-div').click()
    .clickSubmit('#Assumptions').wait('@getQuoteServiceRequest');

export const navAdditionalInterests = () =>
  cy.clickSubmit('#AddAdditionalInterestPage').wait('@getQuoteServiceRequest');

export const navMailingBilling = () => {
  cy.findDataTag('sameAsProperty').find('input')
    // If the toggle is off, turn it on
    .then($input => {
      if ($input.val() === 'false') {
        cy.findDataTag('sameAsProperty').find('.switch-div').click();
      };
    })
    // Get first non-disabled option and select that value
    .get('select[name="billToId"] > option:not([disabled])').eq(0)
    .then($option => cy.get('select[name = "billToId"]').select($option.val()))
    .clickSubmit('#Billing').wait('@getQuoteServiceRequest');
};

export const navVerify = () =>
  cy.findDataTag('confirmProperyDetails').find('.switch-div').click()
    .findDataTag('confirmQuoteDetails').find('.switch-div').click()
    .findDataTag('confirmPolicyHolderDetails').find('.switch-div').click()
    .findDataTag('confirmAdditionalInterestsDetails').find('.switch-div').click()
    .clickSubmit('#Verify');

export const navScheduleDate = () => cy.clickSubmit('.modal').wait('@getQuoteServiceRequest');

export const navThankYou = () =>
  cy.get('#thanks a[href="/"]').click()
    .url().should('eq', `${Cypress.config().baseUrl}/`);

