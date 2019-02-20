import routes from "../../support/routes";

describe('Underwriting Testing', () => {
  const fields = ['rented', 'previousClaims', 'monthsOccupied', 'business'];

  const toggleExcept = (except = [], values) => {
    Object.entries(values).forEach(([key, value]) => {
      if (!except.includes(key)) { 
        cy.findDataTag(`${key}`).find(`input[value="${value}"] + span`).click();
      };
    });
  };

  before('Go to Underwriting page', () => {
    routes();
    cy.quoteWorkflow('underwriting');
  });

  beforeEach('Establish fixtures', () => {
    routes();
    cy.fixture('stockData/underwriting').as('data');
  });

  it('All Inputs Empty Value', () => {
    cy.submitAndCheckValidation(fields);
  });

  it('"Is the home or any structure on the property ever rented?" Empty Value', function() {
    cy.reload();
    toggleExcept(['rented'], this.data);
    cy.submitAndCheckValidation(['rented']);
  });

  it('"When was the last claim filed?" Empty Value', function() {
    cy.reload();
    toggleExcept(['previousClaims'], this.data);
    cy.submitAndCheckValidation(['previousClaims']);
  });

  it('"How many months a year does the owner live in the home?" Empty Value', function() {
    cy.reload();
    toggleExcept(['monthsOccupied'], this.data);
    cy.submitAndCheckValidation(['monthsOccupied']);
  });

  it('"Is a business conducted on the property?" Empty Value', function() {
    cy.reload();
    toggleExcept(['business'], this.data);
    cy.submitAndCheckValidation(['business']);
  });
});
