import stubAllRoutes from "../../support/stubAllRoutes";
import {
  navigateThroughLanding,
  navigateThroughSearchAddress,
  navigateThroughPolicyholder,
  navigateThroughUnderwriting,
  navigateThroughCustomize,
  navigateThroughShare
} from '../../helpers';
import user from '../../fixtures/stockData/user.json';

describe('Share Testing', () => {
  const sections = ['share-section-one', 'share-section-two', 'share-section-three'];

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
    navigateThroughPolicyholder();
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

  it('POS:Share Workflow', () =>
    cy.checkWorkflowSection('tab-nav-askAdditionalCustomerData', 'selected')
      .checkWorkflowSection('tab-nav-askUWAnswers', 'selected')
      .checkWorkflowSection('tab-nav-askToCustomizeDefaultQuote', 'selected')
      .checkWorkflowSection('tab-nav-sendEmailOrContinue', 'active')
      .checkWorkflowSection('tab-nav-addAdditionalAIs')
      .checkWorkflowSection('tab-nav-askAdditionalQuestions')
      .checkWorkflowSection('tab-nav-editVerify')
  );

  it('POS:Share Header Text', () =>
    sections.forEach(tag => cy.findDataTag(tag).find('h3').should('exist').find('i.fa').should('exist'))
  );

  it('POS:Share Text', () =>
    sections.forEach(tag => cy.findDataTag(tag).find('p').should('contain', 'quote'))
  );

  it('POS:Share Button', () =>
    cy.reload().findDataTag('share').should('exist').and('contain', 'share')
      .click().then(() =>
        cy.get('.card.card-email #SendEmail').should('exist')
          .findDataTag('cancel').should('exist').click().then(() =>
            cy.get('.card.card-email').should('not.exist')
              .findDataTag('share').click().then(() =>
                cy.get('.card.card-email #SendEmail').should('exist')
              )
          )
      )
  );

  it('POS:Share Modal', () =>
    cy.reload().findDataTag('share').click().then(() =>
      cy.checkLabel('name', 'Name')
        .checkLabel('emailAddr', 'Email Address')
        .checkText('name', 'John Doe')
        .checkText('emailAddr', 'John.Doe@gmail.com')
        .get('#SendEmail').find('[data-test="submit"]')
    )
  );

  it('POS:Next Button', () =>
    cy.reload().findDataTag('submit').should('exist').and('have.attr', 'type', 'submit')
  );

  it('POS:Share Page 2', () => {
    navigateThroughShare();
    cy.findDataTag('assumptions').find('form .scroll .form-group.survey-wrapper').children().first().should('contain', 'All properties will be inspected')
      .next().should('contain', 'Please be aware')
      .findDataTag('confirmAssumptions').find('label').should('contain', 'Confirmed')
      .find('input[name="confirmAssumptions"]').should('have.attr', 'value', '')
      .get('.switch-div').click().get('input[name="confirmAssumptions"]').should('have.attr', 'value', 'true')
      .get('.switch-div').click().get('input[name="confirmAssumptions"]').should('have.attr', 'value', 'false')
      .findDataTag('submit').should('be.disabled')
      .get('.switch-div').click().findDataTag('submit').should('not.be.disabled')
      .checkSubmitButton();
  });
});
