import stubAllRoutes from "../../support/stubAllRoutes";
import {
  navigateThroughLanding,
  navigateThroughSearchAddress,
  navigateThroughCustomerInfo,
  navigateThroughUnderwriting,
  navigateThroughCustomize
} from '../../helpers';
import user from '../../fixtures/stockData/user.json';

describe('Share Testing', () => {
  const toggleModal = (dir = 'on') => {
    cy.get('div.route-content').then($wrap => {
      if ($wrap.find('.modal.active').length && dir === 'off') {
        cy.findDataTag('cancel').click();
      } else if (dir === 'on') {
        cy.findDataTag('share').click();
      }
    });
  };

  before('Navigate to Share page', () => {
    stubAllRoutes();
    cy.login();
    navigateThroughLanding();
    navigateThroughSearchAddress();
    navigateThroughCustomerInfo();
    navigateThroughUnderwriting();
    navigateThroughCustomize();
  });

  beforeEach('Reset page, establish fixutres', () => {
    stubAllRoutes();
    toggleModal('off');
  });

  it('"Confirmed" Value left at Default "No"', () => {
    cy.clickSubmit()
      .findDataTag('confirmAssumptions').find('input').should('have.value', '')
      .findDataTag('submit').should('be.disabled')
      .findDataTag('tab-nav-sendEmailOrContinue').click();
  });

  it('NEG:All Inputs Empty Value', () => {
    toggleModal();

    cy.submitAndCheckValidation(['name', 'emailAddr'], { errors: Array(2).fill('Field Required'), form: '#SendEmail', checkForSnackbar: false });
  });

  it('NEG:Input Empty Value', () => {
    const { EmailAddress, FirstName, LastName } = user.customerInfo;
    toggleModal();

    cy.verifyForm(['emailAddr'], ['name'], { emailAddr: EmailAddress }, { form: '#SendEmail', checkForSnackbar: false })
      .verifyForm(['name', 'emailAddr'], ['emailAddr'], { name: `${FirstName} ${LastName}` }, { errors: ['Field Required'], form: '#SendEmail', checkForSnackbar: false });
  });

  it('NEG:Input Invalid Character', () => {
    toggleModal();

    cy.verifyForm(['emailAddr'], undefined, { emailAddr: 'å∫∂®ƒ©˙ˆ∆¬µ˜øπœ®ß†¨√' }, { form: '#SendEmail', checkForSnackbar: false });
  });
});
