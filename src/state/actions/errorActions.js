import * as types from './actionTypes';

export const setAppError = error => {
  if (process.env.NODE_ENV !== 'production') {
    console.error(error);
  }

  return {
    type: types.APP_ERROR,
    error
  };
};

export const setAppModalError = message => ({
  type: types.APP_MODAL_ERROR,
  error: { message }
});

export const clearAppError = () => ({
  type: types.APP_ERROR_CLEAR,
  error: {}
});
