import * as types from './actionTypes';
import * as errorActions from './errorActions';
import cgFactory from '../factory/cgFactory';

const factoryInstance = cgFactory();


export const setQuote = (quoteData, state) => ({
  type: types.SET_QUOTE,
  quote: quoteData,
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
 * Retrieve a quote
 * @param {string} quoteNumber
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
 * Retrieve a quote
 * @param {object} data
 * @param {string} quoteNumber
 * @returns {Function}
 */
export function updateQuote(data, quoteNumber) {
  return async (dispatch, getState) => {
    try {
      const { quote, state } = await factoryInstance.updateQuote(data, quoteNumber, getState);
      dispatch(setQuote(quote, state));
      return quote;
    } catch (error) {
      dispatch(errorActions.setAppError(error));
      return null;
    }
  };
}
