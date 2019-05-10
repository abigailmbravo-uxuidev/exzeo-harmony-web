import { navigateThroughAdditionalInterests } from '../helpers';

export default () => {
  goToAiPage();
  addMortgagee();
  navigateThroughAdditionalInterests();
  checkBillingOption(2);
  goToAiPage();
  addPremiumFinance();
  navigateThroughAdditionalInterests();
  checkBillingOption(1);
  goToAiPage();
  deleteAllAis();
  navigateThroughAdditionalInterests();
  checkBillingOption(1);
};

const addMortgagee = () =>
  cy.findDataTag('mortgagee').click()
    .chooseReactSelectOption('mortgage_wrapper', 'america\'s servicing')
    .clickSubmit('div.Mortgagee', 'ai-modal-submit')
    .wait('@updateQuote');

const addPremiumFinance = () =>
  cy.findDataTag('premiumFinance').click()
    .chooseReactSelectOption('premiumFinance_wrapper', 'p1 finance company')
    .clickSubmit('div.Premium.Finance', 'ai-modal-submit')
    .wait('@updateQuote');

const deleteAllAis = () =>
// Get all trash cans then use that length to click and remove the first ai each time to avoid getting detached DOM elements.
  cy.get('a.remove i.fa-trash')
    .each(() => cy.get('a.remove i.fa-trash').eq(0).click().clickSubmit('.ai-modal', 'modal-confirm').wait('@updateQuote'));
    
const checkBillingOption = (numOfOptions = 1, selected = true) =>
  cy.findDataTag('billToId').invoke('attr', 'data-selected').should(selected ? 'not.eq' : 'eq', '')
    .findDataTag('billToId').find('option:not([disabled])').should('have.length', numOfOptions);

const goToAiPage = () => cy.findDataTag('tab-nav-5').click();
