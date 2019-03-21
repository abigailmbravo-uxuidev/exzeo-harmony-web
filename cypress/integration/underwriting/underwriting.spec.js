import stubAllRoutes from "../../support/stubAllRoutes";
import {
  navigateThroughLanding,
  navigateThroughSearchAddress,
  navigateThroughPolicyholder
} from '../../helpers';
import uwData from '../../fixtures/stockData/underwriting.json';
import uwFields from './underwritingFields';

describe('Underwriting Testing', () => {
  const data = {
    'underwritingAnswers.rented.answer': 'Never',
    'underwritingAnswers.previousClaims.answer': 'No claims ever filed',
    'underwritingAnswers.monthsOccupied.answer': '10+',
    'underwritingAnswers.fourPointUpdates.answer': 'Yes',
    'underwritingAnswers.business.answer': 'No'
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

  it('NEG:All Inputs Empty Value', () =>
    cy.submitAndCheckValidation(uwFields)
  );

  it('NEG:"All questions empty value', () =>
    cy.wrap(uwFields).each(field =>
      cy.reload().then(() => {
        toggleExcept([`${field.name.split('_')[0]}`], data);
        cy.submitAndCheckValidation([field]);
      })
    )
  );

  it('POS:Underwriting Workflow', () =>
    cy.checkWorkflowSection('tab-nav-askAdditionalCustomerData', 'selected')
      .checkWorkflowSection('tab-nav-askUWAnswers', 'active')
      .checkWorkflowSection('tab-nav-askToCustomizeDefaultQuote')
      .checkWorkflowSection('tab-nav-sendEmailOrContinue')
      .checkWorkflowSection('tab-nav-addAdditionalAIs')
      .checkWorkflowSection('tab-nav-askAdditionalQuestions')
      .checkWorkflowSection('tab-nav-editVerify')
  );

  it('POS:Check All Questions Text / Radio', () =>
    cy.wrap(uwFields).each(({ name, label, values }) =>
      cy.reload().then(() =>
        cy.checkLabel(name, label)
          .checkRadios(name, values)
          .clickEachRadio(name)
      )
    )
  );

  it('POS:Underwriting Next Button', () => cy.checkSubmitButton());
});
