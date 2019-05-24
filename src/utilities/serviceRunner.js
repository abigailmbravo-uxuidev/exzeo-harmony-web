import { http as axios } from '@exzeo/core-ui';

/**
 * Format errors
 * @param {object|string} err
 * @returns {*|{message: (*|string)}|{message: string}}
 */
export function handleError(err) {
    // return default error message if non exists
  if (!err) return { message: 'An error occurred that was not handled properly.' };

  let error = err.response && err.response.data ? err.response.data : err;
    // if error is a string, convert to an object
  if (typeof error === 'string') error = { message: error };
    // format error if needed
  if (!error.message) error.message = 'There was an error.';
  return error;
}

/**
 *
 * @param {object} data
 * @param {string} [customUrl]
 * @returns {Promise<void>}
 */
export async function callService(data, customUrl = '') {
  const axiosConfig = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    url: `${process.env.REACT_APP_API_URL}/svc?${customUrl}`,
    data
  };

  try {
    const response = await axios(axiosConfig);
    return response;
  } catch (error) {
    throw new Error(handleError(error));
  }
}

/**
 *
 * @param data
 * @returns {Promise<void>}
 */
export async function callQuestions(data) {
  const axiosConfig = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    url: `${process.env.REACT_APP_API_URL}/questions`,
    data
  };

  try {
    const response = await axios(axiosConfig);
    return response;
  } catch (error) {
    throw handleError(error);
  }
}
