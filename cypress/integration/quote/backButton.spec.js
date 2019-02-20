import routes from "../../support/routes";

describe('Back Button Testing', () => {
  const getAndSearchQuote = () => {
    cy.wait(3500);
    cy.findDataTag('quote-details').find('> dl > div > dd.fade').then($quote => {
      cy.go('back');
      cy.url().should('eql', `${Cypress.config('baseUrl')}/`);
      cy.get('.btn[href="/search/retrieve"]').click();
      cy.findDataTag('quoteNumber').find('input').type($quote.text());
      cy._submit('#SearchBar');
      cy.findDataTag('quote-list').should('not.be.empty');
      cy.wait(1500);
      cy.go('back');
    });
  };

  before(() => {
    cy.quoteWorkflow('searchAddress');
  });

  it('Browser Back Button (Part 1)', () => {
    cy.go('back');
    cy.url().should('eql', `${Cypress.config('baseUrl')}/`);

    cy.quoteWorkflow('customerInfo', 'landing');
    cy.wait(1500);
    cy.go('back');
    cy.url().should('eql', `${Cypress.config('baseUrl')}/`);

    cy.quoteWorkflow('underwriting', 'landing');
    cy.wait(1500);
    cy.go('back');
    cy.url().should('eql', `${Cypress.config('baseUrl')}/`);

    cy.quoteWorkflow('customize', 'landing');
    getAndSearchQuote();

    cy.quoteWorkflow('share', 'landing');
    getAndSearchQuote();
  });

  it('Browser Back Button (Part 2)', () => {
    cy.quoteWorkflow('assumptions', 'landing');
    getAndSearchQuote();

    cy.quoteWorkflow('additionalInterests', 'landing');
    getAndSearchQuote();

    cy.quoteWorkflow('mailingBilling', 'landing');
    getAndSearchQuote();

    cy.quoteWorkflow('verify', 'landing');
    getAndSearchQuote();

    cy.quoteWorkflow('scheduleDate', 'landing');
    getAndSearchQuote();
  });

  it('Browser Back Button (Part 3)', () => {
    cy.quoteWorkflow('thankYou', 'landing');
    cy.wait(1500);
    cy.go('back');
    cy.url().should('eql', `${Cypress.config('baseUrl')}/`);
  });
});
