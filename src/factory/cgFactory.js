import axios from 'axios';
import _ from 'lodash';

import { callService } from '../utilities/serviceRunner';

function cgFactory() {
  let state = {
    activeTask: '',
    variables: [],
    workflowId: '',
    completedTasks: []
  };

  function handleError(error) {
    console.log(error);
  }


  // TODO: clean this set stuff up
  function setState(activeTask, workflowId, variables, completedTasks) {
    state.activeTask = activeTask;
    state.variables = variables;
    state.workflowId = workflowId;
    state.completedTasks = completedTasks;
  }

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
          const { data: { activeTask: { name: activeTaskName }, modelInstanceId, model: { variables, completedTasks } } } = response.data;
          setState(activeTaskName, modelInstanceId, variables, completedTasks);
        })
        .catch(error => handleError(error));
  }

//   function goToStep() {

//   }

  function getDataByName(name) {
    const result = state.variables.find(v => v.name === name);
    return result && result.value && result.value.result ? result.value.result : null;
  }

  function getState() {
    return state;
  }

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

  async function getQuoteServiceRequest(quoteNumber) {
    const response = await callService({
      service: 'quote-data',
      method: 'GET',
      path: quoteNumber
    });
    return response.data.result;
  }

  async function updateQuote(data, quoteId, getReduxState) {
    // if user refreshes it will ensure the state is synced up to the redux state;
    if (!state.activeTask) state = getReduxState().quoteState.state;

    await complete(state.activeTask, data);
    const quote = await getQuoteServiceRequest(quoteId);
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

export default cgFactory;
