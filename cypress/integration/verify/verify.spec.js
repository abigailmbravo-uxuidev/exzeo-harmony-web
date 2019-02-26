import routes from "../../support/routes";
import {
  navLanding,
  navSearchAddress,
  navCustomerInfo,
  navUnderwriting,
  navCustomize,
  navShare,
  navAssumptions,
  navAdditionalInterests,
  navMailingBilling
} from '../../helpers';

describe('Verify testing', () => {
  const pH1Fields = ['pH1FirstName', 'pH1LastName', 'pH1phone', 'pH1email'];
  const pH2Fields = ['pH2FirstName', 'pH2LastName', 'pH2phone', 'pH2email'];
  const switchTags = ['confirmProperyDetails', 'confirmQuoteDetails', 'confirmPolicyHolderDetails', 'confirmAdditionalInterestsDetails'];
  const errors = Array(4).fill('Field Required');
  const toggleModalOn = () => cy.findDataTag('edit-policyholder').click();
  const addAdditional = () => cy.findDataTag('isAdditional').find('.switch-div').click();
  const closeModal = () => cy.get('[data-test="cancel"]:not([disabled])').click({ force: true }).wait(1000);

  before(() => {
    routes();
    cy.login();
    navLanding();
    navSearchAddress();
    navCustomerInfo();
    navUnderwriting();
    navCustomize();
    navShare();
    navAssumptions();
    navAdditionalInterests();
    navMailingBilling();
  });

  beforeEach('Establish fixtures', () => {
    routes();
    cy.fixture('stockData/pH1').as('pH1')
      .fixture('stockData/pH2').as('pH2');
  });

  it('Primary Policyholder Empty Value', function() {
    const { pH1 } = this;
    toggleModalOn();
    cy.clearAllText(pH1Fields)
      .submitAndCheckValidation(pH1Fields, {errors, form: '#UpdatePolicyholder' });

    pH1Fields.forEach(leaveBlank => cy.verifyForm(pH1Fields, [leaveBlank], pH1, { errors }));
    closeModal();
  });

  it('Secondary Policyholder Empty Value', function() {
    const { pH2 } = this;
    toggleModalOn();
    addAdditional();
    cy.clearAllText(pH2Fields)
      .submitAndCheckValidation(pH2Fields, { errors, form: '#UpdatePolicyholder' });

    pH2Fields.forEach(leaveBlank => cy.verifyForm(pH2Fields, [leaveBlank], pH2, { errors }));

    closeModal();
  });

  // AWAITING BUGFIX HAR-5702
  // it('Primary Policyholder Invalid Character', () => {
  //   toggleModalOn();

  //   pH1Fields.forEach(fieldToCheck => {
  //     cy.verifyForm([fieldToCheck], undefined, { [fieldToCheck]: '•••' }, {
  //       errors: fieldToCheck.includes('email') ? ['Not a valid email address'] : ['Invalid characters'],
  //       form: '#UpdatePolicyholder'
  //     });
  //     // cy.clearAllText([fieldToCheck]);
  //     // cy.fillFields(pH1Fields.filter(field => field === fieldToCheck), { [fieldToCheck]: '•••'});
  //     // cy.clickSubmit('#UpdatePolicyholder');
  //     // cy.get('.checkForSnackbar').should('be.visible');
  //     // cy.checkError(
  //     //   fieldToCheck,
  //     //   fieldToCheck.includes('email') ? 'Not a valid email address' : 'Invalid characters'
  //     // );
  //   });

  //   closeModal();
  // });

  // it('Secondary Policyholder Invalid Character', () => {
  //   toggleModalOn();
  //   addAdditional();

  //   pH2Fields.forEach(fieldToCheck => {
  //     cy.verifyForm([fieldToCheck], undefined, { [fieldToCheck]: '•••'}, {
  //       errors: fieldToCheck.includes('email') ? ['Not a valid email address'] : ['Invalid characters'],
  //       form: '#UpdatePolicyholder'
  //     });
  //     // cy.clearAllText([fieldToCheck]);
  //     // cy.fillFields(pH2Fields.filter(field => field === fieldToCheck), { [fieldToCheck]: '•••' });
  //     // cy.clickSubmit('#UpdatePolicyholder');
  //     // cy.get('.checkForSnackbar').should('be.visible');
  //     // cy.checkError(
  //     //   fieldToCheck,
  //     //   fieldToCheck.includes('email') ? 'Not a valid email address' : 'Invalid characters'
  //     // );
  //   });

  //   closeModal();
  // });
  // END BUGFIX AWAIT

  it('Invalid Email Address', () => {
    toggleModalOn();
    addAdditional();

    cy.verifyForm(['pH1email'], undefined, { pH1email: 'batman' }, { form: '#UpdatePolicyholder' })
      .verifyForm(['pH2email'], undefined, { pH2email: 'batman' }, { form: '#UpdatePolicyholder' });

    closeModal();
  });

  it('Invalid Contact Phone', () => {
    toggleModalOn();
    addAdditional();

    cy.verifyForm(['pH1phone'], undefined, { pH1phone: '123' }, { errors: ['is not a valid Phone Number.'], form: '#UpdatePolicyholder' })
      .verifyForm(['pH2phone'], undefined, { pH2phone: '123' }, { errors: ['is not a valid Phone Number.'], form: '#UpdatePolicyholder' });

    closeModal();
  });

  it('All "Verified" Values left at Default "No"', () => {
    switchTags.forEach(tag => cy.findDataTag(tag).should('not.have.class', 'active'));
    cy.findDataTag('submit').should('be.disabled');
  });

  it('Some "Verified Values left at Default "No"', () => {
    for (let i = 0; i < switchTags.length - 1; i++) {
      const tagsToToggle = switchTags.slice(0, i + 1);
      tagsToToggle.forEach(tag => cy.findDataTag(`${tag}`).find('.switch-div').click());
      cy.findDataTag('submit').should('be.disabled');
      tagsToToggle.forEach(tag => cy.findDataTag(`${tag}`).find('.switch-div').click());
    }
  });
});
