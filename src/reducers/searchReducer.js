import * as types from './../actions/actionTypes';
import initialState from './initialState';

const { search: SEARCH } = initialState;
const PAGE_SIZE = 25;

function setResults(state, action) {
  console.log(action);
  return {
    ...state,
    currentPage: action.currentPage,
    pageSize: action.pageSize,
    totalPages: Math.ceil(action.totalRecords / PAGE_SIZE) || 0,
    sortBy: action.sortBy,
    sortDirection: action.sortDirection,
    results: action.results,
    totalRecords: action.totalRecords,
    noResults: action.noResults

  };
}

export default function searchReducer(state = SEARCH, action) {
  let newState = {};
  switch (action.type) {
    case types.POLICY_SEARCH:
      newState = { ...state, ...action.search };
      return newState;
    case types.QUOTE_SEARCH:
      newState = { ...state, ...action.search };
      return newState;
    case types.SET_SEARCH_RESULTS:
      return setResults(state, action);
    default:
      return state;
  }
}

