export default () => cy.findDataTag('share').click()
  .findDataTag('name').type('Bruce')
  .findDataTag('email').type('Batman@gmail.com')
  .clickSubmit('#SendEmail', 'modal-submit')
  .wait('@agencyEmailQuoteSummary');
