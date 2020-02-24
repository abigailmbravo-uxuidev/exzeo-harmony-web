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
  navigateThroughMailingBilling,
  navigateThroughSendApplicationAndBind,
  navigateThroughVerify
} from '../../helpers';

import { mailingBillingTest } from '../../pageTests';

describe('Back Button Testing', () => {
  // Grab the quote number off the ui and retrieve it to confirm our quote is searchable with the quote number
  const getQuoteNumberAndRetrieve = status =>
    cy
      .findDataTag('quoteNumberDetail')
      .find('> dl > div > dd')
      .then($quote =>
        cy
          .go('back')
          .get('div.dashboard-message')
          .should('exist')
          .get('.btn[href="/search/retrieve"]')
          .click()
          .findDataTag('quoteNumber')
          .type($quote.text())
          .clickSubmit('#SearchBar')
          .findDataTag('quote-list')
          .should('not.be.empty')
          .find('li.card .quote-state')
          .should('contain', status)
          .go('back')
      );

  before('Login and go to search', () => {
    cy.login();
    navigateThroughLanding();
  });
  beforeEach('Set Route Aliases', () => setRouteAliases());

  it('Browser Back Button', () => {
    cy.go('back')
      .get('div.dashboard-message')
      .should('exist');

    navigateThroughLanding();
    navigateThroughSearchAddress();
    cy.wait('@getZipcodeSettings')
      .go('back')
      .get('div.dashboard-message')
      .should('exist');
  });

  it('Browser Back Button pt 2', () => {
    navigateThroughLanding();
    navigateThroughSearchAddress();
    navigateThroughPolicyDetails();
    cy.go('back')
      .get('div.dashboard-message')
      .should('exist');

    navigateThroughLanding();
    navigateThroughSearchAddress();
    navigateThroughPolicyDetails();
    navigateThroughUnderwriting();
    getQuoteNumberAndRetrieve('Quote Qualified');

    navigateThroughLanding();
    navigateThroughSearchAddress();
    navigateThroughPolicyDetails();
    navigateThroughUnderwriting();
    navigateThroughCustomize();
    getQuoteNumberAndRetrieve('Quote Qualified');

    navigateThroughLanding();
    navigateThroughSearchAddress();
    navigateThroughPolicyDetails();
    navigateThroughUnderwriting();
    navigateThroughCustomize();
    navigateThroughShare();
    navigateThroughAssumptions();
    navigateThroughPolicyholder();
    navigateThroughAdditionalInterests();
    // mailingBillingTest();
    navigateThroughMailingBilling();
    getQuoteNumberAndRetrieve('Application Ready');
  });

  it('Browser back button pt 3', () => {
    navigateThroughLanding();
    navigateThroughSearchAddress();
    navigateThroughPolicyDetails();
    navigateThroughUnderwriting();
    navigateThroughCustomize();
    navigateThroughShare();
    navigateThroughAssumptions();
    navigateThroughPolicyholder();
    navigateThroughAdditionalInterests();
    navigateThroughMailingBilling();

    navigateThroughVerify();
    getQuoteNumberAndRetrieve('Application Ready');

    navigateThroughLanding();
    navigateThroughSearchAddress();
    navigateThroughPolicyDetails();
    navigateThroughUnderwriting();
    navigateThroughCustomize();
    navigateThroughShare();
    navigateThroughAssumptions();
    navigateThroughPolicyholder();
    navigateThroughAdditionalInterests();
    navigateThroughMailingBilling();
    navigateThroughVerify();
    navigateThroughSendApplicationAndBind();
    cy.wait('@sendApplication');
    cy.go('back')
      .get('div.dashboard-message')
      .should('exist');
  });
});
