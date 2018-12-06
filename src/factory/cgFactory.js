import axios from 'axios';


function cgFactory() {
  const state = {
    activeTask: '',
    variables: [],
    workflowId: ''
  };

  function handleError(error) {
    console.log('errrr');
  }


  // TODO: clean this set stuff up
  function setState(activeTask, workflowId, variables) {
    state.activeTask = activeTask;
    state.variables = variables;
    state.workflowId = workflowId;
  }

  function start(modelName, data) {
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
          const { data: { activeTask: { name }, modelInstanceId, model: { variables } } } = response.data;
          setState(name, modelInstanceId, variables);
        })
        .catch(error => handleError(error));
  }

  function complete(data) {
    const axiosConfig = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/cg/complete`,
      data: {
        workflowId: state.workflowId,
        stepName: state.activeTask,
        data
      }
    };
    return axios(axiosConfig)
        .then((response) => {
          const { data: { activeTask: { name }, modelInstanceId, model: { variables } } } = response;
          setState(name, modelInstanceId, variables);
        })
        .catch(error => handleError(error));
  }

  function goToStep() {

  }

  function getDataByName(name) {
    return state.variables.find(v => v.name === name);
  }

  function getState() {
    return state;
  }


  function createQuote() {

  }

  return {
    getDataByName,
    getState
  };
}

export default cgFactory;
