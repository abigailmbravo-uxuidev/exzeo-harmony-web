export const setRouteAliases = () => cy.server()
  .route('POST', '/svc?fetchAddresses').as('fetchAddresses')
  .route('POST', '/svc?fetchQuotes').as('fetchQuotes')
  .route('POST', '/svc?searchPolicy').as('searchPolicy')
  .route('POST', '/svc?getZipcodeSettings').as('getZipcodeSettings')
  .route('POST', '/svc?sendQuoteSummary').as('sendQuoteSummary')
  .route('POST', '/svc?quoteManager.updateQuote').as('updateQuote')
  .route('POST', '/svc?quoteManager.retrieveQuote').as('retrieveQuote')
  .route('POST', '/svc?quoteManager.reviewQuote').as('reviewQuote')
  .route('POST', '/svc?quoteManager.sendApplication').as('sendApplication')
  .route('POST', '/svc?getBillingOptions').as('getBillingOptions')
  .route('POST', '/svc?UWQuestions').as('UWQuestions')
  .route('POST', '/svc?getQuote').as('getQuote')
  .route('POST', '/svc?getLatestPolicy').as('getLatestPolicy');
