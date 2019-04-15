export const setRouteAliases = () => cy.server()
  .route('POST', '/svc?fetchAddresses').as('fetchAddresses')
  .route('POST', '/svc?getQuoteServiceRequest').as('getQuoteServiceRequest')
  .route('POST', '/svc?getZipcodeSettings').as('getZipcodeSettings');
