import React from 'react';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import AddAdditionalInterest from './AddAdditionalInterest';
import AdditionalInterestModal from '../Common/AIPopup';

const middlewares = [];
const mockStore = configureStore(middlewares);

const MOCK_ADDITIIONAL_INTERESTS = [
  {
    "active": true,
    "_id": "5c914ca2d9fac4000ee88fbc",
    "mailingAddress": {
      "_id": "5c914ca2d9fac4000ee88fbe",
      "address1": "PO BOX 961291",
      "address2": "",
      "city": "FORT WORTH",
      "country": {
        "_id": "5c914ca2d9fac4000ee88fbf",
        "code": "USA",
        "displayText": "United States of America"
      },
      "state": "TX",
      "zip": "76161"
    },
    "name1": "BANK OF AMERICA, NA",
    "name2": "ISAOA/ATIMA",
    "order": 0,
    "referenceNumber": "",
    "type": "Mortgagee"
  },
  {
    "active": true,
    "_id": "5c914cb0d9fac4000ee8900e",
    "mailingAddress": {
      "_id": "5c914cb0d9fac4000ee89010",
      "address1": "23432",
      "address2": "",
      "city": "dfds",
      "country": {
        "_id": "5c914cb0d9fac4000ee89011",
        "code": "USA",
        "displayText": "United States of America"
      },
      "state": "dd",
      "zip": "33243"
    },
    "name1": "m",
    "name2": "m",
    "order": 0,
    "referenceNumber": "",
    "type": "Additional Insured"
  },
  {
    "active": true,
    "_id": "5c914cbdd7bd33000e9f8f40",
    "mailingAddress": {
      "_id": "5c914cbdd7bd33000e9f8f42",
      "address1": "3223",
      "address2": "",
      "city": "dsf",
      "country": {
        "_id": "5c914cbdd7bd33000e9f8f43",
        "code": "USA",
        "displayText": "United States of America"
      },
      "state": "dd",
      "zip": "33333"
    },
    "name1": "m",
    "name2": "m",
    "order": 0,
    "referenceNumber": "",
    "type": "Additional Interest"
  },
  {
    "active": true,
    "_id": "5c914cc3d7bd33000e9f8f7c",
    "mailingAddress": {
      "_id": "5c914cc3d7bd33000e9f8f7e",
      "address1": "PO BOX 522941",
      "address2": "",
      "city": "MIAMI",
      "country": {
        "_id": "5c914cc3d7bd33000e9f8f7f",
        "code": "USA",
        "displayText": "United States of America"
      },
      "state": "FL",
      "zip": "33152"
    },
    "name1": "STANDARD PREMIUM FINANCE MANAGEMENT CORP.",
    "name2": "",
    "order": 0,
    "referenceNumber": "",
    "type": "Premium Finance"
  }
];

const MOCK_QUOTE = {
  "_id": "5c912720d9fac4000ee85156",
  "agencyCode": 20000,
  "companyCode": "TTIC",
  "state": "FL",
  "product": "HO3",
  "quoteNumber": "12-5160868-01",
  "effectiveDate": "2019-04-03T04:00:00.000Z",
  "endDate": "2020-04-03T04:00:00.000Z",
  "quoteState": "Application Started",
  "createdAt": "2019-03-19T17:30:08.076Z",
  "updatedAt": "2019-03-19T20:10:43.306Z",
  "createdBy": {
    "_id": "5c912720d9fac4000ee85157",
    "userId": "auth0|594199c30b874417c3157ae1",
    "userName": "ttic-20000"
  },
  "updatedBy": {
    "_id": "5c914cc3d7bd33000e9f8f89",
    "userId": "auth0|59419e3a43e76f16f68c3349",
    "userName": "tticcsr"
  },
  "billToId": "5c914cc3d7bd33000e9f8f7c",
  "billToType": "Policyholder",
  "property": {
    "townhouseRowhouse": false,
    "pool": false,
    "poolSecured": false,
    "divingBoard": false,
    "trampoline": false,
    "fireAlarm": false,
    "burglarAlarm": false,
    "gatedCommunity": false,
    "_id": "5c912720d9fac4000ee85159",
    "buildingCodeEffectivenessGrading": 99,
    "constructionType": "FRAME",
    "distanceToFireStation": 2.1,
    "distanceToTidalWater": 2164.8,
    "familyUnits": "1-2",
    "floodZone": "X",
    "id": "12000000000000003",
    "physicalAddress": {
      "_id": "5c912720d9fac4000ee8515a",
      "address1": "2600 TEST ADDRESS",
      "address2": "",
      "city": "FERNANDINA BEACH",
      "county": "NASSAU",
      "latitude": 30.60876,
      "longitude": -81.44811,
      "state": "FL",
      "zip": "00003"
    },
    "protectionClass": 5,
    "residenceType": "SINGLE FAMILY",
    "source": "CasaClue",
    "sprinkler": "N",
    "squareFeet": 2144,
    "territory": "532-0",
    "timezone": "America/New_York",
    "windMitigation": {
      "_id": "5c912720d9fac4000ee8515b",
      "floridaBuildingCodeWindSpeed": 120,
      "floridaBuildingCodeWindSpeedDesign": 120,
      "internalPressureDesign": "Other",
      "openingProtection": "Other",
      "roofCovering": "Other",
      "roofDeckAttachment": "Other",
      "roofGeometry": "Other",
      "roofToWallConnection": "Other",
      "secondaryWaterResistance": "Other",
      "terrain": "B",
      "windBorneDebrisRegion": "Yes"
    },
    "yearBuilt": 1981,
    "yearOfRoof": null
  },
  "coverageLimits": {
    "_id": "5c912720d9fac4000ee8515c",
    "dwelling": {
      "_id": "5c912720d9fac4000ee8515d",
      "amount": 254000,
      "displayText": "Dwelling",
      "format": "Currency",
      "letterDesignation": "A",
      "maxAmount": 330000,
      "minAmount": 229000
    },
    "lossOfUse": {
      "_id": "5c912720d9fac4000ee85160",
      "amount": 25400,
      "displayText": "Loss of Use",
      "format": "Currency",
      "letterDesignation": "D"
    },
    "medicalPayments": {
      "_id": "5c912720d9fac4000ee85162",
      "amount": 2000,
      "displayText": "Medical Payments",
      "format": "Currency",
      "letterDesignation": "F"
    },
    "moldLiability": {
      "_id": "5c912720d9fac4000ee85165",
      "amount": 50000,
      "displayText": "Mold Liability",
      "format": "Currency"
    },
    "moldProperty": {
      "_id": "5c912720d9fac4000ee85164",
      "amount": 10000,
      "displayText": "Mold Property",
      "format": "Currency"
    },
    "ordinanceOrLaw": {
      "_id": "5c912720d9fac4000ee85163",
      "amount": 25,
      "displayText": "Ordinance or Law",
      "format": "Percentage",
      "ofCoverageLimit": "dwelling"
    },
    "otherStructures": {
      "_id": "5c912720d9fac4000ee8515e",
      "amount": 5080,
      "displayText": "Other Structures",
      "format": "Currency",
      "letterDesignation": "B"
    },
    "personalLiability": {
      "_id": "5c912720d9fac4000ee85161",
      "amount": 300000,
      "displayText": "Personal Liability",
      "format": "Currency",
      "letterDesignation": "E"
    },
    "personalProperty": {
      "_id": "5c912720d9fac4000ee8515f",
      "amount": 63500,
      "displayText": "Personal Property",
      "format": "Currency",
      "letterDesignation": "C"
    }
  },
  "coverageOptions": {
    "sinkholePerilCoverage": {
      "displayText": "Sinkhole Peril Coverage",
      "answer": true
    },
    "personalPropertyReplacementCost": {
      "displayText": "Personal Property Replacement Cost",
      "answer": true
    },
    "propertyIncidentalOccupanciesMainDwelling": {
      "displayText": "Property Permitted Incidental Occupancies Main Dwelling",
      "answer": false
    },
    "propertyIncidentalOccupanciesOtherStructures": {
      "displayText": "Property Permitted Incidental Occupancies Other Structures",
      "answer": false
    },
    "liabilityIncidentalOccupancies": {
      "displayText": "Liability Permitted Incidental Occupancies",
      "answer": false
    }
  },
  "deductibles": {
    "allOtherPerils": {
      "amount": 1000,
      "displayText": "All Other Perils",
      "format": "Currency"
    },
    "hurricane": {
      "amount": 2,
      "calculatedAmount": 5080,
      "displayText": "Hurricane",
      "format": "Percentage",
      "ofCoverageLimit": "dwelling"
    },
    "sinkhole": {
      "amount": 10,
      "calculatedAmount": 25400,
      "displayText": "Sinkhole",
      "format": "Percentage",
      "ofCoverageLimit": "dwelling"
    }
  },
  "underwritingAnswers": {
    "business": {
      "answer": "No",
      "question": "Is a business conducted on the property?",
      "source": "Customer"
    },
    "floodCoverage": {
      "answer": "Yes",
      "question": "Does this property have a separate insurance policy covering flood losses?",
      "source": "Default"
    },
    "fourPointUpdates": {
      "answer": "Yes",
      "question": "Has the wiring, plumbing, HVAC, and roof been updated in the last 35 years?",
      "source": "Customer"
    },
    "monthsOccupied": {
      "answer": "10+",
      "question": "How many months a year does the owner live in the home?",
      "source": "Customer"
    },
    "noPriorInsuranceSurcharge": {
      "answer": "No",
      "question": "If not new purchase, please provide proof of prior insurance.",
      "source": "Default"
    },
    "previousClaims": {
      "answer": "No claims ever filed",
      "question": "How many claims in the past 5 years?",
      "source": "Customer"
    },
    "rented": {
      "answer": "Never",
      "question": "Is the home or any structures on the property ever rented?",
      "source": "Customer"
    }
  },
  "additionalInterests": MOCK_ADDITIIONAL_INTERESTS,
  "policyHolders": [
    {
      "electronicDelivery": false,
      "_id": "5c91272ad9fac4000ee85184",
      "emailAddress": "exzeoqa@exzeo.com",
      "entityType": "Person",
      "firstName": "BATMAN",
      "lastName": "ROBIN A003",
      "order": 0,
      "primaryPhoneNumber": "7271231234"
    }
  ],
  "underwritingExceptions": [
    {
      "fields": [],
      "_id": "5c914c96d7bd33000e9f8edc",
      "action": "Missing Info",
      "active": true,
      "agentMessage": "Missing required information to complete quote -  Mailing/Billing Info",
      "canOverride": false,
      "category": "Coverages & Deductibles",
      "code": "003",
      "displayText": "Missing Info - Mailing/Billing Info",
      "internalMessage": "Missing required information to complete quote -  Mailing/Billing Info",
      "overridden": false,
      "overriddenAt": null,
      "overriddenBy": {
        "_id": "5c914c96d7bd33000e9f8edd",
        "userId": null,
        "userName": null
      }
    }
  ],
  "__v": 0,
  "agentCode": 60000,
  "cost": {
    "totalCost": 140,
    "worksheet": {
      "calculatedFields": {
        "adminExp": 125,
        "catExp": 0,
        "coverageAFactor": 1.004,
        "hurricaneTEFactor": 347.98,
        "nonCatExp": 15,
        "retentionExp": 0
      },
      "inputFields": {
        "aopDeductible": 1000,
        "companyCode": "TTIC",
        "constructionType": "F",
        "coverageA": 254000,
        "coverageB": 5080,
        "coverageC": 63500,
        "coverageD": 25400,
        "currentYear": "2018",
        "hurricaneDeductible": 2,
        "openingProtection": "C",
        "product": "HO3",
        "replacementCost": true,
        "roofGeometry": "Other",
        "sinkholeDeductible": 10,
        "state": "FL",
        "version": "201801",
        "yearBuilt": 1994,
        "zip": "00003"
      },
      "lookupFields": {
        "baseCost": 125,
        "baseCoverageA": 250000,
        "claimCost": 1500,
        "hurricaneConstructionTypeFactor": 1.316403,
        "hurricaneDeductibleFactor": 1,
        "hurricaneOpeningProtectionFactor": 1,
        "hurricaneRetentionMult": 1.463338,
        "hurricaneRoofShapeFactor": 1,
        "hurricaneYearBuiltFactor": 1,
        "maxCoverageA": 750000,
        "minCoverageA": 150000,
        "nonCatConstructionLossCost": 15
      }
    }
  },
  "rating": {
    "_id": "5c914c90d9fac4000ee88ef9",
    "engineCode": "HO3ByPeril",
    "netPremium": 1612,
    "rateCode": 201704,
    "totalFees": 27,
    "totalPremium": 1639,
    "worksheet": {
      "additionalCoverages": {
        "increasedLiabilityMoldFungiLimit": 0,
        "increasedPersonalLiabilityLimit": 22,
        "increasedPropertyMoldFungiLimit": 0,
        "liabilityIncidentalOccupancies": 0,
        "otherStructIncLimits": 0,
        "propertyIncidentalOccupancies": 0
      },
      "additionalCoveragesSum": 22,
      "bcegAdjustment": 5,
      "elements": {
        "ageOfHomeByYearFactors": {
          "hurricane": 1.075,
          "otherWind": 1.075,
          "yearBuilt": 1981
        },
        "ageOfHomeFactors": {
          "ageOfHome": 38,
          "allOtherPerils": 2.54,
          "fire": 2.54,
          "liability": 2.54,
          "sinkhole": 2.54,
          "water": 2.54
        },
        "baseRates": {
          "allOtherPerils": 153.35,
          "fire": 309.05,
          "hurricane": 613.41,
          "liability": 56.96,
          "otherWind": 22.98,
          "sinkhole": 7.47,
          "water": 516.56
        },
        "bcegFactors": {
          "allOtherPerils": 1,
          "fire": 1,
          "grade": 99,
          "hurricane": 1.01,
          "liability": 1,
          "otherWind": 1.01,
          "sinkhole": 1,
          "territoryGroup": 3,
          "water": 1
        },
        "burglarAlarmFactors": {
          "allOtherPerils": 1,
          "burglarAlarm": false,
          "fire": 1,
          "hurricane": 1,
          "liability": 1,
          "otherWind": 1,
          "sinkhole": 1,
          "water": 1
        },
        "coverageAFactors": {
          "allOtherPerils": 1.91,
          "fire": 1.91,
          "hurricane": 1.91,
          "liability": 1,
          "otherWind": 1.91,
          "sinkhole": 1.91,
          "water": 1.91
        },
        "coverageBFactors": {
          "allOtherPerils": 0.97,
          "fire": 0.97,
          "hurricane": 0.97,
          "liability": 1,
          "otherWind": 0.97,
          "sinkhole": 0.97,
          "water": 0.97
        },
        "coverageCFactors": {
          "allOtherPerils": 0.925,
          "fire": 0.925,
          "hurricane": 0.85,
          "liability": 1,
          "otherWind": 0.925,
          "sinkhole": 0.925,
          "water": 0.925
        },
        "deductibleFactors": {
          "allOtherPerils": 1,
          "allOtherPerilsDeductible": 1000,
          "exWind": false,
          "fire": 1,
          "hurricane": 1,
          "hurricaneDeductible": 2,
          "liability": 1,
          "otherWind": 1,
          "sinkhole": 1,
          "water": 1
        },
        "fireAlarmAndSprinklerFactors": {
          "allOtherPerils": 1,
          "fire": 1,
          "fireAlarm": false,
          "hurricane": 1,
          "liability": 1,
          "otherWind": 1,
          "sinkhole": 1,
          "sprinkler": "N",
          "water": 1
        },
        "noPriorInsuranceFactors": {
          "allOtherPerils": 1,
          "fire": 1,
          "hurricane": 1,
          "liability": 1,
          "noPriorInsurance": false,
          "otherWind": 1,
          "sinkhole": 1,
          "water": 1
        },
        "ordinanceOrLawFactors": {
          "allOtherPerils": 1,
          "fire": 1,
          "hurricane": 1,
          "liability": 1,
          "ordinanceOrLaw": false,
          "otherWind": 1,
          "sinkhole": 1,
          "water": 1
        },
        "protectionClassFactors": {
          "allOtherPerils": 1,
          "constructionCode": "F",
          "constructionType": "Frame",
          "fire": 1,
          "hurricane": 1,
          "liability": 1,
          "otherWind": 1,
          "protectionClass": 5,
          "sinkhole": 1,
          "water": 1
        },
        "replacementCostFactors": {
          "allOtherPerils": 1.125,
          "fire": 1.125,
          "hurricane": 1.125,
          "liability": 1,
          "otherWind": 1.125,
          "replacementCost": true,
          "sinkhole": 1.125,
          "water": 1.125
        },
        "seasonalFactors": {
          "allOtherPerils": 1,
          "fire": 1,
          "hurricane": 1,
          "liability": 1,
          "otherWind": 1,
          "seasonal": false,
          "sinkhole": 1,
          "water": 1
        },
        "territoryFactors": {
          "allOtherPerils": 0.213,
          "code": "532-0",
          "fire": 0.214,
          "group": 3,
          "hurricane": 0.408,
          "liability": 0.212,
          "minPremium": 0.003,
          "name": "Nassau,Coastal",
          "otherWind": 0.408,
          "sinkhole": 0.966,
          "water": 0.213
        },
        "townRowHouseFactors": {
          "allOtherPerils": 1,
          "fire": 1,
          "hurricane": 1,
          "liability": 1,
          "otherWind": 1,
          "protectionClass": 5,
          "sinkhole": 1,
          "units": "1-2",
          "water": 1
        },
        "windMitigationFactors": {
          "allOtherPerils": 1,
          "fire": 1,
          "hurricane": 1,
          "liability": 1,
          "otherWind": 1,
          "sinkhole": 1,
          "water": 1,
          "windMitigationDiscount": 0
        }
      },
      "fees": {
        "citizensFee": 0,
        "empTrustFee": 2,
        "fhcfFee": 0,
        "figaFee": 0,
        "mgaPolicyFee": 25
      },
      "minimumPremiumAdjustment": 0,
      "netPremium": 1612,
      "perilPremiums": {
        "allOtherPerils": 160,
        "fire": 324,
        "hurricane": 481,
        "liability": 31,
        "otherWind": 20,
        "sinkhole": 35,
        "water": 539
      },
      "perilPremiumsSum": 1590,
      "subtotalPremium": 1612,
      "totalFees": 27,
      "totalPremium": 1639
    }
  }
};

describe('Testing AddAdditionalInterest component', () => {

  const initialState = {
    quoteState: { quote: MOCK_QUOTE },
    appState: {
      modelName: 'bb',
      data: {}
    }
  };
  const store = mockStore(initialState);
  const props = {
    updateQuote() {},
    handleSubmit() {},
    history: { replace(){ }},
    quote: MOCK_QUOTE,
    fieldQuestions: [],
    dispatch: store.dispatch,
    appState: {
      modelName: 'bb',
      data: {
        submitting: false
      }
    }
  };

  it('should test connected app and click events', () => {
    const wrapper = mount(<AddAdditionalInterest store={store} {...props} />);
    expect(wrapper.exists()).toBe(true);

    wrapper.find(`button[data-test="mortgagee-add"]`).simulate('click');
    wrapper.find(`button[data-test="ains-add"]`).simulate('click');
    wrapper.find(`button[data-test="ai-add"]`).simulate('click');
    wrapper.find(`button[data-test="premium-finance-add"]`).simulate('click');

    const workflowSteps = wrapper.find(`.workflow-steps`);
    workflowSteps.find(`button`).simulate('submit');

  });

  it(`should test goToStep`, () => {

    const wrapper = mount(<AddAdditionalInterest store={store} {...props} />);
      expect(wrapper.exists()).toBe(true);
      
      const resultCards = wrapper.find(`.result-cards`);
      resultCards.find('a.edit').everyWhere((x) => {
        x.simulate('click');
        return x;
      });
  });

  it(`should test remove AI`, () => {

    const wrapper = mount(<AddAdditionalInterest store={store} {...props} />);
      expect(wrapper.exists()).toBe(true);
      
      const resultCards = wrapper.find(`.result-cards`);
      resultCards.find('a.remove').everyWhere((x) => {
        x.simulate('click');
        return x;
      });

      const aiModal = wrapper.find(AdditionalInterestModal);
      expect(aiModal.exists()).toBe(true);

      aiModal.find('button.btn-primary').simulate('click');
      aiModal.find('button.btn-secondary').simulate('click');
  });


  it(`should test click events for Bill Payer`, () => {

    const changeToBillPAyerAIs = MOCK_ADDITIIONAL_INTERESTS.map(ai => {
      if(ai.type === 'Premium Finance') ai.type = 'Bill Payer';
      return ai;
    });

    props.quote.addAdditionalInterests = changeToBillPAyerAIs;
    const wrapper = mount(<AddAdditionalInterest store={store} {...props} />);
      expect(wrapper.exists()).toBe(true);
      wrapper.find(`button[data-test="bill-payer-add"]`).simulate('click');
  });

  it(`should test goToStep Bill Payer`, () => {
    const changeToBillPAyerAIs = MOCK_ADDITIIONAL_INTERESTS.map(ai => {
      if(ai.type === 'Premium Finance') ai.type = 'Bill Payer';
      return ai;
    });

    props.quote.addAdditionalInterests = changeToBillPAyerAIs;
    const wrapper = mount(<AddAdditionalInterest store={store} {...props} />);
      expect(wrapper.exists()).toBe(true);
      
      const resultCards = wrapper.find(`.result-cards`);
      resultCards.find('a.edit').everyWhere((x) => {
        x.simulate('click');
        return x;
      });
  });
  

  it(`should test remove AI Bill Payer`, () => {
    const changeToBillPAyerAIs = MOCK_ADDITIIONAL_INTERESTS.map(ai => {
      if(ai.type === 'Premium Finance') ai.type = 'Bill Payer';
      return ai;
    });

    props.quote.addAdditionalInterests = changeToBillPAyerAIs;
    const wrapper = mount(<AddAdditionalInterest store={store} {...props} />);
      expect(wrapper.exists()).toBe(true);
      
      const resultCards = wrapper.find(`.result-cards`);
      resultCards.find('a.remove').everyWhere((x) => {
        x.simulate('click');
        return x;
      });

      const aiModal = wrapper.find(AdditionalInterestModal);
      expect(aiModal.exists()).toBe(true);

      aiModal.find('button.btn-primary').simulate('click');
      aiModal.find('button.btn-secondary').simulate('click');


  });

});
