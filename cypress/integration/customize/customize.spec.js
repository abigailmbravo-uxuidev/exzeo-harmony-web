import routes from "../../support/routes";
import {
  navLanding,
  navSearchAddress,
  navCustomerInfo,
  navUnderwriting
} from '../../helpers';

describe('Customize Testing', () => {
  before('Go to customize page', () => {
    routes();
    cy.login();
    navLanding();
    navSearchAddress();
    navCustomerInfo();
    navUnderwriting();
  });

  const type = amnt => cy.findDataTag('dwellingAmount').find('.range-value input').type(`{selectall}{backspace}${amnt}`);

  it('Dwelling Limit', () => {
    type('0');
    cy.checkError('dwellingAmount', 'Not a valid range.');

    type('124000');
    cy.checkError('dwellingAmount', 'Not a valid range.');

    type('2100000');
    cy.checkError('dwellingAmount', 'Not a valid range.');
  });
});
