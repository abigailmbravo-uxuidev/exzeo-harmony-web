import axios from 'axios';

import { callService, handleError } from '../utilities/serviceRunner';

function cgFactory() {
  let state = {
    activeTask: '',
    variables: [],
    workflowId: '',
    completedTasks: [],
    underwritingExceptions: [],
    uiQuestions: [],
    underwritingQuestions: []
  };

  // TODO: clean this set stuff up
  function logError(error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('----- CG ERROR -----');
      console.error(error);
      console.error('----- CG ERROR -----');
    }
  }

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
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        modelName,
        data
      },
      url: `${process.env.REACT_APP_API_URL}/cg/start`
    };

    return axios(axiosConfig)
        .then((response) => {
          const { data: { activeTask: { name: activeTaskName }, modelInstanceId, model: { variables, completedTasks } } } = response.data;
          setState(activeTaskName, modelInstanceId, variables, completedTasks);
        })
        .catch(error => handleError(error));
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
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/cg/${cgEndpoint}`,
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
          activeTask: {
            name: activeTaskName
          },
          modelInstanceId,
          model: {
            variables,
            completedTasks
          }
        }
      } = response.data;

      let underwritingReviewErrors = [];
      let underwritingQuestions = [];

      if (previousTask.name === 'UnderwritingReviewError') {
        underwritingReviewErrors = previousTask.value.filter(uwe => !uwe.overridden);
      }

      const cgUWQuestions = variables.find(v => v.name === 'getListOfUWQuestions');
      if (cgUWQuestions) {
        underwritingQuestions = cgUWQuestions.value.result;
      }
      setState(activeTaskName, modelInstanceId, variables, completedTasks, underwritingReviewErrors, uiQuestions, underwritingQuestions);

      if (activeTaskName === 'showCustomizedQuoteAndContinue') {
        await complete(activeTaskName, {});
      }
    } catch (error) {
      return logError(error);
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
      handleError(error);
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
   *
   * @param data
   * @param quoteId
   * @param getReduxState
   * @returns {Promise<{quote: *, state: {activeTask: string, variables: Array, workflowId: string, completedTasks: Array}}>}
   */
  async function updateQuote(data, quoteNumber, getReduxState) {
    // if user refreshes it will ensure the state is synced up to the redux state;
    if (!state.activeTask) state = getReduxState().quoteState.state;

    if (state.activeTask === 'askToCustomizeDefaultQuote' && data.recalc) {
      await complete(state.activeTask, { shouldCustomizeQuote: 'Yes' });
      await complete(state.activeTask, data);
    } else if (state.activeTask === 'askToCustomizeDefaultQuote' && !data.recalc) {
      await complete(state.activeTask, { shouldCustomizeQuote: 'No' });
    } else if (state.activeTask === 'sendEmailOrContinue' && data.shouldSendEmail === 'Yes') {
      await complete(state.activeTask, { shouldSendEmail: 'Yes' });
      await complete(state.activeTask, data);
    } else if (state.activeTask === 'editVerify' && data.shouldEditVerify === 'false') {
      await complete(state.activeTask, { shouldEditVerify: 'false' });
      await complete(state.activeTask, data);
    } else {
      await complete(state.activeTask, data);
    }

    const quote = await getQuoteServiceRequest(quoteNumber);
    return {
      quote,
      state: getState()
    };
  }

  /**
   *
   * @param stepName
   * @param quoteNumber
   * @returns {Promise<{quote: *, state: {activeTask: string, variables: Array, workflowId: string, completedTasks: Array, underwritingExceptions: Array, uiQuestions: Array, underwritingQuestions: Array}}>}
   */
  async function goToStep(stepName, quoteNumber) {
    try {
      await complete(stepName, null, 'moveToTask');

      const quote = await getQuoteServiceRequest(quoteNumber);
      return {
        quote,
        state: getState()
      };
    } catch (error) {
      logError(error);
    }
  }

  return {
    createQuote,
    getQuote,
    updateQuote,
    goToStepDontUseThisInComponents: goToStep
  };
}

export default cgFactory;

