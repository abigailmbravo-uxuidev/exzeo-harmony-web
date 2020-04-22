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

describe('Agency Happy Path', () => {
  before('Login', () => cy.login());
  beforeEach('Set Route Aliases', () => setRouteAliases());

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
