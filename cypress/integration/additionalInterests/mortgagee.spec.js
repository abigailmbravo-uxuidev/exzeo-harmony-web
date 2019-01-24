import { goBack, fillAndCheckForErrors } from './utils';

describe('Mortgagee Testing', () => {
  const m1fields = ['m1Name1', 'm1MailingAddress1', 'm1City', 'm1State', 'm1Zip'];
  const m2fields = ['m2Name1', 'm2MailingAddress1', 'm2City', 'm2State', 'm2Zip'];
  const m3fields = ['m3Name1', 'm3MailingAddress1', 'm3City', 'm3State', 'm3Zip'];

  before(() => {
    cy.quoteWorkflow('additionalInterests');
  });

  beforeEach('Establish fixtures', () => {
    cy.fixture('mortgagee1').as('m1data');
    cy.fixture('mortgagee2').as('m2data');
    cy.fixture('mortgagee3').as('m3data');
  });

  it('All Mortgagee 1 Empty Value', () => {
    goBack().then(() => {
      cy.findDataTag('mortgagee_add').click();

      cy.submitAndCheckErrors(m1fields);
    });
  });

  it('Mortgagee 1 Empty Value', function() {
    goBack().then(() => {
      cy.findDataTag('mortgagee_add').click();

      fillAndCheckForErrors(m1fields, ['m1Name1'], this.m1data);

      fillAndCheckForErrors(m1fields, ['m1MailingAddress1'], this.m1data);

      fillAndCheckForErrors(m1fields, ['m1City'], this.m1data);

      fillAndCheckForErrors(m1fields, ['m1State'], this.m1data);

      fillAndCheckForErrors(m1fields, ['m1Zip'], this.m1data);
    });
  });

  it('Mortgagee 1 Invalid Input Value', () => {
    goBack().then(() => {
      cy.findDataTag('mortgagee_add').click();

      cy.fillFields(['m1State'], { m1State: 'foo' });
      cy.submitAndCheckErrors(['m1State'], ['Only 2 letters allowed']);

      cy.fillFields(['m1Zip'], { m1Zip: '123456789' });
      cy.submitAndCheckErrors(['m1Zip'], ['Only 8 letters or numbers allowed']);

      cy.clearAllText(m1fields);
    });
  });

  it('All Mortgagee 2 Empty Input Value', function() {
    goBack().then(() => {
      cy.findDataTag('mortgagee_add').click();
      cy.findDataTag('isAdditional2_switch').click();

      cy.submitAndCheckErrors(m2fields);
    });
  });

  it('Mortgagee 2 Empty Value', function() {
    goBack().then(() => {
      cy.findDataTag('mortgagee_add').click();
      cy.findDataTag('isAdditional2_switch').click();

      fillAndCheckForErrors(m2fields, ['m2Name1'], this.m2data);

      fillAndCheckForErrors(m2fields, ['m2MailingAddress1'], this.m2data);

      fillAndCheckForErrors(m2fields, ['m2City'], this.m2data);

      fillAndCheckForErrors(m2fields, ['m2State'], this.m2data);

      fillAndCheckForErrors(m2fields, ['m2Zip'], this.m2data);

      cy.clearAllText([...m1fields, ...m2fields]);
    });
  });

  it('Mortgagee 2 Invalid Input', function() {
    goBack().then(() => {
      cy.findDataTag('mortgagee_add').click();
      cy.findDataTag('isAdditional2_switch').click();

      cy.fillFields(['m2State'], { m2State: 'foo' });
      cy.submitAndCheckErrors(['m2State'], ['Only 2 letters allowed']);

      cy.fillFields(['m2Zip'], { m2Zip: '123456789' });
      cy.submitAndCheckErrors(['m2Zip'], ['Only 8 letters or numbers allowed']);

      cy.clearAllText(m2fields);
    });
  });

  it('All Mortgagee 3 Empty Input Value', function() {
    goBack().then(() => {
      cy.findDataTag('mortgagee_add').click();
      cy.findDataTag('isAdditional2_switch').click();
      cy.findDataTag('isAdditional3_switch').click();

      cy.submitAndCheckErrors(m3fields);
    });
  });

  it('Mortgagee 3 Empty Value', function () {
    goBack().then(() => {
      cy.findDataTag('mortgagee_add').click();
      cy.findDataTag('isAdditional2_switch').click();
      cy.findDataTag('isAdditional3_switch').click();

      fillAndCheckForErrors(m3fields, ['m3Name1'], this.m3data);

      fillAndCheckForErrors(m3fields, ['m3MailingAddress1'], this.m3data);

      fillAndCheckForErrors(m3fields, ['m3City'], this.m3data);

      fillAndCheckForErrors(m3fields, ['m3State'], this.m3data);

      fillAndCheckForErrors(m3fields, ['m3Zip'], this.m3data);

      cy.clearAllText([...m1fields, ...m2fields, ...m3fields]);
    });
  });

  it('Mortgagee 3 Invalid Input Value', () => {
    goBack().then(() => {
      cy.findDataTag('mortgagee_add').click();
      cy.findDataTag('isAdditional2_switch').click();
      cy.findDataTag('isAdditional3_switch').click();

      cy.fillFields(['m3State'], { m3State: 'foo' });
      cy.submitAndCheckErrors(['m3State'], ['Only 2 letters allowed']);

      cy.fillFields(['m3Zip'], { m3Zip: '123456789' });
      cy.submitAndCheckErrors(['m3Zip'], ['Only 8 letters or numbers allowed']);

      cy.clearAllText(m2fields);
    });
  });
});
