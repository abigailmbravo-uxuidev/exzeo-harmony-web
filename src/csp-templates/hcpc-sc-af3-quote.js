/* eslint-disable */
const mock = {
  header: {
    hideDetailSummary: true,
    fields: [
      { value: 'quoteNumber' },
      { value: 'propertyAddress', component: 'Section', label: 'Address' },
      { value: 'yearBuilt' },
      { value: 'FEMAfloodZone', label: 'FEMA Flood Zone' },
      {
        value: 'coverageLimits.building.amount',
        label: 'Coverage A',
        format: 'currency',
        alternateFormat: {
          steps: [0, 1],
          display: '$ --'
        }
      },
      { value: 'premium', component: 'PremiumSection' }
    ],
    banner: {
      className: 'workflow-banner hcpci sc af3 quote',
      icon: 'af3',
      title: 'Homeowners Choice',
      subTitle: 'SC'
    }
  },
  disclaimer: {
    displayText:
      'In Florida, insurance products and services are underwritten by TypTap Insurance Company. In Arkansas, California, Maryland, New Jersey, Ohio, Pennsylvania, South Carolina and Texas insurance products and services are underwritten by Homeowners Choice Property & Casualty Insurance Company, Inc.'
  },
  pages: [
    {
      name: 'customerInfo',
      step: {},
      components: [
        {
          id: 1,
          type: '$TITLE',
          dependencies: [],
          data: {
            text: 'Policy Details',
            icon: 'fa fa-file-text'
          },
          formData: {},
          children: []
        },
        {
          id: 3,
          type: '$INPUT',
          dependencies: [],
          path: 'policyHolders[0].firstName',
          data: {
            component: 'text',
            label: 'First Name',
            size: '5',
            validation: ['isValidNameFormat']
          },
          formData: {
            path: 'policyHolders.policyHolder.firstName',
            type: 'string',
            required: true,
            metaData: {
              minLength: 1,
              maxLength: 255
            }
          },
          children: []
        },
        {
          id: 4,
          type: '$INPUT',
          path: 'policyHolders[0].lastName',
          dependencies: [],
          data: {
            component: 'text',
            label: 'Last Name',
            size: '7',
            validation: ['isValidNameFormat']
          },
          formData: {
            path: 'policyHolders.policyHolder.lastName',
            type: 'string',
            required: true,
            metaData: {
              minLength: 1,
              maxLength: 255
            }
          },
          children: []
        },
        {
          id: 15,
          type: '$INPUT',
          path: 'effectiveDate',
          dependencies: [],
          data: {
            component: 'date',
            label: 'Effective Date',
            size: '6',
            extendedProperties: {
              min: 'zipCodeSettings.minEffectiveDate',
              max: 'zipCodeSettings.maxEffectiveDate'
            },
            validation: ['minEffectiveDate', 'isValidDate']
          },
          formData: {
            path: 'effectiveDate',
            type: 'string',
            required: true,
            metaData: {
              format: 'date-time'
            }
          },
          children: []
        },
        {
          id: 16,
          type: '$INPUT',
          path: 'agentCode',
          dependencies: [],
          data: {
            component: 'selectInteger',
            label: 'Agent',
            size: '6',
            dataSource: 'agents'
          },
          formData: {
            path: 'agentCode',
            type: 'integer',
            required: true,
            metaData: {}
          },
          children: []
        }
      ]
    },
    {
      name: 'underwriting',
      step: {},
      components: [
        {
          id: 1,
          type: '$CUSTOM',
          dependencies: [],
          data: {
            component: '$UNDERWRITING'
          },
          formData: {},
          children: []
        }
      ]
    },
    {
      name: 'customize',
      step: {},
      components: [
        {
          id: 133333,
          type: '$TITLE',
          dependencies: [],
          data: {
            text: 'Coverage Limits',
            icon: 'fa fa-line-chart'
          },
          formData: {},
          children: []
        },
        {
          id: 133330,
          type: '$CUSTOM',
          dependencies: [],
          data: {
            component: '$WARNING',
            as: 'div'
          },
          formData: {},
          children: []
        },
        {
          id: 3456354,
          type: '$CUSTOM',
          dependencies: [],
          data: {
            component: '$SLIDER_GROUP',
            extendedProperties: {
              primaryField: {
                name: 'coverageLimits.building.value',
                label: 'Building',
                min: 'coverageLimits.building.minAmount',
                max: 'coverageLimits.building.maxAmount',
                hint:
                  'This Flood policy quote includes replacement cost coverage on the building, so this amount should represent the total cost to rebuild the home to its current state in the event of a loss. If you have a Declarations Page from the current flood policy it may be listed as Coverage A \n \n Based on basic information we have for the home, we provide you a guide for a recommended value. You can move this number up or down based on more detailed information.'
              },
              secondaryField: {
                name: 'coverageLimits.personalProperty.value',
                label: 'Personal Property',
                hint:
                  'This is the personal belongings, or items located inside the home. This could include furniture, clothing, bedding, dishes, etc. To have replacement cost coverage on Personal Property, please select Personal Property limits at a minimum of 25% of the Building limit.'
              },
              subscribe: true
            }
          },
          formData: {},
          children: []
        },
        {
          id: 678453,
          type: '$INPUT',
          path: 'coverageOptions.personalPropertyReplacementCost.answer',
          dependencies: [{ pprcc: true }],
          data: {
            component: 'switch',
            label: 'Do you want Personal Property Replacement Cost Coverage?',
            size: '12',
            hint:
              "Replacement Cost Coverage replaces damaged possessions at today's prices without deducting for depreciation. If you choose not to select this coverage, loss for personal property will be paid out at Actual Cash Value."
          },
          formData: {
            path: 'coverageOptions.personalPropertyReplacementCost.answer',
            type: 'boolean',
            required: true,
            metaData: {}
          },
          children: []
        },
        {
          id: 9545674,
          type: '$INPUT',
          path: 'deductibles.buildingDeductible.value',
          dependencies: [],
          data: {
            segmented: true,
            component: 'radio',
            label: 'Deductible',
            size: '12',
            hint:
              'Coverage A (Building) and Coverage B (Personal Property) have separate deductibles. However, these deductibles must be the same.',
            dataSource: [
              {
                answer: 500,
                label: '$500'
              },
              {
                answer: 1000,
                label: '$1,000'
              },
              {
                answer: 2000,
                label: '$2,000'
              },
              {
                answer: 5000,
                label: '$5,000'
              },
              {
                answer: 10000,
                label: '$10,000'
              }
            ],
            extendedProperties: {
              output: 'currency'
            }
          },
          formData: {
            path: 'deductibles.buildingDeductible.value',
            type: 'integer',
            required: true,
            metaData: {
              target: '${it.deductibles.buildingDeductible.value}',
              format: 'currency'
            }
          },
          children: []
        }
      ]
    },
    {
      name: 'share',
      step: {},
      components: [
        {
          id: 11111,
          type: '$CUSTOM',
          dependencies: [],
          data: {
            extendedProperties: {
              subscribe: true,
              skipNext: true
            },
            component: '$SHARE'
          },
          formData: {},
          children: []
        }
      ]
    },
    {
      name: 'assumptions',
      step: {},
      components: []
    },
    {
      name: 'policyholder',
      step: {},
      components: [
        {
          id: 12222221111,
          type: '$TITLE',
          dependencies: [],
          data: {
            text: 'Primary Policyholder',
            icon: 'fa fa-user-circle'
          },
          formData: {},
          children: []
        },
        {
          id: 3,
          type: '$INPUT',
          dependencies: [],
          path: 'policyHolders[0].firstName',
          data: {
            component: 'text',
            label: 'First Name',
            size: '5',
            validation: ['isValidNameFormat']
          },
          formData: {
            path: 'policyHolders.policyHolder.firstName',
            type: 'string',
            required: true,
            metaData: {
              minLength: 1,
              maxLength: 255
            }
          },
          children: []
        },
        {
          id: 4,
          type: '$INPUT',
          path: 'policyHolders[0].lastName',
          dependencies: [],
          data: {
            component: 'text',
            label: 'Last Name',
            size: '7',
            validation: ['isValidNameFormat']
          },
          formData: {
            path: 'policyHolders.policyHolder.lastName',
            type: 'string',
            required: true,
            metaData: {
              minLength: 1,
              maxLength: 255
            }
          },
          children: []
        },
        {
          id: 5,
          type: '$INPUT',
          path: 'policyHolders[0].emailAddress',
          dependencies: [],
          data: {
            component: 'text',
            label: 'Email Address',
            size: '8',
            validation: ['isEmail']
          },
          formData: {
            path: 'policyHolders.policyHolder.emailAddress',
            type: 'string',
            required: true,
            metaData: {
              minLength: 1,
              maxLength: 255
            }
          },
          children: []
        },
        {
          id: 6,
          type: '$INPUT',
          path: 'policyHolders[0].primaryPhoneNumber',
          dependencies: [],
          data: {
            component: 'phone',
            label: 'Contact Phone',
            size: '4',
            validation: ['isPhone']
          },
          formData: {
            path: 'policyHolders.policyHolder.primaryPhoneNumber',
            type: 'string',
            required: true,
            metaData: {
              pattern: '^(+d{1,2}s)?(?d{3})?[s.-]d{3}[s.-]d{4}$'
            }
          },
          children: []
        },
        {
          id: 8,
          type: '$INPUT',
          path: 'additionalPolicyholder',
          dependencies: [],
          data: {
            component: 'switch',
            label: 'Do you want to add an additional Policyholder?'
          },
          formData: {},
          children: []
        },
        {
          id: 3453,
          type: '$SECTION',
          dependencies: [{ additionalPolicyholder: true }],
          data: {
            className: 'second-policyholder-wrapper'
          },
          formData: {},
          children: [
            {
              id: 7,
              type: '$TITLE',
              dependencies: [],
              data: {
                text: 'Secondary Policyholder',
                icon: 'fa fa-user-circle',
                children: []
              },
              formData: {},
              children: []
            },
            {
              id: 10,
              type: '$INPUT',
              path: 'policyHolders[1].firstName',
              dependencies: [],
              data: {
                component: 'text',
                label: 'First Name',
                size: '5',
                validation: ['isValidNameFormat']
              },
              formData: {
                path: 'policyHolders.policyHolder.firstName',
                type: 'string',
                required: true,
                metaData: {
                  minLength: 1,
                  maxLength: 255
                }
              },
              children: []
            },
            {
              id: 11,
              type: '$INPUT',
              path: 'policyHolders[1].lastName',
              dependencies: [],
              data: {
                component: 'text',
                label: 'Last Name',
                size: '7',
                validation: ['isValidNameFormat']
              },
              formData: {
                path: 'policyHolders.policyHolder.lastName',
                type: 'string',
                required: true,
                metaData: {
                  minLength: 1,
                  maxLength: 255
                }
              },
              children: []
            },
            {
              id: 12,
              type: '$INPUT',
              path: 'policyHolders[1].emailAddress',
              dependencies: [],
              data: {
                component: 'text',
                label: 'Email Address',
                size: '8',
                validation: ['isEmail']
              },
              formData: {
                path: 'policyHolders.policyHolder.emailAddress',
                type: 'string',
                required: true,
                metaData: {
                  minLength: 1,
                  maxLength: 255
                }
              },
              children: []
            },
            {
              id: 13,
              type: '$INPUT',
              path: 'policyHolders[1].primaryPhoneNumber',
              dependencies: [],
              data: {
                component: 'phone',
                label: 'Contact Phone',
                size: '4',
                validation: ['isPhone']
              },
              formData: {
                path: 'policyHolders.policyHolder.primaryPhoneNumber',
                type: 'string',
                required: true,
                metaData: {
                  pattern: '^(+d{1,2}s)?(?d{3})?[s.-]d{3}[s.-]d{4}$'
                }
              },
              children: []
            }
          ]
        }
      ]
    },
    {
      name: 'additionalInterests',
      step: {},
      components: [
        {
          id: 1,
          type: '$CUSTOM',
          dependencies: [],
          data: {
            component: '$ADDITIONAL_INTERESTS',
            extendedProperties: {
              text:
                'Please select the type of Additional Interest that you would like to add for this policy.',
              types: [
                'mortgagee',
                'additionalInsured',
                'additionalInterest',
                'premiumFinance'
              ],
              useOwnSubmit: true
            }
          },
          formData: {},
          children: []
        }
      ]
    },
    {
      name: 'mailingBilling',
      step: {},
      meta: {},
      components: [
        {
          id: 3456776,
          type: '$TITLE',
          dependencies: [],
          data: {
            text: 'Mailing Address',
            icon: 'fa fa-envelope'
          },
          formData: {},
          children: []
        },
        {
          id: 1,
          type: '$CUSTOM',
          dependencies: [],
          data: {
            component: '$ADDRESS',
            extendedProperties: {
              subscribe: true,
              watchField: 'sameAsPropertyAddress',
              fieldPrefix: 'policyHolderMailingAddress',
              matchPrefix: 'property.physicalAddress'
            }
          },
          formData: {},
          children: []
        },
        {
          id: 3409367443,
          type: '$TITLE',
          dependencies: [],
          data: {
            text: 'Billing Information',
            icon: 'fa fa-dollar'
          },
          formData: {},
          children: []
        },
        {
          id: 348833,
          type: '$CUSTOM',
          dependencies: [],
          data: {
            component: '$BILLING',
            dataSource: 'billPlans',
            extendedProperties: {}
          },
          formData: {
            required: true
          },
          children: []
        }
      ]
    },
    {
      name: 'verify',
      step: {},
      components: [
        {
          id: 67786334,
          type: '$CUSTOM',
          dependencies: [],
          data: {
            component: '$VERIFY',
            extendedProperties: {
              details: [
                {
                  format: 'currency',
                  path: 'rating.totalPremium',
                  label: 'Yearly Premium'
                },
                {
                  format: 'currency',
                  path: 'coverageLimits.building.amount',
                  label: 'Building Limit'
                },
                {
                  format: 'currency',
                  path: 'deductibles.buildingDeductible.amount',
                  label: 'Building Deductible'
                },
                {
                  format: 'currency',
                  path: 'coverageLimits.personalProperty.amount',
                  label: 'Personal Property'
                },
                {
                  format: 'currency',
                  path: 'deductibles.personalPropertyDeductible.amount',
                  label: 'Personal Property Deductible'
                },
                {
                  format: 'bool',
                  path:
                    'coverageOptions.personalPropertyReplacementCost.answer',
                  label: 'Personal Property Replacement Cost'
                },
                {
                  format: 'currency',
                  path: 'coverageLimits.increasedCompliance.amount',
                  label: 'Increased Cost of Compliance'
                },
                {
                  format: 'currency',
                  path: 'coverageLimits.lossOfUse.amount',
                  label: 'Loss of Use'
                }
              ],
              productDescription: 'Flood',
              companyName: 'TTIC',
              subscribe: true
            }
          },
          formData: {},
          children: []
        }
      ]
    }
  ]
};

export default mock;
