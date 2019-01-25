describe('Underwriting Testing', () => {
  const submit = () => cy._submit();

  const checkErrors = (fields = [], message = 'Field Required') => fields.forEach(field => {
    cy.get('.snackbar').should('be.visible');
    cy.findDataTag(field).find('> span').should('contain', message);
  });

  const fillExcept = (except = [], values) => {
    Object.entries(values).forEach(([key, value]) => {
      if (!except.includes(key)) { 
        cy.findDataTag(`${key}_input`).find(`input[value="${value}"] + span`).click();
      };
    });
  };

  before('Go to Underwriting page', function() {
    cy.quoteWorkflow('underwriting');
  });

  beforeEach('Establish fixtures', function() {
    cy.fixture('underwriting').as('defaultValues');
  });

  it('All Inputs Empty Value', function() {
    submit();
    checkErrors(Object.keys(this.defaultValues));
  });

  it('"Is the home or any structure on the property ever rented?" Empty Value', function() {
    fillExcept(['rented'], this.defaultValues);
    submit();
    checkErrors(['rented']);
    cy.reload();
  });

  it('"When was the last claim filed?" Empty Value', function() {
    fillExcept(['previousClaims'], this.defaultValues);
    submit();
    checkErrors(['previousClaims']);
    cy.reload();
  });

  it('"How many months a year does the owner live in the home?" Empty Value', function() {
    fillExcept(['monthsOccupied'], this.defaultValues);
    submit();
    checkErrors(['monthsOccupied']);
    cy.reload();
  });

  it('"Is a business conducted on the property?" Empty Value', function() {
    fillExcept(['business'], this.defaultValues);
    submit();
    checkErrors(['business']);
  });
});
