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
import m1data from '../../fixtures/stockData/mortgagee1.json';
import m2data from '../../fixtures/stockData/mortgagee2.json';
import m3data from '../../fixtures/stockData/mortgagee3.json';
import {m1Fields, m2Fields, m3Fields } from './mortgageeFields';

describe('Mortgagee Testing', () => {
  const toggleModalOn = () => cy.findDataTag('mortgagee-add').click();
  const addUser = val => cy.findDataTag(`isAdditional${val}`).find('.switch-div').click();

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
    cy.route('POST', '/cg/complete?addAdditionalAIs', 'fx:stubs/addAdditionalAIs/mortgagee');
  });

  const m1Required = m1Fields.filter(({ required }) => required !== false);
  const m2Required = m2Fields.filter(({ required }) => required !== false);
  const m3Required = m3Fields.filter(({ required }) => required !== false);

  it('NEG:All Mortgagee 1 Empty Value', () =>
    goBack().then(() => {
      toggleModalOn();
      cy.clearAllText(m1Fields).submitAndCheckValidation(m1Required);
    })
  );

  it('NEG:Mortgagee 1 Empty Value', () =>
    goBack().then(() => {
      toggleModalOn();
      cy.clearAllText(m1Fields)
        .wrap(m1Required).each(fieldToLeaveBlank => cy.verifyForm(m1Required, [fieldToLeaveBlank], m1data));
    })
  );

  it('NEG:Mortgagee 1 Invalid Input Value', () =>
    goBack().then(() => {
      const m1State = m1Fields.find(({ name }) => name === 'm1State');
      const m1Zip = m1Fields.find(({ name }) => name === 'm1Zip');

      toggleModalOn();
      cy.clearAllText(m1Fields)
        .verifyForm([{ ...m1State, error: 'Only 2 letters allowed'}], undefined, { m1State: 'foo' })
        .verifyForm([{ ...m1Zip, error: 'Only 8 letters or numbers allowed'}], undefined, { m1Zip: '123456789' })
    })
  );

  it('NEG:All Mortgagee 2 Empty Input Value', () =>
    goBack().then(() => {
      toggleModalOn();
      addUser(2);
      cy.clearAllText(m2Fields).submitAndCheckValidation(m2Required);
    })
  );

  it('NEG:Mortgagee 2 Empty Value', () =>
    goBack().then(() => {
      toggleModalOn();
      addUser(2);
      cy.clearAllText(m2Fields)
        .wrap(m2Required).each(fieldToLeaveBlank => cy.verifyForm(m2Required, [fieldToLeaveBlank], m2data));
    })
  );

  it('NEG:Mortgagee 2 Invalid Input', () =>
    goBack().then(() => {
      const m2State = m2Fields.find(({ name }) => name === 'm2State');
      const m2Zip = m2Fields.find(({ name }) => name === 'm2Zip');

      toggleModalOn();
      addUser(2);
      cy.clearAllText(m2Fields)
        .verifyForm([{ ...m2State, error: 'Only 2 letters allowed' }], undefined, { m2State: 'foo' })
        .verifyForm([{ ...m2Zip, error: 'Only 8 letters or numbers allowed' }], undefined, { m2Zip: '123456789' })
    })
  );

  it('NEG:All Mortgagee 3 Empty Input Value', () =>
    goBack().then(() => {
      toggleModalOn();
      addUser(2);
      addUser(3);

      cy.clearAllText(m3Fields).submitAndCheckValidation(m3Required);
    })
  );

  it('NEG:Mortgagee 3 Empty Value', () =>
    goBack().then(() => {
      toggleModalOn();
      addUser(2);
      addUser(3);
      cy.clearAllText(m3Fields)
        .wrap(m3Required).each(fieldToLeaveBlank => cy.verifyForm(m3Required, [fieldToLeaveBlank], m3data));
    })
  );

  it('NEG:Mortgagee 3 Invalid Input Value', () =>
    goBack().then(() => {
      const m3State = m3Fields.find(({ name }) => name === 'm3State');
      const m3Zip = m3Fields.find(({ name }) => name === 'm3Zip');

      toggleModalOn();
      addUser(2);
      addUser(3);

      cy.clearAllText(m3Fields)
        .verifyForm([{ ...m3State, error: 'Only 2 letters allowed' }], undefined, { m3State: 'foo' })
        .verifyForm([{ ...m3Zip, error: 'Only 8 letters or numbers allowed' }], undefined, { m3Zip: '123456789' })
    })
  );

  it('POS:Add Mortgagee', () =>
    goBack().then(() =>
      // Mortgagee 1 Testing
      cy.findDataTag('mortgagee-add').should('have.attr', 'class', 'btn btn-secondary').click()
        .get('#Mortgagee .survey-wrapper > h3.section-group-header').should('contain', 'Mortgagee').find('i').should('have.attr', 'class', 'fa fa-bank')
        .findDataTag('isAdditional').find('label').should('contain', 'Do you want to add a Mortgagee?')
        .find('input[name="isAdditional"]').should('have.attr', 'value', 'true')
        .next().click().findDataTag('m1Name1').should('not.exist')
        .findDataTag('isAdditional').find('label[for="isAdditional"] > .switch-div').click().findDataTag('m1Name1').should('exist')
        .checkLabel('mortgage', 'Top Mortgagees (Mortgagee 1)')

        // Check the dropdown placeholder
        .findDataTag('mortgage').find('.Select-control .Select-placeholder').should('contain', 'Select...')
        // Select the first select option and confirm it is put in
        .chooseSelectOption('mortgage').findDataTag('mortgage').find('.Select-multi-value-wrapper .Select-value-label').should('exist')
        // Clear the dropdown and check the placeholder again
        .resetSelectOption('mortgage')
        // Check all inputs except mortgagee dropdown with text and check labels
        .wrap(m1Fields).each(({ name, label }) => cy.checkLabel(name, label).checkText(name))

      // Mortgagee 2 Testing
        .findDataTag('isAdditional2').find('label').should('contain', 'Do you want to add second Mortgagee?')
        .find('input[name="isAdditional2"]').should('have.attr', 'value', '')
        .next().click().findDataTag('m2Name1').should('exist')
        .findDataTag('isAdditional2').find('label[for="isAdditional2"] > .switch-div').click().findDataTag('m2Name1').should('not.exist')
        .findDataTag('isAdditional2').find('label[for="isAdditional2"] > .switch-div').click().findDataTag('m2Name1').should('exist')
        .checkLabel('mortgage2', 'Top Mortgagees (Mortgagee 2)')
        .findDataTag('mortgage2').find('.Select-control .Select-placeholder').should('contain', 'Select...')
        .chooseSelectOption('mortgage2').findDataTag('mortgage2').find('.Select-multi-value-wrapper .Select-value-label').should('exist')
        .resetSelectOption('mortgage2')
        .wrap(m2Fields).each(({ name, label }) => cy.checkLabel(name, label).checkText(name))

      // Mortgagee 3 Testing
        .findDataTag('isAdditional3').find('label').should('contain', 'Do you want to add third Mortgagee?')
        .find('input[name="isAdditional3"]').should('have.attr', 'value', '')
        .next().click().findDataTag('m3Name1').should('exist')
        .findDataTag('isAdditional3').find('label[for="isAdditional3"] > .switch-div').click().findDataTag('m3Name1').should('not.exist')
        .findDataTag('isAdditional3').find('label[for="isAdditional3"] > .switch-div').click().findDataTag('m3Name1').should('exist')
        .checkLabel('mortgage2', 'Top Mortgagees (Mortgagee 2)')
        .findDataTag('mortgage3').find('.Select-control .Select-placeholder').should('contain', 'Select...')
        .chooseSelectOption('mortgage3').findDataTag('mortgage3').find('.Select-multi-value-wrapper .Select-value-label').should('exist')
        .resetSelectOption('mortgage3')
        .wrap(m3Fields).each(({ name, label }) => cy.checkLabel(name, label).checkText(name))
    )
  );
});
