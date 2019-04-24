export const setRouteAliases = () => cy.server()
  .route('POST', '/svc?fetchAddresses').as('fetchAddresses')
  .route('POST', '/svc?fetchQuotes').as('fetchQuotes')
  .route('POST', '/svc?getQuoteServiceRequest').as('getQuoteServiceRequest')
  .route('POST', '/svc?getZipcodeSettings').as('getZipcodeSettings')
  .route('POST', '/cg/complete?askToCustomizeDefaultQuote').as('askToCustomizeDefaultQuote')
  .route('POST', '/cg/complete?askEmail').as('askEmail');
