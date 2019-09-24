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
  { name: 'floodZoneDetail', label: 'Flood Zone', value: 'X' },
  {
    name: 'coverageLimits.building.amountDetail',
    label: 'Coverage A',
    value: '$ 314,000'
  },
  { name: 'premium', label: 'Premium', value: '$ 275' }
];

const addMortgagee = () =>
  cy
    .findDataTag('mortgagee')
    .click()
    .chooseReactSelectOption('mortgage_wrapper', "america's servicing")
    .clickSubmit('div.Mortgagee', 'ai-modal-submit')
    .wait('@updateQuote');

const addPremiumFinance = () =>
  cy
    .findDataTag('premiumFinance')
    .click()
    .chooseReactSelectOption('premiumFinance_wrapper', 'p1 finance company')
    .clickSubmit('div.Premium.Finance', 'ai-modal-submit')
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

const goToAiPage = () => cy.findDataTag('tab-nav-5').click();

export default (product = 'HO3') => {
  cy.wrap(product === 'HO3' ? ho3Headers : af3Headers).each(header =>
    cy.checkDetailHeader(header)
  );
  goToAiPage();
  addMortgagee();
  navigateThroughAdditionalInterests();
  checkBillingOption(2, false);
  goToAiPage();
  addPremiumFinance();
  navigateThroughAdditionalInterests();
  checkBillingOption(1);
  goToAiPage();
  deleteAllAis();
  navigateThroughAdditionalInterests();
  checkBillingOption(1);
};
