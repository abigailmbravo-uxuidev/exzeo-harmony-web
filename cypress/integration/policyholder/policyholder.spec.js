import stubAllRoutes from "../../support/stubAllRoutes";
import {
  navigateThroughLanding,
  navigateThroughSearchAddress
} from '../../helpers';
import user from '../../fixtures/stockData/user.json';
import secondUser from '../../fixtures/stockData/secondUser.json';
import { ph1Fields, ph2Fields, policyDetailsFields } from './policyholderFields';

describe('Policyholder Testing', () => {
  // const primaryPolicyFields = ['FirstName', 'LastName', 'EmailAddress', 'phoneNumber'];
  // const secondaryPolicyFields = ['FirstName2', 'LastName2', 'EmailAddress2', 'phoneNumber2'];

  const toggleSecondUser = (dir = 'on') =>
    cy.get('#isAdditional').then($el => {
      if (($el.hasClass('active') && dir === 'off') || ($el.hasClass('inactive') && dir === 'on')) {
        cy.wrap($el).find('input[name = "isAdditional"] + .switch-div').click();
      };
    });

  const firstName = ph1Fields.find(({ name }) => name === 'FirstName');
  const lastName = ph1Fields.find(({ name }) => name === 'LastName');
  const email = ph1Fields.find(({ name }) => name === 'EmailAddress');
  const phone = ph1Fields.find(({ name }) => name === 'phoneNumber');
  const firstName2 = ph2Fields.find(({ name }) => name === 'FirstName2');
  const lastName2 = ph2Fields.find(({ name }) => name === 'LastName2');
  const email2 = ph2Fields.find(({ name }) => name === 'EmailAddress2');
  const phone2 = ph2Fields.find(({ name }) => name === 'phoneNumber2');
  const effectiveDate = policyDetailsFields.find(({ name }) => name === 'effectiveDate');

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

  it('NEG:All Inputs Empty Value', () =>
    cy.submitAndCheckValidation(ph1Fields)
  );

  it('NEG:Primary Policyholder Empty Value', () =>
    cy.wrap(ph1Fields).each(fieldToLeaveBlank => cy.verifyForm(ph1Fields, [fieldToLeaveBlank], user.customerInfo))
  );

  it('NEG:Secondary Policyholder Empty Value', () => {
    toggleSecondUser();
    cy.clearAllText(ph2Fields)
      .submitAndCheckValidation(ph2Fields)
      .wrap(ph2Fields).each(fieldToLeaveBlank => cy.verifyForm(ph2Fields, [fieldToLeaveBlank], secondUser.customerInfo));
  });

  it('NEG:Primary Policyholder Invalid Character', () =>
    cy.clearAllText(ph1Fields)
      .verifyForm([
        { ...firstName , error: 'Invalid characters' },
        { ...lastName, error: 'Invalid characters' },
        email
      ], undefined, { FirstName: '∞', LastName: '∞', EmailAddress: '∞' })
  );

  it('NEG:Secondary Policyholder Invalid Character', () => {
    toggleSecondUser();
    cy.clearAllText(ph2Fields)
      .verifyForm([
        { ...firstName2, error: 'Invalid characters' },
        { ...lastName2, error: 'Invalid characters' },
        email2
      ], undefined, { FirstName2: '∞', LastName2: '∞', EmailAddress2: '∞' });
  });

  it('NEG:Invalid Email Address', () => {
    toggleSecondUser();
    cy.clearAllText([...ph1Fields, ...ph2Fields])
      .verifyForm(undefined, [email, email2]);
  });

  it('NEG:Invalid Contact Phone', () => {
    toggleSecondUser();
    cy.clearAllText([...ph1Fields, ...ph2Fields])
      .verifyForm([
        { ...phone, error: 'is not a valid Phone Number.'},
        { ...phone2, error: 'is not a valid Phone Number.' }
      ], undefined, { phoneNumber: '123', phoneNumber2: '123' });
  });

  it('NEG:Invalid Effective Date', () =>
    cy.findDataTag('effectiveDate').find('input').clear()
      .submitAndCheckValidation([effectiveDate])
      .verifyForm([
        { ...effectiveDate, error: 'Date must be at least 08/01/2017' }
      ], undefined, { effectiveDate: '1900-01-01'})
  );

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

  it('POS:Primary Policyholder Label / Text', () =>
    cy.get('span.section-group-header').first().find('i').should('have.attr', 'class', 'fa Primary Policyholder')
      .get('span.section-group-header').should('contain', 'Primary Policyholder')
      .wrap(ph1Fields).each(({ name, label }) => cy.checkLabel(name, label).checkText(name))
    );

  it('POS:Secondary Policyholder Label / Text', () => {
    toggleSecondUser();
    cy.get('span.section-group-header').contains('Secondary Policyholder').should('exist')
      .find('i').should('have.attr', 'class', 'fa Secondary Policyholder')
      .wrap(ph2Fields).each(({ name, label }) => cy.checkLabel(name, label).checkText(name));
  });

  it('POS:Policy Details Text', () =>
    cy.get('span.section-group-header').contains('Policy Details').should('exist')
      .find('i').should('have.attr', 'class', 'fa Policy Details')
      .wrap(policyDetailsFields).each(({ name, label }) => cy.checkLabel(name, label))
      .findDataTag('effectiveDate').find('div.date-min-max').should('contain', '-')
  );

  it('POS:Policy Details Input', () =>
    cy.findDataTag('effectiveDate').should('have.attr', 'type', 'date')
      .findDataTag('agentCode').find('option').first().should('contain', 'Please Select...').and('be.disabled')
  );

  it('POS:Policyholder Next Button', () =>
    cy.checkSubmitButton()
  );
});
