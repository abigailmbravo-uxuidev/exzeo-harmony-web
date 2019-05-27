export const setRouteAliases = () => cy.server()
  .route('POST', '/svc?fetchAddresses').as('fetchAddresses')
  .route('POST', '/svc?getZipcodeSettings').as('getZipcodeSettings')
  .route('POST', '/cg/start?agencyEmailQuoteSummary').as('agencyEmailQuoteSummary')
  .route('POST', '/svc?quoteManager.updateQuote').as('updateQuote')
  .route('POST', '/svc?getBillingOptions').as('getBillingOptions')
  .route('POST', '/cg/start?agencySubmitApplication').as('agencySubmitApplication')
  .route('POST', '/svc?UWQuestions').as('UWQuestions');
