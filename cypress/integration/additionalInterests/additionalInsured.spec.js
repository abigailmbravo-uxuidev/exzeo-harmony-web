describe('Additional Insured Testing', () => {
  const ains1fields = ['ains1Name1', 'ains1MailingAddress1', 'ains1City', 'ains1State', 'ains1Zip'];
  const ains2fields = ['ains2Name1', 'ains2MailingAddress1', 'ains2City', 'ains2State', 'ains2Zip'];
  const goBack = () => cy.window().then(window => {
    if (!window.location.href.includes('additionalInterests')) {
      cy.findDataTag('addAdditionalAIs').click();
    };
  });

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

      cy.fillFields(ains1fields.filter(field => field !== 'ains1Name1'), this.ains1);
      cy.submitAndCheckErrors(['ains1Name1']);
      cy.clearAllText(ains1fields);

      cy.fillFields(ains1fields.filter(field => field !== 'ains1MailingAddress1'), this.ains1);
      cy.submitAndCheckErrors(['ains1MailingAddress1']);
      cy.clearAllText(ains1fields);

      cy.fillFields(ains1fields.filter(field => field !== 'ains1City'), this.ains1);
      cy.submitAndCheckErrors(['ains1City']);
      cy.clearAllText(ains1fields);

      cy.fillFields(ains1fields.filter(field => field !== 'ains1State'), this.ains1);
      cy.submitAndCheckErrors(['ains1State']);
      cy.clearAllText(ains1fields);

      cy.fillFields(ains1fields.filter(field => field !== 'ains1Zip'), this.ains1);
      cy.submitAndCheckErrors(['ains1Zip']);
      cy.clearAllText(ains1fields);
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

      cy.fillFields(ains2fields.filter(field => field !== 'ains2Name1'), this.ains2);
      cy.submitAndCheckErrors(['ains2Name1']);
      cy.clearAllText(ains2fields);

      cy.fillFields(ains2fields.filter(field => field !== 'ains2MailingAddress1'), this.ains2);
      cy.submitAndCheckErrors(['ains2MailingAddress1']);
      cy.clearAllText(ains2fields);

      cy.fillFields(ains2fields.filter(field => field !== 'ains2City'), this.ains2);
      cy.submitAndCheckErrors(['ains2City']);
      cy.clearAllText(ains2fields);

      cy.fillFields(ains2fields.filter(field => field !== 'ains2State'), this.ains2);
      cy.submitAndCheckErrors(['ains2State']);
      cy.clearAllText(ains2fields);

      cy.fillFields(ains2fields.filter(field => field !== 'ains2Zip'), this.ains2);
      cy.submitAndCheckErrors(['ains2Zip']);
      cy.clearAllText(ains2fields);

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
