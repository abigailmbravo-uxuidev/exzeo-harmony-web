import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';

import * as types from './actionTypes';
import * as errorActions from './errorActions';
import { toggleLoading } from './appStateActions';
import { searchAddress } from '@exzeo/core-ui/src/@Harmony/Search';

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

/**
 *
 * @returns {Function}
 */
export function clearResults() {
  return dispatch => {
    dispatch(setSearchResults({}));
  };
}

export function setSearchResults({
  currentPage = 1,
  pageSize = 0,
  sortBy = '',
  sortDirection = '',
  results = [],
  totalRecords = 0,
  noResults = true,
  hasSearched = false
}) {
  return {
    type: types.SET_SEARCH_RESULTS,
    currentPage,
    pageSize,
    sortBy,
    sortDirection,
    results,
    totalRecords,
    noResults,
    hasSearched
  };
}

/**
 * Build query string and encodeURI
 * @param firstName
 * @param lastName
 * @param propertyAddress
 * @param policyNumber
 * @param policyStatus
 * @param page
 * @param pageSize
 * @param sortBy
 * @param sortDirection
 * @param companyCode
 * @param state
 * @param product
 * @returns {string} querystring
 */
export function buildQuerystring({
  firstName,
  lastName,
  propertyAddress,
  quoteNumber,
  policyNumber,
  policyStatus,
  page,
  pageSize,
  sort,
  sortDirection,
  companyCode,
  state,
  product
}) {
  const fields = {
    ...(firstName && { firstName }),
    ...(lastName && { lastName }),
    ...(propertyAddress && { propertyAddress }),
    ...(quoteNumber && { quoteNumber }),
    ...(policyNumber && { policyNumber }),
    ...(policyStatus && { policyStatus }),
    ...(page && { page }),
    ...(pageSize && { pageSize }),
    ...(sort && { sort }),
    ...(sortDirection && { sortDirection }),
    ...(companyCode && { companyCode }),
    ...(state && { state }),
    ...(product && { product })
  };

  return encodeURI(
    Object.keys(fields)
      .map(key => `${key}=${fields[key]}`)
      .join('&')
  );
}

/**
 * Format results from address query for state
 * @param {object} results
 * @returns {{results: *, totalRecords: *, noResults: boolean}}
 */
function formatAddressResults(results) {
  return {
    hasSearched: true,
    results: results.IndexResult,
    totalRecords: results.TotalCount,
    noResults: !results.TotalCount
  };
}

/**
 * Search for addresses matching some given criteria, set results as state
 * @param {string} address
 * @returns {Function}
 */
export function searchAddresses({ address, state }) {
  return async dispatch => {
    try {
      dispatch(toggleLoading(true));
      const results = await searchAddress({ address, state });
      dispatch(setSearchResults(formatAddressResults(results)));
    } catch (error) {
      dispatch(errorActions.setAppError(error));
    } finally {
      dispatch(toggleLoading(false));
    }
  };
}

export async function fetchQuotes(query) {
  const querystring = buildQuerystring(query);
  const config = {
    service: 'quote-data',
    method: 'GET',
    path: `/quotes?${querystring}`
  };

  try {
    const response = await serviceRunner.callService(config, 'fetchQuotes');
    return response && response.data && response.data.result
      ? response.data.result
      : {};
  } catch (error) {
    throw error;
  }
}

/**
 * Format results from quote query for state
 * @param {object} results
 * @returns {{currentPage: number, pageSize: number, sortBy: string, sortDirection: string, results: array, totalRecords: number, noResults: boolean}}
 */
function formatQuoteResults(results) {
  return {
    hasSearched: true,
    currentPage: results.currentPage,
    pageSize: results.pageSize,
    sortBy: results.sort,
    sortDirection: results.sortDirection === -1 ? 'desc' : 'asc',
    results: results.quotes,
    totalRecords: results.totalNumberOfRecords,
    noResults: !results.totalNumberOfRecords
  };
}

/**
 * Search for quotes matching some given criteria, set results as state
 * @param {object} quoteSearchData
 * @returns {Function}
 */
export function searchQuotes(quoteSearchData) {
  return async dispatch => {
    try {
      dispatch(toggleLoading(true));
      const results = await fetchQuotes(quoteSearchData);
      dispatch(setSearchResults(formatQuoteResults(results)));
    } catch (error) {
      dispatch(errorActions.setAppError(error));
    } finally {
      dispatch(toggleLoading(false));
    }
  };
}
