
export default {
  issueDate: '2019-05-13T21:49:54.999Z',
  additionalInterests: [],
  agencyCode: 20000,
  agentCode: 60000,
  billPlan: 'Annual',
  billToId: '5cd190769347ef0011911262',
  billToType: 'Policyholder',
  companyCode: 'TTIC',
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
  coverageLimits: {
    dwelling: {
      amount: 314000,
      calculatedAmount: null,
      displayText: 'Dwelling',
      format: 'Currency',
      letterDesignation: 'A',
      maxAmount: 408000,
      minAmount: 283000,
      value: 314000
    },
    lossOfUse: {
      amount: 31400,
      calculatedAmount: null,
      displayText: 'Loss of Use',
      format: 'Percentage',
      letterDesignation: 'D',
      ofCoverageLimit: 'dwelling',
      value: 10
    },
    medicalPayments: {
      amount: 2000,
      calculatedAmount: null,
      displayText: 'Medical Payments',
      format: 'Currency',
      letterDesignation: 'F',
      value: 2000
    },
    moldLiability: {
      amount: 50000,
      calculatedAmount: null,
      displayText: 'Mold Liability',
      format: 'Currency',
      value: 50000
    },
    moldProperty: {
      amount: 10000,
      calculatedAmount: null,
      displayText: 'Mold Property',
      format: 'Currency',
      value: 10000
    },
    ordinanceOrLaw: {
      amount: 25,
      calculatedAmount: 78500,
      displayText: 'Ordinance or Law',
      format: 'Percentage',
      ofCoverageLimit: 'dwelling',
      value: 25
    },
    otherStructures: {
      amount: 6280,
      calculatedAmount: null,
      displayText: 'Other Structures',
      format: 'Currency',
      letterDesignation: 'B',
      value: 2
    },
    personalLiability: {
      amount: 300000,
      calculatedAmount: null,
      displayText: 'Personal Liability',
      format: 'Currency',
      letterDesignation: 'E',
      value: 300000
    },
    personalProperty: {
      amount: 78500,
      calculatedAmount: null,
      displayText: 'Personal Property',
      format: 'Currency',
      letterDesignation: 'C',
      value: 25
    }
  },
  coverageOptions: {
    liabilityIncidentalOccupancies: {
      answer: false,
      displayText: 'Liability Permitted Incidental Occupancies'
    },
    personalPropertyReplacementCost: {
      answer: true,
      displayText: 'Personal Property Replacement Cost'
    },
    propertyIncidentalOccupanciesMainDwelling: {
      answer: false,
      displayText: 'Property Permitted Incidental Occupancies Main Dwelling'
    },
    propertyIncidentalOccupanciesOtherStructures: {
      answer: false,
      displayText: 'Property Permitted Incidental Occupancies Other Structures'
    },
    sinkholePerilCoverage: {
      answer: true,
      displayText: 'Sinkhole Peril Coverage'
    }
  },
  deductibles: {
    allOtherPerils: {
      amount: 1000,
      calculatedAmount: null,
      displayText: 'All Other Perils',
      format: 'Currency',
      value: 1000
    },
    hurricane: {
      amount: 2,
      calculatedAmount: 6280,
      displayText: 'Hurricane',
      format: 'Currency',
      value: 2
    },
    sinkhole: {
      amount: 10,
      calculatedAmount: 31400,
      displayText: 'Sinkhole',
      format: 'Percentage',
      ofCoverageLimit: 'dwelling',
      value: 10
    }
  },
  effectiveDate: '2019-05-17T04:00:00.000Z',
  forms: [
    {
      _id: '5cd9e68341e3ca00103ec7bf',
      editionDate: '01 17',
      formName: 'Mailing page',
      formNumber: 'TTIC HO3 Mail Page'
    },
    {
      _id: '5cd9e68341e3ca00103ec7be',
      editionDate: '03 18',
      formName: 'Welcome letter',
      formNumber: 'TTIC NB HO Welcome'
    },
    {
      _id: '5cd9e68341e3ca00103ec7bd',
      editionDate: '01 16',
      formName: 'Privacy Policy',
      formNumber: 'TTIC Privacy'
    },
    {
      _id: '5cd9e68341e3ca00103ec7bc',
      editionDate: '01 17',
      formName: 'Policy Jacket',
      formNumber: 'TTIC HO3J'
    },
    {
      _id: '5cd9e68341e3ca00103ec7bb',
      editionDate: '01 17',
      formName: 'Dec Page',
      formNumber: 'TTIC HO3 DEC'
    },
    {
      _id: '5cd9e68341e3ca00103ec7ba',
      editionDate: '04 17',
      formName: 'Outline Of Coverage',
      formNumber: 'TTIC OC HO3'
    },
    {
      _id: '5cd9e68341e3ca00103ec7b9',
      editionDate: '01 01 06',
      formName: 'Checklist of Coverage',
      formNumber: 'OIR-B1-1670'
    },
    {
      _id: '5cd9e68341e3ca00103ec7b8',
      editionDate: '01 17',
      formName: 'Table of Contents HO3',
      formNumber: 'TTIC HO3 TOC'
    },
    {
      _id: '5cd9e68341e3ca00103ec7b7',
      editionDate: '01 17',
      formName: 'Homeowners 3 - Special Form',
      formNumber: 'TTIC HO3'
    },
    {
      _id: '5cd9e68341e3ca00103ec7b6',
      editionDate: '02 10',
      formName: 'Notice of Premium Discounts for Hurricane Loss Mitigation',
      formNumber: 'OIR-B1-1655'
    },
    {
      _id: '5cd9e68341e3ca00103ec7b5',
      editionDate: '10 16',
      formName: 'No Section II Liab Cov Home Daycare',
      formNumber: 'TTIC HO 04 96'
    },
    {
      _id: '5cd9e68341e3ca00103ec7b4',
      editionDate: '05 18',
      formName: 'Sinkhole Loss Coverage',
      formNumber: 'TTIC HO3 SLCR'
    },
    {
      _id: '5cd9e68341e3ca00103ec7b3',
      editionDate: '01 17',
      formName: 'Sinkhole Loss Coverage - FL',
      formNumber: 'TTIC 23 94'
    },
    {
      _id: '5cd9e68341e3ca00103ec7b2',
      editionDate: '10 00',
      formName: 'Personal Property Replacement Cost',
      formNumber: 'HO 04 90'
    },
    {
      _id: '5cd9e68341e3ca00103ec7b1',
      editionDate: '01 17',
      formName: 'Deductible Options',
      formNumber: 'TTIC HO3 DO'
    },
    {
      _id: '5cd9e68341e3ca00103ec7b0',
      editionDate: '04 17',
      formName: 'Ordinance or Law Coverage',
      formNumber: 'TTIC HO3 OL'
    },
    {
      _id: '5cd9e68341e3ca00103ec7af',
      editionDate: '05 05',
      formName: 'Calendar Year Hurricane Deductible FL',
      formNumber: 'HO 03 51'
    },
    {
      _id: '5cd9e68341e3ca00103ec7ae',
      editionDate: '01 16',
      formName: 'Invoice',
      formNumber: 'TTIC PD'
    }
  ],
  policyHolderMailingAddress: {
    _id: '5cd9e68341e3ca00103ec7c0',
    address1: '4131 TEST ADDRESS',
    careOf: '',
    city: 'SARASOTA',
    country: {
      _id: '5cd9e60a3cf61200118a136f',
      code: 'USA',
      displayText: 'United States of America'
    },
    state: 'FL',
    zip: '00001'
  },
  policyHolders: [
    {
      electronicDelivery: false,
      _id: '5cd310b8c7ab5f0011400b5f',
      emailAddress: 'MSARMIENTO@HCPCI.COM',
      entityType: 'Person',
      firstName: 'BATMAN',
      lastName: 'ROBIN',
      order: 0,
      primaryPhoneNumber: '7271231234'
    }
  ],
  product: 'HO3',
  property: {
    townhouseRowhouse: false,
    pool: false,
    poolSecured: false,
    divingBoard: false,
    trampoline: false,
    fireAlarm: false,
    burglarAlarm: false,
    sprinkler: 'N',
    gatedCommunity: false,
    baseFloodElevation: null,
    _id: '5cd1905a03446a0010bab00f',
    FEMAfloodZone: 'X',
    birdcage: null,
    buildingCodeEffectivenessGrading: 3,
    constructionType: 'MASONRY',
    coverageLimits: {
      dwelling: {
        amount: '314000',
        displayText: 'Dwelling',
        format: 'Currency'
      }
    },
    distanceToFireHydrant: 264.052744,
    distanceToFireStation: 0.79,
    distanceToTidalWater: 17740.8,
    familyUnits: '1-2',
    floodZone: 'X',
    id: '12000000000000001',
    physicalAddress: {
      _id: '5cd1905a03446a0010bab010',
      address1: '4131 TEST ADDRESS',
      address2: '',
      city: 'SARASOTA',
      county: 'SARASOTA',
      latitude: 27.27967,
      longitude: -82.47786,
      state: 'FL',
      zip: '00001'
    },
    poolfence: null,
    protectionClass: 3,
    relativeElevation: 99,
    relativeElevation1: null,
    relativeElevation2: null,
    residenceType: 'SINGLE FAMILY',
    source: 'CasaClue',
    squareFeet: 2640,
    territory: '715-51',
    timezone: 'AMERICA/NEW_YORK',
    windMitigation: {
      _id: '5cd1905a03446a0010bab011',
      floridaBuildingCodeWindSpeed: 130,
      floridaBuildingCodeWindSpeedDesign: 130,
      internalPressureDesign: 'test ipd',
      openingProtection: 'test op',
      roofCovering: 'test covering',
      roofDeckAttachment: 'test roofdeckattachment',
      roofGeometry: 'test geometry',
      roofToWallConnection: 'test roof to wall value',
      secondaryWaterResistance: 'test swr value',
      terrain: 'B',
      windBorneDebrisRegion: 'Yes'
    },
    yearBuilt: 1998,
    yearOfRoof: 2001
  },
  rating: {
    windMitigationDiscount: 0,
    _id: '5cd9e5f63cf61200118a135e',
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
  sourceNumber: '12-5165822-01',
  state: 'FL',
  transactionType: 'New Business',
  underwritingAnswers: {
    business: {
      answer: 'No',
      question: 'Is a business conducted on the property?',
      source: 'Customer'
    },
    fourPointUpdates: {
      answer: 'Yes',
      question: 'Have the wiring, plumbing, and HVAC been updated in the last 35 years?',
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
      source: 'Customer'
    },
    previousClaims: {
      answer: 'No claims ever filed',
      question: 'When was the last claim filed?',
      source: 'Customer'
    },
    rented: {
      answer: 'Never',
      question: 'Is the home or any structures on the property ever rented?',
      source: 'Customer'
    }
  },
  updatedAt: '2019-05-13T21:49:54.935Z',
  updatedBy: {
    _id: '5cd9e68341e3ca00103ec7c7',
    userId: 'auth0|SYSTEMUSER|0',
    userName: 'SYSTEMUSER'
  },
  createdAt: '2019-05-13T21:49:54.935Z',
  createdBy: {
    _id: '5cd9e68341e3ca00103ec7c8',
    userId: 'auth0|SYSTEMUSER|0',
    userName: 'SYSTEMUSER'
  },
  policyNumber: '12-1016071-01',
  policyTerm: 1,
  policyVersion: 0,
  policyAccountCode: 10000,
  endDate: '2020-05-17T04:00:00.000Z',
  status: 'Policy Issued',
  cancelDate: null,
  cancelReason: null,
  nextActionNeeded: null,
  nextActionDate: null,
  nextActionCancelType: null,
  nextActionPolicyNumber: '12-1016071-01',
  nextStatusActionNeeded: 'Set to In Force',
  nextStatusActionDate: '2019-05-17T04:00:00.000Z',
  __v: 0,
  policyID: '5cd9e68341e3ca00103ec7ad'
};
