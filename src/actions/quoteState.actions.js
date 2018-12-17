import * as types from './actionTypes';
import * as errorActions from './errorActions';
import choreographer from '../utilities/choreographer';

const factoryInstance = choreographer();


export const setQuote = (quote, state) => ({
  type: types.SET_QUOTE,
  quote,
  state
});

/**
 * Create a quote
 * @param {string} address
 * @param {string} igdID
 * @param {string} stateCode
 * @returns {Function}
 */
export function createQuote(address, igdID, stateCode) {
  return async (dispatch) => {
    try {
      const { quote, state } = await factoryInstance.createQuote(address, igdID, stateCode);
      dispatch(setQuote(quote, state));
      return quote;
    } catch (error) {
      dispatch(errorActions.setAppError(error));
      return null;
    }
  };
}

/**
 *
 * @param quoteNumber
 * @param quoteId
 * @returns {Function}
 */
export function getQuote(quoteNumber, quoteId) {
  return async (dispatch) => {
    try {
      const { quote, state } = await factoryInstance.getQuote(quoteNumber, quoteId);
      dispatch(setQuote(quote, state));
      return quote;
    } catch (error) {
      dispatch(errorActions.setAppError(error));
      return null;
    }
  };
}

/**
 *
 * @param data
 * @param quoteNumber
 * @param stepName
 * @returns {Function}
 */
export function updateQuote({
  data = {},
  quoteNumber,
  stepName
}) {
  return async (dispatch, getState) => {
    try {
      const { quote, state } = await factoryInstance.updateQuote({ data, quoteNumber, stepName, getReduxState: getState });
      dispatch(setQuote(quote, state));
      return quote;
    } catch (error) {
      dispatch(errorActions.setAppError(error));
      return null;
    }
  };
}

export function clearQuote() {
  return async (dispatch) => {
    try {
      dispatch(setQuote(null, {}));
    } catch (error) {
      dispatch(errorActions.setAppError(error));
    }
  };
}
