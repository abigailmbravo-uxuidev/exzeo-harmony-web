import stubAllRoutes from "../../support/stubAllRoutes";
import {
  navigateThroughLanding,
  navigateThroughSearchAddress,
  navigateThroughCustomerInfo,
  navigateThroughUnderwriting
} from '../../helpers';

describe('Customize Testing', () => {
  before('Go to customize page', () => {
    stubAllRoutes();
    cy.login();
    navigateThroughLanding();
    navigateThroughSearchAddress();
    navigateThroughCustomerInfo();
    navigateThroughUnderwriting();
  });

  const type = amnt =>
    cy.findDataTag('dwellingAmount').find('.range-value input').type(`{selectall}{backspace}${amnt}`);

  it('NEG:Dwelling Limit', () => {
    type('0');
    cy.checkError('dwellingAmount', 'Not a valid range.');

    type('124000');
    cy.checkError('dwellingAmount', 'Not a valid range.');

    type('2100000');
    cy.checkError('dwellingAmount', 'Not a valid range.');
  });
});
