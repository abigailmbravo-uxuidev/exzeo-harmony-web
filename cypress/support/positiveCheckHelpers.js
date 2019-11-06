/**
 * @param {string} tag - String name of data-test tag.
 * @param {string} className - Classname to verify in workflow
 */
Cypress.Commands.add('checkWorkflowSection', ({ name, status = 'disabled' }) =>
  cy
    .findDataTag(name)
    .find('a')
    .should('have.attr', 'class', status)
);

/**
 * @param {string} tag - String name of data-test tag.
 * @param {string} text - Text to check exists in label
 */
Cypress.Commands.add('checkLabel', (tag, text) =>
  cy
    .findDataTag(tag)
    .find('label')
    .should('contain', text)
);

/**
 * @param {Object} header - Header object
 * @param {string} header.name - Name of the wrapping data-test tag
 * @param {string} header.text - Text of the header
 * @param {string} header.icon - Icon classname
 */
Cypress.Commands.add('checkHeader', ({ name, text, icon }) =>
  cy
    .findDataTag(name)
    .should('contain', text)
    .find('i')
    .should('have.attr', 'class', icon)
);

/**
 * @param {string} tag - String name of data-test tag.
 * @param {string} text - Check this text is now in value of input
 */
Cypress.Commands.add('checkText', (tag, text = '(99') =>
  cy.findDataTag(tag).then($el =>
    $el.find('input').length
      ? cy
          .wrap($el)
          .find('input')
          .type(`{selectall}{backspace}${text}`)
          .should('have.attr', 'value', text)
      : cy
          .wrap($el)
          .type(`{selectall}{backspace}${text}`)
          .should('have.attr', 'value', text)
  )
);
// cy.findDataTag(tag).find('input').type(`{selectall}{backspace}${text}`).should('have.attr', 'value', text));

/**
 * Checks that every radio has values as described
 * @param {Object} field - An input switch field
 * @param {string} field.name - Name of the wrapping data-test tag
 * @param {array} field.values - Array of values for each radio.
 */
Cypress.Commands.add('checkRadios', ({ name, values }) =>
  cy
    .findDataTag(name)
    .find('.segmented-answer-wrapper > div')
    .each(($div, index) =>
      cy
        .wrap($div)
        .find('label span')
        .should('contain', values[index].formatted || values[index])
    )
);

/**
 * Clicks each radio and confirms it has the 'selected' class, then afterwards confirms only one is selected
 * @param {Object} field - An input switch field
 * @param {string} field.name - Name of the wrapping data-test tag
 */
Cypress.Commands.add('clickEachRadio', ({ name }) =>
  cy
    .findDataTag(name)
    .find('.segmented-answer-wrapper > div')
    .each($div =>
      cy
        .wrap($div)
        .click()
        .find('label')
        .should('have.attr', 'class', 'label-segmented selected')
    )
    .filter('.selected')
    .should('have.length', 1)
);

/**
 * Checks a switch
 * @param {Object} field - An input switch field
 * @param {string} field.name - Name of the wrapping data-test tag
 * @param {string} field.defaultValue - boolean determining starting value of the switch
 */
Cypress.Commands.add('checkSwitch', ({ name, defaultValue }) =>
  cy
    .findDataTag(name)
    .find('.switch-div')
    .should('have.attr', 'data-value', `${defaultValue}`)
    .click()
    .should('have.attr', 'data-value', `${!defaultValue}`)
    .click()
    .should('have.attr', 'data-value', `${!!defaultValue}`)
);

/**
 * Confirms the submit button exists in the form
 * @param {string} form - Name of the form within which to check for submit button.
 */
Cypress.Commands.add('checkSubmitButton', (form = 'body') =>
  cy
    .get(form)
    .findDataTag('submit')
    .should('exist')
    .and('have.attr', 'type', 'button')
);

/**
 * Checks a detail header section
 * @param {object} header - The header object to check
 * @param {string} header.name - Name of the wrapping data-test tag
 * @param {string} header.label - Text content of label
 * @param {array} header.values
 */
Cypress.Commands.add('checkDetailHeader', ({ name, label, value }) =>
  cy
    .findDataTag(name)
    .find('dt')
    .should('contain', label)
    .then(() => {
      cy.findDataTag(name)
        .find('dd')
        .eq(0, { log: false })
        .should('contain', value);
    })
);

/**
 * Checks the values in a slider
 * @param {Object} field - An input switch field
 * @param {string} field.name - Name of the wrapping data-test tag
 */
Cypress.Commands.add('checkSlider', tag =>
  cy
    .findDataTag(tag)
    .find('.range-control-wrapper > input[type="range"]')
    .then($slider => {
      const min = parseInt($slider.attr('min'));
      const max = parseInt($slider.attr('max'));

      cy.nativeSetSliderValue($slider[0], min)
        .findDataTag(tag)
        .find('span.range-value > input')
        .should('have.attr', 'value', `$ ${min.toLocaleString()}`)
        .nativeSetSliderValue($slider[0], max)
        .findDataTag(tag)
        .find('span.range-value > input')
        .should('have.attr', 'value', `$ ${max.toLocaleString()}`);
    })
);

/**
 * @param {Object} subject - Whatever is yieled by previous command. Should ALWAYS BE a DOM node.
 * @param {Object} selectors - Object of selectors to use to find and test the field.
 * @param {string} selectors.tag - The name of the AI tag - Mortgagee, Additional Insured, Premium Finance, ...
 * @param {number} selectors.index - Index of the card to choose - 1-indexed, due to how the content shows on the DOM
 */
Cypress.Commands.add(
  'checkCard',
  { prevSubject: true },
  (subject, { tag, index = 1 }) =>
    cy
      .wrap(subject)
      .find('div > .card-icon')
      .find('i')
      .should('have.attr', 'class', `fa fa-circle ${tag}`)
      .next()
      .should('contain', `${tag} ${index}`)
      .parent()
      .next()
      .children()
      .first()
      .should('contain', 'Philip Marlowe')
      .next()
      .should('contain', 'Jake Gittes')
      .next()
      .should('contain', '123 Main Street, Apartment 13-B')
      .next()
      .should('contain', 'Los Angeles, CA  75463')
      .parent()
      .next()
      .children()
      .first()
      .should('have.attr', 'class', 'fa fa-trash')
      .click()
      .get('#DeleteAdditionalInterest')
      .should('exist')
      .find('.card-footer .btn-secondary')
      .should('contain', 'Cancel')
      .click()
      .wrap(subject)
      .find('i.fa.fa-pencil')
      .should('exist')
      .click()
      .get(`#${tag.replace(/\s/g, '')}`)
      .should('exist')
      .get('button')
      .contains('Go Back')
      .click()
);

/**
 * @param {Object} subject - Whatever is yieled by previous command. Should ALWAYS BE a DOM node.
 * @param {Object} selectors - Object of selectors to use to find and test the field.
 * @param {string} selectors.tag - The name of the AI tag - Mortgagee, Additional Insured, Premium Finance, ...
 * @param {number} selectors.index - Index of the card to choose - 1-indexed, due to how the content shows on the DOM
 */
Cypress.Commands.add(
  'checkVerifyPageCard',
  { prevSubject: true },
  (subject, { tag, index }) =>
    cy
      .wrap(subject)
      .find('div.icon-wrapper > i')
      .should('have.attr', 'class', `fa ${tag}`)
      .next()
      .should('contain', `${tag} ${index}`)
      .parent()
      .next()
      .children()
      .first()
      .should('contain', 'Philip')
      .next()
      .should('contain', 'Jake Gittes')
      .next()
      .should('contain', '123 Main Street, Apartment 13-B')
      .next()
      .should('contain', 'Los Angeles, CA 75463')
      .parent()
      .next()
      .children()
      .first()
      .should('contain', 'Reference Number')
      .next()
      .should('contain', '1234')
);
