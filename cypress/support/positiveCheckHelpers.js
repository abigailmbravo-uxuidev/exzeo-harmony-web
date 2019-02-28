/**
 * @param {string} tag - String name of data-test tag.
 * @param {string} className - Classname to verify in workflow
 */

Cypress.Commands.add('checkWorkflowSection', (tag, className = 'disabled') =>
  cy.findDataTag(tag).find('a').should('have.attr', 'class', className))

/**
 * @param {string} tag - String name of data-test tag.
 * @param {string} text - Text to check exists in label
 */
Cypress.Commands.add('checkLabel', (tag, text) =>
  cy.findDataTag(tag).find('label').should('contain', text));

/**
 * @param {string} tag - String name of data-test tag.
 * @param {string} text - Check this text is now in value of input
 */
Cypress.Commands.add('checkText', (tag, text) =>
  cy.findDataTag(tag).find('input').type(`{selectall}{backspace}${text}`).should('have.attr', 'value', text))
