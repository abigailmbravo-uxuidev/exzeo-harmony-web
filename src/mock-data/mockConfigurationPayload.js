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
          id: 3,
          type: '$INPUT',
          dependencies: [],
          path: 'policyHolders[0].firstName',
          data: {
            type: 'text',
            label: 'First Name',
            size: '5'
          },
          formData:  {
            path: 'policyHolders.policyHolder.firstName',
            type: 'string',
            required: true,
            metaData: { minLength: 1, maxLength: 255 },
            children: [],
          },
          children: [],
        },
        {
          id: 4,
          type: '$INPUT',
          dependencies: [],
          path: 'policyHolders[0].lastName',
          data: {
            type: 'text',
            label: 'Last Name',
            size: '7'
          },
          formData:  {
            path: 'policyHolders.policyHolder.lastName',
            type: 'string',
            required: true,
            metaData: { minLength: 1, maxLength: 255 },
            children: [],
          },
          children: [],
        },
        {
          id: 5,
          type: '$INPUT',
          dependencies: [],
          path: 'policyHolders[0].emailAddress',
          data: {
            type: 'text',
            label: 'Email Address',
            size: '8',
          },
          formData:  {
            path: 'policyHolders.policyHolder.emailAddress',
            type: 'string',
            required: true,
            metaData: { minLength: 1, maxLength: 255 },
            children: [],
          },
          children: [],
        },
        {
          id: 6,
          type: '$INPUT',
          dependencies: [],
          path: 'policyHolders[0].primaryPhoneNumber',
          data: {
            type: 'phone',
            label: 'Contact Phone',
            size: '4'
          },
          formData:  {
            path: 'policyHolders.policyHolder.primaryPhoneNumber',
            type: 'string',
            required: true,
            metaData: { pattern: '^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$' },
            children: [],
          },
          children: [],
        },
        {
          id: 8,
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
              id: 10,
              type: '$INPUT',
              dependencies: [],
              path: 'policyHolders[1].firstName',
              data: {
                type: 'text',
                label: 'First Name',
                size: '5'
              },
              formData:  {
                path: 'policyHolders.policyHolder.firstName',
                type: 'string',
                required: true,
                metaData: { minLength: 1, maxLength: 255 },
                children: [],
              },
              children: [],
            },
            {
              id: 11,
              type: '$INPUT',
              dependencies: [],
              path: 'policyHolders[1].lastName',
              data: {
                type: 'text',
                label: 'Last Name',
                size: '7'
              },
              formData:  {
                path: 'policyHolders.policyHolder.lastName',
                type: 'string',
                required: true,
                metaData: { minLength: 1, maxLength: 255 },
                children: [],
              },
              children: [],
            },
            {
              id: 12,
              type: '$INPUT',
              dependencies: [],
              path: 'policyHolders[1].emailAddress',
              data: {
                type: 'text',
                label: 'Email Address',
                size: '8',
              },
              formData:  {
                path: 'policyHolders.policyHolder.emailAddress',
                type: 'string',
                required: true,
                metaData: { minLength: 1, maxLength: 255 },
                children: [],
              },
              children: [],
            },
            {
              id: 13,
              type: '$INPUT',
              dependencies: [],
              path: 'policyHolders[1].primaryPhoneNumber',
              data: {
                type: 'phone',
                label: 'Contact Phone',
                size: '4'
              },
              formData:  {
                path: 'policyHolders.policyHolder.primaryPhoneNumber',
                type: 'string',
                required: true,
                metaData: { pattern: '^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$' },
                children: [],
              },
              children: [],
            }
          ]
        },
        {
          id: 15,
          type: '$INPUT',
          dependencies: [],
          path: 'effectiveDate',
          data: {
            type: 'date',
            label: 'Effective Date',
            size: '6'
          },
          formData: {
            path: 'effectiveDate',
            type: 'string',
            required: true,
            metaData: { format: 'date-time' },
            children: []
          },
          children: [],
        },
        {
          id: 16,
          type: '$INPUT',
          dependencies: [],
          path: 'agentCode',
          data: {
            type: 'select',
            label: 'Agent',
            size: '6',
            options: 'agents'
          },
          formData: {
            path: 'agentCode',
            type: 'integer',
            required: true,
            metaData: {},
            children: []
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
          path: 'document.coverageLimits.dwelling.value',
          data: {
            type: 'slider',
            label: 'Dwelling Limit',
            validation: ['dwellingRange'],
            hint : "This is the dollar amount of coverage for the structure of your home. This amount should represent the total cost to rebuild your home to its current state in the event of a loss. If you have a Declarations Page from your current  policy it may be listed as Coverage A.  (Based on basic information of your home, we provide you a guide for a recommended value. You can move this number up or down based on more detailed information. For example, if you have an upgraded kitchen and bathroom, you may want to increase this number to ensure that you have adequate coverage in the event of a loss.)  ",
            extendedProperties: {
              min: 'config.coverageLimits.dwelling.minAmount',
              max: 'document.coverageLimits.dwelling.maxAmount',
              step: 1000
            },
          },
          formData: {
            path: 'coverageLimits.dwelling.value',
            type: 'integer',
            required: true,
            metaData: {},
            children: []
          },
          children: [],
        },
        {
          id: 3,
          type: '$INPUT',
          dependencies: [],
          path: 'coverageLimits.otherStructures.value',
          data: {
            segmented: true,
            type: 'radio',
            label: 'Other Structures Limit',
            size: '12',
            hint : "This is the dollar amount of coverage for the other structures on your property not attached to your home. This might include a fence, shed, or unattached garage. If you have a Declarations Page from your current  policy it may be listed as Coverage B.",
            options: 'uiQuestions.otherStructuresAmount',
            extendedProperties: {
              transformConfig: {
                value: '${Math.ceil(((it.document.coverageLimits.otherStructures.value / 100) * it.document.coverageLimits.dwelling.amount))}',
                format: 'currency',
              },
            },
          },
          formData: {
            path: 'coverageLimits.otherStructures.value',
            type: 'integer',
            required: true,
            metaData: {},
            children: []
          },
          children: [],
        },
        {
          id: 4,
          type: '$INPUT',
          dependencies: [],
          path: 'coverageLimits.personalProperty.value',
          data: {
            segmented: true,
            type: 'radio',
            label: 'Personal Property Limit',
            size: '12',
            hint : "This is your personal belongings, or items located inside the home. This could include your furniture, clothing, bedding, dishes, etc. If you choose to have replacement cost coverage on Personal Property, you will be required to carry Personal Property limits at a minimum of 25% of your Dwelling limit.",
            extendedProperties: {
              transformConfig: {
                value: '${Math.ceil(((it.document.coverageLimits.personalProperty.value / 100) * it.document.coverageLimits.dwelling.amount))}',
                format: 'currency'
              },
            },
            options: 'uiQuestions.personalPropertyAmount'
          },
          formData: {
            path: 'coverageLimits.personalProperty.value',
            type: 'integer',
            required: true,
            metaData: {},
            children: []
          },
          children: [],
        },
        {
          id: 6,
          type: '$INPUT',
          dependencies: [
            { path: 'coverageLimits.personalProperty.value', value: true }
          ],
          path: 'coverageOptions.personalPropertyReplacementCost.answer',
          data: {
            type: 'switch',
            label: 'Do you want Personal Property Replacement Cost Coverage?',
            size: '12',
            hint : "Replacement Cost Coverage replaces your damaged possessions at today's prices without deducting for depreciation. If you choose not to select this coverage, your loss for personal property will be paid out at Actual Cash Value.",
          },
          formData: {
            path: 'coverageOptions.personalPropertyReplacementCost.answer',
            type: 'boolean',
            required: true,
            metaData: {},
            children: []
          },
          children: [],
        },
        {
          id: 7,
          type: '$INPUT',
          dependencies: [],
          path: 'coverageLimits.lossOfUse.value',
          data: {
            extendedProperties: {
              transformConfig: {
                value: '${Math.ceil(((it.document.coverageLimits.lossOfUse.value / 100) * it.document.coverageLimits.dwelling.amount))}',
                format: 'currency'
              },
            },
            type: 'display',
            label: 'Loss of Use Limit',
            size: '12',
            hint : "This is your personal belongings, or items located inside the home. This could include your furniture, clothing, bedding, dishes, etc. If you choose to have replacement cost coverage on Personal Property, you will be required to carry Personal Property limits at a minimum of 25% of your Dwelling limit.",
            options: [],
          },
          formData: {
            path: 'coverageLimits.lossOfUse.value',
            type: 'integer',
            required: true,
            metaData: {},
            children: []
          },
          children: [],
        },
        {
          id: 8,
          type: '$INPUT',
          dependencies: [],
          path: 'coverageLimits.personalLiability.value',
          data: {
            segmented: true,
            type: 'radio',
            label: 'Personal Liability Limit',
            size: '12'
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
            children: []
          },
          children: [],
        },
        {
          id: 9,
          type: '$INPUT',
          dependencies: [],
          path: 'coverageLimits.medicalPayments.value',
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
            options: []
          },
          formData: {
            path: 'coverageLimits.medicalPayments.value',
            type: 'integer',
            required: true,
            metaData: {},
            children: []
          },
          children: [],
        },
        {
          id: 10,
          type: '$INPUT',
          dependencies: [],
          path: 'coverageLimits.moldProperty.value',
          data: {
            segmented: true,
            type: 'radio',
            label: 'Limited Fungi, Wet or Dry Rot, Yeast or Bacteria Coverage - Property',
            size: '12'
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
            children: []
          },
          children: [],
        },
        {
          id: 473292,
          type: '$INPUT',
          dependencies: [],
          path: 'coverageLimits.moldLiability.amount',
          data: {
            segmented: true,
            type: 'radio',
            label: 'Limited Fungi, Wet or Dry Rot, Yeast or Bacteria Coverage - Liability',
            size: '12'
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
            children: []
          },
          children: [],
        },
        {
          id: 11,
          type: '$INPUT',
          dependencies: [],
          path: 'coverageLimits.ordinanceOrLaw.value',
          data: {
            segmented: true,
            type: 'radio',
            label: 'Ordinance or Law Coverage Limit',
            size: '12',
            extendedProperties: {}
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
            children: []
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
          path: 'coverageOptions.sinkholePerilCoverage.answer',
          data: {
            segmented: true,
            type: 'switch',
            label: 'Do you want Sinkhole Loss Coverage?',
            size: '12',
            options: []
          },
          formData:  {
            path: 'coverageOptions.sinkholePerilCoverage.answer',
            type: 'boolean',
            required: true,
            metaData: {},
            children: [],
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
          path: 'deductibles.allOtherPerils.value',
          data: {
            segmented: true,
            type: 'radio',
            label: 'All Other Perils Deductible',
            size: '12',
            options: 'uiQuestions.allOtherPerils'
          },
          formData:  {
            path: 'deductibles.allOtherPerils.value',
            type: 'integer',
            required: true,
            metaData: {},
            children: [],
          },
          children: [],
        },
        {
          id: 17,
          type: '$INPUT',
          dependencies: [],
          path: 'deductibles.hurricane.value',
          data: {
            extendedProperties: {
              transformConfig: {
                value: '${Math.ceil(((it.deductibles.hurricane.value / 100) * it.coverageLimits.dwelling.amount))}',
                format: 'percentage',
              }
            },
            segmented: true,
            type: 'radio',
            label: 'Hurricane Deductible',
            size: '12',
            options: 'uiQuestions.hurricane',

          },
          formData:  {
            path: 'deductibles.hurricane.value',
            type: 'integer',
            required: true,
            metaData: {},
            children: [],
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
            segmented: true,
            type: 'radio',
            label: 'Sinkhole Deductible',
            size: '12',
            path: 'deductibles.sinkhole.amount',
            options: [
              {
                "answer" : 10,
                "label" : "10% of Dwelling Limit"
              }
            ]
          },
          formData:  {
            path: 'deductibles.sibnkhole.value',
            type: 'integer',
            required: '${it.coverageOptions.sinkholePerilCoverage.answer}',
            metaData: {},
            children: [],
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
          path: 'property.windMitigation.roofCovering',
          data: {
            segmented: true,
            type: 'radio',
            label: 'Roof Covering:',
            size: '12'
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
            children: [],
          },
          children: [],
        },
        {
          id: 22,
          type: '$INPUT',
          dependencies: [],
          path: 'property.windMitigation.roofDeckAttachment',
          data: {
            segmented: true,
            type: 'radio',
            label: 'Roof Deck Attachment:',
            size: '12'
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
            children: [],
          },
          children: [],
        },
        {
          id: 23,
          type: '$INPUT',
          dependencies: [],
          path: 'property.windMitigation.roofToWallConnection',
          data: {
            segmented: true,
            type: 'radio',
            label: 'Roof to Wall Attachment:',
            size: '12'
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
            children: [],
          },
          children: [],
        },
        {
          id: 24,
          type: '$INPUT',
          dependencies: [],
          path: 'property.windMitigation.roofGeometry',
          data: {
            segmented: true,
            type: 'radio',
            label: 'Roof Geometry:',
            size: '12'
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
            children: [],
          },
          children: [],
        },
        {
          id: 26,
          type: '$INPUT',
          dependencies: [],
          path: 'property.windMitigation.secondaryWaterResistance',
          data: {
            segmented: true,
            type: 'radio',
            label: 'Secondary Water Resistance (SWR):',
            size: '12'
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
            children: [],
          },
          children: [],
        },
        {
          id: 27,
          type: '$INPUT',
          dependencies: [],
          path: 'property.windMitigation.openingProtection',
          data: {
            segmented: true,
            type: 'radio',
            label: 'Opening Protection:',
            size: '12'
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
          children: [],
        },
        {
          id: 29,
          type: '$INPUT',
          dependencies: [],
          path: 'property.burglarAlarm',
          data: {
            type: 'switch',
            label: 'Does the property have a burglar alarm?',
            size: '12',
            options: []
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
          dependencies: [],
          path: 'property.fireAlarm',
          data: {
            type: 'switch',
            label: 'Does the property have a fire alarm?',
            size: '12',
            options: []
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
          dependencies: [],
          path: 'property.sprinkler',
          data: {
            segmented: true,
            type: 'radio',
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
