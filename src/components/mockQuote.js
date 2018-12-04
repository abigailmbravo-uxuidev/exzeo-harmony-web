export const MOCK_QUOTE = {
  underwritingAnswers: {
    business: {
      answer: 'No',
      question: 'Is a business conducted on the property?',
      source: 'Customer',
      _id: '5c057473d7a2900015693764'
    },
    previousClaims: {
      answer: 'No claims ever filed',
      question: 'How many claims in the past 5 years?',
      source: 'Customer',
      _id: '5c057473d7a2900015693765'
    },
    rented: {
      answer: 'Never',
      question: 'Is the home or any structures on the property ever rented?',
      source: 'Customer',
      _id: '5c057473d7a2900015693766'
    },
    monthsOccupied: {
      answer: '10+',
      question: 'How many months a year does the owner live in the home?',
      source: 'Customer',
      _id: '5c057473d7a2900015693767'
    },
    fourPointUpdates: {
      answer: 'Yes',
      question: 'Has the wiring, plumbing, HVAC, and roof been updated in the last 35 years?',
      source: 'Customer',
      _id: '5c057473d7a2900015693768'
    },
    noPriorInsuranceSurcharge: {
      question: 'If not new purchase, please provide proof of prior insurance.',
      answer: 'No',
      source: 'Default',
      _id: '5c056314c154cb0017d5f44a'
    },
    floodCoverage: {
      question: 'Does this property have a separate insurance policy covering flood losses?',
      answer: 'Yes',
      source: 'Default',
      _id: '5c056314c154cb0017d5f449'
    }
  },
  billPlan: 'Annual',
  billToId: '5c05631fc154cb0017d5f5a2',
  updatedAt: '2018-12-03T18:23:14.231Z',
  quoteNumber: '12-5151466-01',
  policyHolders: [
    {
      _id: '5c05631fc154cb0017d5f5a2',
      emailAddress: 'exzeoqa@exzeo.com',
      primaryPhoneNumber: '7271231234',
      lastName: 'ROBIN A005',
      firstName: 'BATMAN',
      entityType: 'Person',
      order: 0,
      electronicDelivery: false
    }
  ],
  endDate: '2020-01-02T05:00:00.000Z',
  state: 'FL',
  _id: '5c056314c154cb0017d5f448',
  agencyCode: 20000,
  coverageLimits: {
    personalProperty: {
      format: 'Currency',
      _id: '5c056314c154cb0017d5f45a',
      amount: 56750,
      letterDesignation: 'C',
      displayText: 'Personal Property'
    },
    otherStructures: {
      format: 'Currency',
      _id: '5c056314c154cb0017d5f45b',
      amount: 4540,
      letterDesignation: 'B',
      displayText: 'Other Structures'
    },
    _id: '5c056314c154cb0017d5f453',
    medicalPayments: {
      format: 'Currency',
      _id: '5c056314c154cb0017d5f457',
      amount: 2000,
      letterDesignation: 'F',
      displayText: 'Medical Payments'
    },
    moldProperty: {
      displayText: 'Mold Property',
      amount: 10000,
      format: 'Currency',
      _id: '5c056314c154cb0017d5f455'
    },
    ordinanceOrLaw: {
      format: 'Percentage',
      _id: '5c056314c154cb0017d5f456',
      amount: 25,
      displayText: 'Ordinance or Law',
      ofCoverageLimit: 'dwelling'
    },
    lossOfUse: {
      format: 'Currency',
      _id: '5c056314c154cb0017d5f459',
      amount: 22700,
      letterDesignation: 'D',
      displayText: 'Loss of Use'
    },
    personalLiability: {
      format: 'Currency',
      _id: '5c056314c154cb0017d5f458',
      amount: 300000,
      letterDesignation: 'E',
      displayText: 'Personal Liability'
    },
    dwelling: {
      format: 'Currency',
      maxAmount: 295000,
      _id: '5c056314c154cb0017d5f45c',
      amount: 227000,
      letterDesignation: 'A',
      minAmount: 204000,
      displayText: 'Dwelling'
    },
    moldLiability: {
      displayText: 'Mold Liability',
      amount: 50000,
      format: 'Currency',
      _id: '5c056314c154cb0017d5f454'
    }
  },
  companyCode: 'TTIC',
  billToType: 'Policyholder',
  additionalInterests: [
    {
      _id: '5c057486d7a29000156937c9',
      name2: 'ISAOA/ATIMA',
      name1: 'BANK OF AMERICA, NA',
      order: 0,
      type: 'Mortgagee',
      mailingAddress: {
        city: 'FORT WORTH',
        zip: '76161',
        state: 'TX',
        _id: '5c057486d7a29000156937cb',
        country: {
          displayText: 'United States of America',
          code: 'USA',
          _id: '5c057486d7a29000156937cc'
        },
        address2: '',
        address1: 'PO BOX 961291'
      },
      active: true,
      referenceNumber: ''
    }
  ],
  policyHolderMailingAddress: {
    city: 'SAINT AUGUSTINE',
    zip: '00005',
    state: 'FL',
    _id: '5c057492c154cb0017d62e11',
    country: {
      code: 'USA',
      displayText: 'United States of America',
      _id: '5c057492c154cb0017d62e12'
    },
    address2: '',
    address1: '106 TEST ADDRESS'
  },
  underwritingExceptions: [],
  coverageOptions: {
    sinkholePerilCoverage: {
      displayText: 'Sinkhole Peril Coverage',
      answer: true,
      _id: '5c056314c154cb0017d5f452'
    },
    propertyIncidentalOccupanciesOtherStructures: {
      displayText: 'Property Permitted Incidental Occupancies Other Structures',
      answer: false,
      _id: '5c056314c154cb0017d5f44f'
    },
    liabilityIncidentalOccupancies: {
      displayText: 'Liability Permitted Incidental Occupancies',
      answer: false,
      _id: '5c056314c154cb0017d5f44e'
    },
    personalPropertyReplacementCost: {
      displayText: 'Personal Property Replacement Cost',
      answer: true,
      _id: '5c056314c154cb0017d5f451'
    },
    propertyIncidentalOccupanciesMainDwelling: {
      displayText: 'Property Permitted Incidental Occupancies Main Dwelling',
      answer: false,
      _id: '5c056314c154cb0017d5f450'
    }
  },
  cost: {
    totalCost: 140,
    worksheet: {
      inputFields: {
        coverageD: 22700,
        aopDeductible: 1000,
        currentYear: '2018',
        roofGeometry: 'Other',
        zip: '00005',
        state: 'FL',
        coverageA: 227000,
        companyCode: 'TTIC',
        sinkholeDeductible: 10,
        constructionType: 'F',
        coverageB: 4540,
        version: '201801',
        yearBuilt: 2012,
        replacementCost: true,
        openingProtection: 'C',
        hurricaneDeductible: 2,
        coverageC: 56750,
        product: 'HO3'
      },
      lookupFields: {
        hurricaneConstructionTypeFactor: 1.316403,
        hurricaneRetentionMult: 1.463338,
        claimCost: 1500,
        hurricaneRoofShapeFactor: 1,
        hurricaneYearBuiltFactor: 0.304789,
        hurricaneDeductibleFactor: 1,
        baseCost: 125,
        baseCoverageA: 250000,
        hurricaneOpeningProtectionFactor: 1,
        maxCoverageA: 750000,
        minCoverageA: 150000,
        nonCatConstructionLossCost: 15
      },
      calculatedFields: {
        adminExp: 125,
        nonCatExp: 15,
        catExp: 0,
        coverageAFactor: 0.977,
        retentionExp: 0,
        hurricaneTEFactor: 310.99
      }
    }
  },
  deductibles: {
    hurricane: {
      format: 'Percentage',
      _id: '5c056314c154cb0017d5f44d',
      amount: 2,
      displayText: 'Hurricane',
      ofCoverageLimit: 'dwelling',
      calculatedAmount: 4540
    },
    allOtherPerils: {
      displayText: 'All Other Perils',
      amount: 1000,
      format: 'Currency',
      _id: '5c056314c154cb0017d5f44c'
    },
    sinkhole: {
      format: 'Percentage',
      _id: '5c056314c154cb0017d5f44b',
      amount: 10,
      displayText: 'Sinkhole',
      ofCoverageLimit: 'dwelling',
      calculatedAmount: 22700
    }
  },
  rating: {
    totalFees: 27,
    _id: '5c057473d7a2900015693763',
    rateCode: 201704,
    engineCode: 'HO3ByPeril',
    worksheet: {
      elements: {
        bcegFactors: {
          fire: 1,
          allOtherPerils: 1,
          water: 1,
          territoryGroup: 3,
          otherWind: 1.01,
          grade: 99,
          liability: 1,
          sinkhole: 1,
          hurricane: 1.01
        },
        townRowHouseFactors: {
          fire: 1,
          allOtherPerils: 1,
          water: 1,
          otherWind: 1,
          units: '1-2',
          liability: 1,
          sinkhole: 1,
          hurricane: 1,
          protectionClass: 6
        },
        burglarAlarmFactors: {
          fire: 1,
          allOtherPerils: 1,
          burglarAlarm: false,
          water: 1,
          otherWind: 1,
          liability: 1,
          sinkhole: 1,
          hurricane: 1
        },
        windMitigationFactors: {
          fire: 1,
          windMitigationDiscount: 0.77,
          allOtherPerils: 1,
          water: 1,
          otherWind: 0.23,
          liability: 1,
          sinkhole: 1,
          hurricane: 0.23
        },
        deductibleFactors: {
          allOtherPerilsDeductible: 1000,
          fire: 1,
          allOtherPerils: 1,
          water: 1,
          otherWind: 1,
          hurricaneDeductible: 2,
          liability: 1,
          sinkhole: 1,
          exWind: false,
          hurricane: 1
        },
        coverageCFactors: {
          fire: 0.925,
          allOtherPerils: 0.925,
          water: 0.925,
          otherWind: 0.925,
          liability: 1,
          sinkhole: 0.925,
          hurricane: 0.85
        },
        coverageBFactors: {
          fire: 0.97,
          allOtherPerils: 0.97,
          water: 0.97,
          otherWind: 0.97,
          liability: 1,
          sinkhole: 0.97,
          hurricane: 0.97
        },
        territoryFactors: {
          name: 'SaintJohns,Coastal',
          fire: 0.228,
          allOtherPerils: 0.228,
          code: '533-0',
          water: 0.228,
          otherWind: 0.757,
          minPremium: 0.003,
          liability: 0.222,
          sinkhole: 1.115,
          group: 3,
          hurricane: 0.757
        },
        coverageAFactors: {
          fire: 1.761,
          allOtherPerils: 1.761,
          water: 1.761,
          otherWind: 1.761,
          liability: 1,
          sinkhole: 1.761,
          hurricane: 1.761
        },
        ordinanceOrLawFactors: {
          fire: 1,
          allOtherPerils: 1,
          water: 1,
          otherWind: 1,
          ordinanceOrLaw: false,
          liability: 1,
          sinkhole: 1,
          hurricane: 1
        },
        replacementCostFactors: {
          fire: 1.125,
          allOtherPerils: 1.125,
          water: 1.125,
          otherWind: 1.125,
          replacementCost: true,
          liability: 1,
          sinkhole: 1.125,
          hurricane: 1.125
        },
        fireAlarmAndSprinklerFactors: {
          fireAlarm: false,
          fire: 1,
          allOtherPerils: 1,
          water: 1,
          otherWind: 1,
          sprinkler: 'N',
          liability: 1,
          sinkhole: 1,
          hurricane: 1
        },
        seasonalFactors: {
          fire: 1,
          allOtherPerils: 1,
          water: 1,
          otherWind: 1,
          seasonal: false,
          liability: 1,
          sinkhole: 1,
          hurricane: 1
        },
        noPriorInsuranceFactors: {
          fire: 1,
          allOtherPerils: 1,
          noPriorInsurance: false,
          water: 1,
          otherWind: 1,
          liability: 1,
          sinkhole: 1,
          hurricane: 1
        },
        ageOfHomeFactors: {
          fire: 1.372,
          allOtherPerils: 1.372,
          water: 1.372,
          liability: 1.372,
          sinkhole: 1.372,
          ageOfHome: 4
        },
        ageOfHomeByYearFactors: {
          yearBuilt: 2015,
          hurricane: 1,
          otherWind: 1
        },
        baseRates: {
          fire: 309.05,
          allOtherPerils: 153.35,
          water: 516.56,
          otherWind: 22.98,
          liability: 56.96,
          sinkhole: 7.47,
          hurricane: 613.41
        },
        protectionClassFactors: {
          fire: 1,
          allOtherPerils: 1,
          constructionCode: 'F',
          constructionType: 'Frame',
          water: 1,
          otherWind: 1,
          liability: 1,
          sinkhole: 1,
          hurricane: 1,
          protectionClass: 6
        }
      },
      totalFees: 27,
      bcegAdjustment: 2,
      minimumPremiumAdjustment: 0,
      perilPremiumsSum: 764,
      additionalCoveragesSum: 22,
      subtotalPremium: 786,
      additionalCoverages: {
        increasedLiabilityMoldFungiLimit: 0,
        liabilityIncidentalOccupancies: 0,
        increasedPropertyMoldFungiLimit: 0,
        increasedPersonalLiabilityLimit: 22,
        propertyIncidentalOccupancies: 0,
        otherStructIncLimits: 0
      },
      netPremium: 786,
      totalPremium: 813,
      perilPremiums: {
        fire: 172,
        allOtherPerils: 85,
        water: 287,
        otherWind: 7,
        liability: 17,
        sinkhole: 20,
        hurricane: 176
      },
      fees: {
        citizensFee: 0,
        empTrustFee: 2,
        mgaPolicyFee: 25,
        fhcfFee: 0,
        figaFee: 0
      }
    },
    netPremium: 786,
    totalPremium: 813
  },
  createdAt: '2018-12-03T17:08:36.486Z',
  createdBy: {
    userId: 'auth0|594199c30b874417c3157ae1',
    userName: 'ttic-20000',
    _id: '5c056314c154cb0017d5f461'
  },
  effectiveDate: '2019-01-02T05:00:00.000Z',
  property: {
    fireAlarm: false,
    windMitigation: {
      roofGeometry: 'Other',
      floridaBuildingCodeWindSpeed: 120,
      _id: '5c056314c154cb0017d5f45e',
      secondaryWaterResistance: 'Other',
      internalPressureDesign: 'Other',
      roofCovering: 'Other',
      openingProtection: 'Other',
      terrain: 'C',
      floridaBuildingCodeWindSpeedDesign: 120,
      roofDeckAttachment: 'Other',
      windBorneDebrisRegion: 'Yes',
      roofToWallConnection: 'Other'
    },
    floodZone: 'A',
    source: 'CasaClue',
    squareFeet: 1858,
    poolSecured: true,
    gatedCommunity: false,
    residenceType: 'SINGLE FAMILY',
    _id: '5c056314c154cb0017d5f45d',
    timezone: 'America/New_York',
    distanceToTidalWater: 4593.6,
    buildingCodeEffectivenessGrading: 99,
    familyUnits: '1-2',
    burglarAlarm: false,
    constructionType: 'FRAME',
    trampoline: false,
    divingBoard: false,
    distanceToFireStation: 1.18,
    id: '12000000000000005',
    yearBuilt: 2015,
    territory: '533-0',
    sprinkler: 'N',
    pool: false,
    yearOfRoof: null,
    physicalAddress: {
      city: 'SAINT AUGUSTINE',
      latitude: 29.79695,
      zip: '00005',
      state: 'FL',
      _id: '5c056314c154cb0017d5f45f',
      address2: '',
      longitude: -81.29969,
      county: 'SAINT JOHNS',
      address1: '106 TEST ADDRESS'
    },
    distanceToFireHydrant: 307.07,
    protectionClass: 6,
    townhouseRowhouse: false
  },
  __v: 0,
  agentCode: 60000,
  updatedBy: {
    userId: 'auth0|59419e3a43e76f16f68c3349',
    userName: 'tticcsr',
    _id: '5c057492c154cb0017d62e5b'
  },
  quoteState: 'Application Started',
  product: 'HO3'
};

export const MOCK_ADDRESS = [
  {
    id: '121274488892E090B',
    source: 'casaclue',
    residenceType: 'N/A',
    physicalAddress: {
      city: 'DAYTONA BEACH',
      latitude: '29.20784',
      zip: '32124',
      state: 'FL',
      address2: '',
      longitude: '-81.10621',
      county: 'VOLUSIA',
      address1: '33 ACCLAIM AT LIONSPAW'
    }
  },
  {
    id: '121279EA1A4AEB9FD',
    source: 'casaclue',
    residenceType: 'N/A',
    physicalAddress: {
      city: 'DEBARY',
      latitude: '28.894050',
      zip: '32713',
      state: 'FL',
      address2: '',
      longitude: '-81.307940',
      county: 'VOLUSIA',
      address1: '33 BOUGAINVILLEA DR'
    }
  },
  {
    id: '12127BC0FF0B1DA5E',
    source: 'casaclue',
    residenceType: 'N/A',
    physicalAddress: {
      city: 'ORMOND BEACH',
      latitude: '29.264700',
      zip: '32174',
      state: 'FL',
      address2: '',
      longitude: '-81.092800',
      county: 'VOLUSIA',
      address1: '33 CHINA MOON DR'
    }
  },
  {
    id: '1212730CEC2AE50DA',
    source: 'casaclue',
    residenceType: 'N/A',
    physicalAddress: {
      city: 'PONCE INLET',
      latitude: '29.08592',
      zip: '32127',
      state: 'FL',
      address2: '',
      longitude: '-80.92798',
      county: 'VOLUSIA',
      address1: '33 COASTAL OAKS CIR'
    }
  },
  {
    id: '12069E7251800C398',
    source: 'casaclue',
    residenceType: 'N/A',
    physicalAddress: {
      city: 'MASCOTTE',
      latitude: '28.579660',
      zip: '34753',
      state: 'FL',
      address2: '',
      longitude: '-81.896630',
      county: 'LAKE',
      address1: '33 ELIZABETH AVE'
    }
  },
  {
    id: '12069FA87C6058BFF',
    source: 'casaclue',
    residenceType: 'N/A',
    physicalAddress: {
      city: 'LEESBURG',
      latitude: '28.790480',
      zip: '34748',
      state: 'FL',
      address2: '',
      longitude: '-81.885970',
      county: 'LAKE',
      address1: '33 GINGER CIR'
    }
  },
  {
    id: '12127BCF5395C27C8',
    source: 'casaclue',
    residenceType: 'N/A',
    physicalAddress: {
      city: 'ORMOND BEACH',
      latitude: '29.28954',
      zip: '32174',
      state: 'FL',
      address2: '',
      longitude: '-81.07937',
      county: 'VOLUSIA',
      address1: '33 MANDERLEY LN'
    }
  },
  {
    id: '12127E47F75A3E203',
    source: 'casaclue',
    residenceType: 'N/A',
    physicalAddress: {
      city: 'NEW SMYRNA BEACH',
      latitude: '28.984110',
      zip: '32169',
      state: 'FL',
      address2: '',
      longitude: '-80.866570',
      county: 'VOLUSIA',
      address1: '33 OAK TREE DR'
    }
  },
  {
    id: '12069EA76FF191580',
    source: 'casaclue',
    residenceType: 'N/A',
    physicalAddress: {
      city: 'YALAHA',
      latitude: '28.74615',
      zip: '34797',
      state: 'FL',
      address2: '',
      longitude: '-81.82836',
      county: 'LAKE',
      address1: '33 PALM DR'
    }
  },
  {
    id: '12069CE146F58A798',
    source: 'casaclue',
    residenceType: 'N/A',
    physicalAddress: {
      city: 'EUSTIS',
      latitude: '28.862770',
      zip: '32726',
      state: 'FL',
      address2: '',
      longitude: '-81.687080',
      county: 'LAKE',
      address1: '33 WEST HERRICK DR'
    }
  }
];

