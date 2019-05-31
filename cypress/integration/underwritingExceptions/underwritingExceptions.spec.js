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
    navigateThroughCustomize();
    // We see a modal containing the uw error.
    cy.get('ul.error').should('contain', 'Due to previous claims history, underwriting review is required prior to binding.')
      .findDataTag('modal-refresh').should('contain', 'Refresh')
      .click().wait('@getQuote')
      // Policyholder should be able to be navigated through without re-filling out the form.
      .clickSubmit('#QuoteWorkflow').wait('@updateQuote');
    // Go back through with good data.
    navigateThroughUnderwriting();
    navigateThroughCustomize();
    navigateThroughShare();
    navigateThroughAssumptions();
    navigateThroughAdditionalInterests();
    // On mailing billing, we stub the post request.
    cy.route('POST', '/svc?quoteManager.updateQuote', {
      ...updateQuote,
      result: {
        ...updateQuote.result,
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
    }).as('updateQuote');
    navigateThroughMailingBilling();
    cy.get('div#Error').should('contain', 'Please contact one of our representatives so they may further assist you in obtaining a HO3 insurance quote for this property.');
  });
});
