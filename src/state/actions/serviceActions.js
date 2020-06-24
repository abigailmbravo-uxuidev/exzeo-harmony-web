import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';
import orderBy from 'lodash/orderBy';

import * as types from './actionTypes';
import * as errorActions from './errorActions';
import { getAgentsByAgencyCode } from './agency.actions';

export const handleError = error => {
  const message =
    error.response && error.response.data && error.response.data.error
      ? error.response.data.error.message
      : 'An error happened';
  return error.message ? error.message : message;
};

export const serviceRequest = data => {
  return {
    type: types.SERVICE_REQUEST,
    data
  };
};

export const getZipcodeSettings = quote => {
  return async dispatch => {
    const data = {
      companyCode: quote.companyCode,
      state: quote.state,
      product: quote.product,
      propertyId: quote.property.id,
      document: quote
    };

    const config = {
      exchangeName: 'harmony.crud',
      routingKey: 'harmony.crud.zipcode-data.getZipCode',
      data
    };

    const response = await serviceRunner
      .callService(config, 'getZipcodeSettings')
      .catch(error => {
        const message = handleError(error);
        return dispatch(errorActions.setAppError(message));
      });

    const settings = {
      zipCodeSettings:
        response.data && response.data.result
          ? response.data.result
          : { timezone: '' }
    };
    // // ===== temporary until we remove this 'serviceActions' state slice
    // dispatch({
    //   type: listActions.SET_ZIP_SETTINGS,
    //   zipCodeSettings: settings.zipCodeSettings || {}
    // });
    // // =====
    return dispatch(serviceRequest(settings));
  };
};
