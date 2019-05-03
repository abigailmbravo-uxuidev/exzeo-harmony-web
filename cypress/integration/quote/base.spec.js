import userAF3 from '../../fixtures/AF3/user.json';
import loginAF3 from '../../fixtures/AF3/login.json';
import underwritingAF3 from '../../fixtures/AF3/underwriting.json';
import customizeAF3 from '../../fixtures/AF3/customizeFields.json';
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
