export const ph1Fields = [
  {
    name: 'FirstName',
    error: 'Field Required',
    label: 'First Name',
    type: 'text',
    required: true,
    data: 'Bruce'
  },
  {
    name: 'LastName',
    error: 'Field Required',
    label: 'Last Name',
    type: 'text',
    required: true,
    data: 'Wayne'
  },
  {
    name: 'EmailAddress',
    error: 'Not a valid email address',
    label: 'Email Address',
    type: 'text',
    required: true,
    data: 'Batman@gmail.com'
  },
  {
    name: 'phoneNumber',
    error: 'Field Required',
    label: 'Contact Phone',
    type: 'text',
    required: true,
    data: '123 456 7890'
  }
];

export const ph2Fields = [
  {
    name: 'FirstName2',
    error: 'Field Required',
    label: 'First Name',
    type: 'text',
    required: true,
    data: 'Dick'
  },
  {
    name: 'LastName2',
    error: 'Field Required',
    label: 'Last Name',
    type: 'text',
    required: true,
    data: 'Grayson'
  },
  {
    name: 'EmailAddress2',
    error: 'Not a valid email address',
    label: 'Email Address',
    type: 'text',
    required: true,
    data: 'Robin@hotmail.com'
  },
  {
    name: 'phoneNumber2',
    error: 'Field Required',
    label: 'Contact Phone',
    type: 'text',
    required: true,
    data: '135 792 4680'
  }
];

export const policyDetailsFields = [
  {
    name: 'effectiveDate',
    error: 'Not a valid date',
    label: 'Effective Date',
    type: 'text',
    required: true
  },
  {
    name: 'agentCode',
    error: '',
    label: 'Agent',
    type: 'select',
    required: true
  }
];

export const workflowSections = [
  {
    name: 'tab-nav-askAdditionalCustomerData',
    status: 'active'
  },
  {
    name: 'tab-nav-askUWAnswers',
    status: 'disabled'
  },
  {
    name: 'tab-nav-askToCustomizeDefaultQuote',
    status: 'disabled'
  },
  {
    name: 'tab-nav-sendEmailOrContinue',
    status: 'disabled'
  },
  {
    name: 'tab-nav-addAdditionalAIs',
    status: 'disabled'
  },
  {
    name: 'tab-nav-askAdditionalQuestions',
    status: 'disabled'
  },
  {
    name: 'tab-nav-editVerify',
    status: 'disabled'
  }
];
