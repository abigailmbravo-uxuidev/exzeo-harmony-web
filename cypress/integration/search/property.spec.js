describe('Property Address Search Testing', () => {
  const type = text => cy.findDataTag('address').type(text);
  const clear = () => cy.findDataTag('address').type('{selectall}{backspace}');
  const hasSearchInput = address => 
    cy.findDataTag('search-results').find('li a section h4').should('contain', address.toUpperCase());
  const buttonIsDisabled = () => cy.findDataTag('submit').should('be.disabled');
  
  before('Go to the search page', () => {
    cy.quoteWorkflow('searchAddress');
  });

  beforeEach('Establish fixtures', () => {
    cy.fixture('user').as('user');
  });

  it('Test Empty Values', function() {
    const { user: { address }} = this;

    buttonIsDisabled();
    
    type('     ');
    buttonIsDisabled();
    clear();

    type(` ${address}`)
    cy._submit();
    hasSearchInput(address);
    clear();

    type(`{selectall}{backspace}     ${address}`);
    cy._submit();
    hasSearchInput(address);
    clear();

    type(`{selectall}{backspace}${address} `);
    cy._submit();
    hasSearchInput(address);
    clear();

    type(`{selectall}{backspace}${address}     `);
    cy._submit();
    hasSearchInput(address);
    clear();
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