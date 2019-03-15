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
import ains1 from '../../fixtures/stockData/ains1.json';
import ains2 from '../../fixtures/stockData/ains2.json';

describe('Additional Insured Testing', () => {
  const ains1fields = ['ains1Name1', 'ains1MailingAddress1', 'ains1City', 'ains1State', 'ains1Zip'];
  const ains2fields = ['ains2Name1', 'ains2MailingAddress1', 'ains2City', 'ains2State', 'ains2Zip'];
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

  it('NEG:All Additional Insure 1 Inputs Empty Value', () =>
    goBack().then(() => {
      toggleModalOn();
      cy.clearAllText(ains1fields).submitAndCheckValidation(ains1fields);
    })
  );

  it('NEG:Additional Insured 1 Empty Value', () =>
    goBack().then(() => {
      toggleModalOn();
      cy.clearAllText(ains1fields);

      ains1fields.forEach(leaveBlank => cy.verifyForm(ains1fields, [leaveBlank], ains1));
    })
  );

  it('NEG:Additional Insured 1 Invalid Input Value', () =>
    goBack().then(() => {
      toggleModalOn();
      cy.clearAllText(ains1fields)
        .verifyForm(['ains1State'], undefined, { ains1State: 'foo' }, { errors: ['Only 2 letters allowed'] })
        .verifyForm(['ains1Zip'], undefined, { ains1Zip: '123456789' }, { errors: ['Only 8 letters or numbers allowed'] });
    })
  );

  it('NEG:All Additional Insure 2 Inputs Empty Value', () =>
    goBack().then(() => {
      toggleModalOn();
      addAdditional();
      cy.clearAllText(ains2fields)
        .submitAndCheckValidation(ains2fields);
    })
  );

  it('NEG:Additional Insured 2 Empty Value', () =>
    goBack().then(() => {
      toggleModalOn();
      addAdditional();
      cy.clearAllText([...ains1fields, ...ains2fields]);

      ains1fields.forEach(leaveBlank => cy.verifyForm(ains2fields, [leaveBlank], ains2));
    })
  );

  it('NEG:Additional Insured 2 Invalid Input Value', () =>
    goBack().then(() => {
      toggleModalOn();
      addAdditional();
      cy.clearAllText([...ains1fields, ...ains2fields])
        .verifyForm(['ains2State'], undefined, { ains2State: 'foo' }, { errors: ['Only 2 letters allowed'] })
        .verifyForm(['ains2Zip'], undefined, { ains2Zip: '123456789' }, { errors: ['Only 8 letters or numbers allowed'] });
    })
  );

  it('POS:Additional Insured', () =>
    goBack().then(() => {
      const ains1LabelText = [
        ['ains1Name1', 'Name 1'],
        ['ains1Name2', 'Name 2'],
        ['ains1MailingAddress1', 'Mailing Address 1'],
        ['ains1MailingAddress2', 'Mailing Address 2'],
        ['ains1City', 'City'],
        ['ains1State', 'State'],
        ['ains1Zip', 'Zip'],
        ['ains1ReferenceNumber', 'Reference Number']
      ];

      const ains2LabelText = [
        ['ains2Name1', 'Name 1'],
        ['ains2Name2', 'Name 2'],
        ['ains2MailingAddress1', 'Mailing Address 1'],
        ['ains2MailingAddress2', 'Mailing Address 2'],
        ['ains2City', 'City'],
        ['ains2State', 'State'],
        ['ains2Zip', 'Zip'],
        ['ains2ReferenceNumber', 'Reference Number']
      ];

      //AI 1 Testing
      cy.findDataTag('ains-add').should('have.attr', 'class', 'btn btn-secondary').click()
        .get('#AdditionalInsured .survey-wrapper > h3.section-group-header').should('contain', 'Additional Insured').find('i').should('have.attr', 'class', 'fa fa-user-plus')
        .findDataTag('isAdditional').find('label').should('contain', 'Do you want to add an Additional Insured?')
        .find('input[name="isAdditional"]').should('have.attr', 'value', 'true')
        .next().click().findDataTag('ains1Name1').should('not.exist')
        .findDataTag('isAdditional').find('label[for="isAdditional"] > .switch-div').click().findDataTag('ains1Name1').should('exist');

      ains1LabelText.forEach(([tag, text]) => cy.checkLabel(tag, text));
      ains1LabelText.forEach(([tag]) => cy.checkText(tag));

      // AI2 Testing
      cy.findDataTag('isAdditional2').find('label').should('contain', 'Do you want to add second Additional Insured?')
        .find('input[name="isAdditional2"]').should('have.attr', 'value', '')
        .next().click().findDataTag('ains2Name1').should('exist')
        .findDataTag('isAdditional2').find('label[for="isAdditional2"] > .switch-div').click().findDataTag('ains2Name1').should('not.exist')
        .findDataTag('isAdditional2').find('label[for="isAdditional2"] > .switch-div').click().findDataTag('ains2Name1').should('exist');

      ains2LabelText.forEach(([tag, text]) => cy.checkLabel(tag, text));
      ains2LabelText.forEach(([tag]) => cy.checkText(tag));
    })
  );
});
