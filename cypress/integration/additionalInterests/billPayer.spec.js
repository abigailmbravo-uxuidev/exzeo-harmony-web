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

describe('Premium Finance Testing', () => {
  const fields = ['name1', 'mailingAddress1', 'city', 'state', 'zip'];
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

  it('NEG:All Premium Finance Inputs Empty Value', () =>
    goBack().then(() => {
      toggleModalOn();
      cy.clearAllText(fields)
        .submitAndCheckValidation(fields);
    })
  );

  it('NEG:Premium Finance Empty Value', () =>
    goBack().then(() => {
      toggleModalOn();
      cy.clearAllText(fields);

      fields.forEach(leaveBlank => cy.verifyForm(fields, [leaveBlank], user));
    })
  );

  it('NEG:Premium Finance Invalid Input Value', () =>
    goBack().then(() => {
      toggleModalOn();
      cy.clearAllText(fields)
        .verifyForm(['state'], undefined, { state: 'foo' }, { errors: ['Only 2 letters allowed'] })
        .verifyForm(['zip'], undefined, { zip: '123456789' }, { errors: ['Only 8 letters or numbers allowed'] });
    })
  );

  it('POS:Bill Payer', () =>
    goBack().then(() => {
      const bpLabelText = [
        ['name1', 'Name 1'],
        ['name2', 'Name 2'],
        ['mailingAddress1', 'Mailing Address 1'],
        ['mailingAddress2', 'Mailing Address 2'],
        ['city', 'City'],
        ['state', 'State'],
        ['zip', 'Zip'],
        ['referenceNumber', 'Reference Number']
      ];

      cy.findDataTag('bill-payer-add').should('have.attr', 'class', 'btn btn-secondary').click()
        .get('#BillPayer .survey-wrapper > h3.section-group-header').should('contain', 'Bill Payer').find('i').should('have.attr', 'class', 'fa fa-money')
        .find('input[name="isAdditional"]').should('have.attr', 'value', 'true')
        .next().click().findDataTag('name1').should('not.exist')
        .findDataTag('isAdditional').find('label[for="isAdditional"] > .switch-div').click().findDataTag('name1').should('exist');;

      bpLabelText.forEach(([tag, text]) => cy.checkLabel(tag, text));
      bpLabelText.forEach(([tag]) => cy.checkText(tag));
    })
  );
});
