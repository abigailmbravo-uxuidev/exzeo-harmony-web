/* eslint-disable no-use-before-define */
import * as serviceRunner from '../../utilities/serviceRunner';

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
 * @param companyCode
 * @param state
 * @param agencyCode
 * @returns {Function}
 */
export function getAgencies(companyCode, state, agencyCode) {
  return async (dispatch) => {
    try {
      const agencies = await fetchAgencies(companyCode, state, agencyCode);
      dispatch(setAgencies(agencies));
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
export function getAgency(agencyCode) {
  return async (dispatch) => {
    try {
      const agency = await fetchAgency(agencyCode);
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
export function getAgentsByAgencyCode(agencyCode) {
  return async (dispatch) => {
    try {
      const agents = await fetchAgentsByAgencyCode(agencyCode);
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
 * @param companyCode
 * @param state
 * @param agencyCode
 * @returns {Promise<Array>}
 */
export async function fetchAgencies(companyCode, state, agencyCode = '') {
  const config = {
    service: 'agency',
    method: 'GET',
    path: `agencies?companyCode=${companyCode}&state=${state}?&pageSize=1000&sort=displayName&SortDirection=asc?agencyCode=${agencyCode}`
  };

  try {
    const response = await serviceRunner.callService(config, 'fetchAgencies');
    return response.data && response.data.result ? response.data.result : [];
  } catch (error) {
    throw error;
  }
}

/**
 *
 * @param agencyCode
 * @returns {Promise<Array>}
 */
export async function fetchAgentsByAgencyCode(agencyCode) {
  try {
    const config = {
      service: 'agency',
      method: 'GET',
      path: `agencies/${agencyCode}/agents`
    };
    const response = await serviceRunner.callService(config, 'fetchAgentsByAgencyCode');
    return response.data && response.data.result ? response.data.result : [];
  } catch (error) {
    throw error;
  }
}