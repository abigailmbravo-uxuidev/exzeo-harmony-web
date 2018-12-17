import axios from 'axios';
import orderBy from 'lodash/orderBy';
import { batchActions } from 'redux-batched-actions';
import * as types from './actionTypes';
import * as errorActions from './errorActions';

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

export const runnerSetup = data => ({
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  url: `${process.env.REACT_APP_API_URL}/svc`,
  data
});


export const getAgents = (companyCode, state, agencyCode) => (dispatch) => {
  const axiosConfig = runnerSetup({
    service: 'agency',
    method: 'GET',
    path: `v1/agents/${companyCode}/${state}?agencyCode=${agencyCode}&status=Active`
  });

  return axios(axiosConfig).then((response) => {
    const data = { agents: response.data.result };
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

export const getAgency = (companyCode, state, agencyCode) => (dispatch) => {
  const axiosConfig = runnerSetup({
    service: 'agency',
    method: 'GET',
    path: `v1/agency/${companyCode}/${state}/${agencyCode}`
  });

  return axios(axiosConfig).then((response) => {
    const data = { agency: response.data.result };
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

export const getAgentsByAgency = (companyCode, state, agencyCode) => (dispatch) => {
  const axiosConfig = runnerSetup({
    service: 'agency',
    method: 'GET',
    path: `v1/agents/${companyCode}/${state}?agencyCode=${agencyCode}`
  });

  return Promise.resolve(axios(axiosConfig)).then((response) => {
    const data = { agents: response.data.result };
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

export const getAgencies = (companyCode, state) => (dispatch) => {
  const axiosConfig = runnerSetup({
    service: 'agency',
    method: 'GET',
    path: `v1/agencies/${companyCode}/${state}`
  });

  return axios(axiosConfig).then((response) => {
    const data = { agencies: response.data.result };
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

export const getQuote = quoteId => (dispatch) => {
  const axiosConfig = runnerSetup({
    service: 'quote-data',
    method: 'GET',
    path: `${quoteId}`
  });

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

export const searchPolicy = (policyNumber, firstName, lastName, address, pageNumber, pageSize, sort, direction) => (dispatch) => {
  const formattedAddress = address.replace(' ', '&#32;');
  const axiosConfig = runnerSetup({
    service: 'policy-data',
    method: 'GET',
    path: `/transactions?companyCode=TTIC&state=FL&product=HO3&policyNumber=${policyNumber}&firstName=${firstName}&lastName=${lastName}&propertyAddress=${formattedAddress.replace(' ', '&#32;')}&page=${pageNumber}&pageSize=${pageSize}&sort=${sort}&sortDirection=${direction}`
  });

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
  const data = { policyResults: {
    totalNumberOfRecords: 1,
    pageSize: 1,
    currentPage: 1
  } };
  return dispatch(batchActions([
    serviceRequest(data)
  ]));
};

export const getLatestPolicy = policyNumber => (dispatch) => {
  const axiosConfig = runnerSetup({
    service: 'policy-data',
    method: 'GET',
    path: `transactions/${policyNumber}/latest`
  });

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

export const getSummaryLedger = policyNumber => async (dispatch) => {
  const fetchBilling = runnerSetup({
    service: 'billing',
    method: 'GET',
    path: `summary-ledgers/${policyNumber}/latest`
  });

  const fetchPayments = runnerSetup({
    service: 'billing',
    method: 'GET',
    path: `payment-history/${policyNumber}`
  });

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
  });

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

export const getZipcodeSettings = (companyCode, state, product, zip) => (dispatch) => {
  const axiosConfig = runnerSetup({
    service: 'underwriting',
    method: 'GET',
    path: `zip-code?companyCode=${companyCode}&state=${state}&product=${product}&zip=${zip}`
  });

  return axios(axiosConfig).then((response) => {
    const data = { zipCodeSettings: response.data && response.data.result ? response.data.result[0] : { timezone: '' } };
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
