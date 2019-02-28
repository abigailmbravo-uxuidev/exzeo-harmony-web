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

  const checkText = (tag, text) =>
    cy.findDataTag(tag).find('input').type(`{selectall}{backspace}${text}`).should('have.attr', 'value', text);
  const checkLabel = (tag, text) =>
    cy.findDataTag(tag).find('label').should('contain', text);

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

  it('POS:Policyholder Detail Header', () => {
    const checkHeaderSection = (tag, contents = []) =>
      cy.findDataTag(tag).find('dl div').children().each(($el, index) => expect($el).to.contain(contents[index]));

      checkHeaderSection('quote-details', ['Quote Number', '-']);
      checkHeaderSection('property-details', ['Address', user.address, '', 'SARASOTA']);
      checkHeaderSection('year-built', ['Year Built', '1998']);
      checkHeaderSection('construction-type', ['Construction Type', 'MASONRY']);
      checkHeaderSection('coverage-details', ['Coverage A', '--']);
      checkHeaderSection('premium', ['Premium', '']);
  });

  it('POS:Policyholder Workflow', () => {
    const checkWorkflowSection = (tag, active = false) =>
      cy.findDataTag(tag).find('a').should('have.attr', 'class', active ? 'active' : 'disabled');
    
    checkWorkflowSection('tab-nav-askAdditionalCustomerData', true);
    checkWorkflowSection('tab-nav-askUWAnswers');
    checkWorkflowSection('tab-nav-askToCustomizeDefaultQuote');
    checkWorkflowSection('tab-nav-sendEmailOrContinue');
    checkWorkflowSection('tab-nav-addAdditionalAIs');
    checkWorkflowSection('tab-nav-askAdditionalQuestions');
    checkWorkflowSection('tab-nav-editVerify');
  });
  
  it('POS:Primary Policyholder Text', () => {
    cy.get('span.section-group-header').first().find('i').should('have.attr', 'class', 'fa Primary Policyholder')
      .get('span.section-group-header').should('contain', 'Primary Policyholder');
    checkLabel('FirstName', 'First Name');
    checkLabel('LastName', 'Last Name');
    checkLabel('EmailAddress', 'Email Address');
    checkLabel('phoneNumber', 'Contact Phone');
  });

  it('POS:Primary Policyholder Input', () => {
    cy.clearAllText(primaryPolicyFields);
    const { FirstName, LastName, EmailAddress } = user.customerInfo;

    checkText('FirstName', FirstName);
    checkText('LastName', LastName);
    checkText('EmailAddress', EmailAddress);
    checkText('phoneNumber', '(123)');
  });
  
  it('POS:Secondary Policyholder Text', () => {
    toggleSecondUser();
    cy.get('span.section-group-header').contains('Secondary Policyholder').should('exist')
      .find('i').should('have.attr', 'class', 'fa Secondary Policyholder');
    checkLabel('FirstName2', 'First Name');
    checkLabel('LastName2', 'Last Name');
    checkLabel('EmailAddress2', 'Email Address');
    checkLabel('phoneNumber2', 'Policyholder Contact Phone');
  });

  it('POS:Secondary Policyholder Input', () => {
    toggleSecondUser();
    cy.clearAllText(secondaryPolicyFields);
    const { FirstName2, LastName2, EmailAddress2 } = secondUser.customerInfo;

    checkText('FirstName2', FirstName2);
    checkText('LastName2', LastName2);
    checkText('EmailAddress2', EmailAddress2);
    checkText('phoneNumber2', '(123) ');
  });

  it('POS:Policy Details Text', () => {
    cy.get('span.section-group-header').contains('Policy Details').should('exist')
      .find('i').should('have.attr', 'class', 'fa Policy Details');
    checkLabel('effectiveDate', 'Effective Date');
    cy.findDataTag('effectiveDate').find('div.date-min-max').should('contain', '-');
    checkLabel('agentCode', 'Agent');
  });

  it('POS:Policy Details Input', () =>
    cy.findDataTag('effectiveDate').find('input[type="date"]').should('have.attr', 'type', 'date')
      .findDataTag('agentCode').find('option').first().should('contain', 'Please select...').and('be.disabled')
  );

  it('POS:Policyholder Next Button', () =>
    cy.findDataTag('submit').should('exist').and('have.attr', 'type', 'submit')
  );
});
