import { goBack } from './utils';
import stubAllRoutes from '../../support/stubAllRoutes';
import {
  navigateThroughLanding,
  navigateThroughSearchAddress,
  navigateThroughPolicyholder,
  navigateThroughUnderwriting,
  navigateThroughCustomize,
  navigateThroughShare,
  navigateThroughAssumptions
} from '../../helpers';
import m1data from '../../fixtures/stockData/mortgagee1.json';
import m2data from '../../fixtures/stockData/mortgagee2.json';
import m3data from '../../fixtures/stockData/mortgagee3.json';

describe('Mortgagee Testing', () => {
  const m1fields = ['m1Name1', 'm1MailingAddress1', 'm1City', 'm1State', 'm1Zip'];
  const m2fields = ['m2Name1', 'm2MailingAddress1', 'm2City', 'm2State', 'm2Zip'];
  const m3fields = ['m3Name1', 'm3MailingAddress1', 'm3City', 'm3State', 'm3Zip'];
  const toggleModalOn = () => cy.findDataTag('mortgagee-add').click();
  const addUser = val => cy.findDataTag(`isAdditional${val}`).find('.switch-div').click();

  before(() => {
    stubAllRoutes();
    cy.login();
    navigateThroughLanding();
    navigateThroughSearchAddress();
    navigateThroughPolicyholder();
    navigateThroughUnderwriting();
    navigateThroughCustomize();
    navigateThroughShare();
    navigateThroughAssumptions();
  });

  beforeEach('Establish fixtures', () => {
    stubAllRoutes();
    cy.route('POST', '/cg/complete?addAdditionalAIs', 'fx:stubs/addAdditionalAIs/mortgagee');
  });

  it('NEG:All Mortgagee 1 Empty Value', () => {
    goBack().then(() => {
      toggleModalOn();
      cy.clearAllText(m1fields)
        .submitAndCheckValidation(m1fields);
    });
  });

  it('NEG:Mortgagee 1 Empty Value', () => {
    goBack().then(() => {
      toggleModalOn();
      cy.clearAllText(m1fields);

      m1fields.forEach(leaveBlank => cy.verifyForm(m1fields, [leaveBlank], m1data));
    });
  });

  it('NEG:Mortgagee 1 Invalid Input Value', () => {
    goBack().then(() => {
      toggleModalOn();
      cy.clearAllText(m1fields)
        .verifyForm(['m1State'], undefined, { m1State: 'foo' }, { errors: ['Only 2 letters allowed'] })
        .verifyForm(['m1Zip'], undefined, { m1Zip: '123456789' }, { errors: ['Only 8 letters or numbers allowed'] });
    });
  });

  it('NEG:All Mortgagee 2 Empty Input Value', () => {
    goBack().then(() => {
      toggleModalOn();
      addUser(2);
      cy.clearAllText(m2fields)
        .submitAndCheckValidation(m2fields);
    });
  });

  it('NEG:Mortgagee 2 Empty Value', () => {
    goBack().then(() => {
      toggleModalOn();
      addUser(2);
      cy.clearAllText(m2fields);

      m2fields.forEach(leaveBlank => cy.verifyForm(m2fields, [leaveBlank], m2data));
    });
  });

  it('NEG:Mortgagee 2 Invalid Input', () => {
    goBack().then(() => {
      toggleModalOn();
      addUser(2);
      cy.clearAllText(m2fields)
        .verifyForm(['m2State'], undefined, { m2State: 'foo' }, { errors: ['Only 2 letters allowed'] })
        .verifyForm(['m2Zip'], undefined, { m2Zip: '123456789' }, { errors: ['Only 8 letters or numbers allowed'] });
    });
  });

  it('NEG:All Mortgagee 3 Empty Input Value', () => {
    goBack().then(() => {
      toggleModalOn();
      addUser(2);
      addUser(3);

      cy.clearAllText(m3fields).submitAndCheckValidation(m3fields);
    });
  });

  it('NEG:Mortgagee 3 Empty Value', () => {
    goBack().then(() => {
      toggleModalOn();
      addUser(2);
      addUser(3);
      cy.clearAllText(m3fields);

      m3fields.forEach(leaveBlank => cy.verifyForm(m3fields, [leaveBlank], m3data));
    });
  });

  it('NEG:Mortgagee 3 Invalid Input Value', () => {
    goBack().then(() => {
      toggleModalOn();
      addUser(2);
      addUser(3);

      cy.clearAllText(m3fields)
        .verifyForm(['m3State'], undefined, { m3State: 'foo' }, { errors: ['Only 2 letters allowed'] })
        .verifyForm(['m3Zip'], undefined, { m3Zip: '123456789' }, { errors: ['Only 8 letters or numbers allowed'] });
    });
  });
});
