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
import { ains1Fields, ains2Fields } from './additionalInsuredInputs';

describe('Additional Insured Testing', () => {
  const toggleModalOn = () => cy.findDataTag('ains-add').click();
  const addAdditional = () => cy.findDataTag('isAdditional2').find('.switch-div').click();

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
    cy.route('POST', '/cg/complete?addAdditionalAIs', 'fx:stubs/addAdditionalAIs/additionalInsured');
  });

  const ains1Required = ains1Fields.filter(({ required }) => required !== false);
  const ains2Required = ains2Fields.filter(({ required }) => required !== false);

  it('NEG:All Additional Insure 1 Inputs Empty Value', () =>
    goBack().then(() => {
      toggleModalOn();
      cy.clearAllText(ains1Fields).submitAndCheckValidation(ains1Required);
    })
  );

  it('NEG:Additional Insured 1 Empty Value', () =>
    goBack().then(() => {
      toggleModalOn();
      cy.clearAllText(ains1Fields)
        .wrap(ains1Required).each(fieldToLeaveBlank => cy.verifyForm(ains1Required, [fieldToLeaveBlank]));
    })
  );

  it('NEG:Additional Insured 1 Invalid Input Value', () =>
    goBack().then(() => {
      const state = ains1Fields.find(({ name }) => name === 'ains1State');
      const zip = ains1Fields.find(({ name }) => name === 'ains1Zip');

      toggleModalOn();
      cy.clearAllText(ains1Fields)
        .verifyForm([{ ...state, error: 'Only 2 letters allowed', data: 'foo' }])
        .verifyForm([{ ...zip, error: 'Only 8 letters or numbers allowed', data: '1234567890' }]);
    })
  );

  it('NEG:All Additional Insure 2 Inputs Empty Value', () =>
    goBack().then(() => {
      toggleModalOn();
      addAdditional();
      cy.clearAllText(ains2Fields).submitAndCheckValidation(ains2Required);
    })
  );

  it('NEG:Additional Insured 2 Empty Value', () =>
    goBack().then(() => {
      toggleModalOn();
      addAdditional();
      cy.clearAllText([...ains1Fields, ...ains2Fields])
        .wrap(ains1Required).each(fieldToLeaveBlank => cy.verifyForm(ains2Required, [fieldToLeaveBlank]));
    })
  );

  it('NEG:Additional Insured 2 Invalid Input Value', () =>
    goBack().then(() => {
      const state = ains2Fields.find(({ name }) => name === 'ains2State');
      const zip = ains2Fields.find(({ name }) => name === 'ains2Zip');

      toggleModalOn();
      addAdditional();
      cy.clearAllText([...ains1Fields, ...ains2Fields])
        .verifyForm([{ ...state, error: 'Only 2 letters allowed', data: 'foo' }])
        .verifyForm([{ ...zip, error: 'Only 8 letters or numbers allowed', data: '1234567890' }]);
    })
  );

  it('POS:Additional Insured', () =>
    goBack().then(() =>
      //AI 1 Testing
      cy.findDataTag('ains-add').should('have.attr', 'class', 'btn btn-secondary').click()
        .get('#AdditionalInsured .survey-wrapper > h3.section-group-header').should('contain', 'Additional Insured').find('i').should('have.attr', 'class', 'fa fa-user-plus')
        .findDataTag('isAdditional').find('label').should('contain', 'Do you want to add an Additional Insured?')
        .find('input[name="isAdditional"]').should('have.attr', 'value', 'true')
        .next().click().findDataTag('ains1Name1').should('not.exist')
        .findDataTag('isAdditional').find('label[for="isAdditional"] > .switch-div').click().findDataTag('ains1Name1').should('exist')
        .wrap(ains1Fields).each(({ name, label }) => cy.checkLabel(name, label).checkText(name))

      // AI2 Testing
        .findDataTag('isAdditional2').find('label').should('contain', 'Do you want to add second Additional Insured?')
        .find('input[name="isAdditional2"]').should('have.attr', 'value', '')
        .next().click().findDataTag('ains2Name1').should('exist')
        .findDataTag('isAdditional2').find('label[for="isAdditional2"] > .switch-div').click().findDataTag('ains2Name1').should('not.exist')
        .findDataTag('isAdditional2').find('label[for="isAdditional2"] > .switch-div').click().findDataTag('ains2Name1').should('exist')
        .wrap(ains2Fields).each(({ name, label }) => cy.checkLabel(name, label).checkText(name))
    )
  );
});
