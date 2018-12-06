import axios from 'axios';

export default function handleError(err) {
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
 * @param data
 * @returns {Promise<void>}
 */
export async function callService(data) {
  const axiosConfig = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    url: `${process.env.REACT_APP_API_URL}/svc`,
    data
  };

  try {
    const response = await axios(axiosConfig);
    return response;
  } catch (error) {
    throw handleError(error);
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
