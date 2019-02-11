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
          },
          children: [],
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
            validation: ['isRequired', 'isMaxLength255']
          },
          children: [],
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
            validation: ['isRequired', 'isMaxLength255']

          },
          children: [],
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

          },
          children: [],
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
            validation: ['isRequired', 'isPhone']

          },
          children: [],
        },
        {
          id: 6,
          type: '$INPUT',
          dependencies: [],
          data: {
            type: 'switch',
            label: 'Do you want to add an additional Policyholder?',
            path: 'additionalPolicyholder'
          },
          children: []
        },
        {
          id: 3453,
          type: '$SECTION',
          dependencies: [
            { path: 'additionalPolicyholder', value: true }
          ],
          data: {

          },
          children: [
            {
              id: 7,
              type: '$TITLE',
              dependencies: [],
              data: {
                text: 'Secondary Policyholder',
                icon: 'fa fa-user-circle',
              },
              children: []
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
                validation: ['isRequired', 'isMaxLength255']
              },
              children: [],
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
                validation: ['isRequired', 'isMaxLength255']
              },
              children: [],
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
                validation: ['isRequired']
              },
              children: [],
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
                validation: ['isRequired', 'isPhone']
              },
              children: [],
            },
          ]
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
            validation: ['isRequired', 'isDate']
          },
          children: [],
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
            options: 'agents'
          },
          children: [],
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
          },
          children: [],
        },
        {
          id: 2,
          type: '$INPUT',
          dependencies: [],
          data: {
            path: 'coverageLimits.dwelling.amount',
            type: 'slider',
            label: 'Dwelling Limit',
            validation: ['dwellingRange'],
            hint : "This is the dollar amount of coverage for the structure of your home. This amount should represent the total cost to rebuild your home to its current state in the event of a loss. If you have a Declarations Page from your current  policy it may be listed as Coverage A.  (Based on basic information of your home, we provide you a guide for a recommended value. You can move this number up or down based on more detailed information. For example, if you have an upgraded kitchen and bathroom, you may want to increase this number to ensure that you have adequate coverage in the event of a loss.)  ",
            extendedProperties: {
              min: 'coverageLimits.dwelling.minAmount',
              max: 'coverageLimits.dwelling.maxAmount',
              step: 1000
            },
          },
          children: [],
        },
        {
          id: 3,
          type: '$INPUT',
          dependencies: [],
          data: {
            segmented: true,
            type: 'radio',
            label: 'Other Structures Limit',
            size: '12',
            path: 'coverageLimits.otherStructures.value',
            validation: ['isRequired'],
            hint : "This is the dollar amount of coverage for the other structures on your property not attached to your home. This might include a fence, shed, or unattached garage. If you have a Declarations Page from your current  policy it may be listed as Coverage B.",
            options: 'uiQuestions.otherStructuresAmount',
            extendedProperties: {
              transformConfig: {
                value: '${Math.ceil(((it.coverageLimits.otherStructures.value / 100) * it.coverageLimits.dwelling.amount))}',
                format: 'currency',
              },
            },
          },
          children: [],
        },
        {
          id: 4,
          type: '$INPUT',
          dependencies: [],
          data: {
            segmented: true,
            type: 'radio',
            label: 'Personal Property Limit',
            size: '12',
            path: 'coverageLimits.personalProperty.value',
            validation: ['isRequired'],
            hint : "This is your personal belongings, or items located inside the home. This could include your furniture, clothing, bedding, dishes, etc. If you choose to have replacement cost coverage on Personal Property, you will be required to carry Personal Property limits at a minimum of 25% of your Dwelling limit.",
            extendedProperties: {
              transformConfig: {
                value: '${Math.ceil(((it.coverageLimits.personalProperty.value / 100) * it.coverageLimits.dwelling.amount))}',
                format: 'currency'
              },
            },
            options: 'uiQuestions.personalPropertyAmount'
          },
          children: [],
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
          },
          children: [],
        },
        {
          id: 7,
          type: '$INPUT',
          dependencies: [],
          data: {
            extendedProperties: {
              transformConfig: {
                value: '${Math.ceil(((it.coverageLimits.lossOfUse.value / 100) * it.coverageLimits.dwelling.amount))}',
                format: 'currency'
              },
            },
            type: 'display',
            label: 'Loss of Use Limit',
            size: '12',
            path: 'coverageLimits.lossOfUse.value',
            validation: ['isRequired'],
            hint : "This is your personal belongings, or items located inside the home. This could include your furniture, clothing, bedding, dishes, etc. If you choose to have replacement cost coverage on Personal Property, you will be required to carry Personal Property limits at a minimum of 25% of your Dwelling limit.",
            options: [],
          },
          children: [],
        },
        {
          id: 8,
          type: '$INPUT',
          dependencies: [],
          data: {
            segmented: true,
            type: 'radio',
            label: 'Personal Liability Limit',
            size: '12',
            path: 'coverageLimits.personalLiability.amount',
            validation: ['isRequired'],
            options: [
              {
                "label" : "$ 100,000",
                "answer" : 100000
              },
              {
                "label" : "$ 300,000",
                "answer" : 300000
              }
            ]
          },
          children: [],
        },
        {
          id: 9,
          type: '$INPUT',
          dependencies: [],
          data: {
            segmented: true,
            extendedProperties: {
              transformConfig: {
                value: '${2000}',
                format: 'currency'
              }
            },
            type: 'display',
            label: 'Medical Payments to Others',
            size: '12',
            path: 'coverageLimits.medicalPayments.amount',
            validation: ['isRequired'],
            options: []
          },
          children: [],
        },
        {
          id: 10,
          type: '$INPUT',
          dependencies: [],
          data: {
            segmented: true,
            type: 'radio',
            label: 'Limited Fungi, Wet or Dry Rot, Yeast or Bacteria Coverage - Property',
            size: '12',
            path: 'coverageLimits.moldProperty.amount',
            validation: ['isRequired'],
            options: [
              {
                "label" : "$ 10,000",
                "answer" : 10000
              },
              {
                "label" : "$ 25,000",
                "answer" : 25000
              },
              {
                "label" : "$ 50,000",
                "answer" : 50000
              }
            ]
          },
          children: [],
        },
        {
          id: 473292,
          type: '$INPUT',
          dependencies: [],
          data: {
            segmented: true,
            type: 'radio',
            label: 'Limited Fungi, Wet or Dry Rot, Yeast or Bacteria Coverage - Liability',
            size: '12',
            path: 'coverageLimits.moldLiability.amount',
            validation: ['isRequired'],
            options: [
              {
                "label" : "$ 50,000",
                "answer" : 50000
              },
              {
                "label" : "$ 100,000",
                "answer" : 100000
              }
            ]
          },
          children: [],
        },
        {
          id: 11,
          type: '$INPUT',
          dependencies: [],
          data: {
            segmented: true,
            type: 'radio',
            label: 'Ordinance or Law Coverage Limit',
            size: '12',
            path: 'coverageLimits.ordinanceOrLaw.amount',
            validation: ['isRequired'],
            extendedProperties: {},
            options: [
              {
                "label" : "25% of Dwelling Limit",
                "answer" : 25
              },
              {
                "label" : "50% of Dwelling Limit",
                "answer" : 50
              }
            ]
          },
          children: [],
        },
        {
          id: 12,
          type: '$TITLE',
          dependencies: [],
          data: {
            text: 'Coverage Options',
            icon: 'fa fa-user-circle',
          },
          children: [],
        },
        // {
        //   id: 13,
        //   type: '$INPUT',
        //   dependencies: [],
        //   data: {
        //     segmented: true,
        //     type: 'radio',
        //     label: 'Property Permitted Incidental Occupancies',
        //     size: '12',
        //     path: 'coverageOptions.propertyIncidentalOccupancies.answer',
        //     validation: ['isRequired'],
        //     options: [
        //       {
        //         "answer" : "Main Dwelling",
        //       },
        //       {
        //         "answer" : "Other Structures"
        //       },
        //       {
        //         "answer" : "None"
        //       }
        //     ]
        //   },
        //   children: [],
        // },
        {
          id: 14,
          type: '$INPUT',
          dependencies: [],
          data: {
            segmented: true,
            type: 'switch',
            label: 'Do you want Sinkhole Loss Coverage?',
            size: '12',
            path: 'coverageOptions.sinkholePerilCoverage.answer',
            validation: [],
            options: []
          },
          children: [],
        },
        {
          id: 15,
          type: '$TITLE',
          dependencies: [],
          data: {
            text: 'Deductibles',
            icon: 'fa fa-user-circle',
          },
          children: [],
        },
        {
          id: 16,
          type: '$INPUT',
          dependencies: [],
          data: {
            segmented: true,
            type: 'radio',
            label: 'All Other Perils Deductible',
            size: '12',
            path: 'deductibles.allOtherPerils.amount',
            validation: ['isRequired'],
            options: 'uiQuestions.allOtherPerils'
          },
          children: [],
        },
        {
          id: 17,
          type: '$INPUT',
          dependencies: [],
          data: {
            extendedProperties: {
              transformConfig: {
                value: '${Math.ceil(((it.deductibles.hurricane.value / 100) * it.coverageLimits.dwelling.amount))}',
                format: 'currency',
              }
            },
            segmented: true,
            type: 'radio',
            label: 'Hurricane Deductible',
            size: '12',
            path: 'deductibles.hurricane.value',
            validation: ['isRequired'],
            options: 'uiQuestions.hurricane',

          },
          children: [],
        },
        {
          id: 19,
          type: '$INPUT',
          dependencies: [
            { path: 'coverageOptions.sinkholePerilCoverage.answer', value: true }
          ],
          data: {
            segmented: true,
            type: 'radio',
            label: 'Sinkhole Deductible',
            size: '12',
            path: 'deductibles.sinkhole.amount',
            validation: ['isRequired'],
            options: [
              {
                "answer" : 10,
                "label" : "10% of Dwelling Limit"
              }
            ]
          },
          children: [],
        },
        {
          id: 20,
          type: '$TITLE',
          dependencies: [],
          data: {
            text: 'Wind Mitigation',
            icon: 'fa fa-user-circle',
          },
          children: [],
        },
        {
          id: 21,
          type: '$INPUT',
          dependencies: [],
          data: {
            segmented: true,
            type: 'radio',
            label: 'Roof Covering:',
            size: '12',
            path: 'property.windMitigation.roofCovering',
            validation: ['isRequired'],
            options: [
              {
                "answer" : "Non-FBC"
              },
              {
                "answer" : "FBC"
              },
              {
                "answer" : "Other"
              }
            ]
          },
          children: [],
        },
        {
          id: 22,
          type: '$INPUT',
          dependencies: [],
          data: {
            segmented: true,
            type: 'radio',
            label: 'Roof Deck Attachment:',
            size: '12',
            path: 'property.windMitigation.roofDeckAttachment',
            validation: ['isRequired'],
            options: [
              {
                "answer" : "A"
              },
              {
                "answer" : "B"
              },
              {
                "answer" : "C"
              },
              {
                "answer" : "D"
              },
              {
                "answer" : "Concrete"
              },
              {
                "answer" : "Other"
              }
            ]
          },
          children: [],
        },
        {
          id: 23,
          type: '$INPUT',
          dependencies: [],
          data: {
            segmented: true,
            type: 'radio',
            label: 'Roof to Wall Attachment:',
            size: '12',
            path: 'property.windMitigation.roofToWallConnection',
            validation: ['isRequired'],
            options: [
              {
                "answer" : "Toe Nails"
              },
              {
                "answer" : "Clips"
              },
              {
                "answer" : "Single Wraps"
              },
              {
                "answer" : "Double Wraps"
              },
              {
                "answer" : "Other"
              }
            ]
          },
          children: [],
        },
        {
          id: 24,
          type: '$INPUT',
          dependencies: [],
          data: {
            segmented: true,
            type: 'radio',
            label: 'Roof Geometry:',
            size: '12',
            path: 'property.windMitigation.roofGeometry',
            validation: ['isRequired'],
            options: [
              {
                "answer" : "Flat"
              },
              {
                "answer" : "Gable"
              },
              {
                "answer" : "Hip"
              },
              {
                "answer" : "Other"
              }
            ]
          },
          children: [],
        },
        {
          id: 26,
          type: '$INPUT',
          dependencies: [],
          data: {
            segmented: true,
            type: 'radio',
            label: 'Secondary Water Resistance (SWR):',
            size: '12',
            path: 'property.windMitigation.secondaryWaterResistance',
            validation: ['isRequired'],
            options: [
              {
                "answer" : "Yes"
              },
              {
                "answer" : "No"
              },
              {
                "answer" : "Other"
              }
            ]
          },
          children: [],
        },
        {
          id: 27,
          type: '$INPUT',
          dependencies: [],
          data: {
            segmented: true,
            type: 'radio',
            label: 'Opening Protection:',
            size: '12',
            path: 'property.windMitigation.openingProtection',
            validation: ['isRequired'],
            options: [
              {
                "answer" : "None"
              },
              {
                "answer" : "Basic"
              },
              {
                "answer" : "Hurricane"
              },
              {
                "answer" : "Other"
              }
            ]
          },
          children: [],
        },
        {
          id: 28,
          type: '$TITLE',
          dependencies: [],
          data: {
            text: 'Discounts',
            icon: 'fa fa-user-circle',
          },
          children: [],
        },
        {
          id: 29,
          type: '$INPUT',
          dependencies: [],
          data: {
            type: 'switch',
            label: 'Does the property have a burglar alarm?',
            size: '12',
            path: 'property.burglarAlarm',
            validation: ['isRequired'],
            options: []
          },
          children: [],
        },
        {
          id: 30,
          type: '$INPUT',
          dependencies: [],
          data: {
            type: 'switch',
            label: 'Does the property have a fire alarm?',
            size: '12',
            path: 'property.fireAlarm',
            validation: ['isRequired'],
            options: []
          },
          children: [],
        },
        {
          id: 31,
          type: '$INPUT',
          dependencies: [],
          data: {
            segmented: true,
            type: 'radio',
            label: 'Sprinkler',
            size: '12',
            path: 'property.sprinkler',
            validation: ['isRequired'],
            options: [
              {
                "answer" : "N"
              },
              {
                "answer" : "A"
              },
              {
                "answer" : "B"
              }
            ]
          },
          children: [],
        },
      ],
    }
  ]
};

export default mock;
