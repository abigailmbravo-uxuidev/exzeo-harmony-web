// describe('testing whatever I damn well please', () => {
//   before('Login', () => {
//     cy.happypathTo('underwriting');
//   });

//   it('exists', () => {
//     cy.get('a.active').contains('Underwriting');
//   });

//   it('tests another thing', () => {
//     cy.get('input[name="rented"][value="Never"] + span').click();
//     cy.get('input[name="previousClaims"][value="No claims ever filed"] + span').click();
//     cy.get('input[name="monthsOccupied"][value="10+"] + span').click();
//     cy.get('input[name="business"][value="No"] + span').click();
//   });

//   it('continues', () => {
//     cy.happypathTo('assumptions');
//   });

//   it('does another path', () => {
//     cy.happypathTo('verify');
//   });
// });

describe('new test', () => {

  Cypress._.times(100, i => {
    it(`num running`, () => {
      cy.happypathTo('landing')
    });
  });
});