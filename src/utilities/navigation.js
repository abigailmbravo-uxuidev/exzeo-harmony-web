
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

  if (props.appState.data.submitting || activeTask === stepName || !completedTasks.includes(stepName)) return;

  props.setAppState({ ...props.appState.data, submitting: true });
  await props.updateQuote({ stepName, quoteNumber: props.quote.quoteNumber });
  props.setAppState({ ...props.appState.data, submitting: false });
  props.history.push(`${STEP_NAME_MAP[stepName]}`);
};
