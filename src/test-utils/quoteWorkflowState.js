export const quoteWorkflowState = {
  quoteState: {
    quote: {},
    state: {
      activeTask: 'askAdditionalCustomerData',
      variables: [],
      workflowId: '4087132',
      underwritingExceptions: [],
      uiQuestions: [],
      underwritingQuestions: [],
      isHardStop: false
    }
  },
  agencyState: {
    agencies: [],
    agency: null,
    agents: []
  },
  list: {}
};

export const underwritingList = {
  uiQuestions: {
    rented: [
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
    previousClaims: [
      {
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
    monthsOccupied: [
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
    fourPointUpdates: [
      {
        answer: 'Yes'
      },
      {
        answer: 'No'
      },
      {
        answer: 'Unknown'
      }
    ],
    floodCoverage: [
      {
        answer: 'Yes'
      },
      {
        answer: 'No'
      },
      {
        answer: 'Unsure'
      }
    ]
  },
  underwritingQuestions: [
    {
      name: 'rented',
      hidden: false,
      label: 'Is the home or any structures on the property ever rented?',
      defaultValue: '',
      validation: [
        'isRequired'
      ],
      options: [
        {
          answer: 'Yes',
          label: 'Yes'
        },
        {
          answer: 'Occasionally',
          label: 'Occasionally'
        },
        {
          answer: 'Never',
          label: 'Never'
        }
      ]
    },
    {
      name: 'previousClaims',
      hidden: false,
      label: 'When was the last claim filed?',
      defaultValue: '',
      validation: [
        'isRequired'
      ],
      options: [
        {
          answer: 'No claims ever filed',
          label: 'No claims ever filed'
        },
        {
          answer: 'Less than 3 Years',
          label: 'Less than 3 Years'
        },
        {
          answer: '3-5 Years',
          label: '3-5 Years'
        },
        {
          answer: 'Over 5 Years',
          label: 'Over 5 Years'
        },
        {
          answer: 'Unknown',
          label: 'Unknown'
        }
      ]
    },
    {
      name: 'monthsOccupied',
      hidden: false,
      label: 'How many months a year does the owner live in the home?',
      defaultValue: '',
      validation: [
        'isRequired'
      ],
      options: [
        {
          answer: '0-3',
          label: '0-3'
        },
        {
          answer: '4-6',
          label: '4-6'
        },
        {
          answer: '7-9',
          label: '7-9'
        },
        {
          answer: '10+',
          label: '10+'
        }
      ]
    },
    {
      name: 'fourPointUpdates',
      hidden: false,
      label: 'Have the wiring, plumbing, and HVAC been updated in the last 35 years?',
      defaultValue: 'Yes',
      validation: [
        'isRequired'
      ],
      options: [
        {
          answer: 'Yes',
          label: 'Yes'
        },
        {
          answer: 'No',
          label: 'No'
        },
        {
          answer: 'Unknown',
          label: 'Unknown'
        }
      ]
    },
    {
      name: 'business',
      hidden: false,
      label: 'Is a business conducted on the property?',
      defaultValue: '',
      validation: [
        'isRequired'
      ],
      options: [
        {
          answer: 'Yes',
          label: 'Yes'
        },
        {
          answer: 'No',
          label: 'No'
        }
      ]
    }
  ],
};
