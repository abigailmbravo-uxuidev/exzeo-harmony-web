import stubAllRoutes from "../../support/routes";
import {
  navLanding,
  navSearchAddress,
  navCustomerInfo,
  navUnderwriting,
  navCustomize,
  navShare,
  navAssumptions,
  navAdditionalInterests,
  navMailingBilling,
  navScheduleDate,
  navVerify
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
    navLanding();
  });

  beforeEach(() => stubAllRoutes());

  it('Browser Back Button (Part 1)', () => {
    cy.go('back');
    cy.url().should('eql', `${Cypress.config('baseUrl')}/`);

    navLanding();
    navSearchAddress();
    cy.wait(1500);
    cy.go('back');
    cy.url().should('eql', `${Cypress.config('baseUrl')}/`);

    navLanding();
    navSearchAddress();
    navCustomerInfo();
    cy.wait(1500);
    cy.go('back');
    cy.url().should('eql', `${Cypress.config('baseUrl')}/`);

    navLanding();
    navSearchAddress();
    navCustomerInfo();
    navUnderwriting();
    getAndSearchQuote();

    navLanding();
    navSearchAddress();
    navCustomerInfo();
    navUnderwriting();
    navCustomize();
    getAndSearchQuote();
  });

  it('Browser Back Button (Part 2)', () => {
    navLanding();
    navSearchAddress();
    navCustomerInfo();
    navUnderwriting();
    navCustomize();
    navShare();
    getAndSearchQuote();

    navLanding();
    navSearchAddress();
    navCustomerInfo();
    navUnderwriting();
    navCustomize();
    navShare();
    navAssumptions();
    getAndSearchQuote();

    navLanding();
    navSearchAddress();
    navCustomerInfo();
    navUnderwriting();
    navCustomize();
    navShare();
    navAssumptions();
    navAdditionalInterests();
    getAndSearchQuote();

    navLanding();
    navSearchAddress();
    navCustomerInfo();
    navUnderwriting();
    navCustomize();
    navShare();
    navAssumptions();
    navAdditionalInterests();
    navMailingBilling();
    getAndSearchQuote();

    navLanding();
    navSearchAddress();
    navCustomerInfo();
    navUnderwriting();
    navCustomize();
    navShare();
    navAssumptions();
    navAdditionalInterests();
    navMailingBilling();
    navVerify();
    getAndSearchQuote();
  });

  it('Browser Back Button (Part 3)', () => {
    navLanding();
    navSearchAddress();
    navCustomerInfo();
    navUnderwriting();
    navCustomize();
    navShare();
    navAssumptions();
    navAdditionalInterests();
    navMailingBilling();
    navVerify();
    navScheduleDate();
    cy.wait(1500);
    cy.go('back');
    cy.url().should('eql', `${Cypress.config('baseUrl')}/`);
  });
});
