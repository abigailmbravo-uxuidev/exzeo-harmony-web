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

/**
 * Checks that every radio has values as described
 * @param {string} tag - String name of data-test tag.
 * @param {array} values - Array of values for each radio.
 */
Cypress.Commands.add('checkRadios', (tag, values) =>
  cy.findDataTag(tag).find('div div').each(($div, index) =>
    cy.wrap($div).find('label input').should('have.attr', 'value', values[index])));

/**
 * Clicks each radio and confirms it has the selected class
 * @param {string} tag - String name of data-test tag.
 */
Cypress.Commands.add('clickEachRadio', tag =>
  cy.findDataTag(tag).find('div div').each(($div, __, $list) =>
    cy.wrap($div).click().should('have.attr', 'class', `radio-column-${$list.length} selected`)
  ).filter('.selected').should('have.length', 1));

/**
 * Confirms the submit button exists in the form
 * @param {string} form - Name of the form within which to check for submit button.
 */
Cypress.Commands.add('checkNextButton', ((form = 'body') =>
  cy.get(form).findDataTag('submit').should('exist').and('have.attr', 'type', 'submit')));
