Cypress.Commands.add('happypathTo', page => {
  cy.clearCookies();
  cy.login();

  if (page !== 'landing') {
    cy.get('.btn[href="/quote/searchAddress"]').click().then(() => {

      if (page !== 'searchAddress') {
        cy.get('input[name=address]').type('4131 TEST ADDRESS');
        cy.get('.btn-success[form=SearchBar]').click();
        cy.get('.results > li[tabindex=0]').click().then(() => {

          if (page !== 'customerInfo') {
            cy.get('#FirstName > input').type('Bruce');
            cy.get('#LastName > input').type('Wayne');
            cy.get('#EmailAddress > input').type('Batman@gmail.com');
            cy.get('.form-group.phoneNumber > input').type('123 456 7890');
            cy.get('select[name="agentCode"]').select("60000");
            cy.get('button[form="CustomerInfo"]').click().then(() => {

              if (page !== 'underwriting') {
                cy.get('input[name="rented"][value="Never"] + span').click();
                cy.get('input[name="previousClaims"][value="No claims ever filed"] + span').click();
                cy.get('input[name="monthsOccupied"][value="10+"] + span').click();
                cy.get('input[name="business"][value="No"] + span').click();
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