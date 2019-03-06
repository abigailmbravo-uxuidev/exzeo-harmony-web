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

describe('Mortgagee Testing', () => {
  const m1fields = ['m1Name1', 'm1MailingAddress1', 'm1City', 'm1State', 'm1Zip'];
  const m2fields = ['m2Name1', 'm2MailingAddress1', 'm2City', 'm2State', 'm2Zip'];
  const m3fields = ['m3Name1', 'm3MailingAddress1', 'm3City', 'm3State', 'm3Zip'];
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

  it('NEG:All Mortgagee 1 Empty Value', () =>
    goBack().then(() => {
      toggleModalOn();
      cy.clearAllText(m1fields)
        .submitAndCheckValidation(m1fields);
    })
  );

  it('NEG:Mortgagee 1 Empty Value', () =>
    goBack().then(() => {
      toggleModalOn();
      cy.clearAllText(m1fields);

      m1fields.forEach(leaveBlank => cy.verifyForm(m1fields, [leaveBlank], m1data));
    })
  );

  it('NEG:Mortgagee 1 Invalid Input Value', () =>
    goBack().then(() => {
      toggleModalOn();
      cy.clearAllText(m1fields)
        .verifyForm(['m1State'], undefined, { m1State: 'foo' }, { errors: ['Only 2 letters allowed'] })
        .verifyForm(['m1Zip'], undefined, { m1Zip: '123456789' }, { errors: ['Only 8 letters or numbers allowed'] });
    })
  );

  it('NEG:All Mortgagee 2 Empty Input Value', () =>
    goBack().then(() => {
      toggleModalOn();
      addUser(2);
      cy.clearAllText(m2fields)
        .submitAndCheckValidation(m2fields);
    })
  );

  it('NEG:Mortgagee 2 Empty Value', () =>
    goBack().then(() => {
      toggleModalOn();
      addUser(2);
      cy.clearAllText(m2fields);

      m2fields.forEach(leaveBlank => cy.verifyForm(m2fields, [leaveBlank], m2data));
    })
  );

  it('NEG:Mortgagee 2 Invalid Input', () =>
    goBack().then(() => {
      toggleModalOn();
      addUser(2);
      cy.clearAllText(m2fields)
        .verifyForm(['m2State'], undefined, { m2State: 'foo' }, { errors: ['Only 2 letters allowed'] })
        .verifyForm(['m2Zip'], undefined, { m2Zip: '123456789' }, { errors: ['Only 8 letters or numbers allowed'] });
    })
  );

  it('NEG:All Mortgagee 3 Empty Input Value', () =>
    goBack().then(() => {
      toggleModalOn();
      addUser(2);
      addUser(3);

      cy.clearAllText(m3fields).submitAndCheckValidation(m3fields);
    })
  );

  it('NEG:Mortgagee 3 Empty Value', () =>
    goBack().then(() => {
      toggleModalOn();
      addUser(2);
      addUser(3);
      cy.clearAllText(m3fields);

      m3fields.forEach(leaveBlank => cy.verifyForm(m3fields, [leaveBlank], m3data));
    })
  );

  it('NEG:Mortgagee 3 Invalid Input Value', () =>
    goBack().then(() => {
      toggleModalOn();
      addUser(2);
      addUser(3);

      cy.clearAllText(m3fields)
        .verifyForm(['m3State'], undefined, { m3State: 'foo' }, { errors: ['Only 2 letters allowed'] })
        .verifyForm(['m3Zip'], undefined, { m3Zip: '123456789' }, { errors: ['Only 8 letters or numbers allowed'] });
    })
  );

  it('POS:Add Mortgagee', () =>
    goBack().then(() => {
      const m1LabelText = [
        ['mortgage', 'Top Mortgagees (Mortgagee 1)'],
        ['m1Name1', 'Name 1'],
        ['m1Name2', 'Name 2'],
        ['m1MailingAddress1', 'Mailing Address 1'],
        ['m1MailingAddress2', 'Mailing Address 2'],
        ['m1City', 'City'],
        ['m1State', 'State'],
        ['m1Zip', 'Zip'],
        ['m1ReferenceNumber', 'Reference Number']
      ];

      const m2LabelText = [
        ['mortgage2', 'Top Mortgagees (Mortgagee 2)'],
        ['m2Name1', 'Name 1'],
        ['m2Name2', 'Name 2'],
        ['m2MailingAddress1', 'Mailing Address 1'],
        ['m2MailingAddress2', 'Mailing Address 2'],
        ['m2City', 'City'],
        ['m2State', 'State'],
        ['m2Zip', 'Zip'],
        ['m2ReferenceNumber', 'Reference Number']
      ];

      const m3LabelText = [
        ['mortgage3', 'Top Mortgagees (Mortgagee 3)'],
        ['m3Name1', 'Name 1'],
        ['m3Name2', 'Name 2'],
        ['m3MailingAddress1', 'Mailing Address 1'],
        ['m3MailingAddress2', 'Mailing Address 2'],
        ['m3City', 'City'],
        ['m3State', 'State'],
        ['m3Zip', 'Zip'],
        ['m3ReferenceNumber', 'Reference Number']
      ];

      // Mortgagee 1 Testing
      cy.findDataTag('mortgagee-add').should('have.attr', 'class', 'btn btn-secondary').click()
        .get('#Mortgagee .survey-wrapper > h3.section-group-header').should('contain', 'Mortgagee').find('i').should('have.attr', 'class', 'fa fa-bank')
        .findDataTag('isAdditional').find('label').should('contain', 'Do you want to add a Mortgagee?')
        .find('input[name="isAdditional"]').should('have.attr', 'value', 'true')
        .next().click().findDataTag('m1Name1').should('not.exist')
        .findDataTag('isAdditional').find('label[for="isAdditional"] > .switch-div').click().findDataTag('m1Name1').should('exist');

      m1LabelText.forEach(([tag, text]) => cy.checkLabel(tag, text));
      // Check the dropdown placeholder
      cy.findDataTag('mortgage').find('.Select-control .Select-placeholder').should('contain', 'Select...')
        // Select the first select option and confirm it is put in
        .chooseSelectOption('mortgage').findDataTag('mortgage').find('.Select-multi-value-wrapper .Select-value-label').should('exist')
        // Clear the dropdown and check the placeholder again
        .resetSelectOption('mortgage');
      // Check all inputs except mortgagee dropdown with text
      m1LabelText.filter(([tag]) => tag !== 'mortgage').forEach(([tag]) => cy.checkText(tag));

      // Mortgagee 2 Testing
      cy.findDataTag('isAdditional2').find('label').should('contain', 'Do you want to add second Mortgagee?')
        .find('input[name="isAdditional2"]').should('have.attr', 'value', '')
        .next().click().findDataTag('m2Name1').should('exist')
        .findDataTag('isAdditional2').find('label[for="isAdditional2"] > .switch-div').click().findDataTag('m2Name1').should('not.exist')
        .findDataTag('isAdditional2').find('label[for="isAdditional2"] > .switch-div').click().findDataTag('m2Name1').should('exist');

      m2LabelText.forEach(([tag, text]) => cy.checkLabel(tag, text));
      cy.findDataTag('mortgage2').find('.Select-control .Select-placeholder').should('contain', 'Select...')
        .chooseSelectOption('mortgage2').findDataTag('mortgage2').find('.Select-multi-value-wrapper .Select-value-label').should('exist')
        .resetSelectOption('mortgage2');
      m2LabelText.filter(([tag]) => tag !== 'mortgage2').forEach(([tag]) => cy.checkText(tag));

      // Mortgagee 3 Testing
      cy.findDataTag('isAdditional3').find('label').should('contain', 'Do you want to add third Mortgagee?')
        .find('input[name="isAdditional3"]').should('have.attr', 'value', '')
        .next().click().findDataTag('m3Name1').should('exist')
        .findDataTag('isAdditional3').find('label[for="isAdditional3"] > .switch-div').click().findDataTag('m3Name1').should('not.exist')
        .findDataTag('isAdditional3').find('label[for="isAdditional3"] > .switch-div').click().findDataTag('m3Name1').should('exist');

      m3LabelText.forEach(([tag, text]) => cy.checkLabel(tag, text));
      cy.findDataTag('mortgage3').find('.Select-control .Select-placeholder').should('contain', 'Select...')
        .chooseSelectOption('mortgage3').findDataTag('mortgage3').find('.Select-multi-value-wrapper .Select-value-label').should('exist')
        .resetSelectOption('mortgage3');
      m3LabelText.filter(([tag]) => tag !== 'mortgage3').forEach(([tag]) => cy.checkText(tag));
    })
  );
});
