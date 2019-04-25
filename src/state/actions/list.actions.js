import { date } from '@exzeo/core-ui';
import * as serviceRunner from '../../utilities/serviceRunner';

import * as types from './actionTypes';
import * as listTypes from '../actionTypes/list.actionTypes';
import * as errorActions from './errorActions';
import { toggleLoading } from './appStateActions';
import { setAppError } from './errorActions';


function setEnums(enums) {
  return {
    type: listTypes.SET_ENUMS,
    underwritingQuestions: enums.underwritingQuestions,
  }
}

function setBillingOptions(billingOptions, quote) {
  return {
    type: listTypes.SET_BILLING_OPTIONS,
    billingOptions,
    quote
  }
}

/**
 *
 * @param companyCode
 * @param state
 * @param product
 * @param property
 * @returns {Function}
 */
export function getEnumsForQuoteWorkflow({ companyCode, state, product, property }) {
  return async dispatch => {
    try {
      // this pattern sets us up to "parallelize" the network requests in this function. We want to
      // fetch all enums/data needed for the quote workflow in here.
      // 1. assign async function(s) to variable(s) - calls the func
      const uwQuestions = fetchUnderwritingQuestions(companyCode, state, product, property);
      // 2. new variable awaits the previous.
      const uwResponse = await uwQuestions;

      dispatch(setEnums({ underwritingQuestions: uwResponse.data.result }))

    } catch (error) {
      dispatch(errorActions.setAppError(error));
    }
  }
}

/**
 *
 * @param companyCode
 * @param state
 * @param product
 * @param property
 * @returns {Promise<void>}
 */
export async function fetchUnderwritingQuestions(companyCode, state, product, property) {
    const config = {
      service: 'questions',
      method: 'POST',
      path: 'questions/uw',
      data: {
        model: 'quote',
        step: 'askUWAnswers',
        quote: {
          companyCode,
          state,
          product,
          property
        }
      }
    };

    const response = await serviceRunner.callService(config, 'UWQuestions');
    return response;
}

/**
 *
 * @param quote
 * @returns {Function}
 */
export function getBillingOptions(quote) {
  return async dispatch => {

    try {
      const config = {
        service: 'billing',
        method: 'POST',
        path: 'payment-options-for-quoting',
        data: {
          effectiveDate: date.formatToUTC(quote.effectiveDate, quote.property.timezone),
          policyHolders: quote.policyHolders,
          additionalInterests: quote.additionalInterests,
          netPremium: quote.rating.netPremium,
          totalPremium: quote.rating.totalPremium,
          fees: {
            empTrustFee: quote.rating.worksheet.fees.empTrustFee,
            mgaPolicyFee: quote.rating.worksheet.fees.mgaPolicyFee
          }
        }
      };

      const response = await serviceRunner.callService(config, 'getBillingOptions');
      dispatch(setBillingOptions(response.data.result, quote));
    } catch (error) {
      dispatch(setAppError(error));
    }
  };
}

