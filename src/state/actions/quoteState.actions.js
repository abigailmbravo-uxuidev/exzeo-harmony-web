import { date } from '@exzeo/core-ui';
import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';

import * as types from './actionTypes';
import * as errorActions from './errorActions';
import { toggleLoading } from './appStateActions';
import { PRODUCT_TYPES } from '../../modules/Quote/constants/quote';

export function setQuote(quote) {
  return{
    type: types.SET_QUOTE,
    quote,
  };
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
      // Ensure that all 'source' fields are set for underwriting questions
      Object.keys(quote.underwritingAnswers || {}).map(q => quote.underwritingAnswers[q].source = 'Customer');

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

export function retrieveQuote({ quoteNumber, quoteId }) {
  return async (dispatch) => {
    const config = {
      exchangeName: 'harmony',
      routingKey: 'harmony.quote.retrieveQuote',
      data: {
        quoteId,
        quoteNumber
      }
    };

    try {
      dispatch(toggleLoading(true));
      const response = await serviceRunner.callService(config, 'quoteManager.retrieveQuote');
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

/**
 *
 * @param data
 * @param options
 * @returns {{additionalPolicyholder}}
 */
function formatQuoteForSubmit(data, options) {
  const quote = { ...data };
  quote.effectiveDate = date.formatToUTC(date.formatDate(data.effectiveDate, date.FORMATS.SECONDARY), data.property.timezone);

  // PolicyHolder logic -------------------------------------------------------
  // TODO this logic can be moved to its own component which will handle adding/removing policyholder info based on the additionalPolicyholder toggle
  if (options.step === 0 || options.step === 7) {
  quote.policyHolders[0].electronicDelivery = data.policyHolders[0].electronicDelivery || false;
  quote.policyHolders[0].order = data.policyHolders[0].order || 0;
  quote.policyHolders[0].entityType = data.policyHolders[0].entityType || "Person";

    if (quote.additionalPolicyholder) {
      if (data.policyHolders[1]) {
        quote.policyHolders[1].order = data.policyHolders[1].order || 1;
        quote.policyHolders[1].entityType = data.policyHolders[1].entityType || "Person";
      }
    } else {
      // 'additionalPolicyholder toggle is not selected, ensure we only save the primary
      quote.policyHolders = [quote.policyHolders[0]];
    }
  }
  // --------------------------------------------------------------------------

  if (!data.coverageLimits.personalProperty.value) {
    quote.coverageOptions.personalPropertyReplacementCost.answer = false;
  }

  // AF3 specific rules
  if (data.product === PRODUCT_TYPES.flood) {
    // currently no defaults specific to flood that we know of.
  }

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
export function updateQuote({ data = {}, quoteNumber, options }) {
  return async function(dispatch) {
    dispatch(toggleLoading(true));
    try {
      if (options.shouldSendApplication) {
        const config = {
          exchangeName: 'harmony',
          routingKey: 'harmony.quote.sendApplication',
          data: {
            quoteNumber: data.quoteNumber,
            sendType: 'docusign',
          }
        };

        await serviceRunner.callService(config, 'quoteManage.sendApplication');

      } else {
        const updatedQuote = formatQuoteForSubmit(data, options);
        const config = {
          exchangeName: 'harmony',
          routingKey: 'harmony.quote.updateQuote',
          data: updatedQuote,
        };

        const response = await serviceRunner.callService(config, 'quoteManager.updateQuote');
        const quote = response.data.result;
        if (!quote) {
          dispatch(errorActions.setAppError(response.data));
        }
        // const { quote, state } = await choreographer.updateQuote({ data, quoteNumber, stepName, getReduxState: getState , options});
        dispatch(setQuote(quote));
        return quote;
      }
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
      const quote = await fetchQuoteData(quoteId);
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
 * @param quoteId
 * @returns {Promise<{}>}
 */
export async function fetchQuoteData(quoteId) {
  try {
    const config = {
      service: 'quote-data',
      method: 'GET',
      path: quoteId
    };
    const response = await serviceRunner.callService(config, 'getQuote');
    return response.data && response.data.result ? response.data.result : {};
  } catch (error) {
    throw error;
  }
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
