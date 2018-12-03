export const MOCK_UI_QUESTIONS = [
  {
    _id: '5bbba314ec85020015b7dd2b',
    __v: 0,
    name: 'rented',
    question: 'Is the home or any structures on the property ever rented?',
    answerType: 'radio',
    order: 1,
    answers: [
      {
        answer: 'Yes'
      },
      {
        answer: 'Occasionally'
      },
      {
        answer: 'Never'
      }
    ],
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
      'askUWAnswers'
    ],
    validations: [
      'required'
    ]
  },
  {
    _id: '5bbba314ec85020015b7dd46',
    __v: 0,
    name: 'previousClaims',
    question: 'How many claims in the past 5 years?',
    answerType: 'radio',
    order: 2,
    answers: [
      {
        default: true,
        answer: '0',
        label: 'No claims in the last 5 years.'
      },
      {
        answer: '1'
      },
      {
        answer: '2'
      },
      {
        answer: '3+'
      },
      {
        answer: 'Unknown'
      }
    ],
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
      'askUWAnswers'
    ],
    validations: [
      'required'
    ]
  },
  {
    _id: '5bbba314ec85020015b7dd30',
    __v: 0,
    name: 'monthsOccupied',
    question: 'How many months a year does the owner live in the home?',
    answerType: 'radio',
    order: 3,
    answers: [
      {
        answer: '0-3'
      },
      {
        answer: '4-6'
      },
      {
        answer: '7-9'
      },
      {
        answer: '10+'
      }
    ],
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
      'askUWAnswers'
    ],
    validations: [
      'required'
    ]
  },
  {
    _id: '5bbba314ec85020015b7dd51',
    __v: 0,
    name: 'fourPointUpdates',
    question: 'Has the wiring, plumbing, HVAC, and roof been updated in the last 35 years?',
    answerType: 'radio',
    order: 4,
    answers: [
      {
        default: true,
        answer: 'Yes'
      },
      {
        answer: 'No'
      },
      {
        answer: 'Unknown'
      }
    ],
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
      'askUWAnswers'
    ],
    validations: []
  },
  {
    _id: '5bbba313ec85020015b7dd14',
    __v: 0,
    name: 'floodCoverage',
    question: 'Does this property have a separate insurance policy covering flood losses?',
    answerType: 'radio',
    order: 5,
    answers: [
      {
        answer: 'Yes'
      },
      {
        answer: 'No'
      },
      {
        answer: 'Unsure'
      }
    ],
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
      'askUWAnswers'
    ],
    validations: []
  }
];
