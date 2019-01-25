export const goBack = () => cy.window().then(window => {
  if (!window.location.href.includes('additionalInterests')) {
    cy.findDataTag('addAdditionalAIs').click();
  };
});
