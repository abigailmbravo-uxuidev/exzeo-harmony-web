import { goBack } from './utils';

describe('Additional Interest Testing', () => {
  const ai1fields = ['ai1Name1', 'ai1MailingAddress1', 'ai1City', 'ai1State', 'ai1Zip'];
  const ai2fields = ['ai2Name1', 'ai2MailingAddress1', 'ai2City', 'ai2State', 'ai2Zip'];

  before(() => {
    cy.quoteWorkflow('additionalInterests');
  });

  beforeEach('Establish fixtures', () => {
    cy.fixture('ai1').as('ai1');
    cy.fixture('ai2').as('ai2');
  });

  it('All Additional Interest 1 Inputs Empty Value', () => {
    goBack().then(() => {
      cy.findDataTag('ai_add').click();
      cy.clearAllText(ai1fields);

      cy.submitAndCheckValidation(ai1fields);
    });
  });

  it('Additional Interest 1 Empty Value', function() {
    const { ai1 } = this;
    goBack().then(() => {
      cy.findDataTag('ai_add').click();
      cy.clearAllText(ai1fields);

      ai1fields.forEach(leaveBlank => cy.verifyForm(ai1fields, [leaveBlank], ai1));
    });
  });

  it('Additional Interest 1 Invalid Input Value', () => {
    goBack().then(() => {
      cy.findDataTag('ai_add').click();
      cy.clearAllText(ai1fields);

      cy.verifyForm(['ai1State'], undefined, { ai1State: 'foo' }, { errors: ['Only 2 letters allowed'] });

      cy.verifyForm(['ai1Zip'], undefined, { ai1Zip: '123456789' }, { errors: ['Only 8 letters or numbers allowed'] });
    });
  });

  it('All Additional Interest 2 Inputs Empty Value', () => {
    goBack().then(() => {
      cy.findDataTag('ai_add').click();
      cy.findDataTag('isAdditional2_switch').click();
      cy.clearAllText(ai2fields);

      cy.submitAndCheckValidation(ai2fields);
    });
  });

  it('Additional Interest 2 Empty Value', function() {
    const { ai2 } = this;
    goBack().then(() => {
      cy.findDataTag('ai_add').click();
      cy.findDataTag('isAdditional2_switch').click();
      cy.clearAllText(ai2fields);

      ai2fields.forEach(leaveBlank => cy.verifyForm(ai2fields, [leaveBlank], ai2));
    });
  });

  it('Additional Interest 2 Invalid Input Value', () => {
    goBack().then(() => {
      cy.findDataTag('ai_add').click();
      cy.findDataTag('isAdditional2_switch').click();
      cy.clearAllText(ai2fields);

      cy.verifyForm(['ai2State'], undefined, { ai2State: 'foo' }, { errors: ['Only 2 letters allowed'] });

      cy.verifyForm(['ai2Zip'], undefined, { ai2Zip: '123456789' }, { errors: ['Only 8 letters or numbers allowed'] });
    });
  });
});
