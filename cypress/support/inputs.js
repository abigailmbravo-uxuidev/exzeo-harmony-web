Cypress.Commands.add('fillFields', (fields = [], data) => {
  fields.forEach(field => cy.findDataTag(`${field}_input`).type(data[field]));
});

Cypress.Commands.add('clearAllText', fields => {
  fields.forEach(tag => {
    cy.findDataTag(`${tag}_input`).then($input => {
      if ($input.val()) { cy.wrap($input).type('{selectall}{backspace}'); }
    });
  });
});

Cypress.Commands.add('submitAndCheckErrors', (fields = [], errors = new Array(fields.length).fill('Field Required')) => {
  cy._submit();
  cy.get('.snackbar').should('be.visible');
  fields.forEach((field, i) => {
    cy.findDataTag(field).find('> span').should('contain', errors[i]);
  });
});
