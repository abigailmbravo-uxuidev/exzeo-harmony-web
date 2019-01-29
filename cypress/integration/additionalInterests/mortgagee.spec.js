import { goBack } from './utils';

describe('Mortgagee Testing', () => {
  const m1fields = ['m1Name1', 'm1MailingAddress1', 'm1City', 'm1State', 'm1Zip'];
  const m2fields = ['m2Name1', 'm2MailingAddress1', 'm2City', 'm2State', 'm2Zip'];
  const m3fields = ['m3Name1', 'm3MailingAddress1', 'm3City', 'm3State', 'm3Zip'];
  const toggleModalOn = () => cy.findDataTag('mortgagee-add').click();
  const addUser = val => cy.findDataTag(`isAdditional${val}-switch`).click();

  before(() => {
    cy.quoteWorkflow('additionalInterests');
  });

  beforeEach('Establish fixtures', () => {
    cy.fixture('mortgagee1').as('m1data');
    cy.fixture('mortgagee2').as('m2data');
    cy.fixture('mortgagee3').as('m3data');
  });

  it('All Mortgagee 1 Empty Value', () => {
    goBack().then(() => {
      toggleModalOn();
      cy.clearAllText(m1fields);

      cy.submitAndCheckValidation(m1fields);
    });
  });

  it('Mortgagee 1 Empty Value', function() {
    const { m1data } = this;
    goBack().then(() => {
      toggleModalOn();
      cy.clearAllText(m1fields);

      m1fields.forEach(leaveBlank => cy.verifyForm(m1fields, [leaveBlank], m1data));
    });
  });

  it('Mortgagee 1 Invalid Input Value', () => {
    goBack().then(() => {
      toggleModalOn();
      cy.clearAllText(m1fields);

      cy.verifyForm(['m1State'], undefined, { m1State: 'foo' }, { errors: ['Only 2 letters allowed'] });

      cy.verifyForm(['m1Zip'], undefined, { m1Zip: '123456789' }, { errors: ['Only 8 letters or numbers allowed'] });
    });
  });

  it('All Mortgagee 2 Empty Input Value', () => {
    goBack().then(() => {
      toggleModalOn();
      addUser(2);
      cy.clearAllText(m2fields);

      cy.submitAndCheckValidation(m2fields);
    });
  });

  it('Mortgagee 2 Empty Value', function() {
    const { m2data } = this;
    goBack().then(() => {
      toggleModalOn();
      addUser(2);
      cy.clearAllText(m2fields);

      m2fields.forEach(leaveBlank => cy.verifyForm(m2fields, [leaveBlank], m2data));
    });
  });

  it('Mortgagee 2 Invalid Input', () => {
    goBack().then(() => {
      toggleModalOn();
      addUser(2);
      cy.clearAllText(m2fields);

      cy.verifyForm(['m2State'], undefined, { m2State: 'foo' }, { errors: ['Only 2 letters allowed'] });

      cy.verifyForm(['m2Zip'], undefined, { m2Zip: '123456789' }, { errors: ['Only 8 letters or numbers allowed'] });
    });
  });

  it('All Mortgagee 3 Empty Input Value', () => {
    goBack().then(() => {
      toggleModalOn();
      addUser(2);
      addUser(3);
      cy.clearAllText(m3fields);

      cy.submitAndCheckValidation(m3fields);
    });
  });

  it('Mortgagee 3 Empty Value', function() {
    const { m3data } = this;
    goBack().then(() => {
      toggleModalOn();
      addUser(2);
      addUser(3);
      cy.clearAllText(m3fields);
      
      m3fields.forEach(leaveBlank => cy.verifyForm(m3fields, [leaveBlank], m3data));
    });
  });

  it('Mortgagee 3 Invalid Input Value', () => {
    goBack().then(() => {
      toggleModalOn();
      addUser(2);
      addUser(3);
      cy.clearAllText(m3fields);

      cy.verifyForm(['m3State'], undefined, { m3State: 'foo' }, { errors: ['Only 2 letters allowed'] });

      cy.verifyForm(['m3Zip'], undefined, { m3Zip: '123456789' }, { errors: ['Only 8 letters or numbers allowed'] });
    });
  });
});
