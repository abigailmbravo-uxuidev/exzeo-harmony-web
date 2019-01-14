describe('Testing the searchAddress page', () => {
  before('Navigate to searchAddress page', () => {
    cy.happypathTo('searchAddress')
  });

  it('tests the phone number', () => {
    cy.get('a.link-phone.btn').should('contain', '844-289-7968');
  });

  it('tests button', () => {
    cy.get('button[type="submit"][form="SearchBar"]').should('have.class', 'btn btn-success');
  });

  it('goes forward', () => {
    cy.get('input[name=address]').type('4131 TEST ADDRESS');
    cy.get('.btn-success[form=SearchBar]').click();
    cy.get('.results > li').should('have.length', 1);
    cy.go('back')
  });
});