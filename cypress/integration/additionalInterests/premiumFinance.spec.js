import { goBack } from './utils';
import stubAllRoutes from '../../support/stubAllRoutes';
import {
  navigateThroughLanding,
  navigateThroughSearchAddress,
  navigateThroughCustomerInfo,
  navigateThroughUnderwriting,
  navigateThroughCustomize,
  navigateThroughShare,
  navigateThroughAssumptions
} from '../../helpers';
import user from '../../fixtures/stockData/additionalUser.json';


describe('Premium Finance Testing', () => {
  const fields = ['name1', 'mailingAddress1', 'city', 'state', 'zip'];
  const toggleModalOn = () => cy.findDataTag('premium-finance-add').click();

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
  });

  beforeEach('Establish fixtures', () => {
    stubAllRoutes();
    cy.route('POST', '/cg/complete?addAdditionalAIs', 'fx:stubs/addAdditionalAIs/premiumFinance');
  });

  it('NEG:All Premium Finance Inputs Empty Value', () => {
    goBack().then(() => {
      toggleModalOn();
      cy.clearAllText(fields).submitAndCheckValidation(fields);
    });
  });

  it('NEG:Premium Finance Empty Value', () => {
    goBack().then(() => {
      toggleModalOn();
      cy.clearAllText(fields)
        .verifyForm(fields, ['name1'], user)
        .verifyForm(fields, ['mailingAddress1'], user)
        .verifyForm(fields, ['city'], user)
        .verifyForm(fields, ['state'], user)
        .verifyForm(fields, ['zip'], user);
    });
  });

  it('NEG:Premium Finance Invalid Input Value', () => {
    goBack().then(() => {
      toggleModalOn();
      cy.clearAllText(fields)
        .verifyForm(['state'], undefined, { state: 'foo' }, { errors: ['Only 2 letters allowed'] })
        .verifyForm(['zip'], undefined, { zip: '123456789' }, { errors: ['Only 8 letters or numbers allowed'] });
    });
  });
});
