import stubAllRoutes from "../../support/stubAllRoutes";
import {
  navigateThroughLanding,
  navigateThroughSearchAddress,
  navigateThroughCustomerInfo,
  navigateThroughUnderwriting,
  navigateThroughCustomize,
  navigateThroughShare,
  navigateThroughAssumptions,
  navigateThroughAdditionalInterests
} from '../../helpers';

describe('Mailing/Billing Testing', () => {
  const fields = ['address1', 'city', 'state', 'zip'];

  before(() => {
    stubAllRoutes();
    cy.login();
    navigateThroughLanding();
    navigateThroughSearchAddress();
    navigateThroughCustomerInfo();
    navigateThroughUnderwriting();
    navigateThroughCustomize();
    navigateThroughShare();
    navigateThroughAssumptions();
    navigateThroughAdditionalInterests();
  });

  it('NEG:All Mailing Address Inputs Empty Value', () => {
    cy.clearAllText(fields);

    cy.submitAndCheckValidation(fields);
  });

  it('NEG:Mailing Address Empty Value', () => {
    cy.fixture('stockData/mailing').then(mailing => {
      cy.clearAllText(fields);

      fields.forEach(leaveBlank => cy.verifyForm(fields, [leaveBlank], mailing));
    });
  });

  it('NEG:Mailing Address Invalid Input Value', () => {
    cy.clearAllText(fields);

    cy.verifyForm(['state'], undefined, { state: 'foo ' }, { errors: ['Only 2 letters allowed'] });

    cy.verifyForm(['zip'], undefined, { zip: '123456789' }, { errors: ['Only 8 letters or numbers allowed'] });
  });
});
