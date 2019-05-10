const toCurrency = value =>
  `$ ${String(value).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;

export default sliders =>
  // For each slider
  sliders.forEach(({ path, value }) =>
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
        // Get the first unselected answer and select it
        .get('.segmented-answer-wrapper').first().find('div label.label-segmented:not(.selected)').first().click()
        // and recalculate,
        .findDataTag('submit').should('contain', 'recalculate').click().wait('@updateQuote')
        // then confirm your min and max values still are the same
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
    })
  );
