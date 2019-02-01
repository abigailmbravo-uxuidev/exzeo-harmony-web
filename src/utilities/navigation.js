import classNames from 'classnames';

const STEP_NAME_MAP = {
  askAdditionalCustomerData: 'customerInfo',
  askUWAnswers: 'underwriting',
  askToCustomizeDefaultQuote: 'customize',
  sendEmailOrContinue: 'share',
  addAdditionalAIs: 'additionalInterests',
  askAdditionalQuestions: 'mailingBilling',
  editVerify: 'verify'
};

export const goToStep = async (props, stepName) => {
  // don't allow submission until the other step is completed
  const { activeTask, completedTasks } = props.workflowState;

  if (props.appState.isLoading || activeTask === stepName || !completedTasks.includes(stepName)) return;

  await props.updateQuote({ stepName, quoteNumber: props.quote.quoteNumber });
  props.history.replace(`${STEP_NAME_MAP[stepName]}`);
};

export const getNavLinks = ({ params }) => [
  {
    key: 'home',
    to: '/',
    label: 'DASHBOARD',
    styleName: 'agent-dashboard',
    hasIcon: true,
    exact: true,
  }, {
    key: 'searchAddress',
    to: '/search/address',
    label: 'QUOTE',
    styleName: 'quote label',
    hasIcon: true,
  }, {
    key: 'policy',
    to: '/policy',
    label: 'POLICY',
    styleName: classNames('policy label', { 'policy-detail': params.policyNumber }),
    hasIcon: true,
  }, {
    key: 'training',
    to: '/training',
    label: 'HELPFUL INFO',
    styleName: 'training label',
    hasIcon: true,
  }
];
