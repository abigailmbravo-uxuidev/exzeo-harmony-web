import { chmodSync } from "fs";

describe('Property Address Search Testing', () => {
  const type = text => cy.findDataTag('address').type(text);
  const clear = () => type('{selectall}{backspace}');
  const submit = () => cy.findDataTag('submit').click();
  const hasSearchInput = address => cy.findDataTag('search-results').find('li a section h4')
    .should('contain', address.toUpperCase());
  const buttonIsDisabled = () => cy.findDataTag('submit').should('be.disabled');
  
  before('Go to the search page', () => {
    cy.quoteWorkflow('searchAddress');
  });

  it('Test Empty Values', () => {
    buttonIsDisabled();
    
    type('     ');
    buttonIsDisabled();
    clear();

    type(' 4131 Test Address');
    submit();
    hasSearchInput('4131 Test Address');
    clear();

    type('{selectall}{backspace}     4131 Test Address');
    submit();
    hasSearchInput('4131 Test Address');
    clear();

    type('{selectall}{backspace}4131 Test Address ');
    submit();
    hasSearchInput('4131 Test Address');
    clear();

    type('{selectall}{backspace}4131 Test Address     ');
    submit();
    hasSearchInput('4131 Test Address');
    clear();
  });

  it('Test Invalid Addresses', () => {
    type('INVALID ADDRESS')
    submit();
    cy.findDataTag('no-results').find('.no-results .card-header > h4')
      .should('contain', 'No Results Found');
    cy.findDataTag('no-results').find('.no-results .card-block > p')
      .should('contain', 'We\'re sorry we couldn\'t');
    clear();

    type('{selectall}{backspace}4131 Test Addressπ');
    buttonIsDisabled();

    cy.findDataTag('address_label').find('span > i')
      .should('exist')
      .and('be.visible')
      .trigger('mouseenter');

    cy.get('[data-id="tooltip"]')
    // workaround for visibility testing in Cypress Chrome 67
      .should('have.css', 'visibility', 'visible')
      .and('contain', 'Invalid characters');
  });
});