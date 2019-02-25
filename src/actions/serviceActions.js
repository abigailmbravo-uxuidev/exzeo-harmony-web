import axios from 'axios';
import orderBy from 'lodash/orderBy';
import { batchActions } from 'redux-batched-actions';
import * as types from './actionTypes';
import * as errorActions from './errorActions';
import * as listActions from '../state/actionTypes/list.actionTypes';

export const handleError = (error) => {
  const message = error.response && error.response.data && error.response.data.error
    ? error.response.data.error.message
    : 'An error happened';
  return (error.message) ? error.message : message;
};

export const serviceRequest = data => ({
  type: types.SERVICE_REQUEST,
  data
});

export const runnerSetup = (data, customUrl = '') => ({
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  url: `${process.env.REACT_APP_API_URL}/svc?${customUrl}`,
  data
});

export const getQuote = quoteId => (dispatch) => {
  const axiosConfig = runnerSetup({
    service: 'quote-data',
    method: 'GET',
    path: `${quoteId}`
  }, 'getQuote');

  return axios(axiosConfig).then((response) => {
    const data = { quote: response.data.result };
    return dispatch(batchActions([
      serviceRequest(data)
    ]));
  })
    .catch((error) => {
      const message = handleError(error);
      return dispatch(batchActions([
        errorActions.setAppError({ message })
      ]));
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

  return Promise.resolve(axios(axiosConfig)).then((response) => {
    const data = { policyResults: response.data };
    return dispatch(batchActions([
      serviceRequest(data)
    ]));
  })
    .catch((error) => {
      const message = handleError(error);
      return dispatch(batchActions([
        errorActions.setAppError({ message })
      ]));
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
  return dispatch(batchActions([
    serviceRequest(data)
  ]));
};

export const getLatestPolicy = policyNumber => (dispatch) => {
  const axiosConfig = runnerSetup({
    service: 'policy-data',
    method: 'GET',
    path: `transactions/${policyNumber}/latest`
  }, 'getLatestPolicy');

  return Promise.resolve(axios(axiosConfig)).then((response) => {
    const data = { latestPolicy: response ? response.data : {} };
    dispatch(batchActions([
      serviceRequest(data)
    ]));
    return data.latestPolicy;
  })
    .catch((error) => {
      const message = handleError(error);
      return dispatch(batchActions([
        errorActions.setAppError({ message })
      ]));
    });
};

// Temporary to fix bug. serviceActions will all be removed in future.
export const clearPolicy = () => {
  return {
    type: types.SERVICE_REQUEST,
    data: {
      latestPolicy: {},
      getSummaryLedger: {},
      policyDocuments: [],
    }
  }
};

export const getSummaryLedger = policyNumber => async (dispatch) => {
  const fetchBilling = runnerSetup({
    service: 'billing',
    method: 'GET',
    path: `summary-ledgers/${policyNumber}/latest`
  }, 'fetchBilling');

  const fetchPayments = runnerSetup({
    service: 'billing',
    method: 'GET',
    path: `payment-history/${policyNumber}`
  }, 'fetchPayments');

  try {
    const [billing, paymentHistory] = await Promise.all([axios(fetchBilling), axios(fetchPayments)]);
    const payments = orderBy(paymentHistory.data.result, ['date', 'createdAt'], ['desc', 'desc']);
    const getSummaryLedger = { ...billing.data.result, payments };
    return dispatch(batchActions([
      serviceRequest({ getSummaryLedger })
    ]));
  } catch (error) {
    const message = handleError(error);
    return dispatch(batchActions([
      errorActions.setAppError({ message })
    ]));
  }
};

export const getPolicyDocuments = policyNumber => (dispatch) => {
  const axiosConfig = runnerSetup({
    service: 'file-index',
    method: 'GET',
    path: `v1/fileindex/${policyNumber}`
  }, 'getPolicyDocuments');

  return axios(axiosConfig).then((response) => {
    const data = { policyDocuments: response.data.result };
    return dispatch(batchActions([
      serviceRequest(data)
    ]));
  })
    .catch((error) => {
      const message = handleError(error);
      return dispatch(batchActions([
        errorActions.setAppError({ message })
      ]));
    });
};

export const getZipcodeSettings = (companyCode = 'TTIC', state = 'FL', product = 'HO3', zip) => (dispatch) => {
  const axiosConfig = runnerSetup({
    service: 'underwriting',
    method: 'GET',
    path: `zip-code?companyCode=${companyCode}&state=${state}&product=${product}&zip=${zip}`
  }, 'getZipcodeSettings');

  return axios(axiosConfig).then((response) => {
    const data = { zipCodeSettings: response.data && response.data.result ? response.data.result[0] : { timezone: '' } };
    // ===== temporary until we remove this 'serviceActions' state slice
    dispatch({
      type: listActions.SET_ZIP_SETTINGS,
      zipCodeSettings: data.zipCodeSettings || {},
    });
    // =====
    return dispatch(batchActions([
      serviceRequest(data)
    ]));
  })
    .catch((error) => {
      const message = handleError(error);
      return dispatch(batchActions([
        errorActions.setAppError(message)
      ]));
    });
};
