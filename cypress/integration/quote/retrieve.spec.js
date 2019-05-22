import { setRouteAliases } from '../../helpers';

const fields = [
  { name: 'firstName', data: 'batman' },
  { name: 'lastName', data: 'robin' },
  { name: 'address', data: 'test' },
];

describe('Retrieve Policy', () => {
  before('Login and go to search', () => {
    cy.login();
    cy.get('a[href="/search/retrieve"]').click();
  });
  beforeEach('Set Route Aliases', () => setRouteAliases());

  it('Quote 3-field search testing', () =>
    cy.fillFields(fields).clickSubmit('#SearchBar').wait('@fetchQuotes').then(res =>
        cy.wrap(res.response.body.result.quotes).each(quote => {
          expect(quote.policyHolders[0].firstName).to.match(/batman/i);
          expect(quote.policyHolders[0].lastName).to.match(/robin/i);
          expect(quote.property.physicalAddress.address1).to.match(/test/i);
        })
    ).get('[form="SearchBar"] .fa-chevron-circle-right').click({ force: true })
    .wait('@fetchQuotes').then(res =>
      cy.wrap(res.response.body.result.quotes).each(quote => {
        expect(quote.policyHolders[0].firstName).to.match(/batman/i);
        expect(quote.policyHolders[0].lastName).to.match(/robin/i);
        expect(quote.property.physicalAddress.address1).to.match(/test/i);
      })
    )
  );
});
