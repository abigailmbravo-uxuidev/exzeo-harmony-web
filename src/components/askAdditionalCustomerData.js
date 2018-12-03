
export const MOCK_ACTIVE_AGENTS = [
  {
    licenseNumber: 'W180087',
    appointed: true,
    updatedAt: '2018-12-03T09:19:43.766Z',
    secondaryPhoneNumber: null,
    state: 'FL',
    _id: '5b97e6a6968a4b75eea82592',
    agencyCode: 20000,
    emailAddress: 'test@typtap.com',
    companyCode: 'TTIC',
    primaryPhoneNumber: '3525099008',
    agentOfRecord: true,
    lastName: 'WAGONER',
    firstName: 'WALLY',
    status: 'Active',
    createdAt: '2016-02-03T14:44:06.183Z',
    createdBy: 'LOAD',
    physicalAddress: {
      address1: '3001 S.E. MARICAMP ROAD',
      zip: '34471',
      state: 'FL',
      city: 'OCALA'
    },
    agentCode: 60000,
    updatedBy: 'tticcsr',
    mailingAddress: {
      city: 'OCALA',
      zip: '34471',
      state: 'FL',
      address2: '',
      address1: '3001 S.E. MARICAMP ROAD'
    },
    faxNumber: null
  }
];

export const MOCK_ZIPCODE_SETTINGS = [
  {
    maxProtectionClass: 8,
    minYearBuilt: 1900,
    maxEffectiveDate: '2019-03-03T00:00:00-05:00',
    latitude: 29.78359,
    zip: '00005',
    state: 'FL',
    maxWaitingPeriod: 90,
    _id: '5aea142cdc0509268ca5ce85',
    maxClaims: 1,
    timezone: 'America/New_York',
    coverageLimits: {
      personalProperty: {
        maxAmount: 400000,
        minAmount: 0
      },
      personalLiability: {
        defaultAmount: 300000
      },
      dwelling: {
        maxAmount: 750000,
        maxReplacementCostRatio: 1.3,
        minAmount: 125000,
        minReplacementCostRatio: 0.9
      }
    },
    minLossRatio: 1.1,
    companyCode: 'TTIC',
    suspended: false,
    longitude: -81.26004,
    maxYearBuilt: 2016,
    coverageOptions: {
      sinkholePerilCoverage: {
        defaultAnswer: true
      },
      personalPropertyReplacementCost: {
        defaultAnswer: true
      }
    },
    id: '5aea142cdc0509268ca5ce85',
    availableSlots: 296,
    maxNetPremium: 20000,
    minNetPremium: 700,
    coastal: true,
    minCostPer100: 0.1,
    territories: [
      '533-0',
      '533-71'
    ],
    product: 'HO3',
    minEffectiveDate: '2018-12-03T00:00:00-05:00',
    minWaitingPeriod: 0
  }
];

export const MOCK_UI_QUESTIONS = [
  {
    _id: '5bbba314ec85020015b7dd87',
    __v: 0,
    order: 1,
    name: 'primaryPolicyHolder',
    question: 'Primary Policyholder',
    answerType: 'heading',
    answers: [],
    group: [
      'primaryPolicyHolder'
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
      'askAdditionalCustomerData'
    ],
    validations: []
  },
  {
    _id: '5bbba313ec85020015b7dd15',
    __v: 0,
    name: 'FirstName',
    defaultValueLocation: 'policyHolders[0].firstName',
    question: 'First Name',
    answerType: 'text',
    order: 2,
    answers: [],
    group: [
      'primaryPolicyHolder'
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
      'askAdditionalCustomerData'
    ],
    validations: [
      'required',
      'maxLength255',
      'onlyAlphaNumeric'
    ]
  },
  {
    _id: '5bbba314ec85020015b7dd45',
    __v: 0,
    defaultValueLocation: 'policyHolders[0].lastName',
    name: 'LastName',
    question: 'Last Name',
    answerType: 'text',
    order: 3,
    answers: [],
    group: [
      'primaryPolicyHolder'
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
      'askAdditionalCustomerData'
    ],
    validations: [
      'required',
      'maxLength255',
      'onlyAlphaNumeric'
    ]
  },
  {
    _id: '5bbba314ec85020015b7dd3c',
    __v: 0,
    name: 'EmailAddress',
    defaultValueLocation: 'policyHolders[0].emailAddress',
    question: 'Email Address',
    answerType: 'text',
    order: 4,
    answers: [],
    group: [
      'primaryPolicyHolder'
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
      'askAdditionalCustomerData'
    ],
    validations: [
      'email',
      'maxLength255'
    ]
  },
  {
    _id: '5bbba314ec85020015b7dd4a',
    __v: 0,
    name: 'phoneNumber',
    styleName: 'phoneNumber',
    defaultValueLocation: 'policyHolders[0].primaryPhoneNumber',
    question: 'Contact Phone',
    answerType: 'phone',
    order: 5,
    answers: [],
    group: [
      'primaryPolicyHolder'
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
      'askAdditionalCustomerData'
    ],
    validations: [
      'required',
      'phone'
    ]
  },
  {
    _id: '5bbba314ec85020015b7ddd5',
    __v: 0,
    answerType: 'bool',
    hidden: true,
    defaultValueLocation: 'policyHolders[0].electronicDelivery',
    order: 6,
    question: 'Deliver all policy documents electronically to Policyholder?',
    styleName: 'isAdditional',
    name: 'electronicDelivery',
    answers: [],
    group: [
      'primaryPolicyholder'
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
      'askAdditionalCustomerData'
    ],
    validations: []
  },
  {
    _id: '5bbba314ec85020015b7dd5d',
    __v: 0,
    answerType: 'bool',
    order: 7,
    question: 'Do you want to add an additional Policyholder?',
    styleName: 'isAdditional',
    name: 'isAdditional',
    answers: [],
    group: [
      'secondaryPolicyHolder'
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
      'askAdditionalCustomerData'
    ],
    validations: []
  },
  {
    _id: '5bbba314ec85020015b7ddb5',
    __v: 0,
    order: 8,
    name: 'secondaryPolicyHolder',
    question: 'Secondary Policyholder',
    answerType: 'heading',
    conditional: {
      display: [
        {
          parent: 'isAdditional',
          trigger: true,
          operator: 'equal',
          type: 'remove'
        }
      ]
    },
    answers: [],
    group: [
      'secondaryPolicyHolder'
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
      'askAdditionalCustomerData'
    ],
    validations: []
  },
  {
    _id: '5bbba314ec85020015b7ddc8',
    __v: 0,
    name: 'FirstName2',
    defaultValueLocation: 'policyHolders[1].firstName',
    question: 'First Name',
    answerType: 'text',
    order: 9,
    conditional: {
      display: [
        {
          parent: 'isAdditional',
          trigger: true,
          operator: 'equal',
          type: 'remove'
        }
      ]
    },
    answers: [],
    group: [
      'secondaryPolicyHolder'
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
      'askAdditionalCustomerData'
    ],
    validations: [
      'required',
      'maxLength255',
      'onlyAlphaNumeric'
    ]
  },
  {
    _id: '5bbba314ec85020015b7ddb6',
    __v: 0,
    defaultValueLocation: 'policyHolders[1].lastName',
    name: 'LastName2',
    question: 'Last Name',
    answerType: 'text',
    order: 10,
    conditional: {
      display: [
        {
          parent: 'isAdditional',
          trigger: true,
          operator: 'equal',
          type: 'remove'
        }
      ]
    },
    answers: [],
    group: [
      'secondaryPolicyHolder'
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
      'askAdditionalCustomerData'
    ],
    validations: [
      'required',
      'maxLength255',
      'onlyAlphaNumeric'
    ]
  },
  {
    _id: '5bbba314ec85020015b7dd6c',
    __v: 0,
    name: 'EmailAddress2',
    defaultValueLocation: 'policyHolders[1].emailAddress',
    question: 'Email Address',
    answerType: 'text',
    order: 11,
    conditional: {
      display: [
        {
          parent: 'isAdditional',
          trigger: true,
          operator: 'equal',
          type: 'remove'
        }
      ]
    },
    answers: [],
    group: [
      'secondaryPolicyHolder'
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
      'askAdditionalCustomerData'
    ],
    validations: [
      'email',
      'maxLength255'
    ]
  },
  {
    _id: '5bbba314ec85020015b7ddc9',
    __v: 0,
    name: 'phoneNumber2',
    styleName: 'phoneNumber2',
    defaultValueLocation: 'policyHolders[1].primaryPhoneNumber',
    question: 'Policyholder Contact Phone',
    answerType: 'phone',
    order: 12,
    conditional: {
      display: [
        {
          parent: 'isAdditional',
          trigger: true,
          operator: 'equal',
          type: 'remove'
        }
      ]
    },
    answers: [],
    group: [
      'secondaryPolicyHolder'
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
      'askAdditionalCustomerData'
    ],
    validations: [
      'required',
      'phone'
    ]
  },
  {
    _id: '5bbba314ec85020015b7dda3',
    __v: 0,
    order: 13,
    name: 'policyHolderDetails',
    question: 'Policy Details',
    answerType: 'heading',
    answers: [],
    group: [
      'policyHolderDetails'
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
      'askAdditionalCustomerData'
    ],
    validations: []
  },
  {
    _id: '5bbba314ec85020015b7dd52',
    __v: 0,
    name: 'effectiveDate',
    defaultValueLocation: 'effectiveDate',
    question: 'Effective Date',
    answerType: 'date',
    order: 15,
    answers: [],
    group: [
      'policyHolderDetails'
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
      'askAdditionalCustomerData'
    ],
    validations: [
      'required',
      'date',
      'dateCheck'
    ]
  }
];
