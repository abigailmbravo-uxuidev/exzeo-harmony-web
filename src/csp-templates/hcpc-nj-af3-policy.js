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
      className: 'workflow-banner hcpci nj af3 policy',
      icon: 'af3',
      title: 'Homeowners Choice',
      subTitle: 'NJ'
    }
  },
  disclaimer: {
    className: 'workflow-disclaimer',
    displayText:
      'In Florida, insurance products and services are underwritten by TypTap Insurance Company. In Arkansas, California, Maryland, New Jersey, Ohio, Pennsylvania, South Carolina and Texas insurance products and services are underwritten by Homeowners Choice Property & Casualty Insurance Company, Inc.'
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
          path: 'page.policyHolder.secondaryPolicyHolder',
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
                          label: 'FEMA Flood Zone',
                          items: [
                            { format: '', path: 'property.FEMAfloodZone' }
                          ]
                        },
                        {
                          label: 'Residence Type',
                          items: [
                            { format: '', path: 'property.residenceType' }
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
            className: 'coverage-limits'
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
                          label: 'A. Building',
                          items: [
                            {
                              format: 'currency',
                              path: 'coverageLimits.building.amount'
                            }
                          ]
                        },
                        {
                          label: 'B. Personal Property',
                          items: [
                            {
                              format: 'currency',
                              path: 'coverageLimits.personalProperty.amount'
                            }
                          ]
                        },
                        {
                          label: 'C. Other Coverages',
                          items: [
                            {
                              path: 'coverageLimits.otherCoverages.amount'
                            }
                          ]
                        },
                        {
                          label: 'D. Increased Cost of Compliance',
                          items: [
                            {
                              format: 'currency',
                              path: 'coverageLimits.increasedCompliance.amount'
                            }
                          ]
                        },
                        {
                          label: 'E. Loss of Use',
                          items: [
                            {
                              format: 'currency',
                              path: 'coverageLimits.lossOfUse.amount'
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
            }
          ]
        },
        {
          id: 300008,
          component: '$SECTION',
          dependencies: '',
          data: {
            className: 'deductible'
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
                          label: 'Flood Building Deductible',
                          items: [
                            {
                              format: 'currency',
                              path: 'deductibles.buildingDeductible.amount'
                            }
                          ]
                        },
                        {
                          label: 'Flood Content Deductible',
                          items: [
                            {
                              format: 'currency',
                              path:
                                'deductibles.personalPropertyDeductible.amount'
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
          id: '066b404e-fdca-4c65-a7bd-ce4406116467',
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
