import * as types from './actionTypes';
import * as errorActions from './errorActions';
import cgFactory from '../factory/cgFactory';

const factoryInstance = cgFactory();

export const setCreateQuote = data => ({
  type: types.CREATE_QUOTE,
  quote: {
    ...data
  }
});

export const setRetrieveQuote = data => ({
  type: types.RETRIEVE_QUOTE,
  quote: {
    ...data
  }
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
      dispatch(setCreateQuote(quoteData));
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
      dispatch(setRetrieveQuote(quoteData));
      return quoteData;
    } catch (error) {
      dispatch(errorActions.setAppError(error));
      return null;
    }
  };
}

