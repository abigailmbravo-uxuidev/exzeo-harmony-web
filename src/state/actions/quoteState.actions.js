import { date } from '@exzeo/core-ui';
import choreographer from '../../utilities/choreographer';
import * as serviceRunner from '../../utilities/serviceRunner';

import * as types from './actionTypes';
import * as errorActions from './errorActions';
import { toggleLoading } from './appStateActions';
import { PRODUCT_TYPES } from '../../modules/Quote/constants/quote';
import moment from 'moment-timezone';
import { STEP_NAMES } from '../../modules/Quote/constants/workflowNavigation';
import { formatDate, FORMATS, formattedDate } from '@exzeo/core-ui/src/Utilities/date';

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

/**
 * Temp function for formatting quote data to send to quote-manager
 * @param {object} data - quote data
 */
function formatQuoteForSubmit(data) {
  const quote = { ...data };
  quote.effectiveDate = date.formatToUTC(data.effectiveDate, data.property.timezone);
  // quote.effectiveDate = formattedDate(formatDate(data.effectiveDate, FORMATS.SECONDARY),FORMATS.PRIMARY_LOCALE, data.property.timezone);
  quote.policyHolders[0].electronicDelivery = data.policyHolders[0].electronicDelivery || false;
  quote.policyHolders[0].order = data.policyHolders[0].order || 0;
  quote.policyHolders[0].entityType = data.policyHolders[0].entityType || "Person";
  if (data.policyHolders[1]) {
    quote.policyHolders[1].order = data.policyHolders[1].order || 1;
    quote.policyHolders[1].entityType = data.policyHolders[1].entityType || "Person";
  }

  // Ensure that all 'source' fields are set for underwriting questions
  Object.keys(data.underwritingAnswers || {}).map((q) => {
    quote.underwritingAnswers[q].source = 'Customer';
  });


  if (data.product === PRODUCT_TYPES.flood) {
    quote.deductibles.personalPropertyDeductible.value = data.deductibles.personalPropertyDeductible.value || 500;
    quote.deductibles.buildingDeductible.value = data.deductibles.buildingDeductible.value || 500;
    quote.coverageLimits.personalProperty.value = data.coverageLimits.personalProperty.value || 100000;
    quote.coverageLimits.lossOfUse.value = data.coverageLimits.lossOfUse.value || 5000;
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
      // Using CG models for functionality that is missing in workflows
      if (options.shouldSendEmail) {
        const cgData = {
          quoteId: data._id,
          state: data.state,
          zip: data.property.physicalAddress.zip,
          emailAddress: options.customValues.email,
          toName: options.customValues.name,
        };

        await choreographer.startWorkflow('agencyEmailQuoteSummary', cgData);

      } else {
        const updatedQuote = formatQuoteForSubmit(data);
        const config = {
          exchangeName: 'harmony',
          routingKey: 'harmony.quote.updateQuote',
          data: updatedQuote,
        };

        const response = await serviceRunner.callService(config, 'quoteManager.updateQuote');
        const quote = response.data.result;
        // const { quote, state } = await choreographer.updateQuote({ data, quoteNumber, stepName, getReduxState: getState , options});
        dispatch(setQuote(quote));
        return quote;
      }
    } catch (error) {
      dispatch(errorActions.setAppError(error));
      console.log(error);
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
