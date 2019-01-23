describe('Additional Parties Testing', () => {
  const m1fields = ['m1Name1', 'm1MailingAddress1', 'm1City', 'm1State', 'm1Zip'];
  const m2fields = ['m2Name1', 'm2MailingAddress1', 'm2City', 'm2State', 'm2Zip'];
  const m3fields = ['m3Name1', 'm3MailingAddress1', 'm3City', 'm3State', 'm3Zip'];

  const goBack = () => cy.window().then(window => {
      if (!window.location.href.includes('additionalInterests')) {
        cy.findDataTag('addAdditionalAIs').click();
      };
    });

  const fillFields = (fields = [], data) => {
    fields.forEach(field => cy.findDataTag(`${field}_input`).type(data[field]));
  };

  const submitCheckErrors = (
    fields = [],
    errors = new Array(fields.length).fill('Field Required')
  ) => {
    cy._submit();
    fields.forEach((field, i) => {
      cy.findDataTag(field).find('> span').should('contain', errors[i]);
    });
  };

  const clearAllText = (fields = []) => {
    fields.forEach(tag => {
      cy.findDataTag(`${tag}_input`).then($input => {
        if ($input.val()) { cy.wrap($input).type('{selectall}{backspace}'); }
      });
    });
  };

  before(() => {
    cy.quoteWorkflow('additionalInterests');
  });

  beforeEach('Establish fixtures and aliases', () => {
    cy.fixture('defaultMortgagee1').as('m1data');
    cy.fixture('defaultMortgagee2').as('m2data');
    cy.fixture('defaultMortgagee3').as('m3data');
  });

  it('All Mortgagee 1 Empty Value', () => {
    goBack().then(() => {
      cy.findDataTag('mortgagee_add').click();

      submitCheckErrors(m1fields);
    });
  });

  it('Mortgagee 1 Empty Value', function() {
    goBack().then(() => {
      cy.findDataTag('mortgagee_add').click();

      fillFields(m1fields.filter(field => field !== 'm1Name1'), this.m1data);
      submitCheckErrors(['m1Name1']);
      clearAllText(m1fields);

      fillFields(m1fields.filter(field => field !== 'm1MailingAddress1'), this.m1data);
      submitCheckErrors(['m1MailingAddress1']);
      clearAllText(m1fields);

      fillFields(m1fields.filter(field => field !== 'm1City'), this.m1data);
      submitCheckErrors(['m1City']);
      clearAllText(m1fields);

      fillFields(m1fields.filter(field => field !== 'm1State'), this.m1data);
      submitCheckErrors(['m1State']);
      clearAllText(m1fields);

      fillFields(m1fields.filter(field => field !== 'm1Zip'), this.m1data);
      submitCheckErrors(['m1Zip']);
      clearAllText(m1fields);
    });
  });

  it('Mortgagee 1 Invalid Input Value', () => {
    goBack().then(() => {
      cy.findDataTag('mortgagee_add').click();

      fillFields(['m1State'], { m1State: 'foo' });
      submitCheckErrors(['m1State'], ['Only 2 letters allowed']);

      fillFields(['m1Zip'], { m1Zip: '123456789' });
      submitCheckErrors(['m1Zip'], ['Only 8 letters or numbers allowed']);

      clearAllText(m1fields);
    });
  });

  it('All Mortgagee 2 Empty Input Value', function() {
    goBack().then(() => {
      cy.findDataTag('mortgagee_add').click();
      cy.findDataTag('isAdditional2_switch').click();

      submitCheckErrors(m2fields);
    });
  });

  it('Mortgagee 2 Empty Value', function() {
    goBack().then(() => {
      cy.findDataTag('mortgagee_add').click();
      cy.findDataTag('isAdditional2_switch').click();

      fillFields(m2fields.filter(field => field !== 'm2Name1'), this.m2data);
      submitCheckErrors(['m2Name1']);
      clearAllText(m2fields);

      fillFields(m2fields.filter(field => field !== 'm2MailingAddress1'), this.m2data);
      submitCheckErrors(['m2MailingAddress1']);
      clearAllText(m2fields);

      fillFields(m2fields.filter(field => field !== 'm2City'), this.m2data);
      submitCheckErrors(['m2City']);
      clearAllText(m2fields);

      fillFields(m2fields.filter(field => field !== 'm2State'), this.m2data);
      submitCheckErrors(['m2State']);
      clearAllText(m2fields);

      fillFields(m2fields.filter(field => field !== 'm2Zip'), this.m2data);
      submitCheckErrors(['m2Zip']);
      clearAllText(m2fields);

      clearAllText([...m1fields, ...m2fields]);
    });
  });

  it('Mortgagee 2 Invalid Input', function() {
    goBack().then(() => {
      cy.findDataTag('mortgagee_add').click();
      cy.findDataTag('isAdditional2_switch').click();

      fillFields(['m2State'], { m2State: 'foo' });
      submitCheckErrors(['m2State'], ['Only 2 letters allowed']);

      fillFields(['m2Zip'], { m2Zip: '123456789' });
      submitCheckErrors(['m2Zip'], ['Only 8 letters or numbers allowed']);

      clearAllText(m2fields);
    });
  });

  it('All Mortgagee 3 Empty Input Value', function() {
    goBack().then(() => {
      cy.findDataTag('mortgagee_add').click();
      cy.findDataTag('isAdditional2_switch').click();
      cy.findDataTag('isAdditional3_switch').click();

      submitCheckErrors(m3fields);
    });
  });

  it('Mortgagee 3 Empty Value', function () {
    goBack().then(() => {
      cy.findDataTag('mortgagee_add').click();
      cy.findDataTag('isAdditional2_switch').click();
      cy.findDataTag('isAdditional3_switch').click();

      fillFields(m3fields.filter(field => field !== 'm3Name1'), this.m3data);
      submitCheckErrors(['m3Name1']);
      clearAllText(m3fields);

      fillFields(m3fields.filter(field => field !== 'm3MailingAddress1'), this.m3data);
      submitCheckErrors(['m3MailingAddress1']);
      clearAllText(m3fields);

      fillFields(m3fields.filter(field => field !== 'm3City'), this.m3data);
      submitCheckErrors(['m3City']);
      clearAllText(m3fields);

      fillFields(m3fields.filter(field => field !== 'm3State'), this.m3data);
      submitCheckErrors(['m3State']);
      clearAllText(m3fields);

      fillFields(m3fields.filter(field => field !== 'm3Zip'), this.m3data);
      submitCheckErrors(['m3Zip']);
      clearAllText(m3fields);

      clearAllText([...m1fields, ...m2fields, ...m3fields]);
    });
  });

  it('Mortgagee 3 Invalid Input Value', () => {
    goBack().then(() => {
      cy.findDataTag('mortgagee_add').click();
      cy.findDataTag('isAdditional2_switch').click();
      cy.findDataTag('isAdditional3_switch').click();

      fillFields(['m3State'], { m3State: 'foo' });
      submitCheckErrors(['m3State'], ['Only 2 letters allowed']);

      fillFields(['m3Zip'], { m3Zip: '123456789' });
      submitCheckErrors(['m3Zip'], ['Only 8 letters or numbers allowed']);

      clearAllText(m2fields);
    });
  });
});
