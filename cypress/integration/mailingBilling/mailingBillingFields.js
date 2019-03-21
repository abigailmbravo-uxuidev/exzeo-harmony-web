export const fields = [
  {
    name: 'address1',
    error: 'Field Required',
    label: 'Address 1',
<<<<<<< HEAD
    required: true
=======
    required: true,
    data: '123 test address'
>>>>>>> b336eef8... Add input struct to share
  },
  {
    name: 'address2',
    label: 'Address 2',
<<<<<<< HEAD
    required: false
=======
    required: false,
    data: '123 test address'
>>>>>>> b336eef8... Add input struct to share
  },
  {
    name: 'city',
    error: 'Field Required',
    label: 'City',
<<<<<<< HEAD
    required: true
=======
    required: true,
    data: 'tampa'
>>>>>>> b336eef8... Add input struct to share
  },
  {
    name: 'state',
    error: 'Field Required',
    label: 'State',
<<<<<<< HEAD
    required: true
=======
    required: true,
    data: 'fl'
>>>>>>> b336eef8... Add input struct to share
  },
  {
    name: 'zip',
    error: 'Field Required',
    label: 'Zip',
<<<<<<< HEAD
    required: true
=======
    required: true,
    data: '00001'
>>>>>>> b336eef8... Add input struct to share
  },
  {
    name: 'billToId',
    type: 'select',
    error: 'Field Required',
    label: 'Bill To',
    required: false
  },
  {
    name: 'billPlan',
    type: 'radio',
    error: 'Field Required',
    label: 'Bill Plan',
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

