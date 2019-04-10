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
import { workflowSections } from './basicInputs';

describe('Basic Additional Parties Testing', () => {
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

  // it('POS:Additional Parties', () =>
  //   cy.wrap(workflowSections).each(section => cy.checkWorkflowSection(section))
  //     .findDataTag('add-additional-interest').find('form .scroll .form-group p').should('contain', 'Please select the type of Additional Interest')
  //     .get('.button-group').children().each($el =>
  //       cy.wrap($el).should('have.attr', 'type', 'button')
  //         .find('div i').should('have.attr', 'class', 'fa fa-plus')
  //     ).findDataTag('submit').should('contain', 'Not Applicable').and('have.attr', 'type', 'submit')
  // );
});
