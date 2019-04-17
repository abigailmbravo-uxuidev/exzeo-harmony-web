import * as serviceRunner from '../../utilities/serviceRunner';

import * as types from './actionTypes';
import * as errorActions from './errorActions';
import { toggleLoading } from './appStateActions';

export function getUnderwritingQuestions(companyCode, state, product, property) {
  return async dispatch => {
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

    try {
      const response = await serviceRunner.callService(config, 'UWQuestions');

    } catch (error) {
      dispatch(errorActions.setAppError(error));
    }
  }
}
