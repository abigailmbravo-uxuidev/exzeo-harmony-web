/* eslint-disable */
const mock = {
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
              text: 'Primary Policyholder',
              icon: 'fa fa-user-circle',
              children: [],
            },
            
          },
          {
            id: 2,
            type: '$INPUT',
            dependencies: [],
            data: {
              type: 'text',
              label: 'First Name',
              size: '5',
              path: 'policyHolders[0].firstName',
              validation: ['isRequired', 'isMaxLength255'],
              children: [],
            },
            
          },
          {
            id: 3,
            type: '$INPUT',
            dependencies: [],
            data: {
              type: 'text',
              label: 'Last Name',
              size: '7',
              path: 'policyHolders[0].lastName',
              validation: ['isRequired', 'isMaxLength255'],
              children: [],
            },
            
          },
          {
            id: 4,
            type: '$INPUT',
            dependencies: [],
            data: {
              type: 'text',
              label: 'Email Address',
              size: '8',
              path: 'policyHolders[0].emailAddress',
              validation: ['isRequired', 'isEmail'],
              children: [],
            },
            
          },
          {
            id: 5,
            type: '$INPUT',
            dependencies: [],
            data: {
              type: 'phone',
              label: 'Contact Phone',
              size: '4',
              path: 'policyHolders[0].primaryPhoneNumber',
              validation: ['isRequired', 'isPhone'],
              children: [],
            },
            
          },
          {
            id: 6,
            type: '$INPUT',
            dependencies: [],
            data: {
              type: 'switch',
              label: 'Do you want to add an additional Policyholder?',
              path: 'additionalPolicyholder',
              children: []
            },
            
          },
          {
            id: 3453,
            type: '$SECTION',
            dependencies: [
              { path: 'additionalPolicyholder', value: true }
            ],
            data: {
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
                      
                    },
                    {
                      id: 8,
                      type: '$INPUT',
                      dependencies: [],
                      data: {
                        type: 'text',
                        label: 'First Name',
                        size: '5',
                        path: 'policyHolders[1].firstName',
                        validation: ['isRequired', 'isMaxLength255'],
                        children: [],
                      },
                      
                    },
                    {
                      id: 9,
                      type: '$INPUT',
                      dependencies: [],
                      data: {
                        type: 'text',
                        label: 'Last Name',
                        size: '7',
                        path: 'policyHolders[1].lastName',
                        validation: ['isRequired', 'isMaxLength255'],
                        children: [],
                      },
                     
                    },
                    {
                      id: 10,
                      type: '$INPUT',
                      dependencies: [],
                      data: {
                        type: 'text',
                        label: 'Email Address',
                        size: '8',
                        path: 'policyHolders[1].emailAddress',
                        validation: ['isRequired'],
                        children: [],
                      },
                      
                    },
                    {
                      id: 11,
                      type: '$INPUT',
                      dependencies: [],
                      data: {
                        type: 'phone',
                        label: 'Contact Phone',
                        size: '4',
                        path: 'policyHolders[1].primaryPhoneNumber',
                        validation: ['isRequired', 'isPhone'],
                        children: [],
                      },
                    },
                  ]
            },
          },
          {
            id: 12,
            type: '$INPUT',
            dependencies: [],
            data: {
              type: 'date',
              label: 'Effective Date',
              size: '6',
              path: 'effectiveDate',
              validation: ['isRequired', 'isDate'],
              children: [],
            },
            
          },
          {
            id: 13,
            type: '$INPUT',
            dependencies: [],
            data: {
              type: 'select',
              label: 'Agent',
              size: '6',
              path: 'agentCode',
              validation: ['isRequired'],
              options: 'agents',
              children: [],
            },
            
          },
        ],
  
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
              type: '$UNDERWRITING',
            }
          },
        ],
      },
      {
        name: 'customize',
        step: {},
        components: [
          {
            id: 1,
            type: '$TITLE',
            dependencies: [],
            data: {
              text: 'Coverage Limits',
              icon: 'fa fa-line-chart',
              children: [],
            },
          },
          {
            id: 2,
            type: '$INPUT',
            dependencies: [],
            data: {
              path: 'coverageLimits.dwelling.amount',
              type: 'slider',
              label: 'Building Limit',
              validation: ['dwellingRange'],
              hint : "This is the dollar amount of coverage for the structure of your home. This amount should represent the total cost to rebuild your home to its current state in the event of a loss. If you have a Declarations Page from your current  policy it may be listed as Coverage A.  (Based on basic information of your home, we provide you a guide for a recommended value. You can move this number up or down based on more detailed information. For example, if you have an upgraded kitchen and bathroom, you may want to increase this number to ensure that you have adequate coverage in the event of a loss.)  ",
              extendedProperties: {
                min: 'coverageLimits.dwelling.minAmount',
                max: 'coverageLimits.dwelling.maxAmount',
                step: 1000
              },
              children: [],
            },
           
          },
          {
            id: 4,
            type: '$INPUT',
            dependencies: [],
            data: {
              segmented: true,
              type: 'slider',
              label: 'Personal Property Limit',
              size: '12',
              path: 'coverageLimits.personalProperty.amount',
              validation: ['isRequired'],
              hint : "This is your personal belongings, or items located inside the home. This could include your furniture, clothing, bedding, dishes, etc. If you choose to have replacement cost coverage on Personal Property, you will be required to carry Personal Property limits at a minimum of 25% of your Dwelling limit.",
              extendedProperties: {
                min: 'coverageLimits.dwelling.minAmount',
                max: 'coverageLimits.dwelling.maxAmount',
                step: 1000
              },
              children: [],
              options: 'uiQuestions.personalPropertyAmount'
            },
            
          },
          {
            id: 6,
            type: '$INPUT',
            dependencies: [
              { path: 'coverageLimits.personalProperty.value', value: true }
            ],
            data: {
              type: 'switch',
              label: 'Do you want Personal Property Replacement Cost Coverage?',
              size: '12',
              path: 'coverageOptions.personalPropertyReplacementCost.answer',
              hint : "Replacement Cost Coverage replaces your damaged possessions at today's prices without deducting for depreciation. If you choose not to select this coverage, your loss for personal property will be paid out at Actual Cash Value.",
              children: [],
            },
          },
          {
            id: 16,
            type: '$INPUT',
            dependencies: [],
            data: {
              segmented: true,
              type: 'radio',
              label: 'Deductible',
              size: '12',
              path: 'deductibles.allOtherPerils.amount',
              validation: ['isRequired'],
              options: [
                {
                    "label" : "$ 500",
                    "answer" : 500
                },
                {
                  "label" : "$ 1,000",
                  "answer" : 1000
                },
                {
                  "label" : "$ 2,000",
                  "answer" : 2000
                },
                {
                    "label" : "$ 5,000",
                    "answer" : 5000
                },
                {
                    "label" : "$ 10,000",
                    "answer" : 10000
                }
              ],
              hint : "All other Perils Deductible",
              children: [],
            },
          },
        ],
      },
      {
        name: 'share',
        step: {},
        components: [
          {
            id: 1,
            type: '$SHARE',
            dependencies: [],
            data: {
              type: '$SHARE',
            }
          },
        ],
      },
      {
        name: 'assumptions',
        step: {},
        components: [
          {
            id: 1,
            type: '$CUSTOM',
            dependencies: [],
            data: {
              type: '$ASSUMPTIONS',
            }
          },
        ],
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
              type: '$ADDITIONAL_INTERESTS',
            }
          },
        ],
      },
      {
        name: 'mailingBilling',
        step: {},
        components: [
          {
            id: 1,
            type: '$CUSTOM',
            dependencies: [],
            data: {
              type: '$MAILING_BILLING',
            }
          },
        ],
      },
      {
        name: 'verify',
        step: {},
        components: [
          {
            id: 1,
            type: '$CUSTOM',
            dependencies: [],
            data: {
              type: '$VERIFY',
            }
          },
        ],
      },
    ]
  };
  
  export default mock;
  