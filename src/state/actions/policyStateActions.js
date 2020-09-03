import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';
import orderBy from 'lodash/orderBy';
import * as types from './actionTypes';
import { getAgentsByAgencyCode } from './agency.actions';
import * as errorActions from './errorActions';

export const resetPolicy = () => {
  return {
    type: types.RESET_POLICY
  };
};

export const setAllPolicyDocuments = ({ policy, summaryLedger, claims }) => {
  return {
    type: types.SET_POLICY,
    policy,
    summaryLedger,
    claims
  };
};

export const getAllPolicyDocuments = policyNumber => {
  return async dispatch => {
    const policyConfig = {
      service: 'policy-data',
      method: 'GET',
      path: `transactions/${policyNumber}/latest`
    };

    const billingConfig = {
      service: 'harmony-data',
      method: 'GET',
      path: `summary-ledgers/${policyNumber}/latest`
    };

    const paymentsConfig = {
      service: 'payment',
      method: 'GET',
      path: `payments/${policyNumber}`
    };

    try {
      const [
        billingResponse,
        paymentResponse,
        latestPolicyResponse
      ] = await Promise.all([
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
      const policy = latestPolicyResponse.data;

      dispatch(
        setAllPolicyDocuments({
          summaryLedger,
          policy
        })
      );

      dispatch(getAgentsByAgencyCode(policy.agencyCode, policy.state));

      return policy;
    } catch (error) {
      errorActions.setAppError(error);
    }
  };
};
