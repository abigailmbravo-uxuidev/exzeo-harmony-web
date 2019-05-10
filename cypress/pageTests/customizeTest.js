import { customizeAF3, customizeHO3 } from '../fixtures';

const toCurrency = value =>
  `$ ${String(value).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;

const ho3Headers = [
  { name: 'quoteNumberDetail', label: 'Quote Number', value: '12-' },
  { name: 'propertyAddressDetail', label: 'Address', value: '4131 TEST ADDRESS' },
  { name: 'yearBuiltDetail', label: 'Year Built', value: '1998' },
  { name: 'constructionTypeDetail', label: 'Construction Type', value: 'MASONRY' },
  { name: 'coverageLimits.dwelling.amountDetail', label: 'Coverage A', value: '$ 314,000' },
  { name: 'premium', 'label': 'Premium', value: '$ 2,667' }
];

const af3Headers = [
  { name: 'quoteNumberDetail', label: 'Quote Number', value: '12-' },
  { name: 'propertyAddressDetail', label: 'Address', value: '4131 TEST ADDRESS' },
  { name: 'yearBuiltDetail', label: 'Year Built', value: '1998' },
  { name: 'floodZoneDetail', label: 'Flood Zone', value: 'X' },
  { name: 'coverageLimits.building.amountDetail', label: 'Coverage A', value: '$ 314,000' },
  { name: 'premium', 'label': 'Premium', value: '$ 4,635' }
];

export default (product = 'H03') => {
  // Detail Headers get checked first.
  cy.wrap(product === 'H03' ? ho3Headers : af3Headers).each(header => cy.checkDetailHeader(header));
  const sliders = product === 'H03' ? customizeHO3 : customizeAF3;
  // For each slider
  sliders.forEach(({ path, value, defaultValue }) =>
    cy.findDataTag(`${path}-slider`).then($slider => {
      // get the min and max value attributes
      const minValue = $slider.attr('min');
      const maxValue = $slider.attr('max');
      // TODO: CHECK RECAULCUALTE VALUE IS EQUAL
      // and confirm your text fields for min and max match the value.
      cy.findDataTag(`${path}-slider-min`).invoke('text').should('eq', toCurrency(minValue))
        .findDataTag(`${path}-slider-max`).invoke('text').should('eq', toCurrency(maxValue))
        // Change vale
        .findDataTag(`${path}-input`).type(`{selectall}{backspace}${value}`)
        // and reset.
        .findDataTag('reset').should('contain', 'reset').click()
        // Change again
        .findDataTag(`${path}-input`).type(`{selectall}{backspace}${value}`)
        // and recalculate.
        .findDataTag('submit').should('contain', 'recalculate').click().wait('@updateQuote')
        // Confirm your min and max values still are the same
        .findDataTag(`${path}-slider`).invoke('attr', 'min').should('eq', minValue)
        .findDataTag(`${path}-slider`).invoke('attr', 'max').should('eq', maxValue)
        // and those values are still reflected in the ui min/max labels.
        .findDataTag(`${path}-slider-min`).invoke('text').should('eq', toCurrency(minValue))
        .findDataTag(`${path}-slider-max`).invoke('text').should('eq', toCurrency(maxValue))
        // Submit the form,
        .clickSubmit('#QuoteWorkflow').wait('@updateQuote')
        // then go back to customize page.
        .findDataTag('tab-nav-3').click()
        // Confirm your min and max values still are the same
        .findDataTag(`${path}-slider`).invoke('attr', 'min').should('eq', minValue)
        .findDataTag(`${path}-slider`).invoke('attr', 'max').should('eq', maxValue)
        // and those values are still reflected in the ui min/max labels.
        .findDataTag(`${path}-slider-min`).invoke('text').should('eq', toCurrency(minValue))
        .findDataTag(`${path}-slider-max`).invoke('text').should('eq', toCurrency(maxValue))
        .findDataTag(`${path}-input`).type(`{selectall}{backspace}${defaultValue || '0'}`)
        .findDataTag('submit').should('contain', 'recalculate').click().wait('@updateQuote')
    })
    // cy.findDataTag(`${path}-input`).type('{selectall}{backspace}314000')
    //   .get('.segmented-answer-wrapper').first().find('div label.label-segmented:not(.selected)').first().click()
    //   .findDataTag('submit').should('contain', 'recalculate').click().wait('@updateQuote')
  );
};
