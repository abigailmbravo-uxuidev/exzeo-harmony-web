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
  navigateThroughMailingBilling,
  navigateThroughScheduleDate,
  navigateThroughVerify
} from '../../helpers';

describe('Back Button Testing', () => {
  // Grab the quote number off the ui and retrieve it to confirm our quote is searchable with the quote number
  const getQuoteNumberAndRetrieve = () =>
    cy.findDataTag('quoteNumberDetail').find('> dl > div > dd').then($quote =>
      cy.go('back')
        .get('div.dashboard-message').should('exist')
        .get('.btn[href="/search/retrieve"]').click()
        .findDataTag('quoteNumber').type($quote.text())
        .clickSubmit('#SearchBar')
        .findDataTag('quote-list').should('not.be.empty')
        .go('back')
    );

  before(() => {
    setRouteAliases();
    cy.login();
    navigateThroughLanding();
  });

  beforeEach(() => setRouteAliases());

  it('Browser Back Button (Part 1)', () => {
    cy.go('back')
      .get('div.dashboard-message').should('exist');

    navigateThroughLanding();
    navigateThroughSearchAddress();
    cy.wait('@getZipcodeSettings').go('back')
      .get('div.dashboard-message').should('exist');

    navigateThroughLanding();
    navigateThroughSearchAddress();
    navigateThroughPolicyholder();
    cy.go('back')
      .get('div.dashboard-message').should('exist');

    navigateThroughLanding();
    navigateThroughSearchAddress();
    navigateThroughPolicyholder();
    navigateThroughUnderwriting();
    getQuoteNumberAndRetrieve();

    navigateThroughLanding();
    navigateThroughSearchAddress();
    navigateThroughPolicyholder();
    navigateThroughUnderwriting();
    navigateThroughCustomize();
    getQuoteNumberAndRetrieve();
  });

  it('Browser Back Button (Part 2)', () => {
    navigateThroughLanding();
    navigateThroughSearchAddress();
    navigateThroughPolicyholder();
    navigateThroughUnderwriting();
    navigateThroughCustomize();
    navigateThroughShare();
    getQuoteNumberAndRetrieve();

    navigateThroughLanding();
    navigateThroughSearchAddress();
    navigateThroughPolicyholder();
    navigateThroughUnderwriting();
    navigateThroughCustomize();
    navigateThroughShare();
    navigateThroughAssumptions();
    getQuoteNumberAndRetrieve();

    navigateThroughLanding();
    navigateThroughSearchAddress();
    navigateThroughPolicyholder();
    navigateThroughUnderwriting();
    navigateThroughCustomize();
    navigateThroughShare();
    navigateThroughAssumptions();
    navigateThroughAdditionalInterests();
    getQuoteNumberAndRetrieve();

    navigateThroughLanding();
    navigateThroughSearchAddress();
    navigateThroughPolicyholder();
    navigateThroughUnderwriting();
    navigateThroughCustomize();
    navigateThroughShare();
    navigateThroughAssumptions();
    navigateThroughAdditionalInterests();
    navigateThroughMailingBilling();
    getQuoteNumberAndRetrieve();

    navigateThroughLanding();
    navigateThroughSearchAddress();
    navigateThroughPolicyholder();
    navigateThroughUnderwriting();
    navigateThroughCustomize();
    navigateThroughShare();
    navigateThroughAssumptions();
    navigateThroughAdditionalInterests();
    navigateThroughMailingBilling();
    navigateThroughVerify();
    getQuoteNumberAndRetrieve();
  });

  it('Browser Back Button (Part 3)', () => {
    navigateThroughLanding();
    navigateThroughSearchAddress();
    navigateThroughPolicyholder();
    navigateThroughUnderwriting();
    navigateThroughCustomize();
    navigateThroughShare();
    navigateThroughAssumptions();
    navigateThroughAdditionalInterests();
    navigateThroughMailingBilling();
    navigateThroughVerify();
    navigateThroughScheduleDate();
    cy.wait('@agencySubmitApplication').go('back')
      .get('div.dashboard-message').should('exist');
  });
});
