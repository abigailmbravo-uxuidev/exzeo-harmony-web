import axios from 'axios';

import { callService } from '../utilities/serviceRunner';

function cgFactory() {
  let state = {
    activeTask: '',
    variables: [],
    workflowId: '',
    completedTasks: [],
    underwritingExceptions: []
  };

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
  async function updateQuote(data, quoteId, getReduxState) {
    // if user refreshes it will ensure the state is synced up to the redux state;
    if (!state.activeTask) state = getReduxState().quoteState.state;

    if (state.activeTask === 'askToCustomizeDefaultQuote' && data.recalc) {
      await complete(state.activeTask, { shouldCustomizeQuote: 'Yes' });
      await complete(state.activeTask, data);
    } else if (state.activeTask === 'askToCustomizeDefaultQuote' && !data.recalc) {
      await complete(state.activeTask, { shouldCustomizeQuote: 'No' });
    } else {
      await complete(state.activeTask, data);
    }
    const quote = await getQuoteServiceRequest(quoteId);
    return {
      quote,
      state: getState()
    };
  }

  function handleError(error) {
    console.log(error);
  }


  // TODO: clean this set stuff up
  /**
   *
   * @private
   * @param activeTask
   * @param workflowId
   * @param variables
   * @param completedTasks
   * @param underwritingReviewErrors
   */
  function setState(activeTask, workflowId, variables, completedTasks, underwritingReviewErrors) {
    state.activeTask = activeTask;
    state.variables = variables;
    state.workflowId = workflowId;
    state.completedTasks = completedTasks;
    state.underwritingExceptions = underwritingReviewErrors;
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
          const { data: { activeTask: { name: activeTaskName }, modelInstanceId, model: { variables } } } = response.data;
          setState(activeTaskName, modelInstanceId, variables);
        })
        .catch(error => handleError(error));
  }

  /**
   *
   * @private
   * @param stepName
   * @param data
   * @returns {Promise<void>}
   */
  async function complete(stepName, data) {
    const axiosConfig = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/cg/complete`,
      data: {
        workflowId: state.workflowId,
        stepName,
        data
      }
    };
    return axios(axiosConfig)
        .then((response) => {
          const { data: { previousTask = {}, activeTask: { name: activeTaskName }, modelInstanceId, model: { variables, completedTasks } } } = response.data;
          let underwritingReviewErrors = [];

          if (previousTask.name === 'UnderwritingReviewError') {
            underwritingReviewErrors.concat(previousTask.value.filter(uwe => !uwe.overridden))
          }

          setState(activeTaskName, modelInstanceId, variables, completedTasks, underwritingReviewErrors);
        })
        .catch(error => handleError(error));
  }

//   function goToStep() {

//   }

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
   *
   * @private
   * @param quoteNumber
   * @returns {Promise<*>}
   */
  async function getQuoteServiceRequest(quoteNumber) {
    const response = await callService({
      service: 'quote-data',
      method: 'GET',
      path: quoteNumber
    });
    return response.data.result;
  }

  return {
    createQuote,
    getQuote,
    updateQuote
  };
}

export default cgFactory;
