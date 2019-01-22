// General, small, helpful functions can be added here.

Cypress.Commands.add('findDataTag', name => cy.get(`[data-test="${name}"]`));

Cypress.Commands.add('_submit', () => cy.findDataTag('submit').click({ force: true }));
