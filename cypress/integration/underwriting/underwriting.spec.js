import stubAllRoutes from "../../support/stubAllRoutes";
import {
  navigateThroughLanding,
  navigateThroughSearchAddress,
  navigateThroughPolicyholder
} from '../../helpers';

describe('Underwriting Testing', () => {
  const data = {
    "underwritingAnswers.rented.answer": "Never",
    "underwritingAnswers.previousClaims.answer": "No claims ever filed",
    "underwritingAnswers.monthsOccupied.answer": "10+",
    "underwritingAnswers.business.answer": "No"
  };

  const toggleExcept = (except = [], values) => {
    Object.entries(values).forEach(([key, value]) => {
      if (!except.includes(key)) {
        cy.findDataTag(`${key}_${value}`).click();
      };
    });
  };

  const stubWithBlankAnswers = () =>
    cy.setFx('stubs/getQuoteServiceRequest', ['result.underwritingAnswers', {}]);

  before('Go to Underwriting page', () => {
    stubAllRoutes();
    stubWithBlankAnswers();
    cy.setFx('stubs/complete/askAdditionalCustomerData', ['data.model.variables[0].value.result[2].hidden', false]);
    cy.login();
    navigateThroughLanding();
    navigateThroughSearchAddress();
    navigateThroughPolicyholder();
  });

  beforeEach('Establish fixtures', () => {
    stubAllRoutes();
    stubWithBlankAnswers();
  });

  // it('NEG:All Inputs Empty Value', () => {
  //   const fields = ["underwritingAnswers.rented.answer_wrapper", "underwritingAnswers.previousClaims.answer_wrapper", "underwritingAnswers.monthsOccupied.answer_wrapper", "underwritingAnswers.business.answer_wrapper"];
  //   cy.submitAndCheckValidation(fields);
  // });

  // it('NEG:"Is the home or any structure on the property ever rented?" Empty Value', () => {
  //   cy.reload();
  //   toggleExcept(['underwritingAnswers.rented.answer'], data);
  //   cy.submitAndCheckValidation(['underwritingAnswers.rented.answer_wrapper']);
  // });

  // it('NEG:"When was the last claim filed?" Empty Value', () => {
  //   cy.reload();
  //   toggleExcept(['underwritingAnswers.previousClaims.answer'], data);
  //   cy.submitAndCheckValidation(['underwritingAnswers.previousClaims.answer_wrapper']);
  // });

  // it('NEG:"How many months a year does the owner live in the home?" Empty Value', () => {
  //   cy.reload();
  //   toggleExcept(['underwritingAnswers.monthsOccupied.answer'], data);
  //   cy.submitAndCheckValidation(['underwritingAnswers.monthsOccupied.answer_wrapper']);
  // });

  // it('NEG:"Is a business conducted on the property?" Empty Value', () => {
  //   cy.reload();
  //   toggleExcept(['underwritingAnswers.business.answer'], data);
  //   cy.submitAndCheckValidation(['underwritingAnswers.business.answer_wrapper']);
  // });

  // it('POS:Underwriting Workflow', () =>
  //   cy.checkWorkflowSection('tab-nav-askAdditionalCustomerData', 'selected')
  //     .checkWorkflowSection('tab-nav-askUWAnswers', 'active')
  //     .checkWorkflowSection('tab-nav-askToCustomizeDefaultQuote')
  //     .checkWorkflowSection('tab-nav-sendEmailOrContinue')
  //     .checkWorkflowSection('tab-nav-addAdditionalAIs')
  //     .checkWorkflowSection('tab-nav-askAdditionalQuestions')
  //     .checkWorkflowSection('tab-nav-editVerify')
  // );

  it('POS:Property Ever Rented Text / Input', () =>
    cy.reload().checkLabel('underwritingAnswers.rented.answer_wrapper', 'Is the home or any structures on the property ever rented?')
      .checkRadios('underwritingAnswers.rented.answer_wrapper', ['Yes', 'Occasionally', 'Never'])
      .clickEachRadio('underwritingAnswers.rented.answer_wrapper')
  );

  it('POS:Last Claim Filed Text / Input', () =>
    cy.reload().checkLabel('underwritingAnswers.previousClaims.answer_wrapper', 'When was the last claim filed?')
      .checkRadios('underwritingAnswers.previousClaims.answer_wrapper', ['No claims ever filed', 'Less than 3 Years', '3-5 Years', 'Over 5 Years', 'Unknown'])
      .clickEachRadio('underwritingAnswers.previousClaims.answer_wrapper')
  );

  it('POS:Owner Lives Text / Input', () =>
    cy.reload().checkLabel('underwritingAnswers.monthsOccupied.answer_wrapper', 'How many months a year does the owner live in the home?')
      .checkRadios('underwritingAnswers.monthsOccupied.answer_wrapper', ['0-3', '4-6', '7-9', '10+'])
      .clickEachRadio('underwritingAnswers.monthsOccupied.answer_wrapper')
  );

  it('POS:Wiring, Plumbing, and HVAC Text / Input', () =>
    cy.reload().checkLabel('underwritingAnswers.fourPointUpdates.answer_wrapper', 'Have the wiring, plumbing, and HVAC been updated in the last 35 years?')
      .checkRadios('underwritingAnswers.fourPointUpdates.answer_wrapper', ['Yes', 'No', 'Unknown'])
      .clickEachRadio('underwritingAnswers.fourPointUpdates.answer_wrapper')
  );

  it('POS:Business Conducted Text / Input', () =>
    cy.reload().checkLabel('underwritingAnswers.business.answer_wrapper', 'Is a business conducted on the property?')
      .checkRadios('underwritingAnswers.business.answer_wrapper', ['Yes', 'No'])
      .clickEachRadio('underwritingAnswers.business.answer_wrapper')
  );

  it('POS:Underwriting Next Button', () => cy.checkSubmitButton());
});
