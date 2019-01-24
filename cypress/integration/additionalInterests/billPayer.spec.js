describe('Premium Finance Testing', () => {
  const fields = ['name1', 'mailingAddress1', 'city', 'state', 'zip'];

  const goBack = () => cy.window().then(window => {
    if (!window.location.href.includes('additionalInterests')) {
      cy.findDataTag('addAdditionalAIs').click();
    };
  });

  before(() => {
    cy.quoteWorkflow('additionalInterests');
  });

  beforeEach('Establish fixtures', () => {
    cy.fixture('additionalUser').as('user');
  });

  it('All Premium Finance Inputs Empty Value', () => {
    goBack().then(() => {
      cy.findDataTag('bill-payer_add').click();

      cy.submitAndCheckErrors(fields);
    });
  });

  it('Premium Finance Empty Value', function () {
    goBack().then(() => {
      cy.findDataTag('bill-payer_add').click();

      cy.fillFields(fields.filter(field => field !== 'name1'), this.user);
      cy.submitAndCheckErrors(['name1']);
      cy.clearAllText(fields);

      cy.fillFields(fields.filter(field => field !== 'mailingAddress1'), this.user);
      cy.submitAndCheckErrors(['mailingAddress1']);
      cy.clearAllText(fields);

      cy.fillFields(fields.filter(field => field !== 'city'), this.user);
      cy.submitAndCheckErrors(['city']);
      cy.clearAllText(fields);

      cy.fillFields(fields.filter(field => field !== 'state'), this.user);
      cy.submitAndCheckErrors(['state']);
      cy.clearAllText(fields);

      cy.fillFields(fields.filter(field => field !== 'zip'), this.user);
      cy.submitAndCheckErrors(['zip']);
      cy.clearAllText(fields);
    });
  });

  it('Premium Finance Invalid Input Value', () => {
    goBack().then(() => {
      cy.findDataTag('bill-payer_add').click();

      cy.fillFields(['state'], { state: 'foo' });
      cy.submitAndCheckErrors(['state'], ['Only 2 letters allowed']);

      cy.fillFields(['zip'], { zip: '123456789' });
      cy.submitAndCheckErrors(['zip'], ['Only 8 letters or numbers allowed']);

      cy.clearAllText(fields);
    });
  });
});