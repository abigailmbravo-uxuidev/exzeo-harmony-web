export const MOCK_UI_QUESTIONS = [
  {
    _id: '5bbba313ec85020015b7dd13',
    __v: 0,
    answerType: 'bool',
    sort: 1,
    question: 'Do you want to add a Mortgagee?',
    styleName: 'isAdditional',
    defaultValue: 'true',
    name: 'isAdditional',
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
      'askMortgagee'
    ],
    validations: []
  },
  {
    _id: '5bbba314ec85020015b7dd9e',
    __v: 0,
    answerType: 'bool',
    sort: 10,
    question: 'Do you want to add second Mortgagee?',
    styleName: 'isAdditional2',
    name: 'isAdditional2',
    conditional: {
      display: [
        {
          parent: 'isAdditional',
          trigger: true,
          operator: 'equal',
          type: 'disabled'
        }
      ]
    },
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
      'askMortgagee'
    ],
    validations: []
  },
  {
    _id: '5bbba314ec85020015b7ddd2',
    __v: 0,
    name: 'mortgagee',
    question: 'Mortgagee',
    answerType: 'radio',
    answers: [
      {
        ID: 1,
        AICountry: 'NULL',
        AIZip: 45501,
        AIState: 'OH',
        AICity: 'SPRINGFIELD',
        AIAddress1: 'PO BOX 5106',
        AIName2: 'COMPANY, ISAOA',
        AIName1: "AMERICA'S SERVICING"
      },
      {
        ID: 2,
        AICountry: 'NULL',
        AIZip: 76161,
        AIState: 'TX',
        AICity: 'FORT WORTH',
        AIAddress1: 'PO BOX 961291',
        AIName2: 'ISAOA/ATIMA',
        AIName1: 'BANK OF AMERICA, NA'
      },
      {
        ID: 3,
        AICountry: 'NULL',
        AIZip: 45501,
        AIState: 'OH',
        AICity: 'SPRINGFIELD',
        AIAddress1: 'PO BOX 5954',
        AIName2: 'ISAOA/ATIMA',
        AIName1: 'BANK OF AMERICA, NA'
      },
      {
        ID: 4,
        AICountry: 'NULL',
        AIZip: 48007,
        AIState: 'MI',
        AICity: 'TROY',
        AIAddress1: 'PO BOX 5940',
        AIName2: 'ISAOA/ATIMA',
        AIName1: 'BANK UNITED, N.A.'
      },
      {
        ID: 5,
        AICountry: 'NULL',
        AIZip: 45501,
        AIState: 'OH',
        AICity: 'SPRINGFIELD',
        AIAddress1: 'PO BOX 7933',
        AIName2: 'ISAOA',
        AIName1: 'BB&T COMPANY'
      },
      {
        ID: 5,
        AICountry: 'NULL',
        AIZip: 30156,
        AIState: 'GA',
        AICity: 'KENNESAW',
        AIAddress1: 'PO BOX 200047',
        AIName2: 'ISAOA',
        AIName1: 'BB&T INSURANCE CENTER'
      },
      {
        ID: 7,
        AICountry: 'NULL',
        AIZip: 29502,
        AIState: 'SC',
        AICity: 'FLORENCE',
        AIAddress1: 'PO BOX 202028',
        AIName2: 'ISAOA/ATIMA',
        AIName1: 'CENLAR FSB C/O CENLAR'
      },
      {
        ID: 8,
        AICountry: 'NULL',
        AIZip: 78269,
        AIState: 'TX',
        AICity: 'SAN ANTONIO',
        AIAddress1: 'PO BOX 692399',
        AIName2: 'ISAOA',
        AIName1: 'CHAMPION MORTGAGE'
      },
      {
        ID: 9,
        AICountry: 'NULL',
        AIZip: 45501,
        AIState: 'OH',
        AICity: 'SPRINGFIELD',
        AIAddress1: 'PO BOX 7807',
        AIName2: 'ISAOA',
        AIName1: 'CITIBANK, NA'
      },
      {
        ID: 10,
        AICountry: 'NULL',
        AIZip: 45501,
        AIState: 'OH',
        AICity: 'SPRINGFIELD',
        AIAddress1: 'PO BOX 7706',
        AIName2: 'ISAOA',
        AIName1: 'CITIMORTGAGE, INC'
      },
      {
        ID: 11,
        AICountry: 'NULL',
        AIZip: 33197,
        AIState: 'FL',
        AICity: 'MIAMI',
        AIAddress1: 'PO BOX 979282',
        AIName2: 'IAAOA',
        AIName1: 'DITECH FINANCIAL LLC'
      },
      {
        ID: 12,
        AICountry: 'NULL',
        AIZip: 29502,
        AIState: 'SC',
        AICity: 'FLORENCE',
        AIAddress1: 'PO BOX 202028',
        AIName2: 'ISAOA/ATIMA',
        AIName1: 'GTE FEDERAL CREDIT UNION'
      },
      {
        ID: 13,
        AICountry: 'NULL',
        AIZip: 48007,
        AIState: 'MI',
        AICity: 'TROY',
        AIAddress1: 'PO BOX 5013',
        AIName2: 'ISAOA',
        AIName1: 'GUARANTEE BANK'
      },
      {
        ID: 14,
        AICountry: 'NULL',
        AIZip: 30362,
        AIState: 'GA',
        AICity: 'DORAVILLE',
        AIAddress1: 'PO BOX 47207',
        AIName2: 'ISAOA',
        AIName1: 'HSBC MORTGAGE SERVICES'
      },
      {
        ID: 15,
        AICountry: 'NULL',
        AIZip: 29502,
        AIState: 'SC',
        AICity: 'FLORENCE',
        AIAddress1: 'PO BOX 100564',
        AIName2: 'ISAOA',
        AIName1: 'JP MORGAN CHASE BANK, NA'
      },
      {
        ID: 16,
        AICountry: 'NULL',
        AIZip: 30362,
        AIState: 'GA',
        AICity: 'ATLANTA',
        AIAddress1: 'PO BOX 47208',
        AIName2: 'ISAOA',
        AIName1: 'JP MORGAN CHASE BANK, NA'
      },
      {
        ID: 17,
        AICountry: 'NULL',
        AIZip: 30362,
        AIState: 'GA',
        AICity: 'ATLANTA',
        AIAddress1: 'PO BOX 47020',
        AIName2: 'ISAOA',
        AIName1: 'JP MORGAN CHASE BANK, NA'
      },
      {
        ID: 18,
        AICountry: 'NULL',
        AIZip: 76161,
        AIState: 'TX',
        AICity: 'FORT WORTH',
        AIAddress1: 'PO BOX 163529',
        AIName2: 'ISAOA',
        AIName1: 'MIDLAND MORTGAGE COMPANY'
      },
      {
        ID: 19,
        AICountry: 'NULL',
        AIZip: 45501,
        AIState: 'OH',
        AICity: 'SPRINGFIELD',
        AIAddress1: 'PO BOX 7729',
        AIName2: 'ISAOA/ATIMA',
        AIName1: 'NATIONSTAR MORTGAGE, LLC'
      },
      {
        ID: 20,
        AICountry: 'NULL',
        AIZip: 29502,
        AIState: 'SC',
        AICity: 'FLORENCE',
        AIAddress1: 'PO BOX 100598',
        AIName2: 'UNION, ISAOA',
        AIName1: 'NAVY FEDERAL CREDIT'
      },
      {
        ID: 22,
        AICountry: 'NULL',
        AIZip: 45501,
        AIState: 'OH',
        AICity: 'SPRINGFIELD',
        AIAddress1: 'PO BOX 6723',
        AIName2: 'ISAOA',
        AIName1: 'OCWEN LOAN SERVICING LLC'
      },
      {
        ID: 23,
        AICountry: 'NULL',
        AIZip: 45501,
        AIState: 'OH',
        AICity: 'SPRINGFIELD',
        AIAddress1: 'PO BOX 6618',
        AIName2: 'SERVICES LLC, ISAOA',
        AIName1: 'PENNYMAC LOAN'
      },
      {
        ID: 24,
        AICountry: 'NULL',
        AIZip: 45501,
        AIState: 'OH',
        AICity: 'SPRINGFIELD',
        AIAddress1: 'PO BOX 5954',
        AIName2: 'ISAOA',
        AIName1: 'PHH MORTGAGE SERVICES'
      },
      {
        ID: 25,
        AICountry: 'NULL',
        AIZip: 45501,
        AIState: 'OH',
        AICity: 'SPRINGFIELD',
        AIAddress1: 'PO BOX 7433',
        AIName2: 'ISAOA/ATIMA',
        AIName1: 'PNC BANK, NA'
      },
      {
        ID: 27,
        AICountry: 'NULL',
        AIZip: 29502,
        AIState: 'SC',
        AICity: 'FLORENCE',
        AIAddress1: 'PO BOX 202070',
        AIName2: 'ISAOA',
        AIName1: 'QUICKEN LOANS, INC'
      },
      {
        ID: 28,
        AICountry: 'NULL',
        AIZip: 76161,
        AIState: 'TX',
        AICity: 'FORT WORTH',
        AIAddress1: 'PO BOX 961292',
        AIName2: 'ISAOA',
        AIName1: 'RAYMOND JAMES BANK, NA'
      },
      {
        ID: 29,
        AICountry: 'NULL',
        AIZip: 76161,
        AIState: 'TX',
        AICity: 'FORT WORTH',
        AIAddress1: 'PO BOX 163169',
        AIName2: 'ISAOA',
        AIName1: 'REGIONS BANK'
      },
      {
        ID: 30,
        AICountry: 'NULL',
        AIZip: 29502,
        AIState: 'SC',
        AICity: 'FLORENCE',
        AIAddress1: 'PO BOX 200401',
        AIName2: 'REGIONS MORTGAGE, ISAOA',
        AIName1: 'REGIONS BANK DBA'
      },
      {
        ID: 31,
        AICountry: 'NULL',
        AIZip: 78269,
        AIState: 'TX',
        AICity: 'SAN ANTONIO',
        AIAddress1: 'PO BOX 690230',
        AIName2: 'SERVICES, INC, ISAOA',
        AIName1: 'REVERSE MORTGAGE'
      },
      {
        ID: 32,
        AICountry: 'NULL',
        AIZip: 45501,
        AIState: 'OH',
        AICity: 'SPRINGFIELD',
        AIAddress1: 'PO BOX 7277',
        AIName2: 'SERVICING, INC, ISAOA',
        AIName1: 'SELECT PORTFOLIO'
      },
      {
        ID: 33,
        AICountry: 'NULL',
        AIZip: 29502,
        AIState: 'SC',
        AICity: 'FLORENCE',
        AIAddress1: 'PO BOX 100541',
        AIName2: 'ISAOA',
        AIName1: 'SELENE FINANCE'
      },
      {
        ID: 34,
        AICountry: 'NULL',
        AIZip: 98009,
        AIState: 'WA',
        AICity: 'BELLEVUE',
        AIAddress1: 'PO BOX 99591',
        AIName2: 'SERVICING, LLC, ISAOA',
        AIName1: 'SENECA MORTGAGE'
      },
      {
        ID: 35,
        AICountry: 'NULL',
        AIZip: 76161,
        AIState: 'TX',
        AICity: 'FORT WORTH',
        AIAddress1: 'PO BOX 961299',
        AIName2: 'ISAOA',
        AIName1: 'SETERUS, INC.'
      },
      {
        ID: 36,
        AICountry: 'NULL',
        AIZip: 48007,
        AIState: 'MI',
        AICity: 'TROY',
        AIAddress1: 'PO BOX 7050',
        AIName2: 'SERVICING, ISAOA/ATIMA',
        AIName1: 'SHELLPOINT MORTGAGE'
      },
      {
        ID: 37,
        AICountry: 'NULL',
        AIZip: 32794,
        AIState: 'FL',
        AICity: 'MAITLAND',
        AIAddress1: 'PO BOX 948259',
        AIName2: 'ISAOA/ATIMA',
        AIName1: 'SPACE COAST CREDIT UNION'
      },
      {
        ID: 38,
        AICountry: 'NULL',
        AIZip: 30362,
        AIState: 'GA',
        AICity: 'DORAVILLE',
        AIAddress1: 'PO BOX 620188',
        AIName2: 'SERVICING, LLC, ISAOA',
        AIName1: 'SPECIALIZED LOAN'
      },
      {
        ID: 39,
        AICountry: 'NULL',
        AIZip: 33680,
        AIState: 'FL',
        AICity: 'TAMPA',
        AIAddress1: 'PO BOX 310139',
        AIName2: '',
        AIName1: 'SUNCOAST CREDIT UNION'
      },
      {
        ID: 40,
        AICountry: 'NULL',
        AIZip: 78279,
        AIState: 'TX',
        AICity: 'SAN ANTONIO',
        AIAddress1: 'PO BOX 792270',
        AIName2: 'ISAOA/ATIMA',
        AIName1: 'SUNTRUST BANK'
      },
      {
        ID: 41,
        AICountry: 'NULL',
        AIZip: 30362,
        AIState: 'GA',
        AICity: 'ATLANTA',
        AIAddress1: 'PO BOX 47047',
        AIName2: 'ISAOA/ATIMA',
        AIName1: 'SUNTRUST BANK'
      },
      {
        ID: 42,
        AICountry: 'NULL',
        AIZip: 33152,
        AIState: 'FL',
        AICity: 'MIAMI',
        AIAddress1: 'PO BOX 520615',
        AIName2: 'ISAOA',
        AIName1: 'TOTAL BANK'
      },
      {
        ID: 43,
        AICountry: 'NULL',
        AIZip: 76161,
        AIState: 'TX',
        AICity: 'FORT WORTH',
        AIAddress1: 'PO BOX 961292',
        AIName2: 'BANK, ISAOA',
        AIName1: 'USAA FEDERAL SAVINGS'
      },
      {
        ID: 44,
        AICountry: 'NULL',
        AIZip: 76161,
        AIState: 'TX',
        AICity: 'FORT WORTH',
        AIAddress1: 'PO BOX 163769',
        AIName2: 'BANK, ISAOA',
        AIName1: 'USAA FEDERAL SAVINGS'
      },
      {
        ID: 45,
        AICountry: 'NULL',
        AIZip: 92619,
        AIState: 'CA',
        AICity: 'IRVINE',
        AIAddress1: 'PO BOX 57046',
        AIName2: 'BANK, ISAOA',
        AIName1: 'USAA FEDERAL SAVINGS'
      },
      {
        ID: 46,
        AICountry: 'NULL',
        AIZip: 45501,
        AIState: 'OH',
        AICity: 'SPRINGFIELD',
        AIAddress1: 'PO BOX 8546',
        AIName2: 'ISAOA',
        AIName1: 'WELLS FARGO BANK, N.A.'
      },
      {
        ID: 50,
        AICountry: 'NULL',
        AIZip: 45501,
        AIState: 'OH',
        AICity: 'SPRINGFIELD',
        AIAddress1: 'PO BOX 5708',
        AIName2: 'ISAOA',
        AIName1: 'WELLS FARGO BANK, NA 708'
      },
      {
        ID: 52,
        AICountry: 'NULL',
        AIZip: 29502,
        AIState: 'SC',
        AICity: 'FLORENCE',
        AIAddress1: 'PO BOX 100515',
        AIName2: 'ISAOA',
        AIName1: 'WELLS FARGO BANK, NA 936'
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
      'askMortgagee',
      'additionalInterestsCSR'
    ],
    validations: []
  },
  {
    _id: '5bbba314ec85020015b7ddea',
    __v: 0,
    answerType: 'bool',
    sort: 20,
    question: 'Do you want to add third Mortgagee?',
    styleName: 'isAdditional3',
    name: 'isAdditional3',
    conditional: {
      display: [
        {
          parent: 'isAdditional2',
          trigger: true,
          operator: 'equal',
          type: 'disabled'
        },
        {
          parent: 'isAdditional',
          trigger: true,
          operator: 'equal',
          type: 'disabled'
        }
      ]
    },
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
      'askMortgagee'
    ],
    validations: []
  },
  {
    _id: '5bbba313ec85020015b7dd1a',
    __v: 0,
    answerType: 'text',
    order: 0,
    sort: 7,
    question: 'State',
    styleName: 'm1State',
    name: 'm1State',
    defaultValueLocation: 'additionalInterests[0].mailingAddress.state',
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
      'askMortgagee'
    ],
    validations: [
      'required',
      'maxLength2OnlyAlpha'
    ]
  },
  {
    _id: '5bbba313ec85020015b7dd1b',
    __v: 0,
    answerType: 'text',
    order: 0,
    sort: 6,
    question: 'City',
    styleName: 'm1City',
    name: 'm1City',
    defaultValueLocation: 'additionalInterests[0].mailingAddress.city',
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
      'askMortgagee'
    ],
    validations: [
      'required'
    ]
  },
  {
    _id: '5bbba314ec85020015b7dd2f',
    __v: 0,
    answerType: 'text',
    order: 0,
    sort: 5,
    question: 'Mailing Address 2',
    styleName: 'm1MailingAddress2',
    name: 'm1MailingAddress2',
    defaultValueLocation: 'additionalInterests[0].mailingAddress.address2',
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
      'askMortgagee'
    ],
    validations: []
  },
  {
    _id: '5bbba314ec85020015b7dd32',
    __v: 0,
    answerType: 'text',
    order: 0,
    sort: 4,
    question: 'Mailing Address 1',
    styleName: 'm1MailingAddress1',
    name: 'm1MailingAddress1',
    defaultValueLocation: 'additionalInterests[0].mailingAddress.address1',
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
      'askMortgagee'
    ],
    validations: [
      'required'
    ]
  },
  {
    _id: '5bbba314ec85020015b7dd33',
    __v: 0,
    answerType: 'text',
    order: 0,
    sort: 8,
    question: 'Zip',
    styleName: 'm1Zip',
    name: 'm1Zip',
    defaultValueLocation: 'additionalInterests[0].mailingAddress.zip',
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
      'askMortgagee'
    ],
    validations: [
      'required',
      'maxLength8AlphaNumeric'
    ]
  },
  {
    _id: '5bbba314ec85020015b7dd3a',
    __v: 0,
    answerType: 'text',
    order: 0,
    sort: 3,
    question: 'Name 2',
    styleName: 'm1Name2',
    name: 'm1Name2',
    defaultValueLocation: 'additionalInterests[0].name2',
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
      'askMortgagee'
    ],
    validations: []
  },
  {
    _id: '5bbba314ec85020015b7dd4d',
    __v: 0,
    answerType: 'text',
    order: 0,
    sort: 2,
    question: 'Name 1',
    styleName: 'm1Name1',
    name: 'm1Name1',
    defaultValueLocation: 'additionalInterests[0].name1',
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
      'askMortgagee'
    ],
    validations: [
      'required'
    ]
  },
  {
    _id: '5bbba314ec85020015b7dd58',
    __v: 0,
    answerType: 'text',
    order: 0,
    sort: 9,
    question: 'Reference Number',
    styleName: 'm1ReferenceNumber',
    name: 'm1ReferenceNumber',
    defaultValueLocation: 'additionalInterests[0].referenceNumber',
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
      'askMortgagee'
    ],
    validations: []
  },
  {
    _id: '5bbba314ec85020015b7dd6a',
    __v: 0,
    answerType: 'text',
    order: 1,
    sort: 16,
    question: 'State',
    styleName: 'm2State',
    name: 'm2State',
    defaultValueLocation: 'additionalInterests[1].mailingAddress.state',
    conditional: {
      display: [
        {
          parent: 'isAdditional2',
          trigger: true,
          operator: 'equal',
          type: 'remove'
        }
      ]
    },
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
      'askMortgagee'
    ],
    validations: [
      'required',
      'maxLength2OnlyAlpha'
    ]
  },
  {
    _id: '5bbba314ec85020015b7dd83',
    __v: 0,
    answerType: 'text',
    order: 1,
    sort: 14,
    question: 'Mailing Address 2',
    styleName: 'm2MailingAddress2',
    name: 'm2MailingAddress2',
    defaultValueLocation: 'additionalInterests[1].mailingAddress.address2',
    conditional: {
      display: [
        {
          parent: 'isAdditional2',
          trigger: true,
          operator: 'equal',
          type: 'remove'
        }
      ]
    },
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
      'askMortgagee'
    ],
    validations: []
  },
  {
    _id: '5bbba314ec85020015b7dd92',
    __v: 0,
    answerType: 'text',
    order: 1,
    sort: 19,
    question: 'Reference Number',
    styleName: 'm2ReferenceNumber',
    name: 'm2ReferenceNumber',
    defaultValueLocation: 'additionalInterests[1].referenceNumber',
    conditional: {
      display: [
        {
          parent: 'isAdditional2',
          trigger: true,
          operator: 'equal',
          type: 'remove'
        }
      ]
    },
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
      'askMortgagee'
    ],
    validations: []
  },
  {
    _id: '5bbba314ec85020015b7dd93',
    __v: 0,
    answerType: 'text',
    order: 1,
    sort: 12,
    question: 'Name 2',
    styleName: 'm2Name2',
    name: 'm2Name2',
    defaultValueLocation: 'additionalInterests[1].name2',
    conditional: {
      display: [
        {
          parent: 'isAdditional2',
          trigger: true,
          operator: 'equal',
          type: 'remove'
        }
      ]
    },
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
      'askMortgagee'
    ],
    validations: []
  },
  {
    _id: '5bbba314ec85020015b7dd94',
    __v: 0,
    answerType: 'text',
    order: 1,
    sort: 18,
    question: 'Zip',
    styleName: 'm2Zip',
    name: 'm2Zip',
    defaultValueLocation: 'additionalInterests[1].mailingAddress.zip',
    conditional: {
      display: [
        {
          parent: 'isAdditional2',
          trigger: true,
          operator: 'equal',
          type: 'remove'
        }
      ]
    },
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
      'askMortgagee'
    ],
    validations: [
      'required',
      'maxLength8AlphaNumeric'
    ]
  },
  {
    _id: '5bbba314ec85020015b7dda8',
    __v: 0,
    answerType: 'text',
    order: 1,
    sort: 13,
    question: 'Mailing Address 1',
    styleName: 'm2MailingAddress1',
    name: 'm2MailingAddress1',
    defaultValueLocation: 'additionalInterests[1].mailingAddress.address1',
    conditional: {
      display: [
        {
          parent: 'isAdditional2',
          trigger: true,
          operator: 'equal',
          type: 'remove'
        }
      ]
    },
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
      'askMortgagee'
    ],
    validations: [
      'required'
    ]
  },
  {
    _id: '5bbba314ec85020015b7ddba',
    __v: 0,
    answerType: 'text',
    order: 1,
    sort: 11,
    question: 'Name 1',
    styleName: 'm2Name1',
    name: 'm2Name1',
    defaultValueLocation: 'additionalInterests[1].name1',
    conditional: {
      display: [
        {
          parent: 'isAdditional2',
          trigger: true,
          operator: 'equal',
          type: 'remove'
        }
      ]
    },
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
      'askMortgagee'
    ],
    validations: [
      'required'
    ]
  },
  {
    _id: '5bbba314ec85020015b7ddbc',
    __v: 0,
    answerType: 'text',
    order: 1,
    sort: 15,
    question: 'City',
    styleName: 'm2City',
    name: 'm2City',
    defaultValueLocation: 'additionalInterests[1].mailingAddress.city',
    conditional: {
      display: [
        {
          parent: 'isAdditional2',
          trigger: true,
          operator: 'equal',
          type: 'remove'
        }
      ]
    },
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
      'askMortgagee'
    ],
    validations: [
      'required'
    ]
  },
  {
    _id: '5bbba314ec85020015b7dde5',
    __v: 0,
    answerType: 'text',
    order: 2,
    sort: 26,
    question: 'State',
    styleName: 'm3State',
    name: 'm3State',
    defaultValueLocation: 'additionalInterests[2].mailingAddress.state',
    conditional: {
      display: [
        {
          parent: 'isAdditional3',
          trigger: true,
          operator: 'equal',
          type: 'remove'
        }
      ]
    },
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
      'askMortgagee'
    ],
    validations: [
      'required',
      'maxLength2OnlyAlpha'
    ]
  },
  {
    _id: '5bbba314ec85020015b7dde6',
    __v: 0,
    answerType: 'text',
    order: 2,
    sort: 24,
    question: 'Mailing Address 2',
    styleName: 'm3MailingAddress2',
    name: 'm3MailingAddress2',
    defaultValueLocation: 'additionalInterests[2].mailingAddress.address2',
    conditional: {
      display: [
        {
          parent: 'isAdditional3',
          trigger: true,
          operator: 'equal',
          type: 'remove'
        }
      ]
    },
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
      'askMortgagee'
    ],
    validations: []
  },
  {
    _id: '5bbba314ec85020015b7dde7',
    __v: 0,
    answerType: 'text',
    order: 2,
    sort: 29,
    question: 'Reference Number',
    styleName: 'm3ReferenceNumber',
    name: 'm3ReferenceNumber',
    defaultValueLocation: 'additionalInterests[2].referenceNumber',
    conditional: {
      display: [
        {
          parent: 'isAdditional3',
          trigger: true,
          operator: 'equal',
          type: 'remove'
        }
      ]
    },
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
      'askMortgagee'
    ],
    validations: []
  },
  {
    _id: '5bbba314ec85020015b7dde8',
    __v: 0,
    answerType: 'text',
    order: 2,
    sort: 22,
    question: 'Name 2',
    styleName: 'm3Name2',
    name: 'm3Name2',
    defaultValueLocation: 'additionalInterests[2].name2',
    conditional: {
      display: [
        {
          parent: 'isAdditional3',
          trigger: true,
          operator: 'equal',
          type: 'remove'
        }
      ]
    },
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
      'askMortgagee'
    ],
    validations: []
  },
  {
    _id: '5bbba314ec85020015b7dde9',
    __v: 0,
    answerType: 'text',
    order: 2,
    sort: 28,
    question: 'Zip',
    styleName: 'm3Zip',
    name: 'm3Zip',
    defaultValueLocation: 'additionalInterests[2].mailingAddress.zip',
    conditional: {
      display: [
        {
          parent: 'isAdditional3',
          trigger: true,
          operator: 'equal',
          type: 'remove'
        }
      ]
    },
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
      'askMortgagee'
    ],
    validations: [
      'required',
      'maxLength8AlphaNumeric'
    ]
  },
  {
    _id: '5bbba314ec85020015b7ddeb',
    __v: 0,
    answerType: 'text',
    order: 2,
    sort: 23,
    question: 'Mailing Address 1',
    styleName: 'm3MailingAddress1',
    name: 'm3MailingAddress1',
    defaultValueLocation: 'additionalInterests[2].mailingAddress.address1',
    conditional: {
      display: [
        {
          parent: 'isAdditional3',
          trigger: true,
          operator: 'equal',
          type: 'remove'
        }
      ]
    },
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
      'askMortgagee'
    ],
    validations: [
      'required'
    ]
  },
  {
    _id: '5bbba314ec85020015b7ddec',
    __v: 0,
    answerType: 'text',
    order: 2,
    sort: 21,
    question: 'Name 1',
    styleName: 'm3Name1',
    name: 'm3Name1',
    defaultValueLocation: 'additionalInterests[2].name1',
    conditional: {
      display: [
        {
          parent: 'isAdditional3',
          trigger: true,
          operator: 'equal',
          type: 'remove'
        }
      ]
    },
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
      'askMortgagee'
    ],
    validations: [
      'required'
    ]
  },
  {
    _id: '5bbba314ec85020015b7dded',
    __v: 0,
    answerType: 'text',
    order: 2,
    sort: 25,
    question: 'City',
    styleName: 'm3City',
    name: 'm3City',
    defaultValueLocation: 'additionalInterests[2].mailingAddress.city',
    conditional: {
      display: [
        {
          parent: 'isAdditional3',
          trigger: true,
          operator: 'equal',
          type: 'remove'
        }
      ]
    },
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
      'askMortgagee'
    ],
    validations: [
      'required'
    ]
  }
];
