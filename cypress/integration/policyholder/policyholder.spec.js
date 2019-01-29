describe('Policyholder Testing', () => {
  const primaryPolicyFields = ['FirstName', 'LastName', 'EmailAddress', 'phoneNumber'];
  const secondaryPolicyFields = ['FirstName2', 'LastName2', 'EmailAddress2', 'phoneNumber2'];

  const toggleSecondUser = (dir = 'on') => {
    cy.get('#isAdditional').then($el => {
      if (($el.hasClass('active') && dir === 'off') || ($el.hasClass('inactive') && dir === 'on')) {
        cy.wrap($el).find('input[name = "isAdditional"] + .switch-div').click();
      };
    });
  };
  
  before('Go to Policyholder page', () => {
    cy.quoteWorkflow('customerInfo');
  });

  beforeEach('Establish fixtures and reset', () => {
    cy.fixture('user').as('user');
    cy.fixture('secondUser').as('secondUser');
    toggleSecondUser('off');
  });

  it('All Inputs Empty Value', () => {
    cy.submitAndCheckValidation(primaryPolicyFields);
  });

  it('Primary Policyholder Empty Value', function() {
    const { user: { customerInfo } } = this;

    primaryPolicyFields.forEach(leaveBlank => cy.verifyForm(primaryPolicyFields, [leaveBlank], customerInfo));
  });

  it('Secondary Policyholder Empty Value', function() {
    const { secondUser: { customerInfo } } = this;
    toggleSecondUser();
    cy.clearAllText(secondaryPolicyFields);

    cy.submitAndCheckValidation(secondaryPolicyFields);

    secondaryPolicyFields.forEach(leaveBlank => cy.verifyForm(secondaryPolicyFields, [leaveBlank], customerInfo));
  });

  it('Primary Policyholder Invalid Character', () => {
    cy.clearAllText(primaryPolicyFields);
    cy.verifyForm(['FirstName'], undefined, { FirstName: '∞' }, { errors: ['Invalid characters'] });

    cy.verifyForm(['LastName'], undefined, { LastName: '∞' }, { errors: ['Invalid characters'] });

    cy.verifyForm(['EmailAddress'], undefined, { EmailAddress: '∞' });
  });

  it('Secondary Policyholder Invalid Character', () => {
    toggleSecondUser();
    cy.clearAllText(secondaryPolicyFields);

    cy.verifyForm(['FirstName2'], undefined, { FirstName2: '∞' }, { errors: ['Invalid characters'] });

    cy.verifyForm(['LastName2'], undefined, { LastName2: '∞' }, { errors: ['Invalid characters'] });

    cy.verifyForm(['EmailAddress2'], undefined, { EmailAddress2: '∞' });
  });

  it('Invalid Email Address', () => {
    toggleSecondUser();
    cy.clearAllText([...primaryPolicyFields, ...secondaryPolicyFields]);

    cy.verifyForm(undefined, ['EmailAddress']);

    cy.verifyForm(undefined, ['EmailAddress2']);
  });

  it('Invalid Contact Phone', () => {
    toggleSecondUser();
    cy.clearAllText([...primaryPolicyFields, ...secondaryPolicyFields]);

    cy.verifyForm(['phoneNumber'], undefined, { phoneNumber: '123' }, { errors: ['is not a valid Phone Number.']});

    cy.verifyForm(['phoneNumber2'], undefined, { phoneNumber2: '456' }, { errors: ['is not a valid Phone Number.'] });
  });
  
  it('Invalid Effective Date', () => {
    cy.findDataTag('effectiveDate-input').clear();
    cy.submitAndCheckValidation(['effectiveDate'], { errors: ['Not a valid date'] });

    cy.findDataTag('effectiveDate-input').type('1900-01-01');
    cy.submitAndCheckValidation(['effectiveDate'], { errors: ['Date must be at least 08/01/2017'] });
  });
});
