import { setRouteAliases, confirmPolicyOrQuote } from '../../helpers';

const fields = [
  { name: 'firstName', data: 'batman' },
  { name: 'lastName', data: 'robin' },
  { name: 'address', data: 'test' }
];

describe('Retrieve Policy', () => {
  // TODO unwrap this test suite to run in CI when ready
  if (Cypress.env('CI')) {
    it('Skip test due to environment', () => {
      cy.task('log', 'CI === true: not running Policy/retrieve specs');
    });
  } else {
    before('Login and go to search', () =>
      cy
        .login()
        .get('.card-footer a[href="/policy"]')
        .click()
    );
    beforeEach('Set Route Aliases', () => setRouteAliases());

    it('Policy 3-field search testing', () =>
      cy
        .fillFields(fields)
        .get('#PolicySearchBar button[type="submit"]')
        .click()
        .wait('@searchPolicy')
        .then(({ response }) =>
          confirmPolicyOrQuote(response.body.policies, fields)
        )
        // Click pagination
        .get('[form="SearchBar"] .fa-chevron-circle-right')
        .click({ force: true })
        .wait('@searchPolicy')
        .then(({ response }) =>
          confirmPolicyOrQuote(response.body.policies, fields)
        )
        .get('input[name="pageNumber"]')
        .should('have.value', '2')
        .get('.policy-list li[tabindex=0] .policy-status')
        .contains('Policy Issued')
        .click()
        // check for loader
        .findDataTag('loader')
        .should('exist')
        .wait('@getLatestPolicy')
        .findDataTag('Policyholder 1')
        // click home link in logo
        .findDataTag('logo')
        .click()
        // search policy again
<<<<<<< HEAD
=======
        .login()
>>>>>>> Fix Cypress Policy Retrieve test.
        .get('.card-footer a[href="/policy"]')
        .click()
        .get('#PolicySearchBar button[type="submit"]')
        .click()
        .wait('@searchPolicy')
        .get('.policy-list .card')
        .first()
        .click()
        // check for loader
        .findDataTag('loader')
        .should('exist')
        .wait('@getLatestPolicy')
<<<<<<< HEAD
        .findDataTag('Policyholder 1'));
=======
        .findDataTag('Policyholder 1')
    );
>>>>>>> Fix Cypress Policy Retrieve test.
  }
});
