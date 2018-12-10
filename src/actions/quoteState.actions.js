import * as types from './actionTypes';
import * as errorActions from './errorActions';
import cgFactory from '../factory/cgFactory';

const factoryInstance = cgFactory();


export const setQuote = data => ({
  type: types.SET_QUOTE,
  quote: data
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
      const quoteData = await factoryInstance.createQuote(address, igdID, stateCode);
      dispatch(setQuote(quoteData));
      return quoteData;
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
export function retrieveQuote(quoteNumber, quoteId) {
  return async (dispatch) => {
    try {
      const quoteData = await factoryInstance.retrieveQuote(quoteNumber, quoteId);
      dispatch(setQuote(quoteData));
      return quoteData;
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
  return async (dispatch) => {
    try {
      const quoteData = await factoryInstance.updateQuote(data, quoteNumber);
      dispatch(setQuote(quoteData));
      return quoteData;
    } catch (error) {
      dispatch(errorActions.setAppError(error));
      return null;
    }
  };
}
