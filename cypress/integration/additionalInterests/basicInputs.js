export const fields = [
  {
    name: 'name1',
    error: 'Field Required',
    label: 'Name 1',
    type: 'text',
    required: true,
    data: 'Guy Gardner'
  },
  {
    name: 'name2',
    label: 'Name 2',
    type: 'text',
    required: false
  },
  {
    name: 'mailingAddress1',
    error: 'Field Required',
    label: 'Mailing Address 1',
    type: 'text',
    required: true,
    data: '10101 Binary Place'
  },
  {
    name: 'mailingAddress2',
    label: 'Mailing Address 2',
    type: 'text',
    required: false
  },
  {
    name: 'city',
    error: 'Field Required',
    label: 'City',
    type: 'text',
    required: true,
    data: 'Hagåtña'
  },
  {
    name: 'state',
    error: 'Field Required',
    label: 'State',
    type: 'text',
    required: true,
    data: 'GU'
  },
  {
    name: 'zip',
    error: 'Field Required',
    label: 'Zip',
    type: 'text',
    required: true,
    data: '96910'
  },
  {
    name: 'referenceNumber',
    label: 'Reference Number',
    type: 'text',
    required: false
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
    status: 'active'
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
