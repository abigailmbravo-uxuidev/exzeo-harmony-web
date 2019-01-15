Cypress.Commands.add('login', (userType = 'CSR') => {
  cy.clearCookies();

  window.localStorage.setItem('relogin', 'true');
  const token = localStorage.getItem('id_token');
  const exp = localStorage.getItem('expires_at');
  const now = new Date().getTime();

  if (!token || !exp || now > exp) {
    const useMockAuth0 = Cypress.env('REACT_APP_USE_MOCK_AUTH0');

    if (useMockAuth0) {
      cy.visit('/');
      cy.get('#submit')
        .then(() => {
          cy.get('#userType').select(userType);
          cy.get('#submit').click();
        });
    } else {
      cy.visit('/');
      cy.wait(1000);
      cy.get('button').then(button => {
        if (button.hasClass('auth0-lock-submit')) {
          cy.get('.auth0-lock-input-username > .auth0-lock-input-wrap > .auth0-lock-input').type('ttic-20000');
          cy.get('.auth0-lock-input-password > .auth0-lock-input-wrap > .auth0-lock-input').type('Password1');
          cy.get('.auth0-label-submit').click();
        } else {
          cy.get('.auth0-lock-social-button').click();
        }
      })
    }
  }
});