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

describe('Additional Insured Testing', () => {
  const ains1fields = ['ains1Name1', 'ains1MailingAddress1', 'ains1City', 'ains1State', 'ains1Zip'];
  const ains2fields = ['ains2Name1', 'ains2MailingAddress1', 'ains2City', 'ains2State', 'ains2Zip'];
  const toggleModalOn = () => cy.findDataTag('ains-add').click();
  const addAdditional = () => cy.findDataTag('isAdditional2').find('.switch-div').click();

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
    cy.fixture('stockData/ains1').as('ains1');
    cy.fixture('stockData/ains2').as('ains2');
  });

  it('All Additional Insure 1 Inputs Empty Value', () => {
    goBack().then(() => {
      toggleModalOn();
      cy.clearAllText(ains1fields);

      cy.submitAndCheckValidation(ains1fields);
    });
  });

  it('Additional Insured 1 Empty Value', function() {
    const { ains1 } = this;
    goBack().then(() => {
      toggleModalOn();
      cy.clearAllText(ains1fields);

      ains1fields.forEach(leaveBlank => cy.verifyForm(ains1fields, [leaveBlank], ains1));
    });
  });

  it('Additional Insured 1 Invalid Input Value', () => {
    goBack().then(() => {
      toggleModalOn();
      cy.clearAllText(ains1fields);

      cy.verifyForm(['ains1State'], undefined, { ains1State: 'foo' }, { errors: ['Only 2 letters allowed'] });

      cy.verifyForm(['ains1Zip'], undefined, { ains1Zip: '123456789' }, { errors: ['Only 8 letters or numbers allowed'] });
    });
  });

  it('All Additional Insure 2 Inputs Empty Value', () => {
    goBack().then(() => {
      toggleModalOn();
      addAdditional();
      cy.clearAllText(ains2fields);

      cy.submitAndCheckValidation(ains2fields);
    });
  });

  it('Additional Insured 2 Empty Value', function() {
    const { ains2 } = this;
    goBack().then(() => {
      toggleModalOn();
      addAdditional();
      cy.clearAllText([...ains1fields, ...ains2fields]);

      ains1fields.forEach(leaveBlank => cy.verifyForm(ains2fields, [leaveBlank], ains2));
    });
  });

  it('Additional Insured 2 Invalid Input Value', () => {
    goBack().then(() => {
      toggleModalOn();
      addAdditional();
      cy.clearAllText([...ains1fields, ...ains2fields]);

      cy.verifyForm(['ains2State'], undefined, { ains2State: 'foo' }, { errors: ['Only 2 letters allowed'] });

      cy.verifyForm(['ains2Zip'], undefined, { ains2Zip: '123456789' }, { errors: ['Only 8 letters or numbers allowed'] });
    });
  });
});
