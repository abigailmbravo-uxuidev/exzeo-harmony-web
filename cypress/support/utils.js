// General, small, helpful functions can be added here.

Cypress.Commands.add('getData', name => cy.get(`[data-test="${name}"]`));

Cypress.Commands.add('_submit', () => cy.getData('submit').click({ force: true }));