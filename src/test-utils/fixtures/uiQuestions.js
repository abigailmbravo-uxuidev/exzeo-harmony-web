export const customizeUiQuestions = [
  {
    order: 1,
    name: 'coverageLimits',
    question: 'Coverage Limits',
    answerType: 'heading',
    answers: [],
    group: [
      'coverageLimits'
    ],
    models: [
      'quote'
    ],
    product: [
      'HO3'
    ],
    state: [
      'FL'
    ],
    companyId: [
      'TTIC'
    ],
    steps: [
      'askToCustomizeDefaultQuote'
    ],
    validations: []
  },
  {
    name: 'dwellingAmount',
    question: 'Dwelling Limit',
    order: 2,
    defaultValueLocation: 'coverageLimits.dwelling.amount',
    answerType: 'slider',
    conditional: {
      slider: {
        maxLocation: 'coverageLimits.dwelling.maxAmount',
        minLocation: 'coverageLimits.dwelling.minAmount'
      }
    },
    description: 'This is the dollar amount of coverage for the structure of your home. This amount should represent the total cost to rebuild your home to its current state in the event of a loss. If you have a Declarations Page from your current  policy it may be listed as Coverage A.  (Based on basic information of your home, we provide you a guide for a recommended value. You can move this number up or down based on more detailed information. For example, if you have an upgraded kitchen and bathroom, you may want to increase this number to ensure that you have adequate coverage in the event of a loss.)  ',
    answers: [],
    group: [
      'coverageLimits'
    ],
    models: [
      'quote'
    ],
    product: [
      'HO3'
    ],
    state: [
      'FL'
    ],
    companyId: [
      'TTIC'
    ],
    steps: [
      'askToCustomizeDefaultQuote'
    ],
    validations: [
      'dwellingRange'
    ]
  },
  {
    name: 'otherStructuresAmount',
    order: 3,
    question: 'Other Structures Limit',
    answerFormat: 'currency',
    defaultValueLocation: 'coverageLimits.otherStructures.amount',
    answerType: 'radio',
    conditional: {
      dependency: {
        parent: 'dwellingAmount',
        type: 'percent'
      }
    },
    description: 'This is the dollar amount of coverage for the other structures on your property not attached to your home. This might include a fence, shed, or unattached garage. If you have a Declarations Page from your current  policy it may be listed as Coverage B.',
    answers: [
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
    group: [
      'coverageLimits'
    ],
    models: [
      'quote'
    ],
    product: [
      'HO3'
    ],
    state: [
      'FL'
    ],
    companyId: [
      'TTIC'
    ],
    steps: [
      'askToCustomizeDefaultQuote'
    ],
    validations: []
  },
  {
    name: 'personalPropertyAmount',
    defaultValueLocation: 'coverageLimits.personalProperty.amount',
    question: 'Personal Property Limit',
    order: 4,
    answerType: 'radio',
    answerFormat: 'currency',
    conditional: {
      dependency: {
        parent: 'dwellingAmount',
        type: 'percent'
      }
    },
    description: 'This is your personal belongings, or items located inside the home. This could include your furniture, clothing, bedding, dishes, etc. If you choose to have replacement cost coverage on Personal Property, you will be required to carry Personal Property limits at a minimum of 25% of your Dwelling limit.',
    answers: [
      {
        label: '0%',
        answer: 0
      },
      {
        label: '25%',
        answer: 25
      },
      {
        label: '35%',
        answer: 35
      },
      {
        label: '50%',
        answer: 50
      }
    ],
    group: [
      'coverageLimits'
    ],
    models: [
      'quote'
    ],
    product: [
      'HO3'
    ],
    state: [
      'FL'
    ],
    companyId: [
      'TTIC'
    ],
    steps: [
      'askToCustomizeDefaultQuote'
    ],
    validations: []
  },
  {
    name: 'personalPropertyReplacementCostCoverage',
    question: 'Do you want Personal Property Replacement Cost Coverage?',
    order: 5,
    answerType: 'bool',
    defaultValueLocation: 'coverageOptions.personalPropertyReplacementCost.answer',
    conditional: {
      display: [
        {
          parent: 'personalPropertyAmount',
          trigger: '0',
          operator: 'greaterThan',
          type: 'hidden'
        }
      ]
    },
    description: 'Replacement Cost Coverage replaces your damaged possessions at today\'s prices without deducting for depreciation. If you choose not to select this coverage, your loss for personal property will be paid out at Actual Cash Value.',
    answers: [],
    group: [
      'coverageLimits'
    ],
    models: [
      'quote'
    ],
    product: [
      'HO3'
    ],
    state: [
      'FL'
    ],
    companyId: [
      'TTIC'
    ],
    steps: [
      'askToCustomizeDefaultQuote'
    ],
    validations: []
  },
  {
    name: 'lossOfUseAmount',
    question: 'Loss of Use Limit',
    defaultValueLocation: 'coverageLimits.lossOfUse.amount',
    order: 6,
    answerType: 'display',
    conditional: {
      value: {
        value: 10,
        parent: 'dwellingAmount',
        type: 'percent'
      }
    },
    answers: [],
    group: [
      'coverageLimits'
    ],
    models: [
      'quote'
    ],
    product: [
      'HO3'
    ],
    state: [
      'FL'
    ],
    companyId: [
      'TTIC'
    ],
    steps: [
      'askToCustomizeDefaultQuote'
    ],
    validations: []
  },
  {
    name: 'personalLiability',
    question: 'Personal Liability Limit',
    defaultValueLocation: 'coverageLimits.personalLiability.amount',
    order: 7,
    answerType: 'radio',
    answers: [
      {
        label: '$ 100,000',
        answer: 100000
      },
      {
        label: '$ 300,000',
        answer: 300000
      }
    ],
    group: [
      'coverageLimits'
    ],
    models: [
      'quote'
    ],
    product: [
      'HO3'
    ],
    state: [
      'FL'
    ],
    companyId: [
      'TTIC'
    ],
    steps: [
      'askToCustomizeDefaultQuote'
    ],
    validations: []
  },
  {
    name: 'medicalPayments',
    defaultValueLocation: 'coverageLimits.medicalPayments.amount',
    question: 'Medical Payments to Others',
    answerType: 'display',
    order: 8,
    answers: [],
    group: [
      'coverageLimits'
    ],
    models: [
      'quote'
    ],
    product: [
      'HO3'
    ],
    state: [
      'FL'
    ],
    companyId: [
      'TTIC'
    ],
    steps: [
      'askToCustomizeDefaultQuote'
    ],
    validations: []
  },
  {
    name: 'moldProperty',
    question: 'Limited Fungi, Wet or Dry Rot, Yeast or Bacteria Coverage - Property',
    order: 9,
    defaultValueLocation: 'coverageLimits.moldProperty.amount',
    answerType: 'radio',
    answers: [
      {
        label: '$ 10,000',
        answer: 10000
      },
      {
        label: '$ 25,000',
        answer: 25000
      },
      {
        label: '$ 50,000',
        answer: 50000
      }
    ],
    group: [
      'coverageLimits'
    ],
    models: [
      'quote'
    ],
    product: [
      'HO3'
    ],
    state: [
      'FL'
    ],
    companyId: [
      'TTIC'
    ],
    steps: [
      'askToCustomizeDefaultQuote'
    ],
    validations: []
  },
  {
    question: 'Limited Fungi, Wet or Dry Rot, Yeast or Bacteria Coverage - Liability',
    name: 'moldLiability',
    defaultValueLocation: 'coverageLimits.moldLiability.amount',
    answerType: 'radio',
    order: 10,
    answers: [
      {
        label: '$ 50,000',
        answer: 50000
      },
      {
        label: '$ 100,000',
        answer: 100000
      }
    ],
    group: [
      'coverageLimits'
    ],
    models: [
      'quote'
    ],
    product: [
      'HO3'
    ],
    state: [
      'FL'
    ],
    companyId: [
      'TTIC'
    ],
    steps: [
      'askToCustomizeDefaultQuote'
    ],
    validations: []
  },
  {
    name: 'ordinanceOrLaw',
    question: 'Ordinance or Law Coverage Limit',
    defaultValueLocation: 'coverageLimits.ordinanceOrLaw.amount',
    order: 11,
    answerType: 'radio',
    answers: [
      {
        label: '25% of Dwelling Limit',
        answer: 25
      },
      {
        label: '50% of Dwelling Limit',
        answer: 50
      }
    ],
    group: [
      'coverageLimits'
    ],
    models: [
      'quote'
    ],
    product: [
      'HO3'
    ],
    state: [
      'FL'
    ],
    companyId: [
      'TTIC'
    ],
    steps: [
      'askToCustomizeDefaultQuote'
    ],
    validations: []
  },
  {
    order: 12,
    name: 'coverageOptions',
    question: 'Coverage Options',
    answerType: 'heading',
    answers: [],
    group: [
      'coverageOptions'
    ],
    models: [
      'quote'
    ],
    product: [
      'HO3'
    ],
    state: [
      'FL'
    ],
    companyId: [
      'TTIC'
    ],
    steps: [
      'askToCustomizeDefaultQuote'
    ],
    validations: []
  },
  {
    name: 'propertyIncidentalOccupancies',
    question: 'Property Permitted Incidental Occupancies',
    order: 13,
    hidden: true,
    defaultAnswer: 'None',
    answerType: 'radio',
    answers: [
      {
        answer: 'Main Dwelling'
      },
      {
        answer: 'Other Structures'
      },
      {
        answer: 'None'
      }
    ],
    group: [
      'coverageOptions'
    ],
    models: [
      'quote'
    ],
    product: [
      'HO3'
    ],
    state: [
      'FL'
    ],
    companyId: [
      'TTIC'
    ],
    steps: [
      'askToCustomizeDefaultQuote'
    ],
    validations: []
  },
  {
    name: 'sinkholePerilCoverage',
    defaultValueLocation: 'coverageOptions.sinkholePerilCoverage.answer',
    question: 'Do you want Sinkhole Loss Coverage?',
    order: 14,
    answerType: 'bool',
    answers: [],
    group: [
      'coverageOptions'
    ],
    models: [
      'quote'
    ],
    product: [
      'HO3'
    ],
    state: [
      'FL'
    ],
    companyId: [
      'TTIC'
    ],
    steps: [
      'askToCustomizeDefaultQuote'
    ],
    validations: []
  },
  {
    order: 15,
    name: 'deductibles',
    question: 'Deductibles',
    answerType: 'heading',
    answers: [],
    group: [
      'deductibles'
    ],
    models: [
      'quote'
    ],
    product: [
      'HO3'
    ],
    state: [
      'FL'
    ],
    companyId: [
      'TTIC'
    ],
    steps: [
      'askToCustomizeDefaultQuote'
    ],
    validations: []
  },
  {
    name: 'allOtherPerils',
    question: 'All Other Perils Deductible',
    defaultValueLocation: 'deductibles.allOtherPerils.amount',
    order: 16,
    answerType: 'radio',
    answers: [
      {
        label: '$ 500',
        answer: 500
      },
      {
        label: '$ 1,000',
        answer: 1000
      },
      {
        label: '$ 2,500',
        answer: 2500
      }
    ],
    group: [
      'deductibles'
    ],
    models: [
      'quote'
    ],
    product: [
      'HO3'
    ],
    state: [
      'FL'
    ],
    companyId: [
      'TTIC'
    ],
    steps: [
      'askToCustomizeDefaultQuote'
    ],
    validations: []
  },
  {
    name: 'hurricane',
    question: 'Hurricane Deductible',
    order: 17,
    defaultValueLocation: 'deductibles.hurricane.amount',
    answerType: 'radio',
    answerFormat: 'currency',
    conditional: {
      dependency: {
        parent: 'dwellingAmount',
        type: 'percent'
      }
    },
    answers: [
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
    group: [
      'deductibles'
    ],
    models: [
      'quote'
    ],
    product: [
      'HO3'
    ],
    state: [
      'FL'
    ],
    companyId: [
      'TTIC'
    ],
    steps: [
      'askToCustomizeDefaultQuote'
    ],
    validations: []
  },
  {
    name: 'sinkhole',
    question: 'Sinkhole Deductible',
    order: 18,
    defaultAnswer: '10',
    answerType: 'radio',
    answerFormat: 'currency',
    conditional: {
      display: [
        {
          parent: 'sinkholePerilCoverage',
          trigger: true,
          operator: 'equal',
          type: 'hidden'
        }
      ],
      dependency: {
        parent: 'dwellingAmount',
        type: 'percent'
      }
    },
    answers: [
      {
        answer: 10,
        label: '10% of Dwelling Limit'
      }
    ],
    group: [
      'deductibles'
    ],
    models: [
      'quote'
    ],
    product: [
      'HO3'
    ],
    state: [
      'FL'
    ],
    companyId: [
      'TTIC'
    ],
    steps: [
      'askToCustomizeDefaultQuote'
    ],
    validations: []
  },
  {
    name: 'windMitigation',
    question: 'Wind Mitigation',
    answerType: 'heading',
    order: 30,
    answers: [],
    group: [
      'windMitigation'
    ],
    models: [
      'quote'
    ],
    product: [
      'HO3'
    ],
    state: [
      'FL'
    ],
    companyId: [
      'TTIC'
    ],
    steps: [
      'askToCustomizeDefaultQuote'
    ],
    validations: []
  },
  {
    name: 'roofCovering',
    question: 'Roof Covering:',
    answerType: 'radio',
    defaultValueLocation: 'property.windMitigation.roofCovering',
    order: 31,
    answers: [
      {
        answer: 'Non-FBC'
      },
      {
        answer: 'FBC'
      },
      {
        answer: 'Other'
      }
    ],
    group: [
      'windMitigation'
    ],
    models: [
      'quote'
    ],
    product: [
      'HO3'
    ],
    state: [
      'FL'
    ],
    companyId: [
      'TTIC'
    ],
    steps: [
      'askToCustomizeDefaultQuote'
    ],
    validations: []
  },
  {
    name: 'roofDeckAttachment',
    question: 'Roof Deck Attachment:',
    answerType: 'radio',
    defaultValueLocation: 'property.windMitigation.roofDeckAttachment',
    order: 32,
    answers: [
      {
        answer: 'A'
      },
      {
        answer: 'B'
      },
      {
        answer: 'C'
      },
      {
        answer: 'D'
      },
      {
        answer: 'Concrete'
      },
      {
        answer: 'Other'
      }
    ],
    group: [
      'windMitigation'
    ],
    models: [
      'quote'
    ],
    product: [
      'HO3'
    ],
    state: [
      'FL'
    ],
    companyId: [
      'TTIC'
    ],
    steps: [
      'askToCustomizeDefaultQuote'
    ],
    validations: []
  },
  {
    name: 'roofToWallConnection',
    question: 'Roof to Wall Attachment:',
    answerType: 'radio',
    defaultValueLocation: 'property.windMitigation.roofToWallConnection',
    order: 33,
    answers: [
      {
        answer: 'Toe Nails'
      },
      {
        answer: 'Clips'
      },
      {
        answer: 'Single Wraps'
      },
      {
        answer: 'Double Wraps'
      },
      {
        answer: 'Other'
      }
    ],
    group: [
      'windMitigation'
    ],
    models: [
      'quote'
    ],
    product: [
      'HO3'
    ],
    state: [
      'FL'
    ],
    companyId: [
      'TTIC'
    ],
    steps: [
      'askToCustomizeDefaultQuote'
    ],
    validations: []
  },
  {
    name: 'roofGeometry',
    question: 'Roof Geometry:',
    answerType: 'radio',
    defaultValueLocation: 'property.windMitigation.roofGeometry',
    order: 34,
    answers: [
      {
        answer: 'Flat'
      },
      {
        answer: 'Gable'
      },
      {
        answer: 'Hip'
      },
      {
        answer: 'Other'
      }
    ],
    group: [
      'windMitigation'
    ],
    models: [
      'quote'
    ],
    product: [
      'HO3'
    ],
    state: [
      'FL'
    ],
    companyId: [
      'TTIC'
    ],
    steps: [
      'askToCustomizeDefaultQuote'
    ],
    validations: []
  },
  {
    name: 'secondaryWaterResistance',
    question: 'Secondary Water Resistance (SWR):',
    answerType: 'radio',
    defaultValueLocation: 'property.windMitigation.secondaryWaterResistance',
    order: 35,
    answers: [
      {
        answer: 'Yes'
      },
      {
        answer: 'No'
      },
      {
        answer: 'Other'
      }
    ],
    group: [
      'windMitigation'
    ],
    models: [
      'quote'
    ],
    product: [
      'HO3'
    ],
    state: [
      'FL'
    ],
    companyId: [
      'TTIC'
    ],
    steps: [
      'askToCustomizeDefaultQuote'
    ],
    validations: []
  },
  {
    name: 'openingProtection',
    question: 'Opening Protection:',
    answerType: 'radio',
    defaultValueLocation: 'property.windMitigation.openingProtection',
    order: 36,
    answers: [
      {
        answer: 'None'
      },
      {
        answer: 'Basic'
      },
      {
        answer: 'Hurricane'
      },
      {
        answer: 'Other'
      }
    ],
    group: [
      'windMitigation'
    ],
    models: [
      'quote'
    ],
    product: [
      'HO3'
    ],
    state: [
      'FL'
    ],
    companyId: [
      'TTIC'
    ],
    steps: [
      'askToCustomizeDefaultQuote'
    ],
    validations: []
  },
  {
    name: 'floridaBuildingCodeWindSpeed',
    question: 'What is the FBC wind speed for this property?',
    answerType: 'number',
    defaultValueLocation: 'property.windMitigation.floridaBuildingCodeWindSpeed',
    order: 37,
    hidden: true,
    answers: [],
    group: [
      'windMitigation'
    ],
    models: [
      'quote'
    ],
    product: [
      'HO3'
    ],
    state: [
      'FL'
    ],
    companyId: [
      'TTIC'
    ],
    steps: [
      'askToCustomizeDefaultQuote'
    ],
    validations: []
  },
  {
    name: 'floridaBuildingCodeWindSpeedDesign',
    question: 'What is the FBC wind speed design for this property?',
    answerType: 'number',
    defaultValueLocation: 'property.windMitigation.floridaBuildingCodeWindSpeedDesign',
    order: 38,
    hidden: true,
    answers: [],
    group: [
      'windMitigation'
    ],
    models: [
      'quote'
    ],
    product: [
      'HO3'
    ],
    state: [
      'FL'
    ],
    companyId: [
      'TTIC'
    ],
    steps: [
      'askToCustomizeDefaultQuote'
    ],
    validations: []
  },
  {
    name: 'windBorneDebrisRegion',
    question: 'Is the property in the wind borne debris region?',
    answerType: 'radio',
    defaultValueLocation: 'property.windMitigation.windBorneDebrisRegion',
    order: 39,
    hidden: true,
    answers: [
      {
        answer: 'Yes'
      },
      {
        answer: 'No'
      },
      {
        answer: 'Other'
      }
    ],
    group: [
      'windMitigation'
    ],
    models: [
      'quote'
    ],
    product: [
      'HO3'
    ],
    state: [
      'FL'
    ],
    companyId: [
      'TTIC'
    ],
    steps: [
      'askToCustomizeDefaultQuote'
    ],
    validations: []
  },
  {
    name: 'internalPressureDesign',
    question: 'Internal Pressure Design',
    answerType: 'radio',
    defaultValueLocation: 'property.windMitigation.internalPressureDesign',
    order: 40,
    hidden: true,
    answers: [
      {
        answer: 'Enclosed'
      },
      {
        answer: 'Partial'
      },
      {
        answer: 'Other'
      }
    ],
    group: [
      'windMitigation'
    ],
    models: [
      'quote'
    ],
    product: [
      'HO3'
    ],
    state: [
      'FL'
    ],
    companyId: [
      'TTIC'
    ],
    steps: [
      'askToCustomizeDefaultQuote'
    ],
    validations: []
  },
  {
    name: 'terrain',
    question: 'What terrain is the property located in?',
    answerType: 'radio',
    defaultValueLocation: 'property.windMitigation.terrain',
    order: 41,
    hidden: true,
    answers: [
      {
        answer: 'B'
      },
      {
        answer: 'C'
      },
      {
        answer: 'HVHZ'
      },
      {
        answer: 'Other'
      }
    ],
    group: [
      'windMitigation'
    ],
    models: [
      'quote'
    ],
    product: [
      'HO3'
    ],
    state: [
      'FL'
    ],
    companyId: [
      'TTIC'
    ],
    steps: [
      'askToCustomizeDefaultQuote'
    ],
    validations: []
  },
  {
    name: 'discounts',
    question: 'Discounts',
    answerType: 'heading',
    order: 50,
    answers: [],
    group: [
      'discounts'
    ],
    models: [
      'quote'
    ],
    product: [
      'HO3'
    ],
    state: [
      'FL'
    ],
    companyId: [
      'TTIC'
    ],
    steps: [
      'askToCustomizeDefaultQuote'
    ],
    validations: []
  },
  {
    name: 'burglarAlarm',
    question: 'Does the property have a burglar alarm?',
    answerType: 'bool',
    defaultValueLocation: 'property.burglarAlarm',
    order: 51,
    answers: [],
    group: [
      'discounts'
    ],
    models: [
      'quote'
    ],
    product: [
      'HO3'
    ],
    state: [
      'FL'
    ],
    companyId: [
      'TTIC'
    ],
    steps: [
      'askToCustomizeDefaultQuote'
    ],
    validations: []
  },
  {
    name: 'fireAlarm',
    question: 'Does the property have a fire alarm?',
    answerType: 'bool',
    defaultValueLocation: 'property.fireAlarm',
    order: 52,
    answers: [],
    group: [
      'discounts'
    ],
    models: [
      'quote'
    ],
    product: [
      'HO3'
    ],
    state: [
      'FL'
    ],
    companyId: [
      'TTIC'
    ],
    steps: [
      'askToCustomizeDefaultQuote'
    ],
    validations: []
  },
  {
    name: 'sprinkler',
    question: 'Sprinkler',
    answerType: 'radio',
    defaultValueLocation: 'property.sprinkler',
    order: 53,
    answers: [
      {
        answer: 'N'
      },
      {
        answer: 'A'
      },
      {
        answer: 'B'
      }
    ],
    group: [
      'discounts'
    ],
    models: [
      'quote'
    ],
    product: [
      'HO3'
    ],
    state: [
      'FL'
    ],
    companyId: [
      'TTIC'
    ],
    steps: [
      'askToCustomizeDefaultQuote'
    ],
    validations: []
  }
];

export const mailingBillingUiQuestions = [
  {
    answerType: 'text',
    question: 'Address 1',
    styleName: 'address1',
    name: 'address1',
    physicalAddressLocation: 'property.physicalAddress.address1',
    defaultValueLocation: 'policyHolderMailingAddress.address1',
    order: 1,
    answers: [],
    group: [],
    models: [
      'quote'
    ],
    product: [
      'HO3'
    ],
    state: [
      'FL'
    ],
    companyId: [
      'TTIC'
    ],
    steps: [
      'askAdditionalQuestions'
    ],
    validations: [
      'required'
    ]
  },
  {
    answerType: 'text',
    question: 'Address 2',
    styleName: 'address2',
    name: 'address2',
    physicalAddressLocation: 'property.physicalAddress.address2',
    defaultValueLocation: 'policyHolderMailingAddress.address2',
    order: 2,
    answers: [],
    group: [],
    models: [
      'quote'
    ],
    product: [
      'HO3'
    ],
    state: [
      'FL'
    ],
    companyId: [
      'TTIC'
    ],
    steps: [
      'askAdditionalQuestions'
    ],
    validations: []
  },
  {
    answerType: 'text',
    question: 'City',
    styleName: 'city',
    name: 'city',
    physicalAddressLocation: 'property.physicalAddress.city',
    defaultValueLocation: 'policyHolderMailingAddress.city',
    order: 3,
    answers: [],
    group: [],
    models: [
      'quote'
    ],
    product: [
      'HO3'
    ],
    state: [
      'FL'
    ],
    companyId: [
      'TTIC'
    ],
    steps: [
      'askAdditionalQuestions'
    ],
    validations: [
      'required'
    ]
  },
  {
    answerType: 'text',
    question: 'State',
    styleName: 'State',
    name: 'state',
    physicalAddressLocation: 'property.physicalAddress.state',
    defaultValueLocation: 'policyHolderMailingAddress.state',
    order: 4,
    answers: [],
    group: [],
    models: [
      'quote'
    ],
    product: [
      'HO3'
    ],
    state: [
      'FL'
    ],
    companyId: [
      'TTIC'
    ],
    steps: [
      'askAdditionalQuestions'
    ],
    validations: [
      'required',
      'maxLength2OnlyAlpha'
    ]
  },
  {
    answerType: 'text',
    question: 'Zip',
    styleName: 'zip',
    name: 'zip',
    physicalAddressLocation: 'property.physicalAddress.zip',
    defaultValueLocation: 'policyHolderMailingAddress.zip',
    order: 5,
    answers: [],
    group: [],
    models: [
      'quote'
    ],
    product: [
      'HO3'
    ],
    state: [
      'FL'
    ],
    companyId: [
      'TTIC'
    ],
    steps: [
      'askAdditionalQuestions'
    ],
    validations: [
      'required',
      'maxLength8AlphaNumeric'
    ]
  }
];
