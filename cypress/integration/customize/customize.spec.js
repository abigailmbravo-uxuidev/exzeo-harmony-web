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
    cy.findDataTag('dwellingAmount').find('.range-value input').type(`{selectall}{backspace}${amnt}`);

  const checkLabelAndTooltip = (tag, labelText, tooltipText) =>
    cy.checkLabel(tag, labelText).find('span.tooltip-wrapper > i').then($i =>
      cy.wrap($i).should('have.attr', 'class', 'fa fa-info-circle')
        .trigger('mouseenter').get(`#${tag}[data-id="tooltip"]`).should('contain', tooltipText)
        .wrap($i).trigger('mouseleave')
    );

  const checkValueAsPercentOfDwelling = (tag, pct) => {
    cy.findDataTag('dwellingAmount-slider').then($slider => {
      const value = $slider.attr('value') * pct;
      cy.findDataTag(tag).find('input[type="text"]').should('have.attr', 'value', `$ ${value.toLocaleString()}`);
    });
  };

  it('NEG:Dwelling Limit', () => {
    type('0');
    cy.checkError('dwellingAmount', 'Not a valid range.');

    type('124000');
    cy.checkError('dwellingAmount', 'Not a valid range.');

    type('2100000');
    cy.checkError('dwellingAmount', 'Not a valid range.')
      .reload();
  });

  it('POS:Customize Detail Header', () => {
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
      .next().find('span').should('contain', details[2].dd);
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

    cy.get('#Customize').find('span.section-group-header').each(($span, i) =>
      cy.wrap($span).should('contain', headerText[i]).find('i.fa').should('exist'));
  });

  it('POS:Dwelling Limit', () => {
      checkLabelAndTooltip('dwellingAmount', 'Dwelling Limit', 'structure of your home');
      cy.findDataTag('dwellingAmount-slider').then($slider => {
        const min = parseInt($slider.attr('min'));
        const max = parseInt($slider.attr('max'));

        cy.nativeSetSliderValue($slider[0], min)
          .findDataTag('dwellingAmount').find('span.range-value > input').should('have.attr', 'value', `$ ${min.toLocaleString()}`)
          .nativeSetSliderValue($slider[0], max)
          .findDataTag('dwellingAmount').find('span.range-value > input').should('have.attr', 'value', `$ ${max.toLocaleString()}`);
      });
  });

  it('POS:Other Structures Limit', () => {
    checkLabelAndTooltip('otherStructuresAmount', 'Other Structures Limit', 'the other structures');
    cy.findDataTag('otherStructuresAmount').find('div.segmented-answer-wrapper > div').filter('.selected').should('have.length', 1)
      .clickEachRadio('otherStructuresAmount');
    checkValueAsPercentOfDwelling('otherStructuresAmount', 0.1);
  });

  it('POS:Personal Property Limit', () => {
    checkLabelAndTooltip('personalPropertyAmount', 'Personal Property Limit', 'personal belongings');
    cy.findDataTag('personalPropertyAmount').find('div.segmented-answer-wrapper > div').filter('.selected').should('have.length', 1)
      .findDataTag('personalPropertyAmount').find('div div').each(($div, index) => {
        if (index === 0) {
          cy.wrap($div).click().should('have.attr', 'class', 'radio-column-4 selected')
            .findDataTag('personalPropertyReplacementCostCoverage').should('not.exist');
        } else {
          cy.wrap($div).click().should('have.attr', 'class', 'radio-column-4 selected');
          checkLabelAndTooltip('personalPropertyReplacementCostCoverage', 'Do you want Personal Property Replacement Cost Coverage?', 'Replacement Cost Coverage');
        }
      });
    checkValueAsPercentOfDwelling('personalPropertyAmount', 0.5);
    cy.get('input[name="personalPropertyReplacementCostCoverage"]').should('have.attr', 'value', 'true')
      .next().click().prev().should('have.attr', 'value', 'false')
      .next().click().prev().should('have.attr', 'value', 'true');
  });

  it('POS:Loss of Use Limit', () => {
    cy.checkLabel('lossOfUseAmount', 'Loss of Use Limit');
    checkValueAsPercentOfDwelling('lossOfUseAmount', .1);
  });

  it('POS:Personal Liability Limit', () => {
    cy.checkLabel('personalLiability', 'Personal Liability Limit')
      .clickEachRadio('personalLiability');
  });

  it('POS:Medical Payments to Others', () =>
    cy.checkLabel('medicalPayments', 'Medical Payments to Others')
      .findDataTag('medicalPayments').find('input[name="medicalPayments"]').should('have.attr', 'value', '$ 2,000')
      .and('have.attr', 'readonly')
  );

  it('POS:Limited Fungi, Wet or Dry Rot, Yeast or Bacteria Coverage - Property', () =>
    cy.checkLabel('moldProperty', 'Limited Fungi, Wet or Dry Rot, Yeast or Bacteria Coverage - Property')
      .clickEachRadio('moldProperty')
  );

  it('POS:Limited Fungi, Wet or Dry Rot, Yeast or Bacteria Coverage - Liability', () =>
    cy.checkLabel('moldLiability', 'Limited Fungi, Wet or Dry Rot, Yeast or Bacteria Coverage - Liability')
      .clickEachRadio('moldLiability')
  );

  it('POS:Ordinance or Law Coverage Limit', () =>
    cy.checkLabel('ordinanceOrLaw', 'Ordinance or Law Coverage Limit')
      .clickEachRadio('ordinanceOrLaw')
  );

  it('POS:Do you want Sinkhole Loss Coverage?', () =>
    cy.checkLabel('sinkholePerilCoverage', 'Do you want Sinkhole Loss Coverage?')
      .find('input[name="sinkholePerilCoverage"]').should('have.attr', 'value', 'true')
      .next().click().prev().should('have.attr', 'value', 'false')
      .next().click().prev().should('have.attr', 'value', 'true')
  );

  it('POS:All Other Perils Deductible', () =>
    cy.checkLabel('allOtherPerils', 'All Other Perils Deductible')
      .clickEachRadio('allOtherPerils')
  );

  it('POS:Hurricane Deductible', () => {
    cy.checkLabel('hurricane', 'Hurricane Deductible')
      .clickEachRadio('hurricane');
    checkValueAsPercentOfDwelling('hurricane', 0.1);
  });

  it('POS:Sinkhole Deductible', () => {
    cy.checkLabel('sinkhole', 'Sinkhole Deductible');
    checkValueAsPercentOfDwelling('sinkhole', 0.1);
  });

  it('POS:Roof Covering', () =>
    cy.checkLabel('roofCovering', 'Roof Covering:')
      .clickEachRadio('roofCovering')
  );

  it('POS:Roof Deck Attachment', () =>
    cy.checkLabel('roofDeckAttachment', 'Roof Deck Attachment:')
      .clickEachRadio('roofDeckAttachment')
  );

  it('POS:Roof to Wall Attachment', () =>
    cy.checkLabel('roofToWallConnection', 'Roof to Wall Attachment:')
      .clickEachRadio('roofToWallConnection')
  );

  it('POS:Roof Geometry', () =>
    cy.checkLabel('roofGeometry', 'Roof Geometry:')
      .clickEachRadio('roofGeometry')
  );

  it('POS:Secondary Water Resistance (SWR)', () =>
    cy.checkLabel('secondaryWaterResistance', 'Secondary Water Resistance (SWR):')
      .clickEachRadio('secondaryWaterResistance')
  );

  it('POS:Open Protection', () =>
    cy.checkLabel('openingProtection', 'Opening Protection:')
      .clickEachRadio('openingProtection')
  );

  it('POS:Does the property have a burglar alarm?', () =>
    cy.checkLabel('burglarAlarm', 'Does the property have a burglar alarm?')
      .find('input[name="burglarAlarm"]').should('have.attr', 'value', 'false')
      .next().click().prev().should('have.attr', 'value', 'true')
      .next().click().prev().should('have.attr', 'value', 'false')
  );

  it('POS:Does the property have a fire alarm?', () =>
    cy.checkLabel('fireAlarm', 'Does the property have a fire alarm?')
      .find('input[name="fireAlarm"]').should('have.attr', 'value', 'false')
      .next().click().prev().should('have.attr', 'value', 'true')
      .next().click().prev().should('have.attr', 'value', 'false')
  );

  it('POS:Sprinkler', () =>
    cy.checkLabel('sprinkler', 'Sprinkler')
      .clickEachRadio('sprinkler')
  );

  it('POS:Customize Button', () =>
    cy.setFx('stubs/complete/askToCustomizeDefaultQuote', ['data.previousTask.name', 'askToCustomizeDefaultQuote' ])
      .then(() => {
      // We have to modify something to show recalculate/reset buttons
      type(300000);
      cy.findDataTag('customize').find('.workflow-steps button.btn-primary').should('contain', 'recalculate').click()
        .findDataTag('premium').find('dl > div > dd > span').should('contain', '$');
      type(300000);
      cy.findDataTag('customize').find('.workflow-steps button.btn-secondary').should('contain', 'Reset').click()
        .findDataTag('customize').find('.workflow-steps button.btn-primary').should('contain', 'next');
    })
  );
});
