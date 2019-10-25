import {
  setRouteAliases,
  navigateThroughLanding,
  navigateThroughSearchAddress,
  navigateThroughPolicyDetails,
  navigateThroughUnderwriting,
  navigateThroughCustomize,
  navigateThroughShare,
  navigateThroughAssumptions,
  navigateThroughPolicyholder,
  navigateThroughAdditionalInterests,
  navigateThroughMailingBilling
} from '../../helpers';

describe('Workflow Testing', () => {
  before('Login and move to quote', () => {
    setRouteAliases();
    cy.login();
    navigateThroughLanding();
    navigateThroughSearchAddress();
  });

  // Navigate through each page on workflow then click back to it, asserting existences for an element
  it('New Quote Workflow', () => {
    navigateThroughPolicyDetails();
    cy.findDataTag('tab-nav-1')
      .click()
      .findDataTag('Policy Details')
      .should('exist')
      .clickSubmit();

    navigateThroughUnderwriting();
    cy.findDataTag('tab-nav-2')
      .click()
      .findDataTag('underwritingAnswers.rented.answer_wrapper')
      .should('exist')
      .clickSubmit();

    navigateThroughCustomize();
    cy.findDataTag('tab-nav-3')
      .click()
      .findDataTag('Coverage Limits')
      .should('exist')
      .clickSubmit();

    navigateThroughShare();
    navigateThroughAssumptions();
    cy.findDataTag('tab-nav-4')
      .click()
      .findDataTag('Share')
      .should('exist')
      .clickSubmit();
    navigateThroughAssumptions();

    navigateThroughPolicyholder();
    cy.findDataTag('tab-nav-5')
      .click()
      .findDataTag('Primary Policyholder')
      .should('exist')
      .clickSubmit();

    navigateThroughAdditionalInterests();
    cy.findDataTag('tab-nav-6')
      .click()
      .get('p')
      .contains(
        'Please select the type of Additional Interest that you would like to add for this policy'
      )
      .should('exist')
      .clickSubmit();

    navigateThroughMailingBilling();
    cy.findDataTag('tab-nav-7')
      .click()
      .findDataTag('Mailing Address')
      .should('exist')
      .clickSubmit();
  });
});
