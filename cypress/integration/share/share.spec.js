import routes from "../../support/routes";
import {
  navLanding,
  navSearchAddress,
  navCustomerInfo,
  navUnderwriting,
  navCustomize
} from '../../helpers';

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
    routes();
    cy.login();
    navLanding();
    navSearchAddress();
    navCustomerInfo();
    navUnderwriting();
    navCustomize();
  });

  beforeEach('Reset page, establish fixutres', () => {
    routes();
    cy.fixture('stockData/user').as('user');
    toggleModal('off');
  });

  it('"Confirmed" Value left at Default "No"', () => {
    cy.clickSubmit();
    cy.findDataTag('confirmAssumptions').find('input').should('have.value', '');
    cy.findDataTag('submit').should('be.disabled');
    cy.findDataTag('tab-nav-sendEmailOrContinue').click();
  });

  it('All Inputs Empty Value', () => {
    toggleModal();

    cy.submitAndCheckValidation(['name', 'emailAddr'], { errors: Array(2).fill('Field Required'), form: '#SendEmail', checkForSnackbar: false });
  });

  // it('Input Empty Value', function() {
  //   const { EmailAddress, FirstName, LastName } = this.user.customerInfo;
  //   toggleModal();

  //   cy.verifyForm(['emailAddr'], ['name'], { emailAddr: EmailAddress }, { form: '#SendEmail', checkForSnackbar: false });

  //   cy.verifyForm(['name', 'emailAddr'], ['emailAddr'], { name: `${FirstName} ${LastName}` }, { errors: ['Field Required'], form: '#SendEmail', checkForSnackbar: false });
  // });

  // it('Input Invalid Character', () => {
  //   toggleModal();

  //   cy.verifyForm(['emailAddr'], undefined, { emailAddr: 'å∫∂®ƒ©˙ˆ∆¬µ˜øπœ®ß†¨√' }, { form: '#SendEmail', checkForSnackbar: false });
  // });
});
