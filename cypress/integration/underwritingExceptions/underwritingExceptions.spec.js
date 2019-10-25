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
import { underwritingHO3, updateQuote } from '../../fixtures';

describe('Underwriting Error Testing', () => {
  before('Login and go to Underwriting', () => {
    cy.login();
    setRouteAliases();
    navigateThroughLanding();
    navigateThroughSearchAddress();
    navigateThroughPolicyDetails();
  });

  it('Underwriting Error', () => {
    // Give underwriting bad data.
    navigateThroughUnderwriting({
      ...underwritingHO3,
      previousClaims: '3-5 Years'
    });
    navigateThroughCustomize();
    // We go to the error page.
    cy.get('ul.error')
      .should(
        'contain',
        'Due to previous claims history, underwriting review is required prior to binding.'
      )
      .findDataTag('edit')
      .should('contain', 'Edit')
      .click()
      // Policyholder should be able to be navigated through without re-filling out the form.
      .clickSubmit('#QuoteWorkflow')
      .wait('@updateQuote');
    // Go back through with good data.
    navigateThroughUnderwriting();
    navigateThroughCustomize();
    navigateThroughShare();
    navigateThroughAssumptions();
    navigateThroughPolicyholder();
    navigateThroughAdditionalInterests();
    // On mailing billing, we stub the post request.
    cy.route('POST', '/svc?quoteManager.updateQuote', {
      ...updateQuote,
      result: {
        ...updateQuote.result,
        underwritingExceptions: [
          {
            code: '003',
            displayText: 'Missing Info - Mailing/Billing Info',
            category: 'Coverages & Deductibles',
            action: 'Missing Info',
            agentMessage:
              'Missing required information to complete quote -  Mailing/Billing Info',
            internalMessage:
              'Missing required information to complete quote -  Mailing/Billing Info',
            active: true,
            canOverride: false,
            overridden: false
          }
        ]
      }
    }).as('updateQuote');
    navigateThroughMailingBilling();
    cy.get('button.btn-primary').click();
    cy.get('div#Error').should(
      'contain',
      "Sorry for the inconvenience, either the page you're looking for does not exist or we're experiencing an issue with our application at the moment."
    );
  });
});
