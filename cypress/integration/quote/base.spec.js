import { userAF3, loginAF3, underwritingAF3 } from '../../fixtures';
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
  navigateThroughVerify,
  navigateThroughScheduleDate,
  navigateThroughThankYou
} from '../../helpers';
import {
  policyholderTest,
  underwritingTest,
  customizeTest,
  shareTest,
  additionalInterestTest,
  mailingBillingTest,
  verifyTest
} from '../../pageTests';

describe('Agency Happy Path', () => {
  before('Login', () => cy.login());
  beforeEach('Set Route Aliases', () => setRouteAliases());

  it('Navigates through the HO3 quote workflow', () => {
    navigateThroughLanding();
    navigateThroughSearchAddress();
    policyholderTest();
    navigateThroughPolicyholder();

    underwritingTest();
    navigateThroughUnderwriting();
    customizeTest();
    navigateThroughCustomize();

    shareTest();
    navigateThroughShare();
    navigateThroughAssumptions();
    additionalInterestTest();
    navigateThroughAdditionalInterests();

    mailingBillingTest();
    navigateThroughMailingBilling();
    verifyTest();
    navigateThroughVerify();
    navigateThroughScheduleDate();

    cy.findDataTag('quoteNumberDetail').find('> dl > div > dd').then($quote => {
      navigateThroughThankYou();
      cy.wait(20000)
        .get('.btn[href="/search/retrieve"]').click()
        .findDataTag('quoteNumber').type($quote.text())
        .clickSubmit('#SearchBar')
        .findDataTag('quote-list').should('not.be.empty')
        .find('.card .card-detail-wrapper .quote-state').should('contain', 'Application Sent DocuSign')
        .go('back');
    });
  });
});

describe('AF3 Happy Path', () => {
  before('Login', () => cy.login(loginAF3));
  beforeEach('Set Route Aliases', () => setRouteAliases());

  it('Navigates through the AF3 quote workflow', () => {
    navigateThroughLanding();
    cy.findDataTag('product').select('AF3');
    navigateThroughSearchAddress(userAF3);
    policyholderTest('AF3');
    navigateThroughPolicyholder(userAF3);
    underwritingTest('AF3');
    navigateThroughUnderwriting(underwritingAF3);
    // customizeTest('AF3');
    navigateThroughCustomize();
    shareTest('AF3');
    navigateThroughShare();
    navigateThroughAssumptions();
    additionalInterestTest('AF3');
    navigateThroughAdditionalInterests();
    mailingBillingTest('AF3');
    navigateThroughMailingBilling();
    verifyTest('AF3');
    navigateThroughVerify();
    navigateThroughScheduleDate();

    // TODO unwrap this test to run in CI when ready
    if (Cypress.env('CI') === true) {
      cy.task(
        'log',
        "CI is set to true - not retrieving AF3 quote to check 'quoteState' === 'Application Sent DocuSign'"
      );
    } else {
      cy.findDataTag('quoteNumberDetail')
        .find('> dl > div > dd')
        .then($quote => {
          navigateThroughThankYou();
          cy.wait(15000)
            .get('.btn[href="/search/retrieve"]')
            .click()
            .findDataTag('quoteNumber')
            .type($quote.text())
            .clickSubmit('#SearchBar')
            .findDataTag('quote-list')
            .should('not.be.empty')
            .go('back');
        });
    }
    if (Cypress.env('CI') === 'true') {
      cy.task('log', 'CI is set to true - not retrieving AF3 quote to check \'quoteState\' === \'Application Sent DocuSign\'')
    } else {
      cy.findDataTag('quoteNumberDetail').find('> dl > div > dd').then($quote => {
        navigateThroughThankYou();
        cy.wait(15000)
          .get('.btn[href="/search/retrieve"]').click()
          .findDataTag('quoteNumber').type($quote.text())
          .clickSubmit('#SearchBar')
          .findDataTag('quote-list').should('not.be.empty')
          .go('back');
      });
    }
});
