// Custom command to use the happypath to navigate through the app to a specific page
// If your test stops at any specific page it will assert the URL is correct for that page
// Defaults to the entire happy path, returning you to landing
// Pages are: ['landing', 'searchAddress', 'customerInfo', 'underwriting', 'customize', 'share'
// 'assumptions', 'additionalInterests', 'mailingBilling', 'verify', 'thankYou']

import user from '../fixtures/defaultUser.json';
import underwriting from '../fixtures/defaultUnderwriting.json';

Cypress.Commands.add('quoteWorkflow', (page = '', data = { user, underwriting }) => {
  const { address, customerInfo: { firstName, lastName, email, phone, agentCode } } = user;

  cy.login();

  if (page !== 'landing') {
    cy.get('.btn[href="/quote/searchAddress"]').click().then(() => {

      if (page !== 'searchAddress') {
        cy.get('input[name=address]').type(address);
        cy.get('.btn-success[form=SearchBar]').click();
        cy.get('.results > li[tabindex=0]').click().then(() => {

          if (page !== 'customerInfo') {
            cy.get('#FirstName > input').type(FirstName);
            cy.get('#LastName > input').type(LastName);
            cy.get('#EmailAddress > input').type(EmailAddress);
            cy.get('.form-group.phoneNumber > input').type(phoneNumber);
            cy.get('select[name="agentCode"]').select(agentCode);
            cy.get('button[form="CustomerInfo"]').click().then(() => {

              if (page !== 'underwriting') {
                Object.entries(underwriting).forEach(([name, value]) => {
                  cy.get(`input[name="${name}"][value="${value}"] + span`).click();
                });
                cy.get('button[form="Underwriting"]').click().then(() => {

                  if (page !== 'customize') {
                    cy.get('button[form="Customize"]').click().then(() => {

                      if (page !== 'share') {
                        cy.get('#SharePage').submit().then(() => {

                          if (page !== 'assumptions') {
                            cy.get('input[name="confirmAssumptions"] + .switch-div').click();
                            cy.get('button[form="Assumptions"]').click().then(() => {

                              if (page !== 'additionalInterests') {
                                cy.get('form#AddAdditionalInterestPage button[type="submit"]').click().then(() => {

                                  if (page !== 'mailingBilling') {
                                    cy.get('input[name="sameAsProperty"] + .switch-div').click();
                                    cy.get('button[form="Billing"]').click().then(() => {

                                      if (page !== 'verify') {
                                        cy.get('input[name="confirmProperyDetails"] + .switch-div').click();
                                        cy.get('input[name="confirmQuoteDetails"] + .switch-div').click();
                                        cy.get('input[name="confirmPolicyHolderDetails"] + .switch-div').click();
                                        cy.get('input[name="confirmAdditionalInterestsDetails"] + .switch-div').click();
                                        cy.get('button[form="Verify"]').click().then(() => {
                                          cy.get('.card-footer > button[type="submit"]').click().then(() => {

                                            if (page !== 'thankYou') {
                                              cy.get('#thanks a[href="/"]').click().then(() => {
                                                cy.url().should('eq', `${Cypress.config().baseUrl}/`);
                                              });
                                            } else { cy.url().should('include', 'thankYou'); }
                                          });
                                        });
                                      } else { cy.url().should('include', 'verify'); }
                                    });
                                  } else { cy.url().should('include', 'mailingBilling'); }
                                });
                              } else { cy.url().should('include', 'additionalInterests'); }
                            });
                          } else { cy.url().should('include', 'assumptions'); }
                        });
                      } else { cy.url().should('include', 'share'); }
                    });
                  } else { cy.url().should('include', 'customize'); }
                });
              } else { cy.url().should('include', 'underwriting'); }
            });
          } else { cy.url().should('include', 'customerInfo'); }
        });
      } else { cy.url().should('include', 'searchAddress'); }
    });
  } else { cy.url().should('eq', `${Cypress.config().baseUrl}/`); }
});