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

export const clearPolicy = () => {
  return {
    type: types.SERVICE_REQUEST,
    data: {
      latestPolicy: {},
      getSummaryLedger: {},
      policyDocuments: []
    }
  };
};

// Temporary - serviceActions will all be removed in future.
export const initializePolicyWorkflow = policyNumber => {
  return async dispatch => {
    const policyDocumentsConfig = {
      service: 'file-index',
      method: 'GET',
      path: `v1/fileindex/${policyNumber}`
    };

    const policyConfig = {
      service: 'policy-data',
      method: 'GET',
      path: `transactions/${policyNumber}/latest`
    };

    const billingConfig = {
      service: 'summary-ledger',
      method: 'GET',
      path: `summary-ledgers/${policyNumber}/latest`
    };

    const paymentsConfig = {
      service: 'payment',
      method: 'GET',
      path: `payments/${policyNumber}`
    };

    try {
      dispatch(clearPolicy());
      const [
        documentsResponse,
        billingResponse,
        paymentResponse,
        latestPolicyResponse
      ] = await Promise.all([
        serviceRunner.callService(policyDocumentsConfig, 'getPolicyDocuments'),
        serviceRunner.callService(billingConfig, 'fetchBilling'),
        serviceRunner.callService(paymentsConfig, 'fetchPayments'),
        serviceRunner.callService(policyConfig, 'getLatestPolicy')
      ]);

      const payments = orderBy(
        paymentResponse.data,
        ['date', 'createdAt'],
        ['desc', 'desc']
      );
      const summaryLedger = { ...billingResponse.data.result, payments };
      const policyDocuments = documentsResponse.data.result;
      const latestPolicy = latestPolicyResponse.data;

      dispatch(
        serviceRequest({
          getSummaryLedger: summaryLedger,
          latestPolicy,
          policyDocuments
        })
      );

      dispatch(
        getAgentsByAgencyCode(latestPolicy.agencyCode, latestPolicy.state)
      );

      return latestPolicy;
    } catch (error) {
      errorActions.setAppError(error);
    }
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
