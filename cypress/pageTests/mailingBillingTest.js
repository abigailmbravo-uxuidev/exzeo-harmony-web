const ho3Headers = [
  { name: 'quoteNumberDetail', label: 'Quote Number', value: '12-' },
  {
    name: 'propertyAddressDetail',
    label: 'Address',
    value: '4131 TEST ADDRESS'
  },
  { name: 'yearBuiltDetail', label: 'Year Built', value: '1998' },
  {
    name: 'constructionTypeDetail',
    label: 'Construction Type',
    value: 'MASONRY'
  },
  {
    name: 'coverageLimits.dwelling.amountDetail',
    label: 'Coverage A',
    value: '$ 284,000'
  }
];

// const af3Headers = [
//   { name: 'quoteNumberDetail', label: 'Quote Number', value: '12-' },
//   {
//     name: 'propertyAddressDetail',
//     label: 'Address',
//     value: '4131 TEST ADDRESS'
//   },
//   { name: 'yearBuiltDetail', label: 'Year Built', value: '1998' },
//   { name: 'FEMAfloodZoneDetail', label: 'FEMA Flood Zone', value: 'X' },
//   {
//     name: 'coverageLimits.building.amountDetail',
//     label: 'Coverage A',
//     value: '$ 267,000'
//   }
// ];

const goToAiPage = () => {
  cy.findDataTag('tab-nav-6').click();
  cy.wait('@getQuestions').then(({ request, response }) => {
    expect(request.body.step).to.equal('additionalInterestsCSR');
    expect(response.body.data.length).to.equal(3);
  });
  cy.get('#AddAdditionalInterestPage').should('exist');
};

const checkBillingOption = (numOfOptions = 1, selected = true) =>
  cy
    .findDataTag('billToId')
    .invoke('attr', 'data-selected')
    .should(selected ? 'not.eq' : 'eq', '')
    .findDataTag('billToId')
    .find('option:not([disabled])')
    .should('have.length', numOfOptions);

export default (product = 'HO3') => {
  cy.task('log', 'Test Mailing Billing Page');
  ////cy.wait('@getBillingOptions')
  ////  .then(({ request }) => {
  ////    expect(request.body.status).to.equal(200);
  ////   });
  ////.then(({ request }) => {
  ////  expect(request.body.data.additionalInterests.length).to.equal(0);
  ////});
  ////
  ////cy.wait('@getBillingOptions')
  ////.then(({ response }) => {
  ////     expect(response.body.status).to.equal(200);
  ////});
  cy.findDataTag('billToId')
    .invoke('attr', 'data-selected')
    .should('not.eq', '')
    .findDataTag('billToId')
    .find('option:not([disabled])')
    .should('have.length', 1);

  checkBillingOption(1);

  cy.wrap(product === 'HO3' ? ho3Headers : af3Headers).each(header =>
    cy.checkDetailHeader(header)
  );

  goToAiPage();
  cy.findDataTag('mortgagee')
    .click()
    .findDataTag('modal')
    .should('exist')
    .chooseReactSelectOption(
      'mortgage_wrapper',
      'bank of america',
      'input#mortgagee-search'
    );
  cy.clickSubmit('div.AdditionalInterestModal', 'ai-modal-submit');
  cy.wait('@updateQuote').then(({ response }) => {
    expect(response.body.status).to.equal(200);
    //.then(({ request, response }) => {
    // expect(
    //   request.body.data.quote.additionalInterests.length,
    //   'Additional Interests: '
    // ).to.equal(1);
    // expect(
    //   request.body.data.quote.additionalInterests[0].type,
    //   'Additional Interest Type: '
    // ).to.equal('Mortgagee');
  });
  cy.clickSubmit('#QuoteWorkflow');
  cy.wait('@getBillingOptions').then(({ response }) => {
    expect(response.body.status).to.equal(200);
  });
  //   expect(
  //     request.body.data.additionalInterests.length,
  //     'Additional Interests: '
  //   ).to.equal(1);
  // });
};
