/* eslint-disable */
const mock = {
  "header": {
    "hideDetailSummary": true,
    "fields": [{
        "value": "quoteNumber"
      },
      {
        "value": "propertyAddress",
        "component": "Section",
        "label": "Address"
      },
      {
        "value": "yearBuilt"
      },
      {
        "value": "floodZone"
      },
      {
        "value": "coverage",
        "label": "Coverage A"
      },
      {
        "value": "premium",
        "component": "PremiumSection"
      }
    ]
  },
  pages: [
    {
      name: 'customerInfo',
      step: {},
      components: [
        {
          "id": 1,
          "type": "$TITLE",
          "dependencies": [],
          "data": {
            "text": "Primary Policyholder",
            "icon": "fa fa-user-circle"
          },
          "formData": {},
          "children": []
        },
        {
          "id": 3,
          "type": "$INPUT",
          "dependencies": [],
          "path": "policyHolders[0].firstName",
          "data": {
            "component": "text",
            "label": "First Name",
            "size": "5",
            "validation": [
              "isValidNameFormat"
            ]
          },
          "formData": {
            "path": "policyHolders.policyHolder.firstName",
            "type": "string",
            "required": true,
            "metaData": {
              "minLength": 1,
              "maxLength": 255
            }
          },
          "children": []
        },
        {
          "id": 4,
          "type": "$INPUT",
          "path": "policyHolders[0].lastName",
          "dependencies": [],
          "data": {
            "component": "text",
            "label": "Last Name",
            "size": "7",
            "validation": [
              "isValidNameFormat"
            ]
          },
          "formData": {
            "path": "policyHolders.policyHolder.lastName",
            "type": "string",
            "required": true,
            "metaData": {
              "minLength": 1,
              "maxLength": 255
            }
          },
          "children": []
        },
        {
          "id": 5,
          "type": "$INPUT",
          "path": "policyHolders[0].emailAddress",
          "dependencies": [],
          "data": {
            "component": "text",
            "label": "Email Address",
            "size": "8",
            "validation": [
              "isEmail"
            ]
          },
          "formData": {
            "path": "policyHolders.policyHolder.emailAddress",
            "type": "string",
            "required": true,
            "metaData": {
              "minLength": 1,
              "maxLength": 255
            }
          },
          "children": []
        },
        {
          "id": 6,
          "type": "$INPUT",
          "path": "policyHolders[0].primaryPhoneNumber",
          "dependencies": [],
          "data": {
            "component": "phone",
            "label": "Contact Phone",
            "size": "4",
            "validation": [
              "isPhone"
            ]
          },
          "formData": {
            "path": "policyHolders.policyHolder.primaryPhoneNumber",
            "type": "string",
            "required": true,
            "metaData": {
              "pattern": "^(+d{1,2}s)?(?d{3})?[s.-]d{3}[s.-]d{4}$"
            }
          },
          "children": []
        },
        {
          "id": 8,
          "type": "$INPUT",
          "path": "additionalPolicyholder",
          "dependencies": [],
          "data": {
            "component": "switch",
            "label": "Do you want to add an additional Policyholder?"
          },
          "formData": {},
          "children": []
        },
        {
          "id": 3453,
          "type": "$SECTION",
          "dependencies": [
            {
              "path": "additionalPolicyholder",
              "value": true
            }
          ],
          "data": {},
          "formData": {},
          "children": [
            {
              "id": 7,
              "type": "$TITLE",
              "dependencies": [],
              "data": {
                "text": "Secondary Policyholder",
                "icon": "fa fa-user-circle",
                "children": []
              },
              "formData": {},
              "children": []
            },
            {
              "id": 10,
              "type": "$INPUT",
              "path": "policyHolders[1].firstName",
              "dependencies": [],
              "data": {
                "component": "text",
                "label": "First Name",
                "size": "5",
                "validation": [
                  "isValidNameFormat"
                ]
              },
              "formData": {
                "path": "policyHolders.policyHolder.firstName",
                "type": "string",
                "required": true,
                "metaData": {
                  "minLength": 1,
                  "maxLength": 255
                }
              },
              "children": []
            },
            {
              "id": 11,
              "type": "$INPUT",
              "path": "policyHolders[1].lastName",
              "dependencies": [],
              "data": {
                "component": "text",
                "label": "Last Name",
                "size": "7",
                "validation": [
                  "isValidNameFormat"
                ]
              },
              "formData": {
                "path": "policyHolders.policyHolder.lastName",
                "type": "string",
                "required": true,
                "metaData": {
                  "minLength": 1,
                  "maxLength": 255
                }
              },
              "children": []
            },
            {
              "id": 12,
              "type": "$INPUT",
              "path": "policyHolders[1].emailAddress",
              "dependencies": [],
              "data": {
                "component": "text",
                "label": "Email Address",
                "size": "8",
                "validation": [
                  "isEmail"
                ]
              },
              "formData": {
                "path": "policyHolders.policyHolder.emailAddress",
                "type": "string",
                "required": true,
                "metaData": {
                  "minLength": 1,
                  "maxLength": 255
                }
              },
              "children": []
            },
            {
              "id": 13,
              "type": "$INPUT",
              "path": "policyHolders[1].primaryPhoneNumber",
              "dependencies": [],
              "data": {
                "component": "phone",
                "label": "Contact Phone",
                "size": "4",
                "validation": [
                  "isPhone"
                ]
              },
              "formData": {
                "path": "policyHolders.policyHolder.primaryPhoneNumber",
                "type": "string",
                "required": true,
                "metaData": {
                  "pattern": "^(+d{1,2}s)?(?d{3})?[s.-]d{3}[s.-]d{4}$"
                }
              },
              "children": []
            }
          ]
        },
        {
          "id": 3453111,
          "type": "$TITLE",
          "dependencies": [],
          "data": {
            "text": "Policy Details",
            "icon": "fa fa-file-text"
          },
          "formData": {},
          "children": []
        },
        {
          "id": 15,
          "type": "$INPUT",
          "path": "effectiveDate",
          "dependencies": [],
          "data": {
            "component": "date",
            "label": "Effective Date",
            "size": "6",
            "extendedProperties": {
              "min": "zipCodeSettings.minEffectiveDate",
              "max": "zipCodeSettings.maxEffectiveDate"
            },
            "validation": [
              "minEffectiveDate",
              "isValidDate"
            ]
          },
          "formData": {
            "path": "effectiveDate",
            "type": "string",
            "required": true,
            "metaData": {
              "format": "date-time"
            }
          },
          "children": []
        },
        {
          "id": 16,
          "type": "$INPUT",
          "path": "agentCode",
          "dependencies": [],
          "data": {
            "component": "select",
            "label": "Agent",
            "size": "6",
            "dataSource": "agents"
          },
          "formData": {
            "path": "agentCode",
            "type": "integer",
            "required": true,
            "metaData": {}
          },
          "children": []
        }
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
          id: 1,
          type: '$CUSTOM',
          dependencies: [],
          data: {
            component: '$SLIDERGROUP',
            extendedProperties: {
              format: 'currency',
              watchField: 'coverageLimits.dwelling.value',
              watchFieldLabel: 'Building',
              watchFieldMin: 'coverageLimits.dwelling.minAmount',
              watchFieldMax: 'coverageLimits.dwelling.maxAmount',
              watchFieldHint: "This is the dollar amount of coverage for the structure of your home. This amount should represent the total cost to rebuild your home to its current state in the event of a loss. If you have a Declarations Page from your current  policy it may be listed as Coverage A.  (Based on basic information of your home, we provide you a guide for a recommended value. You can move this number up or down based on more detailed information. For example, if you have an upgraded kitchen and bathroom, you may want to increase this number to ensure that you have adequate coverage in the event of a loss.)  ",
              secondaryField: 'coverageLimits.personalProperty.value',
              secondaryFieldLabel: 'Personal Property',
              secondaryFieldMin: 0,
              secondaryFieldHint: "This is your personal belongings, or items located inside the home. This could include your furniture, clothing, bedding, dishes, etc. If you choose to have replacement cost coverage on Personal Property, you will be required to carry Personal Property limits at a minimum of 25% of your Dwelling limit.",
            }
          },
          formData: {},
          children: [],
        },
        // {
        //   id: 2,
        //   type: '$INPUT',
        //   path: 'coverageLimits.dwelling.amount',
        //   dependencies: [],
        //   data: {
        //     component: 'slider',
        //     label: 'Building',
        //     hint : "This tooltip is supposed to say something helpful, but there are no specs",
        //     validation: ['isDwellingRange'],
        //     extendedProperties: {
        //       format: 'currency',
        //       min: 'coverageLimits.dwelling.minAmount',
        //       max: 'coverageLimits.dwelling.maxAmount',
        //       step: 1000,
        //     },
        //   },
        //   formData: {
        //     path: 'coverageLimits.dwelling.value',
        //     type: 'integer',
        //     required: true,
        //     metaData: {},
        //   },
        //   children: [],
        // },
        // {
        //   id: 23452,
        //   type: '$INPUT',
        //   path: 'coverageLimits.personalProperty.value',
        //   dependencies: [],
        //   data: {
        //     component: 'slider',
        //     label: 'Personal Property',
        //     hint : "This tooltip is supposed to say something helpful, but there are no specs",
        //     validation: [],
        //     extendedProperties: {
        //       format: 'currency',
        //       min: 'coverageLimits.dwelling.minAmount',
        //       max: 'coverageLimits.dwelling.maxAmount',
        //       step: 1000,
        //     },
        //   },
        //   formData: {
        //     path: 'coverageLimits.personalProperty.value',
        //     type: 'integer',
        //     required: true,
        //     metaData: {},
        //   },
        //   children: [],
        // },
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
          id: 4,
          type: '$INPUT',
          path: 'deductibles.buildingDeductible.value',
          dependencies: [],
          data: {
            segmented: true,
            component: 'radio',
            label: 'Deductible',
            size: '12',
            hint : "Building deductible help text goes here.",
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
              },

            ]
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
            extendedProperties: {
              subscribe: true
            },
            component: '$SHARE',
          },
          formData: {},
          children: [],
        },
      ],
    },
    {
      name: 'policyholder',
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
            size: '5',
            validation: ['isValidNameFormat'],
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
            size: '7',
            validation: ['isValidNameFormat'],
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
            validation: ['isEmail'],
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
            size: '4',
            validation: ['isPhone'],
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
                size: '5',
                validation: ['isValidNameFormat'],
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
                size: '7',
                validation: ['isValidNameFormat'],
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
                validation: ['isEmail'],
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
                size: '4',
                validation: ['isPhone'],
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
          id: 3453111,
          type: '$TITLE',
          dependencies: [],
          data: {
            text: 'Policy Details',
            icon: 'fa fa-file-text',
          },
          formData: {},
          children: [],

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
              max: 'zipCodeSettings.maxEffectiveDate',
            },
            validation: ['minEffectiveDate', 'isValidDate'],
          },
          formData: {
            path: 'effectiveDate',
            type: 'string',
            required: true,
            metaData: {
              format: 'date-time'
              // also need min-date for underwriting
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
        // {
        //   id: 6,
        //   type: '$INPUT',
        //   path: 'confirmAssumptions',
        //   dependencies: [],
        //   data: {
        //     component: 'switch',
        //     label: 'Confirmed',
        //     size: '12',
        //     customClass: 'confirm'
        //   },
        //   formData: {
        //     path: 'coverageOptions.personalPropertyReplacementCost.answer',
        //     type: 'boolean',
        //     required: true,
        //     metaData: {},
        //   },
        //   children: [],
        // },
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
            extendedProperties: {
              text: 'Please select the type of Additional Interest that you would like to add for this policy. (If the policy premium bill needs to go to somewhere other than the policyholder or an additional interest, please select Bill Payer to enter the alternate address.)',
              types: [
                'mortgagee',
                'additionalInsured',
                'additionalInterest',
                'premiumFinance',
                'billPayer',
              ],
              subscribe: true,
            }
          },
          formData: {},
          children: [],
        },
      ],
    },
    {
      name: 'mailingBilling',
      step: {},
      meta: {},
      components: [
        {
          id: 34576,
          type: '$TITLE',
          dependencies: [],
          data: {
            text: 'Mailing Address',
            icon: 'fa fa-envelope'
          },
          formData: {},
          children: [],
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
          children: [],
        },
        {
          id: 340933,
          type: '$TITLE',
          dependencies: [],
          data: {
            text: 'Billing Information',
            icon: 'fa fa-dollar'
          },
          formData: {},
          children: [],
        },
        // {
        //   id: 345933,
        //   type: '$INPUT',
        //   path: 'billToId',
        //   dependencies: [],
        //   data: {
        //     component: 'select',
        //     label: 'Bill To',
        //     dataSource: 'billingOptions',
        //     extendedProperties: {}
        //   },
        //   formData: {
        //     required: true,
        //   },
        //   children: [],
        // },
        {
          id: 348833,
          type: '$CUSTOM',
          dependencies: [],
          data: {
            component: '$BILLING',
            dataSource: 'billPlans',
            extendedProperties: {
              subscribe: true,
            }
          },
          formData: {
            required: true,
          },
          children: [],
        },

      ],
    },
    {
      name: 'verify',
      step: {},
      components: [
        {
          id: 673334,
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
