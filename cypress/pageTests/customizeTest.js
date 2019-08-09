import { slidersAF3, customizeRadiosAF3, slidersHO3, customizeRadiosHO3 } from '../fixtures';
import { toCurrency } from '../helpers';

const headersHO3 = [
  { name: 'quoteNumberDetail', label: 'Quote Number', value: '12-' },
  { name: 'propertyAddressDetail', label: 'Address', value: '4131 TEST ADDRESS' },
  { name: 'yearBuiltDetail', label: 'Year Built', value: '1998' },
  { name: 'constructionTypeDetail', label: 'Construction Type', value: 'MASONRY' },
  { name: 'coverageLimits.dwelling.amountDetail', label: 'Coverage A', value: '$ 314,000' },
  { name: 'premium', 'label': 'Premium', value: '$ 2,667' }
];

const headersAF3 = [
  { name: 'quoteNumberDetail', label: 'Quote Number', value: '12-' },
  { name: 'propertyAddressDetail', label: 'Address', value: '4131 TEST ADDRESS' },
  { name: 'yearBuiltDetail', label: 'Year Built', value: '1998' },
  { name: 'floodZoneDetail', label: 'Flood Zone', value: 'X' },
  { name: 'coverageLimits.building.amountDetail', label: 'Coverage A', value: '$ 314,000' },
  { name: 'premium', 'label': 'Premium', value: '$ 312' }
];

const getFields = product =>
  product === 'HO3' ? ({ headers: headersHO3, sliders: slidersHO3, radios: customizeRadiosHO3 })
    : ({ headers: headersAF3, sliders: slidersAF3, radios: customizeRadiosAF3 });

const checkRadioRecalcAndReset = ({ name, testValue, defaultValue }) =>
  cy.findDataTag(`${name}_${testValue}`).click()
    .findDataTag('submit').should('contain', 'recalculate').and('not.be.disabled').click().wait('@updateQuote')
    .findDataTag(`${name}_${defaultValue}`).click()
    .findDataTag('submit').should('contain', 'recalculate').and('not.be.disabled').click().wait('@updateQuote');

export default (product = 'HO3') => {
  const { headers, sliders, radios } = getFields(product);

  // Detail Headers get checked first.
  cy.wrap(headers).each(header => cy.checkDetailHeader(header))
    // Check our radios and recalculate recalculation
    .wrap(radios).each(radio => checkRadioRecalcAndReset(radio))
    // For each slider
    .wrap(sliders).each(({ path, value, defaultValue, callback }) =>
      cy.findDataTag(`${path}-slider`).then($slider => {
        // get the min and max value attributes
        const minValue = $slider.attr('min');
        const maxValue = $slider.attr('max');
        // and confirm your text fields for min and max match the value.
        cy.findDataTag(`${path}-slider-min`).invoke('text').should('eq', toCurrency(minValue))
          .findDataTag(`${path}-slider-max`).invoke('text').should('eq', toCurrency(maxValue))
          // Change value
          .findDataTag(`${path}-input`).type(`{selectall}{backspace}${value}`)
          // and reset.
          .findDataTag('reset').should('contain', 'reset').and('not.be.disabled').click()
          // Change again
          .findDataTag(`${path}-input`).type(`{selectall}{backspace}${value}`)
          // and recalculate.
          .findDataTag('submit').should('contain', 'recalculate').and('not.be.disabled').click().wait('@updateQuote')
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
          .wait(500)
          // Confirm your min and max values still are the same
          .findDataTag(`${path}-slider`).invoke('attr', 'min').should('eq', minValue)
          .findDataTag(`${path}-slider`).invoke('attr', 'max').should('eq', maxValue)
          // and those values are still reflected in the ui min/max labels.
          .findDataTag(`${path}-slider-min`).invoke('text').should('eq', toCurrency(minValue))
          .findDataTag(`${path}-slider-max`).invoke('text').should('eq', toCurrency(maxValue))
          .findDataTag(`${path}-input`).type(`{selectall}{backspace}${defaultValue || '0'}`)
          .findDataTag('submit').should('contain', 'recalculate').and('not.be.disabled').click().wait('@updateQuote').then(({ response }) =>
            // Check that the coverage dwelling limits have been kept up to date with server responses in HO3.
            callback && callback(response)
          );
      })
    );
};
