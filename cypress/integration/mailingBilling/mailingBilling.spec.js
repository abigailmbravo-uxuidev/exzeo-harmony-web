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
  // const fields = ['address1', 'city', 'state', 'zip'];

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

  const required = fields.filter(({ required }) => required !== false);
  const textFields = fields.filter(field => !field.type || field.type === 'text');
  const reqTextFields = textFields.filter(({ required }) => required !== false);

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
    cy.checkLabel('sameAsPropertyAddress_wrapper', 'Is the mailing address')
      .checkLabel('policyHolderMailingAddress.address1_wrapper', 'Address 1')
      .checkLabel('policyHolderMailingAddress.address2_wrapper', 'Address 2')
      .checkLabel('policyHolderMailingAddress.city_wrapper', 'City')
      .checkLabel('policyHolderMailingAddress.state_wrapper', 'State')
      .checkLabel('policyHolderMailingAddress.zip_wrapper', 'Zip')
      .checkLabel('billToId_wrapper', 'Bill To')
      .checkLabel('billPlan_wrapper', 'Bill Plan')
  );

  it('POS:Mailing / Billing Input', () =>
    cy.checkText('policyHolderMailingAddress.address1_wrapper', '123 test address')
      .checkText('policyHolderMailingAddress.address2_wrapper', '123 test address')
      .checkText('policyHolderMailingAddress.city_wrapper', 'tampa')
      .checkText('policyHolderMailingAddress.state_wrapper', 'fl')
      .checkText('policyHolderMailingAddress.zip_wrapper', '00001')
  );

  it('POS:Mailing / Billing Toggle', () =>
    cy.fixture('stubs/getQuoteServiceRequest').then(({ result: { policyHolderMailingAddress: { city, state, zip, address1 }}}) =>
      cy.checkLabel('sameAsPropertyAddress_wrapper', 'Is the mailing address the same')
        .findDataTag('sameAsPropertyAddress').should('have.attr', 'data-value', '')
        .click().should('have.attr', 'data-value', 'true')
        .click().should('have.attr', 'data-value', 'false')
        .click().should('have.attr', 'data-value', 'true')
        .findDataTag('policyHolderMailingAddress.address1').should('have.attr', 'value', address1)
        .findDataTag('policyHolderMailingAddress.city').should('have.attr', 'value', city)
        .findDataTag('policyHolderMailingAddress.state').should('have.attr', 'value', state)
        .findDataTag('policyHolderMailingAddress.zip').should('have.attr', 'value', zip)
    )
  );

  it('POS:Mailing / Billing Input 2', () =>
    cy.findDataTag('billToId_wrapper').find('select[data-selected*="5c6"]').should('exist')
      .clickEachRadio('billPlan_wrapper')
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
