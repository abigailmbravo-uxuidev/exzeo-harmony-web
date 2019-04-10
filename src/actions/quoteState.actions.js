import * as types from './actionTypes';
import * as errorActions from './errorActions';
import choreographer from '../utilities/choreographer';
import * as serviceRunner from '../utilities/serviceRunner';
import { toggleLoading } from './appStateActions';

export const setQuote = (quote, state = {}) => ({
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
export function createQuote(address, igdID, stateCode, companyCode, product) {
  // if (product === 'AF3') {
  //   config.exchangeName = 'harmony.crud';
  //   config.routingKey = 'harmony.crud.quoteData.createQuote',
  //     config.data = {
  //       companyCode,
  //       state,
  //       product,
  //
  //     }


  return async (dispatch) => {
    if (product === 'AF3') {
      const config = {
        exchangeName: 'harmony',
        routingKey: 'harmony.quote.createQuote',
        data: {
          companyCode,
          state: stateCode,
          product,
          propertyId: igdID,
        }
      };

      try {
        dispatch(toggleLoading(true));
        const response = await serviceRunner.callService(config, 'quoteManager.createQuote');
        const quote = response.data.result;
        dispatch(setQuote(quote));
        return quote;
      } catch (error) {
        dispatch(errorActions.setAppError(error));
        return null;
      } finally {
        dispatch(toggleLoading(false));
      }

    } else {
      try {
        dispatch(toggleLoading(true));
        const { quote, state } = await choreographer.createQuote(address, igdID, stateCode);
        dispatch(setQuote(quote, state));
        return quote;

      } catch (error) {
        dispatch(errorActions.setAppError(error));
        return null;
      } finally {
        dispatch(toggleLoading(false));
      }
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
      dispatch(toggleLoading(true));
      const { quote, state } = await choreographer.getQuote(quoteNumber, quoteId);
      dispatch(setQuote(quote, state));
      return quote;
    } catch (error) {
      dispatch(errorActions.setAppError(error));
      return null;
    } finally {
      dispatch(toggleLoading(false));
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
  stepName,
  options
}) {
  return async (dispatch, getState) => {
    try {
      dispatch(toggleLoading(true));
      const { quote, state } = await choreographer.updateQuote({ data, quoteNumber, stepName, getReduxState: getState , options});
      dispatch(setQuote(quote, state));
      return quote;
    } catch (error) {
      dispatch(errorActions.setAppError(error));
      return null;
    } finally {
      dispatch(toggleLoading(false));
    }
  };
}

export function clearQuote() {
  return async (dispatch) => {
    try {
      dispatch(toggleLoading(true));
      dispatch(setQuote(null, {}));
    } catch (error) {
      dispatch(errorActions.setAppError(error));
    } finally {
      dispatch(toggleLoading(false));
    }
  };
}
