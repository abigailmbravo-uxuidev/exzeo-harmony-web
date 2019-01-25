// General, small, helpful functions can be added here.

Cypress.Commands.add('findDataTag', name => cy.get(`[data-test="${name}"]`));

Cypress.Commands.add('_submit', (form = 'body') => 
  cy.get(form).within(() => cy.get('[data-test="submit"]:not([disabled])').click({ force: true })));
