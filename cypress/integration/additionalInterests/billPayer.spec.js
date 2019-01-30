import { goBack } from './utils';

describe('Premium Finance Testing', () => {
  const fields = ['name1', 'mailingAddress1', 'city', 'state', 'zip'];
  const toggleModalOn = () => cy.findDataTag('bill-payer-add').click();

  before(() => {
    cy.quoteWorkflow('additionalInterests');
  });

  beforeEach('Establish fixtures', () => {
    cy.fixture('additionalUser').as('user');
  });

  it('All Premium Finance Inputs Empty Value', () => {
    goBack().then(() => {
      toggleModalOn();
      cy.clearAllText(fields);

      cy.submitAndCheckValidation(fields);
    });
  });

  it('Premium Finance Empty Value', function () {
    const { user } = this;
    goBack().then(() => {
      toggleModalOn();
      cy.clearAllText(fields);

      fields.forEach(leaveBlank => cy.verifyForm(fields, [leaveBlank], user));
    });
  });

  it('Premium Finance Invalid Input Value', () => {
    goBack().then(() => {
      toggleModalOn();
      cy.clearAllText(fields);

      cy.verifyForm(['state'], undefined, { state: 'foo' }, { errors: ['Only 2 letters allowed'] });

      cy.verifyForm(['zip'], undefined, { zip: '123456789' }, { errors: ['Only 8 letters or numbers allowed'] });
    });
  });
});
