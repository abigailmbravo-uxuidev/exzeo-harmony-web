import choreographer from '../../utilities/choreographer';
import * as serviceRunner from '../../utilities/serviceRunner';

import * as types from './actionTypes';
import * as errorActions from './errorActions';
import { toggleLoading } from './appStateActions';

export function setQuote(quote) {
  return{
    type: types.SET_QUOTE,
    quote,
  }
}

/**
 * Create a quote
 * @param {string} address
 * @param {string} igdID
 * @param {string} stateCode
 * @param {string} companyCode
 * @param {string} product
 * @returns {Function}
 */
export function createQuote(address, igdID, stateCode, companyCode, product) {
  return async (dispatch) => {
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
  };
}

export function retrieveQuote() {
  return async (dispatch) => {
    //...
    //...
    //...
  }
}

function formatQuoteForSubmit(data) {
  const quote = { ...data };
  quote.policyHolders[0].electronicDelivery = data.policyHolders[0].electronicDelivery || false;
  quote.policyHolders[0].order = 0;
  quote.policyHolders[0].entityType = "Person";
  if (data.policyHolders[1]) {
    quote.policyHolders[1].order = 1;
    quote.policyHolders[1].entityType = "Person";
  }

  quote.deductibles.personalPropertyDeductible.value = 500;
  quote.deductibles.buildingDeductible.value = 500;
  // quote.coverageLimits.dwelling.value = 150000;
  // quote.coverageLimits.building.value = 150000;
  quote.coverageLimits.personalProperty.value = 100000;
  quote.coverageLimits.lossOfUse.value = 5000;





  return quote;
}

/**
 *
 * @param data
 * @param quoteNumber
 * @param step
 * @param [options]
 * @returns {Function}
 */
export function updateQuote({
  data = {},
  quoteNumber,
  step,
  options
}) {
  return async (dispatch, getState) => {
    const quote = formatQuoteForSubmit(data);

    const config = {
      exchangeName: 'harmony',
      routingKey: 'harmony.quote.updateQuote',
      data: quote,
    };

    try {
      dispatch(toggleLoading(true));
      const response = await serviceRunner.callService(config, 'quoteManager.updateQuote');
      const quote = response.data.result;
      // const { quote, state } = await choreographer.updateQuote({ data, quoteNumber, stepName, getReduxState: getState , options});
      dispatch(setQuote(quote));
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
 * @returns {Function}
 */
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
