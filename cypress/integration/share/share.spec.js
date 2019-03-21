import stubAllRoutes from "../../support/stubAllRoutes";
import {
  navigateThroughLanding,
  navigateThroughSearchAddress,
  navigateThroughPolicyholder,
  navigateThroughUnderwriting,
  navigateThroughCustomize,
  navigateThroughShare
} from '../../helpers';
import { fields, workflowSections } from './shareFields';

describe('Share Testing', () => {
  const sections = ['section-1', 'section-2', 'section-3'];
  const submitOptions = { form: '#SendEmail', checkForSnackbar: false, button: 'modal-submit' };

  const toggleModal = (dir = 'on') => {
    cy.get('div.scroll.survey-wrapper').then($wrap => {
      if ($wrap.find('.modal.active').length && dir === 'off') {
        cy.findDataTag('modal-cancel').click();
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
      .findDataTag('confirm-assumptions').should('have.attr', 'data-value', 'false')
      .findDataTag('submit').should('be.disabled')
      .findDataTag('tab-nav-sendEmailOrContinue').click();
  });

  it('NEG:All Inputs Empty Value', () => {
    toggleModal();
    cy.submitAndCheckValidation(fields, submitOptions);
  });

  it('NEG:Input Empty Value', () => {
    toggleModal();

    cy.wrap(fields).each(fieldToLeaveBlank => cy.verifyForm(fields, [fieldToLeaveBlank], undefined, submitOptions));
  });

  it('NEG:Input Invalid Character', () => {
    toggleModal();
    const email = fields.find(({ name }) => name === 'emailAddr_wrapper');

    cy.verifyForm([{ ...email, error: 'Not a valid email address', data: 'å∫∂®ƒ©' }], undefined, undefined, submitOptions);
  });

  it('POS:Share Workflow', () =>
    cy.wrap(workflowSections).each(section => cy.checkWorkflowSection(section))
  );

  it('POS:Share Header / Text', () =>
    sections.forEach(tag => 
      cy.findDataTag(tag).find('div.title').should('exist').find('i.fa').should('exist')
        .findDataTag(tag).find('p').should('contain', 'quote')
    )
  );

  it('POS:Share Button', () =>
    cy.reload().findDataTag('share').should('exist').and('contain', 'share')
      .click().then(() =>
        cy.get('.card.card-email #SendEmail').should('exist')
          .findDataTag('modal-cancel').should('exist').click().then(() =>
            cy.get('.card.card-email').should('not.exist')
              .findDataTag('share').click().then(() =>
                cy.get('.card.card-email #SendEmail').should('exist')
              )
          )
      )
  );

  it('POS:Share Modal', () =>
    cy.reload().findDataTag('share').click().then(() =>
      cy.wrap(fields).each(({ name, label, data }) => cy.checkLabel(name, label).checkText(name, data))
        .findDataTag('modal-submit').should('exist')
    )
  );

  it('POS:Next Button', () =>
    cy.reload().findDataTag('submit').should('exist').and('have.attr', 'type', 'button')
  );

  it('POS:Share Page 2', () => {
    navigateThroughShare();
    cy.get('form#QuoteWorkflow').children().first().should('contain', 'All properties will be inspected')
      .next().should('contain', 'Please be aware')
      .findDataTag('assumptions-list').find('li').first().should('contain', 'Properties with pools')
      .next().should('contain', 'Special Flood Hazard Areas')
      .next().should('contain', 'Property is not in state of disrepair')
      .next().should('contain', 'Roof covering does not exceed')
      .find('ul > li').first().should('contain', 'Roof cannot be over 20 years old')
      .next().should('contain', 'Roof cannot be over 40 years old')
      .findDataTag('confirm-assumptions_wrapper').find('label').should('contain', 'Confirmed')
      .findDataTag('confirm-assumptions').should('have.attr', 'data-value', 'false')
      .click().should('have.attr', 'data-value', 'true')
      .click().should('have.attr', 'data-value', 'false')
      .findDataTag('submit').should('be.disabled')
      .findDataTag('confirm-assumptions').click().findDataTag('submit').should('not.be.disabled')
      .checkSubmitButton();
  });
});
