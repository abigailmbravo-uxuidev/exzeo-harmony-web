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

describe('Additional Interest Testing', () => {
  const ai1fields = ['ai1Name1', 'ai1MailingAddress1', 'ai1City', 'ai1State', 'ai1Zip'];
  const ai2fields = ['ai2Name1', 'ai2MailingAddress1', 'ai2City', 'ai2State', 'ai2Zip'];
  const toggleModalOn = () => cy.findDataTag('ai-add').click();
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
    navAssumptions();;
  });

  beforeEach('Establish fixtures', () => {
    routes();
    cy.route('POST', '/cg/complete?addAdditionalAIs', 'fx:stubs/addAdditionalAIs/additionalInterest')
      .fixture('stockData/ai1').as('ai1')
      .fixture('stockData/ai2').as('ai2');
  });

  it('All Additional Interest 1 Inputs Empty Value', () => {
    goBack().then(() => {
      toggleModalOn();
      cy.clearAllText(ai1fields);

      cy.submitAndCheckValidation(ai1fields);
    });
  });

  it('Additional Interest 1 Empty Value', function() {
    const { ai1 } = this;
    goBack().then(() => {
      toggleModalOn();
      cy.clearAllText(ai1fields);

      ai1fields.forEach(leaveBlank => cy.verifyForm(ai1fields, [leaveBlank], ai1));
    });
  });

  it('Additional Interest 1 Invalid Input Value', () => {
    goBack().then(() => {
      toggleModalOn();
      cy.clearAllText(ai1fields)
        .verifyForm(['ai1State'], undefined, { ai1State: 'foo' }, { errors: ['Only 2 letters allowed'] })
        .verifyForm(['ai1Zip'], undefined, { ai1Zip: '123456789' }, { errors: ['Only 8 letters or numbers allowed'] });
    });
  });

  it('All Additional Interest 2 Inputs Empty Value', () => {
    goBack().then(() => {
      toggleModalOn();
      addAdditional();
      cy.clearAllText(ai2fields)
        .submitAndCheckValidation(ai2fields);
    });
  });

  it('Additional Interest 2 Empty Value', function() {
    const { ai2 } = this;
    goBack().then(() => {
      toggleModalOn();
      addAdditional();
      cy.clearAllText(ai2fields);

      ai2fields.forEach(leaveBlank => cy.verifyForm(ai2fields, [leaveBlank], ai2));
    });
  });

  it('Additional Interest 2 Invalid Input Value', () => {
    goBack().then(() => {
      toggleModalOn();
      addAdditional();
      cy.clearAllText(ai2fields)
        .verifyForm(['ai2State'], undefined, { ai2State: 'foo' }, { errors: ['Only 2 letters allowed'] })
        .verifyForm(['ai2Zip'], undefined, { ai2Zip: '123456789' }, { errors: ['Only 8 letters or numbers allowed'] });
    });
  });
});
