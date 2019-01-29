/**
 * @param {array} fields - Fields to fill out.
 * @param {Object} data - Data to fill out with keys corresponding to each entry in fields.
 */
Cypress.Commands.add('fillFields', (fields = [], data) =>
  fields.forEach(field => cy.findDataTag(`${field}-input`).type(data[field]))
);

/**
 * @param {string} field - Field name to find.
 * @param {string} message - Expected error message.
 */
Cypress.Commands.add('checkError', (field, message = 'Field Required') =>
  cy.findDataTag(field).find('> span').should('contain', message)
);

/**
 * @param {array} fields - Fields to fill check that errors exist.
 * @param {Object} options - Options object to use.
 * @param {array} options.errors - Array of errors to use in order for each field.
 * @param {string} options.form - Form to submit.
 * @param {bool} options.checkForSnackbar - Whether or not the snackbar appears when the form has errors.
 */
Cypress.Commands.add('submitAndCheckValidation', (fields = [], options = {}) => {
  const { errors = null, form = 'body', checkForSnackbar = true } = options;
  cy._submit(form);
  checkForSnackbar && cy.get('.snackbar').should('be.visible');
  fields.forEach((field, i) => {
    if (errors && errors[i]) {
      cy.checkError(field, errors[i]);
    } else if (field.toLowerCase().includes('email')) {
      cy.checkError(field, 'Not a valid email address');
    } else {
      cy.checkError(field);
    }
  });
});

/**
 * @param {array} fields - Array of strings corresponding to data-test tags to clear.
 */
Cypress.Commands.add('clearAllText', fields => {
  fields.forEach(tag => {
    cy.findDataTag(`${tag}-input`).then($input => {
      if ($input.val()) { cy.wrap($input).type('{selectall}{backspace}'); }
    });
  });
});

/**
 * Clear inputs, fill out inputs, and check validation on form
 * @param {array} baseFields - Fields to fill out in the form.
 * @param {array} fieldsLeftBlank - Fields to skip when filling out the form.
 * @param {Object} data - Data to use when filling out the form.
 * @param {Object} submitOptions - Options object used above in submitAndCheckValidation().
 */
Cypress.Commands.add('verifyForm', ((baseFields = [], fieldsLeftBlank = [], data, submitOptions) => {
  cy.clearAllText(baseFields);
  cy.fillFields(baseFields.filter(field => fieldsLeftBlank.indexOf(field) === -1), data);
  cy.submitAndCheckValidation(fieldsLeftBlank.length ? fieldsLeftBlank : baseFields, submitOptions);
}));
