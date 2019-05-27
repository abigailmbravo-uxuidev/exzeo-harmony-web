import {http as axios} from '@exzeo/core-ui';
import {formatError} from '@exzeo/core-ui/src/@Harmony';

/**
 *
 * @param modelName
 * @param data
 * @returns {Promise<initialState.cg.bb.data.previousTask.value.result|{IndexResult}|props.tasks.bb.data.previousTask.value.result|initialState.cg.bb.data.previousTask.value.result|{quotes}|Array|*>}
 */
export const startWorkflow = async (modelName, data) => {
  try {
    const axiosConfig = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/cg/start?${modelName}`,
      data: {
        modelName,
        data
      },
    };

    const result = await axios(axiosConfig);
    return result.data.data.previousTask.value.result;
  } catch (error) {
    throw formatError(error);
  }
};

export default {
  startWorkflow,
};

