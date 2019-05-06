export const quote = {
    _id: '5ca744928001ef001258b375',
    agencyCode: 20000,
    agentCode: 60000,
    companyCode: 'TTIC',
    state: 'FL',
    product: 'HO3',
    quoteNumber: '12-5162296-01',
    effectiveDate: '2019-05-05',
    endDate: '2020-05-05T04:00:00.000Z',
    quoteState: 'Quote Started',
    createdAt: '2019-04-05T12:05:38.742Z',
    updatedAt: '2019-04-05T12:06:01.159Z',
    createdBy: {
      _id: '5ca744928001ef001258b376',
      userId: 'auth0|59419e3a43e76f16f68c3349',
      userName: 'tticcsr'
    },
    updatedBy: {
      _id: '5ca744a98001ef001258b421',
      userId: 'auth0|59419e3a43e76f16f68c3349',
      userName: 'tticcsr'
    },
    billToId: '',
    billToType: 'Policyholder',
    property: {
      townhouseRowhouse: false,
      pool: false,
      poolSecured: false,
      divingBoard: false,
      trampoline: false,
      fireAlarm: false,
      burglarAlarm: false,
      gatedCommunity: false,
      _id: '5ca744928001ef001258b378',
      buildingCodeEffectivenessGrading: 3,
      constructionType: 'MASONRY',
      distanceToFireHydrant: 264.052744,
      distanceToFireStation: 0.79,
      distanceToTidalWater: 17740.8,
      familyUnits: '1-2',
      floodZone: 'X',
      id: '12000000000000001',
      physicalAddress: {
        _id: '5ca744928001ef001258b379',
        address1: '4131 TEST ADDRESS',
        address2: '',
        city: 'SARASOTA',
        county: 'SARASOTA',
        latitude: 27.27967,
        longitude: -82.47786,
        state: 'FL',
        zip: '00001'
      },
      protectionClass: 3,
      residenceType: 'SINGLE FAMILY',
      source: 'CasaClue',
      sprinkler: 'N',
      squareFeet: 2640,
      territory: '715-51',
      timezone: 'America/New_York',
      windMitigation: {
        _id: '5ca744928001ef001258b37a',
        floridaBuildingCodeWindSpeed: 130,
        floridaBuildingCodeWindSpeedDesign: 130,
        internalPressureDesign: 'Other',
        openingProtection: 'Other',
        roofCovering: 'Other',
        roofDeckAttachment: 'Other',
        roofGeometry: 'Other',
        roofToWallConnection: 'Other',
        secondaryWaterResistance: 'Other',
        terrain: 'B',
        windBorneDebrisRegion: 'Yes'
      },
      yearBuilt: 1998,
      yearOfRoof: null
    },
    coverageLimits: {
      _id: '5ca744928001ef001258b37b',
      dwelling: {
        _id: '5ca744928001ef001258b37c',
        amount: 314000,
        displayText: 'Dwelling',
        format: 'Currency',
        letterDesignation: 'A',
        maxAmount: 408000,
        minAmount: 283000
      },
      lossOfUse: {
        _id: '5ca744928001ef001258b37f',
        amount: 31400,
        displayText: 'Loss of Use',
        format: 'Currency',
        letterDesignation: 'D',
        value: 10
      },
      medicalPayments: {
        _id: '5ca744928001ef001258b381',
        amount: 2000,
        displayText: 'Medical Payments',
        format: 'Currency',
        letterDesignation: 'F'
      },
      moldLiability: {
        _id: '5ca744928001ef001258b384',
        amount: 50000,
        displayText: 'Mold Liability',
        format: 'Currency'
      },
      moldProperty: {
        _id: '5ca744928001ef001258b383',
        amount: 10000,
        displayText: 'Mold Property',
        format: 'Currency'
      },
      ordinanceOrLaw: {
        _id: '5ca744928001ef001258b382',
        amount: 25,
        calculatedAmount: 78500,
        displayText: 'Ordinance or Law',
        format: 'Percentage',
        ofCoverageLimit: 'dwelling'
      },
      otherStructures: {
        _id: '5ca744928001ef001258b37d',
        amount: 6280,
        displayText: 'Other Structures',
        format: 'Currency',
        letterDesignation: 'B',
        value: 2
      },
      personalLiability: {
        _id: '5ca744928001ef001258b380',
        amount: 300000,
        displayText: 'Personal Liability',
        format: 'Currency',
        letterDesignation: 'E'
      },
      personalProperty: {
        _id: '5ca744928001ef001258b37e',
        amount: 78500,
        displayText: 'Personal Property',
        format: 'Currency',
        letterDesignation: 'C',
        value: 25
      }
    },
    coverageOptions: {
      sinkholePerilCoverage: {
        displayText: 'Sinkhole Peril Coverage',
        answer: true
      },
      personalPropertyReplacementCost: {
        displayText: 'Personal Property Replacement Cost',
        answer: true
      },
      propertyIncidentalOccupanciesMainDwelling: {
        displayText: 'Property Permitted Incidental Occupancies Main Dwelling',
        answer: false
      },
      propertyIncidentalOccupanciesOtherStructures: {
        displayText: 'Property Permitted Incidental Occupancies Other Structures',
        answer: false
      },
      liabilityIncidentalOccupancies: {
        displayText: 'Liability Permitted Incidental Occupancies',
        answer: false
      }
    },
    deductibles: {
      allOtherPerils: {
        amount: 1000,
        displayText: 'All Other Perils',
        format: 'Currency'
      },
      hurricane: {
        amount: 2,
        calculatedAmount: 6280,
        displayText: 'Hurricane',
        format: 'Percentage',
        ofCoverageLimit: 'dwelling',
        value: 2
      },
      sinkhole: {
        amount: 10,
        calculatedAmount: 31400,
        displayText: 'Sinkhole',
        format: 'Percentage',
        ofCoverageLimit: 'dwelling'
      }
    },
    underwritingAnswers: {
      business: {
        answer: 'No',
        question: 'Is a business conducted on the property?',
        source: 'Customer'
      },
      floodCoverage: {
        answer: 'Yes',
        question: 'Does this property have a separate insurance policy covering flood losses?',
        source: 'Default'
      },
      fourPointUpdates: {
        answer: 'Yes',
        question: 'Has the wiring, plumbing, HVAC, and roof been updated in the last 35 years?',
        source: 'Customer'
      },
      monthsOccupied: {
        answer: '10+',
        question: 'How many months a year does the owner live in the home?',
        source: 'Customer'
      },
      noPriorInsuranceSurcharge: {
        answer: 'No',
        question: 'If not new purchase, please provide proof of prior insurance.',
        source: 'Default'
      },
      previousClaims: {
        answer: 'No claims ever filed',
        question: 'How many claims in the past 5 years?',
        source: 'Customer'
      },
      rented: {
        answer: 'Never',
        question: 'Is the home or any structures on the property ever rented?',
        source: 'Customer'
      }
    },
    additionalInterests: [],
    policyHolders: [
      {
        electronicDelivery: false,
        _id: '5ca744a18001ef001258b3a3',
        emailAddress: 'Batman@gmail.com',
        entityType: 'Person',
        firstName: 'Bruce',
        lastName: 'Wayne',
        order: 0,
        primaryPhoneNumber: '1231231231'
      }
    ],
    underwritingExceptions: [],
    __v: 0,
    cost: {
    totalCost: 125,
    worksheet: {
      calculatedFields: {
        adminExp: 125,
        catExp: 0,
        coverageAFactor: 1.064,
        hurricaneTEFactor: 430.18,
        nonCatExp: 0,
        retentionExp: 0
      },
        inputFields: {
          aopDeductible: 1000,
          companyCode: 'TTIC',
          constructionType: 'M',
          coverageA: 314000,
          coverageB: 6280,
          coverageC: 78500,
          coverageD: 31400,
          currentYear: '2018',
          hurricaneDeductible: 2,
          openingProtection: 'C',
          product: 'HO3',
          replacementCost: true,
          roofGeometry: 'Other',
          sinkholeDeductible: 10,
          state: 'FL',
          version: '201801',
          yearBuilt: 1998,
          zip: '00001'
      },
      lookupFields: {
        baseCost: 125,
        baseCoverageA: 250000,
        claimCost: 1500,
        hurricaneConstructionTypeFactor: 1,
        hurricaneDeductibleFactor: 1,
        hurricaneOpeningProtectionFactor: 1,
        hurricaneRetentionMult: 1.463338,
        hurricaneRoofShapeFactor: 1,
        hurricaneYearBuiltFactor: 0.516541,
        maxCoverageA: 750000,
        minCoverageA: 150000,
        nonCatConstructionLossCost: 0
      }
    }
  },
  rating: {
    _id: '5ca744a88001ef001258b3f9',
    engineCode: 'HO3ByPeril',
    netPremium: 2640,
    rateCode: 201704,
    totalFees: 27,
    totalPremium: 2667,
    worksheet: {
      additionalCoverages: {
        increasedLiabilityMoldFungiLimit: 0,
        increasedPersonalLiabilityLimit: 22,
        increasedPropertyMoldFungiLimit: 0,
        liabilityIncidentalOccupancies: 0,
        otherStructIncLimits: 0,
        propertyIncidentalOccupancies: 0
      },
      additionalCoveragesSum: 22,
      bcegAdjustment: -149,
      elements: {
        ageOfHomeByYearFactors: {
          hurricane: 1.04,
          otherWind: 1.04,
          yearBuilt: 1998
        },
        ageOfHomeFactors: {
          ageOfHome: 21,
          allOtherPerils: 2.496,
          fire: 2.496,
          liability: 2.496,
          sinkhole: 2.496,
          water: 2.496
        },
        baseRates: {
          allOtherPerils: 153.35,
          fire: 309.05,
          hurricane: 613.41,
          liability: 56.96,
          otherWind: 22.98,
          sinkhole: 7.47,
          water: 516.56
        },
        bcegFactors: {
          allOtherPerils: 1,
          fire: 1,
          grade: 3,
          hurricane: 0.911,
          liability: 1,
          otherWind: 0.911,
          sinkhole: 1,
          territoryGroup: 3,
          water: 1
        },
        burglarAlarmFactors: {
          allOtherPerils: 1,
          burglarAlarm: false,
          fire: 1,
          hurricane: 1,
          liability: 1,
          otherWind: 1,
          sinkhole: 1,
          water: 1
        },
        coverageAFactors: {
          allOtherPerils: 2.328,
          fire: 2.328,
          hurricane: 2.328,
          liability: 1,
          otherWind: 2.328,
          sinkhole: 2.328,
          water: 2.328
        },
        coverageBFactors: {
          allOtherPerils: 0.97,
          fire: 0.97,
          hurricane: 0.97,
          liability: 1,
          otherWind: 0.97,
          sinkhole: 0.97,
          water: 0.97
        },
        coverageCFactors: {
          allOtherPerils: 0.925,
          fire: 0.925,
          hurricane: 0.85,
          liability: 1,
          otherWind: 0.925,
          sinkhole: 0.925,
          water: 0.925
        },
        deductibleFactors: {
          allOtherPerils: 1,
          allOtherPerilsDeductible: 1000,
          exWind: false,
          fire: 1,
          hurricane: 1,
          hurricaneDeductible: 2,
          liability: 1,
          otherWind: 1,
          sinkhole: 1,
          water: 1
        },
        fireAlarmAndSprinklerFactors: {
          allOtherPerils: 1,
          fire: 1,
          fireAlarm: false,
          hurricane: 1,
          liability: 1,
          otherWind: 1,
          sinkhole: 1,
          sprinkler: 'N',
          water: 1
        },
        noPriorInsuranceFactors: {
          allOtherPerils: 1,
          fire: 1,
          hurricane: 1,
          liability: 1,
          noPriorInsurance: false,
          otherWind: 1,
          sinkhole: 1,
          water: 1
          },
        ordinanceOrLawFactors: {
          allOtherPerils: 1,
          fire: 1,
          hurricane: 1,
          liability: 1,
          ordinanceOrLaw: false,
          otherWind: 1,
          sinkhole: 1,
          water: 1
        },
        protectionClassFactors: {
          allOtherPerils: 0.852,
          constructionCode: 'M',
          constructionType: 'Masonry',
          fire: 0.852,
          hurricane: 0.817,
          liability: 1,
          otherWind: 0.817,
          protectionClass: 3,
          sinkhole: 0.852,
          water: 0.852
        },
        replacementCostFactors: {
          allOtherPerils: 1.125,
          fire: 1.125,
          hurricane: 1.125,
          liability: 1,
          otherWind: 1.125,
          replacementCost: true,
          sinkhole: 1.125,
          water: 1.125
        },
        seasonalFactors: {
          allOtherPerils: 1,
          fire: 1,
          hurricane: 1,
          liability: 1,
          otherWind: 1,
          seasonal: false,
          sinkhole: 1,
          water: 1
        },
        territoryFactors: {
          allOtherPerils: 0.205,
          code: '715-51',
          fire: 0.205,
          group: 3,
          hurricane: 1.43,
          liability: 0.203,
          minPremium: 0.002,
          name: 'Sarasota,Remainder',
          otherWind: 1.43,
          sinkhole: 1.598,
          water: 0.205
        },
        townRowHouseFactors: {
          allOtherPerils: 1,
          fire: 1,
          hurricane: 1,
          liability: 1,
          otherWind: 1,
          protectionClass: 3,
          sinkhole: 1,
          units: '1-2',
          water: 1
        },
        windMitigationFactors: {
          allOtherPerils: 1,
          fire: 1,
          hurricane: 1,
          liability: 1,
          otherWind: 1,
          sinkhole: 1,
          water: 1,
          windMitigationDiscount: 0
        }
      },
      fees: {
        citizensFee: 0,
        empTrustFee: 2,
        fhcfFee: 0,
        figaFee: 0,
        mgaPolicyFee: 25
      },
      minimumPremiumAdjustment: 0,
      netPremium: 2640,
      perilPremiums: {
        allOtherPerils: 157,
        fire: 317,
        hurricane: 1466,
        liability: 29,
        otherWind: 60,
        sinkhole: 60,
        water: 529
      },
      perilPremiumsSum: 2618,
      subtotalPremium: 2640,
      totalFees: 27,
      totalPremium: 2667
    }
  },
  additionalPolicyholder: false,
  sameAsPropertyAddress: false
};
