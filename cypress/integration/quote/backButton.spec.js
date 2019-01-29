describe('Back Button Testing', () => {
  const getAndSearchQuote = () => {
    cy.wait(3500);
    cy.get('#quoteDetails > dl > div > dd.fade').then($quote => {
      cy.go('back');
      cy.url().should('eql', `${Cypress.env('REACT_APP_CYPRESS_URL')}/`);
      cy.get('.btn[href="/search/retrieve"]').click();
      cy.findDataTag('quoteNumber').type('12-5156827-01');
      cy._submit('#SearchBar');
      cy.findDataTag('quote-list').should('not.be.empty');
      cy.wait(1500);
      cy.go('back');
    });
  };

  beforeEach(() => {
    cy.quoteWorkflow('searchAddress');
  });

  it('Browser Back Button (Part 1)', () => {
    cy.go('back');
    cy.url().should('eql', `${Cypress.env('REACT_APP_CYPRESS_URL')}/`);

    cy.quoteWorkflow('customerInfo', 'landing');
    cy.wait(1500);
    cy.go('back');
    cy.url().should('eql', `${Cypress.env('REACT_APP_CYPRESS_URL')}/`);

    cy.quoteWorkflow('underwriting', 'landing');
    cy.wait(1500);
    cy.go('back');
    cy.url().should('eql', `${Cypress.env('REACT_APP_CYPRESS_URL')}/`);

    cy.quoteWorkflow('customize', 'landing');
    getAndSearchQuote();

    cy.quoteWorkflow('share', 'landing');
    getAndSearchQuote();
  });

  it('Browser Back Button (Part 2)', () => {
    cy.quoteWorkflow('assumptions', 'searchAddress');
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
    cy.quoteWorkflow('thankYou', 'searchAddress');
    cy.wait(1500);
    cy.go('back');
    cy.url().should('eql', `${Cypress.env('REACT_APP_CYPRESS_URL')}/`);
  });
});