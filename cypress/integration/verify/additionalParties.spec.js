import stubAllRoutes from "../../support/stubAllRoutes";
import {
  createAdditionalAIs,
  navigateThroughLanding,
  navigateThroughSearchAddress,
  navigateThroughPolicyholder,
  navigateThroughUnderwriting,
  navigateThroughCustomize,
  navigateThroughShare,
  navigateThroughAssumptions,
  navigateThroughAdditionalInterests,
  navigateThroughMailingBilling
} from '../../helpers';

describe('Additional Parties on Verified Page Positive Testing', () => {
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
    navigateThroughAdditionalInterests();
  });

  beforeEach(() => stubAllRoutes());

  // it('POS:Verify Additional Parties', () =>
  //   cy.findDataTag('tab-nav-askAdditionalQuestions').click().then(() => {
  //     const additionalInterests = createAdditionalAIs({ mortgagee: 3, additionalInsured: 2, additionalInterest: 2, premiumFinance: 1 });
  //     navigateThroughMailingBilling(['result.additionalInterests', additionalInterests]);

  //     cy.get('.detail-group.additional-interests-details section.display-element.additional-interests .card').eq(0).checkVerifyPageCard({tag: 'Mortgagee', index: 1 })
  //       .get('.detail-group.additional-interests-details section.display-element.additional-interests .card').eq(1).checkVerifyPageCard({ tag: 'Mortgagee', index: 2 })
  //       .get('.detail-group.additional-interests-details section.display-element.additional-interests .card').eq(2).checkVerifyPageCard({ tag: 'Mortgagee', index: 3 })
  //       .get('.detail-group.additional-interests-details section.display-element.additional-interests .card').eq(3).checkVerifyPageCard({ tag: 'Additional Insured', index: 1 })
  //       .get('.detail-group.additional-interests-details section.display-element.additional-interests .card').eq(4).checkVerifyPageCard({ tag: 'Additional Insured', index: 2 })
  //       .get('.detail-group.additional-interests-details section.display-element.additional-interests .card').eq(5).checkVerifyPageCard({ tag: 'Additional Interest', index: 1 })
  //       .get('.detail-group.additional-interests-details section.display-element.additional-interests .card').eq(6).checkVerifyPageCard({ tag: 'Additional Interest', index: 2 })
  //       .get('.detail-group.additional-interests-details section.display-element.additional-interests .card').eq(7).checkVerifyPageCard({ tag: 'Premium Finance', index: 1 });
  //   })
  // );
});
