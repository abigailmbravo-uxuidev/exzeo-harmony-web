import { PRODUCT_TYPES } from './quote';

export const STEP_NAMES = {
  askAdditionalCustomerData: 0,
  askUWAnswers: 1,
  askToCustomizeDefaultQuote: 2,
  sendEmailOrContinue: 3,
  // assumptions is technically 4 but is hidden. For simplicity we will just not use 4.
  addAdditionalAIs: 5,
  askAdditionalQuestions: 6,
  editVerify: 7,
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


// TODO This will not work in the long run. We need to dynamically generate the workflow nav bar based on the template.
export const getNavLinks = ({ goToStep, getClassName, onKeyPress, product }) => {
  if (product === PRODUCT_TYPES.home) {
    return [
      {
        key: "1",
        iconId: 'fa fa-vcard',
        label: 'Policyholder',
        className: getClassName(STEP_NAMES.askAdditionalCustomerData),
        handleClick: () => goToStep(STEP_NAMES.askAdditionalCustomerData),
        onKeyPress: (e) => onKeyPress(STEP_NAMES.askAdditionalCustomerData, e),
      }, {
        key: "2",
        iconId: 'fa fa-list-ol',
        label: 'Underwriting',
        className: getClassName(STEP_NAMES.askUWAnswers),
        handleClick: () => goToStep(STEP_NAMES.askUWAnswers),
        onKeyPress: (e) => onKeyPress(STEP_NAMES.askUWAnswers, e),
      }, {
        key: "3",
        iconId: 'fa fa-sliders',
        label: 'Customize',
        className: getClassName(STEP_NAMES.askToCustomizeDefaultQuote),
        handleClick: () => goToStep(STEP_NAMES.askToCustomizeDefaultQuote),
        onKeyPress: (e) => onKeyPress(STEP_NAMES.askToCustomizeDefaultQuote, e),
      }, {
        key: "4",
        iconId: 'fa fa-share-alt',
        label: 'Share',
        className: getClassName(STEP_NAMES.sendEmailOrContinue),
        handleClick: () => goToStep(STEP_NAMES.sendEmailOrContinue),
        onKeyPress: (e) => onKeyPress(STEP_NAMES.sendEmailOrContinue, e),
      }, {
        key: "5",
        iconId: 'fa fa-user-plus',
        label: 'Additional Parties',
        className: getClassName(STEP_NAMES.addAdditionalAIs),
        handleClick: () => goToStep(STEP_NAMES.addAdditionalAIs),
        onKeyPress: (e) => onKeyPress(STEP_NAMES.addAdditionalAIs, e),
      }, {
        key: "6",
        iconId: 'fa fa-envelope',
        label: 'Mailing / Billing',
        className: getClassName(STEP_NAMES.askAdditionalQuestions),
        handleClick: () => goToStep(STEP_NAMES.askAdditionalQuestions),
        onKeyPress: (e) => onKeyPress(STEP_NAMES.askAdditionalQuestions, e),
      }, {
        key: "7",
        iconId: 'fa fa-check-square',
        label: 'Verify',
        className: getClassName(STEP_NAMES.editVerify),
        handleClick: () => goToStep(STEP_NAMES.editVerify),
        onKeyPress: (e) => onKeyPress(STEP_NAMES.editVerify, e),
      }
    ];
  } else {
    return [
      {
        key: "1",
        iconId: 'fa fa-file-text',
        label: 'Quote Details',
        className: getClassName(STEP_NAMES.askAdditionalCustomerData),
        handleClick: () => goToStep(STEP_NAMES.askAdditionalCustomerData),
        onKeyPress: (e) => onKeyPress(STEP_NAMES.askAdditionalCustomerData, e),
      }, {
        key: "2",
        iconId: 'fa fa-list-ol',
        label: 'Underwriting',
        className: getClassName(STEP_NAMES.askUWAnswers),
        handleClick: () => goToStep(STEP_NAMES.askUWAnswers),
        onKeyPress: (e) => onKeyPress(STEP_NAMES.askUWAnswers, e),
      }, {
        key: "3",
        iconId: 'fa fa-sliders',
        label: 'Customize',
        className: getClassName(STEP_NAMES.askToCustomizeDefaultQuote),
        handleClick: () => goToStep(STEP_NAMES.askToCustomizeDefaultQuote),
        onKeyPress: (e) => onKeyPress(STEP_NAMES.askToCustomizeDefaultQuote, e),
      }, {
        key: "4",
        iconId: 'fa fa-share-alt',
        label: 'Share',
        className: getClassName(STEP_NAMES.sendEmailOrContinue),
        handleClick: () => goToStep(STEP_NAMES.sendEmailOrContinue),
        onKeyPress: (e) => onKeyPress(STEP_NAMES.sendEmailOrContinue, e),
      }, {
        key: "5",
        iconId: 'fa fa-vcard',
        label: 'Policyholder',
        className: getClassName(STEP_NAMES.askAdditionalCustomerData),
        handleClick: () => goToStep(STEP_NAMES.askAdditionalCustomerData),
        onKeyPress: (e) => onKeyPress(STEP_NAMES.askAdditionalCustomerData, e),
      }, {
        key: "6",
        iconId: 'fa fa-user-plus',
        label: 'Additional Parties',
        className: getClassName(STEP_NAMES.addAdditionalAIs),
        handleClick: () => goToStep(STEP_NAMES.addAdditionalAIs),
        onKeyPress: (e) => onKeyPress(STEP_NAMES.addAdditionalAIs, e),
      }, {
        key: "7",
        iconId: 'fa fa-envelope',
        label: 'Mailing / Billing',
        className: getClassName(STEP_NAMES.askAdditionalQuestions),
        handleClick: () => goToStep(STEP_NAMES.askAdditionalQuestions),
        onKeyPress: (e) => onKeyPress(STEP_NAMES.askAdditionalQuestions, e),
      }, {
        key: "8",
        iconId: 'fa fa-check-square',
        label: 'Verify',
        className: getClassName(STEP_NAMES.editVerify),
        handleClick: () => goToStep(STEP_NAMES.editVerify),
        onKeyPress: (e) => onKeyPress(STEP_NAMES.editVerify, e),
      }
    ];
  }
};
