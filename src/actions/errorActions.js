import * as types from './actionTypes';

export const setAppError = error => ({
  type: types.APP_ERROR,
  error
});

export const setAppModalError = modalMessage => ({
  type: types.APP_MODAL_ERROR,
  error: { modalMessage }
});

export const clearAppError = () => ({
  type: types.APP_ERROR_CLEAR,
  error: {}
});

export const dispatchClearAppError = () => dispatch => dispatch(clearAppError());
