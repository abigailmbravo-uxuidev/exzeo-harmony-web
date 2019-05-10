// General, small, helpful functions can be added here.

/**
 * @param {string} tag - String name of data-test tag.
 * @param {Object} options - Native cy.get options.
 * @returns {Object} DOM element(s) found.
 */
Cypress.Commands.add('findDataTag', (tag, { timeout = 15000, ...rest} = {}) =>
  cy.get(`[data-test="${tag}"]`, { timeout, ...rest }));

/**
 * @param {string} form - Name of form to submit.
 * @returns {Object} DOM element(s) found.
 */
Cypress.Commands.add('clickSubmit', (form = 'body', button = 'submit') =>
  cy.get(form).within(() => cy.findDataTag(button).should('not.be.disabled').click()));
