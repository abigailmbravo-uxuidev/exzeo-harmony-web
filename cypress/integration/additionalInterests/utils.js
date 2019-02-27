// Navigates back if you are not on additional interest
export const goBack = () => cy.window().then(window => {
  if (!window.location.href.includes('additionalInterests')) {
    cy.findDataTag('tab-nav-addAdditionalAIs').click();
  };
});
