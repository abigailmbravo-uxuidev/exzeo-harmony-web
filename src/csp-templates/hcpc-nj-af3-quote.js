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
      className: 'workflow-banner hcpci nj af3 quote',
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
      name: 'customerInfo',
      step: {},
      components: [
        {
          id: 1,
          component: '$TITLE',
          dependencies: '',
          data: {
            text: 'Policy Details',
            icon: 'fa fa-file-text'
          },
          formData: {},
          children: []
        },
        {
          id: 3,
          component: 'text',
          dependencies: '',
          path: 'policyHolders[0].firstName',
          data: {
            label: 'First Name',
            size: '5',
            validation: ['isValidNameFormat']
          },
          formData: {
            required: true
          },
          children: []
        },
        {
          id: 4,
          component: 'text',
          path: 'policyHolders[0].lastName',
          dependencies: '',
          data: {
            label: 'Last Name',
            size: '7',
            validation: ['isValidNameFormat']
          },
          formData: {
            required: true
          },
          children: []
        },
        {
          id: 15,
          component: 'date',
          path: 'effectiveDate',
          dependencies: '',
          data: {
            label: 'Effective Date',
            size: '6',
            extendedProperties: {
              min: 'zipCodeSettings.minEffectiveDate',
              max: 'zipCodeSettings.maxEffectiveDate'
            },
            validation: ['minEffectiveDate', 'isValidDate']
          },
          formData: {
            required: true
          },
          children: []
        },
        {
          id: 16,
          component: 'selectInteger',
          path: 'agentCode',
          dependencies: '',
          data: {
            label: 'Agent',
            size: '6',
            dataSource: 'agents'
          },
          formData: {
            required: true
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
          component: '$UNDERWRITING',
          dependencies: '',
          data: {},
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
          id: 133330,
          component: '$WARNING',
          dependencies: '',
          data: {
            as: 'div'
          },
          formData: {},
          children: []
        },
        {
          id: 3456354,
          component: '$SLIDER_GROUP',
          dependencies: '',
          data: {
            subscribe: true,
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
              }
            }
          },
          formData: {},
          children: []
        },
        {
          id: 678453,
          component: 'switch',
          path: 'coverageOptions.personalPropertyReplacementCost.answer',
          dependencies:
            '${it.coverageLimits.personalProperty.value >= Math.ceil(it.coverageLimits.building.value / 4)}',
          data: {
            label: 'Do you want Personal Property Replacement Cost Coverage?',
            size: '12',
            hint:
              "Replacement Cost Coverage replaces damaged possessions at today's prices without deducting for depreciation. If you choose not to select this coverage, loss for personal property will be paid out at Actual Cash Value."
          },
          formData: {
            required: true
          },
          children: []
        },
        {
          id: 9545674,
          component: 'radio',
          path: 'deductibles.buildingDeductible.value',
          dependencies: '',
          data: {
            segmented: true,
            label: 'Deductible',
            size: '12',
            hint:
              'Coverage A (Building) and Coverage B (Personal Property) have separate deductibles. However, these deductibles must be the same.',
            options: [
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
              output:
                '${format.toCurrency(it.deductibles.buildingDeductible.value)}'
            }
          },
          formData: {
            required: true
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
          component: '$SHARE',
          dependencies: '',
          data: {
            extendedProperties: {
              skipNext: true
            }
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
          component: '$TITLE',
          dependencies: '',
          data: {
            text: 'Primary Policyholder',
            icon: 'fa fa-user-circle'
          },
          formData: {},
          children: []
        },
        {
          id: 3,
          component: 'text',
          dependencies: '',
          path: 'policyHolders[0].firstName',
          data: {
            label: 'First Name',
            size: '5',
            validation: ['isValidNameFormat']
          },
          formData: {
            required: true
          },
          children: []
        },
        {
          id: 4,
          component: 'text',
          path: 'policyHolders[0].lastName',
          dependencies: '',
          data: {
            label: 'Last Name',
            size: '7',
            validation: ['isValidNameFormat']
          },
          formData: {
            required: true
          },
          children: []
        },
        {
          id: 5,
          component: 'text',
          path: 'policyHolders[0].emailAddress',
          dependencies: '',
          data: {
            label: 'Email Address',
            size: '8',
            validation: ['isEmail']
          },
          formData: {
            required: true
          },
          children: []
        },
        {
          id: 6,
          component: 'phone',
          path: 'policyHolders[0].primaryPhoneNumber',
          dependencies: '',
          data: {
            label: 'Contact Phone',
            size: '4',
            validation: ['isPhone']
          },
          formData: {
            required: true
          },
          children: []
        },
        {
          id: 8,
          component: 'switch',
          path: 'additionalPolicyholder',
          dependencies: '',
          data: {
            label: 'Do you want to add an additional Policyholder?'
          },
          formData: {},
          children: []
        },
        {
          id: 3453,
          component: '$SECTION',
          path: 'page.policyholder.additionalPolicyHolder',
          dependencies: '${it.additionalPolicyholder}',
          data: {
            className: 'second-policyholder-wrapper'
          },
          formData: {},
          children: [
            {
              id: 7,
              component: '$TITLE',
              dependencies: '',
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
              component: 'text',
              path: 'policyHolders[1].firstName',
              dependencies: '',
              data: {
                label: 'First Name',
                size: '5',
                validation: ['isValidNameFormat']
              },
              formData: {
                required: true
              },
              children: []
            },
            {
              id: 11,
              component: 'text',
              path: 'policyHolders[1].lastName',
              dependencies: '',
              data: {
                label: 'Last Name',
                size: '7',
                validation: ['isValidNameFormat']
              },
              formData: {
                required: true
              },
              children: []
            },
            {
              id: 12,
              component: 'text',
              path: 'policyHolders[1].emailAddress',
              dependencies: '',
              data: {
                label: 'Email Address',
                size: '8',
                validation: ['isEmail']
              },
              formData: {
                required: true
              },
              children: []
            },
            {
              id: 13,
              component: 'phone',
              path: 'policyHolders[1].primaryPhoneNumber',
              dependencies: '',
              data: {
                label: 'Contact Phone',
                size: '4',
                validation: ['isPhone']
              },
              formData: {
                required: true
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
          component: '$ADDITIONAL_INTERESTS',
          dependencies: '',
          data: {
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
          component: '$TITLE',
          dependencies: '',
          data: {
            text: 'Mailing Address',
            icon: 'fa fa-envelope'
          },
          formData: {},
          children: []
        },
        {
          id: 1,
          component: '$ADDRESS',
          dependencies: '',
          data: {
            extendedProperties: {
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
          component: '$TITLE',
          dependencies: '',
          data: {
            text: 'Billing Information',
            icon: 'fa fa-dollar'
          },
          formData: {},
          children: []
        },
        {
          id: 348833,
          component: '$BILLING',
          dependencies: '',
          data: {
            dataSource: 'billPlans'
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
          component: '$VERIFY',
          dependencies: '',
          data: {
            subscribe: true,
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
              companyName: 'TTIC'
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
