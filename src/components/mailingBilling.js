export const MOCK_UI_QUESTIONS = [
  {
    _id: '5bbba314ec85020015b7dd5a',
    __v: 0,
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
    _id: '5bbba314ec85020015b7ddc4',
    __v: 0,
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
    _id: '5bbba314ec85020015b7ddbe',
    __v: 0,
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
    _id: '5bbba314ec85020015b7dd97',
    __v: 0,
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
    _id: '5bbba314ec85020015b7ddd0',
    __v: 0,
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

export const MOCK_BILLING_OPTIONS = {
  options: [
    {
      billToType: 'Policyholder',
      billToId: '5c06d367c154cb0017d7ad27',
      displayText: 'Policyholder: BATMAN ROBIN A006',
      payPlans: [
        'Annual',
        'Semi-Annual',
        'Quarterly'
      ]
    }
  ],
  paymentPlans: {
    annual: {
      dueDate: '2019-01-03T05:00:00.000Z',
      amount: 6620
    },
    semiAnnual: {
      s1: {
        dueDate: '2019-01-03T05:00:00.000Z',
        amount: 3996
      },
      s2: {
        dueDate: '2019-07-02T04:00:00.000Z',
        amount: 2640
      }
    },
    quarterly: {
      q1: {
        dueDate: '2019-01-03T05:00:00.000Z',
        amount: 2676
      },
      q2: {
        dueDate: '2019-04-03T04:00:00.000Z',
        amount: 1322
      },
      q3: {
        dueDate: '2019-07-02T04:00:00.000Z',
        amount: 1322
      },
      q4: {
        dueDate: '2019-09-30T04:00:00.000Z',
        amount: 1322
      }
    }
  }
};
