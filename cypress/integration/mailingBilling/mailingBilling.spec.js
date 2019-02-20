import routes from "../../support/routes";
import {
  navLanding,
  navSearchAddress,
  navCustomerInfo,
  navUnderwriting,
  navCustomize,
  navShare,
  navAssumptions,
  navAdditionalInterests
} from '../../helpers';

describe('Mailing/Billing Testing', () => {
  const fields = ['address1', 'city', 'state', 'zip'];

  before(() => {
    routes();
    cy.login();
    navLanding();
    navSearchAddress();
    navCustomerInfo();
    navUnderwriting();
    navCustomize();
    navShare();
    navAssumptions();
    navAdditionalInterests();
  });

  it('All Mailing Address Inputs Empty Value', () => {
    cy.clearAllText(fields);

    cy.submitAndCheckValidation(fields);
  });

  it('Mailing Address Empty Value', () => {
    cy.fixture('stockData/mailing').then(mailing => {
      cy.clearAllText(fields);
      
      fields.forEach(leaveBlank => cy.verifyForm(fields, [leaveBlank], mailing));
    });
  });

  it('Mailing Address Invalid Input Value', () => {
    cy.clearAllText(fields);

    cy.verifyForm(['state'], undefined, { state: 'foo ' }, { errors: ['Only 2 letters allowed'] });

    cy.verifyForm(['zip'], undefined, { zip: '123456789' }, { errors: ['Only 8 letters or numbers allowed'] });
  });
});
