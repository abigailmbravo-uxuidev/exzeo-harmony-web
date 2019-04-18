import * as serviceRunner from '../../utilities/serviceRunner';

import * as types from './actionTypes';
import * as listTypes from '../actionTypes/list.actionTypes';
import * as errorActions from './errorActions';
import { toggleLoading } from './appStateActions';


export function setEnums(enums) {
  return {
    type: listTypes.SET_ENUMS,
    underwritingQuestions: enums.underwritingQuestions,
  }
}

export function getEnumsForQuoteWorkflow({ companyCode, state, product, property }) {
  return async dispatch => {
    try {

      const uwQuestions = fetchUnderwritingQuestions(companyCode, state, product, property);

      const uwResponse = await uwQuestions;

      dispatch(setEnums({ underwritingQuestions: uwResponse.data.result }))

    } catch (error) {
      dispatch(errorActions.setAppError(error));
    }
  }
}


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


