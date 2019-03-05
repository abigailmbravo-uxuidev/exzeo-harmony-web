export const STEP_NAMES = {
  askAdditionalCustomerData: 'askAdditionalCustomerData',
  askUWAnswers: 'askUWAnswers',
  askToCustomizeDefaultQuote: 'askToCustomizeDefaultQuote',
  sendEmailOrContinue: 'sendEmailOrContinue',
  addAdditionalAIs: 'addAdditionalAIs',
  askAdditionalQuestions: 'askAdditionalQuestions',
  editVerify: 'editVerify',
};

/*
  TODO: This group of constants is meant to disappear as development of Gandalf continues
 */
export const NEXT_PAGE_ROUTING = {
  customerInfo: 'underwriting',
  underwriting: 'customize',
  customize: 'share',
  share: 'assumptions',
  assumptions: 'additionalInterests',
  mailingBilling: 'verify',
};

export const PAGE_ROUTING = {
  'customerInfo': 0,
  'underwriting': 1,
  'customize': 2,
  'share': 3,
  'assumptions': 4,
  'additionalInterests': 5,
  'mailingBilling': 6,
  'verify': 7,
  'thankYou': 8,
};

export const ROUTES_NOT_HANDLED_BY_GANDALF = [
  'additionalInterests',
  'askMortgagee',
  'askAdditionalInterest',
  'askAdditionalInsured',
  'askPremiumFinance',
  'askBillPayer',
  'verify',
  'error',
  'thankYou',
];

export const ROUTES_NOT_USING_FOOTER = [
  'share',
  'assumptions',
  'additionalInterests',
  'askMortgagee',
  'askAdditionalInterest',
  'askAdditionalInsured',
  'askPremiumFinance',
  'askBillPayer',
  'verify',
  'error',
  'thankYou',
];

/*
  TODO: The above group of constants is meant to disappear as development of Gandalf continues
 */

export const getNavLinks = ({ goToStep, getClassName, onKeyPress }) => [
  {
    key: STEP_NAMES.askAdditionalCustomerData,
    iconId: 'fa fa-vcard',
    label: 'Policyholder',
    className: getClassName(STEP_NAMES.askAdditionalCustomerData),
    handleClick: () => goToStep(STEP_NAMES.askAdditionalCustomerData),
    onKeyPress: (e) => onKeyPress(STEP_NAMES.askAdditionalCustomerData, e),
  }, {
    key: STEP_NAMES.askUWAnswers,
    iconId: 'fa fa-list-ol',
    label: 'Underwriting',
    className: getClassName(STEP_NAMES.askUWAnswers),
    handleClick: () => goToStep(STEP_NAMES.askUWAnswers),
    onKeyPress: (e) => onKeyPress(STEP_NAMES.askUWAnswers, e),
  }, {
    key: STEP_NAMES.askToCustomizeDefaultQuote,
    iconId: 'fa fa-sliders',
    label: 'Customize',
    className: getClassName(STEP_NAMES.askToCustomizeDefaultQuote),
    handleClick: () => goToStep(STEP_NAMES.askToCustomizeDefaultQuote),
    onKeyPress: (e) => onKeyPress(STEP_NAMES.askToCustomizeDefaultQuote, e),
  }, {
    key: STEP_NAMES.sendEmailOrContinue,
    iconId: 'fa fa-share-alt',
    label: 'Share',
    className: getClassName(STEP_NAMES.sendEmailOrContinue),
    handleClick: () => goToStep(STEP_NAMES.sendEmailOrContinue),
    onKeyPress: (e) => onKeyPress(STEP_NAMES.sendEmailOrContinue, e),
  }, {
    key: STEP_NAMES.addAdditionalAIs,
    iconId: 'fa fa-user-plus',
    label: 'Additional Parties',
    className: getClassName(STEP_NAMES.addAdditionalAIs),
    handleClick: () => goToStep(STEP_NAMES.addAdditionalAIs),
    onKeyPress: (e) => onKeyPress(STEP_NAMES.addAdditionalAIs, e),
  }, {
    key: STEP_NAMES.askAdditionalQuestions,
    iconId: 'fa fa-envelope',
    label: 'Mailing / Billing',
    className: getClassName(STEP_NAMES.askAdditionalQuestions),
    handleClick: () => goToStep(STEP_NAMES.askAdditionalQuestions),
    onKeyPress: (e) => onKeyPress(STEP_NAMES.askAdditionalQuestions, e),
  }, {
    key: STEP_NAMES.editVerify,
    iconId: 'fa fa-check-square',
    label: 'Verify',
    className: getClassName(STEP_NAMES.editVerify),
    handleClick: () => goToStep(STEP_NAMES.editVerify),
    onKeyPress: (e) => onKeyPress(STEP_NAMES.editVerify, e),
  }
];
