import { date } from '@exzeo/core-ui';
import { quoteData } from '@exzeo/core-ui/src/@Harmony';
import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';

import * as types from './actionTypes';
import * as errorActions from './errorActions';
import { toggleLoading } from './appStateActions';
import { PRODUCT_TYPES } from '../../modules/Quote/constants/quote';

export function clearQuote() {
  return {
    type: types.SET_QUOTE,
    quote: null
  };
}

export function setQuote(quote) {
  return {
    type: types.SET_QUOTE,
    quote
  };
}

/**
 * Create a quote
 * @param {string} igdID
 * @param {string} stateCode
 * @param {string} companyCode
 * @param {string} product
 * @returns {Function}
 */
export function createQuote(igdID, stateCode, companyCode, product) {
  return async dispatch => {
    dispatch(toggleLoading(true));
    try {
      const quote = await quoteData.createQuote({
        igdID,
        companyCode,
        stateCode,
        product
      });

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
export function retrieveQuote({ quoteNumber, quoteId }) {
  return async dispatch => {
    dispatch(toggleLoading(true));
    try {
      const quote = await quoteData.retrieveQuote({ quoteNumber, quoteId });

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
 * @param quote
 * @param options
 * @returns {Object}
 */
function formatQuoteForSubmit(quote, options) {
  // PolicyHolder logic -------------------------------------------------------
  // TODO this logic can be moved to its own component which will handle adding/removing policyholder info based on the additionalPolicyholder toggle
  if (options.step === 0 || options.step === 5 || options.step === 8) {
    if (!quote.additionalPolicyholder) {
      // 'additionalPolicyholder toggle is not selected, ensure we only save the primary
      quote.policyHolders = [quote.policyHolders[0]];
    }
  }
  // --------------------------------------------------------------------------

  // TODO PPRC logic: use a field watcher to set this value from the UI so we don't need to worry about it here.
  if (!quote.coverageLimits.personalProperty.value) {
    quote.coverageOptions.personalPropertyReplacementCost.answer = false;
  }

  // AF3 specific rules -------------------------------------------------------
  if (quote.product === PRODUCT_TYPES.flood) {
    // TODO setting personalPropertyDeductible to match buildingDeductible (ppd is not in UI) so we aren't 'watching' building to update it. Need to fix.
    quote.deductibles.personalPropertyDeductible.value =
      quote.deductibles.buildingDeductible.value;
    // personal property replacement cost coverage
    if (
      quote.coverageLimits.personalProperty.value <
      Math.ceil(quote.coverageLimits.building.value / 4)
    ) {
      quote.coverageOptions.personalPropertyReplacementCost.answer = false;
    }
  }
  // --------------------------------------------------------------------------

  return quote;
}

/**
 *
 * @param data
 * @param [options]
 * @returns {Function}
 */
export function updateQuote({ data = {}, options }) {
  return async function(dispatch) {
    dispatch(toggleLoading(true));
    try {
      if (data.shouldSendApplication) {
        await quoteData.sendApplication(data.quoteNumber, 'docusign');
      } else {
        const formattedQuote = formatQuoteForSubmit(data, options);
        const updatedQuote = await quoteData.updateQuote(formattedQuote);

        let quote = {};
        if (options.shouldVerifyQuote && quote.quoteState !== 'Quote Stopped') {
          quote = await quoteData.verifyQuote({
            quoteNumber: data.quoteNumber
          });
        } else {
          quote = updatedQuote;
        }

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
  return async dispatch => {
    dispatch(toggleLoading(true));
    try {
      const config = {
        service: 'quote-data',
        method: 'GET',
        path: quoteId
      };

      const response = await serviceRunner.callService(config, 'getQuote');
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
