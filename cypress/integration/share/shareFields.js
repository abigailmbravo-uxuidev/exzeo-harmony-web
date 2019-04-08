export const modalFields = [
  {
    name: 'name_wrapper',
    error: 'Field Required',
    label: 'Name',
    type: 'text',
    required: true,
    data: 'Bruce Wayne'
  },
  {
    name: 'emailAddr_wrapper',
    error: 'Field Required',
    label: 'Email Address',
    type: 'text',
    required: true,
    data: 'Batman@gmail.com'
  }
];

export const fields = [
  {
    name: 'confirm-assumptions_wrapper',
    type: 'switch',
    label: 'Confirmed',
    defaultValue: false
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
    status: 'active'
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
    name: 'Share',
    text: 'Share',
    icon: 'fa fa-share-alt'
  },
  {
    name: 'Continue',
    text: 'Continue',
    icon: 'fa fa-arrow-circle-right'
  },
  {
    name: 'NewQuote',
    text: 'New Quote',
    icon: 'fa fa-quote-left'
  }
];

