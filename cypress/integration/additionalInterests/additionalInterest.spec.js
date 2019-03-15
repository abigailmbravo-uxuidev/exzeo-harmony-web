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
import { ai1Fields, ai2Fields } from './additionalInterestInputs';


describe('Additional Interest Testing', () => {
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

  const ai1Required = ai1Fields.filter(({ required }) => required !== false);
  const ai2Required = ai2Fields.filter(({ required }) => required !== false);

  it('NEG:All Additional Interest 1 Inputs Empty Value', () =>
    goBack().then(() => {
      toggleModalOn();
      cy.clearAllText(ai1Fields).submitAndCheckValidation(ai1Required);
    })
  );

  it('NEG:Additional Interest 1 Empty Value', () =>
    goBack().then(() => {
      toggleModalOn();
      cy.clearAllText(ai1Fields)
        .wrap(ai1Required).each(fieldToLeaveBlank => cy.verifyForm(ai1Required, [fieldToLeaveBlank], ai1));
    })
  );

  it('NEG:Additional Interest 1 Invalid Input Value', () =>
    goBack().then(() => {
      const state = ai1Fields.find(({ name }) => name === 'ai1State');
      const zip = ai1Fields.find(({ name }) => name === 'ai1Zip');
      toggleModalOn();
      cy.clearAllText(ai1Fields)
        .verifyForm([{ ...state, error: 'Only 2 letters allowed' }], undefined, { ai1State: 'foo' })
        .verifyForm([{ ...zip, error: 'Only 8 letters or numbers allowed' }], undefined, { ai1Zip: '123456789' });
    })
  );

  it('NEG:All Additional Interest 2 Inputs Empty Value', () =>
    goBack().then(() => {
      toggleModalOn();
      addAdditional();
      cy.clearAllText(ai2Fields).submitAndCheckValidation(ai2Required);
    })
  );

  it('NEG:Additional Interest 2 Empty Value', () =>
    goBack().then(() => {
      toggleModalOn();
      addAdditional();
      cy.clearAllText(ai2Fields)
        .wrap(ai2Required).each(fieldToLeaveBlank => cy.verifyForm(ai2Required, [fieldToLeaveBlank], ai2));
    })
  );

  it('NEG:Additional Interest 2 Invalid Input Value', () =>
    goBack().then(() => {
      const state = ai2Fields.find(({ name }) => name === 'ai2State');
      const zip = ai2Fields.find(({ name }) => name === 'ai2Zip');
      toggleModalOn();
      addAdditional();
      cy.clearAllText(ai2Fields)
        .verifyForm([{ ...state, error: 'Only 2 letters allowed' }], undefined, { ai2State: 'foo' })
        .verifyForm([{ ...zip, error: 'Only 8 letters or numbers allowed' }], undefined, { ai2Zip: '123456789' });
    })
  );

  it('POS:Additonal Interest', () =>
    goBack().then(() =>
      cy.findDataTag('ai-add').should('have.attr', 'class', 'btn btn-secondary').click()
        .get('#AdditionalInterest .survey-wrapper > h3.section-group-header').should('contain', 'Additional Interest').find('i').should('have.attr', 'class', 'fa fa-handshake-o')
        .findDataTag('isAdditional').find('label').should('contain', 'Do you want to add an Additional Interest?')
        .find('input[name="isAdditional"]').should('have.attr', 'value', 'true')
        .next().click().findDataTag('ai1Name1').should('not.exist')
        .findDataTag('isAdditional').find('label[for="isAdditional"] > .switch-div').click().findDataTag('ai1Name1').should('exist')
        .wrap(ai1Fields).each(({ name, label }) => cy.checkLabel(name, label).checkText(name))
    )
  );
});
