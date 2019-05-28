export const setRouteAliases = () => cy.server()
  .route('POST', '/svc?fetchAddresses').as('fetchAddresses')
  .route('POST', '/svc?getZipcodeSettings').as('getZipcodeSettings')
  .route('POST', '/svc?sendQuoteSummary').as('sendQuoteSummary')
  .route('POST', '/svc?quoteManager.updateQuote').as('updateQuote')
  .route('POST', '/svc?getBillingOptions').as('getBillingOptions')
  .route('POST', '/svc?quoteManage.sendApplication').as('sendApplication')
  .route('POST', '/svc?UWQuestions').as('UWQuestions');
