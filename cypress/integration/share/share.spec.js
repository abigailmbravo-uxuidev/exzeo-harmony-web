describe('Share Testing', () => {
  const toggleModal = (dir = 'on') => {
    cy.get('div.route-content').then($wrap => {
      if ($wrap.find('.modal.active').length && dir === 'off') {
        cy.findDataTag('cancel').click();
      } else if (dir === 'on') {
        cy.findDataTag('share').click();
      }
    });
  };

  before('Navigate to Share page', () => {
    cy.quoteWorkflow('share');
  });

  beforeEach('Reset page, establish fixutres', () => {
    cy.fixture('user').as('user');
    toggleModal('off');
  });

  it('"Confirmed" Value left at Default "No"', () => {
    cy._submit();
    cy.findDataTag('confirmAssumptions-input').should('have.value', '');
    cy.findDataTag('submit').should('be.disabled');
    cy.findDataTag('tab-nav-sendEmailOrContinue').click();
  });

  it('All Inputs Empty Value', () => {
    toggleModal();

    cy.submitAndCheckValidation(['name', 'emailAddr'], { errors: Array(2).fill('Field Required'), form: '#SendEmail', checkForSnackbar: false });
  });

  it('Input Empty Value', function() {
    const { EmailAddress, FirstName, LastName } = this.user.customerInfo;
    toggleModal();

    cy.verifyForm(['emailAddr'], ['name'], { emailAddr: EmailAddress }, { form: '#SendEmail', checkForSnackbar: false });

    cy.verifyForm(['name'], ['emailAddr'], { name: `${FirstName} ${LastName}` }, { errors: ['Field Required'], form: '#SendEmail', checkForSnackbar: false });
  });

  it('Input Invalid Character', () => {
    toggleModal();

    cy.verifyForm(['emailAddr'], undefined, { emailAddr: 'å∫∂®ƒ©˙ˆ∆¬µ˜øπœ®ß†¨√' }, { form: '#SendEmail', checkForSnackbar: false });
  });
});
