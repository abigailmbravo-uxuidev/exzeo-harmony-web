/* eslint-disable */
const mock = {
  header: {
    hideDetailSummary: true,
    showEffectiveDateButton: false,
    showReinstateButton: false,
    fields: [
      { value: 'policyHolder', component: 'Section', label: 'Policyholder' },
      { value: 'mailingAddress', component: 'Section' },
      { value: 'propertyAddress', component: 'Section' },
      { value: 'county', label: 'Property County' },
      { value: 'policyNumber' },
      { value: 'effectiveDate' }
    ],
    banner: {
      className: 'workflow-banner ttic fl ho3 policy',
      icon: 'ho3',
      title: 'TypTap',
      subTitle: 'FL'
    }
  },
  pages: [
    {
      name: 'policyHolder',
      step: {},
      components: [
        {
          id: 100000,
          component: '$SECTION',
          dependencies: '',
          data: {
            className: 'policyholder-one-demographics'
          },
          formData: {},
          children: [
            {
              id: 1000001,
              component: '$TITLE',
              dependencies: '',
              data: {
                text: 'Policyholder 1',
                icon: 'fa fa-vcard-o'
              },
              formData: {},
              children: []
            },
            {
              id: 1000002,
              component: '$ENTITY_DETAILS',
              dependencies: '',
              data: {
                extendedProperties: {
                  className: 'row-items',
                  details: [
                    {
                      label: 'Policyholder Name',
                      items: [{ format: 'name', path: 'policyHolders[0]' }]
                    },
                    {
                      label: 'Phone 1',
                      items: [
                        {
                          format: 'phone',
                          path: 'policyHolders[0].primaryPhoneNumber'
                        }
                      ]
                    },
                    {
                      label: 'Phone 2',
                      optional: true,
                      items: [
                        {
                          format: 'phone',
                          path: 'policyHolders[0].secondaryPhoneNumber'
                        }
                      ]
                    },
                    {
                      label: 'Email',
                      items: [
                        { format: '', path: 'policyHolders[0].emailAddress' }
                      ]
                    }
                  ]
                }
              },
              formData: {},
              children: []
            },
            {
              id: 1000005,
              component: '$ENTITY_DETAILS',
              dependencies: '',
              data: {
                extendedProperties: {
                  className: 'row-items',
                  details: [
                    {
                      label: 'Mailing Address',
                      items: [
                        {
                          format: '',
                          path: 'policyHolderMailingAddress.address1'
                        },
                        {
                          format: '',
                          path: 'policyHolderMailingAddress.address2'
                        },
                        {
                          format: 'cityStateZip',
                          path: 'policyHolderMailingAddress'
                        }
                      ]
                    }
                  ]
                }
              },
              formData: {},
              children: []
            }
          ]
        },
        {
          id: 44000,
          component: '$SECTION',
          path: 'page.summary.secondaryPolicyHolder',
          dependencies: '${it.policyHolders[1].firstName}',
          data: {
            className: 'policyholder-two-demographics'
          },
          formData: {},
          children: [
            {
              id: 440003,
              component: '$TITLE',
              dependencies: '',
              data: {
                text: 'Policyholder 2',
                icon: 'fa fa-vcard-o'
              },
              formData: {},
              children: []
            },
            {
              id: 440004,
              component: '$ENTITY_DETAILS',
              dependencies: '',
              data: {
                extendedProperties: {
                  className: 'row-items',
                  details: [
                    {
                      label: 'Policyholder Name',
                      items: [{ format: 'name', path: 'policyHolders[1]' }]
                    },
                    {
                      label: 'Phone 1',
                      items: [
                        {
                          format: 'phone',
                          path: 'policyHolders[1].primaryPhoneNumber'
                        }
                      ]
                    },
                    {
                      label: 'Phone 2',
                      optional: true,
                      items: [
                        {
                          format: 'phone',
                          path: 'policyHolders[1].secondaryPhoneNumber'
                        }
                      ]
                    },
                    {
                      label: 'Email',
                      items: [
                        { format: '', path: 'policyHolders[1].emailAddress' }
                      ]
                    }
                  ]
                }
              },
              formData: {},
              children: []
            }
          ]
        },
        {
          id: 550000,
          component: '$SECTION',
          dependencies: '',
          data: {
            className: 'agent-demographics'
          },
          formData: {},
          children: [
            {
              id: 5550006,
              component: '$TITLE',
              dependencies: '',
              data: {
                text: 'Agent',
                icon: 'fa fa-vcard-o'
              },
              formData: {},
              children: []
            },
            {
              id: 666654007,
              component: '$ENTITY_DETAILS',
              dependencies: '',
              data: {
                extendedProperties: {
                  className: 'row-items',
                  details: [
                    {
                      label: 'Agent Name',
                      items: [
                        {
                          format: 'name',
                          optionKey: 'agents',
                          compareField: 'agentCode',
                          valuePath: 'agentCode'
                        }
                      ]
                    },
                    {
                      label: 'Phone',
                      items: [
                        {
                          format: 'phone',
                          optionKey: 'agents',
                          compareField: 'agentCode',
                          valuePath: 'agentCode',
                          selectField: 'primaryPhoneNumber'
                        }
                      ]
                    },
                    {
                      label: 'Email',
                      items: [
                        {
                          format: '',
                          optionKey: 'agents',
                          compareField: 'agentCode',
                          valuePath: 'agentCode',
                          selectField: 'emailAddress'
                        }
                      ]
                    },
                    {
                      label: 'Mailing Address',
                      items: [
                        {
                          format: '',
                          optionKey: 'agents',
                          compareField: 'agentCode',
                          valuePath: 'agentCode',
                          selectField: 'mailingAddress.address1'
                        },
                        {
                          format: '',
                          optionKey: 'agents',
                          compareField: 'agentCode',
                          valuePath: 'agentCode',
                          selectField: 'mailingAddress.address2'
                        },
                        {
                          format: 'cityStateZip',
                          optionKey: 'agents',
                          compareField: 'agentCode',
                          valuePath: 'agentCode',
                          selectField: 'mailingAddress'
                        }
                      ]
                    }
                  ]
                }
              },
              formData: {},
              children: []
            }
          ]
        }
      ]
    },
    {
      name: 'property',
      step: {},
      components: [
        {
          id: 54353005,
          component: '$SECTION',
          dependencies: '',
          data: {
            className: 'home-location'
          },
          formData: {},
          children: [
            {
              id: 7654300032323,
              component: '$TITLE',
              dependencies: '',
              data: {
                text: 'Home and Location',
                icon: 'fa fa-map-marker'
              },
              formData: {},
              children: []
            },
            {
              id: 655640034,
              component: '$SECTION',
              dependencies: '',
              data: {
                className: 'home-location-left'
              },
              formData: {},
              children: [
                {
                  id: 2000004434,
                  component: '$ENTITY_DETAILS',
                  dependencies: '',
                  data: {
                    extendedProperties: {
                      className: 'home-and-location',
                      details: [
                        {
                          label: 'Year Home Built',
                          items: [{ format: '', path: 'property.yearBuilt' }]
                        },
                        {
                          label: 'Protection Class',
                          items: [
                            { format: '', path: 'property.protectionClass' }
                          ]
                        },
                        {
                          label: 'Dist. to Tidal Waters',
                          items: [
                            {
                              format: 'feet',
                              path: 'property.distanceToTidalWater'
                            }
                          ]
                        },
                        {
                          label: 'Residence Type',
                          items: [
                            { format: '', path: 'property.residenceType' }
                          ]
                        },
                        {
                          label: 'Construction',
                          items: [
                            { format: '', path: 'property.constructionType' }
                          ]
                        },
                        {
                          label: 'BCEG',
                          items: [
                            {
                              format: '',
                              path: 'property.buildingCodeEffectivenessGrading'
                            }
                          ]
                        }
                      ]
                    }
                  },
                  formData: {},
                  children: []
                }
              ]
            },
            {
              id: 655640022,
              component: '$SECTION',
              dependencies: '',
              data: {
                className: 'home-location-right'
              },
              formData: {},
              children: [
                {
                  id: 2000004,
                  component: '$ENTITY_DETAILS',
                  dependencies: '',
                  data: {
                    extendedProperties: {
                      className: 'home-and-location',
                      details: [
                        {
                          label: 'Dist. to Fire Hydrant',
                          items: [
                            {
                              format: 'appendUnitMaxDigits',
                              path: 'property.distanceToFireHydrant',
                              unitOfMeasure: 'ft.',
                              digits: '2'
                            }
                          ]
                        },
                        {
                          label: 'Square Footage',
                          items: [{ format: '', path: 'property.squareFeet' }]
                        },
                        {
                          label: 'Year Roof Built',
                          items: [
                            {
                              format: 'toValueOrDash',
                              path: 'property.yearOfRoof'
                            }
                          ]
                        },
                        {
                          label: 'Family Units',
                          items: [{ format: '', path: 'property.familyUnits' }]
                        },
                        {
                          label: 'Dist. to Fire Station',
                          items: [
                            {
                              format: 'miles',
                              path: 'property.distanceToFireStation'
                            }
                          ]
                        },
                        {
                          label: 'Flood Zone',
                          items: [{ format: '', path: 'property.floodZone' }]
                        }
                      ]
                    }
                  },
                  formData: {},
                  children: []
                }
              ]
            }
          ]
        },
        {
          id: 765475505,
          component: '$SECTION',
          dependencies: '',
          data: {
            className: 'wind-mitigation'
          },
          formData: {},
          children: [
            {
              id: 2000006232221,
              component: '$TITLE',
              dependencies: '',
              data: {
                text: 'Wind Mitigation',
                icon: 'fa fa-flag'
              },
              formData: {},
              children: []
            },
            {
              id: 200005321111111,
              component: '$SECTION',
              dependencies: '',
              data: {
                className: 'wind-mitigation-left'
              },
              formData: {},
              children: [
                {
                  id: 200000222222227,
                  component: '$ENTITY_DETAILS',
                  dependencies: '',
                  data: {
                    extendedProperties: {
                      className: 'home-and-location',
                      details: [
                        {
                          label: 'Roof Covering',
                          items: [
                            {
                              format: '',
                              path: 'property.windMitigation.roofCovering'
                            }
                          ]
                        },
                        {
                          label: 'Roof Geometry',
                          items: [
                            {
                              format: '',
                              path: 'property.windMitigation.roofGeometry'
                            }
                          ]
                        },
                        {
                          label: 'FBC Wind Speed',
                          items: [
                            {
                              format: '',
                              path:
                                'property.windMitigation.floridaBuildingCodeWindSpeed'
                            }
                          ]
                        },
                        {
                          label: 'Internal Pressure Design',
                          items: [
                            {
                              format: '',
                              path:
                                'property.windMitigation.internalPressureDesign'
                            }
                          ]
                        },
                        {
                          label: 'Roof Deck Attachment',
                          items: [
                            {
                              format: '',
                              path: 'property.windMitigation.roofDeckAttachment'
                            }
                          ]
                        },
                        {
                          label: 'Secondary Water Resistance (SWR)',
                          items: [
                            {
                              format: '',
                              path:
                                'property.windMitigation.secondaryWaterResistance'
                            }
                          ]
                        }
                      ]
                    }
                  },
                  formData: {},
                  children: []
                }
              ]
            },
            {
              id: 20004533205,
              component: '$SECTION',
              dependencies: '',
              data: {
                className: 'wind-mitigation-right'
              },
              formData: {},
              children: [
                {
                  id: 2003333330007,
                  component: '$ENTITY_DETAILS',
                  dependencies: '',
                  data: {
                    extendedProperties: {
                      className: 'home-and-location',
                      details: [
                        {
                          label: 'FBC Wind Speed Design',
                          items: [
                            {
                              format: '',
                              path:
                                'property.windMitigation.floridaBuildingCodeWindSpeedDesign'
                            }
                          ]
                        },
                        {
                          label: 'Wind Borne Debris Region (WBDR)',
                          items: [
                            {
                              format: '',
                              path:
                                'property.windMitigation.windBorneDebrisRegion'
                            }
                          ]
                        },
                        {
                          label: 'Roof to Wall Attachment',
                          items: [
                            {
                              format: '',
                              path:
                                'property.windMitigation.roofToWallConnection'
                            }
                          ]
                        },
                        {
                          label: 'Opening Protection',
                          items: [
                            {
                              format: '',
                              path: 'property.windMitigation.openingProtection'
                            }
                          ]
                        },
                        {
                          label: 'Terrain',
                          items: [
                            {
                              format: '',
                              path: 'property.windMitigation.terrain'
                            }
                          ]
                        },
                        {
                          label: 'Wind Mit Factor',
                          items: [
                            {
                              format: '',
                              path:
                                'rating.worksheet.elements.windMitigationFactors.windMitigationDiscount'
                            }
                          ]
                        }
                      ]
                    }
                  },
                  formData: {},
                  children: []
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: 'coverage',
      step: {},
      components: [
        {
          id: 300453322234005,
          component: '$SECTION',
          dependencies: '',
          data: {
            className: 'coverage-limits',
            dataTest: 'coverage-limits'
          },
          formData: {},
          children: [
            {
              id: 2000006232221,
              component: '$TITLE',
              dependencies: '',
              data: {
                text: 'Coverage Limits',
                icon: 'fa fa-line-chart'
              },
              formData: {},
              children: []
            },
            {
              id: 3000054354,
              component: '$SECTION',
              dependencies: '',
              data: {
                className: 'coverage-limits-left'
              },
              formData: {},
              children: [
                {
                  id: 3056657004,
                  component: '$ENTITY_DETAILS',
                  dependencies: '',
                  data: {
                    extendedProperties: {
                      className: 'coverage',
                      details: [
                        {
                          label: 'A. Dwelling',
                          items: [
                            {
                              format: 'currency',
                              path: 'coverageLimits.dwelling.amount'
                            }
                          ]
                        },
                        {
                          label: 'B. Other Structures',
                          items: [
                            {
                              format: 'currency',
                              path: 'coverageLimits.otherStructures.amount'
                            }
                          ]
                        },
                        {
                          label: 'C. Personal Property',
                          items: [
                            {
                              format: 'currency',
                              path: 'coverageLimits.personalProperty.amount'
                            }
                          ]
                        },
                        {
                          label: 'D. Loss of Use',
                          items: [
                            {
                              format: 'currency',
                              path: 'coverageLimits.lossOfUse.amount'
                            }
                          ]
                        },
                        {
                          label: 'E. Personal Liability',
                          items: [
                            {
                              format: 'currency',
                              path: 'coverageLimits.personalLiability.amount'
                            }
                          ]
                        },
                        {
                          label: 'F. Medical Payments',
                          items: [
                            {
                              format: 'currency',
                              path: 'coverageLimits.medicalPayments.amount'
                            }
                          ]
                        },
                        {
                          label: 'Personal Property Replacement Cost',
                          items: [
                            {
                              format: 'bool',
                              path:
                                'coverageOptions.personalPropertyReplacementCost.answer'
                            }
                          ]
                        }
                      ]
                    }
                  },
                  formData: {},
                  children: []
                }
              ]
            },
            {
              id: 30004444444400,
              component: '$SECTION',
              dependencies: '',
              data: {
                className: 'coverage-limits-right'
              },
              formData: {},
              children: [
                {
                  id: 3003232323232320004,
                  component: '$ENTITY_DETAILS',
                  dependencies: '',
                  data: {
                    extendedProperties: {
                      className: 'coverage',
                      details: [
                        {
                          label: 'Mold Property',
                          items: [
                            {
                              format: 'currency',
                              path: 'coverageLimits.moldProperty.amount'
                            }
                          ]
                        },
                        {
                          label: 'Mold Liability',
                          items: [
                            {
                              format: 'currency',
                              path: 'coverageLimits.moldLiability.amount'
                            }
                          ]
                        },
                        {
                          label: 'Ordinance or Law',
                          items: [
                            {
                              format: 'percent',
                              path: 'coverageLimits.ordinanceOrLaw.amount'
                            }
                          ]
                        },
                        {
                          label: 'All Other Perils Deductible',
                          items: [
                            {
                              format: 'currency',
                              path: 'deductibles.allOtherPerils.amount'
                            }
                          ]
                        },
                        {
                          label: 'Hurricane Deductible',
                          items: [
                            {
                              format: 'currency',
                              path: 'deductibles.hurricane.calculatedAmount'
                            }
                          ]
                        },
                        {
                          label: 'Sinkhole Deductible',
                          items: [
                            {
                              format: 'currency',
                              path: 'deductibles.sinkhole.calculatedAmount'
                            }
                          ]
                        }
                      ]
                    }
                  },
                  formData: {},
                  children: []
                }
              ]
            }
          ]
        },
        {
          id: 303434343445660005,
          component: '$SECTION',
          dependencies: '',
          data: {
            className: 'discount-surcharge',
            dataTest: 'discount-surcharge'
          },
          formData: {},
          children: [
            {
              id: 30023232323233340006,
              component: '$TITLE',
              dependencies: '',
              data: {
                text: 'Discount / Surcharge',
                icon: 'fa fa-shopping-cart'
              },
              formData: {},
              children: []
            },
            {
              id: 30045022324,
              component: '$SECTION',
              dependencies: '',
              data: {
                className: 'discount-surcharge-left'
              },
              formData: {},
              children: [
                {
                  id: 32232333004407,
                  component: '$ENTITY_DETAILS',
                  dependencies: '',
                  data: {
                    extendedProperties: {
                      details: [
                        {
                          label: 'Townhouse/Rowhouse',
                          items: [
                            {
                              format: 'bool',
                              path: 'property.townhouseRowhouse'
                            }
                          ]
                        },
                        {
                          label: 'Property Ever Rented',
                          items: [
                            {
                              format: '',
                              path: 'underwritingAnswers.rented.answer'
                            }
                          ]
                        },
                        {
                          label: 'Seasonally Occupied',
                          items: [
                            {
                              format: 'conditionalBool',
                              path: 'underwritingAnswers.monthsOccupied.answer',
                              conditions: ['0-3', '4-6']
                            }
                          ]
                        },
                        {
                          label: 'No Prior Insurance',
                          items: [
                            {
                              format: '',
                              path:
                                'underwritingAnswers.noPriorInsuranceSurcharge.answer'
                            }
                          ]
                        }
                      ]
                    }
                  },
                  formData: {},
                  children: []
                }
              ]
            },
            {
              id: 307767500545,
              component: '$SECTION',
              dependencies: '',
              data: {
                className: 'discount-surcharge-right'
              },
              formData: {},
              children: [
                {
                  id: 32232336757877,
                  component: '$ENTITY_DETAILS',
                  dependencies: '',
                  data: {
                    extendedProperties: {
                      details: [
                        {
                          label: 'Burglar Alarm',
                          items: [
                            { format: 'bool', path: 'property.burglarAlarm' }
                          ]
                        },
                        {
                          label: 'Fire Alarm',
                          items: [
                            { format: 'bool', path: 'property.fireAlarm' }
                          ]
                        },
                        {
                          label: 'Sprinkler',
                          items: [
                            {
                              format: 'conditionalValue',
                              path: 'property.sprinkler',
                              conditions: ['N'],
                              defaultValue: 'No'
                            }
                          ]
                        },
                        {
                          label: 'Wind Mit Factor',
                          items: [
                            {
                              format: '',
                              path:
                                'rating.worksheet.elements.windMitigationFactors.windMitigationDiscount'
                            }
                          ]
                        }
                      ]
                    }
                  },
                  formData: {},
                  children: []
                }
              ]
            }
          ]
        },
        {
          id: 300008,
          component: '$SECTION',
          dependencies: '',
          data: {
            className: 'deductible',
            dataTest: 'deductible'
          },
          formData: {},
          children: [
            {
              id: 3005439,
              component: '$TITLE',
              dependencies: '',
              data: {
                text: 'Deductible',
                icon: 'fa fa-long-arrow-down'
              },
              formData: {},
              children: []
            },
            {
              id: 30023232323233340006,
              component: '$SECTION',
              dependencies: '',
              data: {
                className: 'deductible-left'
              },
              formData: {},
              children: [
                {
                  id: 3000010,
                  component: '$ENTITY_DETAILS',
                  dependencies: '',
                  data: {
                    extendedProperties: {
                      className: 'deductible',
                      details: [
                        {
                          label: 'All Other Perils',
                          items: [
                            {
                              format: 'currency',
                              path: 'deductibles.allOtherPerils.amount'
                            }
                          ]
                        },
                        {
                          label: 'Hurricane Deductible',
                          items: [
                            {
                              format: 'percent',
                              path: 'deductibles.hurricane.amount'
                            }
                          ]
                        },
                        {
                          label: 'Sinkhole Deductible',
                          items: [
                            {
                              format: 'conditionalPercent',
                              path: 'deductibles.sinkhole.amount',
                              conditions: [''],
                              defaultValue: 'No'
                            }
                          ]
                        }
                      ]
                    }
                  },
                  formData: {},
                  children: []
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: 'billing',
      step: {},
      components: [
        {
          id: 400000,
          component: '$SECTION',
          dependencies: '',
          data: {
            className: 'premium-billing-info'
          },
          formData: {},
          children: [
            {
              id: 40005555555555500,
              component: '$SECTION',
              dependencies: '',
              data: {
                className: 'premium'
              },
              formData: {},
              children: [
                {
                  id: 4000006,
                  component: '$TITLE',
                  dependencies: '',
                  data: {
                    text: 'Premium',
                    icon: 'fa fa-area-chart'
                  },
                  formData: {},
                  children: []
                },
                {
                  id: 4000007,
                  component: '$ENTITY_DETAILS',
                  dependencies: '',
                  data: {
                    extendedProperties: {
                      details: [
                        {
                          label: 'Current Premium',
                          items: [
                            {
                              format: 'currencyDecimals',
                              path: 'summaryLedger.currentPremium'
                            }
                          ]
                        },
                        {
                          label: 'Initial Premium',
                          items: [
                            {
                              format: 'currencyDecimals',
                              path: 'summaryLedger.initialPremium'
                            }
                          ]
                        },
                        {
                          label: 'Balance Due',
                          items: [
                            {
                              format: 'currencyDecimals',
                              path: 'summaryLedger.balance'
                            }
                          ]
                        }
                      ]
                    }
                  },
                  formData: {},
                  children: []
                }
              ]
            },
            {
              id: 4044444444440000,
              component: '$SECTION',
              dependencies: '',
              data: {
                className: 'billing-info'
              },
              formData: {},
              children: [
                {
                  id: 4000008,
                  component: '$POLICY_BILLING',
                  dependencies: '',
                  data: {},
                  formData: {},
                  children: []
                }
              ]
            }
          ]
        },
        {
          id: 400009,
          component: '$SECTION',
          dependencies: '',
          data: {
            className: 'payments'
          },
          formData: {},
          children: [
            {
              id: 4000011,
              component: '$POLICY_PAYMENTS',
              dependencies: '',
              data: {},
              formData: {},
              children: []
            }
          ]
        }
      ]
    },
    {
      name: 'claims',
      step: {},
      components: [
        {
          id: '34fe8493-49f3-4984-a9f7-ba4dd4099b55',
          component: '$POLICY_CLAIMS',
          dependencies: '',
          data: {},
          formData: {},
          children: []
        }
      ]
    },
    {
      name: 'documents',
      step: {},
      components: [
        {
          id: 500000,
          component: '$SECTION',
          dependencies: '',
          data: {},
          formData: {},
          children: [
            {
              id: 5000001,
              component: '$POLICY_DOCUMENTS',
              dependencies: '',
              data: {},
              formData: {},
              children: []
            }
          ]
        }
      ]
    }
  ]
};

export default mock;
