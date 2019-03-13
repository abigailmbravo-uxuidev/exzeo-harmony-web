import stubAllRoutes from "../../support/stubAllRoutes";
import {
  createAdditionalAIs,
  navigateThroughLanding,
  navigateThroughSearchAddress,
  navigateThroughPolicyholder,
  navigateThroughUnderwriting,
  navigateThroughCustomize,
  navigateThroughShare,
  navigateThroughAssumptions
} from '../../helpers';

describe('Additional Parties, on Additional Interest Page Positive', () => {
  before(() => {
    stubAllRoutes();
    cy.login();
    navigateThroughLanding();
    navigateThroughSearchAddress();
    navigateThroughPolicyholder();
    navigateThroughUnderwriting();
    navigateThroughCustomize();
  });

  beforeEach(() => {
    stubAllRoutes();
    cy.route('POST', '/cg/complete?addAdditionalAIs', 'fx:stubs/addAdditionalAIs/mortgagee');
  });

  it('POS:Order Full AI Set ', () =>
    cy.findDataTag('tab-nav-sendEmailOrContinue').click().then(() => {
      const additionalInterests = createAdditionalAIs({ mortgagee: 3, additionalInsured: 2, additionalInterest: 2, premiumFinance: 1 });
      navigateThroughShare();
      navigateThroughAssumptions(['result.additionalInterests', additionalInterests]);

      cy.get('#AddAdditionalInterestPage .results.result-cards li').eq(0).checkCard({ tag: 'Mortgagee', index: 1 })
        .get('#AddAdditionalInterestPage .results.result-cards li').eq(1).checkCard({ tag: 'Mortgagee', index: 2 })
        .get('#AddAdditionalInterestPage .results.result-cards li').eq(2).checkCard({ tag: 'Mortgagee', index: 3 })
        .get('#AddAdditionalInterestPage .results.result-cards li').eq(3).checkCard({ tag: 'Additional Insured', index: 1 })
        .get('#AddAdditionalInterestPage .results.result-cards li').eq(4).checkCard({ tag: 'Additional Insured', index: 2 })
        .get('#AddAdditionalInterestPage .results.result-cards li').eq(5).checkCard({ tag: 'Additional Interest', index: 1 })
        .get('#AddAdditionalInterestPage .results.result-cards li').eq(6).checkCard({ tag: 'Additional Interest', index: 2 })
        .get('#AddAdditionalInterestPage .results.result-cards li').eq(7).checkCard({ tag: 'Premium Finance', index: 1 });
    }).wait(1000)
  );

  it('POS:Bill Payer', () =>
    cy.findDataTag('tab-nav-sendEmailOrContinue').click().then(() => {
      const additionalInterests = createAdditionalAIs({ billPayer: 1 });
      navigateThroughShare();
      navigateThroughAssumptions(['result.additionalInterests', additionalInterests]);

      cy.get('#AddAdditionalInterestPage .results.result-cards li').eq(0).checkCard({ tag: 'Bill Payer', index: 1 })
        .findDataTag('premium-finance-add').should('be.disabled');
    })
  );
});
