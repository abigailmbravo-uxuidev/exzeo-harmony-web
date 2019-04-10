import stubAllRoutes from "../../support/stubAllRoutes";
import {
  navigateThroughLanding,
  navigateThroughSearchAddress,
  navigateThroughPolicyholder,
  navigateThroughUnderwriting
} from '../../helpers';
import { workflowSections, fields, pageHeaders } from './customizeFields';

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
    cy.findDataTag('coverageLimits.dwelling.amount-input').type(`{selectall}{backspace}${amnt}`).blur();

  const checkTooltip = ({ name, tooltipText }) =>
    cy.findDataTag(name).find('span > i').then($i =>
      cy.wrap($i).should('have.attr', 'class', 'fa fa-info-circle')
        .trigger('mouseenter').next().should('contain', tooltipText)
        .wrap($i).trigger('mouseleave')
    );

  const setSliderAndCheckOutput = (tag, sliderValue, outputValue, selectValue) => {
    cy.findDataTag('coverageLimits.dwelling.amount-slider').then($slider => {
      cy.log($slider);
      cy.nativeSetSliderValue($slider[0], sliderValue);
      if (selectValue) { cy.findDataTag(tag).find('span').contains(selectValue).click(); };
      cy.findDataTag(tag).find('output').should('contain', outputValue);
    });
  };

  // it('NEG:Dwelling Limit', () => {
  //   type('0');
  //   cy.findDataTag('coverageLimits.dwelling.amount_error').should('contain', 'Not a valid range.');

  //   type('124000');
  //   cy.findDataTag('coverageLimits.dwelling.amount_error').should('contain', 'Not a valid range.');

  //   type('2100000');
  //   cy.findDataTag('coverageLimits.dwelling.amount_error').should('contain', 'Not a valid range.');
  // });

  // it('POS:Customize Detail Header', () => {
  //   cy.findDataTag('tab-nav-askUWAnswers').click();
  //   navigateThroughUnderwriting();
  //   const details = [
  //     { dt: 'Quote Number', dd: '-' },
  //     { dt: 'Coverage A', dd: '$ 314,000' },
  //     { dt: 'Premium', dd: '$' }
  //   ];

  //   cy.findDataTag('quote-details').find('dl > div > dt').should('contain', details[0].dt)
  //     .next().should('contain', details[0].dd)
  //     .findDataTag('coverage-details').find('dl > div > dt').should('contain', details[1].dt)
  //     .next().should('contain', details[1].dd)
  //     .findDataTag('premium').find('dl > div > dt').should('contain', details[2].dt)
  //     .next().should('contain', details[2].dd);
  // });

  // it('POS:Customize Workflow', () =>
  //   cy.wrap(workflowSections).each(section => cy.checkWorkflowSection(section))
  // );

  // it('POS:Customize Header Text', () =>
  //   cy.wrap(pageHeaders).each(header => cy.checkHeader(header))
  // );

  // it('POS:Checks all fields', () => {
  //   cy.wrap(fields).each(field => {
  //     cy.checkLabel(field.name, field.label);

  //     switch(field.type) {
  //       case 'radio':
  //         cy.checkRadios(field).clickEachRadio(field);
  //         break;
  //       case 'switch':
  //         cy.checkSwitch(field);
  //         break;
  //       case 'slider':
  //         cy.checkSlider(field.name);
  //         break;
  //       default:
  //     }

  //     if (field.tooltip) { checkTooltip(field); };
  //   });
  // });

  // it('POS:Check output values', () => {
  //   const outputFields = [
  //     'coverageLimits.otherStructures.value_wrapper',
  //     'coverageLimits.personalProperty.value_wrapper',
  //     'coverageLimits.lossOfUse.value_wrapper',
  //     'deductibles.hurricane.amount_wrapper',
  //     'deductibles.sinkhole.amount_wrapper'
  //   ];

  //   setSliderAndCheckOutput(outputFields[0], 350000, '$ 35,000', '10%');
  //   setSliderAndCheckOutput(outputFields[1], 350000, '$ 122,500', '35%');
  //   setSliderAndCheckOutput(outputFields[2], 399000, '$ 39,900');
  //   setSliderAndCheckOutput(outputFields[3], 399000, '$ 19,950', '5% of Dwelling Limit');
  //   setSliderAndCheckOutput(outputFields[4], 344000, '$ 34,400');
  // });

  // it('POS:Customize Button', () => {
  //   cy.route('POST', '/cg/complete?askToCustomizeDefaultQuote', 'fx:stubs/complete/recalculate-askToCustomizeDefaultQuote');
  //   cy.setFx('stubs/getQuoteServiceRequest', ['result.rating.totalPremium', 2667]);
  //   // We have to modify something to show recalculate/reset buttons
  //   type(300000);
  //   cy.findDataTag('submit').should('contain', 'recalculate').click()
  //     .findDataTag('premium').find('dl > div > dd > span').should('contain', '$ 2,767');
  //   type(300000);
  //   cy.findDataTag('reset').should('contain', 'reset').click()
  //     .findDataTag('submit').should('contain', 'next');
  // });
});
