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
import { fields } from './basicInputs';


describe('Premium Finance Testing', () => {
  const toggleModalOn = () => cy.findDataTag('premium-finance-add').click();

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
    cy.route('POST', '/cg/complete?addAdditionalAIs', 'fx:stubs/addAdditionalAIs/premiumFinance');
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
      cy.wrap(requiredFields).each(fieldToLeaveBlank => cy.verifyForm(requiredFields, [fieldToLeaveBlank], user));
    })
  );

  it('NEG:Premium Finance Invalid Input Value', () =>
    goBack().then(() => {
      toggleModalOn();
      const state = fields.find(({ name }) => name === 'state');
      const zip = fields.find(({ name }) => name === 'zip');
      cy.clearAllText(fields)
        .verifyForm([{ ...state, error: 'Only 2 letters allowed' }], undefined, { state: 'foo' })
        .verifyForm([{ ...zip, error: 'Only 8 letters or numbers allowed' }], undefined, { zip: '123456789' });
    })
  );

  it('POS:Premium Finance', () =>
    goBack().then(() =>
      cy.findDataTag('premium-finance-add').should('have.attr', 'class', 'btn btn-secondary').click()
        .get('#PremiumFinance .survey-wrapper > h3.section-group-header').should('contain', 'Premium Finance').find('i').should('have.attr', 'class', 'fa fa-money')
        .findDataTag('isAdditional').find('label').should('contain', 'Do you want to add a Premium Finance?')
        .find('input[name="isAdditional"]').should('have.attr', 'value', 'true')
        .next().click().findDataTag('name1').should('not.exist')
        .findDataTag('isAdditional').find('label[for="isAdditional"] > .switch-div').click().findDataTag('name1').should('exist')
        .checkLabel('premiumFinance', 'Top Premium Finance')

        .wrap(fields).each(({ name, label }) => cy.checkLabel(name, label).checkText(name))

        .findDataTag('premiumFinance').find('.Select-control .Select-placeholder').should('contain', 'Select...')
        .chooseSelectOption('premiumFinance').findDataTag('premiumFinance').find('.Select-multi-value-wrapper .Select-value-label').should('exist')
        .resetSelectOption('premiumFinance')
    )
  );
});
