import stubAllRoutes from "../../support/stubAllRoutes";
import {
  navigateThroughLanding,
  navigateThroughSearchAddress
} from '../../helpers';
import user from '../../fixtures/stockData/user.json';
import secondUser from '../../fixtures/stockData/secondUser.json';

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
    stubAllRoutes();
    cy.login();
    navigateThroughLanding();
    navigateThroughSearchAddress();
  });

  beforeEach('Establish fixtures and reset', () => {
    stubAllRoutes();
    toggleSecondUser('off');
  });

  it('NEG:All Inputs Empty Value', () => {
    cy.submitAndCheckValidation(primaryPolicyFields);
  });

  it('NEG:Primary Policyholder Empty Value', () => {
    primaryPolicyFields.forEach(leaveBlank => cy.verifyForm(primaryPolicyFields, [leaveBlank], user.customerInfo));
  });

  it('NEG:Secondary Policyholder Empty Value', () => {
    toggleSecondUser();
    cy.clearAllText(secondaryPolicyFields);

    cy.submitAndCheckValidation(secondaryPolicyFields);

    secondaryPolicyFields.forEach(leaveBlank => cy.verifyForm(secondaryPolicyFields, [leaveBlank], secondUser.customerInfo));
  });

  it('NEG:Primary Policyholder Invalid Character', () => {
    cy.clearAllText(primaryPolicyFields);
    cy.verifyForm(['FirstName'], undefined, { FirstName: '∞' }, { errors: ['Invalid characters'] });

    cy.verifyForm(['LastName'], undefined, { LastName: '∞' }, { errors: ['Invalid characters'] });

    cy.verifyForm(['EmailAddress'], undefined, { EmailAddress: '∞' });
  });

  it('NEG:Secondary Policyholder Invalid Character', () => {
    toggleSecondUser();
    cy.clearAllText(secondaryPolicyFields);

    cy.verifyForm(['FirstName2'], undefined, { FirstName2: '∞' }, { errors: ['Invalid characters'] });

    cy.verifyForm(['LastName2'], undefined, { LastName2: '∞' }, { errors: ['Invalid characters'] });

    cy.verifyForm(['EmailAddress2'], undefined, { EmailAddress2: '∞' });
  });

  it('NEG:Invalid Email Address', () => {
    toggleSecondUser();
    cy.clearAllText([...primaryPolicyFields, ...secondaryPolicyFields]);

    cy.verifyForm(undefined, ['EmailAddress']);

    cy.verifyForm(undefined, ['EmailAddress2']);
  });

  it('NEG:Invalid Contact Phone', () => {
    toggleSecondUser();
    cy.clearAllText([...primaryPolicyFields, ...secondaryPolicyFields]);

    cy.verifyForm(['phoneNumber'], undefined, { phoneNumber: '123' }, { errors: ['is not a valid Phone Number.']});

    cy.verifyForm(['phoneNumber2'], undefined, { phoneNumber2: '456' }, { errors: ['is not a valid Phone Number.'] });
  });

  it('NEG:Invalid Effective Date', () => {
    cy.findDataTag('effectiveDate').find('input').clear();
    cy.submitAndCheckValidation(['effectiveDate'], { errors: ['Not a valid date'] });

    cy.findDataTag('effectiveDate').find('input').type('1900-01-01');
    cy.submitAndCheckValidation(['effectiveDate'], { errors: ['Date must be at least 08/01/2017'] });
  });
});
