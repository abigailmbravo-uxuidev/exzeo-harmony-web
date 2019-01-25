import { goBack, fillAndCheckForErrors } from './utils';

describe('Premium Finance Testing', () => {
  const fields = ['name1', 'mailingAddress1', 'city', 'state', 'zip'];

  before(() => {
    cy.quoteWorkflow('additionalInterests');
  });

  beforeEach('Establish fixtures', () => {
    cy.fixture('additionalUser').as('user');
  });

  it('All Premium Finance Inputs Empty Value', () => {
    goBack().then(() => {
      cy.findDataTag('premium-finance_add').click();

      cy.submitAndCheckErrors(fields);
    });
  });

  it('Premium Finance Empty Value', function() {
    goBack().then(() => {
      cy.findDataTag('premium-finance_add').click();

      fillAndCheckForErrors(fields, ['name1'], this.user);

      fillAndCheckForErrors(fields, ['mailingAddress1'], this.user);

      fillAndCheckForErrors(fields, ['city'], this.user);

      fillAndCheckForErrors(fields, ['state'], this.user);

      fillAndCheckForErrors(fields, ['zip'], this.user);
    });
  });

  it('Premium Finance Invalid Input Value', () => {
    goBack().then(() => {
      cy.findDataTag('premium-finance_add').click();

      cy.fillFields(['state'], { state: 'foo' });
      cy.submitAndCheckErrors(['state'], ['Only 2 letters allowed']);

      cy.fillFields(['zip'], { zip: '123456789' });
      cy.submitAndCheckErrors(['zip'], ['Only 8 letters or numbers allowed']);

      cy.clearAllText(fields);
    });
  });
});