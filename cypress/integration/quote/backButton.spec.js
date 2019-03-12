import stubAllRoutes from "../../support/stubAllRoutes";
import {
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
  const getAndSearchQuote = () => {
    
    cy.findDataTag('quote-details').find('> dl > div > dd.fade').then($quote => {
      cy.go('back')
        .url().should('eql', `${Cypress.config('baseUrl')}/`)
        .get('.btn[href="/search/retrieve"]').click()
        .findDataTag('quoteNumber').find('input').type($quote.text())
        .clickSubmit('#SearchBar')
        .findDataTag('quote-list').should('not.be.empty')
        .go('back');
    });
  };

  before(() => {
    stubAllRoutes();
    cy.login();
    navigateThroughLanding();
  });

  beforeEach(() => stubAllRoutes());

  it('Browser Back Button (Part 1)', () => {
    cy.go('back')
      .url().should('eql', `${Cypress.config('baseUrl')}/`);

    navigateThroughLanding();
    navigateThroughSearchAddress();
    cy.wait('@getZipcodeSettings').go('back')
      .url().should('eql', `${Cypress.config('baseUrl')}/`);

    navigateThroughLanding();
    navigateThroughSearchAddress();
    navigateThroughPolicyholder();
    cy.go('back')
      .url().should('eql', `${Cypress.config('baseUrl')}/`);

    navigateThroughLanding();
    navigateThroughSearchAddress();
    navigateThroughPolicyholder();
    navigateThroughUnderwriting();
    getAndSearchQuote();

    navigateThroughLanding();
    navigateThroughSearchAddress();
    navigateThroughPolicyholder();
    navigateThroughUnderwriting();
    navigateThroughCustomize();
    getAndSearchQuote();
  });

  it('Browser Back Button (Part 2)', () => {
    navigateThroughLanding();
    navigateThroughSearchAddress();
    navigateThroughPolicyholder();
    navigateThroughUnderwriting();
    navigateThroughCustomize();
    navigateThroughShare();
    getAndSearchQuote();

    navigateThroughLanding();
    navigateThroughSearchAddress();
    navigateThroughPolicyholder();
    navigateThroughUnderwriting();
    navigateThroughCustomize();
    navigateThroughShare();
    navigateThroughAssumptions();
    getAndSearchQuote();

    navigateThroughLanding();
    navigateThroughSearchAddress();
    navigateThroughPolicyholder();
    navigateThroughUnderwriting();
    navigateThroughCustomize();
    navigateThroughShare();
    navigateThroughAssumptions();
    navigateThroughAdditionalInterests();
    getAndSearchQuote();

    navigateThroughLanding();
    navigateThroughSearchAddress();
    navigateThroughPolicyholder();
    navigateThroughUnderwriting();
    navigateThroughCustomize();
    navigateThroughShare();
    navigateThroughAssumptions();
    navigateThroughAdditionalInterests();
    navigateThroughMailingBilling();
    getAndSearchQuote();

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
    getAndSearchQuote();
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
    cy.go('back')
      .url().should('eql', `${Cypress.config('baseUrl')}/`);
  });
});
