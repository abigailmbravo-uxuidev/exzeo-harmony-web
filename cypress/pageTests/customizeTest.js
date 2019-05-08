export default sliders =>
  // For each slider
  Object.entries(sliders).forEach(([name, value]) =>
    // grab the minimum value
    cy.findDataTag(`${name}-slider-min`).then($min => {
      const minText = $min.text();
      // and maximum value
      cy.findDataTag(`${name}-slider-max`).then($max => {
        const maxText = $max.text();
        // change value
        cy.findDataTag(`${name}-input`).type(`{selectall}{backspace}${value}`)
          // reset
          .findDataTag('reset').should('contain', 'reset').click()
          // change again
          .findDataTag(`${name}-input`).type(`{selectall}{backspace}${value}`)
          // hit recalc
          .findDataTag('submit').should('contain', 'recalculate').click().wait('@updateQuote')
          // and confirm the min and max haven't changed.
          .findDataTag(`${name}-slider-min`).then($newMinText => expect($newMinText.text()).to.eq(minText))
          .findDataTag(`${name}-slider-max`).then($newMaxText => expect($newMaxText.text()).to.eq(maxText))
          // Get the first unselected answer and select it
          .get('.segmented-answer-wrapper').first().find('div label.label-segmented:not(.selected)').first().click()
          // hit recalc
          .findDataTag('submit').should('contain', 'recalculate').click().wait('@updateQuote')
          // and confirm the min and max haven't changed.
          .findDataTag(`${name}-slider-min`).then($newMinText => expect($newMinText.text()).to.eq(minText))
          .findDataTag(`${name}-slider-max`).then($newMaxText => expect($newMaxText.text()).to.eq(maxText))
          // Submit the form
          .clickSubmit('#QuoteWorkflow').wait('@updateQuote')
          // and go back to customize page
          .findDataTag('tab-nav-3').click()
          // and confirm the min and max haven't changed.
          .findDataTag(`${name}-slider-min`).then($newMinText => expect($newMinText.text()).to.eq(minText))
          .findDataTag(`${name}-slider-max`).then($newMaxText => expect($newMaxText.text()).to.eq(maxText))
      });
    })
  );
