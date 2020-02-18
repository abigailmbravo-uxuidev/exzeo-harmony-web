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
  navigateThroughThankYou,
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

const fields = [
  { name: 'firstName', data: 'batman' },
  { name: 'lastName', data: 'robin' },
  { name: 'address', data: 'test' }
];

describe('Agency Happy Path', () => {
  before('Login', () => cy.login());
  beforeEach('Set Route Aliases', () => setRouteAliases());

  it('Navigates through the HO3 quote workflow', () => {
    navigateThroughLanding();
    navigateThroughSearchAddress();
    policyDetailsTest();
    underwritingTest();
    navigateThroughCustomize();
    shareTest();
    navigateThroughAssumptions();
    navigateThroughPolicyholder();
    additionalInterestTest();
    mailingBillingTest();
    navigateThroughMailingBilling('Yes');
    verifyTest();
    navigateThroughVerify();
    navigateThroughSendApplicationAndBind('Yes');
    searchPolicy();
    searchQoute();
  });
});
