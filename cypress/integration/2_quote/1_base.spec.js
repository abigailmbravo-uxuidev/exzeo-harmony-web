import {
  userAF3,
  loginAF3,
  underwritingAF3,
  underwritingHO3,
  coverageAF3,
  coverageHO3
} from '../../fixtures';
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
    policyDetailsTest('HO3');
    underwritingTest('HO3', underwritingHO3);
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

describe('AF3 Happy Path', () => {
  before('Login', () => cy.login(loginAF3));
  beforeEach('Set Route Aliases', () => setRouteAliases());

  it('Navigates through the AF3 quote workflow', () => {
    navigateThroughLanding();
    navigateThroughSearchAddress(userAF3);
    policyDetailsTest('AF3');
    underwritingTest('AF3', underwritingAF3);
    navigateThroughCustomize(coverageAF3);
    shareTest('AF3');
    navigateThroughPolicyholder(userAF3);
    additionalInterestTest('AF3');
    mailingBillingTest('AF3');
    navigateThroughMailingBilling('Yes');
    verifyTest('AF3');
    navigateThroughVerify();
    navigateThroughSendApplicationAndBind('Yes', 'AF3');
  });
});
