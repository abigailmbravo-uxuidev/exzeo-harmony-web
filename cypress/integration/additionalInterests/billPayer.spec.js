import { goBack } from './utils';
import routes from '../../support/routes';
import {
  navLanding,
  navSearchAddress,
  navCustomerInfo,
  navUnderwriting,
  navCustomize,
  navShare,
  navAssumptions
} from '../../helpers';

describe('Premium Finance Testing', () => {
  const fields = ['name1', 'mailingAddress1', 'city', 'state', 'zip'];
  const toggleModalOn = () => cy.findDataTag('bill-payer-add').click();

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
  });

  beforeEach('Establish fixtures', () => {
    routes();
    cy.route('POST', '/cg/complete?addAdditionalAIs', 'fx:stubs/addAdditionalAIs/billpayer')
      .fixture('stockData/additionalUser').as('user');
  });

  it('All Premium Finance Inputs Empty Value', () => {
    goBack().then(() => {
      toggleModalOn();
      cy.clearAllText(fields)
        .submitAndCheckValidation(fields);
    });
  });

  it('Premium Finance Empty Value', function () {
    const { user } = this;
    goBack().then(() => {
      toggleModalOn();
      cy.clearAllText(fields);

      fields.forEach(leaveBlank => cy.verifyForm(fields, [leaveBlank], user));
    });
  });

  it('Premium Finance Invalid Input Value', () => {
    goBack().then(() => {
      toggleModalOn();
      cy.clearAllText(fields)
        .verifyForm(['state'], undefined, { state: 'foo' }, { errors: ['Only 2 letters allowed'] })
        .verifyForm(['zip'], undefined, { zip: '123456789' }, { errors: ['Only 8 letters or numbers allowed'] });
    });
  });
});
