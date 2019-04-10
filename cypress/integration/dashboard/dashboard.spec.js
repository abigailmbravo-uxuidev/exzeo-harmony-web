import stubAllRoutes from '../../support/stubAllRoutes';

describe('Dashboard Testing', () => {
  before(() => {
    stubAllRoutes();
    cy.login();
  });

  // it('POS:Dashboard Button', () =>
  //   cy.wrap(['/search/address', '/search/retrieve', '/policy']).each(url =>
  //     cy.get(`.card-footer a[href="${url}"]`).click().url().should('contain', url).go('back')
  //   )
  // );
});
