import { goBack } from './utils';
import stubAllRoutes from '../../support/stubAllRoutes';
import {
  navigateThroughLanding,
  navigateThroughSearchAddress,
  navigateThroughPolicyholder,
  navigateThroughUnderwriting,
  navigateThroughCustomize,
  navigateThroughShare,
  navigateThroughAssumptions
} from '../../helpers';
import user from '../../fixtures/stockData/additionalUser.json';
import fields from './basicInputs';

describe('Premium Finance Testing', () => {
  const toggleModalOn = () => cy.findDataTag('bill-payer-add').click();

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
  });

  beforeEach('Establish fixtures', () => {
    stubAllRoutes();
    cy.route('POST', '/cg/complete?addAdditionalAIs', 'fx:stubs/addAdditionalAIs/billpayer');
  });

  const requiredFields = fields.filter(({ required }) => required !== false);

  it('NEG:All Premium Finance Inputs Empty Value', () =>
    goBack().then(() => {
      toggleModalOn();
      cy.clearAllText(fields).submitAndCheckValidation(requiredFields);
    })
  );

  it('NEG:Premium Finance Empty Value', () =>
    goBack().then(() => {
      toggleModalOn();
      cy.clearAllText(fields)
        .wrap(requiredFields).each(fieldToLeaveBlank => cy.verifyForm(requiredFields, [fieldToLeaveBlank], user));
    })
  );

  it('NEG:Premium Finance Invalid Input Value', () =>
    goBack().then(() => {
      toggleModalOn();
      const state = fields.find(({ name }) => name === 'state');
      const zip = fields.find(({ name }) => name === 'zip');
      cy.clearAllText(fields)
        .verifyForm([{ ...state, error: 'Only 2 letters allowed' }], undefined, { state: 'foo' })
        .verifyForm([{ ...zip, error: 'Only 8 letters or numbers allowed' }], undefined, { zip: '123456789' })
    })
  );

  it('POS:Bill Payer', () =>
    goBack().then(() =>
      cy.findDataTag('bill-payer-add').should('have.attr', 'class', 'btn btn-secondary').click()
        .get('#BillPayer .survey-wrapper > h3.section-group-header').should('contain', 'Bill Payer').find('i').should('have.attr', 'class', 'fa fa-money')
        .get('input[name="isAdditional"]').should('have.attr', 'value', 'true')
        .next().click().findDataTag('name1').should('not.exist')
        .findDataTag('isAdditional').find('label[for="isAdditional"] > .switch-div').click().findDataTag('name1').should('exist')
        .wrap(fields).each(({ name, label }) => cy.checkLabel(name, label).checkText(name))
    )
  );
});
