export const ph1Fields = [
  {
    name: 'policyHolders[0].firstName',
    error: 'Field Required',
    label: 'First Name',
    type: 'text',
    required: true,
    data: 'Bruce'
  },
  {
    name: 'policyHolders[0].lastName',
    error: 'Field Required',
    label: 'Last Name',
    type: 'text',
    required: true,
    data: 'Wayne'
  },
  {
    name: 'policyHolders[0].emailAddress',
    error: 'Field Required',
    label: 'Email Address',
    type: 'text',
    required: true,
    data: 'Batman@gmail.com'
  },
  {
    name: 'policyHolders[0].primaryPhoneNumber',
    error: 'Field Required',
    label: 'Contact Phone',
    type: 'text',
    required: true,
    data: '(123) 456-7890'
  }
];

export const ph2Fields = [
  {
    name: 'policyHolders[1].firstName',
    error: 'Field Required',
    label: 'First Name',
    type: 'text',
    required: true,
    data: 'Dick'
  },
  {
    name: 'policyHolders[1].lastName',
    error: 'Field Required',
    label: 'Last Name',
    type: 'text',
    required: true,
    data: 'Grayson'
  },
  {
    name: 'policyHolders[1].emailAddress',
    error: 'Field Required',
    label: 'Email Address',
    type: 'text',
    required: true,
    data: 'Robin@hotmail.com'
  },
  {
    name: 'policyHolders[1].primaryPhoneNumber',
    error: 'Field Required',
    label: 'Contact Phone',
    type: 'text',
    required: true,
    data: '(123) 456-7890'
  }
];

export const policyDetailsFields = [
  {
    name: 'effectiveDate',
    error: 'Field Required',
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

export const pageHeaders = [
  {
    name: 'Primary Policyholder',
    text: 'Primary Policyholder',
    icon: 'fa fa-user-circle'
  },
  {
    name: 'Secondary Policyholder',
    text: 'Secondary Policyholder',
    icon: 'fa fa-user-circle'
  },
  {
    name: 'Policy Details',
    text: 'Policy Details',
    icon: 'fa fa-file-text'
  }
];
