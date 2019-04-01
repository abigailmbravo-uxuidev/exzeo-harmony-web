export default {
  quoteState: {
    quote: {
      __v: 0,
      _id: '5ca20b96f7a990000e935c56',
      additionalInterests: [],
      agencyCode: 20000,
      agentCode: 60000,
      billToId: '',
      billToType: 'Policyholder',
      companyCode: 'TTIC',
      coverageLimits: {
        _id: '5ca20b96f7a990000e935c5c',
        dwelling: {
          _id: '5ca20b96f7a990000e935c5d',
          amount: 314000,
          displayText: 'Dwelling',
          format: 'Currency',
          letterDesignation: 'A',
          maxAmount: 408000,
          minAmount: 283000
        },
        lossOfUse: {
          _id: '5ca20b96f7a990000e935c60',
          amount: 31400,
          displayText: 'Loss of Use',
          format: 'Currency',
          letterDesignation: 'D',
          value: 10
        },
        medicalPayments: {
          _id: '5ca20b96f7a990000e935c62',
          amount: 2000,
          displayText: 'Medical Payments',
          format: 'Currency',
          letterDesignation: 'F'
        },
        moldLiability: {
          _id: '5ca20b96f7a990000e935c65',
          amount: 50000,
          displayText: 'Mold Liability',
          format: 'Currency'
        },
        moldProperty: {
          _id: '5ca20b96f7a990000e935c64',
          amount: 10000,
          displayText: 'Mold Property',
          format: 'Currency'
        },
        ordinanceOrLaw: {
          _id: '5ca20b96f7a990000e935c63',
          amount: 25,
          displayText: 'Ordinance or Law',
          format: 'Percentage',
          ofCoverageLimit: 'dwelling'
        },
        otherStructures: {
          _id: '5ca20b96f7a990000e935c5e',
          amount: 6280,
          displayText: 'Other Structures',
          format: 'Currency',
          letterDesignation: 'B',
          value: 2
        },
        personalLiability: {
          _id: '5ca20b96f7a990000e935c61',
          amount: 300000,
          displayText: 'Personal Liability',
          format: 'Currency',
          letterDesignation: 'E'
        },
        personalProperty: {
          _id: '5ca20b96f7a990000e935c5f',
          amount: 78500,
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
      createdAt: '2019-04-01T13:01:10.278Z',
      createdBy: {
        _id: '5ca20b96f7a990000e935c57',
        userId: 'auth0|59419e3a43e76f16f68c3349',
        userName: 'tticcsr'
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
      effectiveDate: '2019-05-01',
      endDate: '2020-05-01T04:00:00.000Z',
      policyHolders: [],
      product: 'HO3',
      property: {
        _id: '5ca20b96f7a990000e935c59',
        buildingCodeEffectivenessGrading: 3,
        burglarAlarm: false,
        constructionType: 'MASONRY',
        distanceToFireHydrant: 264.052744,
        distanceToFireStation: 0.79,
        distanceToTidalWater: 17740.8,
        divingBoard: false,
        familyUnits: '1-2',
        fireAlarm: false,
        floodZone: 'X',
        gatedCommunity: false,
        id: '12000000000000001',
        physicalAddress: {
          _id: '5ca20b96f7a990000e935c5a',
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
        protectionClass: 3,
        residenceType: 'SINGLE FAMILY',
        source: 'CasaClue',
        sprinkler: 'N',
        squareFeet: 2640,
        territory: '715-51',
        timezone: 'America/New_York',
        townhouseRowhouse: false,
        trampoline: false,
        windMitigation: {
          _id: '5ca20b96f7a990000e935c5b',
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
      quoteNumber: '12-5161628-01',
      quoteState: 'Quote Started',
      state: 'FL',
      underwritingAnswers: {
        floodCoverage: {
          answer: 'Yes',
          question: 'Does this property have a separate insurance policy covering flood losses?',
          source: 'Default'
        },
        noPriorInsuranceSurcharge: {
          answer: 'No',
          question: 'If not new purchase, please provide proof of prior insurance.',
          source: 'Default'
        }
      },
      underwritingExceptions: [],
      updatedAt: '2019-04-01T13:01:10.278Z',
      updatedBy: {
        _id: '5ca20b96f7a990000e935c58',
        userId: 'auth0|59419e3a43e76f16f68c3349',
        userName: 'tticcsr'
      },
      additionalPolicyholder: false,
      sameAsPropertyAddress: false
    },
    state: {
      activeTask: 'askAdditionalCustomerData',
      variables: [{
          name: 'getInfoFromCasaclue',
          value: {
            message: 'OK',
            result: {
              birdcage: null,
              buildingCodeEffectivenessGrading: '3',
              constructionType: 'MASONRY',
              coverageLimits: {
                dwelling: {
                  amount: '314000',
                  displayText: 'Dwelling',
                  format: 'Currency'
                }
              },
              distanceToFireHydrant: '264.052744',
              distanceToFireStation: '0.79',
              distanceToTidalWater: '17740.8',
              divingBoard: '',
              familyUnits: '',
              floodZone: 'X',
              id: '12000000000000001',
              physicalAddress: {
                address1: '4131 TEST ADDRESS',
                address2: '',
                city: 'SARASOTA',
                county: 'SARASOTA',
                latitude: '27.27967',
                longitude: '-82.47786',
                state: 'FL',
                zip: '00001'
              },
              pool: '',
              poolSecured: null,
              poolfence: null,
              protectionClass: '3',
              residenceType: 'SINGLE FAMILY',
              sprinkler: '',
              squareFeet: '2640',
              territory: '715-51',
              timezone: 'AMERICA/NEW_YORK',
              trampoline: '',
              windMitigation: {
                floridaBuildingCodeWindSpeed: '130',
                floridaBuildingCodeWindSpeedDesign: '130',
                openingProtection: '',
                roofCovering: '',
                roofDeckAttachment: '',
                roofGeometry: '',
                roofToWallConnection: '',
                secondaryWaterResistance: '',
                terrain: 'B',
                windBorneDebrisRegion: 'YES'
              },
              yearBuilt: '1998',
              yearOfRoof: ''
            },
            status: 200,
            timeTookByEndpoint: 84
          }
        },
        {
          name: 'getZipCodeSettings',
          value: {
            message: 'success',
            result: [{
              _id: '5aea142cdc0509268ca5ce7e',
              availableSlots: 182,
              coastal: false,
              companyCode: 'TTIC',
              coverageLimits: {
                dwelling: {
                  maxAmount: 750000,
                  maxReplacementCostRatio: 1.3,
                  minAmount: 125000,
                  minReplacementCostRatio: 0.9
                },
                personalLiability: {
                  defaultAmount: 300000
                },
                personalProperty: {
                  maxAmount: 400000,
                  minAmount: 0
                }
              },
              coverageOptions: {
                personalPropertyReplacementCost: {
                  defaultAnswer: true
                },
                sinkholePerilCoverage: {
                  defaultAnswer: true
                }
              },
              id: '5aea142cdc0509268ca5ce7e',
              latitude: 27.3262,
              longitude: -82.47223,
              maxClaims: 1,
              maxEffectiveDate: '2019-06-30T00:00:00-04:00',
              maxNetPremium: 20000,
              maxProtectionClass: 8,
              maxWaitingPeriod: 90,
              maxYearBuilt: 2016,
              minCostPer100: 0.1,
              minEffectiveDate: '2019-04-01T00:00:00-04:00',
              minLossRatio: 1.1,
              minNetPremium: 700,
              minWaitingPeriod: 0,
              minYearBuilt: 1900,
              product: 'HO3',
              state: 'FL',
              suspended: false,
              territories: [
                '715-0',
                '715-51'
              ],
              timezone: 'America/New_York',
              zip: '00001'
            }],
            status: 200,
            timeTookByEndpoint: 11
          }
        },
        {
          name: 'docuSignUrl',
          value: 'https://api.harmony-ins.com/ds'
        },
        {
          name: 'search',
          value: {
            address: '0',
            searchType: 'address'
          }
        },
        {
          name: 'quote',
          value: {
            message: 'success',
            result: {
              __v: 0,
              _id: '5ca20b96f7a990000e935c56',
              additionalInterests: [],
              agencyCode: 20000,
              agentCode: 60000,
              billToId: '',
              billToType: 'Policyholder',
              companyCode: 'TTIC',
              coverageLimits: {
                _id: '5ca20b96f7a990000e935c5c',
                dwelling: {
                  _id: '5ca20b96f7a990000e935c5d',
                  amount: 314000,
                  displayText: 'Dwelling',
                  format: 'Currency',
                  letterDesignation: 'A',
                  maxAmount: 408000,
                  minAmount: 283000
                },
                lossOfUse: {
                  _id: '5ca20b96f7a990000e935c60',
                  amount: 31400,
                  displayText: 'Loss of Use',
                  format: 'Currency',
                  letterDesignation: 'D'
                },
                medicalPayments: {
                  _id: '5ca20b96f7a990000e935c62',
                  amount: 2000,
                  displayText: 'Medical Payments',
                  format: 'Currency',
                  letterDesignation: 'F'
                },
                moldLiability: {
                  _id: '5ca20b96f7a990000e935c65',
                  amount: 50000,
                  displayText: 'Mold Liability',
                  format: 'Currency'
                },
                moldProperty: {
                  _id: '5ca20b96f7a990000e935c64',
                  amount: 10000,
                  displayText: 'Mold Property',
                  format: 'Currency'
                },
                ordinanceOrLaw: {
                  _id: '5ca20b96f7a990000e935c63',
                  amount: 25,
                  displayText: 'Ordinance or Law',
                  format: 'Percentage',
                  ofCoverageLimit: 'dwelling'
                },
                otherStructures: {
                  _id: '5ca20b96f7a990000e935c5e',
                  amount: 6280,
                  displayText: 'Other Structures',
                  format: 'Currency',
                  letterDesignation: 'B'
                },
                personalLiability: {
                  _id: '5ca20b96f7a990000e935c61',
                  amount: 300000,
                  displayText: 'Personal Liability',
                  format: 'Currency',
                  letterDesignation: 'E'
                },
                personalProperty: {
                  _id: '5ca20b96f7a990000e935c5f',
                  amount: 78500,
                  displayText: 'Personal Property',
                  format: 'Currency',
                  letterDesignation: 'C'
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
              createdAt: '2019-04-01T13:01:10.278Z',
              createdBy: {
                _id: '5ca20b96f7a990000e935c57',
                userId: 'auth0|59419e3a43e76f16f68c3349',
                userName: 'tticcsr'
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
                  ofCoverageLimit: 'dwelling'
                },
                sinkhole: {
                  amount: 10,
                  calculatedAmount: 31400,
                  displayText: 'Sinkhole',
                  format: 'Percentage',
                  ofCoverageLimit: 'dwelling'
                }
              },
              effectiveDate: '2019-05-01T04:00:00.000Z',
              endDate: '2020-05-01T04:00:00.000Z',
              policyHolders: [],
              product: 'HO3',
              property: {
                _id: '5ca20b96f7a990000e935c59',
                buildingCodeEffectivenessGrading: 3,
                burglarAlarm: false,
                constructionType: 'MASONRY',
                distanceToFireHydrant: 264.052744,
                distanceToFireStation: 0.79,
                distanceToTidalWater: 17740.8,
                divingBoard: false,
                familyUnits: '1-2',
                fireAlarm: false,
                floodZone: 'X',
                gatedCommunity: false,
                id: '12000000000000001',
                physicalAddress: {
                  _id: '5ca20b96f7a990000e935c5a',
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
                protectionClass: 3,
                residenceType: 'SINGLE FAMILY',
                source: 'CasaClue',
                sprinkler: 'N',
                squareFeet: 2640,
                territory: '715-51',
                timezone: 'America/New_York',
                townhouseRowhouse: false,
                trampoline: false,
                windMitigation: {
                  _id: '5ca20b96f7a990000e935c5b',
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
              quoteNumber: '12-5161628-01',
              quoteState: 'Quote Started',
              state: 'FL',
              underwritingAnswers: {
                floodCoverage: {
                  answer: 'Yes',
                  question: 'Does this property have a separate insurance policy covering flood losses?',
                  source: 'Default'
                },
                noPriorInsuranceSurcharge: {
                  answer: 'No',
                  question: 'If not new purchase, please provide proof of prior insurance.',
                  source: 'Default'
                }
              },
              underwritingExceptions: [],
              updatedAt: '2019-04-01T13:01:10.278Z',
              updatedBy: {
                _id: '5ca20b96f7a990000e935c58',
                userId: 'auth0|59419e3a43e76f16f68c3349',
                userName: 'tticcsr'
              }
            },
            status: 200,
            timeTookByEndpoint: 69
          }
        },
        {
          name: 'dsUrl',
          value: 'https://api.harmony-ins.com/ds'
        },
        {
          name: 'singleQuote',
          value: {
            message: 'success',
            result: {
              __v: 0,
              _id: '5ca20b96f7a990000e935c56',
              additionalInterests: [],
              agencyCode: 20000,
              agentCode: 60000,
              billToId: '',
              billToType: 'Policyholder',
              companyCode: 'TTIC',
              coverageLimits: {
                _id: '5ca20b96f7a990000e935c5c',
                dwelling: {
                  _id: '5ca20b96f7a990000e935c5d',
                  amount: 314000,
                  displayText: 'Dwelling',
                  format: 'Currency',
                  letterDesignation: 'A',
                  maxAmount: 408000,
                  minAmount: 283000
                },
                lossOfUse: {
                  _id: '5ca20b96f7a990000e935c60',
                  amount: 31400,
                  displayText: 'Loss of Use',
                  format: 'Currency',
                  letterDesignation: 'D'
                },
                medicalPayments: {
                  _id: '5ca20b96f7a990000e935c62',
                  amount: 2000,
                  displayText: 'Medical Payments',
                  format: 'Currency',
                  letterDesignation: 'F'
                },
                moldLiability: {
                  _id: '5ca20b96f7a990000e935c65',
                  amount: 50000,
                  displayText: 'Mold Liability',
                  format: 'Currency'
                },
                moldProperty: {
                  _id: '5ca20b96f7a990000e935c64',
                  amount: 10000,
                  displayText: 'Mold Property',
                  format: 'Currency'
                },
                ordinanceOrLaw: {
                  _id: '5ca20b96f7a990000e935c63',
                  amount: 25,
                  displayText: 'Ordinance or Law',
                  format: 'Percentage',
                  ofCoverageLimit: 'dwelling'
                },
                otherStructures: {
                  _id: '5ca20b96f7a990000e935c5e',
                  amount: 6280,
                  displayText: 'Other Structures',
                  format: 'Currency',
                  letterDesignation: 'B'
                },
                personalLiability: {
                  _id: '5ca20b96f7a990000e935c61',
                  amount: 300000,
                  displayText: 'Personal Liability',
                  format: 'Currency',
                  letterDesignation: 'E'
                },
                personalProperty: {
                  _id: '5ca20b96f7a990000e935c5f',
                  amount: 78500,
                  displayText: 'Personal Property',
                  format: 'Currency',
                  letterDesignation: 'C'
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
              createdAt: '2019-04-01T13:01:10.278Z',
              createdBy: {
                _id: '5ca20b96f7a990000e935c57',
                userId: 'auth0|59419e3a43e76f16f68c3349',
                userName: 'tticcsr'
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
                  ofCoverageLimit: 'dwelling'
                },
                sinkhole: {
                  amount: 10,
                  calculatedAmount: 31400,
                  displayText: 'Sinkhole',
                  format: 'Percentage',
                  ofCoverageLimit: 'dwelling'
                }
              },
              effectiveDate: '2019-05-01T04:00:00.000Z',
              endDate: '2020-05-01T04:00:00.000Z',
              policyHolders: [],
              product: 'HO3',
              property: {
                _id: '5ca20b96f7a990000e935c59',
                buildingCodeEffectivenessGrading: 3,
                burglarAlarm: false,
                constructionType: 'MASONRY',
                distanceToFireHydrant: 264.052744,
                distanceToFireStation: 0.79,
                distanceToTidalWater: 17740.8,
                divingBoard: false,
                familyUnits: '1-2',
                fireAlarm: false,
                floodZone: 'X',
                gatedCommunity: false,
                id: '12000000000000001',
                physicalAddress: {
                  _id: '5ca20b96f7a990000e935c5a',
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
                protectionClass: 3,
                residenceType: 'SINGLE FAMILY',
                source: 'CasaClue',
                sprinkler: 'N',
                squareFeet: 2640,
                territory: '715-51',
                timezone: 'America/New_York',
                townhouseRowhouse: false,
                trampoline: false,
                windMitigation: {
                  _id: '5ca20b96f7a990000e935c5b',
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
              quoteNumber: '12-5161628-01',
              quoteState: 'Quote Started',
              state: 'FL',
              underwritingAnswers: {
                floodCoverage: {
                  answer: 'Yes',
                  question: 'Does this property have a separate insurance policy covering flood losses?',
                  source: 'Default'
                },
                noPriorInsuranceSurcharge: {
                  answer: 'No',
                  question: 'If not new purchase, please provide proof of prior insurance.',
                  source: 'Default'
                }
              },
              underwritingExceptions: [],
              updatedAt: '2019-04-01T13:01:10.278Z',
              updatedBy: {
                _id: '5ca20b96f7a990000e935c58',
                userId: 'auth0|59419e3a43e76f16f68c3349',
                userName: 'tticcsr'
              }
            },
            status: 200,
            timeTookByEndpoint: 126
          }
        },
        {
          name: 'getActiveAgents',
          value: {
            message: 'Successful',
            result: [{
                _id: '5b97e6a6968a4b75eea82592',
                agencyCode: 20000,
                agentCode: 60000,
                agentOfRecord: true,
                appointed: true,
                companyCode: 'TTIC',
                createdAt: '2016-02-03T14:44:06.183Z',
                createdBy: 'LOAD',
                emailAddress: 'test@typtap.com',
                faxNumber: '',
                firstName: 'WALLY',
                lastName: 'WAGONER',
                licenseNumber: 'W180087',
                mailingAddress: {
                  address1: '3001 S.E. MARICAMP ROAD',
                  address2: '',
                  city: 'OCALA',
                  state: 'FL',
                  zip: '34471'
                },
                physicalAddress: {
                  address1: '3001 S.E. MARICAMP ROAD',
                  city: 'OCALA',
                  state: 'FL',
                  zip: '34471'
                },
                primaryPhoneNumber: '3525099008',
                secondaryPhoneNumber: null,
                state: 'FL',
                status: 'Active',
                updatedAt: '2019-02-28T16:30:38.384Z',
                updatedBy: 'tticcsr'
              },
              {
                _id: '5bfc4ed82d488d00288fc24b',
                agencyCode: 20000,
                agentCode: -1234567890,
                agentOfRecord: true,
                appointed: true,
                companyCode: 'TTIC',
                createdAt: '2018-11-26T19:51:52.970Z',
                createdBy: 'tticcsr',
                emailAddress: 'jsutphin@exzeo.com',
                firstName: 'test',
                lastName: 'test',
                licenseNumber: '1234567890',
                mailingAddress: {
                  address1: '123 Cypress',
                  city: 'Tampa',
                  state: 'FL',
                  zip: '555555'
                },
                primaryPhoneNumber: '5555555555',
                state: 'FL',
                status: 'Active',
                updatedAt: '2019-03-19T17:11:16.871Z',
                updatedBy: 'mryan1'
              }
            ],
            status: 200,
            timeTookByEndpoint: 21
          }
        },
        {
          name: 'chooseAddress',
          value: {
            igdId: '12000000000000001',
            stateCode: 'FL'
          }
        },
        {
          name: 'zipCodeSettingsForPDFTimezone',
          value: {
            message: 'success',
            result: [{
              _id: '5aea142cdc0509268ca5ce7e',
              availableSlots: 182,
              coastal: false,
              companyCode: 'TTIC',
              coverageLimits: {
                dwelling: {
                  maxAmount: 750000,
                  maxReplacementCostRatio: 1.3,
                  minAmount: 125000,
                  minReplacementCostRatio: 0.9
                },
                personalLiability: {
                  defaultAmount: 300000
                },
                personalProperty: {
                  maxAmount: 400000,
                  minAmount: 0
                }
              },
              coverageOptions: {
                personalPropertyReplacementCost: {
                  defaultAnswer: true
                },
                sinkholePerilCoverage: {
                  defaultAnswer: true
                }
              },
              id: '5aea142cdc0509268ca5ce7e',
              latitude: 27.3262,
              longitude: -82.47223,
              maxClaims: 1,
              maxEffectiveDate: '2019-06-30T00:00:00-04:00',
              maxNetPremium: 20000,
              maxProtectionClass: 8,
              maxWaitingPeriod: 90,
              maxYearBuilt: 2016,
              minCostPer100: 0.1,
              minEffectiveDate: '2019-04-01T00:00:00-04:00',
              minLossRatio: 1.1,
              minNetPremium: 700,
              minWaitingPeriod: 0,
              minYearBuilt: 1900,
              product: 'HO3',
              state: 'FL',
              suspended: false,
              territories: [
                '715-0',
                '715-51'
              ],
              timezone: 'America/New_York',
              zip: '00001'
            }],
            status: 200,
            timeTookByEndpoint: 11
          }
        },
        {
          name: 'searchAddress',
          value: {
            message: 'success',
            result: {
              IndexResult: [{
                  id: '12105038ACD2DE81F',
                  physicalAddress: {
                    address1: '0 AVENUE A SW',
                    address2: '',
                    city: 'WINTER HAVEN',
                    county: 'POLK',
                    latitude: '28.02124',
                    longitude: '-81.73689',
                    state: 'FL',
                    zip: '33880'
                  },
                  residenceType: 'N/A',
                  source: 'casaclue'
                },
                {
                  id: '12087C234E639E07A',
                  physicalAddress: {
                    address1: '0 BAY DR',
                    address2: '',
                    city: 'SADDLEBUNCH KEY',
                    county: 'MONROE',
                    latitude: '24.62734',
                    longitude: '-81.59191',
                    state: 'FL',
                    zip: '33040'
                  },
                  residenceType: 'N/A',
                  source: 'casaclue'
                },
                {
                  id: '12073C641D9051895',
                  physicalAddress: {
                    address1: '0 BLOUNTSTOWN HWY',
                    address2: '',
                    city: 'TALLAHASSEE',
                    county: 'LEON',
                    latitude: '30.432980',
                    longitude: '-84.522060',
                    state: 'FL',
                    zip: '32310'
                  },
                  residenceType: 'N/A',
                  source: 'casaclue'
                },
                {
                  id: '12105BA80D14EDD76',
                  physicalAddress: {
                    address1: '0 CENTRAL AVE S',
                    address2: '',
                    city: 'LAKELAND',
                    county: 'POLK',
                    latitude: '28.03583',
                    longitude: '-81.97370',
                    state: 'FL',
                    zip: '33815'
                  },
                  residenceType: 'N/A',
                  source: 'casaclue'
                },
                {
                  id: '121059C8A5607A59F',
                  physicalAddress: {
                    address1: '0 FOUSE AVE',
                    address2: '',
                    city: 'DUNDEE',
                    county: 'POLK',
                    latitude: '28.01014',
                    longitude: '-81.62202',
                    state: 'FL',
                    zip: '33838'
                  },
                  residenceType: 'N/A',
                  source: 'casaclue'
                },
                {
                  id: '12105D95F94A64FD0',
                  physicalAddress: {
                    address1: '0 KRENSON WOODS RD',
                    address2: '',
                    city: 'LAKELAND',
                    county: 'POLK',
                    latitude: '27.97035',
                    longitude: '-81.97226',
                    state: 'FL',
                    zip: '33813'
                  },
                  residenceType: 'N/A',
                  source: 'casaclue'
                },
                {
                  id: '12073C7516479B2CB',
                  physicalAddress: {
                    address1: '0 ROCKY WOOD RD',
                    address2: '',
                    city: 'TALLAHASSEE',
                    county: 'LEON',
                    latitude: '30.342840',
                    longitude: '-84.394430',
                    state: 'FL',
                    zip: '32305'
                  },
                  residenceType: 'N/A',
                  source: 'casaclue'
                },
                {
                  id: '12095CCF23D5E8ABE',
                  physicalAddress: {
                    address1: '0 TAVISTOCK RD',
                    address2: '',
                    city: 'ORLANDO',
                    county: 'ORANGE',
                    latitude: '28.413440',
                    longitude: '-81.243990',
                    state: 'FL',
                    zip: '32827'
                  },
                  residenceType: 'N/A',
                  source: 'casaclue'
                },
                {
                  id: '12095CE5A3FBC0C70',
                  physicalAddress: {
                    address1: '0 VICK RD',
                    address2: '',
                    city: 'APOPKA',
                    county: 'ORANGE',
                    latitude: '28.71038',
                    longitude: '-81.52398',
                    state: 'FL',
                    zip: '32712'
                  },
                  residenceType: 'N/A',
                  source: 'casaclue'
                },
                {
                  id: '12105BEE96A90D2FC',
                  physicalAddress: {
                    address1: '0 VILLAS CT',
                    address2: '',
                    city: 'LAKE WALES',
                    county: 'POLK',
                    latitude: '27.89577',
                    longitude: '-81.52827',
                    state: 'FL',
                    zip: '33898'
                  },
                  residenceType: 'N/A',
                  source: 'casaclue'
                }
              ],
              Message: 'match found',
              TotalCount: 60
            },
            status: 200,
            timeTookByEndpoint: 133
          }
        },
        {
          name: 'address',
          value: '0'
        },
        {
          name: 'searchType',
          value: 'address'
        },
        {
          name: 'uiTasks',
          value: {
            tasks: [{
                component: 'Search',
                label: 'Enter Address',
                link: 'search',
                name: 'search',
                order: 1
              },
              {
                data: [{
                  key: 'property',
                  value: 'searchAddress'
                }],
                label: 'Property Address',
                link: 'search',
                name: 'chooseAddress',
                order: 2
              },
              {
                data: [{
                  key: 'quoteSearchResults',
                  value: 'searchQuote'
                }],
                label: 'Property Quote',
                link: 'search',
                name: 'chooseQuote',
                order: 3
              },
              {
                component: 'Demographics',
                data: [{
                    key: 'questions',
                    value: 'api'
                  },
                  {
                    key: 'quote',
                    value: 'quote'
                  },
                  {
                    fields: [
                      'property.physicalAddress',
                      'property.yearBuilt'
                    ],
                    key: 'quoteDetails',
                    value: 'quote'
                  }
                ],
                label: 'Demographics',
                link: 'demographics',
                name: 'askAdditionalCustomerData',
                order: 4
              },
              {
                component: 'UnderWriting',
                data: [{
                    key: 'quote',
                    value: 'quote'
                  },
                  {
                    key: 'questions',
                    value: 'getListOfUWQuestions'
                  },
                  {
                    fields: [
                      'property.physicalAddress',
                      'property.yearBuilt'
                    ],
                    key: 'quoteDetails',
                    value: 'quote'
                  }
                ],
                label: 'UnderWriting Q&A',
                link: 'underwriting',
                name: 'askUWAnswers',
                order: 5
              },
              {
                component: 'Customize',
                data: [{
                    key: 'quote',
                    value: 'getQuote'
                  },
                  {
                    key: 'questions',
                    value: 'api'
                  },
                  {
                    fields: [
                      'quoteNumber',
                      'property.physicalAddress',
                      'property.yearBuilt',
                      'rating.totalPremium',
                      'coverageLimits.dwelling.amount'
                    ],
                    key: 'quoteDetails',
                    value: 'getQuote'
                  }
                ],
                label: 'Customize Quote',
                link: 'customize',
                name: 'askToCustomizeDefaultQuote',
                order: 6
              },
              {
                component: 'Share',
                data: [{
                    key: 'quote',
                    value: 'getQuote'
                  },
                  {
                    key: 'questions',
                    value: 'api'
                  },
                  {
                    fields: [
                      'quoteNumber',
                      'property.physicalAddress',
                      'property.yearBuilt',
                      'rating.totalPremium',
                      'coverageLimits.dwelling.amount'
                    ],
                    key: 'quoteDetails',
                    value: 'getQuote'
                  }
                ],
                label: 'Share Quote',
                link: 'share',
                name: 'sendEmailOrContinue',
                order: 7
              },
              {
                component: 'AdditionalPolicyHolder',
                data: [{
                    key: 'quote',
                    value: 'getQuote'
                  },
                  {
                    key: 'questions',
                    value: 'api'
                  },
                  {
                    fields: [
                      'quoteNumber',
                      'property.physicalAddress',
                      'property.yearBuilt',
                      'rating.totalPremium',
                      'coverageLimits.dwelling.amount'
                    ],
                    key: 'quoteDetails',
                    value: 'getQuote'
                  }
                ],
                label: 'Add Additional Policyholder',
                link: 'additionalpolicyholder',
                name: 'askAdditionalPolicyHolder',
                order: 8
              },
              {
                component: 'AdditionalInterest',
                data: [{
                    key: 'quote',
                    value: 'getQuote'
                  },
                  {
                    key: 'questions',
                    value: 'api'
                  },
                  {
                    fields: [
                      'quoteNumber',
                      'property.physicalAddress',
                      'property.yearBuilt',
                      'rating.totalPremium',
                      'coverageLimits.dwelling.amount'
                    ],
                    key: 'quoteDetails',
                    value: 'getQuote'
                  }
                ],
                label: 'Add Additional Mortgagee',
                link: 'additionalmortgagee',
                name: 'askMortgagee',
                order: 9
              },
              {
                component: 'AdditionalInterest',
                data: [{
                    key: 'quote',
                    value: 'getQuote'
                  },
                  {
                    key: 'questions',
                    value: 'api'
                  },
                  {
                    fields: [
                      'quoteNumber',
                      'property.physicalAddress',
                      'property.yearBuilt',
                      'rating.totalPremium',
                      'coverageLimits.dwelling.amount'
                    ],
                    key: 'quoteDetails',
                    value: 'getQuote'
                  }
                ],
                label: 'Add Additional PremiumFinance',
                link: 'additionalPremiumFinance',
                name: 'askPremiumFinance',
                order: 10
              },
              {
                component: 'AdditionalInterest',
                data: [{
                    key: 'quote',
                    value: 'getQuote'
                  },
                  {
                    key: 'questions',
                    value: 'api'
                  },
                  {
                    fields: [
                      'quoteNumber',
                      'property.physicalAddress',
                      'property.yearBuilt',
                      'rating.totalPremium',
                      'coverageLimits.dwelling.amount'
                    ],
                    key: 'quoteDetails',
                    value: 'getQuote'
                  }
                ],
                label: 'Add Additional Interest',
                link: 'additionalInterest',
                name: 'askAdditionalInterest',
                order: 11
              },
              {
                component: 'AdditionalInterest',
                data: [{
                    key: 'quote',
                    value: 'getQuote'
                  },
                  {
                    key: 'questions',
                    value: 'api'
                  },
                  {
                    fields: [
                      'quoteNumber',
                      'property.physicalAddress',
                      'property.yearBuilt',
                      'rating.totalPremium',
                      'coverageLimits.dwelling.amount'
                    ],
                    key: 'quoteDetails',
                    value: 'getQuote'
                  }
                ],
                label: 'Add Additional Insured',
                link: 'additionalInsured',
                name: 'askAdditionalInsured',
                order: 12
              },
              {
                component: 'AdditionalInterest',
                data: [{
                    key: 'quote',
                    value: 'getQuote'
                  },
                  {
                    key: 'questions',
                    value: 'api'
                  },
                  {
                    fields: [
                      'quoteNumber',
                      'property.physicalAddress',
                      'property.yearBuilt',
                      'rating.totalPremium',
                      'coverageLimits.dwelling.amount'
                    ],
                    key: 'quoteDetails',
                    value: 'getQuote'
                  }
                ],
                label: 'Add Bill Payer',
                link: 'additionalBillPayer',
                name: 'askBillPayer',
                order: 13
              },
              {
                component: 'Billing',
                data: [{
                    key: 'quote',
                    value: 'getQuote'
                  },
                  {
                    key: 'questions',
                    value: 'api'
                  },
                  {
                    fields: [
                      'quoteNumber',
                      'property.physicalAddress',
                      'property.yearBuilt',
                      'rating.totalPremium',
                      'coverageLimits.dwelling.amount'
                    ],
                    key: 'quoteDetails',
                    value: 'getQuote'
                  }
                ],
                label: 'Billing Info',
                link: 'billing',
                name: 'askAdditionalQuestions',
                order: 14
              },
              {
                data: [{
                    key: 'quote',
                    value: 'getQuote'
                  },
                  {
                    key: 'questions',
                    value: 'api'
                  },
                  {
                    fields: [
                      'quoteNumber',
                      'property.physicalAddress',
                      'property.yearBuilt',
                      'rating.totalPremium',
                      'coverageLimits.dwelling.amount'
                    ],
                    key: 'quoteDetails',
                    value: 'getQuote'
                  }
                ],
                label: 'Assumption',
                link: 'assumptions',
                name: 'showAssumptions',
                order: 15
              },
              {
                component: 'Verify',
                data: [{
                    key: 'quote',
                    value: 'getFinalQuote'
                  },
                  {
                    fields: [
                      'quoteNumber',
                      'property.physicalAddress',
                      'property.yearBuilt',
                      'rating.totalPremium',
                      'coverageLimits.dwelling.amount'
                    ],
                    key: 'quoteDetails',
                    value: 'getQuote'
                  }
                ],
                label: 'Verify & Write policy',
                link: 'verify',
                name: 'askScheduleInspectionDates',
                order: 16
              },
              {
                component: 'Share',
                data: [{
                    key: 'underWritingExceptions',
                    value: 'UWDecision1EndError'
                  },
                  {
                    fields: [
                      'quoteNumber',
                      'property.physicalAddress'
                    ],
                    key: 'quote',
                    value: 'quote'
                  }
                ],
                link: 'error',
                name: 'UWDecision1EndError',
                order: 17
              },
              {
                link: 'error',
                name: 'UWDecision2EndError',
                order: 18
              },
              {
                link: 'error',
                name: 'UWDecision3EndError',
                order: 19
              },
              {
                link: 'error',
                name: 'UWDecision4EndError',
                order: 20
              },
              {
                link: 'error',
                name: 'UWDecision5EndError',
                order: 21
              },
              {
                component: 'Share',
                data: [{
                    key: 'underWritingExceptions',
                    value: 'UnderWritingReviewError'
                  },
                  {
                    fields: [
                      'quoteNumber',
                      'property.physicalAddress'
                    ],
                    key: 'quote',
                    value: 'quote'
                  }
                ],
                label: 'Share Quote',
                link: 'share',
                name: 'refreshOnUnderWritingReviewError',
                order: 22
              },
              {
                link: 'search/noresults',
                name: 'askToSearchAgain',
                order: 23
              }
            ]
          }
        },
        {
          name: 'quoteSchema',
          value: {
            message: 'success',
            result: {
              groups: {
                coverage: {
                  label: 'Coverage Info'
                },
                mailingbilling: {
                  label: 'Mailing/Billing Info'
                },
                underwriting: {
                  label: 'Underwriting Info'
                }
              },
              properties: {
                _id: {
                  group: 'coverage'
                },
                agencyCode: {
                  group: 'coverage'
                },
                agentCode: {
                  group: 'coverage'
                },
                billPlan: {
                  group: 'mailingbilling'
                },
                billToId: {
                  group: 'mailingbilling'
                },
                billToType: {
                  group: 'mailingbilling'
                },
                companyCode: {
                  group: 'coverage'
                },
                coverageLimits: {
                  group: 'coverage',
                  minProperties: 1
                },
                coverageOptions: {
                  group: 'coverage',
                  minProperties: 1
                },
                deductibles: {
                  group: 'coverage',
                  minProperties: 1
                },
                effectiveDate: {
                  group: 'coverage'
                },
                endDate: {
                  group: 'coverage'
                },
                policyHolderMailingAddress: {
                  group: 'mailingbilling',
                  minProperties: 1
                },
                policyHolders: {
                  group: 'coverage',
                  minItems: 1
                },
                product: {
                  group: 'coverage'
                },
                property: {
                  group: 'coverage',
                  minProperties: 1
                },
                quoteNumber: {
                  group: 'coverage'
                },
                rating: {
                  group: 'underwriting',
                  minProperties: 1
                },
                state: {
                  group: 'coverage'
                },
                underwritingAnswers: {
                  group: 'underwriting',
                  minProperties: 1
                }
              },
              required: [
                'underwritingAnswers',
                'billPlan',
                'billToId',
                'quoteNumber',
                'policyHolders',
                'endDate',
                'state',
                '_id',
                'agencyCode',
                'coverageLimits',
                'companyCode',
                'policyHolderMailingAddress',
                'coverageOptions',
                'deductibles',
                'rating',
                'effectiveDate',
                'property',
                'agentCode',
                'product'
              ],
              type: 'object'
            },
            status: 200,
            timeTookByEndpoint: 13
          }
        },
        {
          name: 'createQuote',
          value: {
            message: 'success',
            result: {
              __v: 0,
              _id: '5ca20b96f7a990000e935c56',
              additionalInterests: [],
              agencyCode: 20000,
              agentCode: 60000,
              billToId: '',
              billToType: 'Policyholder',
              companyCode: 'TTIC',
              coverageLimits: {
                _id: '5ca20b96f7a990000e935c5c',
                dwelling: {
                  _id: '5ca20b96f7a990000e935c5d',
                  amount: 314000,
                  displayText: 'Dwelling',
                  format: 'Currency',
                  letterDesignation: 'A',
                  maxAmount: 408000,
                  minAmount: 283000
                },
                lossOfUse: {
                  _id: '5ca20b96f7a990000e935c60',
                  amount: 31400,
                  displayText: 'Loss of Use',
                  format: 'Currency',
                  letterDesignation: 'D',
                  value: 10
                },
                medicalPayments: {
                  _id: '5ca20b96f7a990000e935c62',
                  amount: 2000,
                  displayText: 'Medical Payments',
                  format: 'Currency',
                  letterDesignation: 'F'
                },
                moldLiability: {
                  _id: '5ca20b96f7a990000e935c65',
                  amount: 50000,
                  displayText: 'Mold Liability',
                  format: 'Currency'
                },
                moldProperty: {
                  _id: '5ca20b96f7a990000e935c64',
                  amount: 10000,
                  displayText: 'Mold Property',
                  format: 'Currency'
                },
                ordinanceOrLaw: {
                  _id: '5ca20b96f7a990000e935c63',
                  amount: 25,
                  displayText: 'Ordinance or Law',
                  format: 'Percentage',
                  ofCoverageLimit: 'dwelling'
                },
                otherStructures: {
                  _id: '5ca20b96f7a990000e935c5e',
                  amount: 6280,
                  displayText: 'Other Structures',
                  format: 'Currency',
                  letterDesignation: 'B',
                  value: 2
                },
                personalLiability: {
                  _id: '5ca20b96f7a990000e935c61',
                  amount: 300000,
                  displayText: 'Personal Liability',
                  format: 'Currency',
                  letterDesignation: 'E'
                },
                personalProperty: {
                  _id: '5ca20b96f7a990000e935c5f',
                  amount: 78500,
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
              createdAt: '2019-04-01T13:01:10.278Z',
              createdBy: {
                _id: '5ca20b96f7a990000e935c57',
                userId: 'auth0|59419e3a43e76f16f68c3349',
                userName: 'tticcsr'
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
              effectiveDate: '2019-05-01',
              endDate: '2020-05-01T04:00:00.000Z',
              policyHolders: [],
              product: 'HO3',
              property: {
                _id: '5ca20b96f7a990000e935c59',
                buildingCodeEffectivenessGrading: 3,
                burglarAlarm: false,
                constructionType: 'MASONRY',
                distanceToFireHydrant: 264.052744,
                distanceToFireStation: 0.79,
                distanceToTidalWater: 17740.8,
                divingBoard: false,
                familyUnits: '1-2',
                fireAlarm: false,
                floodZone: 'X',
                gatedCommunity: false,
                id: '12000000000000001',
                physicalAddress: {
                  _id: '5ca20b96f7a990000e935c5a',
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
                protectionClass: 3,
                residenceType: 'SINGLE FAMILY',
                source: 'CasaClue',
                sprinkler: 'N',
                squareFeet: 2640,
                territory: '715-51',
                timezone: 'America/New_York',
                townhouseRowhouse: false,
                trampoline: false,
                windMitigation: {
                  _id: '5ca20b96f7a990000e935c5b',
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
              quoteNumber: '12-5161628-01',
              quoteState: 'Quote Started',
              state: 'FL',
              underwritingAnswers: {
                floodCoverage: {
                  answer: 'Yes',
                  question: 'Does this property have a separate insurance policy covering flood losses?',
                  source: 'Default'
                },
                noPriorInsuranceSurcharge: {
                  answer: 'No',
                  question: 'If not new purchase, please provide proof of prior insurance.',
                  source: 'Default'
                }
              },
              underwritingExceptions: [],
              updatedAt: '2019-04-01T13:01:10.278Z',
              updatedBy: {
                _id: '5ca20b96f7a990000e935c58',
                userId: 'auth0|59419e3a43e76f16f68c3349',
                userName: 'tticcsr'
              },
              additionalPolicyholder: false,
              sameAsPropertyAddress: false
            },
            status: 200,
            timeTookByEndpoint: 126
          }
        },
        {
          name: 'getFirstZipCodeFromArray',
          value: {
            _id: '5aea142cdc0509268ca5ce7e',
            availableSlots: 182,
            coastal: false,
            companyCode: 'TTIC',
            coverageLimits: {
              dwelling: {
                maxAmount: 750000,
                maxReplacementCostRatio: 1.3,
                minAmount: 125000,
                minReplacementCostRatio: 0.9
              },
              personalLiability: {
                defaultAmount: 300000
              },
              personalProperty: {
                maxAmount: 400000,
                minAmount: 0
              }
            },
            coverageOptions: {
              personalPropertyReplacementCost: {
                defaultAnswer: true
              },
              sinkholePerilCoverage: {
                defaultAnswer: true
              }
            },
            id: '5aea142cdc0509268ca5ce7e',
            latitude: 27.3262,
            longitude: -82.47223,
            maxClaims: 1,
            maxEffectiveDate: '2019-06-30T00:00:00-04:00',
            maxNetPremium: 20000,
            maxProtectionClass: 8,
            maxWaitingPeriod: 90,
            maxYearBuilt: 2016,
            minCostPer100: 0.1,
            minEffectiveDate: '2019-04-01T00:00:00-04:00',
            minLossRatio: 1.1,
            minNetPremium: 700,
            minWaitingPeriod: 0,
            minYearBuilt: 1900,
            product: 'HO3',
            state: 'FL',
            suspended: false,
            territories: [
              '715-0',
              '715-51'
            ],
            timezone: 'America/New_York',
            zip: '00001'
          }
        },
        {
          name: 'igdId',
          value: '12000000000000001'
        },
        {
          name: 'getFirstZipCodeFromArrayForPDF',
          value: {
            _id: '5aea142cdc0509268ca5ce7e',
            availableSlots: 182,
            coastal: false,
            companyCode: 'TTIC',
            coverageLimits: {
              dwelling: {
                maxAmount: 750000,
                maxReplacementCostRatio: 1.3,
                minAmount: 125000,
                minReplacementCostRatio: 0.9
              },
              personalLiability: {
                defaultAmount: 300000
              },
              personalProperty: {
                maxAmount: 400000,
                minAmount: 0
              }
            },
            coverageOptions: {
              personalPropertyReplacementCost: {
                defaultAnswer: true
              },
              sinkholePerilCoverage: {
                defaultAnswer: true
              }
            },
            id: '5aea142cdc0509268ca5ce7e',
            latitude: 27.3262,
            longitude: -82.47223,
            maxClaims: 1,
            maxEffectiveDate: '2019-06-30T00:00:00-04:00',
            maxNetPremium: 20000,
            maxProtectionClass: 8,
            maxWaitingPeriod: 90,
            maxYearBuilt: 2016,
            minCostPer100: 0.1,
            minEffectiveDate: '2019-04-01T00:00:00-04:00',
            minLossRatio: 1.1,
            minNetPremium: 700,
            minWaitingPeriod: 0,
            minYearBuilt: 1900,
            product: 'HO3',
            state: 'FL',
            suspended: false,
            territories: [
              '715-0',
              '715-51'
            ],
            timezone: 'America/New_York',
            zip: '00001'
          }
        },
        {
          name: 'stateCode',
          value: 'FL'
        },
        {
          name: 'transactionSpec',
          value: {
            transactionSpec: {
              groups: {
                coverage: {
                  label: 'Coverage Info'
                },
                mailingbilling: {
                  label: 'Mailing/Billing Info'
                },
                underwriting: {
                  label: 'Underwriting Info'
                }
              },
              properties: {
                _id: {
                  group: 'coverage'
                },
                agencyCode: {
                  group: 'coverage'
                },
                agentCode: {
                  group: 'coverage'
                },
                billPlan: {
                  group: 'mailingbilling'
                },
                billToId: {
                  group: 'mailingbilling'
                },
                billToType: {
                  group: 'mailingbilling'
                },
                companyCode: {
                  group: 'coverage'
                },
                coverageLimits: {
                  group: 'coverage',
                  minProperties: 1
                },
                coverageOptions: {
                  group: 'coverage',
                  minProperties: 1
                },
                deductibles: {
                  group: 'coverage',
                  minProperties: 1
                },
                effectiveDate: {
                  group: 'coverage'
                },
                endDate: {
                  group: 'coverage'
                },
                policyHolderMailingAddress: {
                  group: 'mailingbilling',
                  minProperties: 1
                },
                policyHolders: {
                  group: 'coverage',
                  minItems: 1
                },
                product: {
                  group: 'coverage'
                },
                property: {
                  group: 'coverage',
                  minProperties: 1
                },
                quoteNumber: {
                  group: 'coverage'
                },
                rating: {
                  group: 'underwriting',
                  minProperties: 1
                },
                state: {
                  group: 'coverage'
                },
                underwritingAnswers: {
                  group: 'underwriting',
                  minProperties: 1
                }
              },
              required: [
                'underwritingAnswers',
                'billPlan',
                'billToId',
                'quoteNumber',
                'policyHolders',
                'endDate',
                'state',
                '_id',
                'agencyCode',
                'coverageLimits',
                'companyCode',
                'policyHolderMailingAddress',
                'coverageOptions',
                'deductibles',
                'rating',
                'effectiveDate',
                'property',
                'agentCode',
                'product'
              ],
              type: 'object'
            }
          }
        }
      ],
      workflowId: '4087132',
      completedTasks: [
        'uiTasks',
        'docuSignUrl',
        'search',
        'searchAddress',
        'chooseAddress',
        'getInfoFromCasaclue',
        'getZipCodeSettings',
        'getFirstZipCodeFromArray',
        'createQuote',
        'singleQuote',
        'quoteSchema',
        'transactionSpec',
        'zipCodeSettingsForPDFTimezone',
        'getFirstZipCodeFromArrayForPDF',
        'quote',
        'getActiveAgents'
      ],
      underwritingExceptions: [],
      uiQuestions: [{
          _id: '5bbba314ec85020015b7dd87',
          __v: 0,
          order: 1,
          name: 'primaryPolicyHolder',
          question: 'Primary Policyholder',
          answerType: 'heading',
          answers: [],
          group: [
            'primaryPolicyHolder'
          ],
          models: [
            'quote'
          ],
          product: [
            'HO3'
          ],
          state: [
            'FL'
          ],
          companyId: [
            'TTIC'
          ],
          steps: [
            'askAdditionalCustomerData'
          ],
          validations: []
        },
        {
          _id: '5bbba313ec85020015b7dd15',
          __v: 0,
          name: 'FirstName',
          defaultValueLocation: 'policyHolders[0].firstName',
          question: 'First Name',
          answerType: 'text',
          order: 2,
          answers: [],
          group: [
            'primaryPolicyHolder'
          ],
          models: [
            'quote'
          ],
          product: [
            'HO3'
          ],
          state: [
            'FL'
          ],
          companyId: [
            'TTIC'
          ],
          steps: [
            'askAdditionalCustomerData'
          ],
          validations: [
            'required',
            'maxLength255',
            'onlyAlphaNumeric'
          ]
        },
        {
          _id: '5bbba314ec85020015b7dd45',
          __v: 0,
          defaultValueLocation: 'policyHolders[0].lastName',
          name: 'LastName',
          question: 'Last Name',
          answerType: 'text',
          order: 3,
          answers: [],
          group: [
            'primaryPolicyHolder'
          ],
          models: [
            'quote'
          ],
          product: [
            'HO3'
          ],
          state: [
            'FL'
          ],
          companyId: [
            'TTIC'
          ],
          steps: [
            'askAdditionalCustomerData'
          ],
          validations: [
            'required',
            'maxLength255',
            'onlyAlphaNumeric'
          ]
        },
        {
          _id: '5bbba314ec85020015b7dd3c',
          __v: 0,
          name: 'EmailAddress',
          defaultValueLocation: 'policyHolders[0].emailAddress',
          question: 'Email Address',
          answerType: 'text',
          order: 4,
          answers: [],
          group: [
            'primaryPolicyHolder'
          ],
          models: [
            'quote'
          ],
          product: [
            'HO3'
          ],
          state: [
            'FL'
          ],
          companyId: [
            'TTIC'
          ],
          steps: [
            'askAdditionalCustomerData'
          ],
          validations: [
            'email',
            'maxLength255'
          ]
        },
        {
          _id: '5bbba314ec85020015b7dd4a',
          __v: 0,
          name: 'phoneNumber',
          styleName: 'phoneNumber',
          defaultValueLocation: 'policyHolders[0].primaryPhoneNumber',
          question: 'Contact Phone',
          answerType: 'phone',
          order: 5,
          answers: [],
          group: [
            'primaryPolicyHolder'
          ],
          models: [
            'quote'
          ],
          product: [
            'HO3'
          ],
          state: [
            'FL'
          ],
          companyId: [
            'TTIC'
          ],
          steps: [
            'askAdditionalCustomerData'
          ],
          validations: [
            'required',
            'phone'
          ]
        },
        {
          _id: '5bbba314ec85020015b7ddd5',
          __v: 0,
          answerType: 'bool',
          hidden: true,
          defaultValueLocation: 'policyHolders[0].electronicDelivery',
          order: 6,
          question: 'Deliver all policy documents electronically to Policyholder?',
          styleName: 'isAdditional',
          name: 'electronicDelivery',
          answers: [],
          group: [
            'primaryPolicyholder'
          ],
          models: [
            'quote'
          ],
          product: [
            'HO3'
          ],
          state: [
            'FL'
          ],
          companyId: [
            'TTIC'
          ],
          steps: [
            'askAdditionalCustomerData'
          ],
          validations: []
        },
        {
          _id: '5bbba314ec85020015b7dd5d',
          __v: 0,
          answerType: 'bool',
          order: 7,
          question: 'Do you want to add an additional Policyholder?',
          styleName: 'isAdditional',
          name: 'isAdditional',
          answers: [],
          group: [
            'secondaryPolicyHolder'
          ],
          models: [
            'quote'
          ],
          product: [
            'HO3'
          ],
          state: [
            'FL'
          ],
          companyId: [
            'TTIC'
          ],
          steps: [
            'askAdditionalCustomerData'
          ],
          validations: []
        },
        {
          _id: '5bbba314ec85020015b7ddb5',
          __v: 0,
          order: 8,
          name: 'secondaryPolicyHolder',
          question: 'Secondary Policyholder',
          answerType: 'heading',
          conditional: {
            display: [{
              parent: 'isAdditional',
              trigger: true,
              operator: 'equal',
              type: 'remove'
            }]
          },
          answers: [],
          group: [
            'secondaryPolicyHolder'
          ],
          models: [
            'quote'
          ],
          product: [
            'HO3'
          ],
          state: [
            'FL'
          ],
          companyId: [
            'TTIC'
          ],
          steps: [
            'askAdditionalCustomerData'
          ],
          validations: []
        },
        {
          _id: '5bbba314ec85020015b7ddc8',
          __v: 0,
          name: 'FirstName2',
          defaultValueLocation: 'policyHolders[1].firstName',
          question: 'First Name',
          answerType: 'text',
          order: 9,
          conditional: {
            display: [{
              parent: 'isAdditional',
              trigger: true,
              operator: 'equal',
              type: 'remove'
            }]
          },
          answers: [],
          group: [
            'secondaryPolicyHolder'
          ],
          models: [
            'quote'
          ],
          product: [
            'HO3'
          ],
          state: [
            'FL'
          ],
          companyId: [
            'TTIC'
          ],
          steps: [
            'askAdditionalCustomerData'
          ],
          validations: [
            'required',
            'maxLength255',
            'onlyAlphaNumeric'
          ]
        },
        {
          _id: '5bbba314ec85020015b7ddb6',
          __v: 0,
          defaultValueLocation: 'policyHolders[1].lastName',
          name: 'LastName2',
          question: 'Last Name',
          answerType: 'text',
          order: 10,
          conditional: {
            display: [{
              parent: 'isAdditional',
              trigger: true,
              operator: 'equal',
              type: 'remove'
            }]
          },
          answers: [],
          group: [
            'secondaryPolicyHolder'
          ],
          models: [
            'quote'
          ],
          product: [
            'HO3'
          ],
          state: [
            'FL'
          ],
          companyId: [
            'TTIC'
          ],
          steps: [
            'askAdditionalCustomerData'
          ],
          validations: [
            'required',
            'maxLength255',
            'onlyAlphaNumeric'
          ]
        },
        {
          _id: '5bbba314ec85020015b7dd6c',
          __v: 0,
          name: 'EmailAddress2',
          defaultValueLocation: 'policyHolders[1].emailAddress',
          question: 'Email Address',
          answerType: 'text',
          order: 11,
          conditional: {
            display: [{
              parent: 'isAdditional',
              trigger: true,
              operator: 'equal',
              type: 'remove'
            }]
          },
          answers: [],
          group: [
            'secondaryPolicyHolder'
          ],
          models: [
            'quote'
          ],
          product: [
            'HO3'
          ],
          state: [
            'FL'
          ],
          companyId: [
            'TTIC'
          ],
          steps: [
            'askAdditionalCustomerData'
          ],
          validations: [
            'email',
            'maxLength255'
          ]
        },
        {
          _id: '5bbba314ec85020015b7ddc9',
          __v: 0,
          name: 'phoneNumber2',
          styleName: 'phoneNumber2',
          defaultValueLocation: 'policyHolders[1].primaryPhoneNumber',
          question: 'Policyholder Contact Phone',
          answerType: 'phone',
          order: 12,
          conditional: {
            display: [{
              parent: 'isAdditional',
              trigger: true,
              operator: 'equal',
              type: 'remove'
            }]
          },
          answers: [],
          group: [
            'secondaryPolicyHolder'
          ],
          models: [
            'quote'
          ],
          product: [
            'HO3'
          ],
          state: [
            'FL'
          ],
          companyId: [
            'TTIC'
          ],
          steps: [
            'askAdditionalCustomerData'
          ],
          validations: [
            'required',
            'phone'
          ]
        },
        {
          _id: '5bbba314ec85020015b7dda3',
          __v: 0,
          order: 13,
          name: 'policyHolderDetails',
          question: 'Policy Details',
          answerType: 'heading',
          answers: [],
          group: [
            'policyHolderDetails'
          ],
          models: [
            'quote'
          ],
          product: [
            'HO3'
          ],
          state: [
            'FL'
          ],
          companyId: [
            'TTIC'
          ],
          steps: [
            'askAdditionalCustomerData'
          ],
          validations: []
        },
        {
          _id: '5bbba314ec85020015b7dd52',
          __v: 0,
          name: 'effectiveDate',
          defaultValueLocation: 'effectiveDate',
          question: 'Effective Date',
          answerType: 'date',
          order: 15,
          answers: [],
          group: [
            'policyHolderDetails'
          ],
          models: [
            'quote'
          ],
          product: [
            'HO3'
          ],
          state: [
            'FL'
          ],
          companyId: [
            'TTIC'
          ],
          steps: [
            'askAdditionalCustomerData'
          ],
          validations: [
            'required',
            'date',
            'dateCheck'
          ]
        }
      ],
      underwritingQuestions: [],
      isHardStop: false
    }
  }
}