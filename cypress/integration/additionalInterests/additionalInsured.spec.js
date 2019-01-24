import { goBack, fillAndCheckForErrors } from './utils';

describe('Additional Insured Testing', () => {
  const ains1fields = ['ains1Name1', 'ains1MailingAddress1', 'ains1City', 'ains1State', 'ains1Zip'];
  const ains2fields = ['ains2Name1', 'ains2MailingAddress1', 'ains2City', 'ains2State', 'ains2Zip'];

  before(() => {
    cy.quoteWorkflow('additionalInterests');
  });
  
  beforeEach('Establish fixtures', () => {
    cy.fixture('ains1').as('ains1');
    cy.fixture('ains2').as('ains2');
  });

  it('All Additional Insure 1 Inputs Empty Value', () => {
    goBack().then(() => {
      cy.findDataTag('ains_add').click();

      cy.submitAndCheckErrors(ains1fields);
    });
  });

  it('Additional Insured 1 Empty Value', function() {
    goBack().then(() => {
      cy.findDataTag('ains_add').click();

      cy.submitAndCheckErrors(ains1fields);
    });
  });

  it('Additional Insured 1 Invalid Input Value', () => {
    goBack().then(() => {
      cy.findDataTag('ains_add').click();

      cy.fillFields(['ains1State'], { ains1State: 'foo' });
      cy.submitAndCheckErrors(['ains1State'], ['Only 2 letters allowed']);

      cy.fillFields(['ains1Zip'], { ains1Zip: '123456789' });
      cy.submitAndCheckErrors(['ains1Zip'], ['Only 8 letters or numbers allowed']);

      cy.clearAllText(ains1fields);
    });
  });

  it('All Additional Insure 2 Inputs Empty Value', () => {
    goBack().then(() => {
      cy.findDataTag('ains_add').click();
      cy.findDataTag('isAdditional2_switch').click();

      cy.submitAndCheckErrors(ains1fields);
    });
  });

  it('Additional Insured 2 Empty Value', function () {
    goBack().then(() => {
      cy.findDataTag('ains_add').click();
      cy.findDataTag('isAdditional2_switch').click();

      fillAndCheckForErrors(ains2fields, ['ains2Name1'], this.ains2);

      fillAndCheckForErrors(ains2fields, ['ains2MailingAddress1'], this.ains2);

      fillAndCheckForErrors(ains2fields, ['ains2City'], this.ains2);

      fillAndCheckForErrors(ains2fields, ['ains2State'], this.ains2);

      fillAndCheckForErrors(ains2fields, ['ains2Zip'], this.ains2);

      cy.clearAllText([...ains1fields, ...ains2fields]);
    });
  });

  it('Additional Insured 2 Invalid Input Value', () => {
    goBack().then(() => {
      cy.findDataTag('ains_add').click();
      cy.findDataTag('isAdditional2_switch').click();

      cy.fillFields(['ains2State'], { ains2State: 'foo' });
      cy.submitAndCheckErrors(['ains2State'], ['Only 2 letters allowed']);

      cy.fillFields(['ains2Zip'], { ains2Zip: '123456789' });
      cy.submitAndCheckErrors(['ains2Zip'], ['Only 8 letters or numbers allowed']);

      cy.clearAllText(ains1fields);
    });
  });
});
