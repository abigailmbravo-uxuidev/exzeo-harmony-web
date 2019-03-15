import startCase from 'lodash/startCase';

// File for you to put useful functions that should not be part of the Cypress object

/**
 * Route stubbing -- if fixtures are off, we use an empty function which Cypress interperets to mean the server response
 * @param {Object} fx
 */
export const stub = fx => Cypress.env('FIXTURES') ? fx : () => { };

/**
 * @param {Object} aiCounts - The number of each type of additional interest to be added.
 * @returns {array} The full additionalInterest array to be used in cy.setFx('stubs/getQuoteServiceRequest', ['result.additionalInterests', additionalInterests]).
 */
export const createAdditionalAIs = (
  { mortgagee = 0, additionalInsured = 0, additionalInterest = 0, premiumFinance = 0, billPayer = 0 }
) => {
  const stockAI = {
    "active": true,
    "_id": "5c8101e848942b000e626a7f",
    "mailingAddress": {
      "_id": "5c8101e848942b000e626a81",
      "address1": "123 Main Street",
      "address2": "Apartment 13-B",
      "city": "Los Angeles",
      "country": {
        "_id": "5c8101e848942b000e626a82",
        "code": "USA",
        "displayText": "United States of America"
      },
      "state": "CA",
      "zip": "75463"
    },
    "name1": "Philip Marlowe",
    "name2": "Jake Gittes",
    "order": 0,
    "referenceNumber": "1234",
    "type": "PLACEHOLDER"
  };
  const total = mortgagee + additionalInsured + additionalInterest + premiumFinance + billPayer;
  const res = Array(total);
  let count = 0;
  Object.entries({ mortgagee, additionalInsured, additionalInterest, premiumFinance, billPayer })
    .filter(([__, value]) => value > 0).forEach(([key, value]) => {
      for (let i = 0; i < value; i++) {
        res[count] = { ...stockAI, type: startCase(key), order: i };
        count++;
      };
    });
  return res;
};
