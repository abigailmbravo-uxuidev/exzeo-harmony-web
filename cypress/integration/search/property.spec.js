describe('Property Address Search Bar Testing', () => {
  before('Go to the search page', () => {
    cy.quoteWorkflow('searchAddress');
  });

  // it('Test Empty Values', () => {
  //   cy.get('[data-test="searchPropertyAddress"]').then(el => {

  //     cy.wrap(el).find('[type="submit"]')
  //       .should('have.css', 'opacity', '0.65')
  //       .and('be.disabled');
      
  //     cy.wrap(el).find('input[name="address"]').type('    ');
  //     cy.wrap(el).find('[type="submit"]')
  //       .should('have.css', 'opacity', '0.65')
  //       .and('be.disabled');
      
  //     cy.wrap(el).find('input[name="address"]').type(' 4131 Test Address');
  //     cy.get('form#SearchBar').submit();
  //     cy.get('[data-test="resultCards"] > li h4')
  //       .should('contain', '4131 TEST ADDRESS');

  //     cy.wrap(el).find('input[name="address"]').type('{selectall}{backspace}    4131 Test Address');
  //     cy.get('form#SearchBar').submit();
  //     cy.get('[data-test="resultCards"] > li h4')
  //       .should('contain', '4131 TEST ADDRESS');

  //     cy.wrap(el).find('input[name="address"]').type('{selectall}{backspace}4131 Test Address ');
  //     cy.get('form#SearchBar').submit();
  //     cy.get('[data-test="resultCards"] > li h4')
  //       .should('contain', '4131 TEST ADDRESS');

  //     cy.wrap(el).find('input[name="address"]').type('{selectall}{backspace}4131 Test Address    ');
  //     cy.get('form#SearchBar').submit();
  //     cy.get('[data-test="resultCards"] > li h4')
  //       .should('contain', '4131 TEST ADDRESS');
  //   });
  // });

  it('Test Invalid Addresses', () => {
    cy.get('[data-test="searchPropertyAddress"]').then(el => { 
      // cy.wrap(el).find('input[name="address"]').type('{selectall}{backspace}INVALID ADDRESS');
      // cy.get('form#SearchBar').submit();
      // cy.get('[data-test="noResults"] .no-results .card-header > h4')
      //   .should('contain', 'No Results Found');
      // cy.get('[data-test="noResults"] .no-results .card-block > p')
      //   .should('contain', 'We\'re sorry we couldn\'t');

      cy.wrap(el).find('input[name="address"]').type('{selectall}{backspace}πππ');
      cy.wrap(el).find('[type="submit"]')
        .should('have.css', 'opacity', '0.65');
      cy.wrap(el).find('div.error > label > span > i')
        .should('have.css', 'color', 'rgb(209, 37, 43)')
        .should('have.css', 'content')
        .and('contain', 'normal');
      cy.wrap(el).find('div.error > label > span > i').trigger('mouseenter').then(() => {
          cy.get('div.__react_component_tooltip#erroraddress[data-id="tooltip"]')
            .should('have.css', 'visibility', 'visible')
            .and('contain', 'Invalid Characters')
        });
        
      
    });
  });
});