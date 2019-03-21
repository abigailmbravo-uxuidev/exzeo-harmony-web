export const fields = [
  {
    name: 'underwritingAnswers.rented.answer_wrapper',
    required: true,
    type: 'radio',
    label: 'Is the home or any structures on the property ever rented?',
    values: ['Yes', 'Occasionally', 'Never']
  },
  {
    name: 'underwritingAnswers.previousClaims.answer_wrapper',
    required: true,
    type: 'radio',
    label: 'When was the last claim filed?',
    values: ['No claims ever filed', 'Less than 3 Years', '3-5 Years', 'Over 5 Years', 'Unknown']
  },
  {
    name: 'underwritingAnswers.monthsOccupied.answer_wrapper',
    required: true,
    type: 'radio',
    label: 'How many months a year does the owner live in the home?',
    values: ['0-3', '4-6', '7-9', '10+']
  },
  {
    name: 'underwritingAnswers.fourPointUpdates.answer_wrapper',
    required: true,
    type: 'radio',
    label: 'Have the wiring, plumbing, and HVAC been updated in the last 35 years?',
    values: ['Yes', 'No', 'Unknown']
  },
  {
    name: 'underwritingAnswers.business.answer_wrapper',
    required: true,
    type: 'radio',
    label: 'Is a business conducted on the property?',
    values: ['Yes', 'No']
  }
];

export const workflowSections = [
  {
    name: 'tab-nav-askAdditionalCustomerData',
    status: 'selected'
  },
  {
    name: 'tab-nav-askUWAnswers',
    status: 'active'
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

