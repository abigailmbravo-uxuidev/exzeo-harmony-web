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

describe('Mailing/Billing Testing', () => {
  const fields = ['address1', 'city', 'state', 'zip'];

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

  it('NEG:All Mailing Address Inputs Empty Value', () => {
    cy.clearAllText(fields);

    cy.submitAndCheckValidation(fields);
  });

  it('NEG:Mailing Address Empty Value', () => {
    cy.fixture('stockData/mailing').then(mailing => {
      cy.clearAllText(fields);

      fields.forEach(leaveBlank => cy.verifyForm(fields, [leaveBlank], mailing));
    });
  });

  it('NEG:Mailing Address Invalid Input Value', () => {
    cy.clearAllText(fields);

    cy.verifyForm(['state'], undefined, { state: 'foo ' }, { errors: ['Only 2 letters allowed'] });

    cy.verifyForm(['zip'], undefined, { zip: '123456789' }, { errors: ['Only 8 letters or numbers allowed'] });
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
    cy.get('.form-group.survey-wrapper h3').first()
      .should('contain', 'Mailing Address').find('i').should('have.attr', 'class', 'fa fa-envelope')
      .get('.form-group.survey-wrapper h3').last()
      .should('contain', 'Billing Information').find('i').should('have.attr', 'class', 'fa fa-dollar')
  );

  it('POS:Mailing / Billing Label Text', () =>
    cy.checkLabel('sameAsProperty', 'Is the mailing address')
      .checkLabel('address1', 'Address 1')
      .checkLabel('address2', 'Address 2')
      .checkLabel('city', 'City')
      .checkLabel('state', 'State')
      .checkLabel('zip', 'Zip')
      .checkLabel('billToId', 'Bill To')
      .checkLabel('billPlan', 'Bill Plan')
  );

  it('POS:Mailing / Billing Input', () =>
    cy.checkText('address1', '123 test address')
      .checkText('address2', '123 test address')
      .checkText('city', 'tampa')
      .checkText('state', 'fl')
      .checkText('zip', '00001')
  );

  it('POS:Mailing / Billing Toggle', () =>
    cy.fixture('stubs/getQuoteServiceRequest').then(({ result: { policyHolderMailingAddress: { city, state, zip, address1 }}}) =>
      cy.findDataTag('sameAsProperty').find('label').should('contain', 'Is the mailing address the same')
        .find('input[name="sameAsProperty"]').should('have.attr', 'value', 'false')
        .get('.switch-div').click().get('input[name="sameAsProperty"]').should('have.attr', 'value', 'true')
        .get('.switch-div').click().get('input[name="sameAsProperty"]').should('have.attr', 'value', 'false')
        .get('.switch-div').click()
        .findDataTag('address1').find('input[name="address1"]').should('have.attr', 'value', address1)
        .findDataTag('city').find('input[name="city"]').should('have.attr', 'value', city)
        .findDataTag('state').find('input[name="state"]').should('have.attr', 'value', state)
        .findDataTag('zip').find('input[name="zip"]').should('have.attr', 'value', zip)
    )
  );
  it('POS:Mailing / Billing Input 2', () =>
    cy.findDataTag('billToId').find('select[aria-activedescendant*="5c6"]').should('exist')
      .clickEachRadio('billPlan')
  );

  it('POS:Mailing / Billing Installment', () =>
    cy.findDataTag('installment-term').find('dl div div').each($el =>
      cy.wrap($el).find('dt').should('contain', 'Plan')
        .next().should('contain', '$')
    ).then($list => expect($list).to.have.length(3))
  );

  it('POS:Next Button', () =>
    cy.checkNextButton()
  );
});
