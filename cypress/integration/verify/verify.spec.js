import stubAllRoutes from "../../support/stubAllRoutes";
import {
  navigateThroughLanding,
  navigateThroughSearchAddress,
  navigateThroughPolicyholder,
  navigateThroughUnderwriting,
  navigateThroughCustomize,
  navigateThroughShare,
  navigateThroughAssumptions,
  navigateThroughAdditionalInterests,
  navigateThroughMailingBilling
} from '../../helpers';
import { pH1Fields, pH2Fields, workflowSections } from './verifyInputs';

describe('Verify testing', () => {
  const switchTags = ['confirmProperyDetails', 'confirmQuoteDetails', 'confirmPolicyHolderDetails', 'confirmAdditionalInterestsDetails'];
  const submitOptions = { form: '#UpdatePolicyholder' };

  const toggleModal = (dir = 'on') => {
    if (dir === 'on') {
      cy.findDataTag('edit-policyholder').click();
    } else {
      cy.get('[data-test="cancel"]:not([disabled])').click({ force: true }).wait(1000);
    }
  };

  before(() => {
    stubAllRoutes();
    cy.login();
    navigateThroughLanding();
    navigateThroughSearchAddress();
    navigateThroughPolicyholder();
    navigateThroughUnderwriting();
    navigateThroughCustomize();
    navigateThroughShare();
    navigateThroughAssumptions();
    navigateThroughAdditionalInterests();
    navigateThroughMailingBilling();
  });

  beforeEach(() => stubAllRoutes());

  const checkSection = (name, data, path) => {
    cy.findDataTag('verify').find(path || `.${name}-details section.display-element dl`).each(($el, i) =>
      cy.wrap($el).find('div > dt').should('contain', data[i].dt)
        .next().should('contain', data[i].dd)
    );
  };

  it('NEG:Primary / Secondary Policyholder Empty Value', () => {
    toggleModal();
    cy.clearAllText(pH1Fields).submitAndCheckValidation(pH1Fields, submitOptions)
      .wrap(pH1Fields).each(fieldToLeaveBlank => cy.verifyForm(pH1Fields, [fieldToLeaveBlank], undefined, submitOptions))
      .clearAllText(pH2Fields).submitAndCheckValidation(pH2Fields, submitOptions)
      .wrap(pH2Fields).each(fieldToLeaveBlank => cy.verifyForm(pH2Fields, [fieldToLeaveBlank], undefined, submitOptions));
    toggleModal('off');
  });

  // AWAIT BUGFIX HAR-5702
  // it('NEG:Primary Policyholder Invalid Character', () => {
  //   toggleModal();

  //   pH1Fields.forEach(fieldToCheck => {
  //     cy.verifyForm([fieldToCheck], undefined, { [fieldToCheck]: '•••' }, {
  //       errors: fieldToCheck.includes('email') ? ['Not a valid email address'] : ['Invalid characters'],
  //       form: '#UpdatePolicyholder'
  //     });
  //     // cy.clearAllText([fieldToCheck]);
  //     // cy.fillFields(pH1Fields.filter(field => field === fieldToCheck), { [fieldToCheck]: '•••'});
  //     // cy.clickSubmit('NEG:#UpdatePolicyholder');
  //     // cy.get('.checkForSnackbar').should('be.visible');
  //     // cy.checkError(
  //     //   fieldToCheck,
  //     //   fieldToCheck.includes('email') ? 'Not a valid email address' : 'Invalid characters'
  //     // );
  //   });

  //  toggleModal('off');
  // });

  // it('NEG:Secondary Policyholder Invalid Character', () => {
  //   toggleModal();

  //   pH2Fields.forEach(fieldToCheck => {
  //     cy.verifyForm([fieldToCheck], undefined, { [fieldToCheck]: '•••'}, {
  //       errors: fieldToCheck.includes('email') ? ['Not a valid email address'] : ['Invalid characters'],
  //       form: '#UpdatePolicyholder'
  //     });
  //     // cy.clearAllText([fieldToCheck]);
  //     // cy.fillFields(pH2Fields.filter(field => field === fieldToCheck), { [fieldToCheck]: '•••' });
  //     // cy.clickSubmit('NEG:#UpdatePolicyholder');
  //     // cy.get('.checkForSnackbar').should('be.visible');
  //     // cy.checkError(
  //     //   fieldToCheck,
  //     //   fieldToCheck.includes('email') ? 'Not a valid email address' : 'Invalid characters'
  //     // );
  //   });

  //   toggleModal('off');
  // });
  // END BUGFIX AWAIT

  it('NEG:Invalid Email Address / Contact Phone', () => {
    const email1 = pH1Fields.find(({ name }) => name === 'pH1email');
    const email2 = pH2Fields.find(({ name }) => name === 'pH2email');
    const phone1 = pH1Fields.find(({ name }) => name === 'pH1phone');
    const phone2 = pH2Fields.find(({ name }) => name === 'pH2phone');
    toggleModal();

    cy.verifyForm([{ ...email1, error: 'Not a valid email address', data: 'batman' }], undefined, undefined, submitOptions)
      .verifyForm([{ ...email2, error: 'Not a valid email address', data: 'batman' }], undefined, undefined, submitOptions)
      .verifyForm([{ ...phone1, error: 'is not a valid Phone Number.', data: '123' }], undefined, undefined, submitOptions)
      .verifyForm([{ ...phone2, error: 'is not a valid Phone Number.', data: '123' }], undefined, undefined, submitOptions);

    toggleModal('off');
  });

  it('NEG:All "Verified" Values left at Default "No"', () => {
    cy.wrap(switchTags).each(tag => cy.findDataTag(tag).should('not.have.class', 'active'))
      .findDataTag('submit').should('be.disabled');
  });

  it('NEG:Some "Verified Values left at Default "No"', () => {
    // Subset of unselected switches grows
    for (let i = 0; i < switchTags.length - 1; i++) {
      const tagsToToggle = switchTags.slice(0, i + 1);
      // Toggle all tags except the subset
      cy.wrap(tagsToToggle).each(tag => cy.findDataTag(tag).find('.switch-div').click())
      // Cannot submit
        .findDataTag('submit').should('be.disabled')
      // Toggle the tags back off
        .wrap(tagsToToggle).each(tag => cy.findDataTag(tag).find('.switch-div').click());
    }
  });

  it('POS:Verify Workflow', () =>
    cy.wrap(workflowSections).each(section => cy.checkWorkflowSection(section))
  );

  it('POS:Verify Header Text', () => {
    const headerText = ['Property Details', 'Quote Details', 'Policyholder Details', 'Mailing Address', 'Additional Parties'];

    cy.findDataTag('verify').find('h3.section-group-header').each(($h3, i) =>
      cy.wrap($h3).should('contain', headerText[i]).find('i.fa').should('exist'));
  });

  it('POS:Property Details Text & Value', () => {
    const propertyDetails = [
      { dt: 'Quote Number', dd: '-' },
      { dt: 'Property Address', dd: '4131' },
      { dt: 'Year Built', dd: '1' },
      { dt: 'Effective Date', dd: '2019' },
      { dt: 'Agent', dd: '' }
    ];

    checkSection('property', propertyDetails);
  });

  it('POS:Quote Details Text / Details I & II', () => {
    const quoteDetails = [
      { dt: 'Yearly Premium', dd: '$'},
      { dt: 'Dwelling', dd: '$' },
      { dt: 'Other Structures', dd: '$' },
      { dt: 'Personal Property', dd: '$' },
      { dt: 'Loss Of Use', dd: '$' },
      { dt: 'Personal Liability', dd: '$' },
      { dt: 'Medical Payments', dd: '$' },
      { dt: 'Personal Property Replacement Cost', dd: 'Yes' },
      { dt: 'Mold Property', dd: '$' },
      { dt: 'Mold Liability', dd: '$' },
      { dt: 'Ordinance or Law', dd: '$' },
      { dt: 'All Other Perils Deductible', dd: '$' },
      { dt: 'Hurricane Deductible', dd: '$' },
      { dt: 'Sinkhole Deductible', dd: '$' }
    ];

    checkSection('quote', quoteDetails);
  });

  it('POS:Policyholder Details Text', () =>
    cy.findDataTag('verify').find('.policyholder-details .display-element > p').should('contain', 'Please be sure the information below')
  );

  it('POS:Policyholder Details Primary / Secondary Policyholder Text / Value', () => {
    const phDetails = [
      { dt: 'Name', dd: ' ' },
      { dt: 'Phone Number', dd: '(' },
      { dt: 'Email', dd: '@' }
    ];

    cy.findDataTag('verify').find('.contact-card-wrapper .contact-card').each($div =>
      cy.wrap($div).find('dl div').each(($div, i) =>
        cy.wrap($div).children().first().should('contain', phDetails[i].dt)
          .next().should('contain', phDetails[i].dd)
      )
    );
  });

  it('POS:Mailing Address Text / Value', () => {
    const mailDetails = [
      { dt: 'Street Address', dd: '' },
      { dt: 'City/State/Zip', dd: '' },
      { dt: 'Country', dd: '' }
    ];
    checkSection('mailing-address', mailDetails);
  });

  it('POS:Property Details Edit Button', () => {
    cy.findDataTag('verify').find('#askAdditionalCustomerData').should('contain', 'Edit')
      .find('i').should('have.attr', 'class', 'fa fa-pencil').click()
    // Navigate back through app by using saved data
      .clickSubmit().clickSubmit().clickSubmit().clickSubmit();
    navigateThroughAssumptions();
    navigateThroughAdditionalInterests();
    navigateThroughMailingBilling();
    cy.url().should('include', 'verify');
  });

  it('POS:Quote Details Edit Button', () => {
    cy.findDataTag('verify').find('.quote-details span.edit-btn').should('contain', 'Edit')
      .find('i').should('have.attr', 'class', 'fa fa-pencil').click()
      .clickSubmit().clickSubmit();
    navigateThroughAssumptions();
    navigateThroughAdditionalInterests();
    navigateThroughMailingBilling();
    cy.url().should('include', 'verify');
  });

  it('POS:Policyholder Details Edit Button', () =>
    cy.findDataTag('verify').find('.policyholder-details span.edit-btn').should('contain', 'Edit')
      .find('i').should('have.attr', 'class', 'fa fa-pencil').click()
      .get('.edit-policyholder-modal').should('exist').and('have.attr', 'class', 'edit-policyholder-modal modal active')
      .find('#UpdatePolicyholder').then($form =>
        cy.wrap($form).find('.card-header > h4').should('contain', 'Edit Policyholder(s)')
          .find('i').should('have.attr', 'class', 'fa fa-vcard')
          .wrap($form).find('#primaryPolicyholder').should('contain', 'Primary Policyholder')
          .wrap($form).find('#secondaryPolicyholder').should('contain', 'Secondary Policyholder')
          .checkLabel('pH1FirstName', 'First Name')
          .checkLabel('pH1LastName', 'Last Name')
          .checkLabel('pH1phone', 'Primary Phone')
          .checkLabel('pH1email', 'Email Address')
          .checkLabel('pH2FirstName', 'First Name')
          .checkLabel('pH2LastName', 'Last Name')
          .checkLabel('pH2phone', 'Primary Phone')
          .checkLabel('pH2email', 'Email Address')
          .findDataTag('isAdditional').find('label > input').should('have.attr', 'value', 'true')
          .findDataTag('cancel').click()
          .get('.edit-policyholder-modal').should('not.exist')
      )
  );

  it('POS:Mailing Address Edit Button', () => {
    cy.findDataTag('verify').find('.mailing-address-details span.edit-btn').should('contain', 'Edit')
      .find('i').should('have.attr', 'class', 'fa fa-pencil').click();
    navigateThroughMailingBilling();
    cy.url().should('include', 'verify');
  });

  it('POS:Additional Parties Edit Button', () => {
    cy.findDataTag('verify').find('.additional-interests-details span.edit-btn').should('contain', 'Edit')
      .find('i').should('have.attr', 'class', 'fa fa-pencil').click()
      .clickSubmit();
    navigateThroughMailingBilling();
    cy.url().should('include', 'verify');
  });

  it('POS:Verify Toggle', () =>
    ['confirmProperyDetails', 'confirmQuoteDetails', 'confirmPolicyHolderDetails', 'confirmAdditionalInterestsDetails']
    .forEach(tag =>
      cy.findDataTag(tag).find('label').should('contain', 'Verified')
        .find('input').should('have.attr', 'value', '')
        .next().should('have.attr', 'class', 'switch-div').then($switch =>
          cy.wrap($switch).click()
            .get(`input[name="${tag}"]`).should('have.attr', 'value', 'true')
            .wrap($switch).click()
            .get(`input[name="${tag}"]`).should('have.attr', 'value', 'false')
        )
    )
  );

  it('POS:Next Button', () => cy.findDataTag('submit').should('have.attr', 'type', 'submit'));
});
