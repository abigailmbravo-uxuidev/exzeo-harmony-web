import stubAllRoutes from "../../support/stubAllRoutes";
import {
  navigateThroughLanding,
  navigateThroughSearchAddress
} from '../../helpers';
import { ph1Fields, ph2Fields, policyDetailsFields, workflowSections, pageHeaders } from './policyholderFields';

describe('Policyholder Testing', () => {
  const toggleSecondUser = (dir = 'on') =>
    cy.findDataTag('additionalPolicyholder').then($el => {
      if (($el.hasClass('active') && dir === 'off') || (!$el.hasClass('active') && dir === 'on')) {
        cy.wrap($el).click();
      };
    });

  const firstName = ph1Fields.find(({ name }) => name === 'policyHolders[0].firstName_wrapper');
  const lastName = ph1Fields.find(({ name }) => name === 'policyHolders[0].lastName_wrapper');
  const email = ph1Fields.find(({ name }) => name === 'policyHolders[0].emailAddress_wrapper');
  const phone = ph1Fields.find(({ name }) => name === 'policyHolders[0].primaryPhoneNumber_wrapper');
  const firstName2 = ph2Fields.find(({ name }) => name === 'policyHolders[1].firstName_wrapper');
  const lastName2 = ph2Fields.find(({ name }) => name === 'policyHolders[1].lastName_wrapper');
  const email2 = ph2Fields.find(({ name }) => name === 'policyHolders[1].emailAddress_wrapper');
  const phone2 = ph2Fields.find(({ name }) => name === 'policyHolders[1].primaryPhoneNumber_wrapper');
  const effectiveDate = policyDetailsFields.find(({ name }) => name === 'effectiveDate_wrapper');

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

  // it('NEG:All Inputs Empty Value', () =>
  //   cy.submitAndCheckValidation(ph1Fields)
  // );

  // it('NEG:Primary Policyholder Empty Value', () =>
  //   cy.wrap(ph1Fields).each(fieldToLeaveBlank => cy.verifyForm(ph1Fields, [fieldToLeaveBlank]))
  // );

  // it('NEG:Secondary Policyholder Empty Value', () => {
  //   toggleSecondUser();
  //   cy.clearAllText(ph2Fields)
  //     .submitAndCheckValidation(ph2Fields)
  //     .wrap(ph2Fields).each(fieldToLeaveBlank => cy.verifyForm(ph2Fields, [fieldToLeaveBlank]));
  // });

  // it('NEG:Primary Policyholder Invalid Character', () =>
  //   cy.clearAllText(ph1Fields)
  //     .verifyForm([
  //       { ...firstName, error: 'Invalid characters', data: '∞' },
  //       { ...lastName, error: 'Invalid characters', data: '∞' },
  //       { ...email, error: 'Not a valid email address', data: '∞' }
  //     ])
  // );

  // it('NEG:Secondary Policyholder Invalid Character', () => {
  //   toggleSecondUser();
  //   cy.clearAllText(ph2Fields)
  //     .verifyForm([
  //       { ...firstName2, error: 'Invalid characters', data: '∞' },
  //       { ...lastName2, error: 'Invalid characters', data: '∞' },
  //       { ...email2, error: 'Not a valid email address', data: '∞' }
  //     ]);
  // });

  // it('NEG:Invalid Email Address', () => {
  //   toggleSecondUser();
  //   cy.clearAllText([...ph1Fields, ...ph2Fields])
  //     .verifyForm(undefined, [email, email2]);
  // });

  // it('NEG:Invalid Contact Phone', () => {
  //   toggleSecondUser();
  //   cy.clearAllText([...ph1Fields, ...ph2Fields])
  //     .verifyForm([
  //       { ...phone, error: 'Not a valid Phone Number', data: '123' },
  //       { ...phone2, error: 'Not a valid Phone Number', data: '123' }
  //     ]);
  // });

  // it('NEG:Invalid Effective Date', () =>
  //   cy.findDataTag('effectiveDate_wrapper').find('input').clear()
  //     .submitAndCheckValidation([effectiveDate])
  //     .verifyForm([
  //       { ...effectiveDate, error: 'Date must be at least 08/01/2017', data: '1900-01-01' }
  //     ])
  // );

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

  it('POS:Check Headers', () => {
    toggleSecondUser();
    cy.wrap(pageHeaders).each(header => cy.checkHeader(header));
  });

  it('POS:Policyholder Workflow', () =>
    cy.wrap(workflowSections).each(section => cy.checkWorkflowSection(section))
  );

  // it('POS:Primary Policyholder Label / Text', () =>
  //   cy.wrap(ph1Fields).each(({ name, label, data }) => cy.checkLabel(name, label).checkText(name, data))
  // );

  // it('POS:Secondary Policyholder Label / Text', () => {
  //   toggleSecondUser();
  //   cy.wrap(ph2Fields).each(({ name, label, data }) => cy.checkLabel(name, label).checkText(name, data));
  // });

  // it('POS:Policy Details Text', () =>
  //   cy.checkLabel('effectiveDate_wrapper', 'Effective Date')
  //     .findDataTag('effectiveDate_wrapper').find('span.secondary-label').should('contain', '-')
  //     .checkLabel('agentCode_wrapper', 'Agent')
  // );

  // it('POS:Policy Details Input', () =>
  //   cy.findDataTag('effectiveDate').should('have.attr', 'type', 'date')
  //     .findDataTag('agentCode').find('option').first().should('contain', 'Please Select...').and('be.disabled')
  // );

  it('POS:Policyholder Next Button', () => cy.checkSubmitButton());
});
