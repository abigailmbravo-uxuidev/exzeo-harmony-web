import user from '../../fixtures/HO3/user.json';
import underwriting from '../../fixtures/HO3/underwriting.json';
import af3Login from '../../fixtures/AF3/login.json';
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

describe('Agency Happy Path', () => {
  before('Set Route Aliases', () => {
    setRouteAliases();
    cy.login();
  });

  beforeEach(() => setRouteAliases());

  it('Navigates through the HO3 quote workflow', () => {
    navigateThroughLanding();
    navigateThroughSearchAddress();
    navigateThroughPolicyholder();
    navigateThroughUnderwriting();
    navigateThroughCustomize();
    navigateThroughShare();
    navigateThroughAssumptions();
    navigateThroughAdditionalInterests();
    navigateThroughMailingBilling();
    navigateThroughVerify();
    navigateThroughScheduleDate();
    navigateThroughThankYou();
  });
});

describe('AF3 Happy Path', () => {
  before('Set Route Aliases', () => {
    setRouteAliases();
    cy.login(loginAF3);
  });

  beforeEach(() => setRouteAliases());

  it('Navigates through the AF3 quote workflow', () => {
    navigateThroughLanding();
    cy.findDataTag('product').select('AF3');
    navigateThroughSearchAddress(userAF3);
    navigateThroughPolicyholder(userAF3);
    navigateThroughUnderwriting(underwritingAF3);
    navigateThroughCustomize(customizeAF3);
    navigateThroughShare();
    navigateThroughAssumptions();
    navigateThroughAdditionalInterests();
    navigateThroughMailingBilling()
    navigateThroughVerify();
    navigateThroughScheduleDate();
    navigateThroughThankYou();
  });
});
