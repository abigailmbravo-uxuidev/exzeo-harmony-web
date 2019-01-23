// General, small, helpful functions can be added here.

Cypress.Commands.add('findDataTag', (name, options = { timeout: 15000 }) => cy.get(`[data-test="${name}"]`, options));

Cypress.Commands.add('_submit', () => cy.findDataTag('submit').click({ force: true }));