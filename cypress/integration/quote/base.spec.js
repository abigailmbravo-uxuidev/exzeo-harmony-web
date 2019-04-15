import user from '../../fixtures/stockData/user.json';
import underwriting from '../../fixtures/stockData/underwriting.json';
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
  const { address, customerInfo, agentCode } = user;

  before('gets fixtures', () => {
    setRouteAliases();
    cy.login();
  });

  beforeEach(() => setRouteAliases());

  it('Navigates through the quote workflow', () => {
    navigateThroughLanding();
    navigateThroughSearchAddress(address);
    navigateThroughPolicyholder(customerInfo, agentCode);
    navigateThroughUnderwriting(underwriting);
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
