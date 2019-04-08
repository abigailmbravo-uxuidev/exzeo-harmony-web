import {
  navigateThroughLanding,
  navigateThroughSearchAddress,
  navigateThroughPolicyholder,
  navigateThroughUnderwriting,
  navigateThroughCustomize,
  navigateThroughShare,
  navigateThroughAssumptions,
  navigateThroughAdditionalInterests,
  navigateThroughMailingBilling,
  navigateThroughVerify
} from '../../helpers';
import stubAllRoutes from '../../support/stubAllRoutes';

describe('Congragulations Testing', () => {

  before('Go To Congragulations Page', () => {
    stubAllRoutes();
    cy.login();
    navigateThroughLanding();
    navigateThroughSearchAddress();
    navigateThroughPolicyholder();
    navigateThroughUnderwriting();
    navigateThroughCustomize();
    navigateThroughShare();
    navigateThroughAssumptions();
    navigateThroughAdditionalInterests();
    navigateThroughMailingBilling();
    navigateThroughVerify();
  });

  beforeEach(() => stubAllRoutes());

  it('POS:Congratulations Modal Header Text', () => {
    const text = ['You have successfully completed', 'With this information' , 'Once all electronic signatures','NOTE: All signatures','Once you send'];

    // Modal Header testing
    cy.findDataTag('schedule-date-modal').find('.card-header h4').should('contain', 'Send Application')
      .find('i').should('have.attr', 'class', 'fa fa-envelope')

    // Modal Text testing
      .findDataTag('schedule-date-modal').find('.card-block h3').should('contain', 'Congratulations')
      .findDataTag('schedule-date-modal').find('.card-block p').each(($p, i) => cy.wrap($p).should('contain', text[i]))
      .findDataTag('schedule-date-modal').find('.card-block ul li')
      .first().should('contain', 'fakeEmail@asdl.com')
      .next().should('contain', 'fakeEmail@asdl.com')
      .next().should('contain', 'test@typtap.com')

    // Modal Button testing
      .findDataTag('schedule-date-modal').find('.card-footer').children()
      .first().should('contain', 'Edit Quote').click();
    navigateThroughVerify();
    cy.findDataTag('schedule-date-modal').find('.card-footer').children()
      .first().next().should('contain', 'Save Quote')
      .next().should('contain', 'Send Application').click()

    // Congragulations Page Header testing
      .findDataTag('thanks').find('.scroll .detail-wrapper .detail-group h3').should('contain', 'Congrats!')
      .next().should('contain', 'You have completed')

    // Congragulations Page Text testing
      .next().children().first().should('contain', 'Policyholder 1 will be')
      .next().should('contain', 'A copy of the application')
      .next().should('contain', 'Once all policyholders have signed')
      .next().should('contain', 'Signatures on the application')
      .next().should('contain', 'Once the policy is issued')
      .findDataTag('thanks').find('.scroll .detail-wrapper .detail-group p').should('contain', 'Thank you')

      // Return to Dashboard Button testing
      .findDataTag('thanks').find('.workflow-steps a').should('contain', 'Return to Dashboard')
      .and('have.attr', 'class', 'btn btn-primary').click().get('div.dashboard-message').should('exist');
  });
});
