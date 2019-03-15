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
import ai1 from '../../fixtures/stockData/ai1.json';
import ai2 from '../../fixtures/stockData/ai2.json';


describe('Additional Interest Testing', () => {
  const ai1fields = ['ai1Name1', 'ai1MailingAddress1', 'ai1City', 'ai1State', 'ai1Zip'];
  const ai2fields = ['ai2Name1', 'ai2MailingAddress1', 'ai2City', 'ai2State', 'ai2Zip'];
  const toggleModalOn = () => cy.findDataTag('ai-add').click();
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
    cy.route('POST', '/cg/complete?addAdditionalAIs', 'fx:stubs/addAdditionalAIs/additionalInterest');
  });

  it('NEG:All Additional Interest 1 Inputs Empty Value', () =>
    goBack().then(() => {
      toggleModalOn();
      cy.clearAllText(ai1fields);

      cy.submitAndCheckValidation(ai1fields);
    })
  );

  it('NEG:Additional Interest 1 Empty Value', () =>
    goBack().then(() => {
      toggleModalOn();
      cy.clearAllText(ai1fields);

      ai1fields.forEach(leaveBlank => cy.verifyForm(ai1fields, [leaveBlank], ai1));
    })
  );

  it('NEG:Additional Interest 1 Invalid Input Value', () =>
    goBack().then(() => {
      toggleModalOn();
      cy.clearAllText(ai1fields)
        .verifyForm(['ai1State'], undefined, { ai1State: 'foo' }, { errors: ['Only 2 letters allowed'] })
        .verifyForm(['ai1Zip'], undefined, { ai1Zip: '123456789' }, { errors: ['Only 8 letters or numbers allowed'] });
    })
  );

  it('NEG:All Additional Interest 2 Inputs Empty Value', () =>
    goBack().then(() => {
      toggleModalOn();
      addAdditional();
      cy.clearAllText(ai2fields)
        .submitAndCheckValidation(ai2fields);
    })
  );

  it('NEG:Additional Interest 2 Empty Value', () =>
    goBack().then(() => {
      toggleModalOn();
      addAdditional();
      cy.clearAllText(ai2fields);

      ai2fields.forEach(leaveBlank => cy.verifyForm(ai2fields, [leaveBlank], ai2));
    })
  );

  it('NEG:Additional Interest 2 Invalid Input Value', () =>
    goBack().then(() => {
      toggleModalOn();
      addAdditional();
      cy.clearAllText(ai2fields)
        .verifyForm(['ai2State'], undefined, { ai2State: 'foo' }, { errors: ['Only 2 letters allowed'] })
        .verifyForm(['ai2Zip'], undefined, { ai2Zip: '123456789' }, { errors: ['Only 8 letters or numbers allowed'] });
    })
  );

  it('POS:Additonal Interest', () =>
    goBack().then(() => {
      const ai1LabelText = [
        ['ai1Name1', 'Name 1'],
        ['ai1Name2', 'Name 2'],
        ['ai1MailingAddress1', 'Mailing Address 1'],
        ['ai1MailingAddress2', 'Mailing Address 2'],
        ['ai1City', 'City'],
        ['ai1State', 'State'],
        ['ai1Zip', 'Zip'],
        ['ai1ReferenceNumber', 'Reference Number']
      ];

      cy.findDataTag('ai-add').should('have.attr', 'class', 'btn btn-secondary').click()
        .get('#AdditionalInterest .survey-wrapper > h3.section-group-header').should('contain', 'Additional Interest').find('i').should('have.attr', 'class', 'fa fa-handshake-o')
        .findDataTag('isAdditional').find('label').should('contain', 'Do you want to add an Additional Interest?')
        .find('input[name="isAdditional"]').should('have.attr', 'value', 'true')
        .next().click().findDataTag('ai1Name1').should('not.exist')
        .findDataTag('isAdditional').find('label[for="isAdditional"] > .switch-div').click().findDataTag('ai1Name1').should('exist');

      ai1LabelText.forEach(([tag, text]) => cy.checkLabel(tag, text));
      ai1LabelText.forEach(([tag]) => cy.checkText(tag));


    })
  );
});