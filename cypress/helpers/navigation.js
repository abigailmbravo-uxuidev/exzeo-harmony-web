import {
  user,
  underwriting,
  coverage
  // coverageAF3
} from '../fixtures';
import { envelopeIdCheck, manualBindPolicy, getToken } from '../helpers';

// Functions which navigate through each page
export const navigateThroughLanding = () =>
  cy
    .task('log', 'Navigating through Landing')
    .wait(500)
    .get('.new-quote[href="/search/address"]')
    .click();

export const navigateThroughSearchAddress = ({
  address = user.address,
  product = user.product,
  state = user.state
} = {}) =>
  cy
    .task('log', 'Navigating through Searching Address')
    .get('input[name=address]')
    .type(address)
    .findDataTag('product')
    .select(product)
    .findDataTag('state')
    .select(state)
    .clickSubmit('#SearchBar')
    .findDataTag('search-results')
    .find('li[tabindex=0]')
    .click()
    .wait('@fetchAddresses')
    .then(({ response }) => {
      expect(response.body.status).to.equal(200);
    });

export const navigateThroughPolicyDetails = ({
  policyDetails = user.policyDetails,
  agentCode = user.agentCode
} = {}) => {
  cy.task('log', 'Navigating through Policy Details')
    .wrap(Object.entries(policyDetails))
    .each(([field, value]) =>
      cy
        .findDataTag(field)
        .find('input')
        .type(`{selectall}{backspace}${value}`)
    );

  cy.wait('@getAgents').then(({ response }) => {
    expect(response.body.status).to.equal(200);
  });
  // Select agent.
  cy.findDataTag('agentCode')
    .select(agentCode)
    // Submit.
    .clickSubmit('#QuoteWorkflow');
  cy.wait('@updateQuote')
    // We expect to have 1 policyHolder in the response.
    .then(({ request, response }) => {
      expect(
        request.body.data.quote.policyHolders.length,
        'Policyholders in request'
      ).to.equal(1);
      expect(
        response.body.result.policyHolders.length,
        'Policyholders in response'
      ).to.equal(1);
    });
};

export const navigateThroughUnderwriting = (data = underwriting) =>
  cy
    .task('log', 'Navigating through Underwriting')
    .wrap(Object.entries(data))
    .each(([name, value]) =>
      cy.findDataTag(`underwritingAnswers.${name}.answer_${value}`).click()
    )
    .clickSubmit('#QuoteWorkflow')
    .wait('@updateQuote')
    .then(response => {
      expect(response.status).to.eq(200);
    });

export const navigateThroughCustomize = (slider = coverage) => {
  cy.task('log', 'Navigating through Customize');

  cy.wrap(Object.entries(slider))
    .each(([name, value]) => cy.sliderSet(`${name}`, `${value}`))
    .get('button')
    .contains('recalculate')
    .click()
    .wait('@updateQuote')
    .then(response => {
      expect(response.status).to.eq(200);
    });
  cy.clickSubmit('#QuoteWorkflow')
    .wait('@updateQuote')
    .then(response => {
      expect(response.status).to.eq(200);
      // cy.wrap(response.body.result.quoteNumber).as('quoteNumber');
    });
};

export const navigateThroughShare = () =>
  cy.task('log', 'Navigating through Share').clickSubmit('#QuoteWorkflow');

export const navigateThroughAssumptions = () =>
  cy
    .task('log', 'Navigating through Confirm Assumptions')
    .findDataTag('confirm-assumptions')
    .click()
    .clickSubmit('#QuoteWorkflow');

export const navigateThroughPolicyholder = ({
  customerInfo = user.customerInfo,
  secondCustomerInfo = user.secondCustomerInfo
} = {}) =>
  cy
    .task('log', 'Navigating through Policyholder')
    .wrap(Object.entries(customerInfo))
    .each(([field, value]) =>
      cy
        .findDataTag(field)
        .find('input')
        .type(`{selectall}{backspace}${value}`)
    )
    // If the additional policyholder toggle is off, turn it on.
    .findDataTag('additionalPolicyholder')
    .then(
      $div =>
        (!$div.attr('data-value') || $div.attr('data-value') === 'false') &&
        cy.wrap($div).click()
    )
    // Add the secondary policyholder data.
    .wrap(Object.entries(secondCustomerInfo))
    .each(([field, value]) =>
      cy
        .findDataTag(field)
        .find('input')
        .type(`{selectall}{backspace}${value}`)
    )
    .clickSubmit('#QuoteWorkflow')
    .wait('@updateQuote')
    // We expect to have two policyholders in the response.
    .then(({ request, response }) => {
      expect(
        request.body.data.quote.policyHolders.length,
        'Policyholders in request'
      ).to.equal(2);
      expect(
        response.body.result.policyHolders.length,
        'Policyholders in response'
      ).to.equal(2);
    });

export const navigateThroughAdditionalInterests = () => {
  cy.task('log', 'Navigating through Additional Interests');
  cy.wait('@getQuestions').then(({ request }) => {
    expect(request.body.step).to.equal('additionalInterestsCSR');
  });
  cy.clickSubmit('#QuoteWorkflow');
};

export const navigateThroughMailingBilling = billToChange => {
  cy.task('log', 'Navigating through Mailing Billing')
    .findDataTag('sameAsPropertyAddress')
    // If the toggle is off, turn it on
    .then(
      $div =>
        (!$div.attr('data-value') || $div.attr('data-value') === 'false') &&
        cy.findDataTag('sameAsPropertyAddress').click()
    );
  cy.findDataTag('sameAsPropertyAddress').then($div => {
    expect($div.attr('data-value') === 'true');
  });
  //Change the BillTo option

  if (billToChange === 'Yes') {
    cy.get('option')
      .contains('Mortgagee')
      .invoke('attr', 'selected', 'selected')
      .parent()
      .trigger('change');
  }
  cy.clickSubmit('#QuoteWorkflow');

  cy.wait('@updateQuote').then(({ request, response }) => {
    expect(request.body.data.quote.policyHolderMailingAddress.address1).to
      .exist;
    expect(request.body.data.quote.billToId).to.exist;
    expect(request.body.data.quote.billToType).to.exist;
    expect(request.body.data.quote.billPlan).to.exist;
    cy.wrap(response.body.result.quoteNumber).as('quoteNumber');
    if (billToChange === 'Yes') {
      expect(response.body.result.billToType).to.equal('Additional Interest');
    }
  });

  cy.wait('@verifyQuote').then(({ request }) => {
    expect(request.body.exchangeName).to.equal('harmony');
  });
};

export const navigateThroughVerify = () =>
  cy
    .task('log', 'Navigating through Verify')
    .findDataTag('confirmProperty')
    .click()
    .findDataTag('confirmQuote')
    .click()
    .findDataTag('confirmPolicy')
    .click()
    .findDataTag('confirmAdditionalInterest')
    .click()
    .clickSubmit('#QuoteWorkflow', 'next');

export const navigateThroughSendApplicationAndBind = verifyEnvId => {
  cy.task('log', 'Navigating through Send Application and Bind').clickSubmit(
    '[data-test="schedule-date-modal"]',
    'modal-submit'
  );
  if (verifyEnvId === 'Yes') {
    cy.wait('@sendApplication').then(({ request }) => {
      getToken().then(response => {
        const token = response.body.id_token;
        const apiUrl = Cypress.env('API_URL') + '/svc';
        const quoteNumber = request.body.data.quoteNumber;
        envelopeIdCheck(quoteNumber, apiUrl, token).then(response => {
          expect(response.body.result.envelopeId).to.not.be.empty;
        });

        manualBindPolicy(quoteNumber, apiUrl, token).then(response => {
          cy.wrap(response.body.result.transaction.policyNumber).as(
            'policyNumber'
          );
        });
      });
    });
  }
};

export const navigateThroughThankYou = () =>
  cy
    .task('log', 'Navigating through Thank You')
    .get('#thanks a[href="/"]')
    .click()
    .get('div.dashboard-message')
    .should('exist');

export const searchPolicy = () => {
  cy.task('log', 'Searching for the Policy')
    .findDataTag('nav-policy')
    .click()
    .get('@policyNumber')
    .then(polNum => {
      cy.findDataTag('policyNumber')
        .type(polNum)
        .get('[type="submit"]')
        .click()
        .wait('@searchPolicy')
        .then(({ response }) => {
          expect(response.body.totalNumberOfRecords).to.equal(1);
        });
      cy.get('.policy-no')
        .invoke('text')
        .then(number => {
          expect(number).to.include(polNum);
        });
    });
};

export const searchQoute = () => {
  cy.task('log', 'Searching for the Quote')
    .findDataTag('nav-searchQuotes')
    .click()
    .get('@quoteNumber')
    .then(quoteNum => {
      cy.findDataTag('quoteNumber')
        .type(quoteNum)
        .get('[type="submit"]')
        .click()
        .wait('@fetchQuotes')
        .then(({ response }) => {
          expect(response.body.result.totalNumberOfRecords).to.equal(1);
        });
      cy.get('.quote-no')
        .invoke('text')
        .then(number => {
          expect(number).to.include(quoteNum);
        });
    });
};
