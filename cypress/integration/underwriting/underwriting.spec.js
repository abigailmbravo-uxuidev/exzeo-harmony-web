import _ from 'lodash';

import stubAllRoutes from "../../support/stubAllRoutes";
import {
  navigateThroughLanding,
  navigateThroughSearchAddress,
  navigateThroughCustomerInfo
} from '../../helpers';
import uwData from '../../fixtures/stockData/underwriting.json';

describe('Underwriting Testing', () => {
  const fields = ['rented', 'previousClaims', 'monthsOccupied', 'business'];

  const toggleExcept = (except = [], values) => {
    Object.entries(values).forEach(([key, value]) => {
      if (!except.includes(key)) {
        cy.findDataTag(`${key}`).find(`input[value="${value}"] + span`).click();
      };
    });
  };

  const stubWithBlankAnswers = () => {
    cy.fixture('stubs/getQuoteServiceRequest').then(fx => {
      stubAllRoutes();
      const currentFixture = _.cloneDeep(fx);
      _.mergeWith(currentFixture, {
        result: { ...currentFixture.result, underwritingAnswers: {} }}, (obj, src) => !_.isNil(src) ? src : obj);
      cy.route('POST', '/svc?getQuoteServiceRequest', currentFixture).as('getQuoteServiceRequest');
    });
  };

  before('Go to Underwriting page', () => {
    stubWithBlankAnswers();
    cy.fixture('stubs/complete/askAdditionalCustomerData').then(fx => {
      fx.data.model.variables[0].value.result[2].hidden = false;
      cy.route('POST', '/cg/complete?askAdditionalCustomerData', fx);
      cy.log(fx.data.model.variables[0].value.result[2]);
    });
    cy.login();
    navigateThroughLanding();
    navigateThroughSearchAddress();
    navigateThroughCustomerInfo();
  });

  beforeEach('Establish fixtures', () => {
    stubWithBlankAnswers();
    cy.fixture('stubs/complete/askAdditionalCustomerData').then(fx => {
      fx.data.model.variables[0].value.result[2].hidden = false;
      cy.route('POST', '/cg/complete?askAdditionalCustomerData', fx);
      cy.log(fx.data.model.variables[0].value.result[2]);
    });
  });

  // it('NEG:All Inputs Empty Value', () => {
  //   cy.submitAndCheckValidation(fields);
  // });

  // it('NEG:"Is the home or any structure on the property ever rented?" Empty Value', () => {
  //   cy.reload();
  //   toggleExcept(['rented'], uwData);
  //   cy.submitAndCheckValidation(['rented']);
  // });

  // it('NEG:"When was the last claim filed?" Empty Value', () => {
  //   cy.reload();
  //   toggleExcept(['previousClaims'], uwData);
  //   cy.submitAndCheckValidation(['previousClaims']);
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

  it('POS:Property Ever Rented Text / Input', () =>
    cy.reload().checkLabel('rented', 'Is the home or any structures on the property ever rented?')
      .checkRadios('rented', ['Yes', 'Occasionally', 'Never'])
      .clickEachRadio('rented')
  );

  it('POS:Last Claim Filed Text / Input', () =>
    cy.reload().checkLabel('previousClaims', 'When was the last claim filed?')
      .checkRadios('previousClaims', ['No claims ever filed', 'Less than 3 Years', '3-5 Years', 'Over 5 Years', 'Unknown'])
      .clickEachRadio('previousClaims')
  );


  it('POS:Owner Lives Text / Input', () =>
    cy.reload().checkLabel('monthsOccupied', 'How many months a year does the owner live in the home?')
      .checkRadios('monthsOccupied', ['0-3', '4-6', '7-9', '10+'])
      .clickEachRadio('monthsOccupied')
  );

  it('POS:Wiring, Plumbing, and HVAC Text / Input', () =>
    cy.reload().checkLabel('fourPointUpdates', 'Have the wiring, plumbing, and HVAC been updated in the last 35 years?')
      .checkRadios('fourPointUpdates', ['Yes', 'No', 'Unknown'])
      .clickEachRadio('fourPointUpdates')
  );

  it('POS:Business Conducted Text / Input', () =>
    cy.reload().checkLabel('business', 'Is a business conducted on the property?')
      .checkRadios('business', ['Yes', 'No'])
      .clickEachRadio('business')
  );

  it('POS:Underwriting Next Button', () =>
    cy.checkNextButton()
  );
});
