import stubAllRoutes from '../../support/stubAllRoutes';

describe('Dashboard Testing', () => {
  before(() => {
    stubAllRoutes();
    cy.login();
  });

  it('POS:Dashboard Banner', () =>
    cy.get('img[alt="TypTap Insurance"]').should('exist').click().wait('@fetchAgency')
      .get('a[href="tel:844-289-7968"]').should('exist')
  );

  it('POS:Dashboard Detail Header', () => cy.findDataTag('user-info').children().should('have.length', 2));

  it('POS:Dashboard Side Navigation', () =>
    ['nav-home', 'nav-searchAddress', 'nav-policy', 'nav-contacts', 'nav-training']
      .forEach(tag => cy.findDataTag(tag).find('a').children().should('have.length', 2))
  );

  it('POS:Dashboard Footer', () =>
    cy.get('footer div[role="banner"] small.copyright').should('contain', 'TypTap Management Company. All rights reserved.')
      .get('footer div[role="banner"]').find('small').should('have.length', 2)
  );

  it('POS:Dashboard Text', () =>
    cy.get('h1.app-header').should('contain', 'Agency App')
      .get('.dashboard-message h4').should('contain', 'Homeowners (HO3) insurance for Florida properties.')
      .get('.dashboard-message p').should('contain', 'Getting a quote is always quick and simple with ')
      .get('h4.product-name').should('contain', ' Homeowners Insurance')
      .get('.product.card .card-block p').should('contain', 'TypTap currently offers')
  );

  it('POS:Dashboard Image', () =>
    cy.get('.card-header-image-home').should('exist')
      .get('div.exzeo').should('exist')
  );

  it('POS:Dashboard Button', () =>
    ['/search/address', '/search/retrieve', '/policy'].forEach(url =>
      cy.get(`.card-footer a[href="${url}"]`).click().url().should('contain', url).go('back')
    )
  );
});
