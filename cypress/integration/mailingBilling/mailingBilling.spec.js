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
import { fields, workflowSections, pageHeaders } from './mailingBillingFields';

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

  const textFields = fields.filter(({ type }) => type === 'text');
  const reqTextFields = textFields.filter(({ required }) => required !== false);
  const radioFields = fields.filter(({ type }) => type === 'radio');
  const switchFields = fields.filter(({ type }) => type === 'switch');

  it('NEG:All Mailing Address Inputs Empty Value', () =>
    cy.clearAllText(textFields).submitAndCheckValidation(reqTextFields)
  );

  it('NEG:Mailing Address Empty Value', () =>
    cy.clearAllText(textFields)
      .wrap(reqTextFields).each(fieldToLeaveBlank => cy.verifyForm(reqTextFields, [fieldToLeaveBlank]))
  );

  it('NEG:Mailing Address Invalid Input Value', () => {
    const state = fields.find(({ name }) => name === 'policyHolderMailingAddress.state_wrapper');
    const zip = fields.find(({ name }) => name === 'policyHolderMailingAddress.zip_wrapper');
    cy.clearAllText(textFields)
      .verifyForm([{ ...state, error: 'Only 2 letters allowed', data: 'foo' }])
      .verifyForm([{ ...zip, error: 'Only 8 letters or numbers allowed', data: '123456789' }]);
  });

  it('POS:Mailing / Billing Workflow', () =>
    cy.wrap(workflowSections).each(section => cy.checkWorkflowSection(section))
  );

  it('POS:Mailing / Billing Header Text', () =>
    cy.wrap(pageHeaders).each(header => cy.checkHeader(header))
  );

  it('POS:Mailing / Billing Label Text', () =>
    cy.wrap(fields).each(({ name, label }) => cy.checkLabel(name, label))
  );

  it('POS:Mailing / Billing Input', () =>
    cy.wrap(textFields).each(({ name, data }) => cy.checkText(name, data))
  );

  it('POS:Mailing / Billing Toggle', () =>
    cy.fixture('stubs/getQuoteServiceRequest').then(({ result: { policyHolderMailingAddress }}) =>
      cy.wrap(switchFields).each(({ name, label, defaultValue }) => cy.checkLabel(name, label).checkSwitch({ name, defaultValue }))
        .findDataTag('sameAsPropertyAddress').click().should('have.attr', 'data-value', 'true')
        .wrap(reqTextFields).each(({ name }) => cy.findDataTag(name).find('input').should('have.attr', 'value', policyHolderMailingAddress[name.split('.')[1].split('_')[0]]))
    )
  );

  it('POS:Mailing / Billing Input 2', () =>
    cy.findDataTag('billToId_wrapper').find('option[value*="5c6"]').should('exist')
      .wrap(radioFields).each(field => cy.clickEachRadio(field))
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
