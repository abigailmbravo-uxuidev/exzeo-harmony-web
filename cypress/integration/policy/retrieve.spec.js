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
  );
});
