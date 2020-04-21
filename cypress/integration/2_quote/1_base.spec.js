import {
  setRouteAliases,
  navigateThroughLanding,
  navigateThroughSearchAddress,
  navigateThroughCustomize,
  navigateThroughAssumptions,
  navigateThroughPolicyholder,
  navigateThroughMailingBilling,
  navigateThroughVerify,
  navigateThroughSendApplicationAndBind,
  ////navigateThroughThankYou,
  searchPolicy,
  searchQoute
} from '../../helpers';

import {
  policyDetailsTest,
  underwritingTest,
  shareTest,
  additionalInterestTest,
  mailingBillingTest,
  verifyTest
} from '../../pageTests';

// const fields = [
//   { name: 'firstName', data: 'batman' },
//   { name: 'lastName', data: 'robin' },
//   { name: 'address', data: 'test' }
// ];

describe('Agency Happy Path', () => {
  before('Login', () => cy.login());
  beforeEach('Set Route Aliases', () => setRouteAliases());

  ////it('Navigates through the HO3 quote workflow', () => {
  it('Start Creating a New Quote', () => {
    navigateThroughLanding();
    navigateThroughSearchAddress();
  });
  it('Policy Details Page', () => {
    policyDetailsTest();
  });
  it('Underwriting Page', () => {
    underwritingTest();
  });
  it('Customize Page', () => {
    navigateThroughCustomize();
  });
  it('Share Page', () => {
    shareTest();
    navigateThroughAssumptions();
  });
  it('Policyholder Page', () => {
    navigateThroughPolicyholder();
  });
  it('Additional Parties Page', () => {
    additionalInterestTest();
  });
  it('Mailing / Billing Page', () => {
    mailingBillingTest();
    navigateThroughMailingBilling('Yes');
  });
  it('Verify Page', () => {
    verifyTest();
    navigateThroughVerify();
  });
  it('Send to DocuSign and Bind Then Search Policy and Quote', () => {
    navigateThroughSendApplicationAndBind('Yes');
    searchPolicy();
    searchQoute();
  });
});
