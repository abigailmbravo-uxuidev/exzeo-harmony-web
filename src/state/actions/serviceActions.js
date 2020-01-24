import { http as axios } from '@exzeo/core-ui';
import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';
import orderBy from 'lodash/orderBy';

import { buildQuerystring } from './searchActions';
import * as listActions from '../actionTypes/list.actionTypes';
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

export const runnerSetup = (data, customUrl = '') => ({
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  url: `${process.env.REACT_APP_API_URL}/svc?${customUrl}`,
  data
});

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

export const getQuote = quoteId => dispatch => {
  const axiosConfig = runnerSetup(
    {
      service: 'quote-data',
      method: 'GET',
      path: `${quoteId}`
    },
    'getQuote'
  );

  return axios(axiosConfig)
    .then(response => {
      const data = { quote: response.data.result };
      return dispatch(serviceRequest(data));
    })
    .catch(error => {
      const message = handleError(error);
      return dispatch(errorActions.setAppError({ message }));
    });
};

export const searchPolicy = query => dispatch => {
  const queryString = buildQuerystring(query);
  const axiosConfig = runnerSetup(
    {
      service: 'policy-data',
      method: 'GET',
      path: `/transactions?${queryString}`
    },
    'searchPolicy'
  );

  return Promise.resolve(axios(axiosConfig))
    .then(response => {
      const data = { policyResults: response.data };
      return dispatch(serviceRequest(data));
    })
    .catch(error => {
      const message = handleError(error);
      return dispatch(errorActions.setAppError({ message }));
    });
};

export const clearPolicyResults = () => dispatch => {
  const data = {
    policyResults: {
      totalNumberOfRecords: 1,
      pageSize: 1,
      currentPage: 1
    }
  };

  return dispatch(serviceRequest(data));
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
    // ===== temporary until we remove this 'serviceActions' state slice
    dispatch({
      type: listActions.SET_ZIP_SETTINGS,
      zipCodeSettings: settings.zipCodeSettings || {}
    });
    // =====
    return dispatch(serviceRequest(settings));
  };
};
