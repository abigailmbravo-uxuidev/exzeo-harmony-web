import routes from "../../support/routes";

describe('Property Address Search Testing', () => {
  const type = text => cy.findDataTag('address').find('input').type(text);
  const clear = () => cy.findDataTag('address').find('input').type('{selectall}{backspace}');
  const hasSearchInput = address =>
    cy.findDataTag('search-results').find('li a section h4').should('contain', address.toUpperCase());
  const isButtonDisabled = () => cy.findDataTag('submit').should('be.disabled');
  const fillAndCheckErrors = (text, submit = true) => {
    cy.findDataTag('address').find('input').type(text);
    submit ? cy._submit().then(() => hasSearchInput(text.trim())) : isButtonDisabled();
    clear();
  };

  before('Go to the search page', () => {
    routes();
    cy.quoteWorkflow('searchAddress');
  });

  beforeEach('Establish fixtures', () => {
    routes();
    cy.fixture('stockData/user').as('user');
  });

  it('Property Address Search Bar Empty Value', function() {
    const { user: { address }} = this;

    isButtonDisabled();

    fillAndCheckErrors('     ', false);

    fillAndCheckErrors(`  ${address}`);

    fillAndCheckErrors(`      ${address}`);

    fillAndCheckErrors(`${address}  `);

    fillAndCheckErrors(`${address}     `);
  });

  it('Test Invalid Addresses', function() {
    const { user: { address } } = this;

    type('INVALID ADDRESS');
    cy._submit();
    cy.findDataTag('no-results').find('.no-results .card-header > h4')
      .should('contain', 'No Results Found');
    cy.findDataTag('no-results').find('.no-results .card-block > p')
      .should('contain', 'We\'re sorry we couldn\'t');
    clear();

    type(`{selectall}{backspace}${address}π`);
    isButtonDisabled();
    cy.findDataTag('address').find('label span > i')
      .should('exist')
      .and('be.visible')
      .trigger('mouseenter');
    cy.get('[data-id="tooltip"]')
    // workaround for visibility testing in Cypress Chrome 67
      .should('have.css', 'visibility', 'visible')
      .and('contain', 'Invalid characters');
  });
});
