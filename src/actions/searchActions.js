import * as types from './actionTypes';

export const clearSearchConfig = () => ({
  type: types.CLEAR_SEARCH_CONFIG
});

export const setSearchConfig = config => ({
  type: types.SET_SEARCH_CONFIG,
  config
});
