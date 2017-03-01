import * as types from './actionTypes';

export const setDetails = details => ({
  type: types.SET_DETAILS,
  details
});

export const getDetails = () => ({
  type: types.GET_DETAILS
});
