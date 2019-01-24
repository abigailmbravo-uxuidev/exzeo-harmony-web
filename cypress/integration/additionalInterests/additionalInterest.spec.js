import { goBack, fillAndCheckForErrors } from './utils';

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

      cy.submitAndCheckErrors(ai1fields);
    });
  });

  it('Additional Interest 1 Empty Value', function () {
    goBack().then(() => {
      cy.findDataTag('ai_add').click();

      fillAndCheckForErrors(ai1fields, ['ai1Name1'], this.ai1);

      fillAndCheckForErrors(ai1fields, ['ai1MailingAddress1'], this.ai1);

      fillAndCheckForErrors(ai1fields, ['ai1City'], this.ai1);

      fillAndCheckForErrors(ai1fields, ['ai1State'], this.ai1);

      fillAndCheckForErrors(ai1fields, ['ai1Zip'], this.ai1);
    });
  });

  it('Additional Interest 1 Invalid Input Value', () => {
    goBack().then(() => {
      cy.findDataTag('ai_add').click();

      cy.fillFields(['ai1State'], { ai1State: 'foo' });
      cy.submitAndCheckErrors(['ai1State'], ['Only 2 letters allowed']);

      cy.fillFields(['ai1Zip'], { ai1Zip: '123456789' });
      cy.submitAndCheckErrors(['ai1Zip'], ['Only 8 letters or numbers allowed']);

      cy.clearAllText(ai1fields);
    });
  });

  it('All Additional Interest 2 Inputs Empty Value', () => {
    goBack().then(() => {
      cy.findDataTag('ai_add').click();
      cy.findDataTag('isAdditional2_switch').click();

      cy.submitAndCheckErrors(ai2fields);
    });
  });

  it('Additional Interest 2 Empty Value', function () {
    goBack().then(() => {
      cy.findDataTag('ai_add').click();
      cy.findDataTag('isAdditional2_switch').click();

      fillAndCheckForErrors(ai2fields, ['ai2Name1'], this.ai2);

      fillAndCheckForErrors(ai2fields, ['ai2MailingAddress1'], this.ai2);

      fillAndCheckForErrors(ai2fields, ['ai2City'], this.ai2);

      fillAndCheckForErrors(ai2fields, ['ai2State'], this.ai2);

      fillAndCheckForErrors(ai2fields, ['ai2Zip'], this.ai2);
    });
  });

  it('Additional Interest 2 Invalid Input Value', () => {
    goBack().then(() => {
      cy.findDataTag('ai_add').click();
      cy.findDataTag('isAdditional2_switch').click();

      cy.fillFields(['ai2State'], { ai2State: 'foo' });
      cy.submitAndCheckErrors(['ai2State'], ['Only 2 letters allowed']);

      cy.fillFields(['ai2Zip'], { ai2Zip: '123456789' });
      cy.submitAndCheckErrors(['ai2Zip'], ['Only 8 letters or numbers allowed']);

      cy.clearAllText(ai2fields);
    });
  });
});
