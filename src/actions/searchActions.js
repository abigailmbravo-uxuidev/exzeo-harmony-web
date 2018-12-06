import * as types from './actionTypes';
import * as serviceRunner from '../utilities/serviceRunner';
import * as errorActions from './errorActions';

export const setPolicySearch = data => ({
  type: types.POLICY_SEARCH,
  search: {
    ...data
  }
});

export const setQuoteSearch = data => ({
  type: types.QUOTE_SEARCH,
  search: {
    ...data
  }
});

export function setSearchResults({
  currentPage = 1,
  pageSize = 0,
  sortBy = '',
  sortDirection = '',
  results = [],
  totalRecords = 0,
  noResults = true
}) {
  return {
    type: types.SET_SEARCH_RESULTS,
    currentPage,
    pageSize,
    sortBy,
    sortDirection,
    results,
    totalRecords,
    noResults
  };
}
/**
 * Format results from address query for state
 * @param {object} results
 * @returns {{results: *, totalRecords: *, noResults: boolean}}
 */
function formatAddressResults(results) {
  return {
    results: results.IndexResult,
    totalRecords: results.TotalCount,
    noResults: !results.TotalCount
  };
}
/**
 * Build query string and call address search service
 * @param {string} address
 * @returns {Promise<{}>}
 */
export async function fetchAddresses(address) {
  const config = {
    service: 'property-search',
    method: 'GET',
    path: `/v1/search/${address}/1/10`
  };

  try {
    const response = await serviceRunner.callService(config);
    return response && response.data && response.data.result ? response.data.result : {};
  } catch (error) {
    throw error;
  }
}

/**
 * Search for addresses matching some given criteria, set results as state
 * @param {string} address
 * @returns {Function}
 */
export function searchAddresses(address) {
  return async (dispatch) => {
    try {
      const results = await fetchAddresses(address);
      dispatch(setSearchResults(formatAddressResults(results)));
    } catch (error) {
      dispatch(errorActions.setAppError(error));
    }
  };
}
