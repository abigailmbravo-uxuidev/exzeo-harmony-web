import axios from 'axios';

import { callService, handleError } from './serviceRunner';

const HARD_STOP_STEPS = [
  'UWDecision1EndError',
  'UWDecision2EndError',
  'UWDecision3EndError',
  'UWDecision4EndError',
  'UWDecision5EndError'
];

const state = {
  activeTask: '',
  variables: [],
  workflowId: '',
  completedTasks: [],
  underwritingExceptions: [],
  uiQuestions: [],
  underwritingQuestions: [],
  isHardStop: false
};

/**
 * Get current state object
 * @private
 * @returns {{activeTask: string, variables: Array, workflowId: string, completedTasks: Array, underwritingExceptions: Array, uiQuestions: Array, underwritingQuestions: Array, isHardStop: boolean}}
 */
function getState() {
  return state;
}

/**
 * Set values from cg response onto 'quoteState' object
 * @param activeTask
 * @param workflowId
 * @param variables
 * @param completedTasks
 * @param underwritingReviewErrors
 * @param uiQuestions
 * @param underwritingQuestions
 * @param isHardStop
 * @private
 */
function setState({
  activeTask = '',
  workflowId = '',
  variables = [],
  completedTasks = [],
  underwritingExceptions = [],
  uiQuestions = [],
  underwritingQuestions = [],
  isHardStop = false
}) {
  state.activeTask = activeTask;
  state.variables = variables;
  state.workflowId = workflowId;
  state.completedTasks = completedTasks;
  state.underwritingExceptions = underwritingExceptions;
  state.uiQuestions = uiQuestions;
  state.underwritingQuestions = underwritingQuestions;
  state.isHardStop = isHardStop;
}

/**
 * Start cg model instance
 * @param modelName
 * @param data
 * @private
 * @returns {Promise<void>}
 */
async function start(modelName, data) {
  const axiosConfig = {
    method: 'POST',
    url: `${process.env.REACT_APP_API_URL}/cg/start?${modelName}`,
    headers: { 'Content-Type': 'application/json' },
    data: {
      modelName,
      data
    }
  };

  const response = await axios(axiosConfig);

  const { data: { activeTask: { name: activeTaskName }, modelInstanceId, model: { variables, completedTasks } } } = response.data;
  setState({
    activeTask: activeTaskName,
    workflowId: modelInstanceId,
    variables,
    completedTasks
  });
}

/**
 * Complete cg step
 * @param stepName
 * @param data
 * @param cgEndpoint
 * @private
 * @returns {Promise<void>}
 */
async function complete(stepName = '', data, cgEndpoint = 'complete') {
  const axiosConfig = {
    method: 'POST',
    url: `${process.env.REACT_APP_API_URL}/cg/${cgEndpoint}?${stepName}`,
    headers: { 'Content-Type': 'application/json' },
    data: {
      workflowId: state.workflowId,
      stepName,
      data
    }
  };

  try {
    // deeply nested response object from cg/axios
    const response = await axios(axiosConfig);

    const {
      data: {
        uiQuestions,
        previousTask = {},
        activeTask = {},
        modelInstanceId,
        model: {
          variables,
          completedTasks
        }
      }
    } = response.data;

    let underwritingExceptions = [];
    const isHardStop = HARD_STOP_STEPS.includes(previousTask.name);
    const cgUWQuestions = variables.find(v => v.name === 'getListOfUWQuestions');
    const underwritingQuestions = cgUWQuestions ? cgUWQuestions.value.result : [];

    if (previousTask.name === 'UnderWritingReviewError' || isHardStop) {
      underwritingExceptions = previousTask.value.filter(uwe => !uwe.overridden);
    }

    setState({
      activeTask: activeTask.name,
      workflowId: modelInstanceId,
      variables,
      completedTasks,
      underwritingExceptions,
      uiQuestions,
      underwritingQuestions,
      isHardStop
    });
  } catch (error) {
    throw handleError(error);
  }
}

/**
 * Find data in cg response 'variables' property by name
 * @param name
 * @private
 * @returns {*|null}
 */
function getDataByName(name) {
  const result = state.variables.find(v => v.name === name);
  return result && result.value && result.value.result ? result.value.result : null;
}

/**
 * Get quote directly through service-runner
 * @private
 * @param {string} quoteNumber
 * @returns {Promise<*>}
 */
async function getQuoteServiceRequest(quoteNumber) {
  try {
    const response = await callService({
      service: 'quote-data',
      method: 'GET',
      path: quoteNumber
    }, 'getQuoteServiceRequest');

    return response.data.result;
  } catch (error) {
    throw handleError(error);
  }
}

/**
 * Create/start a quote through CG
 * @param address
 * @param igdID
 * @param stateCode
 * @public
 * @returns {Promise<{quote: *, state: {activeTask: string, variables: Array, workflowId: string, completedTasks: Array}}>}
 */
async function createQuote(address, igdID, stateCode) {
  await start('quoteModel', { dsUrl: `${process.env.REACT_APP_API_URL}/ds` });

  await complete('search', { address, searchType: 'address' });
  await complete('chooseAddress', {
    igdId: igdID,
    stateCode
  });

  return {
    quote: getDataByName('createQuote'),
    state: getState()
  };
}

/**
 * Retrieve existing quote through CG and start new model instance
 * @param quoteNumber
 * @param quoteId
 * @public
 * @returns {Promise<{quote: *, state: {activeTask: string, variables: Array, workflowId: string, completedTasks: Array}}>}
 */
async function getQuote(quoteNumber, quoteId) {
  await start('quoteModel', { dsUrl: `${process.env.REACT_APP_API_URL}/ds` });

  await complete('search', { quoteNumber, searchType: 'quote' });
  await complete('chooseQuote', {
    quoteId
  });
  return {
    quote: getDataByName('retrieveQuote'),
    state: getState()
  };
}

/**
 * Update quote and quoteState object
 * @param data
 * @param quoteNumber
 * @param stepName
 * @param getReduxState
 * @public
 * @returns {Promise<{quote: *, state: {activeTask: string, variables: Array, workflowId: string, completedTasks: Array, underwritingExceptions: Array, uiQuestions: Array, underwritingQuestions: Array, isHardStop: boolean}}>}
 */
async function updateQuote({ data, quoteNumber, stepName, getReduxState }) {
  // if user refreshes it will ensure the state is synced up to the redux state;
  if (!state.activeTask) setState(getReduxState().quoteState.state);

  // 'moveToTask' for going back to specific step in workflow
  if (stepName) {
    await complete(stepName, null, 'moveToTask');
    // customize w/ recalculate
  } else if (state.activeTask === 'askToCustomizeDefaultQuote' && data.recalc) {
    await complete(state.activeTask, { shouldCustomizeQuote: 'Yes' });
    await complete(state.activeTask, data);
    // customize and save
  } else if (state.activeTask === 'askToCustomizeDefaultQuote' && !data.recalc) {
    await complete(state.activeTask, { shouldCustomizeQuote: 'No' });
    // share
  } else if (state.activeTask === 'sendEmailOrContinue' && data.shouldSendEmail === 'Yes') {
    await complete(state.activeTask, { shouldSendEmail: 'Yes' });
    await complete(state.activeTask, data);
    // verify
  } else if (state.activeTask === 'editVerify') {
    await complete(state.activeTask, { shouldEditVerify: data.shouldEditVerify });
    await complete(state.activeTask, data);
    // all other steps
  } else {
    await complete(state.activeTask, data);
  }

  // if we land on this step, need to fire another complete
  if (state.activeTask === 'showCustomizedQuoteAndContinue') {
    await complete(state.activeTask, {});
  }

  const quote = await getQuoteServiceRequest(quoteNumber);

  return {
    quote,
    state: getState()
  };
}


export default {
  createQuote,
  getQuote,
  updateQuote
};

