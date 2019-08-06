import {
  setRouteAliases,
  navigateThroughLanding,
  navigateThroughSearchAddress,
  navigateThroughPolicyholder,
  navigateThroughUnderwriting,
  navigateThroughCustomize,
  navigateThroughShare,
  navigateThroughAssumptions,
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
    navigateThroughPolicyholder();
  });

  it('Underwriting Error', () => {
    // Give underwriting bad data.
    navigateThroughUnderwriting({
      ...underwritingHO3,
      'previousClaims': '3-5 Years'
    });

    // We go to the error page.
    cy.get('ul.error').should('contain', 'Due to previous claims history, underwriting review is required prior to binding.')
      .findDataTag('edit').should('contain', 'Edit')
      .click()
      // Policyholder should be able to be navigated through without re-filling out the form.
      .clickSubmit('#QuoteWorkflow').wait('@updateQuote');
    // Go back through with good data.
    navigateThroughUnderwriting();
    navigateThroughCustomize();
    navigateThroughShare();
    navigateThroughAssumptions();
    navigateThroughAdditionalInterests();
    // On mailing billing, we stub the post request.
    cy.route('POST', '/svc?quoteManager.reviewQuote', {
      ...updateQuote,
      result: {
        ...updateQuote.result,
        quoteState: 'Quote Stopped',
        underwritingExceptions: [{
          'code': '003',
          'displayText': 'Missing Info - Mailing/Billing Info',
          'category': 'Coverages & Deductibles',
          'action': 'Missing Info',
          'agentMessage': 'Missing required information to complete quote -  Mailing/Billing Info',
          'internalMessage': 'Missing required information to complete quote -  Mailing/Billing Info',
          'active': true,
          'canOverride': false,
          'overridden': false,
        }]
      }
    }).as('reviewQuote');
    navigateThroughMailingBilling();
    cy.get('div#Error').should('contain', "Sorry for the inconvenience, We're experiencing and application issue at the moment. Try refreshing the page or returning to the home screen.");
  });
});
