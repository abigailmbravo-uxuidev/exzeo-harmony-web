import stubAllRoutes from "../../support/stubAllRoutes";
import {
  navigateThroughLanding,
  navigateThroughSearchAddress,
  navigateThroughPolicyholder
} from '../../helpers';
import uwData from '../../fixtures/stockData/underwriting.json';
import uwFields from './underwritingFields';

describe('Underwriting Testing', () => {
  // const fields = ['rented', 'previousClaims', 'monthsOccupied', 'business'];

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

  it('NEG:All Inputs Empty Value', () =>
    cy.submitAndCheckValidation(uwFields)
  );

  it('NEG:"Is the home or any structure on the property ever rented?" Empty Value', () => {
    // cy.wrap(uwFields).each(({ name }) => {
    //   cy.log('before')
    //   cy.reload().then(() => {

    //     toggleExcept([name], uwData);
    //     cy.submitAndCheckValidation([name]);
    //   })
    //   cy.log('after')
    // })
    cy.reload();
    toggleExcept([uwFields[0]], uwData);
    cy.submitAndCheckValidation([uwFields[0]]);
  });

  // it('NEG:"When was the last claim filed?" Empty Value', () => {
    // cy.reload();
    // toggleExcept(['previousClaims'], uwData);
    // cy.submitAndCheckValidation(['previousClaims']);
  // });

  // it('NEG:"How many months a year does the owner live in the home?" Empty Value', () => {
  //   cy.reload();
  //   toggleExcept(['monthsOccupied'], uwData);
  //   cy.submitAndCheckValidation(['monthsOccupied']);
  // });

  // it('NEG:"Is a business conducted on the property?" Empty Value', () => {
  //   cy.reload();
  //   toggleExcept(['business'], uwData);
  //   cy.submitAndCheckValidation(['business']);
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

  // it('POS:Property Ever Rented Text / Input', () =>
  //   cy.reload().checkLabel('rented', 'Is the home or any structures on the property ever rented?')
  //     .checkRadios('rented', ['Yes', 'Occasionally', 'Never'])
  //     .clickEachRadio('rented')
  // );

  // it('POS:Last Claim Filed Text / Input', () =>
  //   cy.reload().checkLabel('previousClaims', 'When was the last claim filed?')
  //     .checkRadios('previousClaims', ['No claims ever filed', 'Less than 3 Years', '3-5 Years', 'Over 5 Years', 'Unknown'])
  //     .clickEachRadio('previousClaims')
  // );


  // it('POS:Owner Lives Text / Input', () =>
  //   cy.reload().checkLabel('monthsOccupied', 'How many months a year does the owner live in the home?')
  //     .checkRadios('monthsOccupied', ['0-3', '4-6', '7-9', '10+'])
  //     .clickEachRadio('monthsOccupied')
  // );

  // it('POS:Wiring, Plumbing, and HVAC Text / Input', () =>
  //   cy.reload().checkLabel('fourPointUpdates', 'Have the wiring, plumbing, and HVAC been updated in the last 35 years?')
  //     .checkRadios('fourPointUpdates', ['Yes', 'No', 'Unknown'])
  //     .clickEachRadio('fourPointUpdates')
  // );

  // it('POS:Business Conducted Text / Input', () =>
  //   cy.reload().checkLabel('business', 'Is a business conducted on the property?')
  //     .checkRadios('business', ['Yes', 'No'])
  //     .clickEachRadio('business')
  // );

  // it('POS:Underwriting Next Button', () => cy.checkSubmitButton());
});
