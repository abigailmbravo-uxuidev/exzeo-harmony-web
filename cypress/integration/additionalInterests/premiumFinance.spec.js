import { goBack } from './utils';

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
      cy.clearAllText(fields);

      cy.submitAndCheckValidation(fields);
    });
  });

  it('Premium Finance Empty Value', function() {
    const { user } =this; 
    goBack().then(() => {
      cy.findDataTag('premium-finance_add').click();
      cy.clearAllText(fields);

      cy.verifyForm(fields, ['name1'], user);

      cy.verifyForm(fields, ['mailingAddress1'], user);

      cy.verifyForm(fields, ['city'], user);

      cy.verifyForm(fields, ['state'], user);

      cy.verifyForm(fields, ['zip'], user);
    });
  });

  it('Premium Finance Invalid Input Value', () => {
    goBack().then(() => {
      cy.findDataTag('premium-finance_add').click();
      cy.clearAllText(fields);

      cy.verifyForm(['state'], undefined, { state: 'foo' }, { errors: ['Only 2 letters allowed'] });

      cy.verifyForm(['zip'], undefined, { zip: '123456789' }, { errors: ['Only 8 letters or numbers allowed'] });
    });
  });
});
