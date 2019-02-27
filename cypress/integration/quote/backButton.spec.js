import stubAllRoutes from "../../support/stubAllRoutes";
import {
  navigateThroughLanding,
  navigateThroughSearchAddress,
  navigateThroughCustomerInfo,
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
    cy.wait(3500);
    cy.findDataTag('quote-details').find('> dl > div > dd.fade').then($quote => {
      cy.go('back');
      cy.url().should('eql', `${Cypress.config('baseUrl')}/`);
      cy.get('.btn[href="/search/retrieve"]').click();
      cy.findDataTag('quoteNumber').find('input').type($quote.text());
      cy.clickSubmit('#SearchBar');
      cy.findDataTag('quote-list').should('not.be.empty');
      cy.wait(1500);
      cy.go('back');
    });
  };

  before(() => {
    stubAllRoutes();
    cy.login();
    navigateThroughLanding();
  });

  beforeEach(() => stubAllRoutes());

  it('Browser Back Button (Part 1)', () => {
    cy.go('back');
    cy.url().should('eql', `${Cypress.config('baseUrl')}/`);

    navigateThroughLanding();
    navigateThroughSearchAddress();
    cy.wait(1500);
    cy.go('back');
    cy.url().should('eql', `${Cypress.config('baseUrl')}/`);

    navigateThroughLanding();
    navigateThroughSearchAddress();
    navigateThroughCustomerInfo();
    cy.wait(1500);
    cy.go('back');
    cy.url().should('eql', `${Cypress.config('baseUrl')}/`);

    navigateThroughLanding();
    navigateThroughSearchAddress();
    navigateThroughCustomerInfo();
    navigateThroughUnderwriting();
    getAndSearchQuote();

    navigateThroughLanding();
    navigateThroughSearchAddress();
    navigateThroughCustomerInfo();
    navigateThroughUnderwriting();
    navigateThroughCustomize();
    getAndSearchQuote();
  });

  it('Browser Back Button (Part 2)', () => {
    navigateThroughLanding();
    navigateThroughSearchAddress();
    navigateThroughCustomerInfo();
    navigateThroughUnderwriting();
    navigateThroughCustomize();
    navigateThroughShare();
    getAndSearchQuote();

    navigateThroughLanding();
    navigateThroughSearchAddress();
    navigateThroughCustomerInfo();
    navigateThroughUnderwriting();
    navigateThroughCustomize();
    navigateThroughShare();
    navigateThroughAssumptions();
    getAndSearchQuote();

    navigateThroughLanding();
    navigateThroughSearchAddress();
    navigateThroughCustomerInfo();
    navigateThroughUnderwriting();
    navigateThroughCustomize();
    navigateThroughShare();
    navigateThroughAssumptions();
    navigateThroughAdditionalInterests();
    getAndSearchQuote();

    navigateThroughLanding();
    navigateThroughSearchAddress();
    navigateThroughCustomerInfo();
    navigateThroughUnderwriting();
    navigateThroughCustomize();
    navigateThroughShare();
    navigateThroughAssumptions();
    navigateThroughAdditionalInterests();
    navigateThroughMailingBilling();
    getAndSearchQuote();

    navigateThroughLanding();
    navigateThroughSearchAddress();
    navigateThroughCustomerInfo();
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
    navigateThroughCustomerInfo();
    navigateThroughUnderwriting();
    navigateThroughCustomize();
    navigateThroughShare();
    navigateThroughAssumptions();
    navigateThroughAdditionalInterests();
    navigateThroughMailingBilling();
    navigateThroughVerify();
    navigateThroughScheduleDate();
    cy.wait(1500);
    cy.go('back');
    cy.url().should('eql', `${Cypress.config('baseUrl')}/`);
  });
});
