import * as types from './actionTypes';
/**
 *
 * @param isLoading
 * @returns {{type: string, isLoading: boolean}}
 */
export const toggleLoading = isLoading => ({
  type: types.TOGGLE_LOADING,
  isLoading
});

/**
 *
 * @param showSnackBar
 * @returns {{type: string, showSnackBar: boolean}}
 */
export const toggleSnackbar = showSnackBar => ({
  type: types.TOGGLE_SNACKBAR,
  showSnackBar
});

/**
 *
 * @param isRecalc
 * @returns {{type: string, isRecalc: boolean}}
 */
export const setRecalc = isRecalc => ({
  type: types.SET_RECALC,
  isRecalc
});
