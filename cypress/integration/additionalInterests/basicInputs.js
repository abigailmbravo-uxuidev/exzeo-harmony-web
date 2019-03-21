export const fields = [
  {
    name: 'name1',
    error: 'Field Required',
    label: 'Name 1',
    required: true
  },
  {
    name: 'name2',
    label: 'Name 2',
    required: false
  },
  {
    name: 'mailingAddress1',
    error: 'Field Required',
    label: 'Mailing Address 1',
    required: true
  },
  {
    name: 'mailingAddress2',
    label: 'Mailing Address 2',
    required: false
  },
  {
    name: 'city',
    error: 'Field Required',
    label: 'City',
    required: true
  },
  {
    name: 'state',
    error: 'Field Required',
    label: 'State',
    required: true
  },
  {
    name: 'zip',
    error: 'Field Required',
    label: 'Zip',
    required: true
  },
  {
    name: 'referenceNumber',
    label: 'Reference Number',
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
