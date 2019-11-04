import { navigateThroughAdditionalInterests } from '../helpers';

const ho3Headers = [
  { name: 'quoteNumberDetail', label: 'Quote Number', value: '12-' },
  {
    name: 'propertyAddressDetail',
    label: 'Address',
    value: '4131 TEST ADDRESS'
  },
  { name: 'yearBuiltDetail', label: 'Year Built', value: '1998' },
  {
    name: 'constructionTypeDetail',
    label: 'Construction Type',
    value: 'MASONRY'
  },
  {
    name: 'coverageLimits.dwelling.amountDetail',
    label: 'Coverage A',
    value: '$ 314,000'
  },
  { name: 'premium', label: 'Premium', value: '$ 2,667' }
];

const af3Headers = [
  { name: 'quoteNumberDetail', label: 'Quote Number', value: '12-' },
  {
    name: 'propertyAddressDetail',
    label: 'Address',
    value: '4131 TEST ADDRESS'
  },
  { name: 'yearBuiltDetail', label: 'Year Built', value: '1998' },
  { name: 'FEMAfloodZoneDetail', label: 'FEMA Flood Zone', value: 'X' },
  {
    name: 'coverageLimits.building.amountDetail',
    label: 'Coverage A',
    value: '$ 314,000'
  },
  { name: 'premium', label: 'Premium', value: '$ 312' }
];

const goToAiPage = () =>
  cy
    .findDataTag('tab-nav-6')
    .click()
    .wait('@getQuestions')
    .get('#AddAdditionalInterestPage')
    .should('exist');

const addMortgagee = () =>
  cy
    .findDataTag('mortgagee')
    .click()
    .findDataTag('modal')
    .should('exist')
    .chooseReactSelectOption(
      'mortgage_wrapper',
      'bank of america',
      'input#mortgagee-search'
    )
    .clickSubmit('div.AdditionalInterestModal', 'ai-modal-submit')
    .wait('@updateQuote');

const addPremiumFinance = () =>
  cy
    .findDataTag('premiumFinance')
    .click()
    .findDataTag('modal')
    .should('exist')
    .chooseReactSelectOption(
      'premiumFinance_wrapper',
      'p1 finance company',
      'input#premium-finance-search'
    )
    .clickSubmit('div.AdditionalInterestModal', 'ai-modal-submit')
    .wait('@updateQuote');

const deleteAllAis = () =>
  // Get all trash cans then use that length to click and remove the first ai each time to avoid getting detached DOM elements.
  cy.get('a.remove i.delete').each(() =>
    cy
      .get('a.remove i.delete')
      .eq(0)
      .click()
      .clickSubmit('.ai-modal', 'modal-confirm')
      .wait('@updateQuote')
  );

const checkBillingOption = (numOfOptions = 1, selected = true) =>
  cy
    .findDataTag('billToId')
    .invoke('attr', 'data-selected')
    .should(selected ? 'not.eq' : 'eq', '')
    .findDataTag('billToId')
    .find('option:not([disabled])')
    .should('have.length', numOfOptions);

export default (product = 'HO3') => {
  cy.task('log', 'Test Mailing Billing Page')
    .findDataTag('billToId')
    .invoke('attr', 'data-selected')
    .should('not.eq', '')
    .findDataTag('billToId')
    .find('option:not([disabled])')
    .should('have.length', 1);

  checkBillingOption(1);

  cy.wrap(product === 'HO3' ? ho3Headers : af3Headers).each(header =>
    cy.checkDetailHeader(header)
  );

  goToAiPage();
  cy.findDataTag('mortgagee')
    .click()
    .findDataTag('modal')
    .should('exist')
    .chooseReactSelectOption(
      'mortgage_wrapper',
      'bank of america',
      'input#mortgagee-search'
    )
    .clickSubmit('div.AdditionalInterestModal', 'ai-modal-submit')
    .wait('@updateQuote')
    .then(({ request, response }) => {
      expect(request.body.data.additionalInterests.length).to.equal(1);
      expect(request.body.data.additionalInterests[0].type).to.equal(
        'Mortgagee'
      );
    })
    .clickSubmit('#QuoteWorkflow')
    .wait('@getBillingOptions');

  checkBillingOption(2, false);

  goToAiPage();
  cy.findDataTag('premiumFinance')
    .click()
    .findDataTag('modal')
    .should('exist')
    .chooseReactSelectOption(
      'premiumFinance_wrapper',
      'p1 finance company',
      'input#premium-finance-search'
    )
    .clickSubmit('div.AdditionalInterestModal', 'ai-modal-submit')
    .wait('@updateQuote')
    .then(({ request, response }) => {
      expect(request.body.data.additionalInterests.length).to.equal(2);
      expect(request.body.data.additionalInterests[1].type).to.equal(
        'Premium Finance'
      );
    })
    .clickSubmit('#QuoteWorkflow')
    .wait('@getBillingOptions');

  checkBillingOption(1);

  goToAiPage();

  cy.get('a.remove i.delete')
    .each((_, index) =>
      cy
        .get('a.remove i.delete')
        .eq(0)
        .click()
        .clickSubmit('.ai-modal', 'modal-confirm')
        .wait('@updateQuote')
        .then(({ request }) => {
          // In this test we know we have 2 AI to start with. The first time we delete, there should be 1 left in the request, the second time, 0
          expect(request.body.data.additionalInterests.length).to.equal(
            index === 0 ? 1 : 0
          );
        })
    )
    .clickSubmit('#QuoteWorkflow');
  checkBillingOption(1);
};
