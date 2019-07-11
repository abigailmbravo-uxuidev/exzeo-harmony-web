import policyHolder from './policyHolder';

export const underwritingResult = [
  {
    active: true,
    answers: [
      { answer: 'Yes' },
      { answer: 'Occasionally' },
      { answer: 'Never' }
    ],
    hidden: false,
    name: 'rented',
    order: 1,
    question: 'Is the home or any structures on the property ever rented?',
    validations: ['required'],
    visible: true
  },
  {
    active: true,
    answers: [
      { answer: 'No claims ever filed' },
      { answer: 'Less than 3 Years' },
      { answer: '3-5 Years' },
      { answer: 'Over 5 Years' },
      { answer: 'Unknown' }
    ],
    hidden: false,
    name: 'previousClaims',
    order: 2,
    question: 'When was the last claim filed?',
    validations: ['required'],
    visible: true
  },
  {
    active: true,
    answers: [
      { answer: '0-3' },
      { answer: '4-6' },
      { answer: '7-9' },
      { answer: '10+' }
    ],
    hidden: false,
    name: 'monthsOccupied',
    order: 3,
    question: 'How many months a year does the owner live in the home?',
    validations: ['required'],
    visible: true
  },
  {
    active: true,
    ageOfHome: { max: 40 },
    answers: [
      { answer: 'Yes', default: true },
      { answer: 'No' },
      { answer: 'Unknown' }
    ],
    hidden: false,
    name: 'fourPointUpdates',
    order: 4,
    question:
      'Have the wiring, plumbing, and HVAC been updated in the last 35 years?',
    validations: ['required'],
    visible: true
  },
  {
    active: true,
    answers: [{ answer: 'Yes' }, { answer: 'No' }],
    hidden: false,
    name: 'business',
    order: 6,
    question: 'Is  a business conducted on the property?',
    validations: ['required'],
    visible: true
  }
];

export const mailingBillingResult = {
  options: [
    {
      billToType: 'Policyholder',
      billToId: '9876',
      displayText: 'Policyholder: Bruce Wayne',
      payPlans: ['Annual', 'Semi-Annual', 'Quarterly'],
      policyHolder
    }
  ],
  paymentPlans: {
    annual: {
      amount: 2667,
      dueDate: '2019-05-08T04:00:00.000Z'
    },
    quarterly: {
      q1: {
        amount: 1096,
        dueDate: '2019-05-08T04:00:00.000Z'
      },
      q2: {
        amount: 531,
        dueDate: '2019-08-06T04:00:00.000Z'
      },
      q3: {
        amount: 531,
        dueDate: '2019-11-04T05:00:00.000Z'
      },
      q4: {
        amount: 531,
        dueDate: '2020-02-02T05:00:00.000Z'
      }
    },
    semiAnnual: {
      s1: {
        amount: 1624,
        dueDate: '2019-05-08T04:00:00.000Z'
      },
      s2: {
        amount: 1059,
        dueDate: '2019-11-04T05:00:00.000Z'
      }
    }
  }
};
