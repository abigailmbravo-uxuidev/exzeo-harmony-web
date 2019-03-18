import stubAllRoutes from "../../support/stubAllRoutes";
import {
  navigateThroughLanding,
  navigateThroughSearchAddress,
  navigateThroughPolicyholder,
  navigateThroughUnderwriting
} from '../../helpers';

describe('Customize Testing', () => {
  before('Go to customize page', () => {
    stubAllRoutes();
    cy.login();
    navigateThroughLanding();
    navigateThroughSearchAddress();
    navigateThroughPolicyholder();
    navigateThroughUnderwriting();
  });

  beforeEach('Restub routes', () => stubAllRoutes());

  const type = amnt =>
    cy.findDataTag('coverageLimits.dwelling.amount-input').type(`{selectall}{backspace}${amnt}`);

  const checkLabelAndTooltip = (tag, labelText, tooltipText) =>
    cy.checkLabel(`${tag}`, labelText).find('span > i').then($i =>
      cy.wrap($i).should('have.attr', 'class', 'fa fa-info-circle')
        .trigger('mouseenter').next().should('contain', tooltipText)
        .wrap($i).trigger('mouseleave')
    );

  const checkValueAsPercentOfDwelling = (tag, pct) => {
    cy.findDataTag('coverageLimits.dwelling.amount-slider').then($slider => {
      const value = $slider.attr('value') * pct;
      cy.findDataTag(tag).find('output').should('contain', `$ ${value.toLocaleString()}`);
    });
  };

  // it('NEG:Dwelling Limit', () => {
  //   type('0');
  //   cy.checkError('coverageLimits.dwelling.amount_wrapper', 'Not a valid range.');

  //   type('124000');
  //   cy.checkError('dwellingAmount', 'Not a valid range.');

  //   type('2100000');
  //   cy.checkError('dwellingAmount', 'Not a valid range.')
  //     .reload();
  // });

  it('POS:Customize Detail Header', () => {
    cy.findDataTag('tab-nav-askUWAnswers').click();
    navigateThroughUnderwriting();
    const details = [
      { dt: 'Quote Number', dd: '-' },
      { dt: 'Coverage A', dd: '$ 314,000' },
      { dt: 'Premium', dd: '$ 2,667' }
    ];

    cy.findDataTag('quote-details').find('dl > div > dt').should('contain', details[0].dt)
      .next().should('contain', details[0].dd)
      .findDataTag('coverage-details').find('dl > div > dt').should('contain', details[1].dt)
      .next().should('contain', details[1].dd)
      .findDataTag('premium').find('dl > div > dt').should('contain', details[2].dt)
      .next().should('contain', details[2].dd);
  });

  it('POS:Customize Workflow', () =>
    cy.checkWorkflowSection('tab-nav-askAdditionalCustomerData', 'selected')
      .checkWorkflowSection('tab-nav-askUWAnswers', 'selected')
      .checkWorkflowSection('tab-nav-askToCustomizeDefaultQuote', 'active')
      .checkWorkflowSection('tab-nav-sendEmailOrContinue')
      .checkWorkflowSection('tab-nav-addAdditionalAIs')
      .checkWorkflowSection('tab-nav-askAdditionalQuestions')
      .checkWorkflowSection('tab-nav-editVerify')
  );

  it('POS:Customize Header Text', () => {
    const headerText = ['Coverage Limits', 'Coverage Options', 'Deductibles', 'Wind Mitigation', 'Discounts'];

    cy.get('#QuoteWorkflow').find('div.title').each(($div, i) =>
      cy.wrap($div).should('contain', headerText[i]).find('i.fa').should('exist'));
  });

  it('POS:Dwelling Limit', () => {
    checkLabelAndTooltip('coverageLimits.dwelling.amount_wrapper', 'Dwelling Limit', 'structure of your home');
    cy.findDataTag('coverageLimits.dwelling.amount-slider').then($slider => {
      const min = parseInt($slider.attr('min'));
      const max = parseInt($slider.attr('max'));

      cy.nativeSetSliderValue($slider[0], min)
        .findDataTag('coverageLimits.dwelling.amount_wrapper').find('span.range-value > input').should('have.attr', 'value', `$ ${min.toLocaleString()}`)
        .nativeSetSliderValue($slider[0], max)
        .findDataTag('coverageLimits.dwelling.amount_wrapper').find('span.range-value > input').should('have.attr', 'value', `$ ${max.toLocaleString()}`);
    });
  });

  it('POS:Other Structures Limit', () => {
    checkLabelAndTooltip('coverageLimits.otherStructures.value_wrapper', 'Other Structures Limit', 'the other structures');
    cy.findDataTag('coverageLimits.otherStructures.value_wrapper').find('div.segmented-answer-wrapper > div').filter('.selected').should('have.length', 1)
      .clickEachRadio('coverageLimits.otherStructures.value_wrapper');
    checkValueAsPercentOfDwelling('coverageLimits.otherStructures.value_wrapper', 0.1);
  });

  it('POS:Personal Property Limit', () => {
    checkLabelAndTooltip('coverageLimits.personalProperty.value_wrapper', 'Personal Property Limit', 'personal belongings');
    cy.findDataTag('coverageLimits.personalProperty.value_wrapper').find('div.segmented-answer-wrapper > div').filter('.selected').should('have.length', 1)
      .findDataTag('coverageLimits.personalProperty.value_wrapper').find('div.segmented-answer-wrapper div').each(($div, index) => {
        if (index === 0) {
          cy.wrap($div).click().should('have.attr', 'class', 'selected')
            .findDataTag('coverageOptions.personalPropertyReplacementCost.answer_wrapper').should('not.exist');
        } else {
          cy.wrap($div).click().should('have.attr', 'class', 'selected');
          checkLabelAndTooltip('coverageOptions.personalPropertyReplacementCost.answer_wrapper', 'Do you want Personal Property Replacement Cost Coverage?', 'Replacement Cost Coverage');
        }
      });
    checkValueAsPercentOfDwelling('coverageLimits.personalProperty.value_wrapper', 0.5);
    cy.findDataTag('coverageOptions.personalPropertyReplacementCost.answer').should('have.attr', 'data-value', 'true')
      .click().should('have.attr', 'data-value', 'false')
      .click().should('have.attr', 'data-value', 'true');
  });

  it('POS:Loss of Use Limit', () => {
    checkLabelAndTooltip('coverageLimits.lossOfUse.value_wrapper', 'Loss of Use Limit', 'This is your personal belongings');
    checkValueAsPercentOfDwelling('coverageLimits.lossOfUse.value_wrapper', 0.1);
  });

  it('POS:Personal Liability Limit', () => {
    cy.checkLabel('coverageLimits.personalLiability.amount_wrapper', 'Personal Liability Limit')
      .clickEachRadio('coverageLimits.personalLiability.amount_wrapper');
  });

  it('POS:Medical Payments to Others', () =>
    cy.checkLabel('coverageLimits.medicalPayments.amount_wrapper', 'Medical Payments to Others')
      .findDataTag('coverageLimits.medicalPayments.amount_wrapper').find('output').should('contain', '$ 2,000')
  );

  it('POS:Limited Fungi, Wet or Dry Rot, Yeast or Bacteria Coverage - Property', () =>
    cy.checkLabel('coverageLimits.moldProperty.amount_wrapper', 'Limited Fungi, Wet or Dry Rot, Yeast or Bacteria Coverage - Property')
      .clickEachRadio('coverageLimits.moldProperty.amount_wrapper')
  );

  it('POS:Limited Fungi, Wet or Dry Rot, Yeast or Bacteria Coverage - Liability', () =>
    cy.checkLabel('coverageLimits.moldLiability.amount_wrapper', 'Limited Fungi, Wet or Dry Rot, Yeast or Bacteria Coverage - Liability')
      .clickEachRadio('coverageLimits.moldLiability.amount_wrapper')
  );

  it('POS:Ordinance or Law Coverage Limit', () =>
    cy.checkLabel('coverageLimits.ordinanceOrLaw.amount_wrapper', 'Ordinance or Law Coverage Limit')
      .clickEachRadio('coverageLimits.ordinanceOrLaw.amount_wrapper')
  );

  it('POS:Do you want Sinkhole Loss Coverage?', () =>
    cy.checkLabel('coverageOptions.sinkholePerilCoverage.answer_wrapper', 'Do you want Sinkhole Loss Coverage?')
      .findDataTag('coverageOptions.sinkholePerilCoverage.answer').should('have.attr', 'data-value', 'true')
      .click().should('have.attr', 'data-value', 'false')
      .click().should('have.attr', 'data-value', 'true')
  );

  it('POS:All Other Perils Deductible', () =>
    cy.checkLabel('deductibles.allOtherPerils.amount_wrapper', 'All Other Perils Deductible')
      .clickEachRadio('deductibles.allOtherPerils.amount_wrapper')
  );

  it('POS:Hurricane Deductible', () => {
    cy.checkLabel('deductibles.hurricane.value_wrapper', 'Hurricane Deductible')
      .clickEachRadio('deductibles.hurricane.value_wrapper');
    checkValueAsPercentOfDwelling('deductibles.hurricane.value_wrapper', 0.1);
  });

  it('POS:Sinkhole Deductible', () => {
    cy.checkLabel('deductibles.sinkhole.amount_wrapper', 'Sinkhole Deductible');
    checkValueAsPercentOfDwelling('deductibles.sinkhole.amount_wrapper', 0.1);
  });

  it('POS:Roof Covering', () =>
    cy.checkLabel('property.windMitigation.roofCovering_wrapper', 'Roof Covering:')
      .clickEachRadio('property.windMitigation.roofCovering_wrapper')
  );

  it('POS:Roof Deck Attachment', () =>
    cy.checkLabel('property.windMitigation.roofDeckAttachment_wrapper', 'Roof Deck Attachment:')
      .clickEachRadio('property.windMitigation.roofDeckAttachment_wrapper')
  );

  it('POS:Roof to Wall Attachment', () =>
    cy.checkLabel('property.windMitigation.roofToWallConnection_wrapper', 'Roof to Wall Attachment:')
      .clickEachRadio('property.windMitigation.roofToWallConnection_wrapper')
  );

  it('POS:Roof Geometry', () =>
    cy.checkLabel('property.windMitigation.roofGeometry_wrapper', 'Roof Geometry:')
      .clickEachRadio('property.windMitigation.roofGeometry_wrapper')
  );

  it('POS:Secondary Water Resistance (SWR)', () =>
    cy.checkLabel('property.windMitigation.secondaryWaterResistance_wrapper', 'Secondary Water Resistance (SWR):')
      .clickEachRadio('property.windMitigation.secondaryWaterResistance_wrapper')
  );

  it('POS:Open Protection', () =>
    cy.checkLabel('property.windMitigation.openingProtection_wrapper', 'Opening Protection:')
      .clickEachRadio('property.windMitigation.openingProtection_wrapper')
  );

  it('POS:Does the property have a burglar alarm?', () =>
    cy.checkLabel('property.burglarAlarm_wrapper', 'Does the property have a burglar alarm?')
      .findDataTag('property.burglarAlarm').should('have.attr', 'data-value', 'false')
      .click().should('have.attr', 'data-value', 'true')
      .click().should('have.attr', 'data-value', 'false')
  );

  it('POS:Does the property have a fire alarm?', () =>
    cy.checkLabel('property.fireAlarm_wrapper', 'Does the property have a fire alarm?')
      .findDataTag('property.fireAlarm').should('have.attr', 'data-value', 'false')
      .click().should('have.attr', 'data-value', 'true')
      .click().should('have.attr', 'data-value', 'false')
  );

  it('POS:Sprinkler', () =>
    cy.checkLabel('property.sprinkler_wrapper', 'Sprinkler')
      .clickEachRadio('property.sprinkler_wrapper')
  );

  // it('POS:Customize Button', () => {
  //   cy.route('POST', '/cg/complete?askToCustomizeDefaultQuote', 'fx:stubs/complete/recalculate-askToCustomizeDefaultQuote');
  //   // We have to modify something to show recalculate/reset buttons
  //   type(300000);
  //   cy.findDataTag('customize').find('.workflow-steps button.btn-primary').should('contain', 'recalculate').click()
  //     .findDataTag('premium').find('dl > div > dd > span').should('contain', '$ 2,667');
  //   type(300000);
  //   cy.findDataTag('customize').find('.workflow-steps button.btn-secondary').should('contain', 'Reset').click()
  //     .findDataTag('customize').find('.workflow-steps button.btn-primary').should('contain', 'next');
  // });
});
