import loginInfo from '../../fixtures/stockData/login.json';

describe('Login Testing', () => {
  before(() => cy.visit('/logout'));

  it('POS:Login Image', () => {
    cy.get('img[src="https://s3.amazonaws.com/exzeo-typtap-wordpress/images/typtap.svg"]')
      .should('exist');
  });

  it('POS:Login Input', () => {
    cy.get('input[name="username"]').should('exist')
      .get('input[name="password"]').should('exist');
  });

  it('POS:Login', () => {
    cy.get('a.auth0-lock-alternative-link').should('exist');
  });

  it('POS:Login', () => {
    cy.get('button.auth0-lock-submit[type="submit"]').should('exist')
      .get('input[name="username"]').type(loginInfo.username, { force: true })
      .get('input[name="password"]').type(loginInfo.password, { force: true })
      .get('.auth0-label-submit').click({ force: true })
      .url().should('contain', Cypress.config('baseUrl'));
  });
});