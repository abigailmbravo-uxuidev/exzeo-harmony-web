export const fields = [
  {
    name: 'policyHolderMailingAddress.address1_wrapper',
    error: 'Field Required',
    label: 'Address 1',
    type: 'text',
    required: true,
    data: '123 test address'
  },
  {
    name: 'policyHolderMailingAddress.address2_wrapper',
    label: 'Address 2',
    type: 'text',
    required: false,
    data: '123 test address'
  },
  {
    name: 'policyHolderMailingAddress.city_wrapper',
    error: 'Field Required',
    label: 'City',
    type: 'text',
    required: true,
    data: 'tampa'
  },
  {
    name: 'policyHolderMailingAddress.state_wrapper',
    error: 'Field Required',
    label: 'State',
    type: 'text',
    required: true,
    data: 'fl'
  },
  {
    name: 'policyHolderMailingAddress.zip_wrapper',
    error: 'Field Required',
    label: 'Zip',
    type: 'text',
    required: true,
    data: '00001'
  },
  {
    name: 'billToId_wrapper',
    type: 'select',
    error: 'Field Required',
    label: 'Bill To',
    required: false
  },
  {
    name: 'billPlan_wrapper',
    type: 'radio',
    error: 'Field Required',
    label: 'Bill Plan',
    required: false
  },
  {
    name: 'sameAsPropertyAddress_wrapper',
    type: 'switch',
    label: 'Is the mailing address the same',
    defaultValue: ''
  }
];

export const workflowSections = [
  {
    name: 'tab-nav-askAdditionalCustomerData',
    status: 'selected'
  },
  {
    name: 'tab-nav-askUWAnswers',
    status: 'selected'
  },
  {
    name: 'tab-nav-askToCustomizeDefaultQuote',
    status: 'selected'
  },
  {
    name: 'tab-nav-sendEmailOrContinue',
    status: 'selected'
  },
  {
    name: 'tab-nav-addAdditionalAIs',
    status: 'selected'
  },
  {
    name: 'tab-nav-askAdditionalQuestions',
    status: 'active'
  },
  {
    name: 'tab-nav-editVerify',
    status: 'disabled'
  }
];

export const pageHeaders = [
  {
    name: 'Mailing Address',
    text: 'Mailing Address',
    icon: 'fa fa-envelope'
  },
  {
    name: 'Billing Information',
    text: 'Billing Information',
    icon: 'fa fa-dollar'
  }
];

