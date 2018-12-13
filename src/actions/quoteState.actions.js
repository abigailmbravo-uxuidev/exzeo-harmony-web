import * as types from './actionTypes';
import * as errorActions from './errorActions';
import cgFactory from '../factory/cgFactory';

const factoryInstance = cgFactory();


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

export function goToStep(stepName, quoteNumber) {
  return async (dispatch, getState) => {
    try {
      const { quote, state } = await factoryInstance.goToStepDontUseThisInComponents(stepName, quoteNumber, getState);
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
