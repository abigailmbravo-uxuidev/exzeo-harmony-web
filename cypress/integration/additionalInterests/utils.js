export const goBack = () => cy.window().then(window => {
  if (!window.location.href.includes('additionalInterests')) {
    cy.findDataTag('addAdditionalAIs').click();
  };
});

export const fillAndCheckForErrors = (baseFields, exceptedFields = [], data) => {
  cy.fillFields(baseFields.filter(field => exceptedFields.indexOf(field) === -1), data);
  cy.submitAndCheckErrors(exceptedFields);
  cy.clearAllText(baseFields);
};