import { setRouteAliases, confirmPolicyOrQuote } from '../../helpers';

const fields = [
  { name: 'firstName', data: 'batman' },
  { name: 'lastName', data: 'robin' },
  { name: 'address', data: 'test' },
];

describe('Retrieve Policy', () => {
  before('Login and go to search', () =>
    cy.login()
      .get('.card-footer a[href="/policy"]').click()
  );
  beforeEach('Set Route Aliases', () => setRouteAliases());

  it('Policy 3-field search testing', () =>
    cy.fillFields(fields).get('#PolicySearchBar button[type="submit"]').click()
      .wait('@searchPolicy').then(({ response }) => confirmPolicyOrQuote(response.body.policies, fields))
      // Click pagination
      .get('[form="SearchBar"] .fa-chevron-circle-right').click({ force: true })
      .wait('@searchPolicy').then(({ response }) => confirmPolicyOrQuote(response.body.policies, fields))
      .get('input[name="pageNumber"]').should('have.value', '2')
      .get('.policy-list li[tabindex=0] .policy-status').contains('Policy Issued').click()
      .wait('@getLatestPolicy').findDataTag('Policyholder 1')
  );
});
