const toCurrency = value =>
  `$ ${String(value).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;

export default sliders =>
  // For each slider
  sliders.forEach(({ path, value }) =>
    cy.findDataTag(`${path}-slider`).then($slider => {
      // get the min and max value attributes
      const minValue = $slider.attr('min');
      const maxValue = $slider.attr('max');
      // and confirm your text fields for min and max match the value.
      cy.findDataTag(`${path}-slider-min`).invoke('text').should('eq', toCurrency(minValue))
        .findDataTag(`${path}-slider-max`).invoke('text').should('eq', toCurrency(maxValue))
        // 
        .findDataTag(`${path}-input`).type(`{selectall}{backspace}${value}`)
        .findDataTag('reset').should('contain', 'reset').click()
        .findDataTag(`${path}-input`).type(`{selectall}{backspace}${value}`)
        .findDataTag('submit').should('contain', 'recalculate').click().wait('@updateQuote')
        .findDataTag(`${path}-slider-min`).invoke('text').should('eq', toCurrency(minValue))
        .findDataTag(`${path}-slider-max`).invoke('text').should('eq', toCurrency(maxValue))
        .get('.segmented-answer-wrapper').first().find('div label.label-segmented:not(.selected)').first().click()
        .findDataTag('submit').should('contain', 'recalculate').click().wait('@updateQuote')
        .findDataTag(`${path}-slider-min`).invoke('text').should('eq', toCurrency(minValue))
        .findDataTag(`${path}-slider-max`).invoke('text').should('eq', toCurrency(maxValue))
        .clickSubmit('#QuoteWorkflow').wait('@updateQuote')
        // and go back to customize page
        .findDataTag('tab-nav-3').click()
        .findDataTag(`${path}-slider-min`).invoke('text').should('eq', toCurrency(minValue))
        .findDataTag(`${path}-slider-max`).invoke('text').should('eq', toCurrency(maxValue))
    })



    // // grab the minimum value
    // cy.findDataTag(`${path}-slider-min`).then($min => {
    //   const minText = $min.text();
    //   const minValue = cy.findDataTag(`${path}-slider`).invoke('attr', 'min').should('eq', ``)
    //   cy.log(minValue)
    //   // and maximum value
    //   cy.findDataTag(`${path}-slider-max`).then($max => {
    //     const maxText = $max.text();
    //     // change value
    //     cy.findDataTag(`${path}-input`).type(`{selectall}{backspace}${value}`)
    //       // reset
    //       .findDataTag('reset').should('contain', 'reset').click()
    //       // change again
    //       .findDataTag(`${path}-input`).type(`{selectall}{backspace}${value}`)
    //       // hit recalc
    //       .findDataTag('submit').should('contain', 'recalculate').click().wait('@updateQuote')
    //       // and confirm the min and max haven't changed.
    //       .findDataTag(`${path}-slider-min`).then($newMinText => expect($newMinText.text()).to.eq(minText))
    //       .findDataTag(`${path}-slider-max`).then($newMaxText => expect($newMaxText.text()).to.eq(maxText))
    //       // Get the first unselected answer and select it
    //       .get('.segmented-answer-wrapper').first().find('div label.label-segmented:not(.selected)').first().click()
    //       // hit recalc
    //       .findDataTag('submit').should('contain', 'recalculate').click().wait('@updateQuote')
    //       // and confirm the min and max haven't changed.
    //       .findDataTag(`${path}-slider-min`).then($newMinText => expect($newMinText.text()).to.eq(minText))
    //       .findDataTag(`${path}-slider-max`).then($newMaxText => expect($newMaxText.text()).to.eq(maxText))
    //       // Submit the form
    //       .clickSubmit('#QuoteWorkflow').wait('@updateQuote')
    //       // and go back to customize page
    //       .findDataTag('tab-nav-3').click()
    //       // and confirm the min and max haven't changed.
    //       .findDataTag(`${path}-slider-min`).then($newMinText => expect($newMinText.text()).to.eq(minText))
    //       .findDataTag(`${path}-slider-max`).then($newMaxText => expect($newMaxText.text()).to.eq(maxText));
    //   });
    // })
  );
