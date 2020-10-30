/* eslint-disable */
const mock = {
  header: {
    hideDetailSummary: true,
    fields: [
      { value: 'quoteNumber' },
      { value: 'propertyAddress', component: 'Section', label: 'Address' },
      { value: 'yearBuilt' },
      { value: 'constructionType' },
      {
        value: 'coverageLimits.dwelling.amount',
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
      className: 'workflow-banner ttic fl ho3 quote',
      icon: 'ho3',
      title: 'TypTap',
      subTitle: 'FL'
    }
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
          id: 1,
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
          id: 2,
          component: 'slider',
          path: 'coverageLimits.dwelling.value',
          dependencies: '',
          data: {
            label: 'Dwelling Limit',
            hint:
              'This is the dollar amount of coverage for the structure of your home. This amount should represent the total cost to rebuild your home to its current state in the event of a loss. If you have a Declarations Page from your current  policy it may be listed as Coverage A.  (Based on basic information of your home, we provide you a guide for a recommended value. You can move this number up or down based on more detailed information. For example, if you have an upgraded kitchen and bathroom, you may want to increase this number to ensure that you have adequate coverage in the event of a loss.)  ',
            validation: ['isDwellingRange'],
            extendedProperties: {
              format: 'currency',
              min: 'coverageLimits.dwelling.minAmount',
              max: 'coverageLimits.dwelling.maxAmount',
              step: 1000
            }
          },
          formData: {
            required: true
          },
          children: []
        },
        {
          id: 3,
          component: 'radio',
          path: 'coverageLimits.otherStructures.value',
          dependencies: '',
          data: {
            segmented: true,
            label: 'Other Structures Limit',
            size: '12',
            hint:
              'This is the dollar amount of coverage for the other structures on your property not attached to your home. This might include a fence, shed, or unattached garage. If you have a Declarations Page from your current  policy it may be listed as Coverage B.',
            options: [
              {
                label: '0%',
                answer: 0
              },
              {
                label: '2%',
                answer: 2
              },
              {
                label: '5%',
                answer: 5
              },
              {
                label: '10%',
                answer: 10
              }
            ],
            extendedProperties: {
              output:
                '${format.toCurrency(Math.ceil(((it.coverageLimits.otherStructures.value / 100) * it.coverageLimits.dwelling.value)))}'
            }
          },
          formData: {
            required: true
          },
          children: []
        },
        {
          id: 4,
          component: 'radio',
          path: 'coverageLimits.personalProperty.value',
          dependencies: '',
          data: {
            segmented: true,
            label: 'Personal Property Limit',
            size: '12',
            validation: ['personalPropertyMax'],
            hint:
              "This is your personal belongings, or items located inside the home. This could include your furniture, clothing, bedding, dishes, etc. If you choose to have replacement cost coverage on Personal Property, you will be required to carry Personal Property limits at a minimum of 25% of your Dwelling limit. TypTap's maximum Personal Property Limit is $500,000.",
            extendedProperties: {
              output:
                '${format.toCurrency(Math.ceil(((it.coverageLimits.personalProperty.value / 100) * it.coverageLimits.dwelling.value)))}',
              conditionalOptions: true
            },
            options: [
              {
                label: '0%',
                answer: 0,
                disabled:
                  '${Math.ceil(((0) * it.coverageLimits.dwelling.value)) > 500000}'
              },
              {
                label: '25%',
                answer: 25,
                disabled:
                  '${Math.ceil(((0.25) * it.coverageLimits.dwelling.value)) > 500000}'
              },
              {
                label: '35%',
                answer: 35,
                disabled:
                  '${Math.ceil(((0.35) * it.coverageLimits.dwelling.value)) > 500000}'
              },
              {
                label: '50%',
                answer: 50,
                disabled:
                  '${Math.ceil(((0.5) * it.coverageLimits.dwelling.value)) > 500000}'
              }
            ]
          },
          formData: {
            required: true
          },
          children: []
        },
        {
          id: 6,
          component: 'switch',
          path: 'coverageOptions.personalPropertyReplacementCost.answer',
          dependencies: '${it.coverageLimits.personalProperty.value}',
          data: {
            label: 'Do you want Personal Property Replacement Cost Coverage?',
            size: '12',
            hint:
              "Replacement Cost Coverage replaces your damaged possessions at today's prices without deducting for depreciation. If you choose not to select this coverage, your loss for personal property will be paid out at Actual Cash Value."
          },
          formData: {
            required: true
          },
          children: []
        },
        {
          id: 7,
          component: 'display',
          path: 'coverageLimits.lossOfUse.value',
          dependencies: '',
          data: {
            label: 'Loss of Use Limit',
            size: '12',
            hint:
              'Loss of Use Coverage is for additional living expenses incurred while your home is being repaired or rebuilt.',
            extendedProperties: {
              output:
                '${format.toCurrency(Math.ceil(((it.coverageLimits.lossOfUse.value / 100) * it.coverageLimits.dwelling.value)))}'
            }
          },
          formData: {
            required: true
          },
          children: []
        },
        {
          id: 8,
          component: 'radio',
          path: 'coverageLimits.personalLiability.value',
          dependencies: '',
          data: {
            label: 'Personal Liability Limit',
            size: '12',
            segmented: true,
            options: [
              { label: '$100,000', answer: 100000 },
              { label: '$300,000', answer: 300000 }
            ]
          },
          formData: {
            required: true
          },
          children: []
        },
        {
          id: 9,
          component: 'display',
          path: 'coverageLimits.medicalPayments.value',
          dependencies: '',
          data: {
            label: 'Medical Payments to Others',
            size: '12',
            segmented: true,
            extendedProperties: {
              output: '${format.toCurrency(2000)}'
            }
          },
          formData: {
            required: true
          },
          children: []
        },
        {
          id: 10,
          component: 'radio',
          path: 'coverageLimits.moldProperty.value',
          dependencies: '',
          data: {
            label:
              'Limited Fungi, Wet or Dry Rot, Yeast or Bacteria Coverage - Property',
            size: '12',
            segmented: true,
            options: [
              {
                label: '$10,000',
                answer: 10000
              },
              {
                label: '$25,000',
                answer: 25000
              },
              {
                label: '$50,000',
                answer: 50000
              }
            ]
          },
          formData: {
            required: true
          },
          children: []
        },
        {
          id: 2342,
          component: 'radio',
          path: 'coverageLimits.moldLiability.value',
          dependencies: '',
          data: {
            label:
              'Limited Fungi, Wet or Dry Rot, Yeast or Bacteria Coverage - Liability',
            size: '12',
            segmented: true,
            options: [
              {
                label: '$50,000',
                answer: 50000
              },
              {
                label: '$100,000',
                answer: 100000
              }
            ]
          },
          formData: {
            required: true
          },
          children: []
        },
        {
          id: 11,
          component: 'radio',
          path: 'coverageLimits.ordinanceOrLaw.value',
          dependencies: '',
          data: {
            segmented: true,
            label: 'Ordinance or Law Coverage Limit',
            size: '12',
            options: [
              {
                label: '25% of Dwelling Limit',
                answer: 25
              },
              {
                label: '50% of Dwelling Limit',
                answer: 50
              }
            ]
          },
          formData: {
            required: true
          },
          children: []
        },
        {
          id: 12,
          component: '$TITLE',
          dependencies: '',
          data: {
            text: 'Coverage Options',
            icon: 'fa fa-tasks'
          },
          formData: {},
          children: []
        },
        {
          id: 14,
          component: 'switch',
          path: 'coverageOptions.sinkholePerilCoverage.answer',
          dependencies: '',
          data: {
            label: 'Do you want Sinkhole Loss Coverage?',
            size: '12',
            segmented: true
          },
          formData: {
            required: true
          },
          children: []
        },
        {
          id: 15,
          component: '$TITLE',
          dependencies: '',
          data: {
            text: 'Deductibles',
            icon: 'fa fa-money'
          },
          formData: {},
          children: []
        },
        {
          id: 16,
          component: 'radio',
          path: 'deductibles.allOtherPerils.value',
          dependencies: '',
          data: {
            label: 'All Other Perils Deductible',
            size: '12',
            segmented: true,
            options: [
              {
                label: '$500',
                answer: 500
              },
              {
                label: '$1,000',
                answer: 1000
              },
              {
                label: '$2,500',
                answer: 2500
              }
            ]
          },
          formData: {
            required: true
          },
          children: []
        },
        {
          id: 17,
          component: 'radio',
          path: 'deductibles.hurricane.value',
          dependencies: '',
          data: {
            segmented: true,
            label: 'Hurricane Deductible',
            size: '12',
            options: [
              {
                label: '2% of Dwelling Limit',
                answer: 2
              },
              {
                label: '5% of Dwelling Limit',
                answer: 5
              },
              {
                label: '10% of Dwelling Limit',
                answer: 10
              }
            ],
            extendedProperties: {
              output:
                '${format.toCurrency(Math.ceil(((it.deductibles.hurricane.value / 100) * it.coverageLimits.dwelling.value)))}'
            }
          },
          formData: {
            required: true
          },
          children: []
        },
        {
          id: 19,
          component: 'radio',
          path: 'deductibles.sinkhole.value',
          dependencies: '${it.coverageOptions.sinkholePerilCoverage.answer}',
          data: {
            label: 'Sinkhole Deductible',
            size: '12',
            segmented: true,
            options: [
              {
                answer: 10,
                label: '10% of Dwelling Limit'
              }
            ],
            extendedProperties: {
              output:
                '${format.toCurrency(Math.ceil(((it.deductibles.sinkhole.value / 100) * it.coverageLimits.dwelling.value)))}'
            }
          },
          formData: {
            required: true
          },
          children: []
        },
        {
          id: 20,
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
          id: 21,
          component: 'radio',
          path: 'property.windMitigation.roofCovering',
          dependencies: '',
          data: {
            label: 'Roof Covering:',
            size: '12',
            segmented: true,
            options: [
              {
                label: 'Non-FBC',
                answer: 'Non-FBC'
              },
              {
                label: 'FBC',
                answer: 'FBC'
              },
              {
                label: 'Other',
                answer: 'Other'
              }
            ]
          },
          formData: {
            required: true
          },
          children: []
        },
        {
          id: 22,
          component: 'radio',
          path: 'property.windMitigation.roofDeckAttachment',
          dependencies: '',
          data: {
            label: 'Roof Deck Attachment:',
            size: '12',
            segmented: true,
            options: [
              {
                label: 'A',
                answer: 'A'
              },
              {
                label: 'B',
                answer: 'B'
              },
              {
                label: 'C',
                answer: 'C'
              },
              {
                label: 'D',
                answer: 'D'
              },
              {
                label: 'Concrete',
                answer: 'Concrete'
              },
              {
                label: 'Other',
                answer: 'Other'
              }
            ]
          },
          formData: {
            required: true
          },
          children: []
        },
        {
          id: 23,
          component: 'radio',
          path: 'property.windMitigation.roofToWallConnection',
          dependencies: '',
          data: {
            label: 'Roof to Wall Attachment:',
            size: '12',
            segmented: true,
            options: [
              {
                label: 'Toe Nails',
                answer: 'Toe Nails'
              },
              {
                label: 'Clips',
                answer: 'Clips'
              },
              {
                label: 'Single Wraps',
                answer: 'Single Wraps'
              },
              {
                label: 'Double Wraps',
                answer: 'Double Wraps'
              },
              {
                label: 'Other',
                answer: 'Other'
              }
            ]
          },
          formData: {
            required: true
          },
          children: []
        },
        {
          id: 24,
          component: 'radio',
          path: 'property.windMitigation.roofGeometry',
          dependencies: '',
          data: {
            label: 'Roof Geometry:',
            size: '12',
            segmented: true,
            options: [
              {
                label: 'Flat',
                answer: 'Flat'
              },
              {
                label: 'Gable',
                answer: 'Gable'
              },
              {
                label: 'Hip',
                answer: 'Hip'
              },
              {
                label: 'Other',
                answer: 'Other'
              }
            ]
          },
          formData: {
            required: true
          },
          children: []
        },
        {
          id: 26,
          component: 'radio',
          path: 'property.windMitigation.secondaryWaterResistance',
          dependencies: '',
          data: {
            label: 'Secondary Water Resistance (SWR):',
            size: '12',
            segmented: true,
            options: [
              {
                label: 'Yes',
                answer: 'Yes'
              },
              {
                label: 'No',
                answer: 'No'
              },
              {
                label: 'Other',
                answer: 'Other'
              }
            ]
          },
          formData: {
            required: true
          },
          children: []
        },
        {
          id: 27,
          component: 'radio',
          dependencies: '',
          path: 'property.windMitigation.openingProtection',
          data: {
            label: 'Opening Protection:',
            size: '12',
            segmented: true,
            options: [
              {
                label: 'None',
                answer: 'None'
              },
              {
                label: 'Basic',
                answer: 'Basic'
              },
              {
                label: 'Hurricane',
                answer: 'Hurricane'
              },
              {
                label: 'Other',
                answer: 'Other'
              }
            ]
          },
          formData: {
            required: true
          },
          children: []
        },
        {
          id: 28,
          component: '$TITLE',
          dependencies: '',
          data: {
            text: 'Discounts',
            icon: 'fa fa-scissors'
          },
          formData: {},
          children: []
        },
        {
          id: 29,
          component: 'switch',
          path: 'property.burglarAlarm',
          dependencies: '',
          data: {
            label: 'Does the property have a burglar alarm?',
            size: '12'
          },
          formData: {},
          children: []
        },
        {
          id: 30,
          component: 'switch',
          path: 'property.fireAlarm',
          dependencies: '',
          data: {
            label: 'Does the property have a fire alarm?',
            size: '12'
          },
          formData: {},
          children: []
        },
        {
          id: 31,
          component: 'radio',
          path: 'property.sprinkler',
          dependencies: '',
          data: {
            segmented: true,
            label: 'Sprinkler',
            size: '12',
            options: [
              {
                label: 'N',
                answer: 'N'
              },
              {
                label: 'A',
                answer: 'A'
              },
              {
                label: 'B',
                answer: 'B'
              }
            ]
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
          id: 1,
          component: '$SHARE',
          dependencies: '',
          data: {},
          formData: {},
          children: []
        }
      ]
    },
    {
      name: 'assumptions',
      step: {},
      components: [
        {
          id: 1,
          component: '$ASSUMPTIONS',
          dependencies: '',
          data: {},
          formData: {},
          children: []
        }
      ]
    },
    {
      name: 'policyholder',
      step: {},
      components: [
        {
          id: 1,
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
          path: 'page.policyholder.additionalPolicyholder',
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
          id: 34576,
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
          id: 340933,
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
          id: 673334,
          component: '$VERIFY',
          dependencies: '',
          data: {
            extendedProperties: {
              details: [
                {
                  format: 'currency',
                  path: 'rating.totalPremium',
                  label: 'Yearly Premium'
                },
                {
                  format: 'currency',
                  path: 'coverageLimits.dwelling.amount',
                  label: 'A. Dwelling'
                },
                {
                  format: 'currency',
                  path: 'coverageLimits.otherStructures.amount',
                  label: 'B. Other Structures'
                },
                {
                  format: 'currency',
                  path: 'coverageLimits.personalProperty.amount',
                  label: 'C. Personal Property'
                },
                {
                  format: 'currency',
                  path: 'coverageLimits.lossOfUse.amount',
                  label: 'D. Loss Of Use'
                },
                {
                  format: 'currency',
                  path: 'coverageLimits.personalLiability.amount',
                  label: 'E. Personal Liability'
                },
                {
                  format: 'currency',
                  path: 'coverageLimits.medicalPayments.amount',
                  label: 'F. Medical Payments'
                },
                {
                  format: 'bool',
                  path:
                    'coverageOptions.personalPropertyReplacementCost.answer',
                  label: 'Personal Property Replacement Cost'
                },
                {
                  format: 'currency',
                  path: 'coverageLimits.moldProperty.amount',
                  label: 'Mold Property'
                },
                {
                  format: 'currency',
                  path: 'coverageLimits.moldLiability.amount',
                  label: 'Mold Liability'
                },
                {
                  format: 'currency',
                  path: 'coverageLimits.ordinanceOrLaw.calculatedAmount',
                  label: 'Ordinance or Law'
                },
                {
                  format: 'currency',
                  path: 'deductibles.allOtherPerils.amount',
                  label: 'All Other Perils Deductible'
                },
                {
                  format: 'currency',
                  path: 'deductibles.hurricane.calculatedAmount',
                  label: 'Hurricane Deductible'
                },
                {
                  format: 'currency',
                  path: 'deductibles.sinkhole.calculatedAmount',
                  label: 'Sinkhole Deductible',
                  hideNoValue: true
                }
              ],
              productDescription: 'Homeowners',
              companyName: 'TypTap'
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
