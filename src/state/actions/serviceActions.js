import { http as axios } from '@exzeo/core-ui';
import orderBy from 'lodash/orderBy';

import * as serviceRunner from '../../utilities/serviceRunner';
import * as listActions from '../actionTypes/list.actionTypes';
import * as types from './actionTypes';
import * as errorActions from './errorActions';
import { getAgentsByAgencyCode } from './agency.actions';

export const handleError = (error) => {
  const message = error.response && error.response.data && error.response.data.error
    ? error.response.data.error.message
    : 'An error happened';
  return (error.message) ? error.message : message;
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
      policyDocuments: [],
    }
  };
};


export const getQuote = quoteId => (dispatch) => {
  const axiosConfig = runnerSetup({
    service: 'quote-data',
    method: 'GET',
    path: `${quoteId}`
  }, 'getQuote');

  return axios(axiosConfig).then((response) => {
    const data = { quote: response.data.result };
    return dispatch(serviceRequest(data));
  })
    .catch((error) => {
      const message = handleError(error);
      return dispatch(errorActions.setAppError({ message }));
    });
};

export const searchPolicy = ({
  policyNumber,
  firstName,
  lastName,
  address,
  page,
  pageSize,
  sort,
  direction,
  companyCode = 'TTIC',
  state = 'FL',
  product = 'HO3',
}) => (dispatch) => {

  const formattedAddress = address.replace(' ', '&#32;');
  const axiosConfig = runnerSetup({
    service: 'policy-data',
    method: 'GET',
    path: `/transactions?companyCode=${companyCode}&state=${state}&product=${product}&policyNumber=${policyNumber}&firstName=${firstName}&lastName=${lastName}&propertyAddress=${formattedAddress.replace(' ', '&#32;')}&page=${page}&pageSize=${pageSize}&sort=${sort}&sortDirection=${direction}`
  }, 'searchPolicy');

  return Promise.resolve(axios(axiosConfig))
    .then((response) => {
      const data = { policyResults: response.data };
      return dispatch(serviceRequest(data));
    })
    .catch((error) => {
      const message = handleError(error);
      return dispatch(errorActions.setAppError({ message }));
    });
};

export const clearPolicyResults = () => (dispatch) => {
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
export const initializePolicyWorkflow = (policyNumber) => {
  return async (dispatch) => {
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
      service: 'billing',
      method: 'GET',
      path: `summary-ledgers/${policyNumber}/latest`
    };

    const paymentsConfig = {
      service: 'billing',
      method: 'GET',
      path: `payment-history/${policyNumber}`
    };

    try {
      const [documentsResponse, billingResponse, paymentResponse, latestPolicyResponse] = await Promise.all([
        serviceRunner.callService(policyDocumentsConfig, 'getPolicyDocuments'),
        serviceRunner.callService(billingConfig, 'fetchBilling'),
        serviceRunner.callService(paymentsConfig, 'fetchPayments'),
        serviceRunner.callService(policyConfig, 'getLatestPolicy'),
      ]);

      const payments = orderBy(paymentResponse.data.result, ['date', 'createdAt'], ['desc', 'desc']);
      const summaryLedger = { ...billingResponse.data.result, payments };
      const policyDocuments = documentsResponse.data.result;
      const latestPolicy = latestPolicyResponse.data;

      dispatch(serviceRequest({
        getSummaryLedger: summaryLedger,
        latestPolicy,
        policyDocuments,
      }));

      dispatch(getAgentsByAgencyCode(latestPolicy.agencyCode));

      return latestPolicy;
    } catch (error) {
      errorActions.setAppError(error);
    }
  }
};

export const getZipcodeSettings = (companyCode = 'TTIC', state = 'FL', product = 'HO3', zip) => {
  return (dispatch) => {
    const axiosConfig = runnerSetup({
      service: 'underwriting',
      method: 'GET',
      path: `zip-code?companyCode=${companyCode}&state=${state}&product=${product}&zip=${zip}`
    }, 'getZipcodeSettings');

    return axios(axiosConfig)
      .then((response) => {
        const data = { zipCodeSettings: response.data && response.data.result ? response.data.result[0] : { timezone: '' } };
        // ===== temporary until we remove this 'serviceActions' state slice
        dispatch({
          type: listActions.SET_ZIP_SETTINGS,
          zipCodeSettings: data.zipCodeSettings || {},
        });
        // =====
        return dispatch(serviceRequest(data));
      })
      .catch((error) => {
        const message = handleError(error);
        return dispatch(errorActions.setAppError(message));
      });
  };
};
