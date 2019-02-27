import _ from 'lodash';

import routes from "../../support/routes";
import {
  navLanding,
  navSearchAddress,
  navCustomerInfo
} from '../../helpers';
import uwData from '../../fixtures/stockData/underwriting.json';

describe('Underwriting Testing', () => {
  const fields = ['rented', 'previousClaims', 'monthsOccupied', 'business'];

  const toggleExcept = (except = [], values) => {
    Object.entries(values).forEach(([key, value]) => {
      if (!except.includes(key)) {
        cy.findDataTag(`${key}`).find(`input[value="${value}"] + span`).click();
      };
    });
  };

  const stubWithBlankAnswers = () => {
    cy.fixture('stubs/getQuoteServiceRequest').then(fx => {
      routes();
      const currentFixture = _.cloneDeep(fx);
      _.mergeWith(currentFixture, { result: { ...currentFixture.result, underwritingAnswers: {} } }, (obj, src) => !_.isNil(src) ? src : obj);
      cy.route('POST', '/svc?getQuoteServiceRequest', currentFixture).as('getQuoteServiceRequest');
    });
  };

  before('Go to Underwriting page', () => {
    stubWithBlankAnswers();
    cy.login();
    navLanding();
    navSearchAddress();
    navCustomerInfo();
  });

  beforeEach('Establish fixtures', () => {
    stubWithBlankAnswers();
  });

  it('All Inputs Empty Value', () => {
    cy.submitAndCheckValidation(fields);
  });

  it('"Is the home or any structure on the property ever rented?" Empty Value', () => {
    cy.reload();
    toggleExcept(['rented'], uwData);
    cy.submitAndCheckValidation(['rented']);
  });

  it('"When was the last claim filed?" Empty Value', () => {
    cy.reload();
    toggleExcept(['previousClaims'], uwData);
    cy.submitAndCheckValidation(['previousClaims']);
  });

  it('"How many months a year does the owner live in the home?" Empty Value', () => {
    cy.reload();
    toggleExcept(['monthsOccupied'], uwData);
    cy.submitAndCheckValidation(['monthsOccupied']);
  });

  it('"Is a business conducted on the property?" Empty Value', () => {
    cy.reload();
    toggleExcept(['business'], uwData);
    cy.submitAndCheckValidation(['business']);
  });
});
