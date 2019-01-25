import user from '../../fixtures/user.json';
import secondUser from '../../fixtures/secondUser.json';

describe('Policyholder Testing', () => {
  const primaryPolicyTags = ['FirstName', 'LastName', 'EmailAddress', 'phoneNumber'];
  const secondaryPolicyTags = ['FirstName2', 'LastName2', 'EmailAddress2', 'phoneNumber2'];

  const clearAllText = () => {
    const clearIfFull = $input => {
      if ($input.val()) cy.wrap($input).type('{selectall}{backspace}');
    };
    
    primaryPolicyTags.forEach(tag => cy.findDataTag(`${tag}_input`)
      .then($input => clearIfFull($input)));

    cy.get('.form-group.survey-wrapper').then($el => {
      if ($el.find('#isAdditional').hasClass('active')) {
        secondaryPolicyTags.forEach(tag => cy.findDataTag(`${tag}_input`)
          .then($input => clearIfFull($input)));
      };
    });
  };

  const fillFromData = (fields = [], data = user) => 
    fields.forEach(tag => cy.findDataTag(`${tag}_input`).type(data.customerInfo[tag]));

  const checkError = (parent, message = 'Field Required') => {
    cy.get('.snackbar').should('be.visible');
    cy.findDataTag(parent).find('> span').should('contain', message);
  };

  const toggleSecondUser = (dir = 'on') => {
    cy.get('#isAdditional').then($el => {
      if (($el.hasClass('active') && dir === 'off') || ($el.hasClass('inactive') && dir === 'on')) {
        cy.wrap($el).find('input[name = "isAdditional"] + .switch-div').click();
      };
    });
  };

  const submitAndCheckErrors = (errors = []) => {
    cy._submit();
    cy.get('.snackbar').should('be.visible');
    errors.forEach(tag => {
      ['EmailAddress', 'EmailAddress2'].includes(tag) ?
        cy.findDataTag(tag).find('> span').should('contain', 'Not a valid email address')
        : cy.findDataTag(tag).find('> span').should('contain', 'Field Required');
    });
    clearAllText();
  };
  
  before('Go to Policyholder page', () => {
    cy.quoteWorkflow('customerInfo');
  });

  beforeEach('Clears and resets form', () => {
    clearAllText();
    toggleSecondUser('off');
  });

  it('All Inputs Empty Value', () => {
    cy.findDataTag('submit').click();
    submitAndCheckErrors(primaryPolicyTags);
  });

  it('Primary Policyholder Empty Value', () => {
    fillFromData(['LastName', 'EmailAddress', 'phoneNumber']);
    cy._submit();
    checkError('FirstName');
    clearAllText();

    fillFromData(['FirstName', 'EmailAddress', 'phoneNumber']);
    cy._submit();
    checkError('LastName');
    clearAllText();

    fillFromData(['FirstName', 'LastName', 'phoneNumber']);
    cy._submit();
    checkError('EmailAddress', 'Not a valid email address');
    clearAllText();

    fillFromData(['FirstName', 'LastName', 'EmailAddress']);
    cy._submit();
    checkError('phoneNumber');
  });

  it('Secondary Policyholder Empty Value', () => {
    toggleSecondUser('on');
    fillFromData(primaryPolicyTags);
    submitAndCheckErrors(secondaryPolicyTags);

    fillFromData(['LastName2', 'EmailAddress2', 'phoneNumber2'], secondUser);
    cy._submit();
    checkError('FirstName2');
    clearAllText();

    fillFromData(['FirstName2', 'EmailAddress2', 'phoneNumber2'], secondUser);
    cy._submit();
    checkError('LastName2');
    clearAllText();

    fillFromData(['FirstName2', 'LastName2', 'phoneNumber2'], secondUser);
    cy._submit();
    checkError('EmailAddress2', 'Not a valid email address');
    clearAllText();

    fillFromData(['FirstName2', 'LastName2', 'EmailAddress2'], secondUser);
    cy._submit();
    checkError('phoneNumber2');
  });

  it('Primary Policyholder Invalid Character', () => {
    cy.findDataTag('FirstName_input').type('π');
    cy._submit();
    checkError('FirstName', 'Invalid characters');
    
    cy.findDataTag('LastName_input').type('π');
    cy._submit();
    checkError('LastName', 'Invalid characters');

    cy.findDataTag('EmailAddress_input').type('π');
    cy._submit();
    checkError('EmailAddress', 'Not a valid email address');
  });

  it('Secondary Policyholder Invalid Character', () => {
    toggleSecondUser();

    cy.findDataTag('FirstName2_input').type('π');
    cy._submit();
    checkError('FirstName2', 'Invalid characters');

    cy.findDataTag('LastName2_input').type('π');
    cy._submit();
    checkError('LastName2', 'Invalid characters');

    cy.findDataTag('EmailAddress2_input').type('π');
    cy._submit();
    checkError('EmailAddress2', 'Not a valid email address');
  });

  it('Invalid Email Address', () => {
    fillFromData(['FirstName', 'LastName', 'phoneNumber']);
    cy._submit();
    checkError('EmailAddress', 'Not a valid email address');
    clearAllText();

    toggleSecondUser();
    fillFromData(primaryPolicyTags);
    fillFromData(['FirstName2', 'LastName2', 'phoneNumber2'], secondUser);
    cy._submit();
    checkError('EmailAddress2', 'Not a valid email address');
  });

  it('Invalid Contact Phone', () => {
    fillFromData(
      primaryPolicyTags,
      { ...user, customerInfo: { ...user.customerInfo, phoneNumber: '123' }}
    );
    checkError('phoneNumber', 'is not a valid Phone Number.');
    clearAllText();

    toggleSecondUser();
    fillFromData(primaryPolicyTags);
    fillFromData(
      secondaryPolicyTags, 
      { ...secondUser, customerInfo: { ...secondUser.customerInfo, phoneNumber2: '456' }}
    );
    checkError('phoneNumber2', 'is not a valid Phone Number.');
  });
  
  it('Invalid Effective Date', () => {
    fillFromData(primaryPolicyTags);
    cy.findDataTag('effectiveDate_input').clear();
    cy._submit();
    checkError('effectiveDate', 'Not a valid date');
    clearAllText();

    fillFromData(primaryPolicyTags);
    cy.findDataTag('effectiveDate_input').type('1900-01-01');
    cy._submit();
    checkError('effectiveDate', 'Date must be at least 08/01/2017');
  });
});