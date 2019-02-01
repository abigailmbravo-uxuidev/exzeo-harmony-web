// Custom command to use the happypath to navigate through the app to a specific page
// If your test stops at any specific page it will assert the URL is correct for that page
// Defaults to the entire happy path, returning you to landing
// Pages are: ['landing', 'searchAddress', 'customerInfo', 'underwriting', 'customize', 'share'
// 'assumptions', 'additionalInterests', 'mailingBilling', 'verify', 'thankYou']

import user from '../fixtures/user.json';
import underwriting from '../fixtures/underwriting.json';

Cypress.Commands.add('quoteWorkflow', (page = '', data = { user, underwriting }) => {
  const { address, customerInfo, agentCode } = user;
  cy.server();
  cy.route('POST', '/cg/complete').as('complete');
  cy.login();

  if (page !== 'landing') {
    cy.get('.btn[href="/search/address"]').click();

    if (page !== 'searchAddress') {
      cy.get('input[name=address]').type(address);
      cy.get('.btn-success[form=SearchBar]').click();
      cy.get('.results > li[tabindex=0]').click();
      cy.wait('@complete');

      if (page !== 'customerInfo') {
        Object.entries(customerInfo).forEach(([field, value]) => {
          cy.findDataTag(`${field}-input`).type(value);
        });
        cy.findDataTag('agentCode-select').select(agentCode);
        cy._submit('#CustomerInfo');
        cy.wait('@complete');

        if (page !== 'underwriting') {
          Object.entries(underwriting).forEach(([name, value]) => {
            cy.get(`input[name="${name}"][value="${value}"] + span`).click();
          });
          cy._submit('#Underwriting');
          cy.wait('@complete');

          if (page !== 'customize') {
            cy._submit('#Customize');
            cy.wait('@complete');

            if (page !== 'share') {
              cy._submit('#SharePage');
              cy.wait('@complete');

              if (page !== 'assumptions') {
                cy.findDataTag('confirmAssumptions-switch').click();
                cy._submit('#Assumptions');
                cy.wait('@complete');

                if (page !== 'additionalInterests') {
                  cy._submit('#AddAdditionalInterestPage');
                  cy.wait('@complete');

                  if (page !== 'mailingBilling') {
                    cy.findDataTag('sameAsProperty-switch').click();
                    cy._submit('#Billing');
                    cy.wait('@complete');

                    if (page !== 'verify') {
                      cy.findDataTag('confirmProperyDetails-switch').click();
                      cy.findDataTag('confirmQuoteDetails-switch').click();
                      cy.findDataTag('confirmPolicyHolderDetails-switch').click();
                      cy.findDataTag('confirmAdditionalInterestsDetails-switch').click();
                      cy._submit('#Verify')
                      cy.get('.card-footer > button[type="submit"]').click();
                      cy.wait('@complete');

                      if (page !== 'thankYou') {
                        cy.get('#thanks a[href="/"]').click();
                        cy.url().should('eq', `${Cypress.config().baseUrl}/`);
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
});
