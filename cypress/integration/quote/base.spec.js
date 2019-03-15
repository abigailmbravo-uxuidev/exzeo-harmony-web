import user from '../../fixtures/stockData/user.json';
import underwriting from '../../fixtures/stockData/underwriting.json';
import {
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
import stubAllRoutes from '../../support/stubAllRoutes';

describe('Agency Happy Path', () => {
  const { address, customerInfo, agentCode } = user;

  before('gets fixtures', () => {
    stubAllRoutes(true);
    cy.login();
  });

  beforeEach(() => stubAllRoutes(true));

  it('Navigates through the quote workflow', () => {
    navigateThroughLanding();
    navigateThroughSearchAddress(address);
    navigateThroughPolicyholder(customerInfo, agentCode);
    navigateThroughUnderwriting(underwriting, undefined, true);
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
