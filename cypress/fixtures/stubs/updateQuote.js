export default {
  status: 200,
  message: 'success',
  result: {
    __v: 0,
    _id: '5cf03889f52a9800113effc3',
    additionalInterests: [],
    additionalPolicyholder: true,
    agencyCode: 20000,
    agentCode: 60000,
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
        displayText: 'Dwelling',
        format: 'Currency',
        initialValue: 314000,
        letterDesignation: 'A',
        maxAmount: 408000,
        minAmount: 283000,
        name: 'dwelling',
        required: true,
        root: true,
        value: 314000
      },
      lossOfUse: {
        amount: 31400,
        displayText: 'Loss of Use',
        format: 'Percentage',
        initialValue: 10,
        letterDesignation: 'D',
        name: 'lossOfUse',
        ofCoverageLimit: 'dwelling',
        required: true,
        value: 10
      },
      medicalPayments: {
        amount: 2000,
        displayText: 'Medical Payments',
        format: 'Currency',
        initialValue: 2000,
        letterDesignation: 'F',
        name: 'medicalPayments',
        required: true,
        value: 2000
      },
      moldLiability: {
        amount: 50000,
        displayText: 'Mold Liability',
        format: 'Currency',
        initialValue: 50000,
        name: 'moldLiability',
        required: true,
        value: 50000
      },
      moldProperty: {
        amount: 10000,
        displayText: 'Mold Property',
        format: 'Currency',
        initialValue: 10000,
        name: 'moldProperty',
        required: true,
        value: 10000
      },
      ordinanceOrLaw: {
        amount: 25,
        calculatedAmount: 78500,
        displayText: 'Ordinance or Law',
        format: 'Percentage',
        initialValue: 25,
        name: 'ordinanceOrLaw',
        ofCoverageLimit: 'dwelling',
        required: true,
        value: 25
      },
      otherStructures: {
        amount: 6280,
        displayText: 'Other Structures',
        format: 'Currency',
        initialValue: 2,
        letterDesignation: 'B',
        name: 'otherStructures',
        required: true,
        value: 2
      },
      personalLiability: {
        amount: 300000,
        displayText: 'Personal Liability',
        format: 'Currency',
        initialValue: 300000,
        letterDesignation: 'E',
        name: 'personalLiability',
        required: true,
        value: 300000
      },
      personalProperty: {
        amount: 78500,
        displayText: 'Personal Property',
        format: 'Currency',
        initialValue: 25,
        letterDesignation: 'C',
        name: 'personalProperty',
        required: true,
        value: 25
      }
    },
    coverageOptions: {
      liabilityIncidentalOccupancies: {
        answer: false,
        default: false,
        displayText: 'Liability Permitted Incidental Occupancies',
        name: 'liabilityIncidentalOccupancies'
      },
      personalPropertyReplacementCost: {
        answer: true,
        default: true,
        displayText: 'Personal Property Replacement Cost',
        name: 'personalPropertyReplacementCost'
      },
      propertyIncidentalOccupanciesMainDwelling: {
        answer: false,
        default: false,
        displayText: 'Property Permitted Incidental Occupancies Main Dwelling',
        name: 'propertyIncidentalOccupanciesMainDwelling'
      },
      propertyIncidentalOccupanciesOtherStructures: {
        answer: false,
        default: false,
        displayText:
          'Property Permitted Incidental Occupancies Other Structures',
        name: 'propertyIncidentalOccupanciesOtherStructures'
      },
      sinkholePerilCoverage: {
        answer: true,
        default: true,
        displayText: 'Sinkhole Peril Coverage',
        name: 'sinkholePerilCoverage'
      }
    },
    createdAt: '2019-05-30T20:09:45.679Z',
    createdBy: {
      _id: '5cf03889f52a9800113effc8',
      userId: 'auth0|594199c30b874417c3157ae1',
      userName: 'ttic-20000'
    },
    deductibles: {
      allOtherPerils: {
        amount: 1000,
        displayText: 'All Other Perils',
        format: 'Currency',
        initialValue: 1000,
        name: 'allOtherPerils',
        required: true,
        value: 1000
      },
      hurricane: {
        amount: 2,
        calculatedAmount: 6280,
        displayText: 'Hurricane',
        format: 'Currency',
        initialValue: 2,
        name: 'hurricane',
        required: true,
        value: 2
      },
      sinkhole: {
        amount: 10,
        calculatedAmount: 31400,
        displayText: 'Sinkhole',
        format: 'Percentage',
        initialValue: 10,
        name: 'sinkhole',
        ofCoverageLimit: 'dwelling',
        required: true,
        value: 10
      }
    },
    effectiveDate: '2019-06-29T04:00:00.000Z',
    endDate: '2020-06-29T04:00:00.000Z',
    policyHolders: [
      {
        electronicDelivery: false,
        _id: '5cf0388ff52a9800113effcb',
        firstName: 'Bruce',
        lastName: 'Wayne',
        emailAddress: 'Batman@gmail.com',
        primaryPhoneNumber: '1234567890',
        order: 0,
        entityType: 'Person'
      },
      {
        electronicDelivery: false,
        _id: '5cf0388ff52a9800113effca',
        firstName: 'Dick',
        lastName: 'Grayson',
        emailAddress: 'Robin@hotmail.rus',
        primaryPhoneNumber: '9876543211',
        order: 1,
        entityType: 'Person'
      }
    ],
    product: 'HO3',
    property: {
      FEMAfloodZone: 'X',
      _id: '5cf03889f52a9800113effc4',
      baseFloodElevation: null,
      birdcage: null,
      buildingCodeEffectivenessGrading: 3,
      burglarAlarm: false,
      constructionType: 'MASONRY',
      coverageLimits: {
        dwelling: {
          amount: '314000',
          displayText: 'Dwelling',
          format: 'Currency'
        }
      },
      diffToBaseFloodElevation: null,
      distanceToFireHydrant: 264.052744,
      distanceToFireStation: 0.79,
      distanceToTidalWater: 17740.8,
      divingBoard: false,
      familyUnits: '1-2',
      fireAlarm: false,
      FEMAfloodZone: 'X',
      gatedCommunity: false,
      id: '12000000000000001',
      physicalAddress: {
        _id: '5cf03889f52a9800113effc5',
        address1: '4131 TEST ADDRESS',
        address2: '',
        city: 'SARASOTA',
        county: 'SARASOTA',
        latitude: 27.27967,
        longitude: -82.47786,
        state: 'FL',
        zip: '00001'
      },
      pool: false,
      poolSecured: false,
      poolfence: null,
      protectionClass: 3,
      relativeElevation: 99,
      relativeElevation1: null,
      relativeElevation2: null,
      residenceType: 'SINGLE FAMILY',
      source: 'CasaClue',
      sprinkler: 'N',
      squareFeet: 2640,
      territory: '715-51',
      timezone: 'AMERICA/NEW_YORK',
      townhouseRowhouse: false,
      trampoline: false,
      windMitigation: {
        _id: '5cf03889f52a9800113effc6',
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
    quoteInputState: 'Qualified',
    quoteNumber: '12-5168844-01',
    quoteState: 'Quote Qualified',
    rating: {
      _id: '5cf038939c1e4a0011226eba',
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
    state: 'FL',
    underwritingAnswers: {
      business: {
        answer: 'No',
        question: 'Is a business conducted on the property?',
        source: 'Customer'
      },
      fourPointUpdates: {
        answer: 'Yes',
        question:
          'Have the wiring, plumbing, and HVAC been updated in the last 35 years?',
        source: 'Customer'
      },
      monthsOccupied: {
        answer: '10+',
        question: 'How many months a year does the owner live in the home?',
        source: 'Customer'
      },
      noPriorInsuranceSurcharge: {
        answer: 'No',
        question:
          'If not new purchase, please provide proof of prior insurance.',
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
    underwritingExceptions: [
      {
        _id: '5cf038a49c1e4a0011226ee6',
        code: '003',
        displayText: 'Missing Info - Mailing/Billing Info',
        category: 'Coverages & Deductibles',
        action: 'Missing Info',
        agentMessage:
          'Missing required information to complete quote -  Mailing/Billing Info',
        internalMessage:
          'Missing required information to complete quote -  Mailing/Billing Info',
        active: true,
        canOverride: false,
        overridden: false,
        overriddenBy: {
          _id: '5cf038a49c1e4a0011226ee7',
          userId: null,
          userName: null
        },
        overriddenAt: null,
        fields: []
      }
    ],
    updatedAt: '2019-05-30T20:10:12.013Z',
    updatedBy: {
      _id: '5cf038a49c1e4a0011226ee8',
      userId: 'auth0|594199c30b874417c3157ae1',
      userName: 'ttic-20000'
    },
    zipCodeSettings: {
      _id: '5aea142cdc0509268ca5ce7e',
      availableSlots: 396,
      coastal: false,
      companyCode: 'TTIC',
      coverageLimits: {
        dwelling: {
          maxAmount: 750000,
          maxReplacementCostRatio: 1.3,
          minAmount: 125000,
          minReplacementCostRatio: 0.9
        },
        personalLiability: { defaultAmount: 300000 },
        personalProperty: {
          maxAmount: 400000,
          minAmount: 0
        }
      },
      coverageOptions: {
        personalPropertyReplacementCost: { defaultAnswer: true },
        sinkholePerilCoverage: { defaultAnswer: true }
      },
      id: '5aea142cdc0509268ca5ce7e',
      latitude: 27.3262,
      longitude: -82.47223,
      maxClaims: 1,
      maxEffectiveDate: '2019-08-28T00:00:00-04:00',
      maxNetPremium: 20000,
      maxProtectionClass: 8,
      maxWaitingPeriod: 90,
      maxYearBuilt: 2016,
      minCostPer100: 0.1,
      minEffectiveDate: '2019-05-30T00:00:00-04:00',
      minLossRatio: 1.1,
      minNetPremium: 700,
      minWaitingPeriod: 0,
      minYearBuilt: 1900,
      product: 'HO3',
      state: 'FL',
      suspended: false,
      territories: ['715-0', '715-51'],
      timezone: 'America/New_York',
      zip: '00001'
    }
  },
  context: { requestId: 'lTv8APwIU' }
};
