/**
 * @param {string} tag - String name of data-test tag.
 * @param {string} className - Classname to verify in workflow
 */

Cypress.Commands.add('checkWorkflowSection', (tag, className = 'disabled') =>
  cy.findDataTag(tag).find('a').should('have.attr', 'class', className));

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
  cy.findDataTag(tag).find('input').type(`{selectall}{backspace}${text}`).should('have.attr', 'value', text));

Cypress.Commands.add('checkRadios', (tag, values) =>
  cy.findDataTag(tag).find('div').find('div').each(($div, index) =>
    cy.wrap($div).find('label input').should('have.attr', 'value', values[index])));

Cypress.Commands.add('clickEachRadio', tag =>
  cy.findDataTag(tag).find('div div').each(($div, __, $list) =>
    cy.wrap($div).click().should('have.attr', 'class', `radio-column-${$list.length} selected`)));

Cypress.Commands.add('checkNextButton', ((form = 'body') =>
  cy.get(form).findDataTag('submit').should('exist').and('have.attr', 'type', 'submit')));