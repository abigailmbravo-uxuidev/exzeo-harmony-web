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
Cypress.Commands.add('checkText', (tag, text = 'ZZ') =>
  cy.findDataTag(tag).find('input').type(`{selectall}{backspace}${text}`, { force: true }).should('have.attr', 'value', text));

/**
 * Checks that every radio has values as described
 * @param {string} tag - String name of data-test tag.
 * @param {array} values - Array of values for each radio.
 */
Cypress.Commands.add('checkRadios', (tag, values) =>
  cy.findDataTag(tag).find('.segmented-answer-wrapper > div').each(($div, index) =>
    cy.wrap($div).find('label span').should('contain', values[index])));

/**
 * Clicks each radio and confirms it has the 'selected' class, then afterwards confirms only one is selected
 * @param {string} tag - String name of data-test tag.
 */
Cypress.Commands.add('clickEachRadio', tag =>
  cy.findDataTag(tag).find('.segmented-answer-wrapper > div').each($div =>
    cy.wrap($div).click().find('label').should('have.attr', 'class', 'label-segmented selected')
  ).filter('.selected').should('have.length', 1));

/**
 * Confirms the submit button exists in the form
 * @param {string} form - Name of the form within which to check for submit button.
 */
Cypress.Commands.add('checkSubmitButton', ((form = 'body') =>
  cy.get(form).findDataTag('submit').should('exist').and('have.attr', 'type', 'button')));

/**
 * @param {string} tag - Name of the data test tag wrapping the select
 * @param {number} option - Index of the option to select
 */
Cypress.Commands.add('chooseSelectOption', (tag, option = 0) =>
  cy.findDataTag(tag).find('input')
    .type(' ', { force: true })
    .get('div.Select-menu div[role="option"]').then($arr => cy.wrap($arr[option]).click()));

/**
 * @param {string} tag - Name of the data test tag wrapping the select
 * @param {string} placeholder - Placeholder text
 */
Cypress.Commands.add('resetSelectOption', (tag, placeholder = 'Select...') =>
  cy.findDataTag(tag).find('span.Select-clear').click()
    .findDataTag(tag).find('.Select-control .Select-placeholder').should('contain', placeholder));

/**
 * @param {Object} subject - Whatever is yieled by previous command. Should ALWAYS BE a DOM node.
 * @param {Object} selectors - Object of selectors to use to find and test the field.
 * @param {string} selectors.tag - The name of the AI tag - Mortgagee, Additional Insured, Premium Finance, ...
 * @param {number} selectors.index - Index of the card to choose - 1-indexed, due to how the content shows on the DOM
 */
Cypress.Commands.add('checkCard', { prevSubject: true }, (subject, { tag, index = 1 }) =>
  cy.wrap(subject).find('div > .card-icon').find('i').should('have.attr', 'class', `fa fa-circle ${tag}`)
    .next().should('contain', `${tag} ${index}`)
    .parent().next().children().first().should('contain', 'Philip Marlowe')
    .next().should('contain', 'Jake Gittes')
    .next().should('contain', '123 Main Street, Apartment 13-B')
    .next().should('contain', 'Los Angeles, CA  75463')
    .parent().next().children()
    .first().should('have.attr', 'class', 'fa fa-trash').click()
    .get('#DeleteAdditionalInterest').should('exist')
    .find('.card-footer .btn-secondary').should('contain', 'Cancel').click()
    .wrap(subject).find('i.fa.fa-pencil').should('exist').click()
    .get(`#${tag.replace(/\s/g, '')}`).should('exist').get('button').contains('Go Back').click()
);

/**
 * @param {Object} subject - Whatever is yieled by previous command. Should ALWAYS BE a DOM node.
 * @param {Object} selectors - Object of selectors to use to find and test the field.
 * @param {string} selectors.tag - The name of the AI tag - Mortgagee, Additional Insured, Premium Finance, ...
 * @param {number} selectors.index - Index of the card to choose - 1-indexed, due to how the content shows on the DOM
 */
Cypress.Commands.add('checkVerifyPageCard', { prevSubject: true }, (subject, { tag, index }) =>
  cy.wrap(subject).find('div.icon-wrapper > i').should('have.attr', 'class', `fa ${tag}`)
    .next().should('contain', `${tag} ${index}`)
    .parent().next().children().first().should('contain', 'Philip')
    .next().should('contain', 'Jake Gittes')
    .next().should('contain', '123 Main Street, Apartment 13-B')
    .next().should('contain', 'Los Angeles, CA 75463')
    .parent().next().children().first().should('contain', 'Reference Number')
    .next().should('contain', '1234')
);
