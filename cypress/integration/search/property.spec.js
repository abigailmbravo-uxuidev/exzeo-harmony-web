import { chmodSync } from "fs";

describe('Property Address Search Bar Testing', () => {
  const hasSearchInput = address => cy.get('[data-test="search-results"] li a section h4')
    .should('contain', address.toUpperCase());
  const buttonIsDisabled = () => cy.get('@button').should('be.disabled');
  const clearText = () => cy.get('@input').type('{selectall}{backspace}');

  before('Go to the search page', () => {
    cy.quoteWorkflow('searchAddress');
  });

  beforeEach('Create aliases', () => {
    cy.get('[data-test="submit"]').as('button');
    cy.get('[data-test="address"]').as('input');
    cy.get('form#SearchBar').as('form');
  });

  it('Test Empty Values', () => {
    buttonIsDisabled();
    
    cy.get('@input').type('     ');
    buttonIsDisabled();
    clearText();

    cy.get('@input').type(' 4131 Test Address');
    cy.get('@form').submit();
    hasSearchInput('4131 Test Address');
    clearText();

    cy.get('@input').type('{selectall}{backspace}     4131 Test Address');
    cy.get('@form').submit();
    hasSearchInput('4131 Test Address');
    clearText();

    cy.get('@input').type('{selectall}{backspace}4131 Test Address ');
    cy.get('@form').submit();
    hasSearchInput('4131 Test Address');
    clearText();

    cy.get('@input').type('{selectall}{backspace}4131 Test Address     ');
    cy.get('@form').submit();
    hasSearchInput('4131 Test Address');
    clearText();
  });

  it('Test Invalid Addresses', () => {
    cy.get('@input').type('INVALID ADDRESS')
    cy.get('@form').submit();
    cy.get('[data-test="no-results"] .no-results .card-header > h4')
      .should('contain', 'No Results Found');
    cy.get('[data-test="no-results"] .no-results .card-block > p')
      .should('contain', 'We\'re sorry we couldn\'t');
    clearText();

    cy.get('@input').type('{selectall}{backspace}4131 Test Addressπ');
    buttonIsDisabled();

    cy.get('[data-test="address_label"] span > i')
      .should('exist')
      .and('be.visible')
      .trigger('mouseenter');

    cy.get('[data-id="tooltip"]')
    // workaround for visibility testing in Cypress Chrome 67
      .should('have.css', 'visibility', 'visible')
      .and('contain', 'Invalid characters');
  });
});