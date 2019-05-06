import { setRouteAliases, navigateThroughLanding } from '../../helpers';
import { userHO3, loginAF3 } from '../../fixtures';

const type = text => cy.findDataTag('address').type(text);
const clear = () => cy.findDataTag('address').type('{selectall}{backspace}');
const hasSearchInput = address =>
  cy.findDataTag('search-results').find('li a section h4').should('contain', address.toUpperCase());
const { address } = userHO3;

describe('Property Address Search Testing', () => {
  const clear = () => cy.findDataTag('address').type('{selectall}{backspace}');
  const hasSearchInput = address =>
    cy.findDataTag('search-results').find('li a section h4').should('contain', address.toUpperCase());
  const isButtonDisabled = () => cy.findDataTag('submit').should('be.disabled');
  const { address } = user;

  before('H03: Property Search Testing', () => {
  before('HO3: Property Search Testing', () => {
    cy.login();
  });

  beforeEach(() => setRouteAliases());

  it('NEG:Test Invalid Addresses', () => {
      type('ADDRESS NOT FOUND');
      cy.clickSubmit()
        .findDataTag('no-results').find('.no-results .card-header > h4')
        .should('contain', 'No Results Found')
        .findDataTag('no-results').find('.no-results .card-block > p')
        .should('contain', 'We\'re sorry we couldn\'t');
      clear();

      type(`{selectall}{backspace}${address}π`);
      cy.findDataTag('address_wrapper').find('span > i')
        .should('exist')
        .and('be.visible')
        .trigger('mouseenter').get('[data-id="tooltip"]')
        // workaround for visibility testing in Cypress Chrome 67
        .should('have.css', 'visibility', 'visible')
        .and('contain', 'Invalid characters');
  });

  it('POS:Property Search', () => {
    cy.findDataTag('address_label').should('contain', 'Property Address')
      .findDataTag('search-results').find('div small p').each($el => expect($el).to.contain('If'))
      .findDataTag('address').should('have.attr', 'placeholder', 'Search for Property Address');
    type(`{selectall}{backspace}${address}`);
    cy.findDataTag('address').should('have.attr', 'value', address)
      .findDataTag('submit').should('exist').and('not.be.disabled')
      .clickSubmit().then(() => hasSearchInput(address))
      .findDataTag('search-results').find('li').first().find('a').children()
      .first().should('have.attr', 'class', 'card-icon fa fa-map-marker')
      .next().should('exist')
      .next().should('have.attr', 'class', 'fa fa-chevron-circle-right');
  });
});

describe('AF3: Property Search Testing', () => {
  before('AF3: Property Search Testing', () => {
    setRouteAliases();
    cy.login(loginAF3);
    navigateThroughLanding();
  });

  beforeEach(() => setRouteAliases());

  it('NEG:Test Invalid Address', () => {
    type('ADDRESS NOT FOUND');
    cy.findDataTag('product').select('AF3')
      .clickSubmit()
      .findDataTag('no-results').find('.no-results .card-header > h4')
      .should('contain', 'No Results Found')
      .findDataTag('no-results').find('.no-results .card-block > p')
      .should('contain', 'We\'re sorry we couldn\'t');
    clear();

    type(`{selectall}{backspace}${address}π`);
    cy.findDataTag('address_wrapper').find('span > i')
      .should('exist')
      .and('be.visible')
      .trigger('mouseenter').get('[data-id="tooltip"]')
      // workaround for visibility testing in Cypress Chrome 67
      .should('have.css', 'visibility', 'visible')
      .and('contain', 'Invalid characters');
  });

  it('POS:Property Search', () => {
    cy.findDataTag('address_label').should('contain', 'Property Address')
      .findDataTag('search-results').find('div small p').each($el => expect($el).to.contain('If'))
      .findDataTag('address').should('have.attr', 'placeholder', 'Search for Property Address');
    type(`{selectall}{backspace}${address}`);

    cy.findDataTag('product').select('AF3')
      .findDataTag('address').should('have.attr', 'value', address)
      .findDataTag('submit').should('exist').and('not.be.disabled')
      .clickSubmit().then(() => hasSearchInput(address))
      .findDataTag('search-results').find('li').first().find('a').children()
      .first().should('have.attr', 'class', 'card-icon fa fa-map-marker')
      .next().should('exist')
      .next().should('have.attr', 'class', 'fa fa-chevron-circle-right');
  });
});
