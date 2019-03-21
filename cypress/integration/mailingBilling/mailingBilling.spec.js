import stubAllRoutes from "../../support/stubAllRoutes";
import {
  navigateThroughLanding,
  navigateThroughSearchAddress,
  navigateThroughPolicyholder,
  navigateThroughUnderwriting,
  navigateThroughCustomize,
  navigateThroughShare,
  navigateThroughAssumptions,
  navigateThroughAdditionalInterests
} from '../../helpers';
import fields from './mailingBillingFields';

describe('Mailing/Billing Testing', () => {
  before(() => {
    stubAllRoutes();
    cy.login();
    navigateThroughLanding();
    navigateThroughSearchAddress();
    navigateThroughPolicyholder();
    navigateThroughUnderwriting();
    navigateThroughCustomize();
    navigateThroughShare();
    navigateThroughAssumptions();
    navigateThroughAdditionalInterests();
  });

  const textFields = fields.filter(field => !field.type || field.type === 'text');
  const reqTextFields = textFields.filter(({ required }) => required !== false);
  const radioFields = fields.filter(field => field.type && field.type === 'radio');

  it('NEG:All Mailing Address Inputs Empty Value', () =>
    cy.clearAllText(textFields).submitAndCheckValidation(reqTextFields)
  );

  it('NEG:Mailing Address Empty Value', () => {
    cy.fixture('stockData/mailing').then(mailing => {
      cy.clearAllText(textFields)
        .wrap(reqTextFields).each(fieldToLeaveBlank => cy.verifyForm(reqTextFields, [fieldToLeaveBlank], mailing));
    });
  });

  it('NEG:Mailing Address Invalid Input Value', () => {
    const state = fields.find(({ name }) => name === 'state');
    const zip = fields.find(({ name }) => name === 'zip');
    cy.clearAllText(textFields)
      .verifyForm([{ ...state, error: 'Only 2 letters allowed' }], undefined, { state: 'foo' })
      .verifyForm([{ ...zip, error: 'Only 8 letters or numbers allowed' }], undefined, { zip: '123456789' });
  });

  it('POS:Mailing / Billing Workflow', () =>
    cy.checkWorkflowSection('tab-nav-askAdditionalCustomerData', 'selected')
      .checkWorkflowSection('tab-nav-askUWAnswers', 'selected')
      .checkWorkflowSection('tab-nav-askToCustomizeDefaultQuote', 'selected')
      .checkWorkflowSection('tab-nav-sendEmailOrContinue', 'selected')
      .checkWorkflowSection('tab-nav-addAdditionalAIs', 'selected')
      .checkWorkflowSection('tab-nav-askAdditionalQuestions', 'active')
      .checkWorkflowSection('tab-nav-editVerify')
  );

  it('POS:Mailing / Billing Header Text', () =>
    cy.get('div.title').first()
      .should('contain', 'Mailing Address').find('i').should('have.attr', 'class', 'fa fa-envelope')
      .get('div.title').last()
      .should('contain', 'Billing Information').find('i').should('have.attr', 'class', 'fa fa-dollar')
  );

  it('POS:Mailing / Billing Label Text', () =>
    cy.checkLabel('sameAsProperty', 'Is the mailing address')
      .wrap(fields).each(({ name, label }) => cy.checkLabel(name, label))
      .checkLabel('address1', 'Address 1')
      .checkLabel('address2', 'Address 2')
      .checkLabel('city', 'City')
      .checkLabel('state', 'State')
      .checkLabel('zip', 'Zip')
      .checkLabel('billToId', 'Bill To')
      .checkLabel('billPlan', 'Bill Plan')
  );

  it('POS:Mailing / Billing Input', () =>
    cy.wrap(reqTextFields).each(({ name }) => cy.checkText(name))
  );

  it('POS:Mailing / Billing Toggle', () =>
    cy.fixture('stubs/getQuoteServiceRequest').then(({ result: { policyHolderMailingAddress }}) =>
      cy.findDataTag('sameAsProperty').find('label').should('contain', 'Is the mailing address the same')
        .find('input[name="sameAsProperty"]').should('have.attr', 'value', 'false')
        .get('.switch-div').click().get('input[name="sameAsProperty"]').should('have.attr', 'value', 'true')
        .get('.switch-div').click().get('input[name="sameAsProperty"]').should('have.attr', 'value', 'false')
        .get('.switch-div').click()
        .wrap(reqTextFields).each(({ name }) => cy.findDataTag(name).find(`input[name="${name}"]`).should('have.attr', 'value', policyHolderMailingAddress[name]))
    )
  );

  it('POS:Mailing / Billing Input 2', () =>
    cy.findDataTag('billToId').find('select[aria-activedescendant*="5c6"]').should('exist')
      .wrap(radioFields).each(({ name }) => cy.clickEachRadio(name))
  );

  it('POS:Mailing / Billing Installment', () =>
    cy.findDataTag('section-billing-plans').find('h4').should('contain', 'Installment Plan')
      .next().children().first().should('contain', 'Annual').next().should('contain', '$ 2,667')
      .parent().next().children().first().should('contain', 'Semi-Annual')
      .next().should('contain', '$ 1,624').next().should('contain', '$ 1,059')
      .parent().next().children().first().should('contain', 'Quarterly')
      .next().should('contain', '$ 1,096')
      .next().should('contain', '$ 531')
      .next().should('contain', '$ 531')
      .next().should('contain', '$ 531')
  );

  it('POS:Next Button', () =>
    cy.checkSubmitButton()
  );
});
