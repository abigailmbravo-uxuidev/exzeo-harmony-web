import axios from 'axios';

import { callService, handleError } from './serviceRunner';

const HARD_STOP_STEPS = [
  'UWDecision1EndError', 'UWDecision2EndError',
  'UWDecision3EndError', 'UWDecision4EndError',
  'UWDecision5EndError'
];

function choreographer() {
  let state = {
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
   *
   * @param activeTask
   * @param workflowId
   * @param variables
   * @param completedTasks
   * @param underwritingReviewErrors
   * @param uiQuestions
   * @param underwritingQuestions
   */
  function setState(activeTask, workflowId, variables, completedTasks, underwritingReviewErrors, uiQuestions, underwritingQuestions) {
    state.activeTask = activeTask;
    state.variables = variables;
    state.workflowId = workflowId;
    state.completedTasks = completedTasks;
    state.underwritingExceptions = underwritingReviewErrors;
    state.uiQuestions = uiQuestions;
    state.underwritingQuestions = underwritingQuestions;
  }

  function setHardStop() {
    state.isHardStop = true;
  }

  /**
   *
   * @private
   * @param modelName
   * @param data
   * @returns {Promise<void>}
   */
  async function start(modelName, data) {
    const axiosConfig = {
      method: 'POST',
      url: `${process.env.REACT_APP_API_URL}/cg/start`,
      headers: { 'Content-Type': 'application/json' },
      data: {
        modelName,
        data
      }
    };

    const response = await axios(axiosConfig);

    const { data: { activeTask: { name: activeTaskName }, modelInstanceId, model: { variables, completedTasks } } } = response.data;
    setState(activeTaskName, modelInstanceId, variables, completedTasks);
  }

  /**
   *
   * @param stepName
   * @param data
   * @param cgEndpoint
   * @returns {Promise<void>}
   */
  async function complete(stepName, data, cgEndpoint = 'complete') {
    const axiosConfig = {
      method: 'POST',
      url: `${process.env.REACT_APP_API_URL}/cg/${cgEndpoint}`,
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

      let underwritingReviewErrors = [];
      const isHardStop = HARD_STOP_STEPS.includes(previousTask.name);
      const cgUWQuestions = variables.find(v => v.name === 'getListOfUWQuestions');
      const underwritingQuestions = cgUWQuestions ? cgUWQuestions.value.result : [];

      if (previousTask.name === 'UnderWritingReviewError' || isHardStop) {
        underwritingReviewErrors = previousTask.value.filter(uwe => !uwe.overridden);
      }

      setState(activeTask.name, modelInstanceId, variables, completedTasks, underwritingReviewErrors, uiQuestions, underwritingQuestions);
    } catch (error) {
      throw handleError(error);
    }
  }

  /**
   *
   * @private
   * @param name
   * @returns {null}
   */
  function getDataByName(name) {
    const result = state.variables.find(v => v.name === name);
    return result && result.value && result.value.result ? result.value.result : null;
  }

  function getState() {
    return state;
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
      });

      return response.data.result;
    } catch (error) {
      throw handleError(error);
    }
  }

  /**
   *
   * @param address
   * @param igdID
   * @param stateCode
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
   *
   * @param quoteNumber
   * @param quoteId
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
   * Update quote and quote state
   * @param data
   * @param quoteNumber
   * @param stepName
   * @param getReduxState
   * @returns {Promise<{quote: *, state: {activeTask: string, variables: Array, workflowId: string, completedTasks: Array, underwritingExceptions: Array, uiQuestions: Array, underwritingQuestions: Array, isHardStop: boolean}}>}
   */
  async function updateQuote({ data, quoteNumber, stepName, getReduxState }) {
    // if user refreshes it will ensure the state is synced up to the redux state;
    if (!state.activeTask) state = getReduxState().quoteState.state;

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

  return {
    createQuote,
    getQuote,
    updateQuote
  };
}

export default choreographer;

