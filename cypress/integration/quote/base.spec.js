import { userAF3, loginAF3, underwritingAF3, customizeAF3, customizeHO3 } from '../../fixtures';
import {
  setRouteAliases,
  navigateThroughLanding,
  navigateThroughSearchAddress,
  navigateThroughPolicyholder,
  navigateThroughUnderwriting,
  navigateThroughCustomize,
  navigateThroughShare,
  navigateThroughAssumptions,
  navigateThroughAdditionalInterests,
  navigateThroughMailingBilling,
  navigateThroughVerify,
  navigateThroughScheduleDate,
  navigateThroughThankYou
} from '../../helpers';
import { customizeTest, shareTest, aiTest } from '../../pageTests';

describe('Agency Happy Path', () => {
  before('Login', () => cy.login());
  beforeEach('Set Route Aliases', () => setRouteAliases());

  it('Navigates through the HO3 quote workflow', () => {
    navigateThroughLanding();
    navigateThroughSearchAddress();
    navigateThroughPolicyholder();
    navigateThroughUnderwriting();
    customizeTest(customizeHO3);
    navigateThroughCustomize();
    shareTest();
    navigateThroughShare();
    navigateThroughAssumptions();
    aiTest();
    navigateThroughAdditionalInterests();
    navigateThroughMailingBilling();
    navigateThroughVerify();
    navigateThroughScheduleDate();
    navigateThroughThankYou();
  });
});

describe('AF3 Happy Path', () => {
  before('Login', () => cy.login(loginAF3));
  beforeEach('Set Route Aliases', () => setRouteAliases());

  it('Navigates through the AF3 quote workflow', () => {
    navigateThroughLanding();
    cy.findDataTag('product').select('AF3');
    navigateThroughSearchAddress(userAF3);
    navigateThroughPolicyholder(userAF3);
    navigateThroughUnderwriting(underwritingAF3);
    customizeTest(customizeAF3);
    navigateThroughCustomize();
    shareTest();
    navigateThroughShare();
    navigateThroughAssumptions();
    aiTest();
    navigateThroughAdditionalInterests();
    navigateThroughMailingBilling();
    navigateThroughVerify();
    navigateThroughScheduleDate();
    navigateThroughThankYou();
  });
});
