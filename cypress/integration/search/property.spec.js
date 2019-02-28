import _ from 'lodash';

import stubAllRoutes from "../../support/stubAllRoutes";
import {
  navigateThroughLanding
} from '../../helpers';
import user from '../../fixtures/stockData/user.json';

describe('Property Address Search Testing', () => {
  const type = text => cy.findDataTag('address').find('input').type(text);
  const clear = () => cy.findDataTag('address').find('input').type('{selectall}{backspace}');
  const hasSearchInput = address =>
    cy.findDataTag('search-results').find('li a section h4').should('contain', address.toUpperCase());
  const isButtonDisabled = () => cy.findDataTag('submit').should('be.disabled');
  const fillAndCheckErrors = (text, submit = true) => {
    cy.findDataTag('address').find('input').type(text);
    submit ? cy.clickSubmit().then(() => hasSearchInput(text.trim())) : isButtonDisabled();
    clear();
  };

  before('Go to the search page', () => {
    stubAllRoutes();
    cy.login();
    navigateThroughLanding();
  });

  beforeEach('Establish fixtures', () => {
    stubAllRoutes();
    cy.fixture('stockData/user').as('user');
  });

  it('NEG:Property Address Search Bar Empty Value', () => {
    const { address } = user;

    isButtonDisabled();
    fillAndCheckErrors('     ', false);
    fillAndCheckErrors(`  ${address}`);
    fillAndCheckErrors(`      ${address}`);
    fillAndCheckErrors(`${address}  `);
    fillAndCheckErrors(`${address}     `);
  });

  it('NEG:Test Invalid Addresses', () => {
    cy.fixture('stubs/fetchAddresses.json').then(fx => {
      const { address } = user;
      const currentFixture = _.cloneDeep(fx);
      const res = { result: { IndexResult: [] } };
      _.mergeWith(currentFixture, res, (obj, src) => !_.isNil(src) ? src : obj);
      cy.route('POST', '/svc?fetchAddresses', currentFixture);

      type('ADDRESS NOT FOUND');
      cy.clickSubmit()
        .findDataTag('no-results').find('.no-results .card-header > h4')
        .should('contain', 'No Results Found')
        .findDataTag('no-results').find('.no-results .card-block > p')
        .should('contain', 'We\'re sorry we couldn\'t');
      clear();

      type(`{selectall}{backspace}${address}π`);
      isButtonDisabled();
      cy.findDataTag('address').find('label span > i')
        .should('exist')
        .and('be.visible')
        .trigger('mouseenter')
        .get('[data-id="tooltip"]')
        // workaround for visibility testing in Cypress Chrome 67
        .should('have.css', 'visibility', 'visible')
        .and('contain', 'Invalid characters');
    });
  });

  it('POS:Property Search', () => {
    const { address } = user;
    cy.findDataTag('address').find('label').should('contain', 'Property Address')
      .findDataTag('search-results').find('div small p').each($el => expect($el).to.contain('If'))
      .findDataTag('address').find('input[name="address"]').should('have.attr', 'placeholder', 'Search for Property Address');
    type(`{selectall}{backspace}${address}`);
    cy.findDataTag('address').find('[name="address"]').should('have.attr', 'value', address)
      .findDataTag('submit').should('exist').and('not.be.disabled')
      .clickSubmit().then(() => hasSearchInput(address))
      .findDataTag('search-results').find('li').first().find('a').children()
      .first().should('have.attr', 'class', 'card-icon fa fa-map-marker')
      .next().should('exist')
      .next().should('have.attr', 'class', 'fa fa-chevron-circle-right');
  });
});
