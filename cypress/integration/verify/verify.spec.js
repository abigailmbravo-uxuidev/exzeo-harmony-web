describe('Verify testing', () => {
  const pH1Fields = ['pH1FirstName', 'pH1LastName', 'pH1phone', 'pH1email'];
  const pH2Fields = ['pH2FirstName', 'pH2LastName', 'pH2phone', 'pH2email'];
  const switchTags = ['confirmProperyDetails', 'confirmQuoteDetails', 'confirmPolicyHolderDetails', 'confirmAdditionalInterestsDetails'];
  const errors = Array(4).fill('Field Required');

  const closeModal = () =>
    cy.get('[data-test="cancel"]:not([disabled])').click({ force: true });

  before(() => {
    cy.quoteWorkflow('verify');
  });

  beforeEach('Establish fixtures', () => {
    cy.fixture('pH1').as('pH1');
    cy.fixture('pH2').as('pH2');
  });

  it('Primary Policyholder Empty Value', function() {
    const { pH1 } = this;
    cy.findDataTag('edit_policyholder').click();
    cy.clearAllText(pH1Fields);

    cy.submitAndCheckValidation(pH1Fields, {errors, form: '#UpdatePolicyholder' });

    pH1Fields.forEach(leaveBlank => cy.verifyForm(pH1Fields, [leaveBlank], pH1, { errors }));
  });

  it('Secondary Policyholder Empty Value', function() {
    const { pH2 } = this;
    closeModal();
    cy.findDataTag('edit_policyholder').click();
    cy.findDataTag('isAdditional_switch').click();
    cy.clearAllText(pH2Fields);
    
    cy.submitAndCheckValidation(pH2Fields, { errors, form: '#UpdatePolicyholder' });

    pH2Fields.forEach(leaveBlank => cy.verifyForm(pH2Fields, [leaveBlank], pH2, { errors }));

    closeModal();
  });

  // AWAITING BUGFIX HAR-5702
  // it('Primary Policyholder Invalid Character', () => {
  //   cy.findDataTag('edit_policyholder').click();

  //   pH1Fields.forEach(fieldToCheck => {
  //     clearAllText([fieldToCheck]);
  //     cy.fillFields(pH1Fields.filter(field => field === fieldToCheck), { [fieldToCheck]: '•••'});
  //     cy._submit('#UpdatePolicyholder');
  //     cy.get('.checkForSnackbar').should('be.visible');
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
  //     cy.fillFields(pH2Fields.filter(field => field === fieldToCheck), { [fieldToCheck]: '•••' });
  //     cy._submit('#UpdatePolicyholder');
  //     cy.get('.checkForSnackbar').should('be.visible');
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
    
    cy.verifyForm(['pH1email'], undefined, { pH1email: 'batman' }, { form: '#UpdatePolicyholder' });

    cy.verifyForm(['pH2email'], undefined, { pH2email: 'batman' }, { form: '#UpdatePolicyholder' });

    closeModal();
  });

  it('Invalid Contact Phone', () => {
    cy.findDataTag('edit_policyholder').click();
    cy.findDataTag('isAdditional_switch').click();

    cy.verifyForm(['pH1phone'], undefined, { pH1phone: '123' }, { errors: ['is not a valid Phone Number.'], form: '#UpdatePolicyholder' });

    cy.verifyForm(['pH2phone'], undefined, { pH2phone: '123' }, { errors: ['is not a valid Phone Number.'], form: '#UpdatePolicyholder' });

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
});
