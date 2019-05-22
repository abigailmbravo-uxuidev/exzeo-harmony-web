import { setRouteAliases } from '../../helpers';

const fields = [
  { name: 'firstName', data: 'batman' },
  { name: 'lastName', data: 'robin' },
  { name: 'address', data: 'test' },
];

describe('Retrieve Policy', () => {
  before('Login and go to search', () => {
    cy.login();
    cy.get('.card-footer a[href="/policy"]').click();
  });
  beforeEach('Set Route Aliases', () => setRouteAliases());

  it('Policy 3-field search testing', () =>
  cy.fillFields(fields).get('#PolicySearchBar button[type="submit"]').click().wait('@searchPolicy').then(res =>
      cy.wait(3000).wrap(res.response.body.policies).each(policy => {
        expect(policy.policyHolders[0].firstName).to.match(/batman/i);
        expect(policy.policyHolders[0].lastName).to.match(/robin/i);
        expect(policy.property.physicalAddress.address1).to.match(/test/i);
      })
    ).get('[form="SearchBar"] .fa-chevron-circle-right').click({ force: true })
    .wait('@searchPolicy').then(res =>
      cy.wrap(res.response.body.policies).each(policy => {
        expect(policy.policyHolders[0].firstName).to.match(/batman/i);
        expect(policy.policyHolders[0].lastName).to.match(/robin/i);
        expect(policy.property.physicalAddress.address1).to.match(/test/i);
      })
    ).get('input[name="pageNumber"]').should('have.value', '2')
    .get('select[name="sortBy"]').select('lastName')
    .get('ul.policy-list li').should('have.length', 0)
    .clearAllText(fields)
    .fillFields([{ name: 'lastName', data: 'd' }])
    .get('#PolicySearchBar button[type="submit"]').click().wait('@searchPolicy').then(res =>
      // We check that the first last name starts with 'd', to confirm that they are sorted in order
        expect(res.response.body.policies[0].policyHolders[0].lastName.charAt).to.match(/d/i)
    )
  );
});
