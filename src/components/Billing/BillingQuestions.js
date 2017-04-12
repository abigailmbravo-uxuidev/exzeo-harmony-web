module.exports = [{
  name: 'billTo',
  models: [
    'quote',
    'quoteModel-mark',
    'quoteModel-marco',
    'quoteModel-eshu',
    'quoteModelFinalUI',
    'quoteModel',
    'quoteModelUIVishal',
    'quoteModelFinalUIVishal',
    'quoteModelFinalUI-Giri',
    'a226ad4',
    'quoteModel-juan'
  ],
  steps: [
    'askBillPayer'
  ],
  question: 'Bill To',
  group: [
    'billing'
  ],
  order: 16,
  defaultValueLocation: 'billToType',
  answerType: 'select',
  answers: [
    {
      answer: ['Annual', 'Semi-Annual', 'Quarterly'],
      label: 'Policy Holder: (<firstName> <lastName> or <companyName>)'
    },
    {
      answer: ['Annual'],
      label: '<type>: <name1> <name2>'
    }
  ]
},
{
  name: 'billPlan',
  models: [
    'quote',
    'quoteModel-mark',
    'quoteModel-marco',
    'quoteModel-eshu',
    'quoteModelFinalUI',
    'quoteModel',
    'quoteModelUIVishal',
    'quoteModelFinalUIVishal',
    'quoteModelFinalUI-Giri',
    'a226ad4',
    'quoteModel-juan'
  ],
  steps: [
    'askBillPayer'
  ],
  question: 'Bill To',
  group: [
    'billing'
  ],
  order: 17,
  defaultValueLocation: 'billPlan',
  answerType: 'select',
  answers: [
    {
      answer: 'annual',
      label: 'Annual'
    },
    {
      answer: 'Semi-Annual',
      label: 'Annual'
    },
		 {
      answer: 'Quarterly',
      label: 'Annual'
    }
  ],
  conditional: {
    display: [
      {
        type: 'hidden',
        operator: 'in',
        trigger: true,
        parent: 'billTo'
      }
    ]
  }
}
];
