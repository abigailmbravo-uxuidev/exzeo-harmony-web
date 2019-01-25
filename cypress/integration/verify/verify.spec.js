describe('Verify testing', () => {
  const pH1Fields = ['pH1FirstName', 'pH1LastName', 'pH1phone', 'pH1email'];
  const pH2Fields = ['pH2FirstName', 'pH2LastName', 'pH2phone', 'pH2email'];
  const switchTags = ['confirmProperyDetails', 'confirmQuoteDetails', 'confirmPolicyHolderDetails', 'confirmAdditionalInterestsDetails'];

  const clearAllText = fields => {
    fields.forEach(tag => {
      cy.findDataTag(`${tag}_input`).then($input => {
        if ($input.val()) { cy.wrap($input).type('{selectall}{backspace}'); }
      });
    });
  };

  const fillFromData = (fields = [], user) => 
    fields.forEach(field => cy.findDataTag(`${field}_input`).type(user[field]));
    

  const checkError = (parent, message = 'Field Required') => 
    cy.findDataTag(parent).find('> span').should('contain', message);

  const closeModal = () =>
    cy.get('[data-test="cancel"]:not([disabled])').click({ force: true });

  before(() => {
    cy.quoteWorkflow('verify');
  });

  beforeEach('Establish fixtures', function() {
    cy.fixture('pH1').as('pH1');
    cy.fixture('pH2').as('pH2');
  });

  it('Primary Policyholder Empty Value', function() {
    cy.findDataTag('edit_policyholder').click();

    clearAllText(pH1Fields);
    cy._submit('#UpdatePolicyholder');
    cy.get('.snackbar').should('be.visible');
    pH1Fields.forEach(field => checkError(field));

    pH1Fields.forEach(fieldToLeaveBlank => {
      clearAllText(pH1Fields);
      fillFromData(pH1Fields.filter(field => fieldToLeaveBlank !== field), this.pH1);
      cy._submit('#UpdatePolicyholder');
      cy.get('.snackbar').should('be.visible');
      checkError(fieldToLeaveBlank);
    });
  });

  it('Secondary Policyholder Empty Value', function() {
    closeModal();
    cy.findDataTag('edit_policyholder').click();
    cy.findDataTag('isAdditional_switch').click();
    clearAllText(pH2Fields);
    cy._submit('#UpdatePolicyholder');
    cy.get('.snackbar').should('be.visible');
    pH2Fields.forEach(field => checkError(field));

    pH2Fields.forEach(fieldToLeaveBlank => {
      clearAllText(pH2Fields);
      fillFromData(pH2Fields.filter(field => fieldToLeaveBlank !== field), this.pH2);
      cy._submit('#UpdatePolicyholder');
      cy.get('.snackbar').should('be.visible');
      checkError(fieldToLeaveBlank);
    });

    closeModal();
  });

  // AWAITING BUGFIX HAR-5702
  // it('Primary Policyholder Invalid Character', () => {
  //   cy.findDataTag('edit_policyholder').click();

  //   pH1Fields.forEach(fieldToCheck => {
  //     clearAllText([fieldToCheck]);
  //     fillFromData(pH1Fields.filter(field => field === fieldToCheck), { [fieldToCheck]: '•••'});
  //     cy._submit('#UpdatePolicyholder');
  //     cy.get('.snackbar').should('be.visible');
  //     checkError(
  //       fieldToCheck, 
  //       fieldToCheck.includes('email') ? 'Not a valid email address' : 'Invalid characters'
  //     );
  //   });

  //   closeModal();
  // });

  // it('Secondary Policyholder Invalid Character', () => {
  //   cy.findDataTag('edit_policyholder').click();
  //   cy.findDataTag('isAdditional_switch').click();

  //   pH2Fields.forEach(fieldToCheck => {
  //     clearAllText([fieldToCheck]);
  //     fillFromData(pH2Fields.filter(field => field === fieldToCheck), { [fieldToCheck]: '•••' });
  //     cy._submit('#UpdatePolicyholder');
  //     cy.get('.snackbar').should('be.visible');
  //     checkError(
  //       fieldToCheck,
  //       fieldToCheck.includes('email') ? 'Not a valid email address' : 'Invalid characters'
  //     );
  //   });

  //   closeModal();
  // });
  // END BUGFIX AWAIT

  it('Invalid Email Address', () => {
    cy.findDataTag('edit_policyholder').click();
    cy.findDataTag('isAdditional_switch').click();

    clearAllText(['pH1email']);
    fillFromData(['pH1email'], { pH1email: 'batman' });
    cy._submit('#UpdatePolicyholder');
    cy.get('.snackbar').should('be.visible');
    checkError('pH1email', 'Not a valid email address');

    clearAllText(['pH2email']);
    fillFromData(['pH2email'], { pH2email: 'thebutler' });
    cy._submit('#UpdatePolicyholder');
    cy.get('.snackbar').should('be.visible');
    checkError('pH2email', 'Not a valid email address');

    closeModal();
  });

  it('Invalid Contact Phone', () => {
    cy.findDataTag('edit_policyholder').click();
    cy.findDataTag('isAdditional_switch').click();

    clearAllText(['pH1phone']);
    fillFromData(['pH1phone'], { pH1phone: '123' });
    cy._submit('#UpdatePolicyholder');
    cy.get('.snackbar').should('be.visible');
    checkError('pH1phone', 'is not a valid Phone Number.');

    clearAllText(['pH2phone']);
    fillFromData(['pH2phone'], { pH2phone: '123' });
    cy._submit('#UpdatePolicyholder');
    cy.get('.snackbar').should('be.visible');
    checkError('pH2phone', 'is not a valid Phone Number.');

    closeModal();
  });

  it('All "Verified" Values left at Default "No"', () => {
    switchTags.forEach(tag => 
      cy.findDataTag(tag).should('not.have.class', 'active')
    );
    cy.findDataTag('submit').should('be.disabled');
  });

  it('Some "Verified Values left at Default "No"', () => {
    for (let i = 0; i < switchTags.length - 1; i++) {
      const tagsToToggle = switchTags.slice(0, i + 1);
      tagsToToggle.forEach(tag => cy.findDataTag(`${tag}_switch`).click());
      cy.findDataTag('submit').should('be.disabled');
      tagsToToggle.forEach(tag => cy.findDataTag(`${tag}_switch`).click());
    }
  });
})