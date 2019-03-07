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

  it('NEG:All Premium Finance Inputs Empty Value', () =>
    goBack().then(() => {
      toggleModalOn();
      cy.clearAllText(fields).submitAndCheckValidation(fields);
    })
  );

  it('NEG:Premium Finance Empty Value', () =>
    goBack().then(() => {
      toggleModalOn();
      cy.clearAllText(fields)
        .verifyForm(fields, ['name1'], user)
        .verifyForm(fields, ['mailingAddress1'], user)
        .verifyForm(fields, ['city'], user)
        .verifyForm(fields, ['state'], user)
        .verifyForm(fields, ['zip'], user);
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

  it('POS:Premium Finance', () =>
    goBack().then(() => {
      const pfLabelText = [
        ['premiumFinance', 'Top Premium Finance'],
        ['name1', 'Name 1'],
        ['name2', 'Name 2'],
        ['mailingAddress1', 'Mailing Address 1'],
        ['mailingAddress2', 'Mailing Address 2'],
        ['city', 'City'],
        ['state', 'State'],
        ['zip', 'Zip'],
        ['referenceNumber', 'Reference Number']
      ];

      cy.findDataTag('premium-finance-add').should('have.attr', 'class', 'btn btn-secondary').click()
        .get('#PremiumFinance .survey-wrapper > h3.section-group-header').should('contain', 'Premium Finance').find('i').should('have.attr', 'class', 'fa fa-money')
        .findDataTag('isAdditional').find('label').should('contain', 'Do you want to add a Premium Finance?')
        .find('input[name="isAdditional"]').should('have.attr', 'value', 'true')
        .next().click().findDataTag('name1').should('not.exist')
        .findDataTag('isAdditional').find('label[for="isAdditional"] > .switch-div').click().findDataTag('name1').should('exist');

      pfLabelText.forEach(([tag, text]) => cy.checkLabel(tag, text));

      cy.findDataTag('premiumFinance').find('.Select-control .Select-placeholder').should('contain', 'Select...')
        .chooseSelectOption('premiumFinance').findDataTag('premiumFinance').find('.Select-multi-value-wrapper .Select-value-label').should('exist')
        .resetSelectOption('premiumFinance');

      pfLabelText.filter(([tag]) => tag !== 'premiumFinance').forEach(([tag]) => cy.checkText(tag));
    })
  );
});
