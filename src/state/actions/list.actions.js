import * as serviceRunner from '../../utilities/serviceRunner';

import * as types from './actionTypes';
import * as listTypes from '../actionTypes/list.actionTypes';
import * as errorActions from './errorActions';
import { toggleLoading } from './appStateActions';


function setEnums(enums) {
  return {
    type: listTypes.SET_ENUMS,
    underwritingQuestions: enums.underwritingQuestions,
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


