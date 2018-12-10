import axios from 'axios';
import _ from 'lodash';

import { callService } from '../utilities/serviceRunner';

function cgFactory() {
  const state = {
    activeTask: '',
    variables: [],
    workflowId: ''
  };

  function handleError(error) {
    console.log(error);
  }


  // TODO: clean this set stuff up
  function setState(activeTask, workflowId, variables) {
    state.activeTask = activeTask;
    state.variables = variables;
    state.workflowId = workflowId;
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
          const { data: { activeTask: { name: activeTaskName }, modelInstanceId, model: { variables } } } = response.data;
          setState(activeTaskName, modelInstanceId, variables);
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

    return getDataByName('createQuote');
  }

  async function retrieveQuote(quoteNumber, quoteId) {
    await start('quoteModel', { dsUrl: `${process.env.REACT_APP_API_URL}/ds` });

    await complete('search', { quoteNumber, searchType: 'quote' });
    await complete('chooseQuote', {
      quoteId
    });

    return getDataByName('retrieveQuote');
  }

  async function getQuote(quoteNumber) {
    const response = await callService({
      service: 'quote-data',
      method: 'GET',
      path: quoteNumber
    });
    return response.result;
  }

  async function updateQuote(data, quoteId) {
    await complete(state.activeTask, data);
    const quote = await getQuote(quoteId);
    return quote;
  }


  return {
    createQuote,
    retrieveQuote,
    updateQuote
  };
}

export default cgFactory;
