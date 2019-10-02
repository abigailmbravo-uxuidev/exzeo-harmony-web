import { setRouteAliases, confirmPolicyOrQuote } from '../../helpers';

const fields = [
  { name: 'firstName', data: 'batman' },
  { name: 'lastName', data: 'robin' },
  { name: 'address', data: 'test' }
];

describe('Retrieve Quote', () => {
  // TODO unwrap this test suite to run in CI when ready
  if (Cypress.env('CI')) {
    it('Skip test due to environment', () => {
      cy.task('log', 'CI === true: not running Quote/retrieve specs');
    });
  } else {
    before('Login and go to search', () =>
      cy
        .login()
        .get('.btn[href="/search/retrieve"]')
        .click()
    );
    beforeEach('Set Route Aliases', () => setRouteAliases());

    it('Quote 3-field search testing', () =>
      cy
        .fillFields(fields)
        .clickSubmit('#SearchBar')
        .wait('@fetchQuotes')
        .then(({ response }) =>
          confirmPolicyOrQuote(response.body.result.quotes, fields)
        )
        // Click the pagination button
        .get('[form="SearchBar"] .fa-chevron-circle-right')
        .click({ force: true })
        .wait('@fetchQuotes')
        .then(({ response }) =>
          confirmPolicyOrQuote(response.body.result.quotes, fields)
        )
        .get('input[name="pageNumber"]')
        .should('have.value', '2'));
  }
});
