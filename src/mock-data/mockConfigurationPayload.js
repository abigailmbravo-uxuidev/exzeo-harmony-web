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
          formData: {},
          children: [],
        },
        {
          id: 3,
          type: '$INPUT',
          dependencies: [],
          path: 'policyHolders[0].firstName',
          data: {
            component: 'text',
            label: 'First Name',
            size: '5'
          },
          formData:  {
            path: 'policyHolders.policyHolder.firstName',
            type: 'string',
            required: true,
            metaData: { minLength: 1, maxLength: 255 },
          },
          children: [],
        },
        {
          id: 4,
          type: '$INPUT',
          path: 'policyHolders[0].lastName',
          dependencies: [],
          data: {
            component: 'text',
            label: 'Last Name',
            size: '7'
          },
          formData:  {
            path: 'policyHolders.policyHolder.lastName',
            type: 'string',
            required: true,
            metaData: {
              minLength: 1,
              maxLength: 255
            },
          },
          children: [],
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
          },
          formData:  {
            path: 'policyHolders.policyHolder.emailAddress',
            type: 'string',
            required: true,
            metaData: {
              minLength: 1,
              maxLength: 255
            },
          },
          children: [],
        },
        {
          id: 6,
          type: '$INPUT',
          path: 'policyHolders[0].primaryPhoneNumber',
          dependencies: [],
          data: {
            component: 'phone',
            label: 'Contact Phone',
            size: '4'
          },
          formData:  {
            path: 'policyHolders.policyHolder.primaryPhoneNumber',
            type: 'string',
            required: true,
            metaData: {
              pattern: '^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$'
            },
          },
          children: [],
        },
        {
          id: 8,
          type: '$INPUT',
          path: 'additionalPolicyholder',
          dependencies: [],
          data: {
            component: 'switch',
            label: 'Do you want to add an additional Policyholder?',
          },
          formData: {},
          children: []
        },
        {
          id: 3453,
          type: '$SECTION',
          dependencies: [
            { path: 'additionalPolicyholder', value: true }
          ],
          data: {},
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
              children: [],
            },
            {
              id: 10,
              type: '$INPUT',
              path: 'policyHolders[1].firstName',
              dependencies: [],
              data: {
                component: 'text',
                label: 'First Name',
                size: '5'
              },
              formData:  {
                path: 'policyHolders.policyHolder.firstName',
                type: 'string',
                required: true,
                metaData: {
                  minLength: 1,
                  maxLength: 255
                },
              },
              children: [],
            },
            {
              id: 11,
              type: '$INPUT',
              path: 'policyHolders[1].lastName',
              dependencies: [],
              data: {
                component: 'text',
                label: 'Last Name',
                size: '7'
              },
              formData:  {
                path: 'policyHolders.policyHolder.lastName',
                type: 'string',
                required: true,
                metaData: {
                  minLength: 1,
                  maxLength: 255
                },
              },
              children: [],
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
              },
              formData:  {
                path: 'policyHolders.policyHolder.emailAddress',
                type: 'string',
                required: true,
                metaData: {
                  minLength: 1,
                  maxLength: 255
                },
              },
              children: [],
            },
            {
              id: 13,
              type: '$INPUT',
              path: 'policyHolders[1].primaryPhoneNumber',
              dependencies: [],
              data: {
                component: 'phone',
                label: 'Contact Phone',
                size: '4'
              },
              formData:  {
                path: 'policyHolders.policyHolder.primaryPhoneNumber',
                type: 'string',
                required: true,
                metaData: {
                  pattern: '^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$'
                },
              },
              children: [],
            }
          ]
        },
        {
          id: 15,
          type: '$INPUT',
          path: 'effectiveDate',
          dependencies: [],
          data: {
            component: 'date',
            label: 'Effective Date',
            size: '6'
          },
          formData: {
            path: 'effectiveDate',
            type: 'string',
            required: true,
            metaData: {
              format: 'date-time'
            },
          },
          children: [],
        },
        {
          id: 16,
          type: '$INPUT',
          path: 'agentCode',
          dependencies: [],
          data: {
            component: 'select',
            label: 'Agent',
            size: '6',
            dataSource: 'agents'
          },
          formData: {
            path: 'agentCode',
            type: 'integer',
            required: true,
            metaData: {},
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
            component: '$UNDERWRITING',
          },
          formData: {},
          children: [],
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
          formData: {},
          children: [],
        },
        {
          id: 2,
          type: '$INPUT',
          path: 'coverageLimits.dwelling.amount',
          dependencies: [],
          data: {
            component: 'slider',
            label: 'Dwelling Limit',
            hint : "This is the dollar amount of coverage for the structure of your home. This amount should represent the total cost to rebuild your home to its current state in the event of a loss. If you have a Declarations Page from your current  policy it may be listed as Coverage A.  (Based on basic information of your home, we provide you a guide for a recommended value. You can move this number up or down based on more detailed information. For example, if you have an upgraded kitchen and bathroom, you may want to increase this number to ensure that you have adequate coverage in the event of a loss.)  ",
            extendedProperties: {
              min: 'coverageLimits.dwelling.minAmount',
              max: 'coverageLimits.dwelling.maxAmount',
              step: 1000,
              validation: 'dwellingRange'
            },
          },
          formData: {
            path: 'coverageLimits.dwelling.value',
            type: 'integer',
            required: true,
            metaData: {},
          },
          children: [],
        },
        {
          id: 3,
          type: '$INPUT',
          path: 'coverageLimits.otherStructures.value',
          dependencies: [],
          data: {
            segmented: true,
            component: 'radio',
            label: 'Other Structures Limit',
            size: '12',
            hint : "This is the dollar amount of coverage for the other structures on your property not attached to your home. This might include a fence, shed, or unattached garage. If you have a Declarations Page from your current  policy it may be listed as Coverage B.",
            dataSource: 'uiQuestions.otherStructuresAmount',
            extendedProperties: {
                output: 'currency',
            },
          },
          formData: {
            path: 'coverageLimits.otherStructures.value',
            type: 'integer',
            required: true,
            metaData: {
              target: '${Math.ceil(((it.coverageLimits.otherStructures.value / 100) * it.coverageLimits.dwelling.amount))}',
            },
          },
          children: [],
        },
        {
          id: 4,
          type: '$INPUT',
          path: 'coverageLimits.personalProperty.value',
          dependencies: [],
          data: {
            segmented: true,
            component: 'radio',
            label: 'Personal Property Limit',
            size: '12',
            hint : "This is your personal belongings, or items located inside the home. This could include your furniture, clothing, bedding, dishes, etc. If you choose to have replacement cost coverage on Personal Property, you will be required to carry Personal Property limits at a minimum of 25% of your Dwelling limit.",
            extendedProperties: {
                output: 'currency'
            },
            dataSource: 'uiQuestions.personalPropertyAmount'
          },
          formData: {
            path: 'coverageLimits.personalProperty.value',
            type: 'integer',
            required: true,
            metaData: {
              target: '${Math.ceil(((it.coverageLimits.personalProperty.value / 100) * it.coverageLimits.dwelling.amount))}',
            },
          },
          children: [],
        },
        {
          id: 6,
          type: '$INPUT',
          path: 'coverageOptions.personalPropertyReplacementCost.answer',
          dependencies: [
            { path: 'coverageLimits.personalProperty.value', value: true }
          ],
          data: {
            component: 'switch',
            label: 'Do you want Personal Property Replacement Cost Coverage?',
            size: '12',
            hint : "Replacement Cost Coverage replaces your damaged possessions at today's prices without deducting for depreciation. If you choose not to select this coverage, your loss for personal property will be paid out at Actual Cash Value.",
          },
          formData: {
            path: 'coverageOptions.personalPropertyReplacementCost.answer',
            type: 'boolean',
            required: true,
            metaData: {},
          },
          children: [],
        },
        {
          id: 7,
          type: '$INPUT',
          path: 'coverageLimits.lossOfUse.value',
          dependencies: [],
          data: {
            component: 'display',
            label: 'Loss of Use Limit',
            size: '12',
            hint : "This is your personal belongings, or items located inside the home. This could include your furniture, clothing, bedding, dishes, etc. If you choose to have replacement cost coverage on Personal Property, you will be required to carry Personal Property limits at a minimum of 25% of your Dwelling limit.",
            extendedProperties: {
              output: 'currency'
            },
          },
          formData: {
            path: 'coverageLimits.lossOfUse.value',
            type: 'integer',
            required: true,
            metaData: {
              target: '${Math.ceil(((it.coverageLimits.lossOfUse.value / 100) * it.coverageLimits.dwelling.amount))}',
            },
          },
          children: [],
        },
        {
          id: 8,
          type: '$INPUT',
          path: 'coverageLimits.personalLiability.amount',
          dependencies: [],
          data: {
            component: 'radio',
            label: 'Personal Liability Limit',
            size: '12',
            segmented: true,
          },
          formData: {
            path: 'coverageLimits.personalLiability.value',
            type: 'integer',
            required: true,
            metaData: {
              enum: [
                { label: '$ 100,000', answer: 100000 },
                { label: '$ 300,000', answer: 300000 }
              ]
            },
          },
          children: [],
        },
        {
          id: 9,
          type: '$INPUT',
          path: 'coverageLimits.medicalPayments.amount',
          dependencies: [],
          data: {
            component: 'display',
            label: 'Medical Payments to Others',
            size: '12',
            segmented: true,
            extendedProperties: {
              output: 'currency',
            },
            dataSource: []
          },
          formData: {
            path: 'coverageLimits.medicalPayments.value',
            type: 'integer',
            required: true,
            metaData: {
              target: '${2000}'
            },
          },
          children: [],
        },
        {
          id: 10,
          type: '$INPUT',
          path: 'coverageLimits.moldProperty.amount',
          dependencies: [],
          data: {
            component: 'radio',
            label: 'Limited Fungi, Wet or Dry Rot, Yeast or Bacteria Coverage - Property',
            size: '12',
            segmented: true,
          },
          formData: {
            path: 'coverageLimits.moldProperty.value',
            type: 'integer',
            required: true,
            metaData: {
              enum: [
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
          },
          children: [],
        },
        {
          id: 473292,
          type: '$INPUT',
          path: 'coverageLimits.moldLiability.amount',
          dependencies: [],
          data: {
            component: 'radio',
            label: 'Limited Fungi, Wet or Dry Rot, Yeast or Bacteria Coverage - Liability',
            size: '12',
            segmented: true,
          },
          formData: {
            path: 'coverageLimits.moldLiability.value',
            type: 'integer',
            required: true,
            metaData: {
              enum: [
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
          },
          children: [],
        },
        {
          id: 11,
          type: '$INPUT',
          path: 'coverageLimits.ordinanceOrLaw.amount',
          dependencies: [],
          data: {
            segmented: true,
            component: 'radio',
            label: 'Ordinance or Law Coverage Limit',
            size: '12',
          },
          formData: {
            path: 'coverageLimits.ordinanceOrLaw.value',
            type: 'integer',
            required: true,
            metaData: {
              enum: [
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
          formData: {},
          children: [],
        },
        // {
        //   id: 13,
        //   type: '$INPUT',
        //   dependencies: [],
        //   data: {
        //     segmented: true,
        //     component: 'radio',
        //     label: 'Property Permitted Incidental Occupancies',
        //     size: '12',
        //     path: 'coverageOptions.propertyIncidentalOccupancies.answer',
        //     validation: ['isRequired'],
        //     dataSource: [
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
          path: 'coverageOptions.sinkholePerilCoverage.answer',
          dependencies: [],
          data: {
            component: 'switch',
            label: 'Do you want Sinkhole Loss Coverage?',
            size: '12',
            segmented: true,
          },
          formData:  {
            path: 'coverageOptions.sinkholePerilCoverage.answer',
            type: 'boolean',
            required: true,
            metaData: {},
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
          formData: {},
          children: [],
        },
        {
          id: 16,
          component: '$INPUT',
          path: 'deductibles.allOtherPerils.amount',
          dependencies: [],
          data: {
            component: 'radio',
            label: 'All Other Perils Deductible',
            size: '12',
            segmented: true,
            dataSource: 'uiQuestions.allOtherPerils'
          },
          formData:  {
            path: 'deductibles.allOtherPerils.value',
            type: 'integer',
            required: true,
            metaData: {},
          },
          children: [],
        },
        {
          id: 17,
          type: '$INPUT',
          path: 'deductibles.hurricane.value',
          dependencies: [],
          data: {
            segmented: true,
            component: 'radio',
            label: 'Hurricane Deductible',
            size: '12',
            dataSource: 'uiQuestions.hurricane',
            extendedProperties: {
              output: 'currency',
            },
          },
          formData:  {
            path: 'deductibles.hurricane.value',
            type: 'integer',
            required: true,
            metaData: {
              target: '${Math.ceil(((it.deductibles.hurricane.value / 100) * it.coverageLimits.dwelling.amount))}',
            },
          },
          children: [],
        },
        {
          id: 19,
          type: '$INPUT',
          path: 'deductibles.sinkhole.amount',
          dependencies: [
            { path: 'coverageOptions.sinkholePerilCoverage.answer', value: true }
          ],
          data: {
            component: 'radio',
            label: 'Sinkhole Deductible',
            size: '12',
            segmented: true,
            dataSource: [
              {
                "answer" : 10,
                "label" : "10% of Dwelling Limit"
              }
            ]
          },
          formData:  {
            path: 'deductibles.sinkhole.value',
            type: 'integer',
            // required: '${it.coverageOptions.sinkholePerilCoverage.answer}',
            required: true,
            metaData: {},
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
          formData: {},
          children: [],
        },
        {
          id: 21,
          component: '$INPUT',
          path: 'property.windMitigation.roofCovering',
          dependencies: [],
          data: {
            component: 'radio',
            label: 'Roof Covering:',
            size: '12',
            segmented: true,
          },
          formData:  {
            path: 'property.windMitigation.roofCovering',
            type: 'string',
            required: true,
            metaData: {
              enum: [
                {
                  "label" : "Non-FBC",
                  "answer" : "Non-FBC"
                },
                {
                  "label" : "FBC",
                  "answer" : "FBC"
                },
                {
                  "label" : "Other",
                  "answer" : "Other"
                }
              ]
            },
          },
          children: [],
        },
        {
          id: 22,
          type: '$INPUT',
          path: 'property.windMitigation.roofDeckAttachment',
          dependencies: [],
          data: {
            component: 'radio',
            label: 'Roof Deck Attachment:',
            size: '12',
            segmented: true,
          },
          formData:  {
            path: 'property.windMitigation.roofDeckAttachment',
            type: 'integer',
            required: true,
            metaData: {
              enum: [
                {
                  "label": "A",
                  "answer" : "A"
                },
                {
                  "label": "B",
                  "answer" : "B"
                },
                {
                  "label": "C",
                  "answer" : "C"
                },
                {
                  "label": "D",
                  "answer" : "D"
                },
                {
                  "label": "Concrete",
                  "answer" : "Concrete"
                },
                {
                  "label": "Other",
                  "answer" : "Other"
                }
              ]
            },
          },
          children: [],
        },
        {
          id: 23,
          type: '$INPUT',
          path: 'property.windMitigation.roofToWallConnection',
          dependencies: [],
          data: {
            component: 'radio',
            label: 'Roof to Wall Attachment:',
            size: '12',
            segmented: true,
          },
          formData:  {
            path: 'property.windMitigation.roofToWallConnection',
            type: 'string',
            required: true,
            metaData: {
              enum: [
                {
                  "label" : "Toe Nails",
                  "answer" : "Toe Nails"
                },
                {
                  "label" : "Clips",
                  "answer" : "Clips"
                },
                {
                  "label" : "Single Wraps",
                  "answer" : "Single Wraps"
                },
                {
                  "label" : "Double Wraps",
                  "answer" : "Double Wraps"
                },
                {
                  "label" : "Other",
                  "answer" : "Other"
                }
              ]
            },
          },
          children: [],
        },
        {
          id: 24,
          type: '$INPUT',
          path: 'property.windMitigation.roofGeometry',
          dependencies: [],
          data: {
            component: 'radio',
            label: 'Roof Geometry:',
            size: '12',
            segmented: true,
          },
          formData:  {
            path: 'property.windMitigation.roofGeometry',
            type: 'string',
            required: true,
            metaData: {
              enum: [
                {
                  "label" : "Flat",
                  "answer" : "Flat"
                },
                {
                  "label" : "Gable",
                  "answer" : "Gable"
                },
                {
                  "label" : "Hip",
                  "answer" : "Hip"
                },
                {
                  "label" : "Other",
                  "answer" : "Other"
                }
              ]
            },
          },
          children: [],
        },
        {
          id: 26,
          type: '$INPUT',
          path: 'property.windMitigation.secondaryWaterResistance',
          dependencies: [],
          data: {
            component: 'radio',
            label: 'Secondary Water Resistance (SWR):',
            size: '12',
            segmented: true,
          },
          formData:  {
            path: 'property.windMitigation.secondaryWaterResistance',
            type: 'string',
            required: true,
            metaData: {
              enum: [
                {
                  "label" : "Yes",
                  "answer" : "Yes"
                },
                {
                  "label" : "Yes",
                  "answer" : "No"
                },
                {
                  "label" : "Yes",
                  "answer" : "Other"
                }
              ]
            },
          },
          children: [],
        },
        {
          id: 27,
          type: '$INPUT',
          dependencies: [],
          path: 'property.windMitigation.openingProtection',
          data: {
            component: 'radio',
            label: 'Opening Protection:',
            size: '12',
            segmented: true,
          },
          formData:  {
            path: 'property.windMitigation.openingProtection',
            type: 'string',
            required: true,
            metaData: {
              enum: [
                {
                  "label" : "None",
                  "answer" : "None"
                },
                {
                  "label" : "Basic",
                  "answer" : "Basic"
                },
                {
                  "label" : "Hurricane",
                  "answer" : "Hurricane"
                },
                {
                  "label" : "Other",
                  "answer" : "Other"
                }
              ]
            },
            children: [],
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
          formData:{},
          children: [],
        },
        {
          id: 29,
          type: '$INPUT',
          path: 'property.burglarAlarm',
          dependencies: [],
          data: {
            component: 'switch',
            label: 'Does the property have a burglar alarm?',
            size: '12',
          },
          formData:  {
            path: 'property.burglarAlarm',
            type: 'boolean',
            metaData: {},
            children: [],
          },
          children: [],
        },
        {
          id: 30,
          type: '$INPUT',
          path: 'property.fireAlarm',
          dependencies: [],
          data: {
            component: 'switch',
            label: 'Does the property have a fire alarm?',
            size: '12',
          },
          formData:  {
            path: 'property.fireAlarm',
            type: 'boolean',
            metaData: {},
            children: [],
          },
          children: [],
        },
        {
          id: 31,
          type: '$INPUT',
          path: 'property.sprinkler',
          dependencies: [],
          data: {
            segmented: true,
            component: 'radio',
            label: 'Sprinkler',
            size: '12',
          },
          formData:  {
            path: 'property.sprinkler',
            type: 'string',
            required: true,
            metaData: {
              enum: [
                {
                  "label" : "N",
                  "answer" : "N"
                },
                {
                  "label" : "A",
                  "answer" : "A"
                },
                {
                  "label" : "B",
                  "answer" : "B"
                }
              ]
            },
            children: [],
          },
          children: [],
        },
      ],
    },
    {
      name: 'share',
      step: {},
      components: [
        {
          id: 1,
          type: '$CUSTOM',
          dependencies: [],
          data: {
            component: '$SHARE',
          },
          formData: {},
          children: [],
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
            component: '$ASSUMPTIONS',
          },
          formData: {},
          children: [],
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
            component: '$ADDITIONAL_INTERESTS',
          },
          formData: {},
          children: [],
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
            component: '$MAILING_BILLING',
          },
          formData: {},
          children: [],
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
            component: '$VERIFY',
          },
          formData: {},
          children: [],
        },
      ],
    },
  ]
};

export default mock;
