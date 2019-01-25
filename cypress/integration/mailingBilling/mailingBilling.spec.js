describe('Mailing/Billing Testing', () => {
  const fields = ['address1', 'city', 'state', 'zip'];

  const fillFromData = (fields = [], data) =>
    fields.forEach(tag => cy.findDataTag(`${tag}_input`).type(data[tag]));

  const checkError = (parent, message = 'Field Required') => {
    cy.get('.snackbar').should('be.visible');
    cy.findDataTag(parent).find('> span').should('contain', message);
  };

  const clearAllText = (fields = []) => {
    fields.forEach(field => {
      cy.findDataTag(`${field}_input`).then($input => {
        if ($input.val()) { cy.wrap($input).type('{selectall}{backspace}'); }
      });
    });
  };


  before(() => {
    cy.quoteWorkflow('mailingBilling');
  });

  beforeEach('Establish fixtures', () => {
    cy.fixture('mailing').as('mailing');
  });

  it('All Mailing Address Inputs Empty Value', () => {
    cy._submit();
    fields.forEach(field => checkError(field));
  });

  it('Mailing Address Empty Value', function() {
    fillFromData(['city', 'state', 'zip'], this.mailing);
    cy._submit();
    checkError('address1');
    clearAllText(fields);

    fillFromData(['address1', 'state', 'zip'], this.mailing);
    cy._submit();
    checkError('city');
    clearAllText(fields);

    fillFromData(['address1', 'city', 'zip'], this.mailing);
    cy._submit();
    checkError('state');
    clearAllText(fields);

    fillFromData(['address1', 'city', 'state'], this.mailing);
    cy._submit();
    checkError('zip');
  });

  it('Mailing Address Invalid Input Value', () => {
    clearAllText(fields);

    cy.findDataTag('state_input').type('abc');
    checkError('state', 'Only 2 letters allowed');

    cy.findDataTag('zip_input').type('123456789');
    checkError('zip', 'Only 8 letters or numbers allowed');
  });
});