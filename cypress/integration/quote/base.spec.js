import user from '../../fixtures/stockData/user.json';
import underwriting from '../../fixtures/stockData/underwriting.json';
import {
  navLanding,
  navSearchAddress,
  navCustomerInfo,
  navUnderwriting,
  navCustomize,
  navShare,
  navAssumptions,
  navAdditionalInterests,
  navMailingBilling,
  navVerify,
  navScheduleDate,
  navThankYou
} from '../../helpers';
import routes from '../../support/routes';

describe('Agency Happy Path', () => {
  const { address, customerInfo, agentCode } = user;

  before('gets fixtures', () => {
    routes(true);
    cy.login();
  });

  beforeEach(() => routes(true));

  it('Navigates through the quote workflow', () => {
    navLanding();
    navSearchAddress(address);
    navCustomerInfo(customerInfo, agentCode);
    navUnderwriting(underwriting, undefined, undefined, true);
    navCustomize();
    navShare();
    navAssumptions();
    navAdditionalInterests();
    navMailingBilling();
    navVerify();
    navScheduleDate();
    navThankYou();
  });
});
