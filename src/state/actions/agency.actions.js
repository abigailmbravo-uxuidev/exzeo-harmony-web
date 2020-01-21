/* eslint-disable no-use-before-define */
import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';

import * as types from './actionTypes';
import * as errorActions from './errorActions';
/**
 *
 * @param agencies
 * @returns {{type: string, agencies: *}}
 */
export function setAgencies(agencies) {
  return {
    type: types.SET_AGENCIES,
    agencies
  };
}

/**
 *
 * @param agency
 * @returns {{type: string, agency: *}}
 */
export function setAgency(agency) {
  return {
    type: types.SET_AGENCY,
    agency
  };
}

/**
 *
 * @param agents
 * @returns {{type: string, agents: *}}
 */
export function setAgents(agents) {
  return {
    type: types.SET_AGENTS,
    agents
  };
}

/**
 *
 * @param contracts
 * @returns {Array}
 */
function getSelectOptions(contracts) {
  const states = [];
  const products = [];
  const list = [];
  contracts.forEach(contract => {
    contract.stateProducts.forEach(stateProduct => {
      const { state, product } = stateProduct;
      if (!list.includes(state)) {
        list.push(state);
        states.push({ answer: state, label: state });
      }
      if (!list.includes(product)) {
        list.push(product);
        products.push({
          answer: product,
          label: product === 'AF3' ? 'Flood' : product
        });
      }
    });
  });
  return { states, products };
}

/**
 *
 * @param agencyCode
 * @returns {Function}
 */
export function getAgency(agencyCode) {
  return async dispatch => {
    try {
      const agency = await fetchAgency(agencyCode);
      const cspAnswers = getSelectOptions(agency.contracts);
      agency.cspAnswers = cspAnswers;
      dispatch(setAgency(agency));
    } catch (error) {
      dispatch(errorActions.setAppError(error));
    }
  };
}

/**
 *
 * @param agencyCode
 * @returns {Function}
 */
export function getAgentsByAgencyCode(agencyCode, state) {
  console.log('wow');
  return async dispatch => {
    try {
      const agents = await fetchAgentsByAgencyCode(agencyCode, state);
      dispatch(setAgents(agents));
    } catch (error) {
      dispatch(errorActions.setAppError(error));
    }
  };
}
/**
 *
 * @param agencyCode
 * @returns {Promise<{}>}
 */
export async function fetchAgency(agencyCode) {
  try {
    const config = {
      service: 'agency',
      method: 'GET',
      path: `agencies/${agencyCode}`
    };
    const response = await serviceRunner.callService(config, 'fetchAgency');
    return response.data && response.data.result ? response.data.result : {};
  } catch (error) {
    throw error;
  }
}

/**
 *
 * @param agencyCode
 * @returns {Promise<Array>}
 */
export async function fetchAgentsByAgencyCode(agencyCode, state = 'FL') {
  try {
    const config = {
      service: 'agency',
      method: 'GET',
      path: `agencies/${agencyCode}/agents?status=Active&appointed=true&state=${state}`
    };
    const response = await serviceRunner.callService(
      config,
      'fetchAgentsByAgencyCode'
    );
    return response.data && response.data.result ? response.data.result : [];
  } catch (error) {
    throw error;
  }
}
