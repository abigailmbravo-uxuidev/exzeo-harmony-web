describe('Share Testing', () => {
  const toggleModal = dir => {
    cy.get('div.route-content').then($wrap => {
      if ($wrap.find('.modal.active').length && dir === 'off') {
        cy.findDataTag('cancel_email').click();
      } else if (dir === 'on') {
        cy.findDataTag('share').click();
      }
    });
  };

  const clearAll = () => {
    ['emailAddr_input', 'name_input'].forEach(tag => {
      cy.findDataTag(tag).then($input => {
        if ($input.val()) { cy.wrap($input).type('{selectall}{backspace}'); }
      });
    });
  };

  before('Navigate to Share page', () => {
    cy.quoteWorkflow('share');
  });

  beforeEach('Reset page, establish fixutres', () => {
    toggleModal('off');
    cy.fixture('defaultUser').as('user');
  });

  it('"Confirmed" Value left at Default "No"', () => {

  });

  it('All Inputs Empty Value', () => {
    toggleModal('on');
    cy.get('#SendEmail').submit();
    cy.findDataTag('name').find('> span').should('contain', 'Field Required');
    cy.findDataTag('emailAddr').find('> span').should('contain', 'Field Required');
  });

  it('Input Empty Value', function() {
    toggleModal('on');
    cy.findDataTag('emailAddr_input').type(this.user.customerInfo.email);
    cy.get('#SendEmail').submit();
    cy.findDataTag('name').find('> span').should('contain', 'Field Required');
    clearAll();
    
    cy.findDataTag('name_input').type(`${this.user.customerInfo.firstName} ${this.user.customerInfo.lastName}`);
    cy.get('#SendEmail').submit();
    cy.findDataTag('emailAddr').find('> span').should('contain', 'Field Required');
  });

  it('Input Invalid Character', () => {
    toggleModal('on');
    cy.findDataTag('emailAddr_input').type('å∫∂®ƒ©˙ˆ∆¬µ˜øπœ®ß†¨√');
    cy.get('#SendEmail').submit();
    cy.findDataTag('emailAddr').find('> span').should('contain', 'Not a valid email address');
  });
});