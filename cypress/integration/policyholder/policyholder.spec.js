import stubAllRoutes from "../../support/stubAllRoutes";
import {
  navigateThroughLanding,
  navigateThroughSearchAddress
} from '../../helpers';

describe('Policyholder Testing', () => {
  const user = {
    "customerInfo": {
      "policyHolders[0].firstName_wrapper": "Bruce",
      "policyHolders[0].lastName_wrapper": "Wayne",
      "policyHolders[0].emailAddress_wrapper": "Batman@gmail.com",
      "policyHolders[0].primaryPhoneNumber_wrapper": "123 456 7890"
    }
  };
  const secondUser = {
    "customerInfo": {
      "policyHolders[1].firstName_wrapper": "Dick",
      "policyHolders[1].lastName_wrapper": "Grayson",
      "policyHolders[1].emailAddress_wrapper": "Robin@hotmail.com",
      "policyHolders[1].primaryPhoneNumber_wrapper": "135 792 4680"
    }
  };
  const primaryPolicyFields = ['policyHolders[0].firstName_wrapper', 'policyHolders[0].lastName_wrapper', 'policyHolders[0].emailAddress_wrapper', 'policyHolders[0].primaryPhoneNumber_wrapper'];
  const secondaryPolicyFields = ['policyHolders[1].firstName_wrapper', 'policyHolders[1].lastName_wrapper', 'policyHolders[1].emailAddress_wrapper', 'policyHolders[1].primaryPhoneNumber_wrapper'];

  const toggleSecondUser = (dir = 'on') => {
    cy.findDataTag('additionalPolicyholder').then($el => {
      if (($el.hasClass('active') && dir === 'off') || (!$el.hasClass('active') && dir === 'on')) {
        cy.wrap($el).click();
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
    cy.verifyForm(['policyHolders[0].firstName_wrapper'], undefined, { 'policyHolders[0].firstName_wrapper': '∞' }, { errors: ['Invalid characters'] });

    cy.verifyForm(['policyHolders[0].lastName_wrapper'], undefined, { 'policyHolders[0].lastName_wrapper': '∞' }, { errors: ['Invalid characters'] });

    cy.verifyForm(['policyHolders[0].emailAddress_wrapper'], undefined, { 'policyHolders[0].emailAddress_wrapper': '∞' }, { errors: ['Not a valid email address']});
  });

  it('NEG:Secondary Policyholder Invalid Character', () => {
    toggleSecondUser();
    cy.clearAllText(secondaryPolicyFields);

    cy.verifyForm(['policyHolders[1].firstName_wrapper'], undefined, { 'policyHolders[1].firstName_wrapper': '∞' }, { errors: ['Invalid characters'] });

    cy.verifyForm(['policyHolders[1].lastName_wrapper'], undefined, { 'policyHolders[1].lastName_wrapper': '∞' }, { errors: ['Invalid characters'] });

    cy.verifyForm(['policyHolders[1].emailAddress_wrapper'], undefined, { 'policyHolders[1].emailAddress_wrapper': '∞' }, { errors: ['Not a valid email address']});
  });

  it('NEG:Invalid Contact Phone', () => {
    toggleSecondUser();
    cy.clearAllText([...primaryPolicyFields, ...secondaryPolicyFields]);

    cy.verifyForm(['policyHolders[0].primaryPhoneNumber_wrapper'], undefined, { 'policyHolders[0].primaryPhoneNumber_wrapper': '123' }, { errors: ['Not a valid Phone Number.']});

    cy.verifyForm(['policyHolders[1].primaryPhoneNumber_wrapper'], undefined, { 'policyHolders[1].primaryPhoneNumber_wrapper': '456' }, { errors: ['Not a valid Phone Number.'] });
  });

  it('NEG:Invalid Effective Date', () => {
    cy.findDataTag('effectiveDate_wrapper').find('input').clear();
    cy.submitAndCheckValidation(['effectiveDate_wrapper']);

    cy.findDataTag('effectiveDate_wrapper').find('input').type('1900-01-01');
    cy.submitAndCheckValidation(['effectiveDate_wrapper'], { errors: ['Date must be at least 08/01/2017'] });
  });

  it('POS:Policyholder Detail Header', () => {
    const checkHeaderSection = (tag, values = []) =>
      cy.findDataTag(tag).find('dl div').children().each(($el, index) => expect($el).to.contain(values[index]));

      checkHeaderSection('quote-details', ['Quote Number', '-']);
      checkHeaderSection('property-details', ['Address', '4131 TEST ADDRESS', '', 'SARASOTA']);
      checkHeaderSection('year-built', ['Year Built', '1998']);
      checkHeaderSection('construction-type', ['Construction Type', 'MASONRY']);
      checkHeaderSection('coverage-details', ['Coverage A', '--']);
      checkHeaderSection('premium', ['Premium', '']);
  });

  it('POS:Policyholder Workflow', () =>
    cy.checkWorkflowSection('tab-nav-askAdditionalCustomerData', 'active')
      .checkWorkflowSection('tab-nav-askUWAnswers')
      .checkWorkflowSection('tab-nav-askToCustomizeDefaultQuote')
      .checkWorkflowSection('tab-nav-sendEmailOrContinue')
      .checkWorkflowSection('tab-nav-addAdditionalAIs')
      .checkWorkflowSection('tab-nav-askAdditionalQuestions')
      .checkWorkflowSection('tab-nav-editVerify')
  );

  it('POS:Primary Policyholder Text', () =>
    cy.findDataTag('Primary Policyholder').should('contain', 'Primary Policyholder')
      .find('i').should('have.attr', 'class', 'fa fa-user-circle')
      .checkLabel('policyHolders[0].firstName_wrapper', 'First Name')
      .checkLabel('policyHolders[0].lastName_wrapper', 'Last Name')
      .checkLabel('policyHolders[0].emailAddress_wrapper', 'Email Address')
      .checkLabel('policyHolders[0].primaryPhoneNumber_wrapper', 'Contact Phone')
    );

  it('POS:Primary Policyholder Input', () => {
    cy.clearAllText(primaryPolicyFields);

    cy.checkText('policyHolders[0].firstName_wrapper', user.customerInfo['policyHolders[0].firstName_wrapper'])
      .checkText('policyHolders[0].lastName_wrapper', user.customerInfo['policyHolders[0].lastName_wrapper'])
      .checkText('policyHolders[0].emailAddress_wrapper', user.customerInfo['policyHolders[0].emailAddress_wrapper'])
      .checkText('policyHolders[0].primaryPhoneNumber_wrapper', '(123)    -    ');
  });

  it('POS:Secondary Policyholder Text', () => {
    toggleSecondUser();
    cy.findDataTag('Secondary Policyholder').should('contain', 'Secondary Policyholder')
      .find('i').should('have.attr', 'class', 'fa fa-user-circle')
      .checkLabel('policyHolders[1].firstName_wrapper', 'First Name')
      .checkLabel('policyHolders[1].lastName_wrapper', 'Last Name')
      .checkLabel('policyHolders[1].emailAddress_wrapper', 'Email Address')
      .checkLabel('policyHolders[1].primaryPhoneNumber_wrapper', 'Contact Phone')
  });

  it('POS:Secondary Policyholder Input', () => {
    toggleSecondUser();
    cy.clearAllText(secondaryPolicyFields);

    cy.checkText('policyHolders[1].firstName_wrapper', user.customerInfo['policyHolders[1].firstName_wrapper'])
      .checkText('policyHolders[1].lastName_wrapper', user.customerInfo['policyHolders[1].lastName_wrapper'])
      .checkText('policyHolders[1].emailAddress_wrapper', user.customerInfo['policyHolders[1].emailAddress_wrapper'])
      .checkText('policyHolders[1].primaryPhoneNumber_wrapper', '(123)    -    ');
  });

  it('POS:Policy Details Text', () =>
    cy.findDataTag('Policy Details').should('contain', 'Policy Details')
      .find('i').should('have.attr', 'class', 'fa fa-file-text')
      .checkLabel('effectiveDate_wrapper', 'Effective Date')
      .findDataTag('effectiveDate_wrapper').find('span.secondary-label').should('contain', '-')
      .checkLabel('agentCode_wrapper', 'Agent')
  );

  it('POS:Policy Details Input', () =>
    cy.findDataTag('effectiveDate').should('have.attr', 'type', 'date')
      .findDataTag('agentCode').find('option').first().should('contain', 'Please Select...').and('be.disabled')
  );

  it('POS:Policyholder Next Button', () =>
    cy.checkSubmitButton()
  );
});
