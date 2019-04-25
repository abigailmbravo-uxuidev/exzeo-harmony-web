import * as persistTypes from 'redux-persist/constants';
import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function appStateReducer(state = initialState.appState, action) {
  let newState = {};
  switch (action.type) {
    case types.APPSTATE_SET:
      return { ...state, ...action.appState };
    case types.APPSTATE_ERROR:
      return { ...state, ...action.appState };
    case types.TOGGLE_LOADING:
      return { ...state, isLoading: action.isLoading };
    case types.TOGGLE_SNACKBAR:
      return { ...state, showSnackBar: action.showSnackBar };
    case types.SET_RECALC:
      return { ...state, isRecalc: action.isRecalc };
    case persistTypes.REHYDRATE:
      newState = (action.payload && action.payload.appState)
        ? { ...action.payload.appState, isLoading: false }
        : newState;
      return newState;
    default:
      return state;
  }
}
